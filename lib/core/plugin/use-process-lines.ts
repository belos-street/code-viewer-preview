import { h, type VNode } from 'vue'
import type { PluginManager } from '.'
import type { CodeLine, ColumnHighlight, ProcessedItem, ProcessedResult, PluginMeta } from '../types'

/**
 * 处理行插件
 * @param pluginManager 插件管理器
 */
export function useProcessedLines(pluginManager: PluginManager) {
  /**
   * processedLineCache
   * 记录插件处理状态
   *
   * LineIdToIndexMap
   * 行id到行号的映射
   */
  const processedLineCache = new Set<CodeLine['id']>()

  const LineIdToIndexMap: Record<CodeLine['id'], CodeLine['index']> = pluginManager.options.codeLines.value.reduce(
    (data, item) => ({ [item.id]: item.index, ...data }),
    {}
  )

  const plugins = pluginManager.getPlugins()

  const updateProcessedLines = async () => {
    await processedLines()
  }

  /**
   * 收集所有插件处理结果
   * @returns 合并后的处理结果
   */
  const collectPluginResults = async (): Promise<ProcessedResult> => {
    const mergedResults: ProcessedResult = {}
    if (plugins.length === 0) return mergedResults

    for (const plugin of plugins) {
      const pluginResult = await plugin.processedLines(pluginManager.options)
      mergeProcessedResults(mergedResults, pluginResult)
    }

    return mergedResults
  }

  /**
   * 合并处理结果
   * @param target 目标结果对象
   * @param source 源结果对象
   */
  const mergeProcessedResults = (target: ProcessedResult, source: ProcessedResult): void => {
    for (const lineId in source) {
      const lineProcessors = source[lineId]
      if (target[lineId]) {
        target[lineId].push(...lineProcessors)
      } else {
        target[lineId] = lineProcessors
      }
    }
  }

  /**
   * 创建列高亮元素
   * @param columnHighlights 列高亮配置
   * @returns 列高亮VNode数组
   */
  const createColumnHighlights = (columnHighlights: ColumnHighlight[]): VNode[] => {
    return columnHighlights.map((highlight, index) => {
      const { startColumn, endColumn, style } = highlight
      // 使用ch单位精确定位列位置
      const left = `${startColumn}ch`
      const width = `${endColumn - startColumn}ch`

      return h('span', {
        class: 'column-highlight',
        key: `col-highlight-${index}`,
        style: {
          left,
          width,
          ...style
        }
      })
    })
  }

  /**
   * 为单行代码创建视图节点
   * @param codeLine 代码行
   * @param lineProcessors 行处理器结果
   */
  const createLineVNode = (codeLine: CodeLine, lineProcessors: ProcessedItem[]): void => {
    const childNodes: VNode[] = []
    let viewStyles = {}
    let lineContentDom: string | VNode[] = ''
    let columnHighlights: VNode[] = []

    // 处理各种容器的样式和内容
    for (const processor of lineProcessors) {
      const { container } = processor

      if (container === 'view-line-content') {
        viewStyles = { style: processor.style }
      }

      if (container === 'line-number' && processor.content) {
        childNodes.push(h('span', { class: 'line-number' }, processor.content))
      }

      if (container === 'line-content') {
        if (processor.content) {
          lineContentDom = processor.content
        }

        // 处理列高亮
        if (processor.columnHighlights && processor.columnHighlights.length > 0) {
          columnHighlights = createColumnHighlights(processor.columnHighlights)
        }
      }
    }

    // 创建行内容容器，包含代码内容和列高亮
    const lineContentContainer = h('div', { class: 'line-content' }, [
      // 先渲染列高亮层
      ...columnHighlights,
      // 再渲染代码内容
      ...(Array.isArray(lineContentDom) ? lineContentDom : [lineContentDom || codeLine.content])
    ])

    // 添加行内容容器到子节点
    childNodes.push(lineContentContainer)

    // 创建最终的行节点
    codeLine.vNode = h('div', { ...viewStyles, class: 'view-line-content' }, childNodes)

    // 标记为已处理
    processedLineCache.add(codeLine.id)
  }

  /**
   * 处理可见代码行
   */
  const processedLines = async () => {
    // 收集所有插件的处理结果
    const processedResult = await collectPluginResults()
    // 处理每一行可见代码
    for (const codeLine of pluginManager.options.visibleLines.value) {
      if (processedLineCache.has(codeLine.id)) continue // 检查是否已处理

      // 获取当前行的处理结果
      const lineProcessors = processedResult[codeLine.id]
      if (!lineProcessors) continue

      // 创建行的视图节点
      createLineVNode(codeLine, lineProcessors)
    }
  }

  const destroyProcessedLines = () => {
    // 清理缓存
    processedLineCache.clear()
  }

  /**
   * 更新行元数据
   */
  type LineMetaData = {
    id: CodeLine['id']
    meta: PluginMeta
  }

  const updateLinesMeta = (lineMetas: LineMetaData[]) => {
    const { codeLines } = pluginManager.options
    for (const item of lineMetas) {
      const { id, meta } = item
      const codeLine = codeLines.value[LineIdToIndexMap[id] - 1]
      if (!codeLine) continue
      codeLine.meta = { ...meta }
      processedLineCache.delete(codeLine.id)
    }

    updateProcessedLines()
  }

  return {
    destroyProcessedLines,
    updateProcessedLines,
    updateLinesMeta
  }
}

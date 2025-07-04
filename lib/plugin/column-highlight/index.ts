import type { Plugin, PluginContext, ProcessedResult, ProcessedItem } from '../../core'
import './styles.css'

/**
 * 列高亮插件
 * 用于在代码行中高亮指定列范围
 */
export const ColumnHighlightPlugin: Plugin = {
  name: 'column-highlight',

  install() {},

  processedLines(context: PluginContext) {
    const { visibleLines } = context
    const processedResult: ProcessedResult = {}

    for (const line of visibleLines.value) {
      // 检查行元数据中是否有列高亮信息
      const columnHighlights = line.meta?.columnHighlights
      if (!columnHighlights || !Array.isArray(columnHighlights) || columnHighlights.length === 0) continue

      // 创建处理项
      const processedItem: ProcessedItem = {
        container: 'line-content',
        // 将列高亮信息传递给处理器
        columnHighlights: columnHighlights.map((highlight) => ({
          startColumn: highlight.startColumn,
          endColumn: highlight.endColumn,
          style: { ...highlight.style }
        }))
      }

      processedResult[line.id] = [processedItem]
    }

    return processedResult
  },

  uninstall() {}
}

// 导出插件工厂函数，方便外部使用
export function createColumnHighlightPlugin(): Plugin {
  return ColumnHighlightPlugin
}

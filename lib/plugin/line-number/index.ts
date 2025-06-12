import type { CodeLine, Plugin, PluginContext } from 'lib/core'
import { h } from 'vue'
import { watch, type WatchStopHandle } from 'vue'
import './styles.css'

// 创建行号插件工厂函数
export function createLineNumberPlugin(options: { showLineNumber?: boolean } = {}): Plugin {
  // 每个插件实例的私有变量
  const processedLineIds = new Set<string | number>()
  let watchStopHandle: WatchStopHandle | null = null

  return {
    name: 'line-number',

    install(context: PluginContext) {
      const { visibleLines } = context
      const showLineNumber = options.showLineNumber !== false // 默认显示行号

      // 处理可见行的函数
      const processVisibleLines = (lines: CodeLine[]) => {
        lines.forEach((line) => {
          // 如果已经处理过，直接跳过
          if (processedLineIds.has(line.id)) return

          // 创建行号元素
          if (showLineNumber) {
            // 如果已经有 vNode，保留其内容，但添加行号
            if (line.vNode) {
              const existingContent = line.vNode
              line.vNode = h('div', { class: 'line-with-number' }, [
                h('span', { class: 'line-number' }, String(line.index)),
                h('div', { class: 'line-content' }, [existingContent])
              ])
            } else {
              // 如果没有 vNode，创建新的包含行号的 vNode
              line.vNode = h('div', { class: 'line-with-number' }, [
                h('span', { class: 'line-number' }, String(line.index)),
                h('div', { class: 'line-content', innerHTML: line.content })
              ])
            }
          }

          // 标记为已处理
          processedLineIds.add(line.id)
        })
      }

      // 初始处理当前可见行
      processVisibleLines(visibleLines.value)

      // 监听可见行变化
      watchStopHandle = watch(
        visibleLines,
        (newVisibleLines) => {
          processVisibleLines(newVisibleLines)
        },
        { immediate: false, deep: false }
      )
    },

    uninstall() {
      // 停止监听
      if (watchStopHandle) {
        watchStopHandle()
        watchStopHandle = null
      }
      // 清理缓存
      processedLineIds.clear()
    }
  }
}
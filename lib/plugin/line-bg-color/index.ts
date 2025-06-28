import type { CodeLine, Plugin, PluginContext } from '../../core'
import { watch, type WatchStopHandle } from 'vue'

/**
 * 行背景颜色处理器
 * 处理代码行的背景颜色
 */

// 创建插件工厂函数
export function createLineBgColorPlugin(): Plugin {
  let watchStopHandle: WatchStopHandle | null = null

  return {
    name: 'line-bg-color',

    install(context: PluginContext) {
      const { visibleLines, updateLines } = context

      const processVisibleLines = (codeLines: CodeLine[]) => {
        const result = []
        for (const line of codeLines) {
          const bgColor = line.meta?.bgColor
          if (!bgColor) continue
          result.push({
            id: line.id,
            container: 'code-line-content',
            style: { backgroundColor: bgColor }
          })
        }
        updateLines(result)
      }

      watchStopHandle = watch(
        visibleLines,
        (newVisibleLines) => {
          processVisibleLines(newVisibleLines)
        },
        { immediate: true, deep: false }
      )
    },

    uninstall() {
      // 停止监听
      if (watchStopHandle) {
        watchStopHandle()
        watchStopHandle = null
      }
    }
  }
}

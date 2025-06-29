import type { Plugin, PluginContext, ProcessedResult } from '../../core'
import { type WatchStopHandle } from 'vue'

/**
 * 行背景颜色处理器
 * 处理代码行的背景颜色
 */

// 创建插件工厂函数
export function createLineBgColorPlugin(): Plugin {
  let watchStopHandle: WatchStopHandle | null = null

  return {
    name: 'line-bg-color',

    install() {},

    processedLines(context: PluginContext) {
      const { visibleLines } = context

      const processedResult: ProcessedResult = {}
      for (const line of visibleLines.value) {
        const bgColor = line.meta?.bgColor
        if (!bgColor) continue
        processedResult[line.id] = {
          container: 'view-line-content',
          style: { backgroundColor: bgColor }
        }
      }

      return processedResult
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

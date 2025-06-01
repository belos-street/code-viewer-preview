import type { Plugin, PluginContext } from 'lib/core'
import { h } from 'vue'
import { watch, type WatchStopHandle } from 'vue'

// 创建插件工厂函数
export function createLineBgColorPlugin(): Plugin {
  // 每个插件实例的私有变量
  const processedLineIds = new Set<string | number>()
  let watchStopHandle: WatchStopHandle | null = null

  return {
    name: 'line-bg-color',

    install(context: PluginContext) {
      const { visibleLines } = context

      // 处理可见行的函数
      const processVisibleLines = (lines: any[]) => {
        lines.map((line) => {
          // 如果已经处理过，直接跳过
          if (processedLineIds.has(line.id)) return

          const bgColor = line.meta?.bgColor
          // 用 h 函数生成 VNode，赋值到 line.vNode
          if (bgColor) {
            line.vNode = h('div', { style: { background: bgColor } }, line.content)
          } else {
            line.vNode = h('div', {}, line.content)
          }

          // 标记为已处理
          processedLineIds.add(line.id)
        })
      }

      // 初始处理当前可见行
      processVisibleLines(visibleLines.value)

      // 监听可见行变化（使用 watch 而不是事件总线，因为滚动频率高）
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

import { watch, type WatchStopHandle } from 'vue'
import type { PluginManager } from '.'

export function processedLinesManager(pluginManager: PluginManager) {
  const processedLineIds = new Set<string | number>() // 记录代码行是否已经处理过了
  let watchStopHandle: WatchStopHandle | null = null //代码可视行变更监听器

  const plugins = pluginManager.getPlugins()

  const init = () => {
    const { visibleLines } = pluginManager.options
    watchStopHandle = watch(
      visibleLines,
      () => {
        processedLines()
      },
      { immediate: true, deep: false }
    )
  }

  const processedLines = async () => {
    let processedResult = {}
    debugger
    for (const plugin of plugins) {
      const result = await plugin.processedLines(pluginManager.options)
      processedResult = { ...processedResult, ...result }
    }
    debugger
    // go on
  }

  const destroy = () => {
    // 停止监听
    if (watchStopHandle) {
      watchStopHandle()
      watchStopHandle = null
    }
    // 清理缓存
    processedLineIds.clear()
  }

  init()

  return {
    destroy
  }
}

import type { Plugin, PluginContext, ProcessedResult } from '../../core'

/**
 * 行背景颜色处理器
 * 处理代码行的背景颜色
 */
export const LineBgColorPlugin: Plugin = {
  name: 'line-bg-color',
  install() {},
  processedLines(context: PluginContext) {
    const { visibleLines } = context
    const processedResult: ProcessedResult = {}

    for (const line of visibleLines.value) {
      const bgColor = line.meta?.bgColor
      if (!bgColor) continue
      processedResult[line.id] = [{ container: 'view-line-content', style: { backgroundColor: bgColor } }]
    }

    return processedResult
  },

  uninstall() {}
}

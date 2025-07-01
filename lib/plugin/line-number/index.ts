import type { Plugin, PluginContext, ProcessedResult } from 'lib/core'
import './styles.css'

export const LineNumberPlugin: Plugin = {
  name: 'line-number',

  install() {},
  processedLines(context: PluginContext) {
    const { visibleLines } = context

    const processedResult: ProcessedResult = {}
    for (const line of visibleLines.value) {
      processedResult[line.id] = [
        {
          container: 'line-number',
          content: String(line.index)
        }
      ]
    }

    return processedResult
  },

  uninstall() {}
}

import type { Plugin, PluginContext, ProcessedResult } from 'lib/core'
import { tokenizeLine } from './token'
import './styles.css'

export const SyntaxHighlightPlugin: Plugin = {
  name: 'syntax-highlight',
  install() {},
  processedLines(context: PluginContext) {
    const { visibleLines, language } = context
    const processedResult: ProcessedResult = {}
    for (const line of visibleLines.value) {
      // 如果行元数据中禁用了语法高亮，则跳过
      if (line.meta?.disableSyntaxHighlight) continue
      
      // 根据语言进行分词处理
      const tokenizedContent = tokenizeLine(line.content, language)
      processedResult[line.id] = [
        {
          container: 'line-content',
          content: tokenizedContent
        }
      ]
    }

    return processedResult
  },

  uninstall() {}
}

// 导出插件相关类型和工厂函数，方便外部使用
export * from './token'

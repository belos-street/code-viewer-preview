import { h } from 'vue' // 导入 h 函数
import type { CodeLine, PluginContext, SyntaxHighlightPlugin } from 'lib/core'
import { tokenizeJs, type Token } from './tokenizer'

// SyntaxHighlightPlugin 接口现在从 lib/core/types.ts 导入
// export interface SyntaxHighlightPlugin extends Plugin {
//   getHighlightedTokens: (line: CodeLine, language: string) => Token[]
// }

/**
 * 语法高亮插件
 * @description 根据代码语言对代码进行分词和类型标记
 */
export const syntaxHighlightPlugin: SyntaxHighlightPlugin = {
  name: 'syntax-highlight-plugin',
  install(context: PluginContext) {
    console.log('Syntax Highlight Plugin installed.')
    // 可以在这里进行一些初始化，例如加载语言定义等
  },
  uninstall(context: PluginContext) {
    console.log('Syntax Highlight Plugin uninstalled.')
  },
  /**
   * 获取指定代码行经过语法高亮处理后的词元数组。
   * @param line 代码行对象。
   * @param language 代码语言，目前仅支持 'javascript'。
   * @returns 词元数组，每个词元包含内容和类型。
   */
  getHighlightedTokens(line: CodeLine, language: string): Token[] {
    if (language.toLowerCase() === 'javascript') {
      return tokenizeJs(line.content)
    }
    // 如果语言不支持或未指定，则返回原始内容作为一个单独的词元
    return [{ type: 'unknown', value: line.content }]
  },
  renderLine(line: CodeLine, language?: string) {
    if (language && language.toLowerCase() === 'javascript') {
      const tokens = this.getHighlightedTokens(line, language)
      return h(
        'div',
        tokens.map((token) => h('span', { class: `token-${token.type}` }, token.value))
      )
    }
    // 对于不支持的语言或没有提供语言的情况，返回 null，
    // code-viewer.vue 中的 getLineComponent 将会处理后备渲染逻辑
    return null
  }
}

import { h } from 'vue'
import type { TokenizerInterface, TokenizerFactory } from './types'

/**
 * JavaScript代码语法高亮处理器
 */
export class JavaScriptTokenizer implements TokenizerInterface {
  // JavaScript关键字列表
  private keywords = [
    'var',
    'let',
    'const',
    'function',
    'class',
    'extends',
    'return',
    'if',
    'else',
    'for',
    'while',
    'do',
    'switch',
    'case',
    'default',
    'break',
    'continue',
    'new',
    'try',
    'catch',
    'finally',
    'throw',
    'typeof',
    'instanceof',
    'in',
    'of',
    'delete',
    'void',
    'async',
    'await',
    'yield',
    'import',
    'export',
    'from',
    'as',
    'default',
    'get',
    'set',
    'static',
    'super',
    'this',
    'null',
    'undefined',
    'true',
    'false'
  ]

  /**
   * 对代码行进行分词处理
   * @param content 代码行内容
   * @returns VNode数组
   */
  tokenize(content: string) {
    const tokens = []

    // 使用正则表达式匹配JavaScript代码元素
    const regex =
      /(\/\/.*|\/\*[\s\S]*?\*\/|"(?:\\.|[^"])*"|'(?:\\.|[^'])*'|`(?:\\.|[^`])*`|[\w$]+|[\(\)\[\]\{\}\;\:\,\.\+\-\*\/\%\!\=\<\>\&\|\^\~\?]|\s+|.)/g
    let match

    while ((match = regex.exec(content)) !== null) {
      const text = match[0]

      // 根据文本内容确定类型
      if (/^\s+$/.test(text)) {
        // 空白字符
        tokens.push(h('span', {}, text))
      } else if (/^\/\/.*$/.test(text) || /^\/\*[\s\S]*?\*\/$/.test(text)) {
        // 注释
        tokens.push(h('span', { class: 'token comment' }, text))
      } else if (/^"(?:\\.|[^"])*"$/.test(text) || /^'(?:\\.|[^'])*'$/.test(text) || /^`(?:\\.|[^`])*`$/.test(text)) {
        // 字符串
        tokens.push(h('span', { class: 'token string' }, text))
      } else if (/^\d+(?:\.\d+)?$/.test(text)) {
        // 数字
        tokens.push(h('span', { class: 'token number' }, text))
      } else if (this.keywords.includes(text)) {
        // 关键字
        tokens.push(h('span', { class: 'token keyword' }, text))
      } else if (/^[\w$]+$/.test(text) && /^[A-Z]/.test(text)) {
        // 类名（首字母大写）
        tokens.push(h('span', { class: 'token class-name' }, text))
      } else if (/^[\w$]+$/.test(text)) {
        // 标识符
        tokens.push(h('span', { class: 'token identifier' }, text))
      } else if (/^[\(\)\[\]\{\}\;\:\,\.]$/.test(text)) {
        // 标点符号
        tokens.push(h('span', { class: 'token punctuation' }, text))
      } else if (/^[\+\-\*\/\%\!\=\<\>\&\|\^\~\?]$/.test(text)) {
        // 运算符
        tokens.push(h('span', { class: 'token operator' }, text))
      } else {
        // 其他文本
        tokens.push(h('span', {}, text))
      }
    }

    return tokens
  }
}

/**
 * JavaScript代码语法高亮处理器工厂
 */
export class JavaScriptTokenizerFactory implements TokenizerFactory {
  /**
   * 创建JavaScript语法高亮处理器
   * @returns TokenizerInterface 语法高亮处理器实例
   */
  create(): TokenizerInterface {
    return new JavaScriptTokenizer()
  }
}
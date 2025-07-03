import { h } from 'vue'
import type { TokenizerInterface, TokenizerFactory } from '../types'

/**
 * C代码语法高亮处理器
 */
export class CTokenizer implements TokenizerInterface {
  // C关键字列表
  private keywords = [
    'auto', 'break', 'case', 'char', 'const',
    'continue', 'default', 'do', 'double', 'else',
    'enum', 'extern', 'float', 'for', 'goto',
    'if', 'int', 'long', 'register', 'return',
    'short', 'signed', 'sizeof', 'static', 'struct',
    'switch', 'typedef', 'union', 'unsigned', 'void',
    'volatile', 'while', 'NULL', 'true', 'false'
  ]

  // C预处理指令
  private preprocessor = [
    'include', 'define', 'undef', 'if', 'ifdef',
    'ifndef', 'else', 'elif', 'endif', 'line',
    'error', 'pragma'
  ]

  /**
   * 对代码行进行分词处理
   * @param content 代码行内容
   * @returns VNode数组
   */
  tokenize(content: string) {
    const tokens = []

    // 使用正则表达式匹配C代码元素
    const regex =
      /(#[\w]+|\b[\w]+\b|\/\/.*|\/\*[\s\S]*?\*\/|"(?:\\.|[^"])*"|'(?:\\.|[^'])*'|[\w\.]+|[\(\)\[\]\{\}\;\:\,\.\+\-\*\/\%\!\=\<\>\&\|\^\~\?]|\s+|.)/g
    let match

    while ((match = regex.exec(content)) !== null) {
      const text = match[0]

      // 根据文本内容确定类型
      if (/^\s+$/.test(text)) {
        // 空白字符
        tokens.push(h('span', {}, text))
      } else if (/^#([\w]+)/.test(text)) {
        // 预处理指令
        const directive = text.substring(1)
        if (this.preprocessor.includes(directive)) {
          tokens.push(h('span', { class: 'token preprocessor' }, text))
        } else {
          tokens.push(h('span', {}, text))
        }
      } else if (/^\/\/.*$/.test(text) || /^\/\*[\s\S]*?\*\/$/.test(text)) {
        // 注释
        tokens.push(h('span', { class: 'token comment' }, text))
      } else if (/^"(?:\\.|[^"])*"$/.test(text) || /^'(?:\\.|[^'])*'$/.test(text)) {
        // 字符串
        tokens.push(h('span', { class: 'token string' }, text))
      } else if (/^\d+(?:\.\d+)?$/.test(text)) {
        // 数字
        tokens.push(h('span', { class: 'token number' }, text))
      } else if (this.keywords.includes(text)) {
        // 关键字
        tokens.push(h('span', { class: 'token keyword' }, text))
      } else if (/^[\w]+(?=\s*\()/.test(text)) {
        // 函数名（后面跟括号）
        tokens.push(h('span', { class: 'token function' }, text))
      } else if (/^[\w\.]+$/.test(text)) {
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
 * C代码语法高亮处理器工厂
 */
export class CTokenizerFactory implements TokenizerFactory {
  /**
   * 创建C语法高亮处理器
   * @returns TokenizerInterface 语法高亮处理器实例
   */
  create(): TokenizerInterface {
    return new CTokenizer()
  }
}
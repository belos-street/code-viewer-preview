import { h } from 'vue'
import type { TokenizerInterface, TokenizerFactory } from '../types'

/**
 * Go代码语法高亮处理器
 */
export class GoTokenizer implements TokenizerInterface {
  // Go关键字列表
  private keywords = [
    'break', 'default', 'func', 'interface', 'select',
    'case', 'defer', 'go', 'map', 'struct',
    'chan', 'else', 'goto', 'package', 'switch',
    'const', 'fallthrough', 'if', 'range', 'type',
    'continue', 'for', 'import', 'return', 'var',
    'nil', 'true', 'false'
  ]

  // Go内置类型
  private builtinTypes = [
    'bool', 'byte', 'complex64', 'complex128', 'error',
    'float32', 'float64', 'int', 'int8', 'int16',
    'int32', 'int64', 'rune', 'string', 'uint',
    'uint8', 'uint16', 'uint32', 'uint64', 'uintptr'
  ]

  // Go内置函数
  private builtinFuncs = [
    'append', 'cap', 'close', 'complex', 'copy',
    'delete', 'imag', 'len', 'make', 'new',
    'panic', 'print', 'println', 'real', 'recover'
  ]

  /**
   * 对代码行进行分词处理
   * @param content 代码行内容
   * @returns VNode数组
   */
  tokenize(content: string) {
    const tokens = []

    // 使用正则表达式匹配Go代码元素
    const regex =
      /(\/\/.*|\/\*[\s\S]*?\*\/|"(?:\\.|[^"])*"|'(?:\\.|[^'])*'|`(?:\\.|[^`])*`|[\w\.]+|[\(\)\[\]\{\}\;\:\,\.\+\-\*\/\%\!\=\<\>\&\|\^\~\?]|\s+|.)/g
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
      } else if (this.builtinTypes.includes(text)) {
        // 内置类型
        tokens.push(h('span', { class: 'token builtin-type' }, text))
      } else if (this.builtinFuncs.includes(text)) {
        // 内置函数
        tokens.push(h('span', { class: 'token builtin' }, text))
      } else if (/^func\s+([\w$]+)/.test(text)) {
        // 函数定义
        tokens.push(h('span', { class: 'token function' }, text))
      } else if (/^type\s+([\w$]+)/.test(text)) {
        // 类型定义
        tokens.push(h('span', { class: 'token class-name' }, text))
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
 * Go代码语法高亮处理器工厂
 */
export class GoTokenizerFactory implements TokenizerFactory {
  /**
   * 创建Go语法高亮处理器
   * @returns TokenizerInterface 语法高亮处理器实例
   */
  create(): TokenizerInterface {
    return new GoTokenizer()
  }
}
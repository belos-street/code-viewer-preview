import { h } from 'vue'
import type { TokenizerInterface, TokenizerFactory } from './types'

/**
 * Python代码语法高亮处理器
 */
export class PythonTokenizer implements TokenizerInterface {
  // Python关键字列表
  private keywords = [
    'and',
    'as',
    'assert',
    'async',
    'await',
    'break',
    'class',
    'continue',
    'def',
    'del',
    'elif',
    'else',
    'except',
    'False',
    'finally',
    'for',
    'from',
    'global',
    'if',
    'import',
    'in',
    'is',
    'lambda',
    'None',
    'nonlocal',
    'not',
    'or',
    'pass',
    'raise',
    'return',
    'True',
    'try',
    'while',
    'with',
    'yield'
  ]

  // Python内置函数
  private builtins = [
    'abs',
    'all',
    'any',
    'bin',
    'bool',
    'bytearray',
    'bytes',
    'chr',
    'classmethod',
    'compile',
    'complex',
    'dict',
    'dir',
    'divmod',
    'enumerate',
    'eval',
    'exec',
    'filter',
    'float',
    'format',
    'frozenset',
    'getattr',
    'globals',
    'hasattr',
    'hash',
    'help',
    'hex',
    'id',
    'input',
    'int',
    'isinstance',
    'issubclass',
    'iter',
    'len',
    'list',
    'locals',
    'map',
    'max',
    'memoryview',
    'min',
    'next',
    'object',
    'oct',
    'open',
    'ord',
    'pow',
    'print',
    'property',
    'range',
    'repr',
    'reversed',
    'round',
    'set',
    'setattr',
    'slice',
    'sorted',
    'staticmethod',
    'str',
    'sum',
    'super',
    'tuple',
    'type',
    'vars',
    'zip'
  ]

  /**
   * 对代码行进行分词处理
   * @param content 代码行内容
   * @returns VNode数组
   */
  tokenize(content: string) {
    const tokens = []

    // 使用正则表达式匹配Python代码元素
    const regex =
      /(#.*|"""[\s\S]*?"""|'''[\s\S]*?'''|"(?:\\.|[^"])*"|'(?:\\.|[^'])*'|[\w\.]+|[\(\)\[\]\{\}\;\:\,\.\+\-\*\/\%\!\=\<\>\&\|\^\~\?]|\s+|.)/g
    let match

    while ((match = regex.exec(content)) !== null) {
      const text = match[0]

      // 根据文本内容确定类型
      if (/^\s+$/.test(text)) {
        // 空白字符
        tokens.push(h('span', {}, text))
      } else if (/^#.*$/.test(text) || /^"""[\s\S]*?"""$/.test(text) || /^'''[\s\S]*?'''$/.test(text)) {
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
      } else if (this.builtins.includes(text)) {
        // 内置函数
        tokens.push(h('span', { class: 'token builtin' }, text))
      } else if (/^def\s+([\w_]+)/.test(text)) {
        // 函数定义
        tokens.push(h('span', { class: 'token function' }, text))
      } else if (/^class\s+([\w_]+)/.test(text)) {
        // 类定义
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
 * Python代码语法高亮处理器工厂
 */
export class PythonTokenizerFactory implements TokenizerFactory {
  /**
   * 创建Python语法高亮处理器
   * @returns TokenizerInterface 语法高亮处理器实例
   */
  create(): TokenizerInterface {
    return new PythonTokenizer()
  }
}
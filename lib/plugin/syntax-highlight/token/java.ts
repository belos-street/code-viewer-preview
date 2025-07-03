import { h } from 'vue'
import type { TokenizerInterface, TokenizerFactory } from '../types'

/**
 * Java代码语法高亮处理器
 */
export class JavaTokenizer implements TokenizerInterface {
  // Java关键字列表
  private keywords = [
    'abstract', 'assert', 'boolean', 'break', 'byte',
    'case', 'catch', 'char', 'class', 'const',
    'continue', 'default', 'do', 'double', 'else',
    'enum', 'extends', 'final', 'finally', 'float',
    'for', 'if', 'implements', 'import', 'instanceof',
    'int', 'interface', 'long', 'native', 'new',
    'package', 'private', 'protected', 'public', 'return',
    'short', 'static', 'strictfp', 'super', 'switch',
    'synchronized', 'this', 'throw', 'throws', 'transient',
    'try', 'void', 'volatile', 'while', 'true', 'false', 'null'
  ]

  // Java常用注解
  private annotations = [
    'Override', 'Deprecated', 'SuppressWarnings', 'FunctionalInterface',
    'SafeVarargs', 'Retention', 'Documented', 'Target',
    'Inherited', 'Native', 'Repeatable'
  ]

  /**
   * 对代码行进行分词处理
   * @param content 代码行内容
   * @returns VNode数组
   */
  tokenize(content: string) {
    const tokens = []

    // 使用正则表达式匹配Java代码元素
    const regex =
      /(\@[\w\.]+|\/\/.*|\/\*[\s\S]*?\*\/|"(?:\\.|[^"])*"|'(?:\\.|[^'])*'|[\w\.]+|[\(\)\[\]\{\}\;\:\,\.\+\-\*\/\%\!\=\<\>\&\|\^\~\?]|\s+|.)/g
    let match

    while ((match = regex.exec(content)) !== null) {
      const text = match[0]

      // 根据文本内容确定类型
      if (/^\s+$/.test(text)) {
        // 空白字符
        tokens.push(h('span', {}, text))
      } else if (/^\@([\w\.]+)$/.test(text)) {
        // 注解
        tokens.push(h('span', { class: 'token annotation' }, text))
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
      } else if (/^[A-Z][\w$]*$/.test(text)) {
        // 类名（首字母大写）
        tokens.push(h('span', { class: 'token class-name' }, text))
      } else if (/^[a-z][\w$]*(?=\s*\()/.test(text)) {
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
 * Java代码语法高亮处理器工厂
 */
export class JavaTokenizerFactory implements TokenizerFactory {
  /**
   * 创建Java语法高亮处理器
   * @returns TokenizerInterface 语法高亮处理器实例
   */
  create(): TokenizerInterface {
    return new JavaTokenizer()
  }
}
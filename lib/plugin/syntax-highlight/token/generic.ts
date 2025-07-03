import { h } from 'vue'
import type { TokenizerInterface, TokenizerFactory } from '../types'

/**
 * 通用代码语法高亮处理器
 */
export class GenericTokenizer implements TokenizerInterface {
  /**
   * 对代码行进行分词处理
   * @param content 代码行内容
   * @returns VNode数组
   */
  tokenize(content: string) {
    const tokens = []

    // 使用正则表达式匹配常见的代码元素
    const regex = /([\\w$]+|[\(\)\[\]\{\}\;\:\,\.]|\s+|.)/g
    let match

    while ((match = regex.exec(content)) !== null) {
      const text = match[0]

      // 根据文本内容确定类型
      if (/^\s+$/.test(text)) {
        // 空白字符
        tokens.push(h('span', {}, text))
      } else if (/^[\(\)\[\]\{\}\;\:\,\.]$/.test(text)) {
        // 标点符号
        tokens.push(h('span', { class: 'token punctuation' }, text))
      } else {
        // 其他文本
        tokens.push(h('span', {}, text))
      }
    }

    return tokens
  }
}

/**
 * 通用代码语法高亮处理器工厂
 */
export class GenericTokenizerFactory implements TokenizerFactory {
  /**
   * 创建通用语法高亮处理器
   * @returns TokenizerInterface 语法高亮处理器实例
   */
  create(): TokenizerInterface {
    return new GenericTokenizer()
  }
}

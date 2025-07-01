import type { VNode } from 'vue'
import type { LanguageProps } from 'lib/core'

/**
 * 语法高亮处理器接口
 */
export interface TokenizerInterface {
  /**
   * 对代码行进行分词处理
   * @param content 代码行内容
   * @returns VNode数组
   */
  tokenize(content: string): VNode[]
}

/**
 * 语法高亮处理器工厂接口
 */
export interface TokenizerFactory {
  /**
   * 创建对应语言的语法高亮处理器
   * @returns TokenizerInterface 语法高亮处理器实例
   */
  create(): TokenizerInterface
}

/**
 * 语言到处理器工厂的映射
 */
export type TokenizerMap = Record<string, TokenizerFactory>

/**
 * 对代码行进行分词处理的函数类型
 */
export type TokenizeFunction = (content: string, language?: LanguageProps) => any
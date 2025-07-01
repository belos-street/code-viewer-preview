import type { LanguageProps } from 'lib/core'
import type { TokenizerMap, TokenizeFunction } from './types'

import { GenericTokenizerFactory } from './generic'
import { JavaScriptTokenizerFactory } from './javascript'
import { TypeScriptTokenizerFactory } from './typescript'
import { PythonTokenizerFactory } from './python'

/**
 * 语言到处理器工厂的映射
 */
const tokenizerMap: TokenizerMap = {
  // 通用处理器
  generic: new GenericTokenizerFactory(),
  // JavaScript处理器
  javascript: new JavaScriptTokenizerFactory(),
  // TypeScript处理器
  typescript: new TypeScriptTokenizerFactory(),
  // Python处理器
  python: new PythonTokenizerFactory(),
  // 可以在此处添加更多语言的处理器
}

/**
 * 对代码行进行分词处理
 * @param content 代码行内容
 * @param language 代码语言
 * @returns 处理后的内容
 */
export const tokenizeLine: TokenizeFunction = (content: string, language?: LanguageProps): any => {
  // 如果没有指定语言或语言不支持，使用通用处理
  const lang = language?.toLowerCase() || 'generic'
  
  // 获取对应语言的处理器，如果不存在则使用通用处理器
  const tokenizerFactory = tokenizerMap[lang] || tokenizerMap.generic
  const tokenizer = tokenizerFactory.create()
  
  // 使用处理器进行分词
  return tokenizer.tokenize(content)
}

// 导出所有语言的处理器工厂，方便外部直接使用
export { GenericTokenizerFactory } from './generic'
export { JavaScriptTokenizerFactory } from './javascript'
export { TypeScriptTokenizerFactory } from './typescript'
export { PythonTokenizerFactory } from './python'

// 导出类型定义
export * from './types'
import type { LanguageProps } from 'lib/core'
import type { TokenizerMap, TokenizeFunction } from '../types'

import { GenericTokenizerFactory } from './generic'
import { JavaScriptTokenizerFactory } from './javascript'
import { TypeScriptTokenizerFactory } from './typescript'
import { PythonTokenizerFactory } from './python'
import { JavaTokenizerFactory } from './java'
import { GoTokenizerFactory } from './go'
import { CTokenizerFactory } from './c'
import { CppTokenizerFactory } from './cpp'
import type { VNode } from 'vue'

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
  // Java处理器
  java: new JavaTokenizerFactory(),
  // Go处理器
  go: new GoTokenizerFactory(),
  // C处理器
  c: new CTokenizerFactory(),
  // C++处理器
  cpp: new CppTokenizerFactory()
  // 可以在此处添加更多语言的处理器
}

/**
 * 对代码行进行分词处理
 * @param content 代码行内容
 * @param language 代码语言
 * @returns 处理后的内容
 */
export const tokenizeLine: TokenizeFunction = (content: string, language?: LanguageProps): VNode[] => {
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
export { JavaTokenizerFactory } from './java'
export { GoTokenizerFactory } from './go'
export { CTokenizerFactory } from './c'
export { CppTokenizerFactory } from './cpp'

// 导出类型定义
export * from '../types'

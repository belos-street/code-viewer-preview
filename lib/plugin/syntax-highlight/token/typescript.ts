import type { TokenizerInterface, TokenizerFactory } from '../types'
import { JavaScriptTokenizer } from './javascript'

/**
 * TypeScript代码语法高亮处理器
 */
export class TypeScriptTokenizer extends JavaScriptTokenizer implements TokenizerInterface {
  // TypeScript特有的关键字
  private typescriptKeywords = [
    'interface',
    'type',
    'namespace',
    'declare',
    'abstract',
    'implements',
    'readonly',
    'private',
    'protected',
    'public',
    'override',
    'any',
    'unknown',
    'never',
    'enum',
    'keyof',
    'typeof',
    'infer',
    'is',
    'as',
    'satisfies'
  ]

  /**
   * 对代码行进行分词处理
   * @param content 代码行内容
   * @returns VNode数组
   */
  tokenize(content: string) {
    const tokens = super.tokenize(content)

    // 这里可以添加TypeScript特有的语法高亮处理逻辑
    // 例如：处理类型注解、接口定义等

    return tokens
  }
}

/**
 * TypeScript代码语法高亮处理器工厂
 */
export class TypeScriptTokenizerFactory implements TokenizerFactory {
  /**
   * 创建TypeScript语法高亮处理器
   * @returns TokenizerInterface 语法高亮处理器实例
   */
  create(): TokenizerInterface {
    return new TypeScriptTokenizer()
  }
}

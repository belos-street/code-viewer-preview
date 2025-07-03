import type { TokenizerInterface, TokenizerFactory } from '../types'
import { CTokenizer } from './c'

/**
 * C++代码语法高亮处理器
 */
export class CppTokenizer extends CTokenizer implements TokenizerInterface {
  // C++特有的关键字
  private cppKeywords = [
    'alignas', 'alignof', 'and', 'and_eq', 'asm',
    'atomic_cancel', 'atomic_commit', 'atomic_noexcept', 'bitand', 'bitor',
    'bool', 'catch', 'class', 'compl', 'concept',
    'consteval', 'constexpr', 'constinit', 'const_cast', 'co_await',
    'co_return', 'co_yield', 'decltype', 'delete', 'dynamic_cast',
    'explicit', 'export', 'false', 'friend', 'inline',
    'mutable', 'namespace', 'new', 'noexcept', 'not',
    'not_eq', 'nullptr', 'operator', 'or', 'or_eq',
    'private', 'protected', 'public', 'reflexpr', 'reinterpret_cast',
    'requires', 'static_assert', 'static_cast', 'synchronized', 'template',
    'this', 'thread_local', 'throw', 'true', 'try',
    'typeid', 'typename', 'using', 'virtual', 'wchar_t',
    'xor', 'xor_eq'
  ]

  /**
   * 对代码行进行分词处理
   * @param content 代码行内容
   * @returns VNode数组
   */
  tokenize(content: string) {
    const tokens = super.tokenize(content)

    // 这里可以添加C++特有的语法高亮处理逻辑
    // 例如：处理模板、命名空间等

    return tokens
  }
}

/**
 * C++代码语法高亮处理器工厂
 */
export class CppTokenizerFactory implements TokenizerFactory {
  /**
   * 创建C++语法高亮处理器
   * @returns TokenizerInterface 语法高亮处理器实例
   */
  create(): TokenizerInterface {
    return new CppTokenizer()
  }
}
import type { CodeLine } from './types'

/**
 * 搜索选项接口
 */
export interface SearchOptions {
  /** 搜索关键字 */
  keyword: string
  /** 是否使用正则表达式，默认为false */
  useRegex?: boolean
  /** 是否区分大小写，默认为false */
  caseSensitive?: boolean
  /** 是否全字匹配，默认为false */
  wholeWord?: boolean
  /** 是否包含行号信息，默认为true */
  includeLineNumber?: boolean
  /** 最大结果数量，默认不限制 */
  maxResults?: number
}

/**
 * 搜索结果接口
 */
export interface SearchResult {
  /** 匹配的代码行 */
  line: CodeLine
  /** 匹配的位置数组，每个元素是一个[开始位置, 结束位置]的数组 */
  matches: [number, number][]
}

/**
 * 搜索代码行
 * @param codeLines 代码行数组
 * @param options 搜索选项
 * @returns 匹配的代码行结果数组
 */
export function searchCodeLines(codeLines: CodeLine[], options: SearchOptions): SearchResult[] {
  const { keyword, useRegex = false, caseSensitive = false, wholeWord = false, maxResults } = options

  // 如果关键字为空，返回空数组
  if (!keyword.trim()) {
    return []
  }

  const results: SearchResult[] = []

  // 创建搜索正则表达式
  let searchRegex: RegExp
  try {
    if (useRegex) {
      // 使用用户提供的正则表达式
      const flags = caseSensitive ? 'g' : 'gi'
      searchRegex = new RegExp(keyword, flags)
    } else {
      // 构建普通文本搜索的正则表达式
      let pattern = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // 转义特殊字符
      if (wholeWord) {
        pattern = `\\b${pattern}\\b` // 添加单词边界
      }
      const flags = caseSensitive ? 'g' : 'gi'
      searchRegex = new RegExp(pattern, flags)
    }
  } catch (error) {
    console.error('Invalid search pattern:', error)
    return []
  }

  // 遍历代码行进行搜索
  for (const line of codeLines) {
    const content = line.content
    const matches: [number, number][] = []

    // 查找所有匹配
    let match: RegExpExecArray | null
    while ((match = searchRegex.exec(content)) !== null) {
      matches.push([match.index, match.index + match[0].length])

      // 如果不是全局搜索，手动更新lastIndex避免无限循环
      if (!searchRegex.global) {
        searchRegex.lastIndex = match.index + match[0].length
      }
    }

    // 如果有匹配，添加到结果中
    if (matches.length > 0) {
      results.push({
        line,
        matches
      })

      // 如果达到最大结果数量，停止搜索
      if (maxResults !== undefined && results.length >= maxResults) {
        break
      }
    }
  }

  return results
}

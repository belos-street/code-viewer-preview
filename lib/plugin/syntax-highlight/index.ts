import type { Plugin, PluginContext } from 'lib/core'
import { h } from 'vue'
import { watch, type WatchStopHandle } from 'vue'
import './styles.css'

// 创建插件工厂函数
export function createSyntaxHighlightPlugin(): Plugin {
  // 每个插件实例的私有变量
  const processedLineIds = new Set<string | number>()
  let watchStopHandle: WatchStopHandle | null = null

  return {
    name: 'syntax-highlight',

    install(context: PluginContext) {
      const { visibleLines } = context
      // 从props中获取language属性
      const language = context.language || ''

      // 处理可见行的函数
      const processVisibleLines = (lines: any[]) => {
        lines.forEach((line) => {
          // 如果已经处理过，直接跳过
          if (processedLineIds.has(line.id)) return

          // 根据语言进行分词处理
          const tokenizedContent = tokenizeLine(line.content, language)

          // 用 h 函数生成 VNode，赋值到 line.vNode
          // 检查是否已经有背景色设置（由 line-bg-color 插件设置）
          if (line.vNode) {
            // 如果已经有 vNode，保留其样式属性，但更新内容为分词后的内容
            const existingProps = line.vNode.props || {}
            const style = existingProps.style || {}
            line.vNode = h('div', { style }, tokenizedContent)
          } else {
            // 如果没有 vNode，创建新的
            line.vNode = h('div', {}, tokenizedContent)
          }

          // 标记为已处理
          processedLineIds.add(line.id)
        })
      }

      // 初始处理当前可见行
      processVisibleLines(visibleLines.value)

      // 监听可见行变化
      watchStopHandle = watch(
        visibleLines,
        (newVisibleLines) => {
          processVisibleLines(newVisibleLines)
        },
        { immediate: false, deep: false }
      )
    },

    uninstall() {
      // 停止监听
      if (watchStopHandle) {
        watchStopHandle()
        watchStopHandle = null
      }
      // 清理缓存
      processedLineIds.clear()
    }
  }
}

/**
 * 对代码行进行分词处理
 * @param content 代码行内容
 * @param language 代码语言
 * @returns VNode数组
 */
function tokenizeLine(content: string, language: string): any {
  // 如果没有指定语言或语言不支持，使用通用处理
  if (!language || language.toLowerCase() !== 'javascript') {
    return tokenizeGeneric(content)
  }

  // 根据语言选择不同的分词处理
  switch (language.toLowerCase()) {
    case 'javascript':
      return tokenizeJavaScript(content)
    default:
      return tokenizeGeneric(content)
  }
}

/**
 * 通用代码分词处理
 * @param content 代码行内容
 * @returns VNode数组
 */
function tokenizeGeneric(content: string): any {
  // 简单的通用处理：将特殊字符和符号高亮
  const tokens = []

  // 使用正则表达式匹配常见的代码元素
  const regex = /([\w$]+|[\(\)\[\]\{\}\;\:\,\.]|\s+|.)/g
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

/**
 * JavaScript代码分词处理
 * @param content 代码行内容
 * @returns VNode数组
 */
function tokenizeJavaScript(content: string): any {
  const tokens = []

  // JavaScript关键字列表
  const keywords = [
    'var',
    'let',
    'const',
    'function',
    'class',
    'extends',
    'return',
    'if',
    'else',
    'for',
    'while',
    'do',
    'switch',
    'case',
    'default',
    'break',
    'continue',
    'new',
    'try',
    'catch',
    'finally',
    'throw',
    'typeof',
    'instanceof',
    'in',
    'of',
    'delete',
    'void',
    'async',
    'await',
    'yield',
    'import',
    'export',
    'from',
    'as',
    'default',
    'get',
    'set',
    'static',
    'super',
    'this',
    'null',
    'undefined',
    'true',
    'false'
  ]

  // 使用正则表达式匹配JavaScript代码元素
  const regex =
    /(\/\/.*|\/\*[\s\S]*?\*\/|"(?:\\.|[^"])*"|'(?:\\.|[^'])*'|`(?:\\.|[^`])*`|[\w$]+|[\(\)\[\]\{\}\;\:\,\.\+\-\*\/\%\!\=\<\>\&\|\^\~\?]|\s+|.)/g
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
    } else if (keywords.includes(text)) {
      // 关键字
      tokens.push(h('span', { class: 'token keyword' }, text))
    } else if (/^[\w$]+$/.test(text) && /^[A-Z]/.test(text)) {
      // 类名（首字母大写）
      tokens.push(h('span', { class: 'token class-name' }, text))
    } else if (/^[\w$]+$/.test(text)) {
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

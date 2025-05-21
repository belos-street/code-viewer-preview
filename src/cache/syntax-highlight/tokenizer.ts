/**
 * 表示一个词元（token）
 */
export interface Token {
  type: string // 词元类型，例如 'keyword', 'identifier', 'string', 'comment', 'number', 'operator'
  value: string // 词元的值
}

/**
 * 简单的 JavaScript 词法分析器
 * @param code 要分析的代码字符串
 * @returns 词元数组
 */
export function tokenizeJs(code: string): Token[] {
  const tokens: Token[] = []
  let i = 0

  while (i < code.length) {
    const char = code[i]

    // 跳过空白字符
    if (/\s/.test(char)) {
      i++
      continue
    }

    // 单行注释
    if (char === '/' && code[i + 1] === '/') {
      let value = '//'
      i += 2
      while (i < code.length && code[i] !== '\n') {
        value += code[i]
        i++
      }
      tokens.push({ type: 'comment', value })
      continue
    }

    // 多行注释 (简单实现，不支持嵌套)
    if (char === '/' && code[i + 1] === '*') {
      let value = '/*'
      i += 2
      while (i < code.length && !(code[i] === '*' && code[i + 1] === '/')) {
        value += code[i]
        i++
      }
      if (i < code.length - 1) {
        value += '*/'
        i += 2
      }
      tokens.push({ type: 'comment', value })
      continue
    }

    // 字符串 (支持单引号和双引号)
    if (char === "'" || char === '"') {
      const quoteType = char
      let value = char
      i++
      while (i < code.length && code[i] !== quoteType) {
        if (code[i] === '\\') {
          // 处理转义字符
          value += code[i] + code[i + 1]
          i += 2
          continue
        }
        value += code[i]
        i++
      }
      if (i < code.length) {
        value += code[i] // 包含结束引号
        i++
      }
      tokens.push({ type: 'string', value })
      continue
    }

    // 数字 (整数和小数)
    if (/[0-9]/.test(char)) {
      let value = ''
      while (i < code.length && /[0-9\.]/.test(code[i])) {
        value += code[i]
        i++
      }
      tokens.push({ type: 'number', value })
      continue
    }

    // 关键字和标识符
    // 简单示例，可以扩展更多关键字
    const keywords = [
      'const',
      'let',
      'var',
      'function',
      'return',
      'if',
      'else',
      'for',
      'while',
      'true',
      'false',
      'null',
      'undefined',
      'new',
      'this',
      'class',
      'extends',
      'super',
      'import',
      'export',
      'from',
      'default',
      'async',
      'await',
      'try',
      'catch',
      'finally',
      'throw'
    ]
    if (/[a-zA-Z_\$]/.test(char)) {
      let value = ''
      while (i < code.length && /[a-zA-Z0-9_\$]/.test(code[i])) {
        value += code[i]
        i++
      }
      if (keywords.includes(value)) {
        tokens.push({ type: 'keyword', value })
      } else {
        tokens.push({ type: 'identifier', value })
      }
      continue
    }

    // 操作符和标点符号 (简单示例)
    const operators = [
      '=',
      '==',
      '===',
      '!=',
      '!==',
      '+',
      '-',
      '*',
      '/',
      '%',
      '++',
      '--',
      '>',
      '<',
      '>=',
      '<=',
      '&&',
      '||',
      '!',
      '?',
      ':',
      '.',
      ',',
      ';',
      '(',
      ')',
      '{',
      '}',
      '[',
      ']'
    ]
    let potentialOp = ''
    let matchedOp = ''
    for (let j = 0; j < 3 && i + j < code.length; j++) {
      // 检查最多3个字符的操作符
      potentialOp += code[i + j]
      if (operators.includes(potentialOp)) {
        matchedOp = potentialOp
      }
    }
    if (matchedOp) {
      tokens.push({ type: 'operator', value: matchedOp })
      i += matchedOp.length
      continue
    }

    // 如果没有匹配到任何已知类型，则视为普通字符或未知
    tokens.push({ type: 'unknown', value: char })
    i++
  }

  return tokens
}

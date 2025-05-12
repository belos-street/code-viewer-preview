export * from './plugin'

/* 分词 */
export const tokenize = (content: string): string[] => {
  if (!content) return []
  return content.match(/\S+|\s+/g) || []
}

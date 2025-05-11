export * from './plugin'
export const tokenize = (content: string): string[] => {
  if (!content) return []
  return content.match(/\S+|\s+/g) || []
}

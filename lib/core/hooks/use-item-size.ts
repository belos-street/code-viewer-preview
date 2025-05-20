import { computed } from "vue";

export type CodeItemSize = 'small' | 'medium' | 'large'
export function useItemSize(size: CodeItemSize) {

  const CodeSizeMap: Record<CodeItemSize, { height: number; fontSize: number }> = {
    small: { height: 18, fontSize: 12 },
    medium: { height: 21, fontSize: 14 },
    large: { height: 24, fontSize: 16 }
  }
  const lineHeight = computed(() => CodeSizeMap[size].height)
  const lineFontSize = computed(() => CodeSizeMap[size].fontSize)

  return {
    lineHeight,
    lineFontSize
  }
}

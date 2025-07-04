import { ref, computed, onMounted, onUnmounted, type Ref } from 'vue'

type UseVirtualScrollOptions<T> = {
  containerRef: Ref<HTMLElement | null>
  itemHeight: number
  items: T[]
  buffer?: number
  onScroll?: (scrollTop: number, visibleLines: T[]) => void
  getItemHeight?: (item: T, defaultHeight: number) => number // 新增：自定义高度计算函数
}

/**
 * 长列表中只渲染可视部分的条目，以提高渲染效率和性能
 * 用于处理虚拟滚动的逻辑，包括计算可见项、滚动事件处理等
 *
 * @param options.containerRef 滚动容器的引用
 * @param options.itemHeight 单个项目的高度
 * @param options.items 列表项数组
 * @param options.buffer 缓冲区的大小，默认为5，用于在可视区域前后额外渲染的条目数
 *
 */

export function useVirtualScroll<T>(options: UseVirtualScrollOptions<T>) {
  const { containerRef, itemHeight, items, buffer = 10, onScroll, getItemHeight } = options

  const scrollTop = ref(0)
  const containerHeight = ref(0)

  // 计算单个项目的高度
  const calculateItemHeight = (item: T) => (getItemHeight ? getItemHeight(item, itemHeight) : itemHeight)

  // 为每个可见行生成样式对象
  const getLineStyle = (item: T, index: number) => {
    const position = getLinePosition(index)
    const height = calculateItemHeight(item)
    return {
      top: `${position}px`,
      height: `${height}px`,
      lineHeight: `${itemHeight}px`
    }
  }

  // 为盒子内容生成样式对象
  const getBoxStyle = (item: T) => {
    const height = calculateItemHeight(item) - itemHeight
    return {
      height: `${height}px`
    }
  }

  // 计算总高度
  const totalHeight = computed(() => {
    let total = 0
    for (let i = 0; i < items.length; i++) {
      total += calculateItemHeight(items[i])
    }
    return total
  })

  // 计算行位置
  const getLinePosition = (index: number) => {
    let position = 0
    for (let i = 0; i < index; i++) {
      position += calculateItemHeight(items[i])
    }
    return position
  }

  // 计算起始索引（带缓冲区）
  const startIndex = computed(() => {
    // 二分查找找到第一个位置大于等于scrollTop的行
    let low = 0
    let high = items.length - 1

    while (low <= high) {
      const mid = Math.floor((low + high) / 2)
      const pos = getLinePosition(mid)

      if (pos < scrollTop.value - buffer * itemHeight) {
        low = mid + 1
      } else {
        high = mid - 1
      }
    }

    return Math.max(0, Math.min(low - buffer, items.length - 1))
  })

  // 计算结束索引（带缓冲区）
  const endIndex = computed(() => {
    // 从起始索引开始，找到第一个超出可视区域的行
    let index = startIndex.value
    let totalHeight = 0

    while (index < items.length && totalHeight < containerHeight.value + buffer * 2 * itemHeight) {
      totalHeight += calculateItemHeight(items[index])
      index++
    }

    return Math.min(index + buffer, items.length)
  })

  /**
   * 可见项数据切片
   * 如果是别的平台，如脱离dom diff的框架，需要做DOM复用池（Recycle Pool），参考monaco-editor
   */
  const visibleLines = computed(() => {
    const start = Math.max(0, startIndex.value)
    const end = Math.min(endIndex.value, items.length)
    return items.slice(start, end)
  })

  /**
   * 处理滚动事件
   */
  let scrollAnimationFrameId: number | null = null
  const handleScroll = () => {
    if (!containerRef.value) return
    if (scrollAnimationFrameId !== null) {
      cancelAnimationFrame(scrollAnimationFrameId)
    }
    scrollAnimationFrameId = requestAnimationFrame(() => {
      scrollTop.value = containerRef.value!.scrollTop
      if (onScroll) onScroll(scrollTop.value, visibleLines.value)
    })
  }

  // 使用 ResizeObserver 处理容器大小变化
  let resizeObserver: ResizeObserver | null = null
  const handleResize = () => {
    if (!containerRef.value) return
    containerHeight.value = containerRef.value.clientHeight
  }

  onMounted(() => {
    handleResize()
    if (containerRef.value) {
      containerRef.value.addEventListener('scroll', handleScroll, { passive: true })
      resizeObserver = new ResizeObserver(handleResize)
      resizeObserver.observe(containerRef.value)
    }
  })

  onUnmounted(() => {
    if (containerRef.value) {
      containerRef.value.removeEventListener('scroll', handleScroll)
      if (resizeObserver) {
        resizeObserver.unobserve(containerRef.value)
        resizeObserver.disconnect()
      }
    }
  })

  // 滚动到指定行
  const scrollToLine = (lineNumber: number) => {
    if (!containerRef.value) return

    // 确保行号在有效范围内
    const targetLine = Math.max(1, Math.min(lineNumber, items.length))

    // 计算目标滚动位置（考虑前面行的盒子高度）
    const targetScrollTop = getLinePosition(targetLine - 1)

    // 执行滚动
    containerRef.value.scrollTo({
      top: targetScrollTop,
      behavior: 'smooth'
    })
  }

  return {
    visibleLines,
    totalHeight,
    scrollTop,
    scrollToLine,
    getLinePosition,
    getLineStyle,
    getBoxStyle
  }
}

import { ref, computed, onMounted, onUnmounted, type Ref } from 'vue'
import { debounce } from '../../utils/debounce'

// 定义一个通用的元数据接口
interface ItemMeta {
  boxHeightMultiplier?: number
}

// 定义一个通用的项目接口
interface ItemWithMeta {
  meta?: ItemMeta
}

type UseVirtualScrollOptions<T extends ItemWithMeta> = {
  containerRef: Ref<HTMLElement | null>
  itemHeight: number
  items: T[]
  buffer?: number
  onScroll?: (scrollTop: number, visibleLines: T[]) => void // 修改: onScroll 参数，增加 visibleLines
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

export function useVirtualScroll<T extends ItemWithMeta>(options: UseVirtualScrollOptions<T>) {
  const { containerRef, itemHeight, items, buffer = 10, onScroll } = options // 新增: onScroll 参数

  const scrollTop = ref(0)
  const containerHeight = ref(0)

  // 计算总高度
  const totalHeight = computed(() => {
    let total = 0
    for (let i = 0; i < items.length; i++) {
      total += itemHeight
      const multiplier = items[i]?.meta?.boxHeightMultiplier ?? 0
      if (multiplier > 0) {
        total += itemHeight * multiplier
      }
    }
    return total
  })

  // 计算行位置（考虑前面行的盒子高度）
  const getLinePosition = (index: number) => {
    let position = 0
    for (let i = 0; i < index; i++) {
      position += itemHeight
      const multiplier = items[i]?.meta?.boxHeightMultiplier ?? 0
      if (multiplier > 0) {
        position += itemHeight * multiplier
      }
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
      totalHeight += itemHeight
      const multiplier = items[index]?.meta?.boxHeightMultiplier ?? 0
      if (multiplier > 0) {
        totalHeight += itemHeight * multiplier
      }
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
   * 使用防抖包装 onScroll 回调函数
   */
  const debouncedOnScroll = onScroll
    ? debounce((scrollTop: number, visibleLines: T[]) => {
        onScroll(scrollTop, visibleLines)
      }, 100)
    : undefined
  let scrollAnimationFrameId: number | null = null
  const handleScroll = () => {
    if (!containerRef.value) return
    if (scrollAnimationFrameId !== null) {
      cancelAnimationFrame(scrollAnimationFrameId)
    }
    scrollAnimationFrameId = requestAnimationFrame(() => {
      scrollTop.value = containerRef.value!.scrollTop
      if (debouncedOnScroll) debouncedOnScroll(scrollTop.value, visibleLines.value)
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
    getLinePosition
  }
}

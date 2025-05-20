import { ref, computed, onMounted, onUnmounted, type Ref } from 'vue'

type UseVirtualScrollOptions<T> = {
  containerRef: Ref<HTMLElement | null>
  itemHeight: number
  items: T[]
  buffer?: number
  onScroll?: (scrollTop: number) => void // 新增: onScroll 参数
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
  const { containerRef, itemHeight, items, buffer = 10, onScroll } = options // 新增: onScroll 参数

  const scrollTop = ref(0)
  const containerHeight = ref(0)
  const visibleCount = computed(() => Math.ceil(containerHeight.value / itemHeight) + buffer * 2)

  // 计算总高度（用于占位）
  const totalHeight = computed(() => items.length * itemHeight)

  // 计算起始索引（带缓冲区）
  const startIndex = computed(() => {
    const index = Math.max(0, Math.floor(scrollTop.value / itemHeight) - buffer)
    return Math.min(index, items.length - 1)
  })

  // 计算结束索引（带缓冲区）
  const endIndex = computed(() => {
    const end = Math.min(startIndex.value + visibleCount.value, items.length)
    return Math.max(0, end)
  })

  /**
   * 可见项数据切片
   * 如果是别的平台，如脱离dom diff的框架，需要做DOM复用池（Recycle Pool），参考monaco-editor
   */
  const visibleItems = computed(() => {
    const start = Math.max(0, startIndex.value)
    const end = Math.min(endIndex.value, items.length)
    return items.slice(start, end)
  })

  // 处理滚动事件
  let scrollAnimationFrameId: number | null = null
  const handleScroll = () => {
    if (!containerRef.value) return
    if (scrollAnimationFrameId !== null) {
      cancelAnimationFrame(scrollAnimationFrameId)
    }
    scrollAnimationFrameId = requestAnimationFrame(() => {
      scrollTop.value = containerRef.value!.scrollTop
      if (onScroll) onScroll(scrollTop.value) //  调用外部传入的滚动事件回调
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

  return {
    visibleItems,
    totalHeight,
    containerRef,
    startIndex, // 新增：暴露起始索引以便在模板中使用
    endIndex // 新增：暴露结束索引以便在模板中使用
  }
}

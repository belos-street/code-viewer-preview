import { ref, computed, onMounted, onUnmounted, type Ref } from 'vue'
import { throttle, debounce } from '../../utils'

type UseVirtualScrollOptions<T> = {
  containerRef: Ref<HTMLElement | null>
  itemHeight: number
  items: T[]
  buffer?: number
}

/**
 * 长列表中只渲染可视部分的条目，以提高渲染效率和性能
 * 用于处理虚拟滚动的逻辑，包括计算可见项、滚动事件处理等
 *
 * @param options.containerRef 滚动容器的引用
 * @param options.itemHeight 单个项目的高度
 * @param options.items 列表项数组
 * @param options.buffer 缓冲区的大小，默认为5，用于在可视区域前后额外渲染的条目数
 */
export function useVirtualScroll<T>(options: UseVirtualScrollOptions<T>) {
  const { containerRef, itemHeight, items, buffer = 5 } = options

  const scrollTop = ref(0)
  const containerHeight = ref(0)
  const visibleCount = computed(() => Math.ceil(containerHeight.value / itemHeight) + buffer * 2)

  // 计算总高度（用于占位）
  const totalHeight = computed(() => items.length * itemHeight)

  // 计算起始索引（带缓冲区）
  const startIndex = computed(() => {
    const index = Math.floor(scrollTop.value / itemHeight) - buffer
    return Math.max(0, index)
  })

  // 计算结束索引（带缓冲区）
  const endIndex = computed(() => {
    const end = startIndex.value + visibleCount.value + buffer
    return Math.min(end, items.length)
  })

  // 可见项数据切片
  const visibleItems = computed(() => items.slice(startIndex.value, endIndex.value))

  // 计算位移量（优化滚动性能）
  const transform = computed(() => `translateY(${startIndex.value * itemHeight}px)`)

  // 滚动事件处理 - 节流
  const handleScroll = () => {
    if (!containerRef.value) return
    console.log(11)
    scrollTop.value = containerRef.value.scrollTop
  }

  // 窗口 resize 处理 - 防抖
  const handleResize = debounce(() => {
    if (!containerRef.value) return
    containerHeight.value = containerRef.value.clientHeight
  }, 200)

  // 初始化
  onMounted(() => {
    handleResize()
    debugger
    containerRef.value?.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleResize)
  })

  // 清理事件监听
  onUnmounted(() => {
    containerRef.value?.removeEventListener('scroll', handleScroll)
    window.removeEventListener('resize', handleResize)
  })

  return {
    visibleItems,
    totalHeight,
    transform,
    containerRef
  }
}

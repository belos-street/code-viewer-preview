<template>
  <div class="code-viewer" :style="{ fontSize: `${lineFontSize}px` }">
    <div class="code-viewer-content" ref="codeViewerContentRef">
      <div class="view-scroll-placeholder" :style="{ height: `${totalHeight}px` }" />
      <!-- 在lines算宽高 -->
      <div class="view-lines">
        <div
          v-for="line in visibleItems"
          :key="line.id"
          :data-line-id="line.id"
          class="view-line"
          :style="{ top: `${(line.index - 1) * lineHeight}px`, height: `${lineHeight}px`, lineHeight: `${lineHeight}px` }"
        >
          <span>
            {{ line.content }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CodeLine, Plugin } from './types'
import { PluginManager } from './plugin'
import { computed, onMounted, ref } from 'vue'
import '../styles/index.css'
import { EventBus } from './event-bus'
import { useVirtualScroll } from './hooks'

type CodeSize = 'small' | 'medium' | 'large'

const props = withDefaults(
  defineProps<{
    code: CodeLine[]
    plugins?: Plugin[]
    size?: CodeSize
  }>(),
  {
    code: () => [],
    plugins: () => [],
    size: 'medium'
  }
)

/** 代码尺寸 */
const CodeSizeMap: Record<CodeSize, { height: number; fontSize: number }> = {
  small: { height: 18, fontSize: 12 },
  medium: { height: 21, fontSize: 14 },
  large: { height: 24, fontSize: 16 }
}
const lineHeight = computed(() => CodeSizeMap[props.size].height)
const lineFontSize = computed(() => CodeSizeMap[props.size].fontSize)

/** 虚拟滚动 */
const codeViewerContentRef = ref<HTMLElement | null>(null)
const { visibleItems, totalHeight } = useVirtualScroll<CodeLine>({
  containerRef: codeViewerContentRef,
  itemHeight: lineHeight.value,
  items: props.code
})

/** 插件&事件总线 */
const eventBus = new EventBus() // 初始化事件总线
const pluginManager = new PluginManager(eventBus)
const initPlugins = () => {
  // 初始化插件
  props.plugins?.map((plugin) => pluginManager.registerPlugin(plugin))
}

// 渲染代码行数（通过插件）
const renderLineNumbers = () => {
  const lineNumberPlugin = pluginManager.getPlugins().find((plugin) => plugin.name === 'line-number-plugin')
  if (lineNumberPlugin && lineNumberPlugin['renderLineNumbers']) {
    // const gutters = document.querySelectorAll('.code-line-gutters')
    // gutters.forEach((gutter, index) => {
    //   lineNumberPlugin.renderLineNumbers([props.code[index]], gutter)
    // })
  }
}

onMounted(() => {
  initPlugins()
  renderLineNumbers()
})
</script>

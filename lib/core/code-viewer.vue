<template>
  <div class="code-viewer" :style="{ fontSize: `${lineFontSize}px` }">
    <div class="line-gutter-container">
      <div class="line-gutters" :style="{ transform: `translateY(${scrollTop}px)` }">
        <div v-for="line in visibleItems" :key="line.id" class="line-gutter"
          :style="{ top: `${(line.index - 1) * lineHeight}px`, height: `${lineHeight}px` }">
          <div class="gutter-index">{{ line.index }}</div>
          <slot name="gutter-after" />
        </div>
      </div>
    </div>
    <div class="code-viewer-content" ref="codeViewerContentRef">
      <div class="view-scroll-placeholder" :style="{ height: `${totalHeight}px` }" />
      <div class="view-lines">
        <div v-for="line in visibleItems" :key="line.id" :data-line-id="line.id" class="view-line"
          :style="{ top: `${(line.index - 1) * lineHeight}px`, height: `${lineHeight}px`, lineHeight: `${lineHeight}px` }">
          <div class="code-line-content">
            {{ line.content }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CodeLine, Plugin } from './types'
import { PluginManager } from './plugin'
import { onMounted, ref } from 'vue'
import '../styles/index.css'
import { EventBus, EventName } from './event-bus'
import { useItemSize, useVirtualScroll, type CodeItemSize } from './hooks'

const props = withDefaults(
  defineProps<{
    code: CodeLine[]
    plugins?: Plugin[]
    size?: CodeItemSize
  }>(),
  {
    code: () => [],
    plugins: () => [],
    size: 'large'
  }
)

/** 代码尺寸 */
const { lineHeight, lineFontSize } = useItemSize(props.size)

/** 虚拟滚动 */
const codeViewerContentRef = ref<HTMLElement | null>(null)
const { visibleItems, totalHeight, scrollTop } = useVirtualScroll<CodeLine>({
  containerRef: codeViewerContentRef,
  itemHeight: lineHeight.value,
  items: props.code,
  onScroll: (scrollTop: number) => {
    eventBus.emit(EventName.SCROLL, scrollTop) // 触发自定义事件
  }
})

/** 插件&事件总线 */
const eventBus = new EventBus() // 初始化事件总线
const pluginManager = new PluginManager(eventBus)
const initPlugins = () => {
  // 初始化插件
  props.plugins?.map((plugin) => pluginManager.registerPlugin(plugin))
}

/** 渲染代码行数（通过插件）*/
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

<template>
  <div class="code-viewer" :style="{ fontSize: `${lineFontSize}px` }">
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
import type { CodeLine, RawCodeLine } from './types'
import { ref } from 'vue'
import { EventBus } from './event-bus'
import { useItemSize, useVirtualScroll, type CodeItemSize } from './hooks'
import { PluginManager } from './plugin'
import '../styles/index.css'

const props = withDefaults(
  defineProps<{
    code: RawCodeLine[]
    size?: CodeItemSize
    language?: string // Added language prop
  }>(),
  {
    code: () => [],
    size: 'large'
  }
)

const initialCode = props.code.map((line, index) => ({ ...line, index: index + 1, html: '' }))

/** 插件系统 */
const eventBus = new EventBus() // 初始化事件总线
const pluginManager = new PluginManager(eventBus)

defineExpose({
  registerPlugin: pluginManager.registerPlugin.bind(pluginManager)
})

/** 代码尺寸 */
const { lineHeight, lineFontSize } = useItemSize(props.size)

/** 虚拟滚动 */
const codeViewerContentRef = ref<HTMLElement | null>(null)
const { visibleItems, totalHeight } = useVirtualScroll<CodeLine>({
  containerRef: codeViewerContentRef,
  itemHeight: lineHeight.value,
  items: initialCode
})
</script>

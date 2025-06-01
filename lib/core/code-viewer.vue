<template>
  <div class="code-viewer" :style="{ fontSize: `${lineFontSize}px` }">
    <div class="code-viewer-content" ref="codeViewerContentRef">
      <div class="view-scroll-placeholder" :style="{ height: `${totalHeight}px` }" />
      <div class="view-lines">
        <div
          v-for="line in visibleLines"
          :key="line.id"
          :data-line-id="line.id"
          class="view-line"
          :style="{ top: `${(line.index - 1) * lineHeight}px`, height: `${lineHeight}px`, lineHeight: `${lineHeight}px` }"
        >
          <div class="code-line-content">
            <component v-if="line.vNode" :is="line.vNode" />
            <div v-else v-html="line.content" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CodeLine, RawCodeLine, Plugin } from './types'
import { onMounted, ref } from 'vue'
import { EventBus } from './event-bus'
import { useItemSize, useVirtualScroll, type CodeItemSize } from './hooks'
import { PluginManager } from './plugin'
import '../styles/index.css'

const props = withDefaults(
  defineProps<{
    code: RawCodeLine[]
    plugins?: Plugin[]
    size?: CodeItemSize
    language?: string
  }>(),
  {
    code: () => [],
    plugins: () => [],
    size: 'large'
  }
)

// 代码行数据，并进行初始化
const codeLines = ref<CodeLine[]>(props.code.map((line, index) => ({ ...line, index: index + 1, html: line.content })))

/** 代码尺寸 */
const { lineHeight, lineFontSize } = useItemSize(props.size)

/** 插件系统 */
const eventBus = new EventBus() // 初始化事件总线

/** 虚拟滚动 */
const codeViewerContentRef = ref<HTMLElement | null>(null)
const { visibleLines, totalHeight } = useVirtualScroll<CodeLine>({
  containerRef: codeViewerContentRef,
  itemHeight: lineHeight.value,
  items: codeLines.value
})

const pluginManager = new PluginManager({
  eventBus,
  codeLines,
  visibleLines: visibleLines
})

//注册插件
onMounted(() => {
  props.plugins.map(async (plugin) => await pluginManager.registerPlugin(plugin))
})

/** 暴露给外部的API */
defineExpose({})
</script>

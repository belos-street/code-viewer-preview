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
          <component v-if="line.vNode" :is="line.vNode" />
          <div v-else v-html="line.content" class="code-line-content" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CodeLine, RawCodeLine, Plugin } from './types'
import { onBeforeUnmount, ref } from 'vue'
import { useItemSize, useVirtualScroll, type CodeItemSize } from './hooks'
import mitt from 'mitt'
import { PluginManager } from './plugin'
import '../styles/index.css'
import type { EventPayloads } from './event-bus'
import { useProcessedLines } from './plugin/use-process-lines'

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

/** 虚拟滚动 */
const codeViewerContentRef = ref<HTMLElement | null>(null)
const { visibleLines, totalHeight, scrollToLine } = useVirtualScroll<CodeLine>({
  containerRef: codeViewerContentRef,
  itemHeight: lineHeight.value,
  items: codeLines.value,
  onScroll: () => {
    updateProcessedLines()
  }
})

/** 事件总线 */
const eventBus = mitt<EventPayloads>()

/**
 * 插件管理器
 * pluginManager - 插件管理器实例
 * registerPlugin - 注册插件
 * useProcessedLines - 代码行处理器
 */
const pluginManager = new PluginManager({
  codeLines,
  visibleLines: visibleLines,
  eventBus,
  language: props.language
})
props.plugins.map(async (plugin) => await pluginManager.registerPlugin(plugin))
const { updateProcessedLines, destroyProcessedLines } = useProcessedLines(pluginManager)

// 清理
onBeforeUnmount(async () => {
  await pluginManager.destroy()
  destroyProcessedLines()
})

/** 暴露给外部的API */
defineExpose({
  scrollToLine,
  pluginManager // 暴露插件管理器，允许外部访问
})
</script>

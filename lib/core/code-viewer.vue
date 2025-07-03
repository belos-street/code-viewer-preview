<template>
  <div class="code-viewer" :style="{ fontSize: `${lineFontSize}px` }" :data-theme="theme">
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
          <component :is="line.vNode" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CodeLine, RawCodeLine, Plugin, LanguageProps } from './types'
import { CodeViewerTheme } from './types'
import { h, onBeforeUnmount, onMounted, ref } from 'vue'
import { useItemSize, useVirtualScroll, type CodeItemSize } from './hooks'
import mitt from 'mitt'
import { PluginManager } from './plugin'
import '../styles/index.css'
import type { EventPayloads } from './event-bus'
import { useProcessedLines } from './plugin/use-process-lines'
import { searchCodeLines, type SearchOptions, type SearchResult } from './search-code'

const props = withDefaults(
  defineProps<{
    code: RawCodeLine[]
    plugins?: Plugin[]
    size?: CodeItemSize
    language?: LanguageProps
    theme?: CodeViewerTheme
  }>(),
  {
    code: () => [],
    plugins: () => [],
    size: 'large',
    theme: CodeViewerTheme.VSCode
  }
)

// 代码行数据，并进行初始化
const codeLines = ref<CodeLine[]>(
  props.code.map((line, index) => ({
    ...line,
    index: index + 1,
    vNode: h('div', { class: 'line-content' }, [h('div', { class: 'line-content' }, line.content)])
  }))
)

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
onMounted(() => {
  updateProcessedLines()
})

// 清理
onBeforeUnmount(async () => {
  await pluginManager.destroy()
  destroyProcessedLines()
})

/**
 * 搜索代码行
 * @param options 搜索选项
 * @returns 搜索结果
 */
const search = (options: SearchOptions): SearchResult[] => {
  return searchCodeLines(codeLines.value, options)
}

/** 暴露给外部的API */
defineExpose({
  scrollToLine,
  search // 关键字搜索功能
})
</script>

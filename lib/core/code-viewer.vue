<template>
  <div class="code-viewer" :style="{ fontSize: `${lineFontSize}px` }">
    <!-- 在gutters算宽高 -->
    <div class="code-viewer-gutters" :style="{ lineHeight: `${lineHeight}px`, width: '62px' }">
      <div class="code-gutters-item" v-for="(line, number) in props.code" :key="line.id"
        :style="{ top: `${number * lineHeight}px`, height: `${lineHeight}px` }">
        <div class="code-gutters-item__index">
          <span>{{ number + 1 }}</span>
        </div>
        <div class="code-gutters-item__after">
          <slot name="gutter-after" />
        </div>
      </div>
    </div>
    <div class="code-viewer-content" ref="codeViewerContentRef">
      <!-- 在lines算宽高 -->
      <div class="view-lines" :style="{ height: `${totalHeight}px` }">
        <div v-for="(line, number) in props.code" :key="line.id" :data-line-id="line.id" class="view-line"
          :style="{ top: `${number * lineHeight}px`, height: `${lineHeight}px`, lineHeight: `${lineHeight}px` }">
          <span>
            {{ line.content }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
继续修改dom结构 gutter合并到row里来

<script setup lang="ts">
import type { CodeLine, Plugin } from './types'
import { PluginManager } from './plugin'
import { computed, onMounted, shallowRef } from 'vue'
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
const codeViewerContentRef = shallowRef<HTMLElement | null>(null)
const { visibleItems, totalHeight, transform } = useVirtualScroll({
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

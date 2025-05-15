<template>
  <div class="code-viewer" :style="{ fontSize: `${lineFontSize}px` }">
    <div class="code-viewer-gutters">
      <div class="code-gutters-item" v-for="(line, number) in props.code" :key="line.id"
        :style="{ top: `${number * lineHeight}px`, height: `${lineHeight}px` }">
        <div class="code-gutters-item__index">{{ number + 1 }}</div>
        <div class="code-gutters-item__after">
          <slot name="gutter-after" />
        </div>
      </div>
    </div>
    <div class="code-viewer-content" ref="codeViewerContentRef">
      <div class="view-lines">
        <div v-for="(line, number) in props.code" :key="line.id" :data-line-id="line.id" class="view-line">
          <div class="code-line-content" :style="{ top: `${number * lineHeight}px`, height: `${lineHeight}px` }">
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
import { computed, onMounted } from 'vue'
import '../styles/index.css'
import { EventBus } from './event-bus'

type CodeSize = 'small' | 'medium' | 'large'

const props = withDefaults(
  defineProps<{
    code: CodeLine[]
    plugins?: Plugin[],
    size?: CodeSize
  }>(),
  {
    code: () => [],
    plugins: () => [],
    size: 'small'
  }
)

const CodeSizeMap: Record<CodeSize, { height: number, fontSize: number }> = {
  small: { height: 18, fontSize: 12 },
  medium: { height: 21, fontSize: 14 },
  large: { height: 24, fontSize: 16 }
}
const lineHeight = computed(() => CodeSizeMap[props.size].height)
const lineFontSize = computed(() => CodeSizeMap[props.size].fontSize)


const eventBus = new EventBus() // 初始化事件总线
const pluginManager = new PluginManager(eventBus)
const initPlugins = () => { // 初始化插件
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

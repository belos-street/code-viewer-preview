<template>
  <div class="code-viewer">
    <div class="code-viewer-gutters">
      <div class="code-gutters-item" v-for="(line, number) in props.code" :key="line.id">
        <slot name="gutter-left" />
        <span class="code-gutters__index">{{ number + 1 }}</span>
        <slot name="gutter-right" />
      </div>
    </div>
    <div class="code-viewer-content" ref="codeViewerContentRef">
      <div class="view-lines">
        <div v-for="line in props.code" :key="line.id" :data-line-id="line.id" class="view-line">
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
import { onMounted } from 'vue'
import '../styles/index.css'
import { EventBus } from './event-bus'

const props = withDefaults(
  defineProps<{
    code: CodeLine[]
    plugins?: Plugin[]
  }>(),
  {
    code: () => [],
    plugins: () => []
  }
)

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

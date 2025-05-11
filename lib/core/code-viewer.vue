<script setup lang="ts">
import { markRaw, onBeforeUnmount, onMounted, provide, reactive, ref, shallowRef, type Component } from 'vue'
import type { CodeLine, Plugin, PluginContext } from './types'
import { eventBus } from './event-bus'
import { installPlugin, uninstallPlugin } from './api'

const props = withDefaults(
  defineProps<{
    code: CodeLine[]
    // language: string
    // theme: string
    // size: number
    plugins: Plugin[]
  }>(),
  {
    code: () => [],
    plugins: () => []
  }
)

// const codeViewerContentRef = ref<HTMLElement | null>(null) // 容器 content 的 ref
// const codeViewerGuttersRef = ref<HTMLElement | null>(null) // 容器 gutters 的 ref
// const displayedCode = ref<CodeLine[]>([]) // 代码行信息

const registeredPlugins = shallowRef<Map<string, Plugin>>(new Map()) // 已注册的插件列表
const gutterComponents = shallowRef<Array<{ name: string; component: Component }>>([])

// 创建响应式的插件上下文
const pluginContext = reactive<PluginContext>({
  eventBus,
  getCodeData: () => props.code,
  // 核心API：注册Gutter组件，用于行号等插件
  registerGutterComponent: (name: string, component: any) => {
    const rawComponent = markRaw(component)
    if (!gutterComponents.value.find((gc) => gc.name === name)) {
      gutterComponents.value.push({ name, component: rawComponent })
      // 按名称排序以确保一致性，或者可以根据插件加载顺序
      gutterComponents.value.sort((a, b) => a.name.localeCompare(b.name))
    }
  },
  unregisterGutterComponent: (name: string) => {
    gutterComponents.value = gutterComponents.value.filter((gc) => gc.name !== name)
  }
})

// 初始插件加载
onMounted(() => {
  props.plugins.forEach((plugin) => {
    if (!registeredPlugins.value.has(plugin.name)) installPlugin(plugin, pluginContext, registeredPlugins)
  })
  eventBus.emit('codeviewer:mounted')
})

// 卸载所有插件
onBeforeUnmount(() => {
  registeredPlugins.value.forEach((plugin) => {
    uninstallPlugin(plugin.name, pluginContext, registeredPlugins)
  })
  eventBus.emit('codeviewer:beforeUnmount')
})

provide('pluginContext', pluginContext)
</script>

<template>
  <div class="code-viewer">
    <div class="code-viewer-gutters" ref="codeViewerGuttersRef"></div>
    <div class="code-viewer-content" ref="codeViewerContentRef">
      <div class="view-lines">
        <div class="view-line"></div>
      </div>
    </div>
  </div>
</template>

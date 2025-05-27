import type { Plugin, PluginContext } from 'lib/core'
import { h, watch } from 'vue'

export const LineBgColorPlugin: Plugin = {
  name: 'line-bg-color',
  _processed: new Set<string | number>(),

  install(context: PluginContext) {
    // 只处理 visibleItems
    watch(
      () => context.visibleItems.value,
      (visibleItems) => {
        visibleItems.forEach(line => {
          if (!line.vNode) {
            const bgColor = line.meta?.bgColor
            if (bgColor) {
              line.vNode = h('div', { style: { background: bgColor } }, line.content)
            } else {
              line.vNode = h('div', {}, line.content)
            }
          }
        })
      },
      { immediate: true }
    )
  },

  uninstall() { }
}

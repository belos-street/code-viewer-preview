import type { Plugin, PluginContext } from 'lib/core'
import { h } from 'vue'

export const LineBgColorPlugin: Plugin = {
  name: 'line-bg-color',

  install(context: PluginContext) {
    const { codeLines, visibleLines } = context
    codeLines.value.map((line) => {
      const bgColor = line.meta?.bgColor
      // 用 h 函数生成 VNode，赋值到 line.htmlVNode
      if (bgColor) {
        line.vNode = h('div', { style: { background: bgColor } }, line.content)
      } else {
        line.vNode = h('div', {}, line.content)
      }
    })
  },

  uninstall() {}
}

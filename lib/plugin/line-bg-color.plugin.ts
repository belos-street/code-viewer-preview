import type { Plugin, PluginContext } from '../core/types'

export const LineBgColorPlugin: Plugin = {
  name: 'line-bg-color',
  _processed: new Set<string | number>(), // 缓存已处理行

  install(context: PluginContext) {
    this._processVisible(context)
  },

  _processVisible(context: PluginContext) {
    context.visibleItems.forEach(line => {
      if (!this._processed.has(line.id)) {
        const bg = line.meta?.bgColor
        if (bg) {
          line.html = `<div style="background:${bg};width:100%;height:100%;">${line.content}</div>`
        } else {
          line.html = line.content
        }
        this._processed.add(line.id)
      }
    })
  },

  // 插件可暴露一个方法供外部调用（如滚动时）
  onVisibleChange(context: PluginContext) {
    this._processVisible(context)
  },

  uninstall() {
    this._processed = new Set()
  }
}

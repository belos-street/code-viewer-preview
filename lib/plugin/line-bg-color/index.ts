import type { Plugin, PluginContext } from 'lib/core'
import { h, watch } from 'vue'

export const LineBgColorPlugin: Plugin = {
  name: 'line-bg-color',
  _processed: new Set<string | number>(),

  install(context: PluginContext) {},

  uninstall() {}
}

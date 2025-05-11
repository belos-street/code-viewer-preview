import type { Ref } from 'vue'
import type { PluginContext, Plugin } from '../types'
import { eventBus } from '../event-bus'

export const installPlugin = (plugin: Plugin, pluginContext: PluginContext, registeredPlugins: Ref<Map<string, Plugin>>) => {
  if (!registeredPlugins.value.has(plugin.name)) {
    try {
      plugin.install(pluginContext)
      registeredPlugins.value.set(plugin.name, plugin)
      // 强制更新，因为 Map 不是深度响应的
      registeredPlugins.value = new Map(registeredPlugins.value)
      console.log(`Plugin '${plugin.name}' installed.`)
      eventBus.emit('plugin:installed', { pluginName: plugin.name })
    } catch (error) {
      console.error(`Failed to install plugin '${plugin.name}':`, error)
    }
  }
}

export const uninstallPlugin = (
  pluginName: string,
  pluginContext: PluginContext,
  registeredPlugins: Ref<Map<string, Plugin>>
) => {
  const plugin = registeredPlugins.value.get(pluginName)
  if (plugin) {
    try {
      plugin.uninstall(pluginContext)
      registeredPlugins.value.delete(pluginName)
      // 强制更新
      registeredPlugins.value = new Map(registeredPlugins.value)
      console.log(`Plugin '${pluginName}' uninstalled.`)
      eventBus.emit('plugin:uninstalled', { pluginName })
    } catch (error) {
      console.error(`Failed to uninstall plugin '${pluginName}':`, error)
    }
  }
}

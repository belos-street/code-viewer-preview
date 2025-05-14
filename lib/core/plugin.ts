import type { Plugin, PluginContext } from './types'
import { eventBus } from './event-bus'

/**
 * 插件管理器
 * @description管理插件的安装和卸载，并提供插件的注册和获取功能。
 */
class PluginManager {
  private plugins: Map<string, Plugin> = new Map()

  /**
   * 注册插件
   * @param plugin 插件实例
   */
  registerPlugin(plugin: Plugin): void {
    if (this.plugins.has(plugin.name)) {
      console.warn(`Plugin "${plugin.name}" already exists. Skipping registration.`)
      return
    }
    this.plugins.set(plugin.name, plugin)
    const context: PluginContext = {
      eventBus
    }
    plugin.install(context)
    console.log(`Plugin "${plugin.name}" registered and installed.`)
  }

  /**
   * 卸载插件
   * @param pluginName 插件名称
   */
  uninstallPlugin(pluginName: string): void {
    const plugin = this.plugins.get(pluginName)
    if (!plugin) {
      console.warn(`Plugin "${pluginName}" does not exist. Skipping uninstallation.`)
      return
    }
    const context: PluginContext = {
      eventBus
    }
    plugin.uninstall(context)
    this.plugins.delete(pluginName)
    console.log(`Plugin "${pluginName}" uninstalled.`)
  }

  /**
   * 获取所有已注册的插件
   */
  getPlugins(): Plugin[] {
    return Array.from(this.plugins.values())
  }
}

// 导出插件管理器实例
export const pluginManager = new PluginManager()

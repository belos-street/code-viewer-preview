import type { Plugin, PluginContext, PluginManagerOptions } from '../types'

/**
 * 插件管理器
 * @description 管理插件的安装和卸载，并提供插件的注册和获取功能。
 */

export class PluginManager {
  public plugins: Map<string, Plugin> = new Map()
  public options: PluginManagerOptions

  constructor(options: PluginManagerOptions) {
    this.options = options
  }
  /**
   * 注册插件
   * @param plugin 插件实例
   */
  async registerPlugin(plugin: Plugin): Promise<void> {
    if (this.plugins.has(plugin.name)) {
      console.warn(`Plugin "${plugin.name}" already exists. Skipping registration.`)
      return
    }
    this.plugins.set(plugin.name, plugin)
    const context: PluginContext = {
      ...this.options
    }
    try {
      await plugin.install(context)
      console.log(`Plugin "${plugin.name}" registered and installed.`)
    } catch (error) {
      this.plugins.delete(plugin.name) // Remove from map if install failed
      throw error // Re-throw to notify the caller
    }
  }

  /**
   * 卸载插件
   * @param pluginName 插件名称
   */
  async uninstallPlugin(pluginName: string): Promise<void> {
    const plugin = this.plugins.get(pluginName)
    if (!plugin) {
      console.warn(`Plugin "${pluginName}" does not exist. Skipping uninstallation.`)
      return
    }
    const context: PluginContext = {
      ...this.options
    }
    try {
      await plugin.uninstall(context)
      this.plugins.delete(pluginName)
      console.log(`Plugin "${pluginName}" uninstalled.`)
    } catch (error) {
      console.error(`Error uninstalling plugin "${pluginName}":`, error)
      throw error // Re-throw to notify the caller
    }
  }

  /**
   * 获取所有已注册的插件
   */
  getPlugins(): Plugin[] {
    return Array.from(this.plugins.values())
  }

  /**
   * 销毁插件管理器，清理资源
   * 包括卸载所有插件、停止监听和清理处理总线
   */
  async destroy(): Promise<void> {
    // 卸载所有插件
    for (const plugin of this.getPlugins()) {
      await this.uninstallPlugin(plugin.name)
    }
  }
}

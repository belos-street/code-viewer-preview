import type { CodeLine, Plugin, PluginContext } from './types'
import { EventBus } from './event-bus'

/**
 * 插件管理器
 * @description管理插件的安装和卸载，并提供插件的注册和获取功能。
 * @param eventBus 事件总线实例
 */
export class PluginManager {
  private plugins: Map<string, Plugin> = new Map()
  private codeLines: CodeLine[] = []
  private visibleItems: CodeLine[] = []

  constructor(private eventBus: EventBus) {
    this.eventBus = eventBus
  }

  setCodeLines(codeLines: CodeLine[]) {
    this.codeLines = codeLines
  }

  setVisibleItems(visibleItems: CodeLine[]) {
    this.visibleItems = visibleItems
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
      eventBus: this.eventBus,
      codeLines: this.codeLines,
      visibleItems: this.visibleItems
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
      eventBus: this.eventBus,
      codeLines: this.codeLines,
      visibleItems: this.visibleItems
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
}

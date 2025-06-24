import type { Plugin, PluginContext } from '../types'
import { watch, type WatchStopHandle } from 'vue'
import { LineProcessorBus, type LineProcessor } from './src/processLines'

// 导出行处理器接口和总线，供插件使用
export { LineProcessorBus, type LineProcessor }

type PluginManagerOptions = Pick<PluginContext, 'codeLines' | 'visibleLines'> & { language?: string }

/**
 * 插件管理器
 * @description管理插件的安装和卸载，并提供插件的注册和获取功能。
 * 监听 visibleLines 变化，通知插件处理行内容
 */

export class PluginManager {
  private plugins: Map<string, Plugin> = new Map()
  private options: PluginManagerOptions
  private lineProcessorBus: LineProcessorBus = new LineProcessorBus()
  private watchStopHandle: WatchStopHandle | null = null

  constructor(options: PluginManagerOptions) {
    this.options = options

    // 监听 visibleLines 变化
    this.watchStopHandle = watch(
      options.visibleLines,
      (newVisibleLines) => {
        // 处理新的可见行
        console.log(1)
        this.lineProcessorBus.processLines(newVisibleLines)
      },
      { immediate: true, deep: false }
    )
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
      ...this.options,
      lineProcessorBus: this.lineProcessorBus // 将行处理总线传递给插件
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
      ...this.options,
      lineProcessorBus: this.lineProcessorBus
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

    // 停止监听 visibleLines 变化
    if (this.watchStopHandle) {
      this.watchStopHandle()
      this.watchStopHandle = null
    }

    // 清理行处理总线
    this.lineProcessorBus.clearProcessedLineIds()
  }
}

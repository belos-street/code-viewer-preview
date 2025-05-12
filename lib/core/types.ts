/**
 * 单行代码数据结构
 */
export type CodeLine = {
  id: string | number // 每行的唯一标识
  raw?: string // 代码原始文本内容
  content: string // 代码的HTML内容
  meta?: Record<string, any> // 元数据
}
export type CodeList = CodeLine[]

/**
 * 插件上下文，包含核心API和事件总线实例
 */
export type PluginContext = {
  eventBus: {
    on: (eventName: string, handler: (payload?: any) => void) => void
    off: (eventName: string, handler: (payload?: any) => void) => void
    emit: (eventName: string, payload?: any) => void
  }
} & Record<string, any> // 允许插件上下文扩展

/**
 * 插件接口定义
 */
export type Plugin = {
  name: string // 插件名称，唯一标识
  install: (context: PluginContext) => void // 安装插件
  uninstall: (context: PluginContext) => void // 卸载插件
} & Record<string, any> // 插件可以有其他自定义方法和属性

import type { EventBusType } from './event-bus'


/**
 * 用户传参的代码行数据结构
 */
export type RawCodeLine = {
  id: string | number // 每行的唯一标识
  content: string // 代码原始文本内容
  meta?: Record<string, any> // 元数据
}

/**
 * 单行代码数据结构
 */
export type CodeLine = RawCodeLine & {
  index: number // 代码行号
  html: string // 渲染用的HTML字符串
}


/**
 * 插件上下文，包含核心API和事件总线实例
 */
export type PluginContext = {
  eventBus: EventBusType
  codeLines: CodeLine[] // 新增，插件可访问和修改codeLines
  visibleItems: CodeLine[] // 新增，插件可访问当前可见行
} & Record<string, any> // 允许插件上下文扩展

/**
 * 基础插件接口
 */
export type Plugin = {
  name: string // 插件名称，唯一标识
  install: (context: PluginContext) => Promise<void> | void // 安装插件
  uninstall: (context: PluginContext) => Promise<void> | void // 卸载插件
} & Record<string, any> // 插件可以有其他自定义方法和属性

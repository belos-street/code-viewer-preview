import type { Emitter } from 'mitt'
import type { ComputedRef, Ref, VNode } from 'vue'
import type { EventPayloads } from './event-bus'

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
  vNode?: VNode
}

/**
 * 插件上下文，包含核心API和事件总线实例
 */
export type PluginContext = {
  codeLines: Ref<CodeLine[]> // 代码行数据的响应式引用
  visibleLines: ComputedRef<CodeLine[]> // 可见的代码行数据的响应式引用
  eventBus: Emitter<EventPayloads>
} & Record<string, any> // 允许插件上下文扩展

export type PluginManagerOptions = PluginContext

export type ProcessedItem = {
  container: string
  style: any //
}

export type ProcessedResult = Record<RawCodeLine['id'], ProcessedItem>

/**
 * 基础插件接口
 */
export type Plugin = {
  name: string // 插件名称，唯一标识
  install: (context: PluginContext) => Promise<void> | void // 安装插件
  uninstall: (context: PluginContext) => Promise<void> | void // 卸载插件
  processedLines: (context: PluginContext) => Promise<ProcessedResult> | ProcessedResult
} & Record<string, any> // 插件可以有其他自定义方法和属性

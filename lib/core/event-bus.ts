// lib/core/event-bus.ts

import type { CodeLine } from './types' // 导入 CodeLine 类型
//import mitt from 'mitt' // 导入 mitt

/**
 * 事件名称枚举
 */
export enum EventName {
  SCROLL = 'scroll', // 滚动事件
  LINE_CHANGED = 'line-changed', // 代码行内容变化事件
  LINE_ADDED = 'line-added', // 代码行添加事件
  LINE_REMOVED = 'line-removed', // 代码行删除事件
  PLUGIN_INSTALLED = 'plugin-installed', // 插件安装事件
  PLUGIN_UNINSTALLED = 'plugin-uninstalled', // 插件卸载事件
  THEME_CHANGED = 'theme-changed', // 主题变化事件
  LANGUAGE_CHANGED = 'language-changed', // 语言变化事件
  SELECTION_CHANGED = 'selection-changed', // 选择变化事件
  CURSOR_MOVED = 'cursor-moved' // 光标移动事件
}

/**
 * 定义事件负载类型
 */
export type EventPayloads = {
  [EventName.SCROLL]: CodeLine[]
  [EventName.LINE_CHANGED]: CodeLine[]
}

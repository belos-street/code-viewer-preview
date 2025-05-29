// lib/core/event-bus.ts

import type { CodeLine } from './types' // 导入 CodeLine 类型

type Handler<K extends EventName> = (payload: EventPayloads[K]) => void

export class EventBus {
  private handlers: { [K in EventName]: Handler<K>[] } = {} as { [K in EventName]: Handler<K>[] }
  /**
   * 订阅事件
   * @param eventName 事件名称
   * @param handler 事件处理函数
   */
  on<K extends EventName>(eventName: K, handler: Handler<K>) {
    if (!this.handlers[eventName]) this.handlers[eventName] = []
    this.handlers[eventName].push(handler)
  }
  /**
   * 取消订阅事件
   * @param eventName 事件名称
   * @param handler 事件处理函数
   */
  off<K extends EventName>(eventName: K, handler: Handler<K>) {
    if (!this.handlers[eventName]) return
    const handlers = this.handlers[eventName].filter((h) => h !== handler) as Handler<K>[]
    this.handlers = { ...this.handlers, [eventName]: handlers }
  }

  /**
   * 触发事件
   * @param eventName 事件名称
   * @param payload 事件负载
   */
  emit<K extends EventName>(eventName: K, payload: EventPayloads[K]) {
    if (!this.handlers[eventName]) return
    this.handlers[eventName].map((handler) => handler(payload))
  }
}

//EventBus 类型
export type EventBusType = Omit<EventBus, 'handlers'>

export enum EventName {
  SCROLL = 'scroll' // 滚动事件
}

// 定义事件负载类型
type EventPayloads = {
  [EventName.SCROLL]: CodeLine[]
}

// lib/core/event-bus.ts

type Handler = (payload?: any) => void

export class EventBus {
  private handlers: { [eventName: string]: Handler[] } = {}

  /**
   * 订阅事件
   * @param eventName 事件名称
   * @param handler 事件处理函数
   */
  on(eventName: string, handler: Handler) {
    if (!this.handlers[eventName]) this.handlers[eventName] = []
    this.handlers[eventName].push(handler)
  }
  /**
   * 取消订阅事件
   * @param eventName 事件名称
   * @param handler 事件处理函数
   */
  off(eventName: string, handler: Handler) {
    if (!this.handlers[eventName]) return
    this.handlers[eventName] = this.handlers[eventName].filter((h) => h !== handler)
  }

  /**
   * 触发事件
   * @param eventName 事件名称
   * @param payload 事件负载
   */
  emit(eventName: string, payload?: any) {
    if (!this.handlers[eventName]) return
    this.handlers[eventName].map((handler) => handler(payload))
  }
}

//EventBus 类型
export type EventBusType = Omit<EventBus, 'handlers'>

export enum EventName {
  SCROLL = 'scroll', // 滚动事件
  LINE_DOM_RENDERED = 'lineDomRendered' // 代码行 DOM 渲染完成事件
}

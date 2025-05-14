// lib/core/event-bus.ts

type Handler = (payload?: any) => void

class EventBus {
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

export const eventBus = new EventBus()

//EventBus 类型
export type EventBusType = Omit<EventBus, 'handlers'>

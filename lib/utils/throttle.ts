/**
 * 创建一个节流函数，该函数在被频繁调用时，会限制执行频率，每隔指定时间只执行一次
 *
 * @param func 要节流的函数
 * @param wait 执行间隔时间（毫秒）
 * @returns 节流包装后的函数
 */
export function throttle<T extends (...args: any[]) => void>(func: T, wait: number): (...args: Parameters<T>) => void {
  let lastTime = 0

  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    const now = Date.now()
    if (now - lastTime >= wait) {
      func.apply(this, args)
      lastTime = now
    }
  }
}

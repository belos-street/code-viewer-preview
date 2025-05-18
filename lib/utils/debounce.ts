/**
 * 创建一个防抖函数，该函数在被频繁调用时，只有在最后一次调用后经过指定间隔没有再次调用时才会执行
 *
 * @param func 要防抖的函数
 * @param wait 延迟时间（毫秒）
 * @returns 防抖包装后的函数
 */
export function debounce<T extends (...args: any[]) => void>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeoutId: number | null = null

  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    if (timeoutId !== null) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      func.apply(this, args)
      timeoutId = null
    }, wait)
  }
}

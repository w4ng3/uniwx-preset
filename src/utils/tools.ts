/**
 * 模拟异步请求
 */
export function sleep(second: number = 1) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, 1000 * second)
  })
}


export function isNumber<T extends number>(data: T | unknown): data is T {
  return Object.prototype.toString.call(data) === '[object Number]'
}

export function isObject<T extends Record<string, any>>(data: T | unknown): data is T {
  return Object.prototype.toString.call(data) === '[object Object]'
}

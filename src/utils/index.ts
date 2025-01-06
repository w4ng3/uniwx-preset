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

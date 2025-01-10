import type { UnConfig } from '@uni-helper/uni-network'
import { isObject } from '@/utils'


/** 返回参数类型, 可以添加更多自定义属性，根据业务需求修改 */
export interface CustomData<T = Record<string, any>> {
  code: enums.ApiCodeEnum
  msg: string
  data: T
}

interface Req {
  data?: CustomData
  config?: UnConfig
}

// 错误处理函数
export function handleError(
  req: Req,
  callback?: (error: CustomData) => void,
) {
  const { data: error, config: reqConfig } = req
  // 判断是否接口返回的异常码，根据业务需求修改
  if (isObject(error) && error !== null && 'code' in error) {
    // 使用类型断言处理自定义错误对象
    const customError = error as CustomData
    console.error(`发生请求错误: Code ${customError.code}, Message: ${customError.msg}`, '\n----\n', '异常接口请求参数：', reqConfig)
    // 如果提供了回调函数并且错误有 errorCode 属性，执行回调
    if (callback) { callback(customError) }

    return customError
  }
}

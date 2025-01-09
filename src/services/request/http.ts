import { ApiCodeEnum } from '../enums'
import type { Data } from './helper'
import { getBaseUrl } from '@/utils/env'
import { useUserStore } from '@/stores'

// 拦截器配置
const httpInterceptor = {
  // 拦截前触发
  invoke(options: UniApp.RequestOptions) {
    // 1. 非 http 开头需拼接地址
    if (!options.url.startsWith('http')) {
      options.url = getBaseUrl() + options.url
    }
    // 2. 请求超时
    options.timeout = import.meta.env.VITE_REQUEST_TIMEOUT || 10_000
    options.dataType = 'json'
    // 3. 添加小程序端请求头标识
    options.header = {
      'source-client': 'miniapp',
      ...options.header,
    }
    // 4. 添加 token 请求头标识
    const userStore = useUserStore()
    const token = userStore.token
    if (token) {
      options.header.Authorization = token
    }
  },
}

// 拦截 request 请求
uni.addInterceptor('request', httpInterceptor)

// 拦截 uploadFile 文件上传
uni.addInterceptor('uploadFile', httpInterceptor)

/**
 * 请求函数
 * @param  UniApp.RequestOptions
 * @returns Promise
 *  1. 返回 Promise 对象，用于处理返回值类型
 *  2. 获取数据成功
 *    2.1 提取核心数据 res.data
 *    2.2 添加类型，支持泛型
 *  3. 获取数据失败
 *    3.1 401错误  -> 清理用户信息，跳转到登录页
 *    3.2 其他错误 -> 根据后端错误信息轻提示
 *    3.3 网络错误 -> 提示用户换网络
 */

// 2.2 添加类型，支持泛型
export function http<T>(options: UniApp.RequestOptions, useLoading = false) {
  // 1. 返回 Promise 对象
  return new Promise<Data<T>>((resolve, reject) => {
    if (useLoading) {
      uni.showLoading({ title: '', mask: true })
    }
    uni.request({
      method: 'POST', // 默认 POST 请求
      ...options,

      // 响应成功
      success(res) {
        // 状态码 2xx
        const resp = res.data as Data<T>
        if (res.statusCode >= 200 && res.statusCode < 300) {
          if (resp.code === ApiCodeEnum.SUCCESS) {
            if (useLoading) { uni.hideLoading() }
            resolve(resp)
          }
          else if (resp.code === ApiCodeEnum.UNAUTHORIZEDC) {
            uni.showToast({ icon: 'error', title: '登录失效' })
            // 清理用户信息，重定向到登录页
            const memberStore = useUserStore()
            memberStore.$reset()
            uni.redirectTo({ url: '/pages/login/index' })
            reject(res)
          }
          else {
            uni.showToast({
              icon: 'error',
              title: resp.msg,
            })
            reject(res)
          }
        }
        else {
          // 其他错误 -> 根据后端错误信息轻提示
          uni.showToast({
            icon: 'none',
            title: resp.msg || '请求错误',
          })
          reject(res)
        }
      },
      // 响应失败
      fail(err) {
        uni.showToast({
          icon: 'none',
          title: '网络错误，换个网络试试',
        })
        reject(err)
      },
    })
  })
}

import un, { type UnConfig, type UnResponse } from '@uni-helper/uni-network'
import { ApiCodeEnum } from '../enums'
import { Loading } from './loading'
import { getBaseUrl, getReqTimeout } from '@/utils'

export * from './helper'

/**
 * @see 文档：https://uni-network.netlify.app/
 */
export const instance = un.create({
  // h5 需要添加代理，根据业务需求自行判断环境后处理
  baseUrl: getBaseUrl(),
  /**
   * TODO 由于小程序兼容性问题，统一请求方式 POST，根据业务需求在请求中传递 config 修改
   * 例如：request('', {}, {
   *     method: 'GET',
   *   })
   */
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
  data: {},
  timeout: getReqTimeout(),
  // 默认展示全局 loading
  loading: true,
})
const loading = new Loading()

// 请求拦截器
instance.interceptors.request.use((config) => {
  loading.show(config.loading)
  const userStore = useUserStore()
  config.headers = {
    ...config.headers,
    Authorization: userStore.token,
  }
  return config
})

// 响应拦截器
instance.interceptors.response.use((response: UnResponse<any>) => {
  const { errno } = response
  if (errno) {
    uni.showToast({ icon: 'none', title: '服务器出错，请稍后再试。' })
    loading.hide(true)
    return Promise.reject(response)
  }
  loading.hide(response.config?.loading)
  // TODO 返回数据根据业务需求修改
  const { code, data } = response.data
  if (code === undefined) { return response.data }
  else if (code === ApiCodeEnum.SUCCESS) { return data }
  handleError(response, (error) => {
    if (error.code === ApiCodeEnum.UNAUTHORIZEDC) {
      uni.showToast({ icon: 'error', title: '登录失效' })
      // 清理用户信息，重定向到登录页
      const userStore = useUserStore()
      userStore.$reset()
      uni.redirectTo({ url: '/pages-my/login' })
    }
    else {
      uni.showToast({ title: error.msg, icon: 'none' })
    }
  })
  return Promise.reject(response.data)
}, (error) => {
  loading.hide(error.config.loading)
  return Promise.reject(error)
})

/**
 * 预设的响应数据类型和请求数据类型
 * @description 泛型内数据类型：<响应数据类型, 请求数据类型>，可不传，默认为 <Record<string, any>
 * @method 默认POST
 */
export function request<T, D = Record<string, any>>(
  url: string,
  config?: UnConfig<T, D> & { loading?: boolean },
) {
  return instance.request<T, D, T>({ url, ...config })
}

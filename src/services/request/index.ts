import un, { type UnConfig } from '@uni-helper/uni-network'
import { Loading } from './loading'
import { getBaseUrl } from '@/utils'

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
  // 默认展示全局 loading
  loading: true,
})
const loading = new Loading()

// 请求拦截器
instance.interceptors.request.use((config) => {
  loading.show(config.loading)
  return config
})

instance.interceptors.response.use((response: any) => {
  const { errno } = response
  if (errno) {
    uni.showToast({
      icon: 'none',
      title: '服务器出错，请稍后再试。',
    })
    loading.hide(true)
    return Promise.reject(response)
  }
  loading.hide(response.config.loading)
  return response.data
  // TODO 返回数据根据业务需求修改
  /* const { code, data, msg } = response.data
  if (code === 1)
    return data

  showToast({
    title: msg,
  })
  handleError(response)
  return Promise.reject(response.data) */
}, (error) => {
  loading.hide(error.config.loading)
  return Promise.reject(error)
})

type RequestData = Record<string, any>

/**
 * 预设的请求数据类型和响应数据类型
 * @description 泛型内数据类型：<响应数据类型, 请求数据类型>，可不传，默认为 <Record<string, any>, Record<string, any>>
 */
export async function request<T, D = RequestData>(
  url: string,
  data?: D,
  config?: UnConfig<T, D>,
) {
  return instance.request<T, D, T>({ url, data, ...config })
}


// interface GithubReposRes {
//   name: string
//   description: string
//   html_url: string
// }

// export async function fetchGithubRepos() {
//   return await request<GithubReposRes>('/repos/sunpm/unisave', {}, {
//     method: 'GET',
//   })
// }

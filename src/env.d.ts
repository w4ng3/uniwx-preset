/// <reference types="vite/client" />

/**
 * wd-form 组件的 rules 类型
 */
declare type W4mRules<T> = {
  [K in keyof T]: FormItemRule[]
}

interface ImportMetaEnv {
  /** 请求域名 */
  VITE_HTTP_URL: string
  /** 接口请求前缀 */
  VITE_BASE_API: string
  /** 请求超时时长 */
  VITE_REQUEST_TIMEOUT: number
  /** 文件上传api */
  VITE_UPLOAD_API: string
}

/**
 * @description: Get environment variables
 * @returns: 'production'| 'development'
 */
export function getEnv(): string {
  return import.meta.env.MODE
}

export function getReqTimeout(): number {
  return import.meta.env.VITE_REQUEST_TIMEOUT
}

export function getHttpUrl(): string {
  return import.meta.env.VITE_HTTP_URL
}

export function getBaseUrl(): string {
  return `${import.meta.env.VITE_HTTP_URL}${import.meta.env.VITE_BASE_API}`
}

/** 文件上传地址 */
export const UPLOAD_URL = `${import.meta.env.VITE_HTTP_URL}${import.meta.env.VITE_UPLOAD_API}`

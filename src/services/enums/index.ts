/** 请求响应类型 */
export enum ApiCodeEnum {
  /** 请求成功 */
  SUCCESS = 0,
  /** 服务异常 */
  FAIL = 1,
  /** 登录失效，请重新登录 */
  UNAUTHORIZEDC = 401,
  /** 没有权限，禁止访问 */
  FORBIDDEN = 403,
  /** 服务器异常，请稍后再试 */
  INTERNAL_SERVER_ERROR = 500,
}

/** 富文本类型 */
export enum TextEnum {
  /** 关于我们 */
  About = 0,
  /** 隐私协议 */
  Privacy = 1,
}

// export enum EnumTaskPublishStatus {
//   发布 = 0,
//   开始 = 1,
//   结束 = 2,
// }

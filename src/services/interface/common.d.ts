/** 返回参数类型 */
interface Data<T> {
  code: enums.ApiCodeEnum
  msg: string
  data: T
}

/** 分页参数 */
interface IPage {
  asc?: boolean
  order?: string
  /** 默认条数 */
  limit: number
  /** 开始页，从1开始 */
  page: number
}

/**
 * 分页响应数据
 */
interface PageResult<T> {
  /**
   * 列表数据
   */
  list: T[]
  /**
   * 总记录数
   */
  total: number
}

/**
 * PrivacyVO
 */
interface PrivacyVO {
  /**
   * 富文本内容
   */
  content: string
  id: number
  /**
   * 类型（0-关于我们，1-隐私政策）
   */
  type: 0 | 1
}

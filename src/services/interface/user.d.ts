interface UserinfoVO {
  id: number
  name: string
  phone: string
  avatar: string
  /** 0-男 1-女 */
  gender: 0 | 1
  /** 学历 */
  education: 0 | 1 | 2 | 3 | 4 | 5
  /** 描述 */
  description?: string
}

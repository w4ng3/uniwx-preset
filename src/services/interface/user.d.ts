interface UserLoginDTO {
  /**
   * 登录方式:
   * 0-微信授权登录（code）;
   * 1-手机号验证码登录（phone & code）;
   * 2-手机号密码登录（phone & password）;
   */
  loginType: 0 | 1 | 2
  /**
   * 短信验证码或者微信code
   */
  code?: string
  password?: string
  phone?: string
}

interface UserLoginVO {
  token: string
}

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
  /**
   * 省市区码
   * @example ['110000', '110100', '110101']
   */
  area: string[]
}

type UserinfoUpdateDTO = Omit<UserinfoVO, 'id' | 'phone'>

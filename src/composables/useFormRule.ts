/**
 * Wot Design Uni 组件的表单校验规则
 */
export function useFormRule() {
  // 匹配6位数字
  const num6Rule = [{ required: true, message: '请填写6位数密码', pattern: /^\d{6}$/ }]

  const passwordRule = [
    { required: true, message: '请填写密码' },
    // {
    //   required: true,
    //   message: '密码格式为7-12位字母数字组合',
    //   pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{7,12}$/
    // }
    {
      required: true,
      message: '密码格式为8位以上字母数字和特殊字符组合',
      // @regex101 https://regex101.com/?regex=%5E%28%3F%3D.*%5BA-Z%5D%29%28%3F%3D.*%5Cd%29%28%3F%3D.*%5B%7E%21%40%23%24%25%5E%26*%28%29_%2B%60%5C-%3D%7B%7D%3A%22%3B%27%3C%3E%3F%2C.%2F%5D%29.%7B8%2C%7D%24&flags=i&flavor=javascript
      pattern: /^(?=.*[A-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}:";'<>?,./]).{8,}$/i,
    },
  ]

  /** 校验邮箱 */
  const emailRule = [
    { required: true, message: '请填写邮箱' },
    { required: true, type: 'email', message: '邮箱格式错误' },
  ]

  const phoneRule = [
    { required: true, message: '请填写手机号' },
    // @regex101 https://regex101.com/?regex=%5E1%5B3-9%5D%5Cd%7B9%7D%24&flavor=javascript
    { required: true, pattern: /^1[3-9]\d{9}$/, message: '手机号格式错误' },
  ]
  const codeRule = [{ required: true, message: '请填写验证码' }]

  /** 校验金额，保留两位小数 */
  const feeRule = [
    { required: true, message: '请输入金额' },
    // @regex101 https://regex101.com/?regex=%5E%5Cd%2B%28%5C.%5Cd%7B1%2C2%7D%29%3F%24&flavor=javascript
    { required: true, pattern: /^\d+(\.\d{1,2})?$/, message: '金额最多输入两位小数' },
  ]

  /** 校验银行卡号 */
  const bankCardRule = [
    { required: true, message: '请填写银行卡号' },
    // @regex101 https://regex101.com/?regex=%5E%5B1-9%5D%5Cd%7B9%2C29%7D%24&flavor=javascript
    { required: true, pattern: /^[1-9]\d{9,29}$/, message: '银行卡号格式错误' },
  ]
  /** 校验身份证号 */
  const idCardRule = [
    { required: true, message: '请填写身份证号' },
    {
      required: true,
      // @regex101 https://regex101.com/?regex=%5E%5B1-9%5D%5Cd%7B5%7D%28%3F%3A18%7C19%7C20%29%5Cd%7B2%7D%28%3F%3A0%5B1-9%5D%7C10%7C11%7C12%29%28%3F%3A0%5B1-9%5D%7C%5B12%5D%5Cd%7C30%7C31%29%5Cd%7B3%7D%5B%5CdX%5D%24&flags=i&flavor=javascript
      pattern: /^[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[12]\d|30|31)\d{3}[\dX]$/i,
      message: '身份证号格式错误',
    },
  ]

  return { passwordRule, emailRule, phoneRule, codeRule, num6Rule, feeRule, bankCardRule, idCardRule }
}

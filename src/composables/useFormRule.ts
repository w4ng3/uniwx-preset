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
    { required: true, pattern: /^1[3-9]\d{9}$/, message: '手机号格式错误' },
  ]
  const codeRule = [{ required: true, message: '请填写验证码' }]

  /** 校验金额，保留两位小数 */
  const feeRule = [
    { required: true, message: '请输入金额' },
    { required: true, pattern: /^\d+(\.\d{1,2})?$/, message: '金额最多输入两位小数' },
  ]

  /** 校验银行卡号 */
  const bankCardRule = [
    { required: true, message: '请填写银行卡号' },
    { required: true, pattern: /^[1-9]\d{9,29}$/, message: '银行卡号格式错误' },
  ]
  /** 校验身份证号 */
  const idCardRule = [
    { required: true, message: '请填写身份证号' },
    {
      required: true,
      pattern: /^[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[12]\d|30|31)\d{3}[\dX]$/i,
      message: '身份证号格式错误',
    },
  ]

  return { passwordRule, emailRule, phoneRule, codeRule, num6Rule, feeRule, bankCardRule, idCardRule }
}

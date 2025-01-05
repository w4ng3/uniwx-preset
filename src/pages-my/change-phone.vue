<route lang="json">
  {
    "layout": "default",
    "name": "change-phone",
    "style": {
      "navigationBarTitleText": "修改手机号"
    }
  }
</route>

<script lang="ts" setup>
const toast = useToast()

/** 表单提交和校验 */
const model = reactive<{
  code: string
  newPhone: string
}>({
  code: '',
  newPhone: '',
})

/** 显示手机号 */
const userStore = useUserStore()
const { getSecurePhone, userinfo } = storeToRefs(userStore)
/** 发送验证码，验证码按钮倒计时 */
const countDown = ref(60)
const codeBtnStr = computed(() => {
  return countDown.value === 60 ? '发送验证码' : `${countDown.value}秒后重发`
})
const countDownTimer = () => {
  const timer = setInterval(() => {
    countDown.value--
    if (countDown.value <= 0) {
      clearInterval(timer)
      countDown.value = 60
    }
  }, 1000)
}
const sendCode = () => {
  const isPhone = /^1[3-9]\d{9}$/.test(model.newPhone)
  if (!isPhone) {
    toast.error('请输入正确的手机号')
  }
  else if (countDown.value === 60) {
    countDownTimer()
    // CommonApi.sendCode({ phone: model.newPhone, type: 2 })
  }
}
// 表单提交
const form = ref()
const { codeRule, phoneRule } = useFormRule()
const handleSubmit = () => {
  form.value.validate().then(({ valid }) => {
    if (valid) {
      // UserApi.updatePhone(model).then(() => {
      userinfo.value.phone = model.newPhone
      toast.success('修改成功')
      setTimeout(() => {
        uni.navigateBack()
      }, 500)
      // })
    }
  })
}
</script>

<template>
  <view class="p2">
    <div class="rounded-md px2 pb4 bg-base">
      <wd-form ref="form" :model="model">
        <wd-input v-model="getSecurePhone" label="已绑定手机号" readonly label-width="90px" />
        <wd-gap />
        <wd-input
          v-model="model.newPhone"
          prop="newPhone"
          type="number"
          :maxlength="11"
          no-border
          placeholder="请输入新手机号"
          custom-class="content-box p1"
          :rules="phoneRule"
          prefix-icon="mobile"
        />
        <wd-gap />
        <view class="flex gap-2">
          <wd-input
            v-model="model.code"
            prop="code"
            type="number"
            :maxlength="10"
            no-border
            placeholder="请输入验证码"
            :rules="codeRule"
            prefix-icon="secured"
            custom-class="content-box p1"
          />
          <wd-button
            :round="false"
            :disabled="countDown !== 60"
            @click="sendCode"
          >
            {{ codeBtnStr }}
          </wd-button>
        </view>
      </wd-form>
    </div>
    <wd-button size="large" block custom-class="my8" @click="handleSubmit">
      提交
    </wd-button>
  </view>
</template>

<route lang="json">
  {
    "layout": "default",
    "name": "change-password",
    "style": {
      "navigationBarTitleText": "修改密码"
    }
  }
</route>

<script lang="ts" setup>
const toast = useToast()
const router = useRouter()
const userStore = useUserStore()

const model = reactive({
  oldPassword: '',
  newPassword: '',
  password2: '',
})

// 表单提交
const form = ref()
const { passwordRule } = useFormRule()
const rules: Partial<W4mRules<typeof model>> = {
  oldPassword: [{ required: true, message: '请输入旧密码' }],
  newPassword: passwordRule,
  password2: [{
    required: true,
    message: '两次密码输入不一致',
    validator: (val: string) => {
      if (val === model.newPassword) {
        return Promise.resolve()
      }
      else {
        return Promise.reject('两次密码输入不一致')
      }
    },
  }],
}
const handleSubmit = () => {
  form.value.validate().then(({ valid }) => {
    if (valid) {
      // UserApi.updatePassword({
      //     oldPassword: model.oldPassword,
      //     newPassword: model.newPassword,
      //   }).then(() => {
      toast.success('修改成功')
      postUserLogout()
      setTimeout(() => {
        userStore.$reset()
        router.replaceAll('/pages-my/login')
      }, 500)
      // })
    }
  })
}
</script>

<template>
  <view class="p2">
    <div class="rounded-md px2 py3 bg-base">
      <wd-form ref="form" :model="model" :rules="rules">
        <wd-input
          v-model="model.oldPassword"
          prop="oldPassword"
          :maxlength="20"
          no-border
          show-password
          placeholder="请输入旧密码"
          custom-class="content-box p1"
          prefix-icon="lock-on"
          clearable
        />
        <wd-gap />
        <wd-input
          v-model="model.newPassword"
          prop="newPassword"
          show-password
          :maxlength="20"
          no-border
          clearable
          placeholder="请输入密码"
          prefix-icon="lock-on"
          custom-class="content-box p1"
        />
        <wd-gap />
        <wd-input
          v-model="model.password2"
          prop="password2"
          show-password
          :maxlength="20"
          no-border
          clearable
          placeholder="请再次输入密码"
          prefix-icon="lock-on"
          custom-class="content-box p1"
        />
      </wd-form>
    </div>
    <wd-button size="large" block custom-class="my8" @click="handleSubmit">
      提交
    </wd-button>
  </view>
</template>

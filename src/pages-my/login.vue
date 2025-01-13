<route lang="json">
  {
    "layout": "default",
    "name": "login",
    "style": {
      "navigationStyle": "custom",
      "navigationBarTitleText": "Login"
    }
  }
</route>

<script lang="ts" setup>
import type { ButtonOnGetphonenumberEvent } from '@uni-helper/uni-types'

const toast = useToast()
const router = useRouter()
const userStore = useUserStore()
const { token } = storeToRefs(userStore)

const model = reactive<UserLoginDTO>({
  loginType: 0,
  phone: '',
  password: '',
  code: '',
})

const form = ref()
const { phoneRule } = useFormRule()

async function sureToLogin() {
  // toast.loading('正在登录')
  const data = await postUserLogin(model)
  token.value = data.token
  // toast.close()
  router.pushTab('/pages/my')
}

function handleSubmit() {
  form.value.validate().then(({ valid }) => {
    if (valid) {
      model.loginType = 2
      sureToLogin()
    }
  })
}

// 目前该接口针对非个人开发者，且完成了认证的小程序开放
// https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/getPhoneNumber.html
const getPhoneNumber = (e: ButtonOnGetphonenumberEvent) => {
  if (e.detail.errMsg !== 'getPhoneNumber:ok') {
    toast.error('获取手机号失败')
  }
  else {
    model.code = e.detail.code
    model.loginType = 0
    sureToLogin()
  }
}

// 隐私弹出层
const showDialog = ref<boolean>(false)
const privacyStr = ref<string>('')

onLoad(async () => {
  const data = await getRichText({ type: 1 })
  privacyStr.value = data
})
</script>

<template>
  <view class="h-screen flex flex-col items-center px-3 pt-12 bg-base">
    <wd-img :width="200" :height="200" src="/static/logo.png" custom-class="mb-16" />
    <block v-if="false">
      <!-- #ifdef MP-WEIXIN -->
      <button open-type="getPhoneNumber" class="w-full btn-pink" @getphonenumber="getPhoneNumber">
        <view class="h-10 flex items-center justify-center rounded-full p-0">
          <wd-icon name="phone" size="24px" />
          <text class="ml-1">
            手机号快捷登录
          </text>
        </view>
      </button>
      <!-- #endif -->
    </block>
    <block v-else>
      <wd-form ref="form" :model="model" custom-class="w-full px-3">
        <wd-input
          v-model="model.phone"
          prop="phone"
          type="number"
          prefix-icon="mobile"
          :maxlength="11"
          no-border
          placeholder="请输入手机号"
          :rules="phoneRule"
        />
        <wd-gap />
        <wd-input
          v-model="model.password"
          prop="password"
          prefix-icon="lock-on"
          :maxlength="20"
          no-border
          show-password
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请输入密码' }]"
        />
        <wd-button block type="primary" size="large" custom-class="mt-10" @click="handleSubmit">
          立即登录
        </wd-button>
      </wd-form>
    </block>

    <view class="position-fixed pos-bottom-20 mt-8 text-center text-sm">
      <text>登录/注册即视为你同意</text>
      <text class="text-primary" @tap="showDialog = true">
        《UNIWX隐私协议》
      </text>
    </view>
  </view>
  <wd-action-sheet v-model="showDialog" title="隐私协议">
    <view class="min-h-30vh p-3 text-lg">
      <uv-parse :content="privacyStr" :selectable="true" />
    </view>
  </wd-action-sheet>
</template>

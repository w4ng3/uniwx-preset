<route lang="json">
  {
    "layout": "default",
    "name": "setting",
    "style": {
      "navigationBarTitleText": "设置"
    }
  }
</route>

<script lang="ts" setup>
import { TextEnum } from '@/services/enums'

const message = useMessage()
const router = useRouter()
const userStore = useUserStore()
const { getSecurePhone } = storeToRefs(userStore)

const handleLogout = () => {
  message.confirm('是否退出登录？').then(() => {
    userStore.$reset()
    router.pushTab('/pages/my')
  })
}

const openWxSetting = () => {
  // #ifdef MP-WEIXIN
  uni.openSetting()
  // #endif
}
</script>

<template>
  <view class="p2">
    <wd-cell-group border custom-class="mb-4 overflow-hidden rounded-xl">
      <wd-cell
        size="large"
        title="手机号"
        is-link
        to="/pages-my/change-phone"
        :value="getSecurePhone"
      />
      <wd-cell size="large" title="修改密码" is-link to="/pages-my/change-password" />
      <wd-cell size="large" title="权限设置" is-link @click="openWxSetting" />
      <wd-cell
        size="large"
        title="隐私协议"
        is-link
        :to="`/pages-my/about?type=${TextEnum.Privacy}&title=隐私协议`"
      />
      <wd-cell
        size="large"
        title="关于我们"
        is-link
        :to="`/pages-my/about?type=${TextEnum.About}&title=关于我们`"
      />
    </wd-cell-group>
    <wd-button type="error" block size="large" custom-class="my-10" @click="handleLogout">
      退出登录
    </wd-button>
  </view>
</template>

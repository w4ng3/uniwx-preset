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

const userStore = useUserStore()
const { getSecurePhone } = storeToRefs(userStore)

// 退出登录
const onLogout = () => {
  // 模态弹窗
  uni.showModal({
    content: '是否退出登录？',
    success: (res) => {
      if (res.confirm) {
        // UserApi.logout()
        // 清理用户信息
        userStore.$reset()
        uni.redirectTo({ url: '/pages/login/login' })
      }
    },
  })
}

const openWxSetting = () => {
  uni.openSetting()
}
</script>

<template>
  <view class="px-20 px-30 py-20">
    <view class="m-linear-box">
      <!-- <wd-cell size="large" title="修改密码" is-link to="/pagesMember/settings/password" /> -->
      <wd-cell
        size="large"
        title="手机号"
        is-link
        :value="getSecurePhone"
      />
      <div class="h-10" />
      <wd-cell size="large" title="权限设置" is-link @click="openWxSetting" />
      <div class="h-10" />
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
    </view>
    <!-- 操作按钮 -->
    <view class="px-30 pt-40">
      <wd-button type="error" block size="large" @click="onLogout">
        退出登录
      </wd-button>
    </view>
  </view>
</template>

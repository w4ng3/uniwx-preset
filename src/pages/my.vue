<route lang="json">
  {
    "layout": "tabbar",
    "name": "my",
    "style": {
      "navigationBarTitleText": "个人中心"
    }
  }
</route>

<script lang="ts" setup>
const message = useMessage()
const router = useRouter()
const userStore = useUserStore()
const { setUserinfo } = userStore
const { userinfo, getAvatar, getSecurePhone, isLogin } = storeToRefs(userStore)

const handleLogout = () => {
  message.confirm('是否退出登录？').then(() => {
    userStore.$reset()
  })
}

const naviUserinfo = () => {
  router.push('/pages-my/userinfo')
}

onShow(async () => {
  if (isLogin.value) {
    const { data } = await getUserinfo()
    setUserinfo(data)
  }
})
</script>

<template>
  <div v-if="isLogin">
    <div class="flex gap-3 p4">
      <wd-img :width="88" :height="88" round :src="getAvatar" @tap="naviUserinfo" />
      <div class="flex flex-col self-end">
        <text class="truncate">
          {{ userinfo.name }}
        </text>
        <text>{{ getSecurePhone }}</text>
      </div>
      <navigator
        class="ml-a"
        url="/pages-my/setting"
        open-type="navigate"
        hover-class="none"
      >
        <div class="i-carbon-settings scale-160" />
      </navigator>
    </div>
    <wd-cell-group border custom-class="mb-4 overflow-hidden rounded-xl">
      <wd-cell
        size="large"
        title="意见反馈"
        is-link
        icon="https://api.iconify.design/carbon:thumbs-up-double-filled.svg"
      />
    </wd-cell-group>

    <wd-button block type="primary" size="large" custom-class="mt-10 mx-3" @click="handleLogout">
      退出登录
    </wd-button>
  </div>
  <div v-else class="p4">
    <navigator url="/pages-my/login" hover-class="none">
      <div class="flex items-center gap-2">
        <wd-img :width="88" :height="88" mode="aspectFill" round :src="getAvatar" custom-style="filter: grayscale(100%)" />
        <view>
          未登录, 点击登录账号
        </view>
      </div>
    </navigator>
    <wd-status-tip image="content" tip="" custom-class="mb-100" />
  </div>
</template>

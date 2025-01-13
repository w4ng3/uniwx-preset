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
const router = useRouter()
const userStore = useUserStore()
const { userinfo, getAvatar, getSecurePhone, isLogin } = storeToRefs(userStore)

const naviUserinfo = () => {
  router.push('/pages-my/userinfo')
}

onShow(async () => {
  const user = await getUserinfo(userinfo.value.id)
  userStore.setUserinfo(user)
})

const { toggleTheme } = useTheme()
</script>

<template>
  <div v-if="isLogin">
    <div class="mb2 flex gap-3 border-bottom p4">
      <wd-img :width="88" :height="88" round :src="getAvatar" @tap="naviUserinfo" />
      <div class="flex flex-col self-end">
        <text class="truncate">
          {{ userinfo.name }}
        </text>
        <text>{{ getSecurePhone }}</text>
      </div>
      <view class="ml-a" @click="toggleTheme()">
        <div class="i-carbon-sun dark:i-carbon-moon scale-160" />
      </view>
      <navigator
        class="ml-3"
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
        custom-title-class="pl-3"
        is-link
        to="/pages-my/feedback"
      >
        <template #icon>
          <div class="i-carbon-thumbs-up-filled scale-130" />
        </template>
      </wd-cell>
    </wd-cell-group>
  </div>
  <div v-else class="p4">
    <navigator url="/pages-my/login" hover-class="none">
      <div class="flex items-center gap-2">
        <wd-img :width="88" :height="88" mode="aspectFill" round :src="getAvatar" custom-style="filter: grayscale(100%)" />
        <view>
          未登录
        </view>
      </div>
      <wd-status-tip image="content" tip="点击登录账号" />
    </navigator>
  </div>
</template>

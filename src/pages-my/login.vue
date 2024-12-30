<route lang="json">
  {
    "layout": "default",
    "name": "login",
    "style": {
      "navigationBarTitleText": "Login"
    }
  }
</route>

<script lang="ts" setup>
// declare type RouteLocationRaw = 'aaa'|'bbb'
const router = useRouter()
const userStore = useUserStore()
const { token } = storeToRefs(userStore)
const handleLogin = async () => {
  const { data } = await postUserLogin()
  token.value = data.token
  router.pushTab('/pages/my')
}
</script>

<template>
  <div>
    <wd-button block type="primary" size="large" custom-class="mt-10 mx-3" @click="handleLogin">
      登录
    </wd-button>
  </div>
</template>

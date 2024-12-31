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
  <div class="py-10">
    <wd-button block type="primary" size="large" custom-class="mx-3" @click="handleLogin">
      登录
    </wd-button>
  </div>
</template>

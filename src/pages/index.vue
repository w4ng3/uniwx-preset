<route type="home" lang="json">
  {
    "layout": "tabbar",
    "name": "home",
    "style": {
      "navigationBarTitleText": "首页"
    }
  }
</route>

<script setup lang="ts">
interface GithubReposRes {
  name: string
  description: string
  html_url: string
}

const repo = ref<GithubReposRes>()

async function fetchGithubRepos() {
  return await request<GithubReposRes>('https://api.github.com/repos/Moonofweisheng/wot-design-uni', {
    method: 'GET',
  }).then((res) => {
    repo.value = res
  })
}

onMounted(() => {
  fetchGithubRepos()
})
</script>

<template>
  <view class="px-3 py-20 text-center">
    <view class="flex flex-col items-center text-2xl">
      <wd-text text="欢迎使用 Wot Design Uni" />
      <wd-img :width="200" :height="200" src="/static/logo.png" />
      <view class="text-lg color-base">
        {{ repo?.description }}
      </view>
    </view>
  </view>
</template>

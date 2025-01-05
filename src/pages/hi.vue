<script lang="ts" setup>
</script>

<template>
  <view class="px-3 py-20 text-center">
    <view class="text-2xl text-gray-9!">
      <wd-text custom-class="text-gray-9!" text="欢迎使用 Wot Design Uni" />
      <wd-img :width="200" :height="200" src="/static/logo.png" />
    </view>
  </view>
</template>

<route lang="json">
{
  "layout": "tabbar",
  "name": "hi",
  "style": {
    "navigationBarTitleText": "HI"
  }
}
</route>

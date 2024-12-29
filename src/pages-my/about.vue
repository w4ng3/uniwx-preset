<route lang="json">
  {
    "layout": "default",
    "name": "about",
    "style": {
      "navigationBarTitleText": "关于我们",
      "navigationBarBackgroundColor": "#f4f4f4"
    }
  }
</route>

<script lang="ts" setup>
import uvParse from '@/components/uv-parse/uv-parse.vue'

const richText = ref<string>('<div>关于我们</div>')
const style = {
  img: 'border-radius: 20rpx;width: 100%;margin-top: 10rpx;display: block;',
}

onLoad(async () => {
  // const { data } = await commonApi.aboutUs()
  // richText.value = data.content
})
</script>

<template>
  <view class="p-3 text-lg">
    <uv-parse :content="richText" :selectable="true" :tag-style="style" />
  </view>
</template>

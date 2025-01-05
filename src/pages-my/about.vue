<route lang="json">
  {
    "layout": "default",
    "name": "about",
    "style": {
      "navigationBarTitleText": "关于我们",
      "navigationStyle": "custom"
    }
  }
</route>

<script lang="ts" setup>
import uvParse from '@/components/uv-parse/uv-parse.vue'

const query = defineProps(['type', 'title'])

const richText = ref<string>('<div>...</div>')
const style = {
  img: 'border-radius: 20rpx;width: 100%;margin-top: 10rpx;display: block;',
}

onLoad(async () => {
  const { data } = await getRichText({ type: Number(query.type) })
  richText.value = data
})
</script>

<template>
  <wd-navbar
    :title="query.title"
    :bordered="false" safe-area-inset-top placeholder left-arrow fixed
    @click-left="$Router.back"
  />
  <view class="p3 text-lg">
    <uv-parse :content="richText" :selectable="true" :tag-style="style" />
  </view>
</template>

<route lang="json">
  {
    "layout": "tabbar",
    "name": "hot",
    "style": {
      "navigationBarTitleText": "热点"
    }
  }
</route>

<script lang="ts" setup>
import { formatFullTime } from '@/utils'

interface HotNews {
  data: NewsItem[]
  name: string
  subtitle: string
  success: boolean
  update_time: string
}

interface NewsItem {
  hot: string
  index: number
  mobil_url: string
  title: string
  url: string
}

const news = ref<HotNews>({
  data: [],
  name: '',
  subtitle: '',
  success: false,
  update_time: '',
})

onMounted(async () => {
  news.value = await request<HotNews>('https://api.vvhan.com/api/hotlist/toutiao', {}, { method: 'GET' })
})
</script>

<template>
  <view class="px3 py5">
    <view class="text-xl font-bold">
      {{ news.name }}
    </view>
    <text>{{ formatFullTime(news.update_time) }}</text>
    <view v-for="item in news.data" :key="item.index" class="mb1 flex items-center rounded-lg bg-#9da6e0 p2">
      <view class="size-6 content-center rounded-full bg-#7bb3d5 text-center">
        {{ item.index }}
      </view>
      <view>
        <view> {{ item.title }}</view>
        <view class="flex gap2">
          <view class="i-carbon-fire text-red" />
          <view> {{ item.hot }}</view>
        </view>
      </view>
    </view>
  </view>
</template>



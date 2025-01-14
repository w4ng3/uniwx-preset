<route lang="json">
  {
    "layout": "tabbar",
    "name": "hot",
    "style": {
      "navigationBarTitleText": "热点",
      "enablePullDownRefresh": true
    }
  }
</route>

<script lang="ts" setup>
import { formatFullTime } from '@/utils'

interface HotNews {
  id: number
  cover: string
  hot: string
  title: string
}

const list = ref<HotNews[]>([])
const reqParams = reactive<IPage>({
  page: 1,
  limit: 10,
})
const { onLoadList, loadState } = usePull2Refresh('/hot/list', list, reqParams)

onMounted(async () => {
  onLoadList()
})
</script>

<template>
  <view class="px3 py5">
    <text>{{ formatFullTime(new Date()) }}</text>
    <wd-status-tip v-if="!list.length" image="content" tip="暂无内容" />
    <block v-else>
      <view v-for="(item, index) in list" :key="index" class="mb1 flex items-center gap2 rounded-lg bg-#9da6e0 p2">
        <view class="size-6 content-center rounded-full bg-#7bb3d5 text-center">
          {{ index }}
        </view>
        <wd-img :width="100" :height="100" :src="item.cover" custom-image="rounded-xl" />
        <view>
          <view> {{ item.title }}</view>
          <view class="flex gap2">
            <view class="i-carbon-fire text-red" />
            <view> {{ item.hot }}</view>
          </view>
        </view>
      </view>
      <wd-loadmore :state="loadState" />
    </block>
  </view>
</template>



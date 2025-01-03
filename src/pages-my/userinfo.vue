<route lang="json">
  {
    "layout": "default",
    "name": "userinfo",
    "style": {
      "navigationBarTitleText": "我的信息"
    }
  }
</route>

<script lang="ts" setup>
import type { ButtonOnChooseavatarEvent } from '@uni-helper/uni-types'
import { putUserinfo } from '@/services/apis'

const toast = useToast()
const userStore = useUserStore()
const { userinfo } = storeToRefs(userStore)
const model = reactive<UserinfoVO>(userinfo.value)
const form = ref<InstanceType<typeof WdForm>>()

function handleSubmit() {
  form.value?.validate().then(({ valid }) => {
    if (valid) {
      putUserinfo(model).then((_res) => {
        userStore.setUserinfo(model)
        toast.success('保存成功')
      })
    }
  })
}

const education_columns: ColumnItem[] = [
  { label: '小学', value: 0 },
  { label: '初中', value: 1 },
  { label: '高中', value: 2 },
  { label: '大学', value: 3 },
  { label: '研究生', value: 4 },
  { label: '博士', value: 5 },
]

// 修改头像
const onAvatarChange = (e: ButtonOnChooseavatarEvent) => {
  // 获取到微信头像临时地址
  const { avatarUrl } = e.detail
  console.log('avatarUrl :>> ', avatarUrl)
  // TODO: 自定义图片上传方法
  // uni.hideLoading()
  // const avatar = resp.data.link
  // model.avatar = avatar
  // userinfo.avatar = avatar
  // console.log('上传成功 :>> ', avatar)
}
</script>

<template>
  <div class="p2">
    <div class="rounded-md p2 bg-base">
      <div class="pb2 text-lg font-bold">
        我的信息
      </div>
      <!-- tips: 只在微信小程序有效 -->
      <button class="flex flex-col items-center justify-center" :plain="true" open-type="chooseAvatar" @chooseavatar="onAvatarChange">
        <view v-if="!userinfo?.avatar" class="size-20">
          <wd-icon size="40px" color="#5dcaab" name="fill-camera" />
        </view>
        <image v-else class="size-20 rounded-lg" :src="userinfo?.avatar" mode="aspectFill" />
        <text class="text-sm">
          点击修改头像
        </text>
      </button>
      <wd-gap />
      <wd-form ref="form" :model="model">
        <wd-input
          v-model="model.name"
          prop="name"
          label="昵称:"
          custom-class="content-box"
          no-border
          placeholder="请输入昵称"
        />
        <wd-gap />
        <wd-picker v-model="model.education" label="学历:" custom-label-class="" :columns="education_columns" />
        <wd-gap />
        <wd-cell title="性别:" custom-class="content-box font-bold">
          <wd-radio-group v-model="model.gender" cell shape="dot" inline>
            <wd-radio :value="0">
              男
            </wd-radio>
            <wd-radio :value="1">
              女
            </wd-radio>
          </wd-radio-group>
        </wd-cell>
        <wd-gap />
        <wd-textarea
          v-model="model.description"
          label="描述:"
          prop="description"
          :show-confirm-bar="false"
          :no-border="true"
          :maxlength="200"
          show-word-limit
          auto-height
          placeholder="请输入..."
          custom-class="rounded-md px2!"
        />
      </wd-form>
    </div>

    <wd-button block type="primary" size="large" custom-class="my-10" @click="handleSubmit">
      保存
    </wd-button>
  </div>
</template>

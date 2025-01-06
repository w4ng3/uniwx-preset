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
import type { UploadChangeEvent, UploadFileItem } from 'wot-design-uni/components/wd-upload/types'
import { putUserinfo } from '@/services/apis'
import { ApiCodeEnum } from '@/services/enums'
import { UPLOAD_URL } from '@/services/constant'

import type { ColPickerConfirm } from '@/composables/useColPickerAreaData'

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

// 图片上传
// 如果要改成直传OSS,参考这里：https://wot-design-uni.cn/component/upload.html#上传至云存储
// 或者：https://wot-design-uni.cn/component/upload.html#自定义上传方法
const fileList = ref<UploadFileItem[]>([{ url: `${model.avatar}.png`, uid: 0 }])
function handleUploadChange({ fileList: files }: UploadChangeEvent) {
  fileList.value = files.map((item) => {
    const resp: Data<any> = JSON.parse(item.response as string)
    if (resp.code !== ApiCodeEnum.SUCCESS) {
      item.status = 'fail'
    }
    else {
      model.avatar = resp.data.url
    }
    item.response = resp
    return item
  })
}

// 地区选择
const { colPickerData, columnChange } = useColPickerAreaData()
const area = ref<string[]>(['110000', '110100', '110101'])
const handleConfirm: ColPickerConfirm = ({ value, selectedItems }) => {
  console.log('value', value)
  console.log('selectedItems', selectedItems)
}
</script>

<template>
  <div class="p2">
    <div class="rounded-md p2 bg-base">
      <div class="pb2 text-lg font-bold">
        我的信息
      </div>
      <view class="flex justify-center">
        <wd-upload
          :show-limit-num="false"
          :limit="1"
          :file-list="fileList"
          :action="UPLOAD_URL"
          image-mode="aspectFill"
          custom-preview-class="m0! rounded-xl overflow-hidden size-26!"
          custom-evoke-class="rounded-xl size-26!"
          reupload
          @change="handleUploadChange"
        />
      </view>
      <wd-gap />
      <wd-form ref="form" :model="model">
        <wd-input
          v-model="model.name"
          prop="name"
          :maxlength="10"
          label="昵称:"
          custom-class="content-box"
          no-border
          placeholder="请输入昵称"
        />
        <wd-gap />
        <wd-picker v-model="model.education" label="学历:" custom-label-class="" :columns="education_columns" />
        <wd-gap />
        <wd-col-picker
          v-model="area"
          label="选择地址:"
          auto-complete
          :columns="colPickerData"
          :column-change="columnChange"
          @confirm="handleConfirm"
        />
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

<style scoped>
:deep(.wd-upload__close) {
  display: none !important;
}
</style>

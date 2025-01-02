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
</script>

<template>
  <div class="p3">
    <div class="mb-8 rounded-md bg-white p2">
      <div class="pb-2 text-lg font-bold">
        我的信息
      </div>
      <wd-form ref="form" :model="model">
        <div class="text-info p1 font-bold">
          学历
        </div>
        <wd-picker v-model="model.education" :columns="education_columns" />
        <div class="text-info p1 font-bold">
          性别
        </div>
        <wd-radio-group v-model="model.gender" cell shape="dot" inline>
          <wd-radio :value="0">
            男
          </wd-radio>
          <wd-radio :value="1">
            女
          </wd-radio>
        </wd-radio-group>
        <div class="text-info p1 font-bold">
          参加过的志愿活动描述
        </div>
        <wd-textarea
          v-model="model.description"
          :maxlength="200"
          prop="description"
          placeholder="请输入..."
          custom-class="bg-#f7f7f7! rounded-md p2! min-h-20"
          :show-confirm-bar="false"
          auto-height
          show-word-limit
          :no-border="true"
          custom-textarea-container-class="bg-#f7f7f7!"
        />
      </wd-form>
    </div>

    <wd-button block type="primary" size="large" custom-class="mb-10" @click="handleSubmit">
      保存
    </wd-button>
  </div>
</template>

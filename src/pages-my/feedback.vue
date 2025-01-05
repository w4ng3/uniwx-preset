<route lang="json">
  {
    "layout": "default",
    "name": "feedback",
    "style": {
      "navigationBarTitleText": "意见反馈"
    }
  }
</route>

<script lang="ts" setup>
const toast = useToast()

// 表单提交
const form = ref()
const model = reactive({
  content: '',
})

const rules: Partial<W4mRules<typeof model>> = {
  content: [
    { required: true, message: '内容不能为空' },
  ],
}

function handleSubmit() {
  form.value.validate().then(({ valid }) => {
    if (valid) {
      // postFeedback(model).then((_res) => {
      toast.success('提交成功')
      // })
    }
  })
}
</script>

<template>
  <div class="p2">
    <div class="mb-8 rounded-md bg-white p2">
      <wd-form ref="form" :model="model" :rules="rules">
        <div class="px1 py2 font-bold">
          <text>反馈</text>
        </div>
        <wd-textarea
          v-model="model.content"
          :maxlength="200"
          prop="content"
          placeholder="请输入您的意见反馈"
          :show-confirm-bar="false"
          show-word-limit
          :no-border="true"
        />
      </wd-form>
    </div>

    <wd-button block size="large" @click="handleSubmit">
      提交反馈
    </wd-button>
  </div>
</template>

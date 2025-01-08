import uni from '@uni-helper/eslint-config'

export default uni(
  {
    unocss: true,
    vue: true,
    typescript: true,
    formatters: {
      css: true,
      html: true,
    },

    // 取消 antfu 喜好的一些固执己见的规则。
    lessOpinionated: true,
    rules: {
      'no-console': 'warn',
      'style/no-multiple-empty-lines': ['error', { max: 2 }], // 最大空行
      'style/max-statements-per-line': ['error', { max: 2 }], // 强制每行允许的最大语句数
      'unocss/blocklist': 'warn', // 禁止特定的类选择器
      'unocss/enforce-class-compile': 'off', // 强制类编译
      'unocss/order-attributify': 'warn', // 对属性选择器强制执行特定顺序
      'unocss/order': 'warn', // 对类选择器强制执行特定的顺序
      'unused-imports/no-unused-vars': 'warn',
      'symbol-description': 'warn',
      'unused-imports/no-unused-imports': 'error', // 禁止未使用的导入
      'ts/no-use-before-define': 'warn', // 禁止在定义变量之前使用它们
      'ts/ban-ts-comment': 'off',
      'ts/no-unsafe-function-type': 'warn',
      'ts/no-unused-expressions': 'off',
      'prefer-promise-reject-errors': 'off',
      'vue/no-v-text-v-html-on-component': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          varsIgnorePattern: '^_',
          argsIgnorePattern: '^_',
        },
      ],
      'eslint-comments/no-unlimited-disable': 'off',
    },
  },
).append({
  ignores: [
    'node_modules/**',
    'dist/',
  ],
})

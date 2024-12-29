import { createPinia } from 'pinia'
import { createUnistorage } from 'pinia-plugin-unistorage'
// 创建 pinia 实例
const pinia = createPinia()

// 重写reset方法，内置的方法无法清除storage里持久化的数据
pinia.use(({ store }) => {
  const initialState = JSON.parse(JSON.stringify(store.$state))
  store.$reset = () => {
    store.$patch(initialState)
    uni.removeStorage({ key: store.$id })
  }
})

// 使用持久化存储插件
pinia.use(createUnistorage())

// 默认导出，给 main.ts 使用
export default pinia

// 模块统一导出
export * from './modules/user'

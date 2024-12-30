import { defineStore } from 'pinia'
import { ref } from 'vue'

// 定义 Store
export const useUserStore = defineStore(
  'user',
  () => {
    /** 登录凭证 */
    const token = ref('')
    /** 用户信息 */
    const userinfo = ref({
      id: 0,
      name: '',
      phone: '',
      avatar: '',
    })

    const getAvatar = computed(() => {
      return userinfo.value.avatar ? userinfo.value.avatar : '/static/logo.png'
    })

    const getSecurePhone = computed(() => {
      return userinfo.value.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
    })

    // 是否登录
    const isLogin = computed(() => {
      return !!token.value
    })

    // 保存会员信息
    const setUserinfo = (val: typeof userinfo.value) => {
      userinfo.value = val
    }

    return { userinfo, setUserinfo, isLogin, token, getAvatar, getSecurePhone }
  },
  {
    unistorage: true, // 开启后对 state 的数据读写都将持久化
  },
)

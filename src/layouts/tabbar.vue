<script lang="ts" setup>
import { useTheme } from '@/composables/useTheme'
import { useTabbar } from '@/composables/useTabbar'

const router = useRouter()

const route = useRoute()

const { theme, themeVars } = useTheme()

const { activeTabbar, getTabbarItemValue, setTabbarItemActive, tabbarList } = useTabbar()

function handleTabbarChange({ value }: { value: string }) {
  setTabbarItemActive(value)
  router.pushTab({ name: value })
}

onMounted(() => {
  nextTick(() => {
    if (route.name && route.name !== activeTabbar.value.name) {
      setTabbarItemActive(route.name)
    }
  })
})

onShow(() => {
  // #ifdef APP-PLUS
  uni.hideTabBar()
  // #endif
})
</script>

<script lang="ts">
export default {
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared',
  },
}
</script>

<template>
  <wd-config-provider :theme="theme" :theme-vars="themeVars" :custom-class="`${theme} min-h-screen`">
    <wd-navbar
      :title="$Route.style?.navigationBarTitleText"
      safe-area-inset-top placeholder fixed :bordered="false"
    />
    <slot />
    <wd-tabbar :model-value="activeTabbar.name" placeholder bordered safe-area-inset-bottom fixed @change="handleTabbarChange">
      <wd-tabbar-item v-for="(item, index) in tabbarList" :key="index" :name="item.name" :value="getTabbarItemValue(item.name)" :title="item.title" :icon="item.icon" />
    </wd-tabbar>
    <wd-toast />
    <wd-message-box />
    <!-- <wd-notify /> -->
    <!-- <privacy-popup /> -->
  </wd-config-provider>
</template>

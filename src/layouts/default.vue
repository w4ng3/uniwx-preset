<script lang="ts" setup>
import type { ConfigProviderThemeVars } from 'wot-design-uni'

const themeVars = reactive<ConfigProviderThemeVars>({
  colorTheme: '#FF5454',
  tabsNavLineBgColor: 'red',
  navbarColor: '#000',
  // navbarHeight: '44px',
})

function handleClickLeft() {
  uni.navigateBack()
}
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
  <wd-config-provider :theme-vars="themeVars" custom-class="bg-#f5f5f5 min-h-screen">
    <wd-navbar
      v-if="$Route.style.navigationStyle !== 'custom'"
      :title="$Route.style.navigationBarTitleText"
      :bordered="false" safe-area-inset-top left-arrow placeholder fixed
      @click-left="handleClickLeft"
    />
    <slot />
    <wd-toast />
    <wd-message-box />
    <!-- <wd-notify /> -->
    <!-- <privacy-popup /> -->
  </wd-config-provider>
</template>

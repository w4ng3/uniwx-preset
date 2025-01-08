<script lang="ts" setup>
import { useTheme } from './styles/useTheme'

const { theme, themeVars } = useTheme()
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
  <wd-config-provider :theme="theme" :theme-vars="themeVars" custom-class="bg-#f5f5f5 dark:bg-#121212 min-h-screen">
    <wd-navbar
      v-if="$Route.style?.navigationStyle !== 'custom'"
      :title="$Route.style?.navigationBarTitleText"
      :bordered="false" safe-area-inset-top left-arrow placeholder fixed
      @click-left="$Router.back"
    />
    <slot />
    <wd-toast />
    <wd-message-box />
    <!-- <wd-notify /> -->
    <!-- <privacy-popup /> -->
  </wd-config-provider>
</template>

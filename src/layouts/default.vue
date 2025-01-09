<script lang="ts" setup>
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
  <wd-config-provider
    :theme="theme" :theme-vars="themeVars"
    :custom-class="`${theme} ${theme === 'dark' ? 'bg-#121212' : 'bg-#f5f5f5'} min-h-screen`"
  >
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

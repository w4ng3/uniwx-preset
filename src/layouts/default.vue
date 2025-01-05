<script lang="ts" setup>
import type { ConfigProviderThemeVars } from 'wot-design-uni'

const themeVars = reactive<ConfigProviderThemeVars>({
  // colorTheme: '#FF5454',
  // colorSuccess: '',
  // ...
  tabsNavLineBgColor: 'red',
  navbarColor: '#000',
  textareaBg: '#f7f7f7',
  inputBg: '#F7F7F7',
  inputIconSize: '26px',
  searchIconColor: '#7c7c7c',
  searchPlaceholderColor: '#7c7c7c',
  inputDisabledColor: '#5b5b5b',
  pickerColumnDisabledColor: '#5b5b5b',
  messageBoxContentMaxHeight: '80vh',
  cellWrapperPadding: '8px',
  sizeSidePadding: '8px',
  inputCellLabelWidth: '50px',
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
  <wd-config-provider :theme-vars="themeVars" custom-class="bg-#f5f5f5 min-h-screen">
    <wd-navbar
      v-if="$Route.style?.navigationStyle !== 'custom'"
      :title="$Route.style?.navigationBarTitleText"
      :bordered="false" safe-area-inset-top placeholder left-arrow fixed
      @click-left="$Router.back"
    />
    <slot />
    <wd-toast />
    <wd-message-box />
    <!-- <wd-notify /> -->
    <!-- <privacy-popup /> -->
  </wd-config-provider>
</template>

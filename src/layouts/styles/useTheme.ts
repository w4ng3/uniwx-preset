import type { ConfigProviderThemeVars } from 'wot-design-uni'
import { ref } from 'vue'
import { useDark, usePreferredDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)
const preferredDark = usePreferredDark()

const themeVars = ref<ConfigProviderThemeVars>()

export function useTheme(vars?: ConfigProviderThemeVars) {
  // 切换主题变量
  vars && (themeVars.value = vars)

  const theme = computed(() => {
    return isDark.value ? 'dark' : 'light'
  })

  return {
    theme,
    themeVars,
    isDark,
    toggleDark,
    preferredDark,
  }
}



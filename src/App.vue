<script setup lang="ts">
import { useTheme } from './layouts/styles/useTheme'

useTheme({
  navbarColor: '#000',
  inputIconSize: '26px',
  messageBoxContentMaxHeight: '80vh',
  cellWrapperPadding: '8px',
  sizeSidePadding: '8px',
  inputCellLabelWidth: '50px',
})

onLaunch(() => {})
</script>

<style lang="scss">
@import '@/layouts/styles/global.scss';
@import '@/layouts/styles/wot-theme.scss';
</style>

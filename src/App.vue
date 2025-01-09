<script setup lang="ts">
const { toggleTheme } = useTheme({
  navbarColor: '#000',
  inputIconSize: '26px',
  messageBoxContentMaxHeight: '80vh',
  cellWrapperPadding: '8px',
  sizeSidePadding: '8px',
  inputCellLabelWidth: '50px',
})

onLaunch(() => {
  const baseinfo = uni.getAppBaseInfo()
  // 启动时根据系统模式切换主题
  if (baseinfo.hostTheme === 'dark') {
    toggleTheme(baseinfo.hostTheme)
  }
  uni.onThemeChange((e) => {
    toggleTheme(e.theme)
  })
})
</script>

<style lang="scss">
@import '@/layouts/styles/global.scss';
@import '@/layouts/styles/wot-theme.scss';
</style>

<script setup lang="ts">
onLaunch(() => {})
</script>

<style lang="scss">
// BUG: 目前 global.scss 会导致微信小程序下 wd-tabbar 组件高度异常
// @import '@/styles/global.scss';
@import '@/styles/wot-theme.scss';
</style>

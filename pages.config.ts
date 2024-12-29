import { defineUniPages } from '@uni-helper/vite-plugin-uni-pages'

export default defineUniPages({
  pages: [],
  globalStyle: {
    navigationBarTitleText: 'Uniwx-Preset',
    navigationStyle: 'default',
    navigationBarTextStyle: 'black',
    navigationBarBackgroundColor: '#f4f4f4',
  },
  tabBar: {
    custom: true,
    height: '0',
    color: '#bfbfbf',
    selectedColor: '#0165FF',
    list: [{
      pagePath: 'pages/index',
    }, {
      pagePath: 'pages/hi',
    }, {
      pagePath: 'pages-my/my',
    }],
  },
  // 或者使用默认Tabbar
  // tabBar: {
  //   custom: false,
  //   height: '70px',
  //   color: '#bfbfbf',
  //   backgroundColor: '#fff',
  //   selectedColor: '#4275f6',
  //   list: [{
  //     text: '首页',
  //     pagePath: 'pages/index',
  //     iconPath: 'static/tabbar/home.png',
  //     selectedIconPath: 'static/tabbar/home-a.png',
  //   }],
  // },
})

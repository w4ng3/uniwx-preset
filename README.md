<h2 align="center">
Uniwx-Preset
</h2>

<p align="center">基于<a href="[vitesse-uni-app](https://github.com/uni-helper/vitesse-uni-app)">vitesse-uni-app</a>的Wot Design Uni 组件库快速起手项目</p>

<p align="center">
用于开发微信小程序
</p>

## 特性

- 🐂 [Wot Design Uni](https://github.com/Moonofweisheng/wot-design-uni) - 基于Vue3+TS开发的uni-app组件库，提供70+高质量组件，支持暗黑模式、国际化和自定义主题。
- 🎉 [Uni Mini Router](https://github.com/Moonofweisheng/uni-mini-router) - 适用于uni-app&vue3的轻量级路由库。
- ⚡️ [Vue 3](https://github.com/vuejs/core), [Vite](https://github.com/vitejs/vite), [pnpm](https://pnpm.io/), [esbuild](https://github.com/evanw/esbuild) - 就是快！

- 🗂 [基于文件的路由](./src/pages)

- 📦 [组件自动化加载](./src/components)

- 📑 [布局系统](./src/layouts)

- 🎨 [UnoCSS](https://github.com/unocss/unocss) - 高性能且极具灵活性的即时原子化 CSS 引擎

- 😃 [各种图标集为你所用](https://github.com/antfu/unocss/tree/main/packages/preset-icons)

- 📥 [API 自动加载](https://github.com/antfu/unplugin-auto-import) - 直接使用 Composition API 无需引入

- 🦾 [TypeScript](https://www.typescriptlang.org/) & [ESLint](https://eslint.org/) - 保证代码质量

- 🌛 [暗黑模式](./src/composables/useTheme.ts)

---

## 快速启动

```bash
pnpm i
pnpm dev:wx
```

接着会生在 `dist/dev/mp-weixin`里编译成微信小程序，导入到微信开发者工具进行预览和调试。

## tips

- 如果提交时 husky 的勾子无法正常触发，运行 `chmod ug+x .husky/*` 后再尝试。
- 配置主題可在[App.vue](./src/App.vue)或者[wot-theme.scss](./src/layouts/styles/wot-theme.scss) 里修改主题变量。
- 路由无需在 `page.json`里手动配置，采用[基于文件的路由系统自动生成](https://github.com/uni-helper/vite-plugin-uni-pages)，需要在对应 vue 文件里添加如下配置：
  ```vue
  <route lang="json">
    {
      "layout": "default",
      "name": "XXXRouteName",
      "style": {
        "navigationBarTitleText": "TITLE"
      }
    }
  </route>
  ```

## 感谢

- [Wot Design Uni](https://github.com/Moonofweisheng/wot-design-uni)


## TODO

- [ ] 虚拟根组件 https://github.com/uni-ku/root
- [ ] loading 最佳实践
- [ ] request 最佳实践
- [ ] 支持 JSX
- [ ] 单元测试

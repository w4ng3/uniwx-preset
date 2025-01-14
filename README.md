<h2 align="center">
Uniwx-Preset
</h2>

<p align="center">基于 <a href="https://github.com/uni-helper/vitesse-uni-app"> vitesse-uni-app </a> 的Wot Design Uni 组件库快速起手项目</p>

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
- ⚙️ 使用 [Vitest](https://github.com/vitest-dev/vitest) 进行单元测试

---

## 快速启动

```bash
pnpm i
pnpm dev:wx
```

接着会生在 `dist/dev/mp-weixin`里编译成微信小程序，导入到微信开发者工具进行预览和调试。

- [接口文档](https://7cyk5pz5mr.apifox.cn)

## tips

- 如果提交时 husky 的勾子无法正常触发，运行 `chmod ug+x .husky/*` 后再尝试。
- 配置主題可在[App.vue](./src/App.vue)或者[wot-theme.scss](./src/layouts/styles/wot-theme.scss) 里修改主题变量。
- 创建新页面时可使用[代码块](.vscode/uni.code-snippets)里的 `upage` 来快速输出页面模版。

## 单元测试

目前 vitest和在uniapp里运行会出错：`Cannot find module 'vuex/package.json...`
如果不安装 vuex, 则需在 [此处](./node_modules/@dcloudio/uni-h5-vite/dist/plugins/ssr.js) 注释掉 vuex 相关的4行代码。

为了方便团队使用，目前在 `devDependencies` 添加了 vuex。


## 待办

- [ ] devtools
- [ ] 补全单元测试
- [ ] [虚拟根组件](https://github.com/uni-ku/root)


## 感谢

- [Wot Design Uni](https://github.com/Moonofweisheng/wot-design-uni)

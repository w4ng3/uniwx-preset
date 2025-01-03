/**
 * @description 重写 uni-mini-router 的部分类型(与vite-plugin-uni-pages的结合)，获得更友好的提示
 */

import type { Route, RouteLocationBase, Router } from 'uni-mini-router'
import type { GlobalStyle } from '@uni-helper/vite-plugin-uni-pages'

type NavigateToTab = SwitchTabOptions['url']
type NavigateToPage = Exclude<NavigateToOptions['url'], SwitchTabOptions['url']>

interface RouteNameLocation extends RouteLocationBase {
  name: string
  params?: Record<string, string>
  path?: never
  query?: never
}

interface RoutePathLocationWithURl<T> extends RouteLocationBase {
  path: T
  query?: Record<string, string>
  name?: never
  params?: never
}

type UMRLocationRaw<T extends string> = T | `${T}?${string}` | RouteNameLocation | RoutePathLocationWithURl<T>

// https://moonofweisheng.github.io/uni-mini-router/guide/api.html
interface RouterWithUrl extends Router {
  /** uni.navigateTo */
  push: (to: UMRLocationRaw<NavigateToPage>) => void
  /** uni.redirectTo */
  replace: (to: UMRLocationRaw<NavigateToPage>) => void
  /** uni.reLaunch */
  replaceAll: (to: UMRLocationRaw<NavigateToPage>) => void
  /** uni.switchTab */
  pushTab: (to: UMRLocationRaw<NavigateToTab>) => void
}

interface RouteWithPage extends Route {
  style: Readonly<GlobalStyle>
  layout: string
  type: string
}

declare module 'uni-mini-router' {
  function useRouter(): RouterWithUrl
  function useRoute(): RouteWithPage
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $Router: RouterWithUrl
    $Route: RouteWithPage
  }
  // 扩展组件的 props
  interface ComponentCustomProps {
    /**
     * 页面跳转地址
     * @description 用于给<wd-cell>组件的to属性提供类型提示，自定义组件若不是路由跳转，则props不要取名[to]
     */
    to?: NavigateToPage | `${NavigateToPage}?${string}`
    /**
     * 页面跳转地址 // MARK: 处于实验阶段
     * @description 用于给 <navigator>和<wd-grid-item>等组件的url属性提供类型提示，自定义组件若不是路由跳转，则props不要取名[url]
     */
    url?: NavigateToPage | `${NavigateToPage}?${string}` | `../${string}`
  }
}

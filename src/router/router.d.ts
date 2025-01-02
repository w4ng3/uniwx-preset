/**
 * @description 重写 uni-mini-router 的部分类型，获得更友好的提示
 */
import type { RouteLocationBase, Router } from 'uni-mini-router'

type NavigateToUrl = Exclude<NavigateToOptions['url'], SwitchTabOptions['url']>
type NavigateToUrlPlus = `${NavigateToUrl}?${string}`

declare module 'uni-mini-router' {
  interface RouteNameLocation extends RouteLocationBase {
    name: string
    params?: Record<string, string>
    path?: never
    query?: never
  }

  interface RoutePathLocationWithURl extends RouteLocationBase {
    path: NavigateToUrl
    query?: Record<string, string>
    name?: never
    params?: never
  }

  type RouteLocationRaw = NavigateToUrl | NavigateToUrlPlus | RouteNameLocation | RoutePathLocationWithURl

  interface RouterWithUrl extends Router {
    push: (to: RouteLocationRaw) => void
    replace: (to: RouteLocationRaw) => void
    replaceAll: (to: RouteLocationRaw) => void
    pushTab: (to: SwitchTabOptions['url']) => void
  }

  // https://moonofweisheng.github.io/uni-mini-router/guide/api.html
  function useRouter(): RouterWithUrl
}

/// <reference types="@uni-helper/vite-plugin-uni-pages/client" />
import { pages, subPackages } from 'virtual:uni-pages'

// https://moonofweisheng.github.io/uni-mini-router/guide/usage.html

function generateRoutes() {
  const routes = pages.map((page) => {
    const newPath = `/${page.path}`
    return { ...page, path: newPath }
  })
  if (subPackages && subPackages.length > 0) {
    subPackages.forEach((subPackage) => {
      const subRoutes = subPackage.pages.map((page: any) => {
        const newPath = `/${subPackage.root}/${page.path}`
        return { ...page, path: newPath }
      })
      routes.push(...subRoutes)
    })
  }
  return routes
}
// 路由白名单
const whiteRoutes: NavigateToOptions['url'][] = ['/pages/index', '/pages/hi', '/pages/my', '/pages-my/login']


const router = createRouter({
  routes: generateRoutes(),
})
// 跳转前触发，只有使用 router 跳转才会触发，使用 uni.navigateTo等方法无法触发
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  if (userStore.isLogin || whiteRoutes.includes(to.path as unknown as NavigateToOptions['url'])) {
    next()
  }
  else {
    // next入参 false 以取消导航
    next(false)
    uni.showToast({ title: '请登录后查看', icon: 'none' })
  }
})

// 跳转后触发，对 uni.navigateTo等方法也有效
router.afterEach((_to, _from) => {
  // console.log('to:', _to)
  // console.log('from:', _from)
})

export default router

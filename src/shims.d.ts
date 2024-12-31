import type { GlobalStyle } from '@uni-helper/vite-plugin-uni-pages'

export {}

declare module 'vue' {
  type Hooks = App.AppInstance & Page.PageInstance
  interface ComponentCustomOptions extends Hooks {}
  interface ComponentCustomProperties {
    $Route: {
      fullPath: string
      layout: string
      name: string
      path: string
      params: Record<string, any>
      query: Record<string, any>
      type: string
      style: GlobalStyle
      [property: string]: any
    }
  }
}

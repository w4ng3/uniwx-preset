import { createSSRApp } from 'vue'
import App from './App.vue'
import 'uno.css'
import router from './router'
import pinia from './stores'

export function createApp() {
  const app = createSSRApp(App)
  app.use(router)
  app.use(pinia)
  return {
    app,
  }
}

import { createSSRApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'

const pinia = createPinia()

export function createApp() {
    const app = createSSRApp(App)
    // 使用持久化存储插件
    pinia.use(persist)
    app.use(pinia)
    return {
        app,
        pinia
    }
}

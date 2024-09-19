import './assets/main.css'

import { createHead } from '@unhead/vue'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import { i18n } from '@/lang'
import App from './App.vue'
import router from './router'
import apiPlugin from './api/plugin'
import notifications from "@/libs/notifications"
import { useAuthStore } from '@/stores/auth'

const app = createApp(App)
app.use(autoAnimatePlugin).use(createPinia()).use(router).use(i18n).use(createHead()).use(apiPlugin)
app.provide("notifications", notifications)
router.isReady().then(() => startApp())

const startApp = async () => {

    const { refreshToken, token } = useAuthStore()
    if (token.get()) {
        await refreshToken()
    }
    app.mount('#app');
}

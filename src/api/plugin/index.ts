import type { App, Plugin } from 'vue'

import Test from '@/api/resources/test'
import Auth from '@/api/resources/auth'

export interface Api {
    test: ReturnType<typeof Test>
    Auth: ReturnType<typeof Auth>
}

export default {
    install: (app: App) => {
        const api = {
            test: new Test(),
            auth: new Auth(),

        }
        app.provide('api', api)
    }
} as Plugin


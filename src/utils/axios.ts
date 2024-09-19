import axios from 'axios'

import Token from '@/libs/token'
import { errorNotify, successNotify, infoNotify, warningNotify } from '@/libs/notifications'

const instance = axios.create()
instance.defaults.baseURL = 'http://api-guzheat/api/v1'
instance.interceptors.request.use((config) => {
    const token = Token.get()
    config.headers.Authorization = token ? `Bearer ${token}` : ""
    return config
})

instance.interceptors.response.use(
    (response) => {
        const { status } = response

        const msg = response.data.message

        if (msg) {
            successNotify(response.data.message)
        }

        if (!msg && (status === 201 || status === 202)) {
            successNotify("succeeded")
        }

        return response
    },
    (error) => {
        const { status } = error.response

        const msg = error.response.data.message

        if (status === 404) {
            errorNotify("not_found")
            window.history.back()
        }

        if (status >= 500 || status === 400) {
            errorNotify(msg || "unknown_error")
        }

        if (status === 401) {
            errorNotify(msg || "auth_error")
            window.location.replace("/personal")
        }

        if (status === 420) {
            window.location.replace("/personal")
        }

        if (status === 403) {
            errorNotify(msg || "forbidden")
        }

        if (status === 419) {
            errorNotify("csrf_error")
        }

        if (status === 422) {
            errorNotify("validation_error")
        }

        if (status === 429) {
            errorNotify("throttle_error")
        }

        return Promise.reject(error)
    }
)


export default instance

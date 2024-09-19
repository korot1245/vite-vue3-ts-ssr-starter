

import { reactive } from 'vue'

export const tokenName = "access_token"
export const tokenExpires = "token_expires_in"
export const TOKEN_REFRESH_EXPIRED_THRESHOLD = 1 * 60 * 60

class Token {
    access_token: string = ""
    expires_in: number = 0

    constructor(token: string = "", expires: number = 0) {
        if (token && expires) {
            this.reset(token, expires)
        }
        if (!import.meta.env.SSR) {
            this.access_token = localStorage.getItem(tokenName) || ""
            this.expires_in = Number(localStorage.getItem(tokenExpires)) || 0
        }

    }

    reset(token: string, expires: number) {
        this.access_token = token || ""
        this.expires_in = expires || 0

        if (!import.meta.env.SSR) {
            localStorage.setItem(tokenName, this.access_token)
            localStorage.setItem(tokenExpires, String(this.expires_in))
        }
    }

    get() {
        return this.check() ? this.access_token : null
    }

    remove() {
        if (!import.meta.env.SSR) {
            localStorage.removeItem(tokenName)
            localStorage.removeItem(tokenExpires)
        }
    }

    check() {
        return this.access_token.length > 0 && this.checkExpiries()
    }

    checkExpiries() {
        const curTime = Math.ceil((new Date()).getTime());
        const jwtBase64 = this.access_token.split('.')[1];
        if (!jwtBase64) return false
        const jwtToken = JSON.parse(atob(jwtBase64));
        const expires = new Date(jwtToken.exp * 1000);

        return curTime < expires.getTime()
    }
}

const user = new Token()

export default reactive(user)

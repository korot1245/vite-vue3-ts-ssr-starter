
import { defineStore } from 'pinia';
import { ref, reactive } from 'vue'
import { useApi } from '@/composables/use-api'
import { useRouter } from 'vue-router';
import { type UserType, default as User } from '@/libs/user'
import Token from '@/libs/token'

interface Response {
    access_token: string
    expires_in: number
    token_type: string
    user: UserType
}

export const useAuthStore = defineStore('auth', () => {
    const refreshTokenTimeout = ref<NodeJS.Timeout>()
    const router = useRouter()
    const api = useApi()
    const user = User
    const token = Token

    const login = async (email: string, password: string) => {
        const response = await api.auth.login(email, password) as Response
        user.reset(response.user)
        token.reset(response.access_token, response.expires_in)
        startRefreshTokenTimer();
    }

    const logout = async () => {
        token.reset('', 0)
        stopRefreshTokenTimer()
        user.clear()
        await router.push('/personal');
    }

    const refreshToken = async () => {
        const response = await api.auth.refresh() as Response
        user.reset(response.user)
        token.reset(response.access_token, response.expires_in)
        startRefreshTokenTimer()
    }

    const startRefreshTokenTimer = () => {
        const jwtBase64 = token.access_token.split('.')[1];
        const jwtToken = JSON.parse(atob(jwtBase64));
        const expires = new Date(jwtToken.exp * 1000);
        const timeout = expires.getTime() - Date.now() - (60 * 1000);
        refreshTokenTimeout.value = setTimeout(refreshToken, timeout);
    }

    const stopRefreshTokenTimer = () => {
        clearTimeout(refreshTokenTimeout.value);
    }

    return { login, logout, user, refreshToken, token }
})
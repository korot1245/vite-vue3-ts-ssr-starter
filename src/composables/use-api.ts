import { inject } from 'vue'
import type { Api } from '@/api/plugin'

export function useApi() {
    return inject('api') as Api
}

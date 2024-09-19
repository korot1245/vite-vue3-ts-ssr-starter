import { type AxiosRequestConfig } from "axios"
import axios from "@/utils/axios"
import Request from "@/api/requests/request"

export interface RequestConfig {
    baseURL?: string
    data?: Request
    params?: any
    headers?: any
    env?: {
        FormData?: new (...args: any[]) => object
    }
}

export default class Client {
    async get(url: string, config?: RequestConfig): Promise<JsonData<any>> {
        return Client.request({ ...config, url, method: "get" })
    }

    async post(url: string, config?: RequestConfig): Promise<JsonData<any>> {
        return Client.request({ ...config, url, method: "post" })
    }

    async delete(url: string, config?: RequestConfig): Promise<JsonData<any>> {
        return Client.request({ ...config, url, method: "delete" })
    }

    async patch(url: string, config?: RequestConfig): Promise<JsonData<any>> {
        return Client.request({ ...config, url, method: "patch" })
    }

    async put(url: string, config?: RequestConfig): Promise<JsonData<any>> {
        return Client.request({ ...config, url, method: "put" })
    }

    private static async request(config: AxiosRequestConfig): Promise<JsonData<any>> {
        try {
            return (await axios.request(config)).data || {}
        } catch (e: any) {
            return e.response?.data || {}
        }
    }
}


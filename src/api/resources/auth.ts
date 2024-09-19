import Resource from "@/api/resources/resource"

import { default as BaseResponse } from "@/api/responses/response"


export default class Auth extends Resource {
    async login(email: string, password: string) {
        return await this.client.post("/login", {
            data: {
                email,
                password
            },
        }) as BaseResponse
    }

    async refresh() {
        return await this.client.get("/refresh") as BaseResponse
    }
}
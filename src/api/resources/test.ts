import Resource from "@/api/resources/resource"

import { default as BaseResponse } from "@/api/responses/response"

export default class Test extends Resource {
    async test() {
        return await this.client.get("/test") as BaseResponse
    }
}
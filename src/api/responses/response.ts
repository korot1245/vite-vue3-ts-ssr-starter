
class Meta {
    total?: number
}

export default class Response {
    message?: string
    status?: string
    errors?: JsonData<string & Array<string>>
    data?: any
    meta?: Meta
}

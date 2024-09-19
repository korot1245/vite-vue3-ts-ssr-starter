export default class Request { }

export class ListRequest {
    query?: string
    sortKey?: string
    sortDirection?: string
    offset?: number
    limit?: number
    filter?: { [key: string]: any }
}

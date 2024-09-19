

import { reactive } from 'vue'

export interface UserType {
    birthday?: string
    created_at: string
    deleted_at?: string
    email: string
    email_verified_at?: string
    id: number
    last_name?: string
    middle_name?: string
    name?: string
    role: number
    updated_at: string
}

export class User {
    [index: string]: any;

    constructor(data?: UserType) {
        this.reset(data)
    }

    reset(data?: UserType) {
        for (const field in data) {
            this[field] = data[field as keyof UserType]
        }
    }

    clear() {
        for (const field of Object.keys(this)) {
            this[field] = null
        }
    }

    checkRole(role?: number) {
        return !role || this.role === role
    }

    isSupervisor() {
        return this.checkRole(101)
    }

    isAdmin() {
        return this.checkRole(1)
    }

    exists() {
        return this.id > 0
    }

}

const user = new User()

export default reactive(user)


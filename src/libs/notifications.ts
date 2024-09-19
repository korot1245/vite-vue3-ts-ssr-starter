import { ref } from "vue"
import { v4 as uuidv4 } from "uuid"

export interface Notification {
    id?: string
    kind: string
    subtitle: string
}
export type Notifications = Array<Notification>

const notifications = ref(Array<Notification>())
const notify = (kind: string, message: string) => {
    const notification: Notification = { id: uuidv4(), kind: kind, subtitle: message }
    notifications.value.push(notification)
    setTimeout(() => {
        popNotification(notification)
    }, 2000)
}
export const popNotification = (notification: Notification) =>
    (notifications.value = notifications.value.filter((item) => item.id !== notification.id))
export const errorNotify = (message: string) => notify("error", message)
export const successNotify = (message: string) => notify("success", message)
export const infoNotify = (message: string) => notify("info", message)
export const warningNotify = (message: string) => notify("warning", message)
export default notifications


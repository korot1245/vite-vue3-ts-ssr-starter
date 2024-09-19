import ru from "./ru"
import { NumberFormatRU } from "./numberFormats"
import { DateTimeRu } from "./dateTimeFormats"
import { createI18n } from "vue-i18n"

type MessageSchema = typeof ru
type NumberSchema = typeof NumberFormatRU
type DateTimeFormat = typeof DateTimeRu

const i18n = createI18n<{
    globalInjection: true,
    message: MessageSchema,
    number: NumberSchema,
    datetime: DateTimeFormat
}, 'ru'>({
    locale: 'ru',
    fallbackLocale: 'ru',
    pluralRules: {
        ru: (choice) => {
            const cases = [2, 0, 1, 1, 1, 2]
            return choice % 100 > 4 && choice % 100 < 20 ? 2 : cases[choice % 10 < 5 ? choice % 10 : 5]
        }
    },
    numberFormats: {
        //@ts-ignore
        ru: NumberFormatRU
    },
    legacy: false,
    datetimeFormats: {
        ru: DateTimeRu
    },
    messages: {
        ru
    }
})

export { i18n }
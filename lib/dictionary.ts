import type { Locale } from './i18n-config'
import { i18n } from './i18n-config'

const dictionaries = {
    cn: () => import('@/dictionaries/zh').then(module => module.dictionary),
    en: () => import('@/dictionaries/en').then(module => module.dictionary),
} as const

export const getDictionary = async (locale: Locale) => {
    if (!i18n.locales.includes(locale)) {
        return dictionaries[i18n.defaultLocale]();
    }
    return dictionaries[locale]();
} 
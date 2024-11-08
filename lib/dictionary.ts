import type { Locale } from './i18n-config'

const dictionaries = {
    en: () => import('@/dictionaries/en').then(module => module.dictionary),
    cn: () => import('@/dictionaries/zh').then(module => module.dictionary),
}

export const getDictionary = async (locale: Locale) => {
    return dictionaries[locale]()
} 
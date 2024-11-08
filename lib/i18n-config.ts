export const i18n = {
    defaultLocale: 'cn',
    locales: ['cn', 'en'],
} as const

export type Locale = (typeof i18n)['locales'][number] 
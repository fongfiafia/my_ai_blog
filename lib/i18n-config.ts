export const i18n = {
    locales: ['zh', 'en'] as const,
    defaultLocale: 'zh' as const,
}

export type Locale = (typeof i18n.locales)[number] 
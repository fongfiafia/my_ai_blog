export const i18n = {
    defaultLocale: 'cn',
    locales: ['cn', 'en'] as const,
} as const

export type Locale = (typeof i18n.locales)[number]

// 语言名称映射
export const languageNames: Record<Locale, string> = {
    cn: '简体中文',
    en: 'English',
} 
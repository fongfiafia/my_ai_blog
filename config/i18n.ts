export const locales = ['zh', 'en'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'zh';

// 定义支持的语言名称显示
export const localeNames: Record<Locale, string> = {
    zh: '中文',
    en: 'English',
}; 
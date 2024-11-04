import type { Locale } from './i18n-config'

// 获取字典数据
async function getDictionary(locale: Locale) {
    try {
        return (await import(`./dictionaries/${locale}.json`)).default
    } catch (error) {
        console.error('Error loading dictionary:', error)
        return {}
    }
}

export default getDictionary 
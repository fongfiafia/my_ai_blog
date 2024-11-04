'use client'

import { usePathname, useRouter } from 'next/navigation'
import { i18n } from '@/middleware'

export default function LanguageSwitcher() {
    const pathname = usePathname()
    const router = useRouter()

    const switchLanguage = (newLocale: string) => {
        // 从当前路径中提取出locale后的部分
        const currentLocale = pathname.split('/')[1]
        const newPath = pathname.replace(`/${currentLocale}`, `/${newLocale}`)
        router.push(newPath)
    }

    return (
        <div className="flex gap-2">
            {i18n.locales.map((locale) => (
                <button
                    key={locale}
                    onClick={() => switchLanguage(locale)}
                    className="px-3 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                    {locale.toUpperCase()}
                </button>
            ))}
        </div>
    )
} 
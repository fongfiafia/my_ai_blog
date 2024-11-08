'use client'

import { usePathname, useRouter } from 'next/navigation'
import { i18n } from '@/lib/i18n-config'
import { Button } from './ui/button'
import { GlobeIcon } from 'lucide-react'

export default function LanguageSwitcher() {
    const pathName = usePathname()
    const router = useRouter()

    const redirectedPathName = (locale: string) => {
        if (!pathName) return '/'

        const segments = pathName.split('/')
        segments[1] = locale
        return segments.join('/')
    }

    const toggleLanguage = () => {
        const currentLocale = pathName.split('/')[1] || i18n.defaultLocale
        const newLocale = currentLocale === 'cn' ? 'en' : 'cn'
        router.push(redirectedPathName(newLocale))
    }

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={toggleLanguage}
            title={pathName.split('/')[1] === 'cn' ? 'Switch to English' : '切换到中文'}
        >
            <GlobeIcon className="h-[1.1rem] w-[1.1rem]" />
        </Button>
    )
} 
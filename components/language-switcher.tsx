'use client'

import { usePathname, useRouter } from 'next/navigation'
import { i18n, languageNames, type Locale } from '@/lib/i18n-config'
import { GlobeIcon } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from './ui/button'
import { useEffect } from 'react'
import Cookies from 'js-cookie'

export default function LanguageSwitcher() {
    const pathName = usePathname()
    const router = useRouter()

    const redirectedPathName = (locale: string) => {
        if (!pathName) return '/'

        const segments = pathName.split('/')
        if (segments[1] && i18n.locales.includes(segments[1] as Locale)) {
            segments[1] = locale
        } else {
            segments.splice(1, 0, locale)
        }
        return segments.join('/')
    }

    const switchLanguage = (locale: string) => {
        // 设置cookie
        Cookies.set('NEXT_LOCALE', locale, { path: '/' })
        // 重定向到新的URL
        router.push(redirectedPathName(locale))
    }

    const currentLocale = pathName.split('/')[1] || i18n.defaultLocale

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="flex gap-2 items-center"
                >
                    <GlobeIcon className="h-[1.1rem] w-[1.1rem]" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {Object.entries(languageNames).map(([locale, name]) => (
                    <DropdownMenuItem
                        key={locale}
                        className={`cursor-pointer ${currentLocale === locale ? 'font-bold' : ''}`}
                        onClick={() => switchLanguage(locale)}
                    >
                        {name}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
} 
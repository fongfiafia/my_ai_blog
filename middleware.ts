import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { i18n } from '@/lib/i18n-config'
import { match as matchLocale } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'

function getLocale(request: NextRequest): string {
    // 1. 检查URL中是否已有语言参数
    const pathname = request.nextUrl.pathname
    const pathnameIsMissingLocale = i18n.locales.every(
        locale => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    )

    if (!pathnameIsMissingLocale) {
        const locale = pathname.split('/')[1]
        return locale
    }

    // 2. 检查cookie中是否有语言设置
    const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value
    if (cookieLocale && i18n.locales.includes(cookieLocale as any)) {
        return cookieLocale
    }

    // 3. 根据Accept-Language头部获取首选语言
    const headers = new Headers(request.headers)
    const acceptLanguage = headers.get('accept-language')
    if (acceptLanguage) {
        try {
            const negotiator = new Negotiator({ headers: { 'accept-language': acceptLanguage } })
            const availableLocales = i18n.locales
            const languages = negotiator.languages()
            const locale = matchLocale(languages, availableLocales, i18n.defaultLocale)
            return locale
        } catch (e) {
            console.error('Error matching locale:', e)
        }
    }

    // 4. 默认返回默认语言
    return i18n.defaultLocale
}

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname

    // 不处理静态资源和API路由
    if (
        [
            '/manifest.json',
            '/favicon.ico',
            // Your other public files
        ].includes(pathname) ||
        pathname.includes('.') ||
        pathname.startsWith('/api/')
    ) {
        return
    }

    // 获取当前语言
    const locale = getLocale(request)
    const pathnameIsMissingLocale = i18n.locales.every(
        locale => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    )

    if (pathnameIsMissingLocale) {
        // 重定向到带有语言前缀的URL
        const newUrl = new URL(`/${locale}${pathname}`, request.url)
        return NextResponse.redirect(newUrl)
    }

    const response = NextResponse.next()

    // 设置语言cookie
    response.cookies.set('NEXT_LOCALE', locale)

    return response
}

export const config = {
    matcher: [
        // Skip all internal paths (_next)
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
} 
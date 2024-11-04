import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// 支持的语言列表
export const i18n = {
    locales: ['zh', 'en'],
    defaultLocale: 'zh'
}

// 获取请求路径中的locale
function getLocale(request: NextRequest) {
    const pathname = request.nextUrl.pathname
    const locale = i18n.locales.find(
        locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    )
    return locale || i18n.defaultLocale
}

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname

    // 如果路径已经包含locale,直接返回
    if (pathname.startsWith(`/${i18n.locales[0]}/`) || pathname.startsWith(`/${i18n.locales[1]}/`)) {
        return NextResponse.next()
    }

    // 获取用户偏好语言
    const pathnameIsMissingLocale = i18n.locales.every(
        locale => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    )

    if (pathnameIsMissingLocale) {
        const locale = getLocale(request)
        return NextResponse.redirect(
            new URL(`/${locale}${pathname}`, request.url)
        )
    }
}

export const config = {
    matcher: [
        // 跳过所有内部路径 (_next)
        '/((?!_next|api|favicon.ico).*)',
    ],
} 
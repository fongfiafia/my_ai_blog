import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { i18n } from '@/lib/i18n-config'

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname

    // 检查路径是否已经包含语言前缀
    const pathnameHasLocale = i18n.locales.some(
        locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    )

    if (pathnameHasLocale) return

    // 重定向到默认语言
    const locale = i18n.defaultLocale
    request.nextUrl.pathname = `/${locale}${pathname}`
    return NextResponse.redirect(request.nextUrl)
}

export const config = {
    matcher: [
        // 跳过不需要重定向的路径
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
} 
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { i18n } from '@/lib/i18n-config'
import type { Locale } from '@/lib/i18n-config'

function getLocale(request: NextRequest): Locale {
    // 1. 检查URL中是否已有语言参数
    const pathname = request.nextUrl.pathname
    const pathnameIsMissingLocale = i18n.locales.every(
        locale => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    )

    if (!pathnameIsMissingLocale) {
      const locale = pathname.split('/')[1] as Locale
      return locale
  }

    // 2. 检查cookie中是否有语言设置
    const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value
    if (cookieLocale && i18n.locales.includes(cookieLocale as Locale)) {
      return cookieLocale as Locale
  }

    // 3. 默认返回英文
    return 'en'
}

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname

    // 不处理静态资源和API路由
    if (
        [
            '/manifest.json',
            '/favicon.ico',
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
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
} 
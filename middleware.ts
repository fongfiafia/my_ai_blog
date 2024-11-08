import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './config/i18n';

export default createMiddleware({
    locales,
    defaultLocale,
    localePrefix: 'always'  // 总是在URL中显示语言前缀
});

export const config = {
    matcher: ['/((?!api|_next|.*\\..*).*)']
}; 
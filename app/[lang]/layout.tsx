import { Locale } from '@/lib/i18n-config'

export default async function Layout({
    children,
    params: { lang }
}: {
    children: React.ReactNode
    params: { lang: Locale }
}) {
    return (
        <div>
            {children}
        </div>
    )
} 
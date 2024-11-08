import type { Metadata } from "next";
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { ThemeProvider } from "@/components/contexts/theme-provider";
import { Navbar } from "@/components/navbar";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Footer } from "@/components/footer";
import Script from 'next/script';
import { locales } from '@/config/i18n';
import "../globals.css";

export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
    children,
    params: { locale }
}: {
    children: React.ReactNode;
    params: { locale: string };
}) {
    let messages;
    try {
        messages = (await import(`../../messages/${locale}.json`)).default;
    } catch (error) {
        notFound();
    }

    return (
        <html lang={locale} suppressHydrationWarning>
            <head>
                <meta name="google-adsense-account" content="ca-pub-1362518378038131" />
                <script type="application/ld+json" dangerouslySetInnerHTML={{
                    __html: `
                        {
                            "@context": "https://schema.org/",
                            "@type": "Course",
                            "name": "最好的Cursor教程",
                            "description": "提供最全面、最专业的Cursor AI编程教程。适合小白的免费学习资源，助您掌握AI编程技能。",
                            "provider": {
                                "@type": "Organization",
                                "name": "LookAI",
                                "url": "https://www.lookai.top"
                            },
                            "aggregateRating": {
                                "@type": "AggregateRating",
                                "ratingValue": "4.8",
                                "reviewCount": "1000"
                            },
                            "offers": {
                                "@type": "Offer",
                                "price": "0",
                                "priceCurrency": "CNY",
                                "availability": "https://schema.org/InStock",
                                "category": "在线教育"
                            }
                        }
                    `
                }} />
                {/* 其他 schema 标记保持不变 */}
            </head>
            <body
                className={`${GeistSans.variable} ${GeistMono.variable} font-regular antialiased`}
                suppressHydrationWarning
            >
                <NextIntlClientProvider locale={locale} messages={messages}>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >
                        <Navbar />
                        <main className="sm:container mx-auto w-[90vw] h-auto">
                            {children}
                        </main>
                        {/* <Footer /> */}
                    </ThemeProvider>
                </NextIntlClientProvider>
                <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1362518378038131" crossOrigin="anonymous" />
                <Script src="https://www.googletagmanager.com/gtag/js?id=G-R61S9VMKCP" />
                <Script id="google-analytics">
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'G-R61S9VMKCP');
                    `}
                </Script>
            </body>
        </html>
    );
} 
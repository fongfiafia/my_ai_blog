import type { Metadata } from "next";
import { ThemeProvider } from "@/components/contexts/theme-provider";
import { Navbar } from "@/components/navbar";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import Script from 'next/script';
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: '%s | LookAI',
    default: 'LookAI - Cursor AI Programming Tutorial for Beginners | Free Learning Resources',
    absolute: 'LookAI - 零基础Cursor AI编程教程网站 | Cursor AI Programming Tutorial for Beginners'
  },
  description: 'Comprehensive and professional Cursor AI programming tutorials. Free learning resources suitable for beginners. 提供最全面、最专业的Cursor AI编程教程。适合零基础小白的免费学习资源。',
  keywords: 'Cursor, Cursor Tutorial, AI Programming, Free Tutorial, Comprehensive Guide, Professional Tutorial, 小白教程, AI编程, 免费教程, 最全面教程, 专业指导',
  metadataBase: new URL('https://www.lookai.top'),
  alternates: {
    canonical: 'https://www.lookai.top',
    languages: {
      'en-US': '/en',
      'zh-CN': '/cn',
    },
  },
  openGraph: {
    title: 'LookAI - Cursor AI Programming Tutorial & Free Learning Resources',
    description: 'Discover comprehensive Cursor AI programming tutorials for beginners. Free resources to help you master AI programming. 发现最全面的Cursor AI编程免费教程，适合所有水平的学习者。',
    url: 'https://www.lookai.top',
    siteName: 'LookAI',
    locale: 'en_US',
    alternateLocale: 'zh_CN',
    type: 'website',
  },
  icons: {
    icon: [
      { url: '/logo_round.png', type: 'image/png', sizes: '32x32' },
      { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
      { url: '/icon-512.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="google-adsense-account" content="ca-pub-1362518378038131" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: `
            {
              "@context": "https://schema.org/",
              "@type": "Course",
              "name": {
                "@language": "zh",
                "@value": "最好的Cursor教程"
              },
              "alternateName": {
                "@language": "en",
                "@value": "Best Cursor Tutorial"
              },
              "description": {
                "@language": "zh",
                "@value": "提供最全面、最专业的Cursor AI编程教程。适合小白的免费学习资源，助您掌握AI编程技能。"
              },
              "alternateDescription": {
                "@language": "en",
                "@value": "Comprehensive and professional Cursor AI programming tutorials. Free learning resources suitable for beginners to master AI programming skills."
              },
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
                "priceCurrency": "USD",
                "availability": "https://schema.org/InStock",
                "category": ["Online Education", "在线教育"]
              },
              "hasCourseInstance": [
                {
                  "@type": "CourseInstance",
                  "courseMode": "online",
                  "courseWorkload": "PT10H",
                  "startDate": "2024-01-01",
                  "inLanguage": ["en", "zh"]
                }
              ]
            }
          `
        }} />

        {/* seo2 */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: `
            [
              {
                "@context": "https://schema.org/",
                "@type": "Article",
                "mainEntityOfPage": {
                  "@type": "WebPage",
                  "@id": "https://www.lookai.top/cursor/basic/cursor_interface"
                },
                "headline": {
                  "@language": "zh",
                  "@value": "Cursor 界面介绍"
                },
                "alternateHeadline": {
                  "@language": "en",
                  "@value": "Cursor Interface Introduction"
                },
                "description": {
                  "@language": "zh",
                  "@value": "详细介绍 Cursor AI 编程工具的界面和基本功能"
                },
                "alternateDescription": {
                  "@language": "en",
                  "@value": "Detailed introduction to Cursor AI programming tool interface and basic functions"
                },
                "image": "https://www.lookai.top/interface.jpeg",
                "author": {
                  "@type": "Organization",
                  "name": "LookAI"
                },
                "publisher": {
                  "@type": "Organization",
                  "name": "LookAI",
                  "logo": {
                    "@type": "ImageObject",
                    "url": "https://www.lookai.top/logo.png"
                  }
                },
                "datePublished": "2024-01-01",
                "dateModified": "2024-01-15",
                "inLanguage": ["en", "zh"]
              }
              // ... 其他文章的结构化数据也类似添加英文版本
            ]
          `
        }} />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1362518378038131"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      {/* <Script
        src="https://alwingulla.com/88/tag.min.js"
        data-zone="113027"
        async
        data-cfasync="false"
        strategy="afterInteractive"
      /> */}
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} font-regular antialiased`}
        suppressHydrationWarning
      >
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
        </ThemeProvider>
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
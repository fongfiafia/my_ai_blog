import type { Metadata } from "next";
import { ThemeProvider } from "@/components/contexts/theme-provider";
import { Navbar } from "@/components/navbar";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Footer } from "@/components/footer";
import Script from 'next/script';
import "./globals.css";

export const metadata: Metadata = {
  title: 'LookAI - 零基础Cursor AI编程教程网站 | 小白免费学习资源',
  description: '提供最全面、最专业、最简单、最易懂  的Cursor AI编程教程。适合零基础、普通人小白的免费学习资源，助您掌握AI编程技能。',
  keywords: 'Cursor, 小白教程, AI编程, 免费教程, 最全面教程, 专业指导',
  metadataBase: new URL('https://www.lookai.top'),
  openGraph: {
    title: 'LookAI - 零基础Cursor编程教程网站',
    description: '发现最全面、最专业的Cursor AI编程免费教程，适合零基础水平学习者。',
    url: 'https://www.lookai.top',
    siteName: 'LookAI',
    locale: 'zh_CN',
    type: 'website'
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
            },
              "hasCourseInstance": [
                {
                  "@type": "CourseInstance",
                  "courseMode": "online",
                  "courseWorkload": "PT10H",
                  "startDate": "2024-01-01"
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
                "headline": "Cursor 界面介绍",
                "description": "详细介绍 Cursor AI 编程工具的界面和基本功能",
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
                "dateModified": "2024-01-15"
              },
              {
                "@context": "https://schema.org/",
                "@type": "Article",
                "mainEntityOfPage": {
                  "@type": "WebPage",
                  "@id": "https://www.lookai.top/cursor/advance/cursor_tab"
                },
                "headline": "Cursor Tab自动补全",
                "description": "学习如何在 Cursor 中高效管理多个标签页",
                "image": "https://www.lookai.top/predict.jpeg",
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
                "datePublished": "2024-01-05",
                "dateModified": "2024-01-20"
              },
              {
                "@context": "https://schema.org/",
                "@type": "Article",
                "mainEntityOfPage": {
                  "@type": "WebPage",
                  "@id": "https://www.lookai.top/cursor/tips/cursor_git"
                },
                "headline": "Cursor 中的 Git 操作技巧",
                "description": "掌握在 Cursor 中使用 Git 进行版本控制的高级技巧",
                "image": "https://www.lookai.top/git_logo.png",
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
                "datePublished": "2024-01-10",
                "dateModified": "2024-01-25"
              }
            ]
          `
        }} />
      </head>
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
          {/* <Footer /> */}
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

import type { Metadata } from "next";
import { ThemeProvider } from "@/components/contexts/theme-provider";
import { Navbar } from "@/components/navbar";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Footer } from "@/components/footer";
import "./globals.css";

export const metadata: Metadata = {
  title: 'LookAI - 最专业的Cursor AI编程教程 | 小白免费学习资源',
  description: '提供最全面、最专业的Cursor AI编程教程。适合小白的免费学习资源，助您掌握AI编程技能。',
  keywords: 'Cursor, 小白教程, AI编程, 免费教程, 最全面教程, 专业指导',
  metadataBase: new URL('https://www.lookai.top'),
  openGraph: {
    title: 'LookAI - 最佳Cursor AI编程教程平台',
    description: '发现最全面、最专业的Cursor AI编程免费教程，适合所有水平的学习者。',
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
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1362518378038131" crossOrigin="anonymous"></script>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-R61S9VMKCP" />
        <script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-R61S9VMKCP');
          `}
        </script>
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
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

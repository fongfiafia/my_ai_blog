import { Metadata } from 'next';
import { getDictionary } from '@/lib/dictionary'
import { Locale } from '@/lib/i18n-config'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getCategories, getSOPArticles } from '@/lib/get-sop-content'
import { notFound } from 'next/navigation'

// 日期格式化函数
function formatDate(date: string | Date) {
    if (!date) return ''
    try {
        const d = new Date(date)
        if (isNaN(d.getTime())) {
            return '';
        }
        const year = d.getFullYear()
        const month = String(d.getMonth() + 1).padStart(2, '0')
        const day = String(d.getDate()).padStart(2, '0')
        return `${year}-${month}-${day}`
    } catch (error) {
        console.error('Date formatting error:', error)
        return ''
    }
}

export default async function CategoryPage({
    params: { lang, category }
}: {
    params: { lang: Locale; category: string }
}) {
    const dict = await getDictionary(lang)
    const categories = getCategories()
    const articles = await getSOPArticles(category) // 传入分类参数，只获取该分类的文章
    const latestArticles = articles.slice(0, 3)

    if (!categories.find(c => c.slug === category)) {
        notFound()
    }

    return (
        <div className="min-h-screen">
            <div className="sticky top-16 z-20 bg-background">
                <div className="border-b">
                    <div className="container py-8">
                        <div className="text-sm text-muted-foreground mb-6">
                            <span>独立开发指南</span>
                            <span className="mx-2">/</span>
                            <span>{categories.find(cat => cat.slug === category)?.name || '所有文章'}</span>
                        </div>

                        <div className="space-y-4 max-w-[720px]">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-6 h-6">
                                    <svg className="w-full h-full text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                </div>
                                <h1 className="text-3xl font-bold tracking-tight">
                                    零基础独立开发指南
                                </h1>
                            </div>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                AI时代，无任何编程经验的小白也能开发出自己的产品，包括小程序、浏览器插件、ios应用、Android应用、脚本等等，以前只有程序员能做的事，现在你也可以做到。
                                但是你还缺少一些必备知识和引导，也就是一个操作指南，例如UI该如何设计，该用什么语言？数据库是什么？登录注册该怎么弄？本网站就是做这个的，帮你捅破那层窗户纸！
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-6">
                            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                                <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                手把手教程
                            </div>
                            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                                <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                快速上手
                            </div>
                            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                                <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                                最佳实践
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container py-3">
                    <div className="flex items-center gap-1 overflow-x-auto">
                        {categories.map((cat) => (
                            <Link
                                key={cat.slug}
                                href={`/indie-dev-guide/category/${cat.slug}`}
                                className={`px-3 py-1.5 text-sm rounded-md transition-colors ${cat.slug === category
                                    ? 'bg-primary/10 text-primary font-medium'
                                    : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                                    }`}
                            >
                                {cat.name} ({cat.count})
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            <div className="container flex-1 items-start md:grid md:grid-cols-[1fr_300px] md:gap-6 lg:grid-cols-[1fr_360px] lg:gap-10 py-6">
                <main className="relative">
                    <div className="grid gap-4">
                        {articles.map((article) => (
                            <div
                                key={article.slug}
                                className="rounded-lg border bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/40 text-card-foreground shadow transition-all duration-200 hover:bg-background/80"
                            >
                                <div className="p-6">
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                                        <span>{article.author}</span>
                                        <span>·</span>
                                        <span>{formatDate(article.date)}</span>
                                        <span>·</span>
                                        <span>{article.readTime}</span>
                                    </div>
                                    <Link href={`/indie-dev-guide/${article.slug}`} className="group">
                                        <h2 className="text-2xl font-bold mb-2 group-hover:text-primary">
                                            {article.title}
                                        </h2>
                                        <p className="text-muted-foreground">{article.excerpt}</p>
                                    </Link>
                                    <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                                        <span>{article.views} views</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>
                <aside className="hidden md:block">
                    <div className="sticky top-[calc(16rem+2rem)] max-h-[calc(100vh-18rem)] overflow-y-auto rounded-lg border bg-card text-card-foreground shadow">
                        <div className="flex flex-col space-y-1.5 p-6">
                            <h3 className="font-semibold leading-none tracking-tight">最新文章</h3>
                        </div>
                        <div className="p-6 pt-0">
                            <div className="grid gap-4">
                                {latestArticles.map((article) => (
                                    <div key={article.slug} className="grid gap-1">
                                        <Link href={`/indie-dev-guide/${article.slug}`} className="font-medium hover:text-primary">
                                            {article.title}
                                        </Link>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <span>{article.author}</span>
                                            <span>·</span>
                                            <span>{formatDate(article.date)}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    )
} 
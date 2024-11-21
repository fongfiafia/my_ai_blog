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
                    <div className="container py-8 space-y-6">
                        <div className="space-y-3">
                            <h1 className="text-3xl font-bold tracking-tight">
                                零基础小白开发自己产品SOP
                            </h1>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                从构思到上线，我们为每一位独立开发者精心打造了这份指南。无论你是设计师、产品经理，还是刚入门的开发者，这里都能找到适合你的开发路径。
                            </p>
                        </div>
                        <div className="flex gap-6">
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                <span>手把手教程</span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                <span>快速上手</span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                                <span>最佳实践</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                    <div className="container py-4">
                        <div className="flex items-center gap-4 min-w-max overflow-x-auto">
                            {categories.map((cat) => (
                                <Button
                                    key={cat.slug}
                                    variant={cat.slug === category ? "default" : "ghost"}
                                    asChild
                                >
                                    <Link href={`/indie-dev-guide/category/${cat.slug}`}>
                                        {cat.name} ({cat.count})
                                    </Link>
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="container flex-1 items-start md:grid md:grid-cols-[1fr_300px] md:gap-6 lg:grid-cols-[1fr_360px] lg:gap-10">
                <main className="relative">
                    <div className="grid gap-4">
                        {articles.map((article) => (
                            <div key={article.slug} className="rounded-lg border bg-card text-card-foreground shadow">
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
                    <div className="rounded-lg border bg-card text-card-foreground shadow">
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
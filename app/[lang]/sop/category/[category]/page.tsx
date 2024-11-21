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
            <div className="container flex-1 items-start md:grid md:grid-cols-[1fr_300px] md:gap-6 lg:grid-cols-[1fr_360px] lg:gap-10 py-6">
                <main className="relative">
                    <div className="w-full overflow-x-auto pb-2">
                        <div className="flex items-center gap-4 min-w-max">
                            {categories.map((cat) => (
                                <Button
                                    key={cat.slug}
                                    variant={cat.slug === category ? "default" : "ghost"}
                                    asChild
                                >
                                    <Link href={`/sop/category/${cat.slug}`}>
                                        {cat.name} ({cat.count})
                                    </Link>
                                </Button>
                            ))}
                        </div>
                    </div>
                    <div className="mt-4 grid gap-4">
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
                                    <Link href={`/sop/${article.slug}`} className="group">
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
                                        <Link href={`/sop/${article.slug}`} className="font-medium hover:text-primary">
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
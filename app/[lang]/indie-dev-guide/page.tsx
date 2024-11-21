import { Metadata } from 'next';
import { getDictionary } from '@/lib/dictionary'
import { Locale } from '@/lib/i18n-config'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getCategories, getSOPArticles } from '@/lib/get-sop-content'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
    title: '零基础小白开发产品SOP - LookAI',
    description: '为零基础小白提供的产品开发标准操作流程指南',
};

// 日期格式化函数
function formatDate(date: string | Date) {
    if (!date) return ''
    try {
        const d = new Date(date)
        if (isNaN(d.getTime())) {
            return ''; // 如果日期无效，返回空字符串
        }
        // 手动格式化日期，避免使用 toISOString
        const year = d.getFullYear()
        const month = String(d.getMonth() + 1).padStart(2, '0')
        const day = String(d.getDate()).padStart(2, '0')
        return `${year}-${month}-${day}`
    } catch (error) {
        console.error('Date formatting error:', error)
        return ''
    }
}

export default async function SOPPage({ params: { lang } }: { params: { lang: Locale } }) {
    const dict = await getDictionary(lang)
    const categories = getCategories()

    // 如果是直接访问 /sop，重定向到小程序分类
    if (categories.length > 0) {
        const defaultCategory = categories.find(cat => cat.slug === 'miniprogram') || categories[0]
        redirect(`/indie-dev-guide/category/${defaultCategory.slug}`)
    }

    // 以下代码通常不会执行，因为会被重定向
    const articles = await getSOPArticles()
    const latestArticles = articles.slice(0, 3)

    return (
        <div className="min-h-screen">
            <div className="container flex-1 items-start md:grid md:grid-cols-[1fr_300px] md:gap-6 lg:grid-cols-[1fr_360px] lg:gap-10 py-6">
                <main className="relative">
                    <div className="w-full overflow-x-auto pb-2">
                        <div className="flex items-center gap-4 min-w-max">
                            {categories.map((category) => (
                                <Button key={category.slug} variant="ghost" asChild>
                                    <Link href={`/indie-dev-guide/category/${category.slug}`}>
                                        {category.name} ({category.count})
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
import { Metadata } from 'next';
import { getDictionary } from '@/lib/dictionary'
import { Locale } from '@/lib/i18n-config'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Search } from 'lucide-react'

export const metadata: Metadata = {
    title: '零基础小白开发产品SOP - LookAI',
    description: '为零基础小白提供的产品开发标准操作流程指南',
};

export default async function SOPPage({ params: { lang } }: { params: { lang: Locale } }) {
    const dict = await getDictionary(lang)

    const categories = [
        { name: "推荐", href: "#" },
        { name: "UI设计", href: "#" },
        { name: "小程序", href: "#" },
        { name: "前端", href: "#" },
        { name: "后端", href: "#" },
        { name: "人工智能", href: "#" },
    ]

    const articles = [
        {
            title: "如何使用Cursor开发微信小程序",
            excerpt: "本文将介绍如何使用Cursor AI快速开发一个微信小程序，从0到1的完整教程...",
            author: "未生AI",
            date: "2024-03-20",
            readTime: "5 min read",
            views: "1.2K",
        },
        {
            title: "使用Cursor开发网站全过程",
            excerpt: "使用Cursor开发一个完整的网站，包括前端、后端、数据库的全栈开发过程...",
            author: "未生AI",
            date: "2024-03-19",
            readTime: "8 min read",
            views: "2.3K",
        },
    ]

    const latestArticles = [
        {
            title: "Cursor + Git版本控制实战",
            author: "未生AI",
            date: "2024-03-20",
        },
        {
            title: "深入理解Cursor的AI对话功能",
            author: "未生AI",
            date: "2024-03-19",
        },
        {
            title: "Cursor项目实战：开发一个AI助手",
            author: "未生AI",
            date: "2024-03-18",
        },
    ]

    return (
        <div className="min-h-screen">
            <div className="container flex-1 items-start md:grid md:grid-cols-[1fr_300px] md:gap-6 lg:grid-cols-[1fr_360px] lg:gap-10 py-6">
                <main className="relative">
                    <div className="w-full overflow-x-auto pb-4">
                        <div className="flex items-center gap-4 min-w-max">
                            {categories.map((category) => (
                                <Button key={category.name} variant="ghost" asChild>
                                    <Link href={category.href}>{category.name}</Link>
                                </Button>
                            ))}
                        </div>
                    </div>
                    <div className="mt-8 grid gap-6">
                        {articles.map((article) => (
                            <div key={article.title} className="rounded-lg border bg-card text-card-foreground shadow">
                                <div className="p-6">
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                                        <span>{article.author}</span>
                                        <span>·</span>
                                        <span>{article.date}</span>
                                        <span>·</span>
                                        <span>{article.readTime}</span>
                                    </div>
                                    <Link href="#" className="group">
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
                                    <div key={article.title} className="grid gap-1">
                                        <Link href="#" className="font-medium hover:text-primary">
                                            {article.title}
                                        </Link>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <span>{article.author}</span>
                                            <span>·</span>
                                            <span>{article.date}</span>
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
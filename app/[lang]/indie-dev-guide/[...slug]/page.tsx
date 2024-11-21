import { Metadata } from 'next';
import { getDictionary } from '@/lib/dictionary'
import { Locale } from '@/lib/i18n-config'
import { getSOPArticles } from '@/lib/get-sop-content'
import { notFound } from 'next/navigation'
import { Typography } from "@/components/typography"
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import React from 'react'

type PageProps = {
    params: {
        slug: string[];
        lang: Locale;
    };
};

type Frontmatter = {
    title: string;
    excerpt: string;
    author: string;
    date: string;
    readTime: string;
}

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

async function getArticleContent(slug: string[]) {
    const articlePath = path.join(process.cwd(), 'contents', ...slug) + '.mdx'

    try {
        const fileContent = fs.readFileSync(articlePath, 'utf-8')
        const { data, content } = matter(fileContent)
        return {
            frontmatter: {
                ...data,
                date: formatDate(data.date) // 在这里格式化日期
            } as Frontmatter,
            content
        }
    } catch (error) {
        return null
    }
}

export default async function ArticlePage({ params: { slug, lang } }: PageProps) {
    const article = await getArticleContent(slug)

    if (!article) {
        notFound()
    }

    const { frontmatter, content } = article

    return (
        <div className="container max-w-4xl py-6">
            <Link
                href="/indie-dev-guide"
                className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors mb-6 w-fit"
            >
                <ChevronLeft className="h-4 w-4" />
                <span>Back to Guide</span>
            </Link>
            <article className="prose dark:prose-invert max-w-none">
                <Typography>
                    <h1 className="text-3xl font-bold mb-4">{frontmatter.title}</h1>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
                        <span>{frontmatter.author}</span>
                        <span>·</span>
                        <span>{frontmatter.date}</span>
                        <span>·</span>
                        <span>{frontmatter.readTime}</span>
                    </div>
                    <div className="mt-4">
                        <MDXRemote source={content} />
                    </div>
                </Typography>
            </article>
        </div>
    )
}

export async function generateMetadata({ params: { slug } }: PageProps): Promise<Metadata> {
    const article = await getArticleContent(slug)

    if (!article) {
        return {
            title: 'Article Not Found',
            description: 'The requested article could not be found.'
        }
    }

    return {
        title: article.frontmatter.title,
        description: article.frontmatter.excerpt
    }
}

export async function generateStaticParams() {
    const articles = await getSOPArticles()
    return articles.map(article => ({
        slug: article.slug.split('/')
    }))
} 
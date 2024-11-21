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

type PageProps = {
    params: {
        slug: string[];
        lang: Locale;
    };
};

async function getArticleContent(slug: string[]) {
    const articlePath = path.join(process.cwd(), 'contents', ...slug) + '.mdx'

    try {
        const fileContent = fs.readFileSync(articlePath, 'utf-8')
        const { data, content } = matter(fileContent)
        return {
            frontmatter: data,
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

    return (
        <div className="container max-w-4xl py-6">
            <article className="prose dark:prose-invert max-w-none">
                <Typography>
                    <h1 className="text-3xl font-bold mb-4">{article.frontmatter.title}</h1>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
                        <span>{article.frontmatter.author}</span>
                        <span>·</span>
                        <span>{article.frontmatter.date}</span>
                        <span>·</span>
                        <span>{article.frontmatter.readTime}</span>
                    </div>
                    <MDXRemote source={article.content} />
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
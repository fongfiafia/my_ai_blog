import fs from 'fs'
import matter from 'gray-matter'
import { join } from 'path'
import { Locale } from './i18n-config'

interface ArticleData {
    slug: string
    content: string
    [key: string]: any
}

export async function getArticleBySlug(locale: Locale, slug: string): Promise<ArticleData> {
    const realSlug = slug.replace(/\.mdx$/, '')

    // 根据语言选择文件后缀
    const extension = locale === 'en' ? '.en.mdx' : '.mdx'

    // 修改路径构建方式，确保正确处理目录结构
    const fullPath = join(process.cwd(), 'contents', 'cursor', ...realSlug.split('/'), `index${extension}`)

    try {
        // 读取对应语言的文章内容
        const fileContents = fs.readFileSync(fullPath, 'utf8')

        // 解析 MDX 内容
        const { data, content } = matter(fileContents)

        return {
            slug: realSlug,
            content,
            ...data,
        }
    } catch (error) {
        console.error(`Error reading file at ${fullPath}:`, error)
        throw new Error(`Failed to load article: ${slug}`)
    }
} 
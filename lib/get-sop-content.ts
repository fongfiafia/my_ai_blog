import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { Locale } from './i18n-config'

export type SOPArticle = {
    slug: string
    title: string
    excerpt: string
    author: string
    date: string
    readTime: string
    views: string
    category: string
}

export type Category = {
    name: string
    slug: string
    count: number
}

// 获取所有分类
export function getCategories(): Category[] {
    const contentDir = path.join(process.cwd(), 'contents')
    const excludeDirs = ['cursor', 'blogs'] // 需要排除的目录

    return fs.readdirSync(contentDir)
        .filter(item => {
            // 排除 cursor 和 blogss 目录
            if (excludeDirs.includes(item)) return false

            const stat = fs.statSync(path.join(contentDir, item))
            return stat.isDirectory()
        })
        .map(dir => ({
            name: getCategoryName(dir),
            slug: dir,
            count: countArticlesInCategory(dir)
        }))
}

// 获取分类下的文章数量
function countArticlesInCategory(category: string): number {
    const categoryPath = path.join(process.cwd(), 'contents', category)
    let count = 0

    function countFiles(dir: string) {
        const items = fs.readdirSync(dir)
        items.forEach(item => {
            const fullPath = path.join(dir, item)
            const stat = fs.statSync(fullPath)
            if (stat.isDirectory()) {
                countFiles(fullPath)
            } else if (item.endsWith('.mdx')) {
                count++
            }
        })
    }

    countFiles(categoryPath)
    return count
}

// 获取分类名称映射
function getCategoryName(slug: string): string {
    const categoryMap: Record<string, string> = {
        'miniprogram': '小程序',
        'ui-design': 'UI设计',
        'frontend': '前端',
        'backend': '后端',
        'ai': '人工智能'
    }
    return categoryMap[slug] || slug
}

// 获取文章列表
export async function getSOPArticles(category?: string): Promise<SOPArticle[]> {
    const contentDir = path.join(process.cwd(), 'contents')
    const excludeDirs = ['cursor', 'blog']

    const articles: SOPArticle[] = []

    function readDirectory(dir: string) {
        const items = fs.readdirSync(dir)
        items.forEach(item => {
            const fullPath = path.join(dir, item)
            const stat = fs.statSync(fullPath)

            if (stat.isDirectory()) {
                const relativePath = path.relative(contentDir, fullPath)
                const topLevelDir = relativePath.split(path.sep)[0]
                if (!excludeDirs.includes(topLevelDir)) {
                    readDirectory(fullPath)
                }
            } else if (item.endsWith('.mdx')) {
                const fileContent = fs.readFileSync(fullPath, 'utf-8')
                const { data } = matter(fileContent)
                const relativePath = path.relative(contentDir, fullPath)
                const articleCategory = relativePath.split(path.sep)[0]

                // 只有当没有指定分类或文章属于指定分类时才添加
                if (!excludeDirs.includes(articleCategory) &&
                    (!category || articleCategory === category)) {
                    articles.push({
                        slug: relativePath.replace(/\.mdx$/, ''),
                        title: data.title,
                        excerpt: data.excerpt,
                        author: data.author || '未生AI',
                        date: data.date,
                        readTime: data.readTime || '5 min read',
                        views: data.views || '0',
                        category: articleCategory
                    })
                }
            }
        })
    }

    // 如果指定了分类，只读取该分类目录
    const targetDir = category
        ? path.join(contentDir, category)
        : contentDir

    readDirectory(targetDir)
    return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
} 
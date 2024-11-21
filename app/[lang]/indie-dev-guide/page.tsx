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

    // 延迟重定向，让页面内容先显示
    if (categories.length > 0) {
        const defaultCategory = categories.find(cat => cat.slug === 'miniprogram') || categories[0]
        redirect(`/indie-dev-guide/category/${defaultCategory.slug}`)
    }

    return null; // 不需要返回内容，因为会被重定向
} 
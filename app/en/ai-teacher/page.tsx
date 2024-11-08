import { Metadata } from 'next';
import CozeChat from '@/components/CozeChat';
import FAQAISection from '@/components/FAQAISection';

export const metadata: Metadata = {
    title: 'AI Cursor老师 - LookAI',
    description: 'AI Cursor老师为你解答各种问题，帮助你更好地学习使用Cursor',
};

export default function AITeacherPage() {
    return (
        <div className="container mx-auto px-4 py-8 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-center">最懂你的Cursor AI老师</h1>
            <p className="text-lg text-muted-foreground text-center mb-8">
                基于本博客教程 & 学习心得 & 大量QA & 网上收集的技巧搭建的GPTs
            </p>
            <CozeChat />
            <FAQAISection />
        </div>
    );
} 
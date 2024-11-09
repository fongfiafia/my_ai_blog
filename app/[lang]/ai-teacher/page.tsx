import { Metadata } from 'next';
import CozeChat from '@/components/CozeChat';
import FAQAISection from '@/components/FAQAISection';
import { getDictionary } from '@/lib/dictionary';
import { Locale } from '@/lib/i18n-config';

export const metadata: Metadata = {
    title: 'AI Cursor老师 - LookAI',
    description: 'AI Cursor老师为你解答各种问题，帮助你更好地学习使用Cursor',
};

export default async function AITeacherPage({ params: { lang } }: { params: { lang: Locale } }) {
    const dict = await getDictionary(lang);

    return (
        <div className="container mx-auto px-4 py-8 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-center">{dict.aiTeacher.title}</h1>
            <p className="text-lg text-muted-foreground text-center mb-8">
                {dict.aiTeacher.subtitle}
            </p>
            <CozeChat />
            <FAQAISection
                title={dict.faqAI.title}
                items={dict.faqAI.items}
            />
        </div>
    );
} 
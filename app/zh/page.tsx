import { buttonVariants } from "@/components/ui/button";
import { page_routes } from "@/lib/routes-config";
import { MoveUpRightIcon, TerminalSquareIcon } from "lucide-react";
import Link from "next/link";
import { Metadata } from 'next';
import FAQSection from '@/components/FAQSection';
import AIResourcesSection from '@/components/AIResourcesSection';
import AIVideosSection from '@/components/AIVideosSection';
import FunProjectsSection from '@/components/FunProjectsSection';
import getDictionary from '@/lib/get-dictionary'

export async function generateMetadata({ params: { lang } }: { params: { lang: string } }): Promise<Metadata> {
    const dict = await getDictionary(lang)

    return {
        title: lang === 'zh' ?
            'LookAI - 最适合零编程基础普通人的Cursor AI编程教程 | 小白免费学习资源' :
            'LookAI - Cursor AI Programming Tutorial for Beginners | Free Learning Resources',
        description: lang === 'zh' ?
            '提供最全面、最专业的Cursor AI编程教程。适合小白、零编程基础的免费学习资源，助您掌握AI编程技能。' :
            'Comprehensive Cursor AI programming tutorials. Free resources for beginners to master AI programming skills.',
        // ... 其他metadata
    }
}

export default async function Home({ params: { lang } }: { params: { lang: string } }) {
    const dict = await getDictionary(lang)

    return (
        <div className="flex flex-col items-center justify-center text-center px-2 py-8">
            <h1 className="text-3xl font-bold mb-4 sm:text-6xl">
                {dict.home.title}
            </h1>
            <p className="mb-8 sm:text-xl max-w-[800px] text-muted-foreground leading-relaxed">
                {dict.home.description}
            </p>
            <div className="flex flex-row items-center gap-5">
                <Link
                    href={`/${lang}/cursor${page_routes[0].href}`}
                    className={buttonVariants({ className: "px-6 py-3 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white font-bold rounded-lg shadow-lg transform transition-transform hover:scale-105", size: "lg" })}
                >
                    {dict.home.startJourney}
                </Link>
            </div>

            <FAQSection lang={lang} />
            <AIVideosSection lang={lang} />
            <FunProjectsSection lang={lang} />
            <AIResourcesSection lang={lang} />
        </div>
    );
} 
import React from 'react';
import { buttonVariants } from "@/components/ui/button";
import { page_routes } from "@/lib/routes-config";
import Link from "next/link";
import { Metadata } from 'next';
import FAQSection from '@/components/FAQSection';
import FAQAISection from '@/components/FAQAISection';
import AIResourcesSection from '@/components/AIResourcesSection';
import AIVideosSection from '@/components/AIVideosSection';
import AITeachVideosSection from '@/components/AITeachVideosSection';
import FunProjectsSection from '@/components/FunProjectsSection';
import { getDictionary } from '@/lib/dictionary'
import { i18n, Locale } from '@/lib/i18n-config'
import Footer from '@/components/Footer'

export async function generateMetadata({ params: { lang } }: { params: { lang: Locale } }): Promise<Metadata> {
    const dict = await getDictionary(lang)

    return {
        title: dict.metadata.title,
        description: dict.metadata.description,
        keywords: dict.metadata.keywords,
        openGraph: {
            title: dict.metadata.ogTitle,
            description: dict.metadata.ogDescription,
            url: 'https://www.lookai.top',
            siteName: 'LookAI',
            locale: lang,
            type: 'website',
        },
    }
}

export default async function HomePage({ params: { lang } }: { params: { lang: Locale } }) {
    const dict = await getDictionary(lang)

    return (
        <>
            <div className="flex flex-col items-center justify-center text-center px-2 py-8">
                <h1 className="text-3xl font-bold mb-4 sm:text-6xl">
                    {dict.home.title}
                </h1>
                <p className="mb-8 sm:text-xl max-w-[800px] text-muted-foreground leading-relaxed">
                    {dict.home.subtitle.split('\n').map((line, i) => (
                        <React.Fragment key={i}>
                            {line}<br />
                        </React.Fragment>
                    ))}
                </p>
                <div className="flex flex-row items-center gap-5">
                    <Link
                        href={`/${lang}/cursor${page_routes[0].href}`}
                        className={buttonVariants({ className: "px-6 py-3 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white font-bold rounded-lg shadow-lg transform transition-transform hover:scale-105", size: "lg" })}
                    >
                        {dict.home.startReading}
                    </Link>

                    <Link
                        href={`/${lang}/ai-teacher`}
                        className={buttonVariants({ className: "px-6 py-3 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 text-white font-bold rounded-lg shadow-lg transform transition-transform hover:scale-105", size: "lg" })}
                        title={dict.home.tryAITeacherTitle}
                    >
                        {dict.home.tryAITeacher.split('\n').map((line, i) => (
                            <React.Fragment key={i}>
                                {line}<br />
                            </React.Fragment>
                        ))}
                    </Link>
                </div>

                <FAQSection
                    title={dict.faq.title}
                    items={dict.faq.items}
                />
                <FAQAISection
                    title={dict.faqAI.title}
                    items={dict.faqAI.items}
                />
                <AITeachVideosSection locale={lang} />
                <AIVideosSection locale={lang} />
                <FunProjectsSection locale={lang} />
                <AIResourcesSection locale={lang} />
            </div>
            <Footer locale={lang} dict={dict} />
        </>
    )
}

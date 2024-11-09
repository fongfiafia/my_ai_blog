'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { getDictionary } from '@/lib/dictionary';
import { i18n } from '@/lib/i18n-config';
import type { Locale } from '@/lib/i18n-config';

const FAQAISection = async () => {
    const pathname = usePathname();
    const locale = (pathname.split('/')[1] || i18n.defaultLocale) as Locale;
    const dict = await getDictionary(locale);

    return (
        <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4 text-center">{dict.faqAI.title}</h2>
            <div className="space-y-4">
                {dict.faqAI.items.map((faq, index) => (
                    <div key={index} className="p-4 border rounded-lg shadow-sm">
                        <h3 className="text-xl font-semibold text-left">{faq.question}</h3>
                        <p className="text-muted-foreground mt-2 text-left">{faq.answer}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQAISection;

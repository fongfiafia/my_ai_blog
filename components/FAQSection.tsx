'use client';

import React, { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { getDictionary } from '@/lib/dictionary';
import { i18n } from '@/lib/i18n-config';

interface FAQItemProps {
    question: string;
    answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-gray-200 dark:border-gray-700 py-4">
            <button
                className="flex justify-between items-center w-full text-left"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="text-lg font-semibold text-left">{question}</span>
                {isOpen ? (
                    <ChevronUpIcon className="w-5 h-5" />
                ) : (
                    <ChevronDownIcon className="w-5 h-5" />
                )}
            </button>
            {isOpen && (
                <p className="mt-2 text-gray-600 dark:text-gray-300 text-left">{answer}</p>
            )}
        </div>
    );
};

export default async function FAQSection() {
    const pathname = usePathname();
    const locale = pathname.split('/')[1] || i18n.defaultLocale;
    const dict = await getDictionary(locale);

    return (
        <section className="w-full max-w-[800px] mx-auto mt-16 px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">{dict.faq.title}</h2>
            <div className="space-y-4">
                {dict.faq.items.map((faq, index) => (
                    <FAQItem
                        key={index}
                        question={faq.question}
                        answer={faq.answer}
                    />
                ))}
            </div>
        </section>
    );
}

'use client';

import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import { useState } from 'react';

interface FAQItem {
    question: string;
    answer: string;
}

interface FAQSectionClientProps {
    items: FAQItem[];
    title: string;
}

const FAQItemComponent = ({ question, answer }: FAQItem) => {
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

export default function FAQSectionClient({ items, title }: FAQSectionClientProps) {
    return (
        <section className="w-full max-w-[800px] mx-auto mt-16 px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">{title}</h2>
            <div className="space-y-4">
                {items.map((faq, index) => (
                    <FAQItemComponent
                        key={index}
                        question={faq.question}
                        answer={faq.answer}
                    />
                ))}
            </div>
        </section>
    );
} 
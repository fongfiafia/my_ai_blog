import React from 'react';
import FAQItemClient from './FAQItemClient';

interface FAQItem {
    question: string;
    answer: string;
}

interface FAQSectionProps {
    title: string;
    items: FAQItem[];
}

export default function FAQSection({ title, items }: FAQSectionProps) {
    return (
        <section className="w-full max-w-[800px] mx-auto mt-16 px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">{title}</h2>
            <div className="space-y-4">
                {items.map((faq, index) => (
                    <FAQItemClient
                        key={index}
                        question={faq.question}
                        answer={faq.answer}
                    />
                ))}
            </div>
        </section>
    );
}

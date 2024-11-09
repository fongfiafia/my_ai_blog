import React from 'react';
import FAQAIItemClient from './FAQAIItemClient';

interface FAQItem {
    question: string;
    answer: string;
}

interface FAQAISectionProps {
    title: string;
    items: FAQItem[];
}

export default function FAQAISection({ title, items }: FAQAISectionProps) {
    return (
        <section className="w-full max-w-[800px] mx-auto mt-16 px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">{title}</h2>
            <div className="space-y-4">
                {items.map((faq, index) => (
                    <FAQAIItemClient
                        key={index}
                        question={faq.question}
                        answer={faq.answer}
                    />
                ))}
            </div>
        </section>
    );
}

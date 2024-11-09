'use client';

import React, { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';

interface FAQItem {
    question: string;
    answer: string;
}

const FAQItemClient = ({ question, answer }: FAQItem) => {
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

export default FAQItemClient; 
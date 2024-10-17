'use client';

import React, { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react'; // 确保已安装lucide-react

const faqData = [
    {
        question: "Cursor是什么?",
        answer: "Cursor是一款基于AI的代码编辑器,它能够帮助0基础、无经验的小白、普通人快速地、智能地编写代码。"
    },
    {
        question: "Cursor适合初学者使用吗?",
        answer: "是的,Cursor非常适合初学者。它提供智能代码补全和解释功能,可以帮助0编程基础的小白更快地学习编程。本教程面向的就是0基础的小白,文字搭配视频教会您Cursor使用方法,让您快速上手,使用Cursor完成您的想法。"
    },
    {
        question: "如何安装Cursor?",
        answer: "您可以从Cursor官网下载安装程序,然后按照指示完成安装过程。具体步骤可以参考我们的安装教程。"
    },
    {
        question: "Cursor支持哪些编程语言?",
        answer: "Cursor支持多种主流编程语言,包括但不限于Python, JavaScript, TypeScript, Java, C++等。"
    },
    {
        question: "Cursor是免费的吗?",
        answer: "Cursor提供免费版和付费版。注册后提供2周的会员体验,两周后免费版其实足以满足大多数用户的需求,本教程也会教你如何白嫖Cursor会员。"
    }
];

interface FAQItemProps {
    question: string;
    answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-gray-200 py-4">
            <button
                className="flex justify-between items-center w-full text-left"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="text-lg font-semibold">{question}</span>
                {isOpen ? (
                    <ChevronUpIcon className="w-5 h-5" />
                ) : (
                    <ChevronDownIcon className="w-5 h-5" />
                )}
            </button>
            {isOpen && (
                <p className="mt-2 text-gray-600 text-left">{answer}</p>
            )}
        </div>
    );
};

const FAQSection = () => {
    return (
        <section className="w-full max-w-4xl mx-auto mt-16">
            <h2 className="text-3xl font-bold mb-8">Frequent Asked Question About Cursor</h2>
            <h4 className="text-2xl font-bold mb-2">关于Cursor最常见问题</h4>
            <div className="space-y-2">
                {faqData.map((item, index) => (
                    <FAQItem key={index} question={item.question} answer={item.answer} />
                ))}
            </div>
        </section>
    );
};

export default FAQSection;

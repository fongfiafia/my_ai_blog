
'use client';

import React from 'react';

const FAQAISection = () => {
    const faqs = [
        {
            question: "如何使用Cursor AI老师？",
            answer: "Cursor AI老师基于知识库提供精准的回答。您可以通过点击页面上的按钮来与AI老师互动。",
        },
        {
            question: "AI基于什么来回答我的问题？",
            answer: "AI基于本博客教程内容、作者（@油管未生AI）个人心得、付费社群中最常被提问的以及收集到的网上的技巧构建。",
        },
        {
            question: "如何确保回答的准确性？",
            answer: "AI通过过滤无用信息并基于知识库提供回答，确保信息的准确性和有效性。",
        },
        {
            question: "知识库会更新吗？",
            answer: "会一直更新，不断更新最新的知识和内容",
        },
        {
            question: "免费吗？",
            answer: "免费的，而且目前没有计划收费，请尽情体验。当然如果你觉得对你有帮助，支持作者就更好了。",
        },
    ];

    return (
        <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4 text-center">关于AI老师最常见问题</h2>
            <div className="space-y-4">
                {faqs.map((faq, index) => (
                    <div key={index} className="p-4 border rounded-lg shadow-sm">
                        <h3 className="text-xl font-semibold">{faq.question}</h3>
                        <p className="text-muted-foreground mt-2">{faq.answer}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQAISection;

import { Metadata } from 'next';
import CozeChat from '@/components/CozeChat';

export const metadata: Metadata = {
    title: 'AI Cursor老师 - LookAI',
    description: 'AI Cursor老师为你解答各种问题，帮助你更好地学习使用Cursor',
};

export default function AITeacher() {
    return (
        <div className="container mx-auto px-4 py-8 min-h-screen">
            {/* <h1 className="text-3xl font-bold mb-6 text-center">AI Cursor老师</h1> */}
            <p className="text-lg text-muted-foreground text-center mb-8">
                {/* 有任何关于 Cursor 的问题，都可以问我哦！ */}
            </p>
            <CozeChat />
        </div>
    );
} 
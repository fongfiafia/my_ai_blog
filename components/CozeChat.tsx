'use client'

import { useEffect, useState } from 'react';

declare global {
    interface Window {
        CozeWebSDK: {
            WebChatClient: new (config: {
                config: {
                    bot_id: string;
                };
                componentProps: {
                    title: string;
                };
                ui: {
                    asstBtn: {
                        isNeed?: boolean;
                    }
                    // base: {
                    //     layout: string;
                    //     zIndex: number;
                    // }
                }
            }) => void;
        };
    }
}

const CozeChat = () => {
    const [chatElement, setChatElement] = useState<HTMLDivElement | null>(null);

    useEffect(() => {
        // 加载 SDK 脚本
        const script = document.createElement('script');
        script.src = 'https://lf-cdn.coze.cn/obj/unpkg/flow-platform/chat-app-sdk/1.0.0-beta.4/libs/cn/index.js';
        script.async = true;

        script.onload = () => {
            // SDK 加载完成后初始化
            var sdk = new window.CozeWebSDK.WebChatClient({
                config: {
                    bot_id: '7434442467988193306',
                },
                componentProps: {
                    title: 'AI Cursor 老师',
                },
                ui: {
                    asstBtn: {
                        isNeed: false,
                    },
                    // base: {
                    // layout: "pc",
                    // zIndex: 1000,
                    // }
                }
            });

            sdk.showChatBot();

            // 等待聊天窗口 DOM 元素渲染完成
            const interval = setInterval(() => {
                const chatWindowElement = document.querySelector('.fa8097ff55eabaa5782b');
                if (chatWindowElement) {
                    setChatElement(chatWindowElement as HTMLDivElement);
                    clearInterval(interval);
                }
            }, 100);
        };

        document.body.appendChild(script);

        // 清理函数
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    useEffect(() => {
        if (chatElement) {
            // 设置聊天窗口居中
            chatElement.style.position = 'fixed';
            chatElement.style.top = '50%';
            chatElement.style.left = '50%';
            chatElement.style.transform = 'translate(-50%, -50%)';
            chatElement.style.width = '80%';
            chatElement.style.height = '80%';
        }
    }, [chatElement]);

    return null;
};

export default CozeChat;
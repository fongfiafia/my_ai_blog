'use client'

import { useEffect } from 'react';

declare global {
    interface Window {
        CozeWebSDK: {
            WebChatClient: new (config: {
                config: {
                    bot_id: string;
                    isShow?: boolean;
                };
                componentProps: {
                    title: string;
                };
                userInfo: {
                    asstBtn: {
                        isNeed: boolean;
                    }
                }
            }) => void;
        };
    }
}

export default function CozeChat() {
    useEffect(() => {
        // 加载 SDK 脚本
        const script = document.createElement('script');
        script.src = 'https://lf-cdn.coze.cn/obj/unpkg/flow-platform/chat-app-sdk/1.0.0-beta.4/libs/cn/index.js';
        script.async = true;

        script.onload = () => {
            // SDK 加载完成后初始化
            new window.CozeWebSDK.WebChatClient({
                config: {
                    bot_id: '7434442467988193306',
                    isShow: true,
                },
                componentProps: {
                    title: 'AI Cursor 老师',
                },
                userInfo: {
                    asstBtn: {
                        isNeed: false,
                    }
                }
            });
        };

        document.body.appendChild(script);

        // 清理函数
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return null;
} 
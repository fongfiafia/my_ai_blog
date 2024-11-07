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
                    base: {
                        icon: string;
                        layout: string;
                        zIndex: number;
                    },
                    footer: {
                        isShow?: boolean;
                        expressionText: string,
                        linkvars: {
                            name: {
                                text: string;
                                link: string;
                            }
                        }
                    }
                }
            }) => any;
        };
    }
}

const CozeChat = () => {
    const [sdk, setSdk] = useState<any>(null);

    useEffect(() => {
        // 加载 SDK 脚本
        const script = document.createElement('script');
        script.src = 'https://lf-cdn.coze.cn/obj/unpkg/flow-platform/chat-app-sdk/1.0.0-beta.4/libs/cn/index.js';
        script.async = true;

        script.onload = () => {
            // SDK 加载完成后初始化
            const sdkInstance = new window.CozeWebSDK.WebChatClient({
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
                    base: {
                        icon: "https://www.lookai.top/logo.png",
                        layout: "pc",
                        zIndex: 1000,
                    },
                    footer: {
                        isShow: true,
                        expressionText: 'Powered by {{name}}',
                        linkvars: {
                            name: {
                                text: '未生AI',
                                link: 'https://www.youtube.com/@fiafiafong',
                            }
                        }
                    }
                }
            });

            setSdk(sdkInstance);

            // 等待聊天窗口 DOM 元素渲染完成
            const interval = setInterval(() => {
                const chatWindowElement = document.querySelector('.fa8097ff55eabaa5782b');
                if (chatWindowElement) {
                    // 设置聊天窗口居中
                    chatWindowElement.style.position = 'fixed';
                    chatWindowElement.style.top = '50%';
                    chatWindowElement.style.left = '50%';
                    chatWindowElement.style.transform = 'translate(-50%, -50%)';
                    chatWindowElement.style.width = '75%';
                    chatWindowElement.style.height = '80%';
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

    const handleButtonClick = () => {
        if (sdk) {
            sdk.showChatBot();
        }
    };

    return (
        <div className="flex justify-center mt-4">
            <button
                onClick={handleButtonClick}
                className="px-6 py-3 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white font-bold rounded-lg shadow-lg transform transition-transform hover:scale-105"
            >
                开始旅程
            </button>
        </div>
    );
};

export default CozeChat;

// https://www.coze.cn/docs/developer_guides/install_web_sdk#6e3ae74c
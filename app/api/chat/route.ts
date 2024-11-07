import { NextResponse } from 'next/server';

const COZE_API_URL = 'https://www.coze.cn/api/chat/v3';

export async function POST(req: Request) {
    try {
        const { message } = await req.json();

        console.log('收到用户消息:', message);

        if (!process.env.COZE_API_KEY) {
            console.error('COZE_API_KEY 未设置');
            throw new Error('缺少 API 密钥配置');
        }

        console.log('准备调用 Coze API...');
        const cozeResponse = await fetch(COZE_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': process.env.COZE_API_KEY, // Coze API 使用 Cookie 进行认证
            },
            body: JSON.stringify({
                query: message,  // 用户输入的问题
                stream: true,    // 启用流式响应
                conversation_id: "", // 可选，用于继续之前的对话
            }),
        });

        console.log('Coze API 响应状态:', cozeResponse.status);

        if (!cozeResponse.ok) {
            const errorText = await cozeResponse.text();
            console.error('Coze API 错误响应:', errorText);
            throw new Error(`Coze API 请求失败: ${cozeResponse.status}\n${errorText}`);
        }

        // 创建流式响应
        const stream = new TransformStream();
        const writer = stream.writable.getWriter();
        const encoder = new TextEncoder();

        // 处理 Coze API 的流式响应
        const reader = cozeResponse.body?.getReader();
        if (reader) {
            (async () => {
                try {
                    while (true) {
                        const { done, value } = await reader.read();
                        if (done) break;

                        const chunk = new TextDecoder().decode(value);
                        console.log('收到 Coze 响应块:', chunk);

                        try {
                            const jsonData = JSON.parse(chunk);
                            if (jsonData.text) {
                                await writer.write(encoder.encode(jsonData.text));
                            }
                        } catch (e) {
                            console.error('解析响应JSON失败:', e);
                        }
                    }
                } catch (error) {
                    console.error('处理响应流时出错:', error);
                } finally {
                    await writer.close();
                }
            })();
        }

        return new Response(stream.readable, {
            headers: {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
            },
        });

    } catch (error) {
        console.error('API 错误:', error);
        return NextResponse.json({
            error: '服务器内部错误',
            details: error instanceof Error ? error.message : '未知错误'
        }, { status: 500 });
    }
} 
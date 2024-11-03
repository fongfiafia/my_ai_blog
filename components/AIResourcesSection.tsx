import { AIResourceCard } from './AIResourceCard';

const AI_RESOURCES = [
    {
        name: "AI With Me",
        description: "一个AI工具集合",
        icon: "/ai-resources/ai-with-me.png",
        url: "https://aiwith.me/",
        tags: ["AI对话", "免费版"]
    },
    {
        name: "Claude",
        description: "Anthropic出品的AI助手，Cursor的默认使用的AI模型",
        icon: "/ai-resources/claude.png",
        url: "https://claude.ai",
        tags: ["AI助手", "免费"]
    },
    {
        name: "Free AI Tool",
        description: "免费AI工具集合",
        icon: "/ai-resources/apple-touch-icon.png",
        url: "https://freeaitool.ai/",
        tags: ["AI工具箱", "免费"]
    }
];

export default function AIResourcesSection() {
    return (
        <section className="w-full max-w-[1200px] mx-auto mt-16 px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">AI资源集</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {AI_RESOURCES.map((resource) => (
                    <AIResourceCard key={resource.name} resource={resource} />
                ))}
            </div>
        </section>
    );
} 
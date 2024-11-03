import { ProjectCard } from './ProjectCard';

const PROJECTS = [
    {
        title: "AI微信小程序",
        description: "使用 Cursor AI 开发的微信小程序，让AI赋能生活的方方面面",
        url: "https://lookai.top/fun/wx-miniprogram",
        tags: ["微信小程序", "AI应用"]
    },
    {
        title: "徒手画圆",
        description: "一个有趣的小游戏，测试你徒手画圆的能力",
        url: "https://lookai.top/fun/perfect-circle",
        tags: ["Web游戏", "互动体验"]
    }
];

export default function FunProjectsSection() {
    return (
        <section className="w-full max-w-[800px] mx-auto mt-16 px-4">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">我做的好玩的</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    使用 Cursor AI 开发的一些有趣项目
                </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {PROJECTS.map((project) => (
                    <ProjectCard key={project.title} project={project} />
                ))}
            </div>
        </section>
    );
} 
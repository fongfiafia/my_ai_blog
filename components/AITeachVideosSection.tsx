import { VideoCard } from './VideoCard';

const AI_VIDEOS = [
    {
        title: "Cursor 界面介绍",
        description: "Cursor 界面介绍，各个面板的介绍",
        youtubeUrl: "Dtxq314fuG4",
        duration: "15:24"
    },
    {
        title: "创建你的第一个Cursor 项目",
        description: "Cursor 的项目管理",
        youtubeUrl: "BgoaPO41o9g",
        duration: "12:38"
    },
    {
        title: "Cursor的AI辅助功能演示",
        description: "Cursor的AI辅助功能演示",
        youtubeUrl: "TgXDEnF43M0",
        duration: "18:45"
    }
];

export default function AITeachVideosSection() {
    return (
        <section className="w-full max-w-[1200px] mx-auto mt-16 px-4">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Cursor教学视频</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {AI_VIDEOS.map((video) => (
                    <VideoCard key={video.title} video={video} />
                ))}
            </div>
        </section>
    );
} 
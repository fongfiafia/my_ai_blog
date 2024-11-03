import { VideoCard } from './VideoCard';

const AI_VIDEOS = [
    {
        title: "使用Cursor 8分钟开发上线微信小程序",
        description: "从零开始，使用Cursor 开发完成一个AI微信小程序，完成上线和部署",
        youtubeUrl: "87jXLqMIeDE",
        duration: "15:24"
    },
    {
        title: "bolt.new VS Cursor",
        description: "bolt.new 7分钟上线部署一个记账网页！cursor VS bolt.new 全面对比",
        youtubeUrl: "t_fkKhW4PDI",
        duration: "12:38"
    },
    {
        title: "使用Cursor开发小程序2周开通流量主",
        description: "使用Cursor 帮助放置广告位到合适为止",
        youtubeUrl: "dNS9jJzygtw",
        duration: "18:45"
    }
];

export default function AIVideosSection() {
    return (
        <section className="w-full max-w-[1200px] mx-auto mt-16 px-4">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Cursor项目实战</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    我使用Cursor AI提升开发的项目教程
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {AI_VIDEOS.map((video) => (
                    <VideoCard key={video.title} video={video} />
                ))}
            </div>
        </section>
    );
} 
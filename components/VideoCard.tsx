import { PlayCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface Video {
    title: string;
    description: string;
    youtubeUrl: string;
    duration: string;
}

interface VideoCardProps {
    video: Video;
}

function getYouTubeVideoId(url: string): string {
    // 处理多种可能的YouTube URL格式
    const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube.com\/embed\/)([a-zA-Z0-9_-]+)(?:\?|$)/,
        /^([a-zA-Z0-9_-]+)$/  // 直接是视频ID的情况
    ];

    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match) return match[1];
    }
    return '';
}

function getYouTubeThumbnail(videoId: string): string {
    // 使用 hqdefault.jpg，这个几乎所有视频都会有
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

export const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
    const videoId = getYouTubeVideoId(video.youtubeUrl);
    const thumbnailUrl = getYouTubeThumbnail(videoId);
    const youtubeWatchUrl = `https://www.youtube.com/watch?v=${videoId}`;

    return (
        <Link
            href={youtubeWatchUrl}
            target="_blank"
            className="group block bg-card rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 border"
        >
            <div className="relative aspect-video bg-muted">
                <Image
                    src={thumbnailUrl}
                    alt={video.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                    unoptimized // 添加这个属性以避免 Next.js 的图片优化
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <PlayCircle className="w-16 h-16 text-white" />
                </div>
                <span className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 text-sm rounded">
                    {video.duration}
                </span>
            </div>
            <div className="p-4">
                <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {video.title}
                </h3>
                <p className="text-muted-foreground text-sm line-clamp-2">
                    {video.description}
                </p>
            </div>
        </Link>
    );
}; 
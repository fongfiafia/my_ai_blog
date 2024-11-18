'use client';

import { VideoCard } from './VideoCard';
import { useEffect, useState } from 'react';

interface Video {
    title: string;
    description: string;
    youtubeUrl: string;
    duration: string;
}

interface VideoSectionClientProps {
    videos: Video[];
    title: string;
    subtitle?: string;
}

export default function VideoSectionClient({ videos, title, subtitle }: VideoSectionClientProps) {
    return (
        <section className="w-full max-w-[1200px] mx-auto mt-16 px-4">
            {/* <div className="text-center mb-12"> */}
            {/* <h2 className="text-3xl font-bold mb-4">{title}</h2> */}
            {/* {subtitle && (
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        {subtitle}
                    </p>
                )} */}
            {/* </div> */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map((video) => (
                    <VideoCard key={video.title} video={video} />
                ))}
            </div>
        </section>
    );
} 
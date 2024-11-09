'use client';

import { VideoCard } from './VideoCard';
import { usePathname } from 'next/navigation';
import { getDictionary } from '@/lib/dictionary';
import { i18n } from '@/lib/i18n-config';
import type { Locale } from '@/lib/i18n-config';

export default async function AIVideosSection() {
    const pathname = usePathname();
    const locale = (pathname.split('/')[1] || i18n.defaultLocale) as Locale;
    const dict = await getDictionary(locale);

    return (
        <section className="w-full max-w-[1200px] mx-auto mt-16 px-4">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">{dict.aiVideos.title}</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    {dict.aiVideos.subtitle}
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {dict.aiVideos.videos.map((video) => (
                    <VideoCard key={video.title} video={video} />
                ))}
            </div>
        </section>
    );
} 
import { getDictionary } from '@/lib/dictionary';
import VideoSectionClient from './VideoSectionClient';
import { Locale } from '@/lib/i18n-config';

export default async function AIVideosSection({ locale }: { locale: Locale }) {
    const dict = await getDictionary(locale);

    return (
        <VideoSectionClient
            videos={dict.aiVideos.videos}
            title={dict.aiVideos.title}
            subtitle={dict.aiVideos.subtitle}
        />
    );
} 
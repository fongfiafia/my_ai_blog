import { getDictionary } from '@/lib/dictionary';
import VideoSectionClient from './VideoSectionClient';
import { Locale } from '@/lib/i18n-config';

export default async function AITeachVideosSection({ locale }: { locale: Locale }) {
    const dict = await getDictionary(locale);

    return (
        <VideoSectionClient
            videos={dict.aiTeachVideos.videos}
            title={dict.aiTeachVideos.title}
        />
    );
} 
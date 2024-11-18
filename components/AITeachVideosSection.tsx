import { getDictionary } from '@/lib/dictionary';
import VideoSectionClient from './VideoSectionClient';
import { Locale } from '@/lib/i18n-config';
import SectionTitle from './SectionTitle';

export default async function AITeachVideosSection({ locale }: { locale: Locale }) {
    const dict = await getDictionary(locale);

    return (
        <div className="w-full max-w-4xl mx-auto my-12">
            <SectionTitle
                title={dict.aiTeachVideos.title}
                viewMoreText={dict.home.viewMoreVideos}
                viewMoreLink="https://www.youtube.com/@fiafiafong"
            />
            <VideoSectionClient
                videos={dict.aiTeachVideos.videos}
                title={dict.aiTeachVideos.title}
            />
        </div>
    );
} 
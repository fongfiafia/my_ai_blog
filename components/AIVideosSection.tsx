import { getDictionary } from '@/lib/dictionary';
import VideoSectionClient from './VideoSectionClient';
import { Locale } from '@/lib/i18n-config';
import SectionTitle from './SectionTitle';

export default async function AIVideosSection({ locale }: { locale: Locale }) {
    const dict = await getDictionary(locale);

    return (
        <div className="w-full max-w-4xl mx-auto my-12">
            <SectionTitle
                title={dict.aiVideos.title}
                viewMoreText={dict.home.viewMoreVideos}
                viewMoreLink="https://www.youtube.com/@fiafiafong"
            />
            {/* <p className="text-lg text-muted-foreground mb-8">{dict.aiVideos.subtitle}</p> */}
            <VideoSectionClient
                videos={dict.aiVideos.videos}
                title={dict.aiVideos.title}
                subtitle={dict.aiVideos.subtitle}
            />
        </div>
    );
} 
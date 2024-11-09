// 'use client';

import { getDictionary } from '@/lib/dictionary';
import { Locale } from '@/lib/i18n-config';
import { AIResourceCard } from './AIResourceCard';

export default async function AIResourcesSection({ locale }: { locale: Locale }) {
    const dict = await getDictionary(locale);

    return (
        <section className="w-full max-w-[1200px] mx-auto mt-16 px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">{dict.aiResources.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {dict.aiResources.resources.map((resource) => (
                    <AIResourceCard key={resource.name} resource={resource} />
                ))}
            </div>
        </section>
    );
} 
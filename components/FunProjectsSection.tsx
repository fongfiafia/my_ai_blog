'use client';

import { ProjectCard } from './ProjectCard';
import { usePathname } from 'next/navigation';
import { getDictionary } from '@/lib/dictionary';
import { i18n } from '@/lib/i18n-config';
import type { Locale } from '@/lib/i18n-config';

export default async function FunProjectsSection() {
    const pathname = usePathname();
    const locale = (pathname.split('/')[1] || i18n.defaultLocale) as Locale;
    const dict = await getDictionary(locale);

    return (
        <section className="w-full max-w-[800px] mx-auto mt-16 px-4">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">{dict.funProjects.title}</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    {dict.funProjects.subtitle}
                </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {dict.funProjects.projects.map((project) => (
                    <ProjectCard key={project.title} project={project} />
                ))}
            </div>
        </section>
    );
} 
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

interface Project {
    title: string;
    description: string;
    url: string;
    tags: string[];
}

export function ProjectCard({ project }: { project: Project }) {
    return (
        <Link
            href={project.url}
            className="group block bg-card rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 border p-6"
        >
            <div className="flex justify-between items-start mb-4">
                <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                    {project.title}
                </h3>
                <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            <p className="text-muted-foreground text-sm mb-4 text-left">
                {project.description}
            </p>
            <div className="flex gap-2">
                {project.tags.map((tag) => (
                    <span
                        key={tag}
                        className="px-2 py-1 text-xs rounded-full bg-secondary text-secondary-foreground"
                    >
                        {tag}
                    </span>
                ))}
            </div>
        </Link>
    );
} 
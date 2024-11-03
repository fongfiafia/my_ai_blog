import { ExternalLinkIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface AIResource {
    name: string;
    description: string;
    icon: string;
    url: string;
    tags: string[];
}

export function AIResourceCard({ resource }: { resource: AIResource }) {
    return (
        <Link
            href={resource.url}
            target="_blank"
            title={`${resource.name}: Discover thousands of AI Tools`}
            className="block relative group bg-card rounded-lg p-6 hover:shadow-lg transition-all duration-300 border"
        >
            <div className="flex items-center gap-4 mb-3">
                <div className="relative w-12 h-12">
                    <Image
                        src={resource.icon}
                        alt={resource.name}
                        fill
                        className="rounded-lg object-cover"
                    />
                </div>
                <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">{resource.name}</h3>
            </div>
            <p className="text-muted-foreground mb-4 text-left">{resource.description}</p>
            <div className="flex justify-between items-center">
                <div className="flex gap-2">
                    {resource.tags.map((tag) => (
                        <span
                            key={tag}
                            className="px-2 py-1 text-xs rounded-full bg-secondary text-secondary-foreground"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
                <span className="p-2 rounded-full hover:bg-secondary transition-colors">
                    <ExternalLinkIcon className="w-5 h-5" />
                </span>
            </div>
        </Link>
    );
} 
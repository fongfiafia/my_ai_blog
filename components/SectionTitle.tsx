import Link from "next/link";

interface SectionTitleProps {
    title: string;
    viewMoreText?: string;
    viewMoreLink?: string;
}

export default function SectionTitle({ title, viewMoreText, viewMoreLink }: SectionTitleProps) {
    return (
        <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">{title}</h2>
            {viewMoreLink && viewMoreText && (
                <Link
                    href={viewMoreLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 border border-gray-200 rounded-md hover:border-gray-300 transition-all hover:shadow-sm"
                >
                    {viewMoreText} →
                </Link>
            )}
        </div>
    );
} 
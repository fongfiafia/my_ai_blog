import Link from "next/link";
import { Locale } from "@/lib/i18n-config";
import { getAllRoutes } from "@/lib/routes-config";

interface RecommendedArticle {
    title: string;
    href: string;
    description?: string;
}

interface RecommendedReadingSectionProps {
    title: string;
    locale: Locale;
    dict: any;
}

export default function RecommendedReadingSection({ title, locale, dict }: RecommendedReadingSectionProps) {
    const allRoutes = getAllRoutes(locale);

    const recommendedArticles = [
        {
            title: allRoutes.find(route => route.href === '/basic/what_is_cursor')?.title || '',
            href: '/basic/what_is_cursor',
            description: dict.home.recommendedArticles.whatIsCursor
        },
        {
            title: allRoutes.find(route => route.href === '/basic/cursor_download')?.title || '',
            href: '/basic/cursor_download',
            description: dict.home.recommendedArticles.cursorDownload
        },
        {
            title: allRoutes.find(route => route.href === '/tips/cursor_free')?.title || '',
            href: '/tips/cursor_free',
            description: dict.home.recommendedArticles.cursorFree
        },
        {
            title: allRoutes.find(route => route.href === '/tips/cursor_git')?.title || '',
            href: '/tips/cursor_git',
            description: dict.home.recommendedArticles.cursorGit
        },
        {
            title: allRoutes.find(route => route.href === '/basic/cursor_interface')?.title || '',
            href: '/basic/cursor_interface',
            description: dict.home.recommendedArticles.cursorInterface
        },
        {
            title: allRoutes.find(route => route.href === '/advance/cursor_chat')?.title || '',
            href: '/advance/cursor_chat',
            description: dict.home.recommendedArticles.cursorChat
        }
    ];

    return (
        <div className="w-full max-w-4xl mx-auto my-12">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold">{title}</h2>
                <Link
                    href={`/${locale}/cursor/instruction/instruction`}
                    className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 border border-gray-200 rounded-md hover:border-gray-300 transition-all hover:shadow-sm"
                >
                    {dict.home.viewMore} →
                </Link>
            </div>
            <div className="flex flex-col space-y-4">
                {recommendedArticles.map((article) => (
                    <Link
                        key={article.href}
                        href={`/${locale}/cursor${article.href}`}
                        className="p-6 rounded-lg border border-gray-200 hover:border-gray-300 transition-all hover:shadow-md text-left relative group"
                    >
                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                            <svg
                                className="w-5 h-5 text-gray-500 hover:text-gray-700"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                                />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
                        {article.description && (
                            <p className="text-muted-foreground">{article.description}</p>
                        )}
                    </Link>
                ))}
            </div>
        </div>
    );
} 
import { Locale } from "@/lib/i18n-config";
import Image from "next/image";

interface Review {
    content: string;
    author: string;
    role: string;
    avatar: string;
}

interface UserReviewsSectionProps {
    title: string;
    reviews: Review[];
}

export default function UserReviewsSection({ title, reviews }: UserReviewsSectionProps) {
    // 复制评论以确保流畅的无限滚动
    const duplicatedReviews = [...reviews, ...reviews];

    return (
        <div className="w-full max-w-[800px] max-w-4xl mx-auto my-12 overflow-hidden">
            <h2 className="text-3xl font-bold mb-8 text-center">{title}</h2>
            <div className="relative">
                <div className="animate-scroll flex gap-6 whitespace-nowrap">
                    {duplicatedReviews.map((review, index) => (
                        <div
                            key={index}
                            className="w-[400px] shrink-0 p-6 rounded-lg border border-gray-200 bg-white"
                        >
                            <p className="text-gray-700 mb-4 italic line-clamp-3 whitespace-normal">"{review.content}"</p>
                            <div className="flex items-center">
                                <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                                    <Image
                                        src={review.avatar}
                                        alt={review.author}
                                        width={40}
                                        height={40}
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <p className="font-semibold">{review.author}</p>
                                    <p className="text-sm text-gray-500">{review.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
} 
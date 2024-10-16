import { buttonVariants } from "@/components/ui/button";
import { page_routes } from "@/lib/routes-config";
import { MoveUpRightIcon, TerminalSquareIcon } from "lucide-react";
import Link from "next/link";
import { Metadata } from 'next';
import FAQSection from '@/components/FAQSection'; // 导入新的FAQ组件

export const metadata: Metadata = {
  title: 'LookAI - 最专业的Cursor AI编程教程 | 小白免费学习资源',
  description: '提供最全面、最专业的Cursor AI编程教程。适合小白的免费学习资源，助您掌握AI编程技能。',
  keywords: 'Cursor, Cursor小白教程, AI编程, Cursor免费教程, Cursor最全面教程, Cursor专业指导',
  openGraph: {
    title: 'LookAI - 零基础小白Cursor学习网站',
    description: '发现最全面、最专业的Cursor AI编程免费教程，适合所有水平的学习者。',
    url: 'https://www.lookai.top',
    siteName: 'LookAI',
    locale: 'zh_CN',
    type: 'website',
  },
};

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center text-center px-2 py-8">
      <h1 className="text-3xl font-bold mb-4 sm:text-6xl">
        零基础小白Cursor学习网站
      </h1>
      <p className="mb-8 sm:text-xl max-w-[800px] text-muted-foreground leading-relaxed">
        在当下的AI时代，Cursor能够极大地赋能每一个普通人<br />
        本网站致力于帮助零基础的普通人<br />
        认识、学会使用Cursor<br />
        落地创意和想法<br />
        {/* 我们会持续更新，跟进Cursor的最新发展，帮助大家更好地运用这款工具，用Cursor将你的创意变为现实。 */}
      </p>
      <div className="flex flex-row items-center gap-5">
        <Link
          href={`/cursor${page_routes[0].href}`}
          className={buttonVariants({ className: "px-6 py-3 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white font-bold rounded-lg shadow-lg transform transition-transform hover:scale-105", size: "lg" })}
        >
          开启旅程
        </Link>
        {/* <Link
          href="/blog"
          className={buttonVariants({
            variant: "secondary",
            className: "px-6",
            size: "lg",
          })}
        >
          Read Blog
        </Link> */}
      </div>

      {/* 添加FAQ部分 */}
      {/* <span className="flex flex-row items-start sm:gap-2 gap-0.5 text-muted-foreground text-md mt-7 -mb-12 max-[800px]:mb-12 font-code text-base font-medium">
        <Link
          href="https://github.com/fongfiafia/my_ai_blog"
          target="_blank"
          className="mb-5 sm:text-lg flex items-center gap-2 underline underline-offset-4"
        >
          网页工程代码都在Github开源{" "}
          <MoveUpRightIcon className="w-4 h-4 font-extrabold" />
        </Link>
      </span> */}
      <FAQSection />


    </div>
  );
}

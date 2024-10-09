import { buttonVariants } from "@/components/ui/button";
import { page_routes } from "@/lib/routes-config";
import { MoveUpRightIcon, TerminalSquareIcon } from "lucide-react";
import Link from "next/link";


export default function Home() {
  return (
    <div className="flex sm:min-h-[91vh] min-h-[88vh] flex-col items-center justify-center text-center px-2 py-8">
      <h1 className="text-3xl font-bold mb-4 sm:text-7xl">
        最好的Cursor中文学习网站
      </h1>
      <p className="mb-8 sm:text-xl max-w-[800px] text-muted-foreground">
        无论你是Cursor新手还是老手，这里都有适合你的内容。新手可找到入门指南，老手能探索高级技巧。我们持续更新，跟进Cursor最新发展，确保每位用户都能学到新知识，更好地运用这款工具。不管你的使用水平如何，都能在这里发现提升Cursor使用效率的方法
      </p>
      <div className="flex flex-row items-center gap-5">
        <Link
          href={`/cursor${page_routes[0].href}`}
          className={buttonVariants({ className: "px-6", size: "lg" })}
        >
          开始学习
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
      <span className="flex flex-row items-start sm:gap-2 gap-0.5 text-muted-foreground text-md mt-7 -mb-12 max-[800px]:mb-12 font-code text-base font-medium">
        <Link
          href="https://github.com/fongfiafia/my_ai_blog"
          target="_blank"
          className="mb-5 sm:text-lg flex items-center gap-2 underline underline-offset-4"
        >
          网页工程代码都在Github开源{" "}
          <MoveUpRightIcon className="w-4 h-4 font-extrabold" />
        </Link>
      </span>
    </div>
  );
}

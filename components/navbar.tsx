'use client'

import { ModeToggle } from "@/components/theme-toggle";
import { GithubIcon, TwitterIcon } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import Search from "./search";
import { SheetLeftbar } from "./leftbar";
import LanguageSwitcher from "./language-switcher";
import { usePathname } from 'next/navigation';
import { i18n } from '@/lib/i18n-config';

function Logo() {
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || i18n.defaultLocale;

  return (
    <Link href={`/${locale}`} className="flex items-center gap-2">
      <span className="font-bold text-xl">LookAI.top</span>
    </Link>
  );
}

export const NAVLINKS = [
  {
    title: "Cursor 教程",
    href: "cursor/instruction/instruction",
  },
  {
    title: "AI Cursor老师",
    href: "ai-teacher",
  },
  {
    title: "做点好玩的",
    href: "fun",
  },
  {
    title: "ChatGPT 合租",
    href: "https://nf.video/HwL0y",
  },
];

export function Navbar() {
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || i18n.defaultLocale;

  return (
    <nav className="w-full border-b h-16 sticky top-0 z-50 bg-background">
      <div className="sm:container mx-auto w-[95vw] h-full flex items-center justify-between md:gap-2">
        <div className="flex items-center gap-5">
          <SheetLeftbar />
          <div className="flex items-center gap-6">
            <div className="sm:flex hidden">
              <Logo />
            </div>
            <div className="lg:flex hidden items-center gap-4 text-sm font-medium text-muted-foreground">
              {NAVLINKS.map((link) => (
                link.href.startsWith('http') ? (
                  <a
                    key={link.href}
                    href={link.href}
                    className="hover:text-foreground transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.title}
                  </a>
                ) : (
                  <Link
                    key={link.href}
                    href={`/${locale}/${link.href}`}
                    className="hover:text-foreground transition-colors"
                  >
                    {link.title}
                  </Link>
                )
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Search />
            <div className="flex ml-2.5 sm:ml-0">
              <Link
                href="https://github.com/fongfiafia/my_ai_blog"
                className={buttonVariants({ variant: "ghost", size: "icon" })}
              >
                <GithubIcon className="h-[1.1rem] w-[1.1rem]" />
              </Link>
              <Link
                href="https://x.com/fiafia85217"
                className={buttonVariants({
                  variant: "ghost",
                  size: "icon",
                })}
              >
                <TwitterIcon className="h-[1.1rem] w-[1.1rem]" />
              </Link>
              <LanguageSwitcher />
              <ModeToggle />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

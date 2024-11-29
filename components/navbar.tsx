'use client'

import { ModeToggle } from "@/components/theme-toggle";
import { GithubIcon, TwitterIcon } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import Search from "./search";
import SheetLeftbar from "./leftbar";
import LanguageSwitcher from "./language-switcher";
import { usePathname } from 'next/navigation';
import { i18n } from '@/lib/i18n-config';
import Image from "next/image";
import { useParams } from 'next/navigation';
import { getDictionary } from '@/lib/dictionary';
import type { Locale } from '@/lib/i18n-config';
import { useState, useEffect } from 'react';
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

export function Logo() {
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || i18n.defaultLocale;

  return (
    <Link href={`/${locale}`} className="flex items-center gap-2">
      <Image
        src="/logo_round.png"
        alt="LookAI Logo"
        width={32}
        height={32}
      />
      <span className="font-bold text-xl">LookAI.top</span>
    </Link>
  );
}

// 修改为 export const NAVLINKS
export const NAVLINKS = [
  {
    title: "Cursor 教程",
    href: "cursor/instruction/instruction",
  },
  {
    title: "零基础独立开发指南",
    href: "indie-dev-guide",
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
  const [user, setUser] = useState(null);
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || i18n.defaultLocale;
  const [navLinks, setNavLinks] = useState(NAVLINKS);

  useEffect(() => {
    const loadDictionary = async () => {
      try {
        const dict = await getDictionary(locale);
        if (dict.navigation?.links) {
          setNavLinks(dict.navigation.links);
        }
      } catch (error) {
        console.error('Failed to load navigation links:', error);
        // 保持使用默认导航链接
      }
    };
    loadDictionary();
  }, [locale]);

  useEffect(() => {
    // 监听登录状态变化
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error signing in with Google", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out", error);
    }
  };

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
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href.startsWith('http') ? link.href : `/${locale}/${link.href}`}
                  className="hover:text-foreground transition-colors"
                  {...(link.href.startsWith('http') ? { target: "_blank" } : {})}
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            {/* 登录/登出按钮 */}
            {user ? (
              <div className="flex items-center gap-2">
                <span className="text-sm hidden sm:inline">{user.email}</span>
                <button
                  onClick={handleLogout}
                  className={buttonVariants({ variant: "outline", size: "sm" })}
                >
                  退出
                </button>
              </div>
            ) : (
              <button
                onClick={handleLogin}
                className={buttonVariants({ variant: "outline", size: "sm" })}
              >
                登录
              </button>
            )}

            {/* 其他按钮 */}
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

'use client'

import { ModeToggle } from "@/components/theme-toggle";
import { GithubIcon, TwitterIcon } from "lucide-react";
import Link from "next/link";
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
  const [dict, setDict] = useState<any>(null);

  useEffect(() => {
    const loadDictionary = async () => {
      try {
        const dictionary = await getDictionary(locale);
        setDict(dictionary);
        if (dictionary.navigation?.links) {
          setNavLinks(dictionary.navigation.links);
        }
      } catch (error) {
        console.error('Failed to load dictionary:', error);
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
    <nav className="w-full border-b border-gray-200 dark:border-gray-800 h-16 sticky top-0 z-40 bg-white dark:bg-[#191919] backdrop-blur-sm bg-opacity-80 dark:bg-opacity-80">
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

        <div className="flex items-center">
          {/* 社交媒体图标和主题切换 */}
          <div className="flex items-center">
            <Link
              href="https://github.com/fongfiafia/my_ai_blog"
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
            >
              <GithubIcon className="h-5 w-5" />
            </Link>
            <Link
              href="https://x.com/fiafia85217"
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
            >
              <TwitterIcon className="h-5 w-5" />
            </Link>
            <LanguageSwitcher />
            <ModeToggle />
          </div>

          {/* Google 登录按钮 */}
          <div className="flex items-center gap-2 border-l border-gray-200 dark:border-gray-700 pl-2">
            {user ? (
              <div className="flex items-center gap-2">
                <span className="text-sm hidden sm:inline text-gray-600 dark:text-gray-400">
                  {dict?.auth?.loggedInAs} {user.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm bg-transparent border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  {dict?.auth?.logout}
                </button>
              </div>
            ) : (
                <button
                  onClick={handleLogin}
                  className="px-4 py-2 text-sm bg-black dark:bg-white text-white dark:text-black font-medium rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
                >
                  {dict?.auth?.login}
                </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

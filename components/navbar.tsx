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
import { signInWithPopup, GoogleAuthProvider, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
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

// 修改登录弹窗组件
function LoginDialog({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');

  // 添加密码验证
  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // 添加表单验证
    if (!email) {
      setError('请输入邮箱地址');
      return;
    }

    if (!password) {
      setError('请输入密码');
      return;
    }

    if (isSignUp && !validatePassword(password)) {
      setError('密码至少需要6个字符');
      return;
    }

    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      onClose();
    } catch (error: any) {
      switch (error.code) {
        case 'auth/invalid-credential':
          setError('邮箱或密码错误');
          break;
        case 'auth/user-not-found':
          setError('用户不存在');
          break;
        case 'auth/wrong-password':
          setError('密码错误');
          break;
        case 'auth/invalid-email':
          setError('邮箱格式不正确');
          break;
        case 'auth/email-already-in-use':
          setError('该邮箱已被注册');
          break;
        case 'auth/weak-password':
          setError('密码强度太弱，请至少使用6个字符');
          break;
        default:
          setError(error.message);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="min-h-screen px-4 text-center">
      <span
        className="inline-block h-screen align-middle"
        aria-hidden="true"
      >
        &#8203;
      </span>

      <div className="inline-block w-full max-w-md p-6 my-8 text-left align-middle bg-white dark:bg-[#191919] rounded-lg shadow-xl transform transition-all">
        <div className="absolute right-4 top-4">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <h2 className="text-xl font-medium mb-6">
          {isSignUp ? '创建账号' : '欢迎回来'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              邮箱地址
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 transition-all"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              密码
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 transition-all"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-sm text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-900/30 p-3 rounded-lg">
              {error}
            </p>
          )}

          <div className="flex flex-col gap-3 pt-2">
            <button
              type="submit"
              className="w-full px-4 py-2 bg-black dark:bg-white text-white dark:text-black font-medium rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              {isSignUp ? '注册' : '登录'}
            </button>

            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="w-full px-4 py-2 bg-transparent border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              {isSignUp ? '已有账号？去登录' : '没有账号？去注册'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function Navbar() {
  const [user, setUser] = useState(null);
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || i18n.defaultLocale;
  const [navLinks, setNavLinks] = useState(NAVLINKS);
  const [showLoginDialog, setShowLoginDialog] = useState(false);

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

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            {user ? (
              <div className="flex items-center gap-2">
                <span className="text-sm hidden sm:inline text-gray-600 dark:text-gray-400">
                  {user.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm bg-transparent border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  退出
                </button>
              </div>
            ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowLoginDialog(true)}
                    className="px-4 py-2 text-sm bg-black dark:bg-white text-white dark:text-black font-medium rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
                  >
                    邮箱登录
                  </button>
                  <button
                    onClick={handleLogin}
                    className="px-4 py-2 text-sm bg-transparent border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    Google登录
                  </button>
                </div>
            )}

            {/* 社交媒体图标和主题切换 */}
            <div className="flex items-center gap-2 ml-2.5 sm:ml-0">
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
          </div>
        </div>
      </div>

      <LoginDialog
        isOpen={showLoginDialog}
        onClose={() => setShowLoginDialog(false)}
      />
    </nav>
  );
}

'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function ProjectSidebar() {
    const [isOpen, setIsOpen] = useState(false)
    const pathname = usePathname()

    const toggleSidebar = () => {
        setIsOpen(!isOpen)
    }

    return (
        <>
            {/* 汉堡菜单按钮 - 仅在小屏幕显示 */}
            <button
                onClick={toggleSidebar}
                className="lg:hidden fixed top-20 left-4 z-20 p-2 rounded-md bg-white dark:bg-gray-800 shadow-md"
            >
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                    />
                </svg>
            </button>

            {/* 侧边栏 */}
            <div className={`
                fixed lg:static
                top-16 bottom-0 left-0
                w-64 bg-white dark:bg-slate-950
                transform transition-transform duration-300 ease-in-out
                lg:transform-none
                ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                border-r border-gray-200 dark:border-gray-700
                z-20
            `}>
                <div className="p-4">
                    <h2 className="text-xl font-bold mb-4">Play fun</h2>
                    <nav className="space-y-2">
                        <Link
                            href="/fun/perfect-circle"
                            className={`block p-2 rounded-lg ${pathname === '/fun/perfect-circle'
                                ? 'bg-gray-100 dark:bg-gray-800'
                                : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                                }`}
                        >
                            画个完美的圆
                        </Link>
                        <Link
                            href="/fun/wx-miniprogram"
                            className={`block p-2 rounded-lg ${pathname === '/fun/wx-miniprogram'
                                ? 'bg-gray-100 dark:bg-gray-800'
                                : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                                }`}
                        >
                            微信小程序
                        </Link>
                    </nav>
                </div>
            </div>

            {/* 遮罩层 - 仅在小屏幕且侧边栏打开时显示 */}
            {isOpen && (
                <div
                    className="fixed top-16 inset-x-0 bottom-0 bg-black bg-opacity-50 z-10 lg:hidden"
                    onClick={toggleSidebar}
                />
            )}
        </>
    )
} 
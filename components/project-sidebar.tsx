'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

const projects = [
    {
        id: 'circle-drawer',
        name: '微信小程序',
        path: '/fun/wx-miniprogram'
    },
    {
        id: 'circle-drawer',
        name: '画圆',
        path: '/fun/perfect-circle'
    },
    // {
    //     id: 'word-game',
    //     name: '说词儿',
    //     path: '/cursor-projects/word-game'
    // }
]

export function ProjectSidebar() {
    const pathname = usePathname()

    return (
        <div className="w-64 bg-background border-r min-h-screen p-4">
            {/* <h2 className="text-lg font-semibold mb-4">项目列表</h2> */}
            <nav className="space-y-2">
                {projects.map((project) => (
                    <Link
                        key={project.id}
                        href={project.path}
                        className={clsx(
                            'block px-4 py-2 rounded-lg transition-colors',
                            pathname === project.path
                                ? 'bg-primary/10 text-primary'
                                : 'text-muted-foreground hover:bg-muted'
                        )}
                    >
                        {project.name}
                    </Link>
                ))}
            </nav>
        </div>
    )
} 
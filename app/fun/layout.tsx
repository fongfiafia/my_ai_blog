import { ProjectSidebar } from '@/components/project-sidebar'

export default function ProjectsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex min-h-screen relative">
            <ProjectSidebar />
            <div className="flex-1 lg:ml-30">
                {children}
            </div>
        </div>
    )
} 
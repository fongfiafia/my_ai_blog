import { ProjectSidebar } from '@/components/project-sidebar'

export default function ProjectsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex min-h-screen">
            <ProjectSidebar />
            <div className="flex-1">
                {children}
            </div>
        </div>
    )
} 
import Image from 'next/image'
import Link from 'next/link'
import { Locale } from '@/lib/i18n-config'

interface FooterProps {
  locale: Locale
  dict: {
    footer: {
      quickLinks: string
      legal: string
      home: string
      tutorials: string
      aiTeacher: string
      funProjects: string
      terms: string
      privacy: string
    }
  }
}

export default function Footer({ locale, dict }: FooterProps) {
  return (
    <footer className="w-full bg-background border-t mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo Column */}
        <div className="flex items-center justify-center md:justify-start">
          <Image
            src="/logo_round.png"
            alt="LookAI Logo"
            width={100}
            height={100}
            className="rounded-full"
          />
        </div>

        {/* Quick Links Column */}
        <div className="text-center md:text-left">
          <h3 className="font-bold text-lg mb-4">{dict.footer.quickLinks}</h3>
          <ul className="space-y-2">
            <li>
              <Link href={`/${locale}`} className="hover:text-primary">
                {dict.footer.home}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/cursor/instruction/instruction`} className="hover:text-primary">
                {dict.footer.tutorials}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/ai-teacher`} className="hover:text-primary">
                {dict.footer.aiTeacher}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/fun`} className="hover:text-primary">
                {dict.footer.funProjects}
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal Column */}
        <div className="text-center md:text-left">
          <h3 className="font-bold text-lg mb-4">{dict.footer.legal}</h3>
          <ul className="space-y-2">
            <li>
              <Link href={`/${locale}/terms`} className="hover:text-primary">
                {dict.footer.terms}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/privacy`} className="hover:text-primary">
                {dict.footer.privacy}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

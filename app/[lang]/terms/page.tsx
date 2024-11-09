import { getDictionary } from '@/lib/dictionary'
import { Locale } from '@/lib/i18n-config'

export default async function TermsPage({ params: { lang } }: { params: { lang: Locale } }) {
    const dict = await getDictionary(lang)

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold mb-8">{dict.terms.title}</h1>
            <div className="prose prose-lg dark:prose-invert">
                <p className="text-muted-foreground mb-8">
                    {dict.terms.lastUpdated}
                </p>

                <div className="space-y-8">
                    {dict.terms.sections.map((section, index) => (
                        <section key={index}>
                            <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                {section.content}
                            </p>
                        </section>
                    ))}
                </div>

                <section className="mt-8">
                    <h2 className="text-2xl font-semibold mb-4">{dict.terms.contact.title}</h2>
                    <p className="text-muted-foreground">
                        {dict.terms.contact.content}
                        <a href="mailto:fongfiafia8@gmail.com" className="text-primary hover:underline">
                            fongfiafia8@gmail.com
                        </a>
                    </p>
                </section>
            </div>
        </div>
    )
} 
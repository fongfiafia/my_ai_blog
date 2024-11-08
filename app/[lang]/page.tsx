import Link from "next/link";
import { getPageRoutes } from "@/lib/routes-config";

export default async function Home({ params: { lang } }: { params: { lang: Locale } }) {
    const pageRoutes = getPageRoutes(lang);

    return (
        // ...
        <Link href={`/${lang}/cursor${pageRoutes[0].href}`}>
            {dict.home.startReading}
        </Link>
        // ...
    );
} 
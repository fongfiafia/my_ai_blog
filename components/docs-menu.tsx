"use client";

import { getRoutes } from "@/lib/routes-config";
import SubLink from "./sublink";
import { usePathname } from "next/navigation";
import { i18n } from '@/lib/i18n-config'

export default function DocsMenu({ isSheet = false }) {
  const pathname = usePathname();
  if (!pathname.startsWith("/cn/cursor") && !pathname.startsWith("/en/cursor")) return null;

  const locale = pathname.split('/')[1] || i18n.defaultLocale;
  const routes = getRoutes(locale as "cn" | "en");

  return (
    <div className="flex flex-col gap-3.5 mt-5 pr-2 pb-6">
      {routes.map((item, index) => {
        const modifiedItems = {
          ...item,
          href: `/${locale}/cursor${item.href}`,
          level: 0,
          isSheet,
        };
        return <SubLink key={item.title + index} {...modifiedItems} />;
      })}
    </div>
  );
}

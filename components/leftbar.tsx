'use client'

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Logo, NAVLINKS } from "./navbar";
import { Button } from "./ui/button";
import { AlignLeftIcon } from "lucide-react";
// import { FooterButtons } from "./footer";
import { DialogTitle } from "./ui/dialog";
import DocsMenu from "./docs-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { i18n } from "@/lib/i18n-config";

interface NavLink {
  title: string;
  href: string;
}

export function Leftbar() {
  return (
    <aside className="md:flex hidden flex-[1.5] min-w-[238px] sticky top-16 flex-col h-[93.75vh] overflow-y-auto scrollbar-hide">
      <div className="py-4">
        <DocsMenu />
      </div>
    </aside>
  );
}

export default function SheetLeftbar() {
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || i18n.defaultLocale;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden flex">
          <AlignLeftIcon />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col gap-4 px-0" side="left">
        <DialogTitle className="sr-only">Menu</DialogTitle>
        <SheetHeader>
          <SheetClose className="px-5" asChild>
            <Logo />
          </SheetClose>
        </SheetHeader>
        <div className="flex flex-col gap-4 overflow-y-auto scrollbar-hide">
          <div className="flex flex-col gap-2.5 mt-3 mx-2 px-5">
            {NAVLINKS.map((link: NavLink) => (
              link.href.startsWith('http') ? (
                <a
                  key={link.href}
                  href={link.href}
                  className="hover:text-foreground transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.title}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={`/${locale}/${link.href}`}
                  className="hover:text-foreground transition-colors"
                >
                  {link.title} 11
                </Link>
              )
            ))}
          </div>


          <div className="mx-2 px-5">
            <DocsMenu isSheet />
          </div>
          {/* <div className="p-6 pb-4 flex gap-2.5">
            <FooterButtons />
          </div> */}
        </div>
      </SheetContent>
    </Sheet>
  );
}
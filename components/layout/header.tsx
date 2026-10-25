"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Heart, Menu, Phone, X } from "lucide-react";
import { Dialog as D } from "radix-ui";
import { Logo } from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import { nav, site } from "@/data/site";
import { useFavorites } from "@/hooks/use-stored-list";
import { cn } from "@/lib/utils";

/** Cabeçalho fixo: navegação principal, favoritos e CTA sempre visível */
export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { list: favorites } = useFavorites();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) => pathname.startsWith(href.replace(/\/$/, ""));

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b bg-white/90 backdrop-blur-xl transition-[border-color,box-shadow] duration-300",
        scrolled ? "border-sand-200 shadow-[0_1px_12px_rgb(20_23_28/0.05)]" : "border-transparent",
      )}
    >
      <a href="#conteudo" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-lg focus:bg-navy-900 focus:px-4 focus:py-2 focus:text-white">
        Saltar para o conteúdo
      </a>
      <div className="container-site flex h-16 items-center justify-between gap-6 md:h-[72px]">
        <Logo />

        <nav aria-label="Navegação principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "relative rounded-lg px-3 py-2 text-[14px] font-medium text-ink-700 transition-colors hover:text-navy-900",
                    "after:absolute after:inset-x-3 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-brass-500 after:transition-transform after:duration-300 hover:after:scale-x-100",
                    isActive(item.href) && "text-navy-900 after:scale-x-100",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1.5">
          <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="hidden items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-ink-700 hover:text-navy-900 xl:inline-flex">
            <Phone className="size-4 text-brass-600" aria-hidden />
            {site.phoneDisplay}
          </a>
          <Link
            href="/viaturas/?favoritos=1"
            className="relative inline-flex size-10 items-center justify-center rounded-lg text-ink-700 transition-colors hover:bg-sand-100 hover:text-navy-900"
            aria-label={`Favoritos (${favorites.length})`}
          >
            <Heart className="size-5" />
            {favorites.length > 0 && (
              <span className="absolute right-1 top-1 flex size-4 items-center justify-center rounded-full bg-brass-500 text-[10px] font-bold text-white">
                {favorites.length}
              </span>
            )}
          </Link>
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link href="/viaturas/">Ver viaturas</Link>
          </Button>

          {/* Menu mobile */}
          <D.Root open={open} onOpenChange={setOpen}>
            <D.Trigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Abrir menu">
                <Menu className="size-5" />
              </Button>
            </D.Trigger>
            <D.Portal>
              <D.Overlay className="fixed inset-0 z-50 bg-navy-950/40 backdrop-blur-[2px] lg:hidden" />
              <D.Content className="fixed inset-y-0 right-0 z-50 flex w-[88%] max-w-sm flex-col bg-white p-6 shadow-panel focus:outline-none data-[state=open]:animate-[fade-in_200ms_ease-out] lg:hidden">
                <div className="flex items-center justify-between">
                  <D.Title className="sr-only">Menu</D.Title>
                  <Logo />
                  <D.Close className="rounded-full p-2 hover:bg-sand-100" aria-label="Fechar menu">
                    <X className="size-5" />
                  </D.Close>
                </div>
                <nav aria-label="Navegação mobile" className="mt-10">
                  <ul className="space-y-1">
                    {nav.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className={cn(
                            "block rounded-lg px-3 py-3 font-serif text-2xl text-ink-900 hover:bg-sand-100",
                            isActive(item.href) && "text-brass-700",
                          )}
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
                <div className="mt-auto space-y-3 border-t border-sand-200 pt-6">
                  <Button asChild className="w-full">
                    <Link href="/viaturas/">Ver viaturas</Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/oficina/#marcacao">Marcar oficina</Link>
                  </Button>
                </div>
              </D.Content>
            </D.Portal>
          </D.Root>
        </div>
      </div>
    </header>
  );
}

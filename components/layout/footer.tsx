import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { nav, site } from "@/data/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-navy-950 pb-28 text-white/80 md:pb-0">
      <div className="container-site grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-4">
          <Logo inverted />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/65">{site.description}</p>
          <div className="mt-8">
            <p className="mb-3 text-sm font-semibold text-white">Receba as novidades do stock</p>
            <NewsletterForm tone="dark" />
          </div>
        </div>

        <div className="md:col-span-2">
          <h2 className="mb-4 font-sans text-xs font-semibold uppercase tracking-[0.16em] text-brass-300">Navegação</h2>
          <ul className="space-y-2.5 text-sm">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="hover:text-white">
                  {n.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/comparar/" className="hover:text-white">
                Comparador
              </Link>
            </li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <h2 className="mb-4 font-sans text-xs font-semibold uppercase tracking-[0.16em] text-brass-300">Contactos</h2>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-brass-300" aria-hidden />
              <span>
                {site.address.street}
                <br />
                {site.address.postalCode} {site.address.city}
              </span>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 size-4 shrink-0 text-brass-300" aria-hidden />
              <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="hover:text-white">
                {site.phone}
                <span className="block text-xs text-white/50">Chamada para a rede fixa nacional</span>
              </a>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 size-4 shrink-0 text-brass-300" aria-hidden />
              <a href={`mailto:${site.email}`} className="hover:text-white">
                {site.email}
              </a>
            </li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <h2 className="mb-4 font-sans text-xs font-semibold uppercase tracking-[0.16em] text-brass-300">Horário</h2>
          <div className="space-y-4 text-sm">
            {(["stand", "oficina"] as const).map((k) => (
              <div key={k}>
                <p className="mb-1 flex items-center gap-2 font-medium text-white">
                  <Clock className="size-4 text-brass-300" aria-hidden />
                  {k === "stand" ? "Stand" : "Oficina"}
                </p>
                <ul className="space-y-0.5 text-white/65">
                  {site.hours[k].map((h) => (
                    <li key={h.days} className="flex justify-between gap-4">
                      <span>{h.days}</span>
                      <span className="text-right">{h.hours}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-site flex flex-col gap-6 py-8 text-xs text-white/55 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {site.legalName} · NIF {site.nif}
          </p>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <li><Link href="/privacidade/" className="hover:text-white">Política de Privacidade</Link></li>
            <li><Link href="/cookies/" className="hover:text-white">Cookies</Link></li>
            <li><Link href="/termos/" className="hover:text-white">Termos e Condições</Link></li>
            <li>
              <a href="https://www.livroreclamacoes.pt" target="_blank" rel="noopener noreferrer" className="inline-flex items-center rounded border border-white/25 px-2 py-1 font-semibold text-white hover:bg-white/10">
                Livro de Reclamações Eletrónico
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";
import { CalendarCheck, Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/shared/icons";
import { site } from "@/data/site";
import { whatsappLink } from "@/lib/utils";

/** Barra de ação fixa no fundo (apenas telemóvel): Ligar / WhatsApp / Marcar visita */
export function MobileActionBar() {
  const item = "flex flex-1 flex-col items-center justify-center gap-1 py-2.5 text-[11px] font-semibold";
  return (
    <nav
      aria-label="Ações rápidas"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-sand-200 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl md:hidden"
    >
      <div className="flex divide-x divide-sand-200">
        <a href={`tel:${site.phone.replace(/\s/g, "")}`} className={`${item} text-ink-900`}>
          <Phone className="size-5 text-navy-900" aria-hidden />
          Ligar
        </a>
        <a href={whatsappLink("Olá! Gostaria de mais informações.")} target="_blank" rel="noopener noreferrer" className={`${item} text-ink-900`}>
          <WhatsAppIcon className="size-5 text-[#1f8f4e]" />
          WhatsApp
        </a>
        <Link href="/contactos/?assunto=visita#formulario" className={`${item} bg-navy-900 text-white`}>
          <CalendarCheck className="size-5" aria-hidden />
          Marcar visita
        </Link>
      </div>
    </nav>
  );
}

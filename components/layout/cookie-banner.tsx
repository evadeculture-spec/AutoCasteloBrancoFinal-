"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Cookie } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const KEY = "acb:cookies";
type Consent = { necessary: true; analytics: boolean; marketing: boolean; date: string };

/**
 * Banner de cookies conforme RGPD/ePrivacy:
 * rejeitar tão fácil como aceitar, nenhuma categoria não essencial pré-selecionada.
 */
export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [custom, setCustom] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setVisible(true);
    } catch {
      setVisible(true);
    }
    const reopen = () => setVisible(true);
    window.addEventListener("acb:open-cookies", reopen);
    return () => window.removeEventListener("acb:open-cookies", reopen);
  }, []);

  const save = (c: Omit<Consent, "necessary" | "date">) => {
    try {
      localStorage.setItem(KEY, JSON.stringify({ necessary: true, ...c, date: new Date().toISOString() }));
    } catch {}
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-label="Preferências de cookies"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-3 bottom-[76px] z-40 rounded-xl border border-sand-200 bg-white p-5 shadow-panel md:bottom-6 md:left-6 md:right-auto md:max-w-md"
        >
          <div className="flex gap-3">
            <Cookie className="mt-0.5 size-5 shrink-0 text-brass-600" aria-hidden />
            <div>
              <p className="text-sm font-semibold text-ink-900">Respeitamos a sua privacidade</p>
              <p className="mt-1 text-[13px] leading-relaxed text-ink-500">
                Usamos cookies necessários ao funcionamento do site e, com o seu consentimento, cookies de análise e marketing.{" "}
                <Link href="/cookies/" className="font-medium text-navy-900 underline underline-offset-2">
                  Saber mais
                </Link>
              </p>
            </div>
          </div>

          {custom && (
            <div className="mt-4 space-y-3 rounded-lg bg-sand-100 p-3 text-[13px]">
              <label className="flex items-center gap-3">
                <Checkbox checked disabled aria-label="Necessários" /> <span><b>Necessários</b> — sempre ativos</span>
              </label>
              <label className="flex items-center gap-3">
                <Checkbox checked={analytics} onCheckedChange={(v) => setAnalytics(v === true)} /> <span><b>Análise</b> — estatísticas anónimas de utilização</span>
              </label>
              <label className="flex items-center gap-3">
                <Checkbox checked={marketing} onCheckedChange={(v) => setMarketing(v === true)} /> <span><b>Marketing</b> — anúncios personalizados</span>
              </label>
            </div>
          )}

          <div className="mt-4 grid grid-cols-2 gap-2">
            <Button variant="outline" size="sm" onClick={() => save({ analytics: false, marketing: false })}>
              Rejeitar
            </Button>
            <Button size="sm" onClick={() => save({ analytics: true, marketing: true })}>
              Aceitar todos
            </Button>
            {custom ? (
              <Button variant="secondary" size="sm" className="col-span-2" onClick={() => save({ analytics, marketing })}>
                Guardar preferências
              </Button>
            ) : (
              <Button variant="link" size="sm" className="col-span-2 h-8 text-[13px]" onClick={() => setCustom(true)}>
                Personalizar
              </Button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** Botão para reabrir as preferências (página de cookies) */
export function openCookiePreferences() {
  window.dispatchEvent(new Event("acb:open-cookies"));
}

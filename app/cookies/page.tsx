import { LegalPage } from "@/components/shared/legal-page";
import { CookiePreferencesButton } from "@/components/layout/cookie-preferences-button";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Política de Cookies", description: "Que cookies utilizamos e como gerir as suas preferências.", path: "/cookies/" });

export default function CookiesPage() {
  return (
    <LegalPage title="Política de Cookies" updated="outubro 2026">
      <section><h2>O que são cookies?</h2><p>Pequenos ficheiros guardados no seu dispositivo que permitem ao site funcionar e, com o seu consentimento, recolher estatísticas e personalizar conteúdos.</p></section>
      <section>
        <h2>Cookies que utilizamos</h2>
        <ul>
          <li><b>Necessários</b> — preferências de cookies, favoritos e comparador (armazenamento local). Sempre ativos.</li>
          <li><b>Análise</b> — estatísticas anónimas de utilização. [Ferramenta a definir, ex: Plausible ou GA4.] Apenas com consentimento.</li>
          <li><b>Marketing</b> — medição de campanhas e anúncios personalizados. [A definir.] Apenas com consentimento.</li>
        </ul>
      </section>
      <section><h2>Gerir preferências</h2><p className="mb-4">Pode alterar ou retirar o seu consentimento a qualquer momento.</p><CookiePreferencesButton /></section>
    </LegalPage>
  );
}

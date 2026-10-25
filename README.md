# AutoCasteloBranco — MVP

Site premium de venda de viaturas seminovas com oficina própria em Castelo Branco.
MVP navegável para demonstração a cliente/investidor: **todos os dados, contactos, valores e condições são placeholders**.

**Stack:** Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · componentes shadcn/ui (Radix) · Framer Motion · Lucide · react-hook-form + zod.
Gera um site **100% estático** (`output: "export"` → pasta `out/`), pronto para Netlify ou Vercel, sem servidor.

---

## Correr localmente

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # gera /out (site estático)
npm run typecheck
```

## Deploy no Netlify

1. Em Netlify: **Add new site → Import an existing project → GitHub** e escolher este repositório (ramo `main`).
2. As definições são lidas do `netlify.toml` (build `npm run build`, publish `out`, Node 22). Não é preciso alterar nada.
3. Opcional: em *Site configuration → Environment variables*, definir `NEXT_PUBLIC_SITE_URL` com o URL final (usado em canonical, sitemap e Open Graph).

Alternativa sem Git: `npm run build` e arrastar a pasta `out/` para https://app.netlify.com/drop.

---

## Estrutura de pastas

```
app/                         Rotas (App Router)
  page.tsx                   Homepage
  viaturas/page.tsx          Catálogo (filtros, ordenação, favoritos, comparador)
  viaturas/[slug]/page.tsx   Ficha de viatura (18 páginas geradas estaticamente)
  retoma/ financiamento/ oficina/ sobre/ contactos/ comparar/
  privacidade/ cookies/ termos/   Páginas legais
  sitemap.ts robots.ts not-found.tsx layout.tsx globals.css (design tokens)
components/
  ui/          Primitivas shadcn/ui: button, input, field, badge, checkbox, slider, dialog, tabs, accordion, skeleton
  layout/      Header, Footer, MobileActionBar, WhatsAppFloat, CookieBanner
  home/        Hero, QuickSearch, TrustStrip, Featured, Categories, HowItWorks, WorkshopBlock, Testimonials, Location, Newsletter
  catalog/     Catálogo, painel de filtros, lógica de filtros/ordenação (sincronizada com a URL)
  vehicles/    VehicleCard, Gallery, Viewer360, Transparency, PurchasePanel, FinanceSimulator, Reserve/TestDrive dialogs, TradeInInline, CompareBar/Table…
  workshop/    Grelha de serviços e BookingWizard (marcação em 4 passos)
  forms/       TradeInWizard, ContactForm, NewsletterForm, StepProgress, schemas zod, SuccessState
  shared/      SafeImage, Reveal, PageHero, SectionHeading, TrustInline, PlaceholderNote, JsonLd, MapEmbed, Logo
data/          vehicles.json (18 viaturas), services.json (8 serviços), site.ts (contactos, horários, parâmetros)
lib/           format (pt-PT), finance (prestação), slots (agenda 14 dias), tradein, plate, seo (schema.org), image-loader
hooks/         use-stored-list (favoritos e comparador em localStorage)
types/         Tipos de domínio
```

## Design system (tokens em `app/globals.css`, bloco `@theme`)

| Token | Valor | Uso |
|---|---|---|
| `navy-900` | `#0B1F3A` | Cor institucional, CTA principal |
| `brass-500` | `#B08D57` | Acento discreto: detalhes, CTA secundário, foco |
| `sand-100` / `sand-200` | `#F5F4F2` / `#E7E5E1` | Superfícies e linhas |
| `ink-900` | `#14171C` | Texto (grafite) |
| `ink-500` | `#5B616C` | Texto secundário (contraste AA) |
| `font-serif` | Fraunces | Títulos |
| `font-sans` | Inter | Corpo |
| `radius-lg` | 12px | Raio base |
| `shadow-soft / lift / panel` | — | Sombras suaves |

Contentor de 12 colunas (`.container-site`, máx. 1320px), mobile-first, foco visível, `prefers-reduced-motion` respeitado. As fontes vêm de `@fontsource` (sem pedidos ao Google Fonts).

---

## O que está simulado no MVP

- **Stock de viaturas:** 18 viaturas mock em `data/vehicles.json`; fotografias Unsplash genéricas (não correspondem ao modelo real), com fallback elegante caso não carreguem.
- **Visualizador 360°:** percorre as fotografias da galeria; não é uma sequência fotográfica real.
- **Imperfeições, histórico de revisões e relatório de inspeção:** gerados para demonstração.
- **Financiamento:** TAN 7,9 % / TAEG 9,9 % ilustrativas; prestação pelo método francês; MTIC estimado.
- **Retoma:** estimativa calculada por fórmula determinística a partir da matrícula, km e estado.
- **Agenda da oficina:** slots dos próximos 14 dias gerados no browser com ocupação pseudoaleatória.
- **Formulários** (reserva, test-drive, retoma, marcação, contacto, newsletter): validação real com zod, envio simulado e mensagem de sucesso; nada é enviado.
- **Favoritos e comparador:** guardados em `localStorage`.
- **Testemunhos, números, equipa, garantias, devolução, preços de oficina, contactos, NIF e morada:** placeholders marcados como tal.
- **Textos legais:** modelos a validar por um jurista.

## O que é preciso para produção

1. **CMS / DMS de viaturas:** integração com o sistema de gestão de stock (ex: Sanity, Strapi ou DMS do stand) com fotografias reais num CDN de imagem (Cloudinary/imgix) e publicação automática (ISR ou rebuild por webhook).
2. **Fotografia 360° real:** estúdio rotativo ou app de captura (ex: Spyne, Glo3D) e marcação real de imperfeições.
3. **Financiamento:** protocolo com entidade financeira, API de simulação/pré-aprovação, TAEG e MTIC reais e registo como intermediário de crédito no Banco de Portugal.
4. **Avaliação de retoma:** fonte de cotações (ex: Eurotax/Autovista, Indicata) e consulta de histórico.
5. **Agenda da oficina:** ligação ao software da oficina ou a um calendário (Cal.com / Google Calendar) com confirmação por SMS e email.
6. **CRM de leads:** encaminhar todos os formulários para um CRM (HubSpot, Pipedrive, Salesforce) com notificações à equipa e acompanhamento.
7. **Reservas com pagamento de sinal:** gateway de pagamento (MB WAY, Multibanco, cartão — ex: Stripe, SIBS, Easypay).
8. **Backend e formulários:** API (rotas Next.js ou Netlify Functions), proteção anti-spam (Turnstile/reCAPTCHA) e registo de consentimentos RGPD.
9. **Análise e consentimento:** ferramenta de analytics ligada ao banner de cookies (ex: Plausible/GA4 com Consent Mode).
10. **Conteúdos e legal:** textos legais validados, condições reais de garantia e devolução, entidade de resolução alternativa de litígios, avaliações reais (Google Reviews) e dados da empresa.
11. **Mapa:** substituir o OpenStreetMap embebido por Google Maps Embed, se preferido, com a localização exata.

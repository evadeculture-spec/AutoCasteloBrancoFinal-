/**
 * Configuração institucional do site.
 * ⚠️ Todos os contactos, valores e condições são PLACEHOLDERS a confirmar com o cliente.
 */
export const site = {
  name: "AutoCasteloBranco",
  legalName: "AutoCasteloBranco, Lda. (placeholder)",
  nif: "500 000 000 (placeholder)",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://autocastelobranco.netlify.app",
  description:
    "Viaturas seminovas selecionadas, revistas na nossa oficina e entregues com garantia. Financiamento, retoma e oficina multimarca em Castelo Branco.",
  phone: "+351 272 000 000",
  phoneDisplay: "272 000 000",
  mobile: "+351 910 000 000",
  whatsapp: "351910000000",
  email: "geral@autocastelobranco.pt",
  address: {
    street: "Zona Industrial de Castelo Branco, Rua A, Lote 00",
    postalCode: "6000-000",
    city: "Castelo Branco",
    region: "Castelo Branco",
    country: "PT",
  },
  geo: { lat: 39.8222, lng: -7.4931 },
  hours: {
    stand: [
      { days: "Segunda a sexta", hours: "09:00 – 19:30" },
      { days: "Sábado", hours: "10:00 – 13:00 · 14:30 – 18:00" },
      { days: "Domingo e feriados", hours: "Encerrado" },
    ],
    oficina: [
      { days: "Segunda a sexta", hours: "08:30 – 18:30" },
      { days: "Sábado", hours: "09:00 – 13:00" },
      { days: "Domingo e feriados", hours: "Encerrado" },
    ],
  },
  /** Elementos de confiança — valores placeholder, a confirmar */
  trust: {
    warranty: "Garantia até 24 meses",
    review: "Revisão completa antes da entrega",
    inspection: "Inspeção de 140 pontos",
    returnPolicy: "Devolução em 14 dias",
    history: "Histórico verificado",
  },
  /** Parâmetros de financiamento ILUSTRATIVOS (não representam uma oferta real) */
  finance: {
    tan: 7.9, // %
    taeg: 9.9, // % (ilustrativa)
    defaultDownPct: 0.15,
    defaultTerm: 84,
    terms: [24, 36, 48, 60, 72, 84, 96],
    minDown: 0,
  },
  social: {
    instagram: "https://instagram.com/",
    facebook: "https://facebook.com/",
  },
} as const;

export const nav = [
  { href: "/viaturas/", label: "Viaturas" },
  { href: "/retoma/", label: "Retoma" },
  { href: "/financiamento/", label: "Financiamento" },
  { href: "/oficina/", label: "Oficina" },
  { href: "/sobre/", label: "Sobre nós" },
  { href: "/contactos/", label: "Contactos" },
] as const;

export const categories = [
  { id: "suv", label: "SUV", description: "Posição de condução elevada e versatilidade", image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6" },
  { id: "citadinos", label: "Citadinos", description: "Ágeis, económicos e fáceis de estacionar", image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d" },
  { id: "eletricos-hibridos", label: "Elétricos e híbridos", description: "Menos consumo, menos emissões", image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89" },
  { id: "familiares", label: "Familiares", description: "Espaço e conforto para todos", image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2" },
  { id: "premium", label: "Premium", description: "Seleção de marcas de prestígio", image: "https://images.unsplash.com/photo-1555215695-3004980ad54e" },
] as const;

export const images = {
  hero: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7",
  workshop: "https://images.unsplash.com/photo-1486006920555-c77dcf18193c",
  workshop2: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc",
  workshop3: "https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f",
  showroom: "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
  tradeIn: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d",
  finance: "https://images.unsplash.com/photo-1580273916550-e323be2ae537",
};

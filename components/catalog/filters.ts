import type { Category, Vehicle } from "@/types";
import { kmMax, monthlyOf, priceBounds, yearBounds } from "@/lib/vehicles";

/** Estado dos filtros do catálogo (sincronizado com a URL) */
export interface Filters {
  make: string;
  model: string;
  priceMin: number;
  priceMax: number;
  monthlyMax: number;
  yearMin: number;
  yearMax: number;
  kmMax: number;
  fuels: string[];
  gearbox: string;
  bodyTypes: string[];
  category: Category | "";
  favorites: boolean;
}

export const MONTHLY_MAX = 700;

export const defaultFilters: Filters = {
  make: "",
  model: "",
  priceMin: priceBounds.min,
  priceMax: priceBounds.max,
  monthlyMax: MONTHLY_MAX,
  yearMin: yearBounds.min,
  yearMax: yearBounds.max,
  kmMax,
  fuels: [],
  gearbox: "",
  bodyTypes: [],
  category: "",
  favorites: false,
};

export type SortKey = "relevancia" | "preco-asc" | "preco-desc" | "prestacao-asc" | "km-asc" | "ano-desc" | "recentes";

export const sortOptions: { value: SortKey; label: string }[] = [
  { value: "relevancia", label: "Relevância" },
  { value: "recentes", label: "Mais recentes no stock" },
  { value: "preco-asc", label: "Preço: mais baixo" },
  { value: "preco-desc", label: "Preço: mais alto" },
  { value: "prestacao-asc", label: "Prestação: mais baixa" },
  { value: "km-asc", label: "Quilómetros: menos" },
  { value: "ano-desc", label: "Ano: mais recente" },
];

const num = (v: string | null, fallback: number) => (v && !Number.isNaN(Number(v)) ? Number(v) : fallback);

export function parseFilters(p: URLSearchParams): Filters {
  return {
    make: p.get("marca") ?? "",
    model: p.get("modelo") ?? "",
    priceMin: num(p.get("precoMin"), defaultFilters.priceMin),
    priceMax: num(p.get("precoMax"), defaultFilters.priceMax),
    monthlyMax: num(p.get("prestacaoMax"), defaultFilters.monthlyMax),
    yearMin: num(p.get("anoMin"), defaultFilters.yearMin),
    yearMax: num(p.get("anoMax"), defaultFilters.yearMax),
    kmMax: num(p.get("kmMax"), defaultFilters.kmMax),
    fuels: p.getAll("combustivel"),
    gearbox: p.get("caixa") ?? "",
    bodyTypes: p.getAll("tipologia"),
    category: (p.get("categoria") as Category) ?? "",
    favorites: p.get("favoritos") === "1",
  };
}

export function serializeFilters(f: Filters, sort: SortKey) {
  const p = new URLSearchParams();
  if (f.make) p.set("marca", f.make);
  if (f.model) p.set("modelo", f.model);
  if (f.priceMin !== defaultFilters.priceMin) p.set("precoMin", String(f.priceMin));
  if (f.priceMax !== defaultFilters.priceMax) p.set("precoMax", String(f.priceMax));
  if (f.monthlyMax !== defaultFilters.monthlyMax) p.set("prestacaoMax", String(f.monthlyMax));
  if (f.yearMin !== defaultFilters.yearMin) p.set("anoMin", String(f.yearMin));
  if (f.yearMax !== defaultFilters.yearMax) p.set("anoMax", String(f.yearMax));
  if (f.kmMax !== defaultFilters.kmMax) p.set("kmMax", String(f.kmMax));
  f.fuels.forEach((x) => p.append("combustivel", x));
  if (f.gearbox) p.set("caixa", f.gearbox);
  f.bodyTypes.forEach((x) => p.append("tipologia", x));
  if (f.category) p.set("categoria", f.category);
  if (f.favorites) p.set("favoritos", "1");
  if (sort !== "relevancia") p.set("ordenar", sort);
  return p;
}

export function applyFilters(list: Vehicle[], f: Filters, favoriteIds: string[]) {
  return list.filter(
    (v) =>
      (!f.make || v.make === f.make) &&
      (!f.model || v.model === f.model) &&
      v.price >= f.priceMin &&
      v.price <= f.priceMax &&
      (f.monthlyMax >= MONTHLY_MAX || monthlyOf(v) <= f.monthlyMax) &&
      v.year >= f.yearMin &&
      v.year <= f.yearMax &&
      v.km <= f.kmMax &&
      (!f.fuels.length || f.fuels.includes(v.fuel)) &&
      (!f.gearbox || v.gearbox === f.gearbox) &&
      (!f.bodyTypes.length || f.bodyTypes.includes(v.bodyType)) &&
      (!f.category || v.categories.includes(f.category)) &&
      (!f.favorites || favoriteIds.includes(v.id)),
  );
}

export function sortVehicles(list: Vehicle[], sort: SortKey) {
  const s = [...list];
  switch (sort) {
    case "preco-asc": return s.sort((a, b) => a.price - b.price);
    case "preco-desc": return s.sort((a, b) => b.price - a.price);
    case "prestacao-asc": return s.sort((a, b) => monthlyOf(a) - monthlyOf(b));
    case "km-asc": return s.sort((a, b) => a.km - b.km);
    case "ano-desc": return s.sort((a, b) => b.year - a.year || a.km - b.km);
    case "recentes": return s.sort((a, b) => b.arrivedAt.localeCompare(a.arrivedAt));
    default: return s.sort((a, b) => Number(b.featured) - Number(a.featured));
  }
}

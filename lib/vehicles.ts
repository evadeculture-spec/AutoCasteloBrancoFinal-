import data from "@/data/vehicles.json";
import type { Category, Vehicle } from "@/types";
import { fromMonthly } from "@/lib/finance";

/** Dados mock tipados — em produção virão de um CMS / DMS de stock */
export const vehicles = data as Vehicle[];

export function getVehicle(slug: string) {
  return vehicles.find((v) => v.slug === slug);
}

export function getFeatured(limit = 6) {
  return vehicles.filter((v) => v.featured).slice(0, limit);
}

export function getSimilar(vehicle: Vehicle, limit = 3) {
  return vehicles
    .filter((v) => v.id !== vehicle.id)
    .map((v) => {
      let score = 0;
      if (v.bodyType === vehicle.bodyType) score += 3;
      if (v.categories.some((c) => vehicle.categories.includes(c))) score += 2;
      if (Math.abs(v.price - vehicle.price) / vehicle.price < 0.25) score += 2;
      if (v.fuel === vehicle.fuel) score += 1;
      return { v, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.v);
}

export function vehicleTitle(v: Vehicle) {
  return `${v.make} ${v.model}`;
}

export function monthlyOf(v: Vehicle) {
  return fromMonthly(v.price);
}

export function countByCategory(category: Category) {
  return vehicles.filter((v) => v.categories.includes(category)).length;
}

export const makes = Array.from(new Set(vehicles.map((v) => v.make))).sort((a, b) => a.localeCompare(b, "pt"));

export function modelsOf(make?: string) {
  return Array.from(new Set(vehicles.filter((v) => !make || v.make === make).map((v) => v.model))).sort((a, b) =>
    a.localeCompare(b, "pt"),
  );
}

export const fuels = ["Gasolina", "Gasóleo", "Híbrido", "Híbrido Plug-in", "Elétrico"] as const;
export const gearboxes = ["Manual", "Automática"] as const;
export const bodyTypes = ["SUV", "Citadino", "Compacto", "Berlina", "Carrinha"] as const;

export const priceBounds = {
  min: Math.floor(Math.min(...vehicles.map((v) => v.price)) / 1000) * 1000,
  max: Math.ceil(Math.max(...vehicles.map((v) => v.price)) / 1000) * 1000,
};
export const yearBounds = {
  min: Math.min(...vehicles.map((v) => v.year)),
  max: Math.max(...vehicles.map((v) => v.year)),
};
export const kmMax = Math.ceil(Math.max(...vehicles.map((v) => v.km)) / 10000) * 10000;

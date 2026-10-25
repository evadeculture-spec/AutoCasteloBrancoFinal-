/* Tipos de domínio partilhados por todo o site */

export type Fuel = "Gasolina" | "Gasóleo" | "Híbrido" | "Híbrido Plug-in" | "Elétrico";
export type Gearbox = "Manual" | "Automática";
export type BodyType = "SUV" | "Citadino" | "Familiar" | "Berlina" | "Carrinha" | "Compacto";
export type Category = "suv" | "citadinos" | "eletricos-hibridos" | "familiares" | "premium";
export type VehicleBadge = "Revisto" | "Garantia" | "Novo stock" | "Baixa quilometragem" | "IVA dedutível";

export interface EquipmentGroup {
  category: string;
  items: string[];
}

export interface ServiceRecord {
  date: string; // ISO (AAAA-MM)
  km: number;
  description: string;
  workshop: string;
}

export interface Imperfection {
  id: string;
  /** Posição percentual sobre a imagem de transparência */
  x: number;
  y: number;
  title: string;
  detail: string;
  severity: "ligeira" | "moderada";
}

export interface InspectionItem {
  area: string;
  points: number;
  status: "ok" | "atenção";
  note?: string;
}

export interface Vehicle {
  id: string;
  slug: string;
  make: string;
  model: string;
  version: string;
  year: number;
  month: number;
  km: number;
  fuel: Fuel;
  gearbox: Gearbox;
  powerHp: number;
  engineCc: number | null; // elétricos sem cilindrada
  batteryKwh?: number;
  rangeKm?: number;
  bodyType: BodyType;
  categories: Category[];
  doors: number;
  seats: number;
  color: string;
  owners: number;
  plate: string; // parcialmente oculta, ex: "AA-00-**"
  tollClass: 1 | 2;
  co2: number; // g/km (WLTP)
  consumption: string;
  price: number; // € IVA incluído
  previousPrice?: number;
  vatDeductible: boolean;
  featured: boolean;
  badges: VehicleBadge[];
  warrantyMonths: number;
  images: string[];
  summary: string;
  equipment: EquipmentGroup[];
  history: ServiceRecord[];
  imperfections: Imperfection[];
  inspection: InspectionItem[];
  arrivedAt: string; // ISO
}

export interface WorkshopService {
  id: string;
  name: string;
  description: string;
  durationMin: number;
  priceFrom: number;
  icon: string;
  popular?: boolean;
}

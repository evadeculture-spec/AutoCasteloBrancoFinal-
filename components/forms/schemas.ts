import { z } from "zod";
import { PLATE_REGEX } from "@/lib/plate";

/* Esquemas de validação partilhados (mensagens em pt-PT) */

export const phoneSchema = z
  .string()
  .trim()
  .transform((v) => v.replace(/[\s-]/g, ""))
  .refine((v) => /^(\+351)?(9[1236]\d{7}|2\d{8})$/.test(v), "Indique um número de telemóvel ou telefone português válido");

export const emailSchema = z.string().trim().min(1, "Indique o seu email").email("Email inválido");

export const nameSchema = z.string().trim().min(2, "Indique o seu nome");

export const consentSchema = z.boolean().refine((v) => v === true, "É necessário aceitar a Política de Privacidade");

export const plateSchema = z
  .string()
  .trim()
  .toUpperCase()
  .refine((v) => PLATE_REGEX.test(v), "Matrícula inválida (ex: AA-00-AA)");

export const kmSchema = z.number({ message: "Indique os quilómetros" }).int().min(0, "Valor inválido").max(999999, "Valor demasiado elevado");

"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Lista persistida em localStorage, partilhada entre componentes (favoritos, comparador).
 * Usa useSyncExternalStore para que todos os componentes fiquem sincronizados.
 */
const listeners = new Map<string, Set<() => void>>();
const cache = new Map<string, string[]>();
const EMPTY: string[] = [];

function read(key: string): string[] {
  if (cache.has(key)) return cache.get(key)!;
  let value: string[] = [];
  try {
    const raw = window.localStorage.getItem(key);
    value = raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    value = [];
  }
  cache.set(key, value);
  return value;
}

function write(key: string, value: string[]) {
  cache.set(key, value);
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* modo privado: mantém apenas em memória */
  }
  listeners.get(key)?.forEach((l) => l());
}

export function useStoredList(key: string, max?: number) {
  const subscribe = useCallback(
    (cb: () => void) => {
      if (!listeners.has(key)) listeners.set(key, new Set());
      listeners.get(key)!.add(cb);
      return () => listeners.get(key)!.delete(cb);
    },
    [key],
  );
  const list = useSyncExternalStore(subscribe, () => read(key), () => EMPTY);

  /** Alterna um id; devolve false se o limite máximo impedir a adição */
  const toggle = useCallback(
    (id: string) => {
      const current = read(key);
      if (current.includes(id)) {
        write(key, current.filter((x) => x !== id));
        return true;
      }
      if (max && current.length >= max) return false;
      write(key, [...current, id]);
      return true;
    },
    [key, max],
  );
  const remove = useCallback((id: string) => write(key, read(key).filter((x) => x !== id)), [key]);
  const clear = useCallback(() => write(key, []), [key]);

  return { list, toggle, remove, clear, has: (id: string) => list.includes(id) };
}

export const useFavorites = () => useStoredList("acb:favoritos");
export const COMPARE_MAX = 3;
export const useCompare = () => useStoredList("acb:comparar", COMPARE_MAX);

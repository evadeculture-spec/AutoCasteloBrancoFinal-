"use client";

import { Button } from "@/components/ui/button";
import { openCookiePreferences } from "@/components/layout/cookie-banner";

export function CookiePreferencesButton() {
  return <Button variant="secondary" onClick={openCookiePreferences}>Alterar preferências de cookies</Button>;
}

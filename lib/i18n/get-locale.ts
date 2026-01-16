// lib/i18n/get-locale.ts
import { headers } from "next/headers";
import type { Locale } from "./translations";

/**
 * Detecta o locale do usuário baseado em:
 * 1. Cookie de preferência (se existir)
 * 2. Header Accept-Language
 * 3. Fallback para 'en'
 */
export async function getLocale(): Promise<Locale> {
  const headersList = await headers();
  const acceptLanguage = headersList.get("accept-language");

  if (!acceptLanguage) {
    return "en";
  }

  // Verifica se o usuário prefere português
  const prefersBrazilianPortuguese =
    acceptLanguage.includes("pt-BR") || acceptLanguage.includes("pt");

  return prefersBrazilianPortuguese ? "pt-BR" : "en";
}

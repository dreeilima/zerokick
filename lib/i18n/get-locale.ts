// lib/i18n/get-locale.ts
import { headers, cookies } from "next/headers";
import type { Locale } from "./translations";

/**
 * Detecta o locale do usuário baseado em:
 * 1. Cookie de preferência (se existir)
 * 2. Header Accept-Language
 * 3. Fallback para 'en'
 */
export async function getLocale(): Promise<Locale> {
  // 1. Verifica cookie
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get("NEXT_LOCALE");
  
  if (localeCookie?.value === "pt-BR" || localeCookie?.value === "en") {
    return localeCookie.value as Locale;
  }

  // 2. Verifica header
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

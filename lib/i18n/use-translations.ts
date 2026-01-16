// lib/i18n/use-translations.ts
import { translations, type Locale } from "./translations";

/**
 * Hook para obter traduções baseado no locale
 */
export function useTranslations(locale: Locale) {
  return translations[locale];
}

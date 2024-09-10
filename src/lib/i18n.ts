import { derived, writable } from "svelte/store";
import translations from "./translations";

// Define the type for your translations object
type Translations = Record<string, Record<string, string>>;

export const locale = writable<string>("en");
export const locales: string[] = Object.keys(translations);

// Define a type for the variables passed into the translation function
type TranslationVars = Record<string, string>;

// Define the type for the translation function itself
function translate(locale: string, key: string, vars: TranslationVars): string {
  // Error handling
  if (!key) throw new Error("no key provided to $t()");
  if (!locale) throw new Error(`no translation for key "${key}"`);

  // Get the translation text
  let text = translations[locale]?.[key];
  if (!text) throw new Error(`no translation found for ${locale}.${key}`);

  // Replace variables in the translation string
  Object.keys(vars).forEach((k) => {
    const regex = new RegExp(`{{${k}}}`, "g");
    text = text.replace(regex, vars[k]);
  });

  return text;
}

// Derive the translation function based on the current locale
export const t = derived<typeof locale, (key: string, vars?: TranslationVars) => string>(
  locale,
  ($locale) => (key: string, vars: TranslationVars = {}) => translate($locale, key, vars)
);

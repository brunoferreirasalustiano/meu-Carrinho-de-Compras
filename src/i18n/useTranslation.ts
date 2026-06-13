import { useState } from 'react';
import { translations, Language, TranslationKey } from './translations';

let Localization: any = null;
try {
  Localization = require('expo-localization');
} catch {
  console.warn('[i18n] expo-localization não encontrado. Execute: npx expo install expo-localization');
}

function detectLanguage(): Language {
  let locale = 'pt-BR';

  if (Localization?.locale) {
    locale = Localization.locale;
  } else if (typeof navigator !== 'undefined' && navigator.language) {
    locale = navigator.language;
  }

  const lang = locale.toLowerCase().split('-')[0];

  if (lang === 'pt') return 'pt';
  if (lang === 'es') return 'es';
  return 'en';
}

export function detectLocale(): string {
  if (Localization?.locale) {
    return Localization.locale;
  }
  if (typeof navigator !== 'undefined' && navigator.language) {
    return navigator.language;
  }
  return 'pt-BR';
}

export function useTranslation() {
  const [lang] = useState<Language>(detectLanguage);
  const locale = detectLocale();

  const t = (key: TranslationKey, vars?: Record<string, string>): string => {
    let text: string = (translations[lang][key] || translations.en[key] || key) as string;

    if (vars) {
      Object.entries(vars).forEach(([k, v]) => {
        text = text.replace(`{{${k}}}`, v);
      });
    }

    return text;
  };

  return { t, lang, locale };
}

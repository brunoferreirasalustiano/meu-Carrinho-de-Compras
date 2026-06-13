import { useTranslation } from '../i18n/useTranslation';

export function useCurrency() {
  const { lang } = useTranslation();

  // Mapeamento: idioma → moeda
  const currencyMap: Record<string, { symbol: string; code: string; locale: string }> = {
    pt: { symbol: 'R$', code: 'BRL', locale: 'pt-BR' },
    en: { symbol: '$', code: 'USD', locale: 'en-US' },
    es: { symbol: '€', code: 'EUR', locale: 'es-ES' }, // Espanha/Europa
  };

  // Fallback para USD
  const currency = currencyMap[lang] || currencyMap['en'];

  function formatMoney(value: number): string {
    try {
      return new Intl.NumberFormat(currency.locale, {
        style: 'currency',
        currency: currency.code,
      }).format(value);
    } catch {
      // Fallback se Intl não estiver disponível
      return `${currency.symbol} ${value.toFixed(2).replace('.', ',')}`;
    }
  }

  return { formatMoney, symbol: currency.symbol, code: currency.code };
}

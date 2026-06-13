const currencyMap: Record<string, { symbol: string; code: string; locale: string }> = {
  // Américas
  'pt-BR': { symbol: 'R$', code: 'BRL', locale: 'pt-BR' },   // Brasil
  'en-US': { symbol: '$', code: 'USD', locale: 'en-US' },     // Estados Unidos
  'en-CA': { symbol: 'C$', code: 'CAD', locale: 'en-CA' },    // Canadá
  'es-MX': { symbol: '$', code: 'MXN', locale: 'es-MX' },     // México
  'es-AR': { symbol: '$', code: 'ARS', locale: 'es-AR' },     // Argentina
  'es-CL': { symbol: '$', code: 'CLP', locale: 'es-CL' },     // Chile
  'es-CO': { symbol: '$', code: 'COP', locale: 'es-CO' },     // Colômbia
  'es-PE': { symbol: 'S/', code: 'PEN', locale: 'es-PE' },    // Peru
  'pt-AO': { symbol: 'Kz', code: 'AOA', locale: 'pt-AO' },   // Angola
  'pt-MZ': { symbol: 'MT', code: 'MZN', locale: 'pt-MZ' },    // Moçambique

  // Europa
  'de-DE': { symbol: '€', code: 'EUR', locale: 'de-DE' },     // Alemanha
  'fr-FR': { symbol: '€', code: 'EUR', locale: 'fr-FR' },     // França
  'es-ES': { symbol: '€', code: 'EUR', locale: 'es-ES' },   // Espanha
  'it-IT': { symbol: '€', code: 'EUR', locale: 'it-IT' },     // Itália
  'pt-PT': { symbol: '€', code: 'EUR', locale: 'pt-PT' },     // Portugal
  'nl-NL': { symbol: '€', code: 'EUR', locale: 'nl-NL' },    // Países Baixos
  'pl-PL': { symbol: 'zł', code: 'PLN', locale: 'pl-PL' },    // Polônia
  'cs-CZ': { symbol: 'Kč', code: 'CZK', locale: 'cs-CZ' },    // República Tcheca
  'hu-HU': { symbol: 'Ft', code: 'HUF', locale: 'hu-HU' },    // Hungria
  'ro-RO': { symbol: 'lei', code: 'RON', locale: 'ro-RO' },   // Romênia
  'bg-BG': { symbol: 'лв', code: 'BGN', locale: 'bg-BG' },    // Bulgária
  'hr-HR': { symbol: '€', code: 'EUR', locale: 'hr-HR' },     // Croácia
  'en-GB': { symbol: '£', code: 'GBP', locale: 'en-GB' },     // Reino Unido
  'en-IE': { symbol: '€', code: 'EUR', locale: 'en-IE' },     // Irlanda
  'sv-SE': { symbol: 'kr', code: 'SEK', locale: 'sv-SE' },    // Suécia
  'da-DK': { symbol: 'kr', code: 'DKK', locale: 'da-DK' },    // Dinamarca
  'no-NO': { symbol: 'kr', code: 'NOK', locale: 'no-NO' },    // Noruega
  'fi-FI': { symbol: '€', code: 'EUR', locale: 'fi-FI' },     // Finlândia
  'is-IS': { symbol: 'kr', code: 'ISK', locale: 'is-IS' },    // Islândia
  'ch-CH': { symbol: 'Fr', code: 'CHF', locale: 'de-CH' },    // Suíça (aleman)
  'fr-CH': { symbol: 'Fr', code: 'CHF', locale: 'fr-CH' },    // Suíça (francês)
  'it-CH': { symbol: 'Fr', code: 'CHF', locale: 'it-CH' },    // Suíça (italiano)
  'ru-RU': { symbol: '₽', code: 'RUB', locale: 'ru-RU' },    // Rússia
  'tr-TR': { symbol: '₺', code: 'TRY', locale: 'tr-TR' },    // Turquia
  'uk-UA': { symbol: '₴', code: 'UAH', locale: 'uk-UA' },    // Ucrânia
  'sr-RS': { symbol: 'din', code: 'RSD', locale: 'sr-RS' },   // Sérvia
  'mk-MK': { symbol: 'ден', code: 'MKD', locale: 'mk-MK' },  // Macedônia do Norte
  'al-AL': { symbol: 'L', code: 'ALL', locale: 'sq-AL' },      // Albânia
  'by-BY': { symbol: 'Br', code: 'BYN', locale: 'be-BY' },    // Bielorrússia

  // Ásia
  'ja-JP': { symbol: '¥', code: 'JPY', locale: 'ja-JP' },     // Japão
  'zh-CN': { symbol: '¥', code: 'CNY', locale: 'zh-CN' },     // China
  'zh-HK': { symbol: 'HK$', code: 'HKD', locale: 'zh-HK' },   // Hong Kong
  'zh-TW': { symbol: 'NT$', code: 'TWD', locale: 'zh-TW' },   // Taiwan
  'ko-KR': { symbol: '₩', code: 'KRW', locale: 'ko-KR' },     // Coreia do Sul
  'in-IN': { symbol: '₹', code: 'INR', locale: 'en-IN' },    // Índia
  'id-ID': { symbol: 'Rp', code: 'IDR', locale: 'id-ID' },    // Indonésia
  'th-TH': { symbol: '฿', code: 'THB', locale: 'th-TH' },     // Tailândia
  'vi-VN': { symbol: '₫', code: 'VND', locale: 'vi-VN' },    // Vietnã
  'my-MY': { symbol: 'RM', code: 'MYR', locale: 'ms-MY' },    // Malásia
  'ph-PH': { symbol: '₱', code: 'PHP', locale: 'en-PH' },     // Filipinas
  'sg-SG': { symbol: 'S$', code: 'SGD', locale: 'en-SG' },    // Singapura
  'bn-BD': { symbol: '৳', code: 'BDT', locale: 'bn-BD' },    // Bangladesh
  'lk-LK': { symbol: '₨', code: 'LKR', locale: 'si-LK' },     // Sri Lanka
  'np-NP': { symbol: '₨', code: 'NPR', locale: 'ne-NP' },     // Nepal
  'pk-PK': { symbol: '₨', code: 'PKR', locale: 'ur-PK' },    // Paquistão
  'kh-KH': { symbol: '៛', code: 'KHR', locale: 'km-KH' },     // Camboja
  'la-LA': { symbol: '₭', code: 'LAK', locale: 'lo-LA' },     // Laos
  'mm-MM': { symbol: 'K', code: 'MMK', locale: 'my-MM' },      // Mianmar
  'kz-KZ': { symbol: '₸', code: 'KZT', locale: 'kk-KZ' },    // Cazaquistão
  'uz-UZ': { symbol: 'soʻm', code: 'UZS', locale: 'uz-UZ' },  // Uzbequistão
  'mn-MN': { symbol: '₮', code: 'MNT', locale: 'mn-MN' },    // Mongólia
  'az-AZ': { symbol: '₼', code: 'AZN', locale: 'az-AZ' },    // Azerbaijão
  'ge-GE': { symbol: '₾', code: 'GEL', locale: 'ka-GE' },     // Geórgia
  'am-AM': { symbol: '֏', code: 'AMD', locale: 'hy-AM' },    // Armênia
  'ir-IR': { symbol: '﷼', code: 'IRR', locale: 'fa-IR' },    // Irã
  'iq-IQ': { symbol: 'ع.د', code: 'IQD', locale: 'ar-IQ' },  // Iraque
  'jo-JO': { symbol: 'د.ا', code: 'JOD', locale: 'ar-JO' },   // Jordânia
  'lb-LB': { symbol: 'ل.ل', code: 'LBP', locale: 'ar-LB' },  // Líbano
  'sy-SY': { symbol: '£S', code: 'SYP', locale: 'ar-SY' },    // Síria
  'ye-YE': { symbol: '﷼', code: 'YER', locale: 'ar-YE' },    // Iêmen
  'af-AF': { symbol: '؋', code: 'AFN', locale: 'ps-AF' },    // Afeganistão
  'sa-SA': { symbol: '﷼', code: 'SAR', locale: 'ar-SA' },    // Arábia Saudita
  'ae-AE': { symbol: 'د.إ', code: 'AED', locale: 'ar-AE' },  // Emirados Árabes
  'qa-QA': { symbol: '﷼', code: 'QAR', locale: 'ar-QA' },    // Catar
  'kw-KW': { symbol: 'د.ك', code: 'KWD', locale: 'ar-KW' },   // Kuwait
  'bh-BH': { symbol: 'د.ب', code: 'BHD', locale: 'ar-BH' },   // Bahrein
  'om-OM': { symbol: '﷼', code: 'OMR', locale: 'ar-OM' },    // Omã
  'il-IL': { symbol: '₪', code: 'ILS', locale: 'he-IL' },    // Israel

  // África
  'za-ZA': { symbol: 'R', code: 'ZAR', locale: 'en-ZA' },     // África do Sul
  'ng-NG': { symbol: '₦', code: 'NGN', locale: 'en-NG' },    // Nigéria
  'eg-EG': { symbol: '£', code: 'EGP', locale: 'ar-EG' },    // Egito
  'ke-KE': { symbol: 'KSh', code: 'KES', locale: 'en-KE' },   // Quênia
  'gh-GH': { symbol: '₵', code: 'GHS', locale: 'en-GH' },    // Gana
  'ma-MA': { symbol: 'د.م.', code: 'MAD', locale: 'ar-MA' },  // Marrocos
  'dz-DZ': { symbol: 'د.ج', code: 'DZD', locale: 'ar-DZ' },   // Argélia
  'tn-TN': { symbol: 'د.ت', code: 'TND', locale: 'ar-TN' },   // Tunísia
  'ly-LY': { symbol: 'ل.د', code: 'LYD', locale: 'ar-LY' },   // Líbia
  'sd-SD': { symbol: 'ج.س.', code: 'SDG', locale: 'ar-SD' },  // Sudão
  'et-ET': { symbol: 'Br', code: 'ETB', locale: 'am-ET' },    // Etiópia
  'ug-UG': { symbol: 'USh', code: 'UGX', locale: 'en-UG' },   // Uganda
  'tz-TZ': { symbol: 'Sh', code: 'TZS', locale: 'sw-TZ' },   // Tanzânia
  'rw-RW': { symbol: 'Fr', code: 'RWF', locale: 'rw-RW' },   // Ruanda
  'zm-ZM': { symbol: 'K', code: 'ZMW', locale: 'en-ZM' },     // Zâmbia
  'zw-ZW': { symbol: 'Z$', code: 'ZWL', locale: 'en-ZW' },    // Zimbábue
  'mw-MW': { symbol: 'MK', code: 'MWK', locale: 'en-MW' },    // Malaui
  'mz-MZ': { symbol: 'MT', code: 'MZN', locale: 'pt-MZ' },   // Moçambique
  'na-NA': { symbol: 'N$', code: 'NAD', locale: 'en-NA' },    // Namíbia
  'bw-BW': { symbol: 'P', code: 'BWP', locale: 'en-BW' },     // Botsuana
  'sz-SZ': { symbol: 'L', code: 'SZL', locale: 'en-SZ' },     // Essuatíni
  'ls-LS': { symbol: 'L', code: 'LSL', locale: 'en-LS' },     // Lesoto
  'mg-MG': { symbol: 'Ar', code: 'MGA', locale: 'mg-MG' },   // Madagascar
  'mu-MU': { symbol: '₨', code: 'MUR', locale: 'en-MU' },     // Maurício
  'sc-SC': { symbol: '₨', code: 'SCR', locale: 'en-SC' },     // Seicheles
  'cm-CM': { symbol: 'Fr', code: 'XAF', locale: 'fr-CM' },    // Camarões
  'ci-CI': { symbol: 'Fr', code: 'XOF', locale: 'fr-CI' },    // Costa do Marfim
  'sn-SN': { symbol: 'Fr', code: 'XOF', locale: 'fr-SN' },    // Senegal
  'ml-ML': { symbol: 'Fr', code: 'XOF', locale: 'fr-ML' },    // Mali
  'bf-BF': { symbol: 'Fr', code: 'XOF', locale: 'fr-BF' },    // Burquina Faso
  'ne-NE': { symbol: 'Fr', code: 'XOF', locale: 'fr-NE' },    // Níger
  'bj-BJ': { symbol: 'Fr', code: 'XOF', locale: 'fr-BJ' },    // Benin
  'tg-TG': { symbol: 'Fr', code: 'XOF', locale: 'fr-TG' },    // Togo
  'gn-GN': { symbol: 'Fr', code: 'GNF', locale: 'fr-GN' },    // Guiné
  'sl-SL': { symbol: 'Le', code: 'SLL', locale: 'en-SL' },    // Serra Leoa
  'lr-LR': { symbol: '$', code: 'LRD', locale: 'en-LR' },     // Libéria
  'gm-GM': { symbol: 'D', code: 'GMD', locale: 'en-GM' },     // Gâmbia
  'mr-MR': { symbol: 'UM', code: 'MRU', locale: 'ar-MR' },    // Mauritânia
  'td-TD': { symbol: 'Fr', code: 'XAF', locale: 'fr-TD' },    // Chade
  'cf-CF': { symbol: 'Fr', code: 'XAF', locale: 'fr-CF' },    // República Centro-Africana
  'cg-CG': { symbol: 'Fr', code: 'XAF', locale: 'fr-CG' },    // Congo
  'ga-GA': { symbol: 'Fr', code: 'XAF', locale: 'fr-GA' },    // Gabão
  'gq-GQ': { symbol: 'Fr', code: 'XAF', locale: 'es-GQ' },    // Guiné Equatorial
  'ao-AO': { symbol: 'Kz', code: 'AOA', locale: 'pt-AO' },    // Angola
  'cd-CD': { symbol: 'Fr', code: 'CDF', locale: 'fr-CD' },    // República Democrática do Congo

  // Oceania
  'en-AU': { symbol: 'A$', code: 'AUD', locale: 'en-AU' },    // Austrália
  'en-NZ': { symbol: 'NZ$', code: 'NZD', locale: 'en-NZ' },   // Nova Zelândia
  'en-FJ': { symbol: 'FJ$', code: 'FJD', locale: 'en-FJ' },    // Fiji
  'en-PG': { symbol: 'K', code: 'PGK', locale: 'en-PG' },     // Papua-Nova Guiné
  'sb-SB': { symbol: 'SI$', code: 'SBD', locale: 'en-SB' },    // Ilhas Salomão
  'vu-VU': { symbol: 'VT', code: 'VUV', locale: 'bi-VU' },    // Vanuatu
  'to-TO': { symbol: 'T$', code: 'TOP', locale: 'to-TO' },    // Tonga
  'ws-WS': { symbol: 'T', code: 'WST', locale: 'sm-WS' },    // Samoa
  'pf-PF': { symbol: 'Fr', code: 'XPF', locale: 'fr-PF' },    // Polinésia Francesa
  'nc-NC': { symbol: 'Fr', code: 'XPF', locale: 'fr-NC' },    // Nova Caledônia
};

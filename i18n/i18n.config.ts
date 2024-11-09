// import { arabicPlurals } from "./i18n/plurals"
// import { datetimeFormats } from "./i18n/datetime-formats"

import { numberFormats } from "./number-formats";

export default defineI18nConfig(() => ({
  legacy: false,
  fallbackLocale: "en",
  // pluralRules: {
  // //  "en-US": enPlurals,
  // },
  // numberFormats,
  // datetimeFormats,
}));

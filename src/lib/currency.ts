import type { Language } from "./translations";

export type Currency = "EUR" | "USD" | "VND" | "RUB" | "SAR";

export const languageToCurrency: Record<Language, Currency> = {
  fr: "EUR",
  en: "USD",
  es: "EUR",
  vn: "VND",
  ru: "RUB",
  ar: "SAR",
};

export const currencySymbols: Record<Currency, string> = {
  EUR: "€",
  USD: "$",
  VND: "₫",
  RUB: "₽",
  SAR: "﷼",
};

const rates: Record<Currency, number> = {
  EUR: 1,
  USD: 1.1,
  VND: 25800,
  RUB: 90,
  SAR: 4.1,
};

function roundSmart(value: number, currency: Currency): number {
  if (currency === "VND") return Math.round(value / 100000) * 100000;
  if (currency === "RUB") return Math.round(value / 1000) * 1000;
  return Math.round(value);
}

export function convertPrice(eurPrice: number, currency: Currency): number {
  return roundSmart(eurPrice * rates[currency], currency);
}

export function formatPrice(price: number, currency: Currency, lang: Language): string {
  const formatted = new Intl.NumberFormat(
    lang === "vn" ? "vi-VN" : lang === "ru" ? "ru-RU" : lang === "ar" ? "ar-SA" : lang === "es" ? "es-ES" : lang === "fr" ? "fr-FR" : "en-US",
    { style: "decimal", maximumFractionDigits: 0 }
  ).format(price);

  const symbol = currencySymbols[currency];
  if (currency === "USD") return `$${formatted}`;
  if (currency === "VND") return `${formatted}₫`;
  return `${formatted}${symbol}`;
}

export function displayPrice(eurPrice: number, lang: Language): string {
  const currency = languageToCurrency[lang];
  const converted = convertPrice(eurPrice, currency);
  return formatPrice(converted, currency, lang);
}

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { type Language, translations, getTranslation, isRTL } from "@/lib/translations";
import { displayPrice } from "@/lib/currency";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (path: string) => string;
  price: (eurAmount: number) => string;
  rtl: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    const stored = localStorage.getItem("xr-lang");
    return (stored as Language) || "fr";
  });

  const setLang = useCallback((newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem("xr-lang", newLang);
  }, []);

  const t = useCallback(
    (path: string) => getTranslation(translations[lang], path),
    [lang]
  );

  const price = useCallback(
    (eurAmount: number) => displayPrice(eurAmount, lang),
    [lang]
  );

  const rtl = isRTL(lang);

  useEffect(() => {
    document.documentElement.dir = rtl ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang, rtl]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, price, rtl }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}

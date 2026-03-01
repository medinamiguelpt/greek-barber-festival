"use client";
import { createContext, useContext, useState, type ReactNode } from "react";
import type { Locale, Translations } from "./translations";
import { translations } from "./translations";

type I18nContextType = { lang: Locale; setLang: (l: Locale) => void; t: Translations; isRTL: boolean };

const I18nContext = createContext<I18nContextType>({
  lang: "el", setLang: () => {}, t: translations.el, isRTL: false,
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Locale>("el");
  const t = translations[lang];
  const isRTL = lang === "ar";
  return (
    <I18nContext.Provider value={{ lang, setLang, t, isRTL }}>
      <div dir={isRTL ? "rtl" : "ltr"}>{children}</div>
    </I18nContext.Provider>
  );
}

export function useI18n() { return useContext(I18nContext); }

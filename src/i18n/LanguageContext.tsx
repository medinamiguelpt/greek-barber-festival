"use client";
import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import translations, { Lang, LANGUAGES } from "./translations";

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => any;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "el",
  setLang: () => {},
  t: () => "",
  isRTL: false,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("el");

  const setLang = useCallback((newLang: Lang) => {
    setLangState(newLang);
    // Update HTML attributes for RTL support
    const isRTL = LANGUAGES.find((l) => l.code === newLang)?.rtl ?? false;
    document.documentElement.lang = newLang;
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
  }, []);

  const t = useCallback(
    (key: string): any => {
      const keys = key.split(".");
      let value: any = translations[lang];
      for (const k of keys) {
        if (value && typeof value === "object" && k in value) {
          value = value[k];
        } else {
          // Fallback to Greek, then to key itself
          let fallback: any = translations["el"];
          for (const fk of keys) {
            if (fallback && typeof fallback === "object" && fk in fallback) {
              fallback = fallback[fk];
            } else {
              return key;
            }
          }
          return fallback;
        }
      }
      return value;
    },
    [lang]
  );

  const isRTL = LANGUAGES.find((l) => l.code === lang)?.rtl ?? false;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

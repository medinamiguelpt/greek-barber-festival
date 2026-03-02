"use client";
import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { LANGUAGES } from "@/i18n/translations";

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = LANGUAGES.find((l) => l.code === lang)!;

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          background: "rgba(200,168,78,0.12)",
          border: "1px solid rgba(200,168,78,0.3)",
          borderRadius: 20,
          padding: "6px 14px",
          cursor: "pointer",
          color: "var(--color-gold)",
          fontFamily: "var(--font-body)",
          fontSize: "0.85rem",
          transition: "all 0.3s",
        }}
      >
        <span style={{ fontSize: "1.1rem" }}>{current.flag}</span>
        <span>{current.code.toUpperCase()}</span>
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="currentColor"
          style={{
            transform: open ? "rotate(180deg)" : "none",
            transition: "transform 0.3s",
          }}
        >
          <path d="M5 6L0 0h10z" />
        </svg>
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 8px)",
            right: 0,
            background: "rgba(18,18,18,0.97)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(200,168,78,0.2)",
            borderRadius: 12,
            overflow: "hidden",
            minWidth: 170,
            zIndex: 10000,
            boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
          }}
        >
          {LANGUAGES.map((l) => (
            <button
              key={l.code}
              onClick={() => {
                setLang(l.code);
                setOpen(false);
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                width: "100%",
                padding: "12px 16px",
                background: l.code === lang ? "rgba(200,168,78,0.15)" : "transparent",
                border: "none",
                borderBottom: "1px solid rgba(255,255,255,0.04)",
                cursor: "pointer",
                color: l.code === lang ? "var(--color-gold)" : "#ccc",
                fontFamily: "var(--font-body)",
                fontSize: "0.9rem",
                transition: "background 0.2s",
                textAlign: "left",
              }}
            >
              <span style={{ fontSize: "1.2rem" }}>{l.flag}</span>
              <span>{l.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

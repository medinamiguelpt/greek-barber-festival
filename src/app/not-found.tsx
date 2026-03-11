"use client";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageContext";

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "0 24px",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "8rem",
          fontWeight: 700,
          color: "var(--color-gold)",
          lineHeight: 1,
          margin: 0,
          opacity: 0.25,
        }}
      >
        404
      </p>
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "2rem",
          color: "var(--text-primary)",
          marginTop: 16,
          marginBottom: 12,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
        }}
      >
        {t("coming_soon")}
      </h1>
      <p style={{ color: "var(--text-muted)", marginBottom: 40, maxWidth: 400 }}>
        {t("home_hero_subtitle")}
      </p>
      <Link
        href="/"
        style={{
          display: "inline-block",
          background: "var(--color-gold)",
          color: "#000",
          fontFamily: "var(--font-display)",
          fontWeight: 600,
          fontSize: "0.85rem",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          textDecoration: "none",
          padding: "14px 36px",
          borderRadius: 4,
          transition: "opacity 0.2s",
        }}
      >
        ← Home
      </Link>
    </section>
  );
}

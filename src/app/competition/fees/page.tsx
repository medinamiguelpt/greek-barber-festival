"use client";
import Link from "next/link";
import PageBanner from "@/components/PageBanner";
import { useLanguage } from "@/components/LanguageContext";

export default function FeesPage() {
  const { t } = useLanguage();
  return (
    <>
      <PageBanner title={t("fees_title")} image="https://static.wixstatic.com/media/335ee3_a59bf4ba5f294fcb81e4b0cf0de54aab~mv2.jpg/v1/fill/w_1920,h_600,al_c,q_80,enc_avif,quality_auto/335ee3_a59bf4ba5f294fcb81e4b0cf0de54aab~mv2.jpg" />
      <section style={{ padding: "80px 24px", maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
        <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem", marginBottom: 30 }}>{t("fees_desc")}</p>
        <Link href="/tickets/competition-fee" className="btn-gold" style={{ textDecoration: "none", display: "inline-block" }}>{t("fees_link")}</Link>
      </section>
    </>
  );
}

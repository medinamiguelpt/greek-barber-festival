"use client";
import Link from "next/link";
import PageBanner from "@/components/PageBanner";
import Reveal from "@/components/Reveal";
import { useLanguage } from "@/components/LanguageContext";

export default function TicketsPage() {
  const { t } = useLanguage();
  return (
    <>
      <PageBanner title={t("tickets_title")} image="https://static.wixstatic.com/media/335ee3_a59bf4ba5f294fcb81e4b0cf0de54aab~mv2.jpg/v1/fill/w_1920,h_600,al_c,q_80,enc_avif,quality_auto/335ee3_a59bf4ba5f294fcb81e4b0cf0de54aab~mv2.jpg" />
      <section style={{ padding: "80px 24px", maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: 30 }}>
          <Reveal>
            <Link href="/tickets/general-admission" className="card-hover" style={{ display: "block", textDecoration: "none", background: "var(--bg-card)", borderRadius: 16, padding: "40px 32px", border: "1px solid rgba(200,168,78,0.15)", textAlign: "center" }}>
              <h2 className="gold-text" style={{ fontSize: "1.5rem", marginBottom: 12 }}>{t("tickets_general")}</h2>
              <p style={{ color: "var(--text-muted)", marginBottom: 20, fontSize: "0.95rem" }}>{t("tickets_prof_students")}</p>
              <div style={{ fontSize: "2.5rem", fontFamily: "var(--font-display)", color: "var(--color-gold)", marginBottom: 8 }}>€40+</div>
              <p style={{ color: "var(--text-faint)", fontSize: "0.85rem" }}>{t("presale_title")}</p>
              <div className="btn-gold" style={{ marginTop: 24, display: "inline-block" }}>{t("tickets_more")}</div>
            </Link>
          </Reveal>
          <Reveal delay={200}>
            <Link href="/tickets/competition-fee" className="card-hover" style={{ display: "block", textDecoration: "none", background: "var(--bg-card)", borderRadius: 16, padding: "40px 32px", border: "1px solid rgba(200,168,78,0.15)", textAlign: "center" }}>
              <h2 className="gold-text" style={{ fontSize: "1.5rem", marginBottom: 12 }}>{t("tickets_competition")}</h2>
              <p style={{ color: "var(--text-muted)", marginBottom: 20, fontSize: "0.95rem" }}>{t("prof_comp_title")} & {t("student_comp_fees")}</p>
              <div style={{ fontSize: "2.5rem", fontFamily: "var(--font-display)", color: "var(--color-gold)", marginBottom: 8 }}>€60+</div>
              <p style={{ color: "var(--text-faint)", fontSize: "0.85rem" }}>{t("tickets_cost_note")}</p>
              <div className="btn-gold" style={{ marginTop: 24, display: "inline-block" }}>{t("tickets_more")}</div>
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}

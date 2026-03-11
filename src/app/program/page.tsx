"use client";
import Link from "next/link";
import PageBanner from "@/components/PageBanner";
import Reveal from "@/components/Reveal";
import { useLanguage } from "@/components/LanguageContext";

export default function ProgramPage() {
  const { t } = useLanguage();
  return (
    <>
      <PageBanner title={t("program_title")} image="https://static.wixstatic.com/media/335ee3_a59bf4ba5f294fcb81e4b0cf0de54aab~mv2.jpg/v1/fill/w_1920,h_600,al_c,q_80,enc_avif,quality_auto/335ee3_a59bf4ba5f294fcb81e4b0cf0de54aab~mv2.jpg" />
      <section style={{ padding: "80px 24px", maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
        <Reveal>
          <Link href="/program/mainstage" className="card-hover" style={{ display: "block", textDecoration: "none", background: "var(--bg-card)", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(200,168,78,0.15)" }}>
            <div className="img-zoom" style={{ height: 300 }}>
              <img
                src="/mainstage-crowd.png"
                alt="Mainstage Schedule"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <div style={{ padding: "24px 32px" }}>
              <h2 className="gold-text" style={{ fontSize: "1.5rem", marginBottom: 8 }}>{t("program_mainstage")}</h2>
              <p style={{ color: "var(--text-muted)" }}>{t("program_stage_desc")}</p>
              <div className="btn-gold" style={{ marginTop: 20, display: "inline-block" }}>{t("program_stage_btn")}</div>
            </div>
          </Link>
        </Reveal>
      </section>
    </>
  );
}

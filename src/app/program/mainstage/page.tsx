"use client";
import PageBanner from "@/components/PageBanner";
import Reveal from "@/components/Reveal";
import { useLanguage } from "@/components/LanguageContext";

export default function MainstagePage() {
  const { t } = useLanguage();
  return (
    <>
      <PageBanner title={t("program_mainstage")} image="https://static.wixstatic.com/media/335ee3_e7b991fbc0574b84a9ba281b43204f88~mv2.jpg/v1/fill/w_1920,h_600,al_c,q_80,enc_avif,quality_auto/335ee3_e7b991fbc0574b84a9ba281b43204f88~mv2.jpg" />
      <section style={{ padding: "80px 24px", maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
        <Reveal>
          <h2 className="gold-text" style={{ fontSize: "1.8rem", marginBottom: 30 }}>{t("nav_mainstage").toUpperCase()}</h2>
        </Reveal>
        <Reveal delay={150}>
          <div style={{ borderRadius: 16, overflow: "hidden", border: "1px solid rgba(200,168,78,0.2)", marginBottom: 24, position: "relative" }}>
            <img
              src="/mainstage-crowd.png"
              alt="Mainstage Live"
              style={{ width: "100%", height: "auto", display: "block" }}
            />
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "60%", background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)" }} />
          </div>
        </Reveal>
        <Reveal delay={200}>
          <div style={{ background: "var(--bg-card)", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(200,168,78,0.15)" }}>
            <img
              src="https://static.wixstatic.com/media/335ee3_0cbc5cc783d9462e8a13a4ab6ce0a12d~mv2.jpg/v1/fill/w_900,h_600,al_c,q_80,enc_avif,quality_auto/335ee3_0cbc5cc783d9462e8a13a4ab6ce0a12d~mv2.jpg"
              alt="Schedule"
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        </Reveal>
        <Reveal delay={300}>
          <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginTop: 20, fontStyle: "italic" }}>
            {t("mainstage_note")}
          </p>
        </Reveal>
      </section>
    </>
  );
}

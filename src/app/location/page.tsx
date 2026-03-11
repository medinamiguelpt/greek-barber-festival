"use client";
import PageBanner from "@/components/PageBanner";
import Reveal from "@/components/Reveal";
import { useLanguage } from "@/components/LanguageContext";

export default function LocationPage() {
  const { t } = useLanguage();
  return (
    <>
      <PageBanner
        title={t("location_title")}
        image="https://static.wixstatic.com/media/335ee3_24d75e3edb9c451bb369b337d789e470~mv2.jpg/v1/fill/w_1920,h_600,al_c,q_80,enc_avif,quality_auto/335ee3_24d75e3edb9c451bb369b337d789e470~mv2.jpg"
      />
      <section style={{ padding: "60px 24px", maxWidth: 900, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem", lineHeight: 1.9, marginBottom: 12 }}>
              {t("location_desc1")}
            </p>
            <p style={{ color: "var(--color-gold)", fontSize: "1rem", marginBottom: 16 }}>
              {t("location_cartel")}
            </p>
            <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem", lineHeight: 1.9 }}>
              {t("location_desc2")}
            </p>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <a
              href="https://www.google.com/maps/place/%CE%9A%CE%9B%CE%A9%CE%A3%CE%A4%CE%91%CE%99+%CE%A0%CE%95%CE%A4%CE%91%CE%9B%CE%9F%CE%A5%CE%94%CE%91%CE%A3+%CE%91.%CE%95.%CE%92.%CE%95./@37.9887571,23.6831104,17z"
              target="_blank" rel="noopener noreferrer"
              className="btn-gold"
              style={{ display: "inline-block", textDecoration: "none" }}
            >
              {t("location_map_btn")}
            </a>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div style={{ background: "var(--bg-card)", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(200,168,78,0.2)" }}>
            <a
              href="https://www.google.com/maps/place/%CE%9A%CE%9B%CE%A9%CE%A3%CE%A4%CE%91%CE%99+%CE%A0%CE%95%CE%A4%CE%91%CE%9B%CE%9F%CE%A5%CE%94%CE%91%CE%A3+%CE%91.%CE%95.%CE%92.%CE%95./@37.9887571,23.6831104,17z"
              target="_blank" rel="noopener noreferrer"
              style={{ display: "block" }}
            >
              <img
                src="https://static.wixstatic.com/media/335ee3_df38d55480fc4349b016e64cfe2fb19d~mv2.png/v1/fill/w_900,h_600,al_c,q_85,enc_avif,quality_auto/Screenshot%202026-02-11%20230716.png"
                alt="Map Location"
                style={{ width: "100%", height: "auto" }}
              />
            </a>
            <div style={{ padding: "32px", textAlign: "center" }}>
              <h2 style={{ color: "var(--text-primary)", fontSize: "1.3rem", marginBottom: 8 }}>{t("location_date")}</h2>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 8 }}>
                <h3 style={{ color: "var(--color-gold)", fontSize: "1.1rem", fontWeight: 400 }}>&quot;Klostai Petaloda&quot;</h3>
                <img src="https://static.wixstatic.com/media/335ee3_8bbc727aac9149779115e8f126a96b37~mv2.png/v1/fill/w_68,h_52,al_c,q_85,enc_avif,quality_auto/%CF%80%CE%B5%CF%842.png" alt="Butterfly" style={{ height: 24 }} />
              </div>
              <p style={{ color: "var(--text-muted)", marginBottom: 4 }}>{t("location_address")}</p>
              <p style={{ color: "var(--text-faint)", fontSize: "0.9rem" }}>{t("location_cartel")}</p>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
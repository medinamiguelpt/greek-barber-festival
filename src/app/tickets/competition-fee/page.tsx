"use client";
import PageBanner from "@/components/PageBanner";
import Reveal from "@/components/Reveal";
import { useLanguage } from "@/components/LanguageContext";

export default function CompetitionFeePage() {
  const { t } = useLanguage();
  return (
    <>
      <PageBanner title={t("comp_fee_title")} image="https://static.wixstatic.com/media/335ee3_a59bf4ba5f294fcb81e4b0cf0de54aab~mv2.jpg/v1/fill/w_1920,h_600,al_c,q_80,enc_avif,quality_auto/335ee3_a59bf4ba5f294fcb81e4b0cf0de54aab~mv2.jpg" />
      <section style={{ padding: "80px 24px", maxWidth: 900, margin: "0 auto" }}>

        <Reveal>
          <div style={{ background: "var(--bg-card)", borderRadius: 16, padding: "40px 32px", border: "1px solid rgba(200,168,78,0.2)", marginBottom: 30 }}>
            <h2 className="gold-text" style={{ fontSize: "1.5rem", marginBottom: 24, textAlign: "center" }}>{t("prof_comp_title")}</h2>
            <h3 style={{ color: "var(--text-secondary)", fontSize: "1.1rem", marginBottom: 16, textAlign: "center" }}>{t("one_topic_label")}</h3>
            <div style={{ display: "grid", gap: 12, marginBottom: 24 }}>
              {[
                "Old School Haircut",
                "Fastest Low Fade",
                "Freestyle – Total Look",
                "Modern Barbering",
              ].map((name) => (
                <div key={name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", background: "rgba(200,168,78,0.05)", borderRadius: 8 }}>
                  <span style={{ color: "var(--text-primary)" }}>{name}</span>
                  <span style={{ color: "var(--color-gold)", fontFamily: "var(--font-display)" }}>€80 + €150</span>
                </div>
              ))}
            </div>
            <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", textAlign: "center", marginBottom: 20 }}>{t("comp_single_note")}</p>
            <p style={{ color: "var(--color-gold)", textAlign: "center", fontFamily: "var(--font-display)", fontSize: "1rem" }}>{t("best_barber_note")}</p>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div style={{ background: "var(--bg-card)", borderRadius: 16, padding: "40px 32px", border: "1px solid rgba(200,168,78,0.2)", marginBottom: 30 }}>
            <h2 className="gold-text" style={{ fontSize: "1.3rem", marginBottom: 20, textAlign: "center" }}>{t("multi_topics_title")}</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
              {[
                { topics: `2 categories`, price: "€150 + €100", note: "" },
                { topics: `3 categories`, price: "€300", note: t("free_admission") },
                { topics: `4 categories`, price: "€300", note: t("free_admission") },
              ].map((item) => (
                <div key={item.topics} style={{ textAlign: "center", padding: 20, background: "rgba(200,168,78,0.08)", borderRadius: 12, border: "1px solid rgba(200,168,78,0.15)" }}>
                  <h3 style={{ color: "var(--color-gold)", fontSize: "1rem" }}>{item.topics}</h3>
                  <div style={{ fontSize: "1.8rem", fontFamily: "var(--font-display)", color: "var(--text-primary)", margin: "8px 0" }}>{item.price}</div>
                  {item.note && <p style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>{item.note}</p>}
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={250}>
          <div style={{ background: "var(--bg-card)", borderRadius: 16, padding: "40px 32px", border: "1px solid rgba(200,168,78,0.2)", marginBottom: 30 }}>
            <h2 className="gold-text" style={{ fontSize: "1.3rem", marginBottom: 20, textAlign: "center" }}>{t("student_comp_fees")}</h2>
            <div style={{ textAlign: "center", padding: 20, background: "rgba(200,168,78,0.08)", borderRadius: 12 }}>
              <h3 style={{ color: "var(--color-gold)", fontSize: "1rem" }}>2 categories</h3>
              <div style={{ fontSize: "2rem", fontFamily: "var(--font-display)", color: "var(--text-primary)", margin: "8px 0" }}>€60</div>
              <p style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>{t("free_admission")}</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={300}>
          <div style={{ background: "rgba(200,168,78,0.05)", borderRadius: 12, padding: "20px 24px", marginBottom: 30 }}>
            <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", lineHeight: 1.8 }}>{t("comp_fee_notes")}</p>
          </div>
        </Reveal>

        <Reveal delay={350}>
          <div style={{ background: "var(--bg-card)", borderRadius: 16, padding: "40px 32px", border: "1px solid rgba(200,168,78,0.2)" }}>
            <h2 className="gold-text" style={{ fontSize: "1.5rem", marginBottom: 30, textAlign: "center" }}>{t("student_registration")}</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 16 }}>
              <input className="form-input" placeholder={t("form_name")} />
              <input className="form-input" placeholder={t("form_surname")} />
              <input className="form-input" type="email" placeholder="Email" />
              <input className="form-input" placeholder={t("form_phone")} />
              <input className="form-input" placeholder={t("form_address")} />
              <input className="form-input" placeholder={t("form_city")} />
              <input className="form-input" placeholder={t("form_postal")} />
              <div className="form-input" style={{ height: "auto", display: "flex", flexDirection: "column", gap: 10 }}>
                <p style={{ color: "var(--text-muted)", fontSize: "0.8rem", marginBottom: 4 }}>{t("form_category")}:</p>
                {[
                  { value: "oldschool", label: "Old School HairCut" },
                  { value: "freestyle", label: "Freestyle/Total Look" },
                  { value: "modern", label: "Modern Barbering" },
                  { value: "fastest", label: "Fastest Low Fade" },
                ].map((opt) => (
                  <label key={opt.value} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", color: "var(--text-primary)", fontSize: "0.9rem" }}>
                    <input type="checkbox" value={opt.value} style={{ accentColor: "var(--color-gold)", width: 16, height: 16 }} />
                    {opt.label}
                  </label>
                ))}
              </div>
            </div>
            <div style={{ marginTop: 16, display: "flex", alignItems: "flex-start", gap: 8 }}>
              <input type="checkbox" id="terms" style={{ marginTop: 4, accentColor: "var(--color-gold)" }} />
              <label htmlFor="terms" style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>{t("student_terms")}</label>
            </div>
            <div style={{ textAlign: "center", marginTop: 24 }}>
              <button className="btn-gold">{t("register_now")}</button>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}

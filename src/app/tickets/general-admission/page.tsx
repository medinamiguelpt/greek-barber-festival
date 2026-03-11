"use client";
import PageBanner from "@/components/PageBanner";
import Reveal from "@/components/Reveal";
import { useLanguage } from "@/components/LanguageContext";

export default function GeneralAdmissionPage() {
  const { t } = useLanguage();
  return (
    <>
      <PageBanner title={t("general_admission_title")} image="https://static.wixstatic.com/media/335ee3_a59bf4ba5f294fcb81e4b0cf0de54aab~mv2.jpg/v1/fill/w_1920,h_600,al_c,q_80,enc_avif,quality_auto/335ee3_a59bf4ba5f294fcb81e4b0cf0de54aab~mv2.jpg" />
      <section style={{ padding: "80px 24px", maxWidth: 900, margin: "0 auto" }}>

        <Reveal>
          <div style={{ background: "var(--bg-card)", borderRadius: 16, padding: "40px 32px", border: "1px solid rgba(200,168,78,0.2)", marginBottom: 30 }}>
            <h2 className="gold-text" style={{ fontSize: "1.5rem", marginBottom: 24, textAlign: "center" }}>{t("presale_title")}</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 20 }}>
              <div style={{ textAlign: "center", padding: 20, background: "rgba(200,168,78,0.05)", borderRadius: 12 }}>
                <div style={{ fontSize: "2.5rem", fontFamily: "var(--font-display)", color: "var(--color-gold)" }}>€160</div>
                <h3 style={{ color: "var(--text-primary)", fontSize: "1rem", margin: "8px 0 4px" }}>{t("professionals")}</h3>
                <p style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>{t("prof_desc")}</p>
              </div>
              <div style={{ textAlign: "center", padding: 20, background: "rgba(200,168,78,0.05)", borderRadius: 12 }}>
                <div style={{ fontSize: "2.5rem", fontFamily: "var(--font-display)", color: "var(--color-gold)" }}>€40</div>
                <h3 style={{ color: "var(--text-primary)", fontSize: "1rem", margin: "8px 0 4px" }}>{t("students_label")}</h3>
                <p style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>{t("student_desc")}</p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div style={{ background: "var(--bg-card)", borderRadius: 16, padding: "40px 32px", border: "1px solid rgba(200,168,78,0.2)", marginBottom: 30 }}>
            <h2 className="gold-text" style={{ fontSize: "1.3rem", marginBottom: 20, textAlign: "center" }}>{t("crew_presale_title")}</h2>
            <p style={{ color: "var(--text-secondary)", textAlign: "center", marginBottom: 16 }}>{t("special_prices")}</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 20 }}>
              <div style={{ textAlign: "center", padding: 20, background: "rgba(200,168,78,0.08)", borderRadius: 12, border: "1px solid rgba(200,168,78,0.15)" }}>
                <h3 style={{ color: "var(--color-gold)", fontSize: "1rem" }}>3+ {t("per_person").replace("/ ", "")}</h3>
                <p style={{ color: "var(--text-primary)", fontSize: "1.2rem", margin: "8px 0" }}>€160 {t("per_person")}</p>
                <p style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>+ 1x &quot;Marras Hair&quot; bonus</p>
              </div>
              <div style={{ textAlign: "center", padding: 20, background: "rgba(200,168,78,0.08)", borderRadius: 12, border: "1px solid rgba(200,168,78,0.15)" }}>
                <h3 style={{ color: "var(--color-gold)", fontSize: "1rem" }}>5+ {t("per_person").replace("/ ", "")}</h3>
                <p style={{ color: "var(--text-primary)", fontSize: "1.2rem", margin: "8px 0" }}>€150 {t("per_person")}</p>
                <p style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>+ 2x &quot;Marras Hair&quot; bonus</p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div style={{ background: "var(--bg-card)", borderRadius: 16, padding: "40px 32px", border: "1px solid rgba(200,168,78,0.2)", marginBottom: 30 }}>
            <h2 className="gold-text" style={{ fontSize: "1.5rem", marginBottom: 24, textAlign: "center" }}>{t("tickets_general")}</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 20 }}>
              <div style={{ textAlign: "center", padding: 20, background: "rgba(200,168,78,0.05)", borderRadius: 12 }}>
                <div style={{ fontSize: "2.5rem", fontFamily: "var(--font-display)", color: "var(--color-gold)" }}>€180</div>
                <h3 style={{ color: "var(--text-primary)", fontSize: "1rem", margin: "8px 0 4px" }}>{t("professionals")}</h3>
                <p style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>{t("prof_desc")}</p>
              </div>
              <div style={{ textAlign: "center", padding: 20, background: "rgba(200,168,78,0.05)", borderRadius: 12 }}>
                <div style={{ fontSize: "2.5rem", fontFamily: "var(--font-display)", color: "var(--color-gold)" }}>€50</div>
                <h3 style={{ color: "var(--text-primary)", fontSize: "1rem", margin: "8px 0 4px" }}>{t("students_label")}</h3>
                <p style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>{t("student_desc")}</p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={300}>
          <div style={{ background: "var(--bg-card)", borderRadius: 16, padding: "40px 32px", border: "1px solid rgba(200,168,78,0.2)", marginBottom: 30 }}>
            <h2 className="gold-text" style={{ fontSize: "1.3rem", marginBottom: 20, textAlign: "center" }}>{t("crew_general_title")}</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 20 }}>
              <div style={{ textAlign: "center", padding: 20, background: "rgba(200,168,78,0.08)", borderRadius: 12, border: "1px solid rgba(200,168,78,0.15)" }}>
                <h3 style={{ color: "var(--color-gold)", fontSize: "1rem" }}>3+ {t("per_person").replace("/ ", "")}</h3>
                <p style={{ color: "var(--text-primary)", fontSize: "1.2rem", margin: "8px 0" }}>€180 {t("per_person")}</p>
                <p style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>+ 1x &quot;Marras Hair&quot; bonus</p>
              </div>
              <div style={{ textAlign: "center", padding: 20, background: "rgba(200,168,78,0.08)", borderRadius: 12, border: "1px solid rgba(200,168,78,0.15)" }}>
                <h3 style={{ color: "var(--color-gold)", fontSize: "1rem" }}>5+ {t("per_person").replace("/ ", "")}</h3>
                <p style={{ color: "var(--text-primary)", fontSize: "1.2rem", margin: "8px 0" }}>€180 {t("per_person")}</p>
                <p style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>+ 2x &quot;Marras Hair&quot; bonus</p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={350}>
          <p style={{ textAlign: "center", color: "var(--text-muted)", fontSize: "0.95rem", marginBottom: 30, padding: "16px", background: "rgba(200,168,78,0.05)", borderRadius: 8 }}>
            {t("companions_note")}
          </p>
        </Reveal>

        <Reveal delay={400}>
          <p style={{ textAlign: "center", color: "var(--text-muted)", marginBottom: 40 }}>
            {t("info_phones")} <strong style={{ color: "var(--text-secondary)" }}>27440-66437 — 6945977046 — 6936524834 — 6946466324</strong>
          </p>
        </Reveal>

        <Reveal delay={450}>
          <div style={{ background: "var(--bg-card)", borderRadius: 16, padding: "40px 32px", border: "1px solid rgba(200,168,78,0.2)" }}>
            <h2 className="gold-text" style={{ fontSize: "1.5rem", marginBottom: 30, textAlign: "center" }}>{t("form_title")}</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 16 }}>
              <input className="form-input" placeholder={t("form_name")} />
              <input className="form-input" placeholder={t("form_surname")} />
              <input className="form-input" type="email" placeholder="Email" />
              <input className="form-input" placeholder={t("form_phone")} />
              <input className="form-input" placeholder={t("form_postal")} />
              <input className="form-input" placeholder={t("form_address")} />
              <input className="form-input" placeholder={t("form_city")} />
              <select className="form-input">
                <option value="">{t("form_category")}</option>
                <option value="professional">{t("form_professional")}</option>
                <option value="student">{t("form_student_opt")}</option>
              </select>
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

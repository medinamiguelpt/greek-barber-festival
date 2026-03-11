"use client";
import PageBanner from "@/components/PageBanner";
import Reveal from "@/components/Reveal";
import { useLanguage, Language } from "@/components/LanguageContext";

const CONTENT: Record<Language, { desc: string; requirements: string[]; criteria: { name: string; points: string }[] }> = {
  el: {
    desc: "Το πιο γρήγορο και καθαρό low fade κούρεμα. Ταχύτητα και ακρίβεια σε 15 λεπτά.",
    requirements: ["Επιτρέπονται όλα τα εργαλεία.","Δεν επιτρέπεται το προ-κούρεμα.","Δεν επιτρέπεται η χρήση ζελέ και λακ."],
    criteria: [{ name: "Τεχνική εκτέλεση", points: "30 - 60 βαθμοί" },{ name: "Καθαρότητα κουρέματος", points: "25 - 50 βαθμοί" },{ name: "Ένωση γραμμών / Blending", points: "25 - 50 βαθμοί" },{ name: "Ταχύτητα / Speed", points: "15 - 30 βαθμοί" },{ name: "Εμφάνιση διαγωνιζόμενου", points: "5 - 10 βαθμοί" }],
  },
  en: {
    desc: "The fastest and cleanest low fade haircut. Speed and precision in 15 minutes.",
    requirements: ["All tools are allowed.","Pre-cutting is not allowed.","Gel and hairspray are not allowed."],
    criteria: [{ name: "Technical Execution", points: "30 - 60 pts" },{ name: "Cleanliness", points: "25 - 50 pts" },{ name: "Blending", points: "25 - 50 pts" },{ name: "Speed", points: "15 - 30 pts" },{ name: "Competitor appearance", points: "5 - 10 pts" }],
  },
  es: {
    desc: "El corte low fade más rápido y limpio. Velocidad y precisión en 15 minutos.",
    requirements: ["Se permiten todas las herramientas.","No se permite el pre-corte.","No se permite gel ni laca."],
    criteria: [{ name: "Ejecución técnica", points: "30 - 60 pts" },{ name: "Limpieza", points: "25 - 50 pts" },{ name: "Blending", points: "25 - 50 pts" },{ name: "Velocidad", points: "15 - 30 pts" },{ name: "Apariencia", points: "5 - 10 pts" }],
  },
  ar: {
    desc: "أسرع وأنظف قصة low fade. سرعة ودقة في 15 دقيقة.",
    requirements: ["جميع الأدوات مسموح بها.","لا يُسمح بالقص المسبق.","لا يُسمح باستخدام الجل أو البخاخ."],
    criteria: [{ name: "الأداء التقني", points: "30 - 60 نقطة" },{ name: "النظافة", points: "25 - 50 نقطة" },{ name: "المزج", points: "25 - 50 نقطة" },{ name: "السرعة", points: "15 - 30 نقطة" },{ name: "مظهر المتسابق", points: "5 - 10 نقاط" }],
  },
  pt: {
    desc: "O corte low fade mais rápido e limpo. Velocidade e precisão em 15 minutos.",
    requirements: ["Todas as ferramentas são permitidas.","Pré-corte não é permitido.","Gel e laca não são permitidos."],
    criteria: [{ name: "Execução técnica", points: "30 - 60 pts" },{ name: "Limpeza", points: "25 - 50 pts" },{ name: "Blending", points: "25 - 50 pts" },{ name: "Velocidade", points: "15 - 30 pts" },{ name: "Aparência", points: "5 - 10 pts" }],
  },
  de: {
    desc: "Der schnellste und sauberste Low-Fade-Haarschnitt. Geschwindigkeit und Präzision in 15 Minuten.",
    requirements: ["Alle Werkzeuge erlaubt.","Vorschneiden nicht erlaubt.","Gel und Haarspray nicht erlaubt."],
    criteria: [{ name: "Technische Ausführung", points: "30 - 60 Pkt." },{ name: "Sauberkeit", points: "25 - 50 Pkt." },{ name: "Blending", points: "25 - 50 Pkt." },{ name: "Geschwindigkeit", points: "15 - 30 Pkt." },{ name: "Erscheinung", points: "5 - 10 Pkt." }],
  },
};

export default function FastestLowFadePage() {
  const { t, lang } = useLanguage();
  const c = CONTENT[lang] || CONTENT.el;
  return (
    <>
      <PageBanner title="FASTEST LOW FADE" image="https://static.wixstatic.com/media/335ee3_879a54d5b50943ce8567bf889fd1498f~mv2.jpg/v1/fill/w_1920,h_600,al_c,q_80,enc_avif,quality_auto/335ee3_879a54d5b50943ce8567bf889fd1498f~mv2.jpg" />
      <section style={{ padding: "80px 24px", maxWidth: 800, margin: "0 auto" }}>
        <Reveal>
          <div style={{ background: "var(--bg-card)", borderRadius: 16, padding: "40px 32px", border: "1px solid rgba(200,168,78,0.2)", marginBottom: 30 }}>
            <h2 className="gold-text" style={{ fontSize: "1.5rem", marginBottom: 8 }}>3. Fastest Low Fade</h2>
            <p style={{ color: "var(--color-gold)", fontFamily: "var(--font-display)", fontSize: "1rem", marginBottom: 20 }}>{t("comp_time")} 15 min</p>
            <h3 style={{ color: "var(--text-primary)", fontSize: "1.1rem", marginBottom: 12 }}>{t("comp_description")}</h3>
            <p style={{ color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: 24 }}>{c.desc}</p>
            <h3 style={{ color: "var(--text-primary)", fontSize: "1.1rem", marginBottom: 12 }}>{t("comp_requirements")}</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {c.requirements.map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 12 }}>
                  <span style={{ color: "var(--color-gold)", fontFamily: "var(--font-display)", minWidth: 20 }}>{i + 1})</span>
                  <span style={{ color: "var(--text-secondary)" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
        <Reveal delay={200}>
          <div style={{ background: "var(--bg-card)", borderRadius: 16, padding: "40px 32px", border: "1px solid rgba(200,168,78,0.2)" }}>
            <h3 style={{ color: "var(--text-primary)", fontSize: "1.1rem", marginBottom: 16 }}>{t("comp_criteria")}</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {c.criteria.map((cr, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "12px 16px", background: "rgba(200,168,78,0.05)", borderRadius: 8, flexWrap: "wrap", gap: 8 }}>
                  <span style={{ color: "var(--text-secondary)" }}>{i + 1}) {cr.name}</span>
                  <span style={{ color: "var(--color-gold)", fontFamily: "var(--font-display)" }}>{cr.points}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}

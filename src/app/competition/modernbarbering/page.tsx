"use client";
import PageBanner from "@/components/PageBanner";
import Reveal from "@/components/Reveal";
import { useLanguage, Language } from "@/components/LanguageContext";

const CONTENT: Record<Language, { desc: string; requirements: string[]; criteria: { name: string; points: string }[] }> = {
  el: {
    desc: "Θα διαγωνιστείς σε modern barbering κούρεμα της επιλογής σου. Σύγχρονες τεχνικές, fade, texture και σύγχρονο styling.",
    requirements: ["Επιτρέπονται όλα τα εργαλεία.","Δεν επιτρέπεται το προ-κούρεμα.","Δεν επιτρέπεται η χρήση ζελέ και λακ.","Επιτρέπεται η προετοιμασία της γενειάδας ή του μουστακιού."],
    criteria: [{ name: "Τεχνική εκτέλεση", points: "30 - 60 βαθμοί" },{ name: "Καθαρότητα κουρέματος", points: "25 - 50 βαθμοί" },{ name: "Styling", points: "20 - 40 βαθμοί" },{ name: "Ένωση γραμμών / Blending", points: "15 - 30 βαθμοί" },{ name: "Εμφάνιση διαγωνιζόμενου", points: "5 - 10 βαθμοί" },{ name: "Εμφάνιση μοντέλου", points: "5 - 10 βαθμοί" }],
  },
  en: {
    desc: "Compete in a modern barbering haircut of your choice. Modern techniques, fade, texture and contemporary styling.",
    requirements: ["All tools are allowed.","Pre-cutting is not allowed.","Gel and hairspray are not allowed.","Beard or mustache preparation is allowed."],
    criteria: [{ name: "Technical Execution", points: "30 - 60 pts" },{ name: "Cleanliness", points: "25 - 50 pts" },{ name: "Styling", points: "20 - 40 pts" },{ name: "Blending", points: "15 - 30 pts" },{ name: "Competitor appearance", points: "5 - 10 pts" },{ name: "Model appearance", points: "5 - 10 pts" }],
  },
  es: {
    desc: "Compite en un corte de modern barbering de tu elección. Técnicas modernas, fade, textura y styling contemporáneo.",
    requirements: ["Se permiten todas las herramientas.","No se permite el pre-corte.","No se permite gel ni laca.","Se permite preparar barba o bigote."],
    criteria: [{ name: "Ejecución técnica", points: "30 - 60 pts" },{ name: "Limpieza", points: "25 - 50 pts" },{ name: "Styling", points: "20 - 40 pts" },{ name: "Blending", points: "15 - 30 pts" },{ name: "Apariencia competidor", points: "5 - 10 pts" },{ name: "Apariencia modelo", points: "5 - 10 pts" }],
  },
  ar: {
    desc: "تنافس في قصة شعر modern barbering من اختيارك. تقنيات حديثة، fade، texture وتصفيف معاصر.",
    requirements: ["جميع الأدوات مسموح بها.","لا يُسمح بالقص المسبق.","لا يُسمح باستخدام الجل أو البخاخ.","يُسمح بتحضير اللحية أو الشارب."],
    criteria: [{ name: "الأداء التقني", points: "30 - 60 نقطة" },{ name: "نظافة القصة", points: "25 - 50 نقطة" },{ name: "التصفيف", points: "20 - 40 نقطة" },{ name: "المزج", points: "15 - 30 نقطة" },{ name: "مظهر المتسابق", points: "5 - 10 نقاط" },{ name: "مظهر الموديل", points: "5 - 10 نقاط" }],
  },
  pt: {
    desc: "Compita num corte de modern barbering à sua escolha. Técnicas modernas, fade, textura e styling contemporâneo.",
    requirements: ["Todas as ferramentas são permitidas.","Pré-corte não é permitido.","Gel e laca não são permitidos.","Preparação de barba ou bigode é permitida."],
    criteria: [{ name: "Execução técnica", points: "30 - 60 pts" },{ name: "Limpeza", points: "25 - 50 pts" },{ name: "Styling", points: "20 - 40 pts" },{ name: "Blending", points: "15 - 30 pts" },{ name: "Aparência competidor", points: "5 - 10 pts" },{ name: "Aparência modelo", points: "5 - 10 pts" }],
  },
  de: {
    desc: "Treten Sie in einem Modern-Barbering-Haarschnitt Ihrer Wahl an. Moderne Techniken, Fade, Textur und zeitgenössisches Styling.",
    requirements: ["Alle Werkzeuge erlaubt.","Vorschneiden nicht erlaubt.","Gel und Haarspray nicht erlaubt.","Bart-/Schnurrbartpflege erlaubt."],
    criteria: [{ name: "Technische Ausführung", points: "30 - 60 Pkt." },{ name: "Sauberkeit", points: "25 - 50 Pkt." },{ name: "Styling", points: "20 - 40 Pkt." },{ name: "Blending", points: "15 - 30 Pkt." },{ name: "Erscheinung Teilnehmer", points: "5 - 10 Pkt." },{ name: "Erscheinung Modell", points: "5 - 10 Pkt." }],
  },
};

export default function ModernBarberingPage() {
  const { t, lang } = useLanguage();
  const c = CONTENT[lang] || CONTENT.el;
  return (
    <>
      <PageBanner title="MODERN BARBERING" image="https://static.wixstatic.com/media/335ee3_43161998c8704bcaae5f3c3285586902~mv2.jpg/v1/fill/w_1920,h_600,al_c,q_80,enc_avif,quality_auto/335ee3_43161998c8704bcaae5f3c3285586902~mv2.jpg" />
      <section style={{ padding: "80px 24px", maxWidth: 800, margin: "0 auto" }}>
        <Reveal>
          <div style={{ background: "var(--bg-card)", borderRadius: 16, padding: "40px 32px", border: "1px solid rgba(200,168,78,0.2)", marginBottom: 30 }}>
            <h2 className="gold-text" style={{ fontSize: "1.5rem", marginBottom: 8 }}>2. Modern Barbering</h2>
            <p style={{ color: "var(--color-gold)", fontFamily: "var(--font-display)", fontSize: "1rem", marginBottom: 20 }}>{t("comp_time")} 60 min</p>
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
            <div style={{ marginTop: 20, padding: 16, background: "rgba(200,168,78,0.1)", borderRadius: 8, textAlign: "center" }}>
              <p style={{ color: "var(--color-gold)", fontFamily: "var(--font-display)" }}>{t("bonus_note")}</p>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}

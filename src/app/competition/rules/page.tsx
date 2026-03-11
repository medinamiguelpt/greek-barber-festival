"use client";
import PageBanner from "@/components/PageBanner";
import Reveal from "@/components/Reveal";
import { useLanguage, Language } from "@/components/LanguageContext";

const RULES: Record<Language, string[]> = {
  el: [
    "Επιβεβαίωση συμμετοχής πριν την έναρξη, παρόντες 1 ώρα πριν.",
    "Αφορά επαγγελματίες κομμωτές/κουρείς και σπουδαστές. Αποκλείονται χωρίς επαγγελματική στέγη.",
    "Εγκυρότητα μέσω φόρμας εγγραφής.",
    "Δηλώνοντας συμμετοχή παραχωρούν δικαίωμα εκμετάλλευσης οπτικοακουστικού υλικού.",
    "Κατάλληλη ενδυμασία.",
    "Υπεύθυνοι για εργαλεία, διοργανωτές χωρίς ευθύνη.",
    "Τουλάχιστον 10 συμμετέχοντες ανά θέμα, αλλιώς ακυρώνεται.",
    "Αποκλεισμός αν δεν προσέλθει 15 λεπτά πριν. Χρήματα δεν επιστρέφονται.",
    "Διοργανωτές διατηρούν δικαίωμα τροποποίησης κανονισμών.",
  ],
  en: [
    "Confirm participation before start; be present 1 hour in advance.",
    "Open to professional barbers/stylists and students. Those without a professional establishment are excluded.",
    "Valid only through completed registration form.",
    "By registering, participants grant rights to use audiovisual material.",
    "Appropriate dress code required.",
    "Competitors are responsible for their tools; organizers accept no liability.",
    "At least 10 contestants per category required, otherwise it is cancelled.",
    "Exclusion if not present 15 minutes before start. No refunds.",
    "Organizers reserve the right to modify the rules.",
  ],
  es: [
    "Confirmar participación antes del inicio; estar presente 1 hora antes.",
    "Abierto a barberos/estilistas profesionales y estudiantes. Excluidos quienes no tengan establecimiento profesional.",
    "Válido solo mediante formulario de inscripción completado.",
    "Al inscribirse, los participantes otorgan derechos de uso de material audiovisual.",
    "Se requiere vestimenta adecuada.",
    "Los competidores son responsables de sus herramientas; los organizadores no aceptan responsabilidad.",
    "Se requieren al menos 10 concursantes por categoría, de lo contrario se cancela.",
    "Exclusión si no está presente 15 minutos antes. Sin reembolsos.",
    "Los organizadores se reservan el derecho a modificar las normas.",
  ],
  ar: [
    "تأكيد المشاركة قبل البدء؛ الحضور قبل ساعة واحدة.",
    "مفتوح للحلاقين/المصففين المحترفين والطلاب. يُستبعد من لا يمتلك منشأة مهنية.",
    "صالح فقط من خلال استمارة التسجيل المكتملة.",
    "بالتسجيل، يمنح المشاركون حقوق استخدام المواد المرئية والمسموعة.",
    "يُشترط ارتداء الزي المناسب.",
    "المتنافسون مسؤولون عن أدواتهم؛ المنظمون لا يتحملون أي مسؤولية.",
    "يُشترط وجود 10 متنافسين على الأقل لكل فئة، وإلا يُلغى.",
    "الاستبعاد إذا لم يحضر قبل 15 دقيقة. لا استرداد للأموال.",
    "يحتفظ المنظمون بحق تعديل القواعد.",
  ],
  pt: [
    "Confirmar participação antes do início; estar presente 1 hora antes.",
    "Aberto a barbeiros/cabeleireiros profissionais e estudantes. Excluídos sem estabelecimento profissional.",
    "Válido apenas mediante formulário de inscrição preenchido.",
    "Ao inscrever-se, os participantes concedem direitos de uso de material audiovisual.",
    "Vestuário adequado é obrigatório.",
    "Os competidores são responsáveis pelas suas ferramentas; os organizadores não aceitam responsabilidade.",
    "São necessários pelo menos 10 concorrentes por categoria, caso contrário é cancelada.",
    "Exclusão se não estiver presente 15 minutos antes. Sem reembolsos.",
    "Os organizadores reservam-se o direito de modificar as regras.",
  ],
  de: [
    "Teilnahme vor Beginn bestätigen; eine Stunde vor Start anwesend sein.",
    "Offen für professionelle Friseure/Barbiere und Schüler. Ohne professionellen Betrieb ausgeschlossen.",
    "Nur durch ausgefülltes Anmeldeformular gültig.",
    "Durch die Anmeldung gewähren Teilnehmer das Recht zur Nutzung audiovisuellen Materials.",
    "Angemessene Kleidung erforderlich.",
    "Teilnehmer sind für ihre Werkzeuge verantwortlich; Veranstalter übernehmen keine Haftung.",
    "Mindestens 10 Teilnehmer pro Kategorie erforderlich, sonst wird diese abgesagt.",
    "Ausschluss, wenn nicht 15 Minuten vorher anwesend. Keine Rückerstattung.",
    "Die Veranstalter behalten sich das Recht vor, die Regeln zu ändern.",
  ],
};

export default function RulesPage() {
  const { t, lang } = useLanguage();
  const rules = RULES[lang] || RULES.el;
  // Always also show the Greek version as the official version
  const showBilingual = lang !== "el";

  return (
    <>
      <PageBanner title={t("rules_title")} image="https://static.wixstatic.com/media/335ee3_a59bf4ba5f294fcb81e4b0cf0de54aab~mv2.jpg/v1/fill/w_1920,h_600,al_c,q_80,enc_avif,quality_auto/335ee3_a59bf4ba5f294fcb81e4b0cf0de54aab~mv2.jpg" />
      <section style={{ padding: "80px 24px", maxWidth: 900, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: showBilingual ? "repeat(auto-fit, minmax(380px, 1fr))" : "1fr", gap: 30 }}>
          {showBilingual && (
            <Reveal>
              <div style={{ background: "var(--bg-card)", borderRadius: 16, padding: "40px 32px", border: "1px solid rgba(200,168,78,0.2)" }}>
                <h2 className="gold-text" style={{ fontSize: "1.3rem", marginBottom: 20 }}>Ελληνικά</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {RULES.el.map((rule, i) => (
                    <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                      <span style={{ color: "var(--color-gold)", fontFamily: "var(--font-display)", minWidth: 20 }}>{i + 1}.</span>
                      <span style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.6 }}>{rule}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          )}
          <Reveal delay={showBilingual ? 200 : 0}>
            <div style={{ background: "var(--bg-card)", borderRadius: 16, padding: "40px 32px", border: "1px solid rgba(200,168,78,0.2)" }}>
              {showBilingual && (
                <h2 className="gold-text" style={{ fontSize: "1.3rem", marginBottom: 20 }}>
                  {lang === "en" ? "English" : lang === "es" ? "Español" : lang === "ar" ? "العربية" : lang === "pt" ? "Português" : lang === "de" ? "Deutsch" : ""}
                </h2>
              )}
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {rules.map((rule, i) => (
                  <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <span style={{ color: "var(--color-gold)", fontFamily: "var(--font-display)", minWidth: 20 }}>{i + 1}.</span>
                    <span style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.6 }}>{rule}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

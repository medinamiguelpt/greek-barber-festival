"use client";
import PageBanner from "@/components/PageBanner";
import Reveal from "@/components/Reveal";
import Link from "next/link";
import { useLanguage, Language } from "@/components/LanguageContext";

const NOTES: Record<Language, string[]> = {
  el: [
    "Ακολουθούμε τα διεθνή πρότυπα των barber events. Δεν θα έχουμε καθρέπτες αυξάνοντας τον βαθμό δυσκολίας.",
    "Χρειάζονται 2 μοντέλα για την συμμετοχή σας στον διαγωνισμό.",
    "Τα μοντέλα χωρίς σχέση με τον κλάδο αποχωρούν μετά τη λήξη του διαγωνισμού.",
    "Μπορείτε να κλείσετε ραντεβού με τους φωτογράφους του φεστιβάλ σε προνομιακή τιμή.",
    "Η διοργάνωση δεν φέρει ευθύνη για απώλειες ή ζημιές των εργαλείων σας.",
    "Υποχρεωτική η βεβαίωση σπουδών από την γραμματεία της σχολής σας.",
    "Δεν επιτρέπονται τα διακριτικά σχολών κατά τη διάρκεια του διαγωνισμού.",
    "Η διοργάνωση μπορεί να αναδημοσιεύσει φωτογραφίες για διαφημιστικούς λόγους.",
  ],
  en: [
    "We follow international barber event standards. There will be no mirrors, increasing the difficulty level.",
    "2 models are required to participate in the competition.",
    "Models unrelated to the industry must leave after the competition ends.",
    "You can book an appointment with the festival photographers at a special rate.",
    "The organizers are not responsible for any loss or damage to your tools.",
    "A school enrollment certificate from your school's registrar is mandatory.",
    "School insignia are not permitted during the competition.",
    "The organizers may republish your photos and models' photos for promotional purposes.",
  ],
  es: [
    "Seguimos los estándares internacionales de eventos barber. No habrá espejos, aumentando el nivel de dificultad.",
    "Se necesitan 2 modelos para participar en la competición.",
    "Los modelos sin relación con el sector deben salir tras finalizar la competición.",
    "Puede reservar una cita con los fotógrafos del festival a precio especial.",
    "Los organizadores no son responsables de pérdidas o daños en sus herramientas.",
    "El certificado de matrícula escolar es obligatorio.",
    "No se permite llevar insignias escolares durante la competición.",
    "Los organizadores pueden republicar fotos con fines promocionales.",
  ],
  ar: [
    "نتبع المعايير الدولية لفعاليات الحلاقة. لن تكون هناك مرايا لزيادة مستوى الصعوبة.",
    "مطلوب 2 موديل للمشاركة في المسابقة.",
    "يجب على الموديلات غير المرتبطة بالقطاع المغادرة بعد انتهاء المسابقة.",
    "يمكنكم حجز موعد مع مصوري المهرجان بسعر مميز.",
    "المنظمون غير مسؤولين عن فقدان أو تلف أدواتكم.",
    "شهادة التسجيل المدرسي إلزامية.",
    "لا يُسمح بالشعارات المدرسية خلال المسابقة.",
    "يحق للمنظمين إعادة نشر الصور لأغراض ترويجية.",
  ],
  pt: [
    "Seguimos os padrões internacionais de eventos barber. Não haverá espelhos, aumentando o nível de dificuldade.",
    "São necessários 2 modelos para participar na competição.",
    "Modelos sem relação com o setor devem sair após o fim da competição.",
    "Pode marcar uma sessão com os fotógrafos do festival a preço especial.",
    "Os organizadores não são responsáveis por perdas ou danos nas suas ferramentas.",
    "O comprovativo de matrícula escolar é obrigatório.",
    "Não são permitidos emblemas escolares durante a competição.",
    "Os organizadores podem republicar fotos para fins promocionais.",
  ],
  de: [
    "Wir folgen internationalen Barber-Event-Standards. Es wird keine Spiegel geben, was den Schwierigkeitsgrad erhöht.",
    "Für die Teilnahme am Wettbewerb sind 2 Modelle erforderlich.",
    "Modelle ohne Branchenbezug müssen nach Wettbewerbsende den Saal verlassen.",
    "Sie können einen Termin mit den Festival-Fotografen zu einem Sonderpreis buchen.",
    "Die Veranstalter haften nicht für Verlust oder Beschädigung Ihrer Werkzeuge.",
    "Eine Schulbescheinigung der Schulsekretärin ist Pflicht.",
    "Schulabzeichen sind während des Wettbewerbs nicht erlaubt.",
    "Die Veranstalter dürfen Fotos zu Werbezwecken veröffentlichen.",
  ],
};

export default function StudentCompetitionPage() {
  const { t, lang } = useLanguage();
  const notes = NOTES[lang] || NOTES.el;
  return (
    <>
      <PageBanner title={t("student_title")} image="https://static.wixstatic.com/media/335ee3_a59bf4ba5f294fcb81e4b0cf0de54aab~mv2.jpg/v1/fill/w_1920,h_600,al_c,q_80,enc_avif,quality_auto/335ee3_a59bf4ba5f294fcb81e4b0cf0de54aab~mv2.jpg" />
      <section style={{ padding: "80px 24px", maxWidth: 900, margin: "0 auto" }}>
        <Reveal>
          <div style={{ background: "var(--bg-card)", borderRadius: 16, padding: "40px 32px", border: "1px solid rgba(200,168,78,0.2)", marginBottom: 30 }}>
            <h2 className="gold-text" style={{ fontSize: "1.5rem", marginBottom: 24, textAlign: "center" }}>{t("student_title")}</h2>
            <p style={{ color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: 12 }}>{t("student_intro")}</p>
            <p style={{ color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: 12 }}>{t("student_eligibility")}</p>
            <p style={{ color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: 20 }}>
              {t("student_awards")} <strong style={{ color: "var(--color-gold)" }}>&quot;Freestyle Haircut&quot;</strong> &amp; <strong style={{ color: "var(--color-gold)" }}>&quot;Fast &amp; Cleanest Mid Fade&quot;</strong>.
            </p>
            <p style={{ color: "var(--text-secondary)", lineHeight: 1.8 }}>{t("student_mandatory")}</p>
            <div style={{ textAlign: "center", marginTop: 24, padding: 20, background: "rgba(200,168,78,0.08)", borderRadius: 12 }}>
              <div style={{ fontSize: "2rem", fontFamily: "var(--font-display)", color: "var(--color-gold)" }}>€60</div>
              <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", margin: 0 }}>{t("student_price_note")}</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20, marginBottom: 30 }}>
            <div style={{ background: "var(--bg-card)", borderRadius: 12, padding: 24, border: "1px solid rgba(200,168,78,0.15)" }}>
              <h3 className="gold-text" style={{ marginBottom: 8 }}>Fast &amp; Cleanest Mid Fade</h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: 8 }}>{t("student_fast_time")}</p>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", lineHeight: 1.6 }}>{t("student_fast_desc")}</p>
            </div>
            <div style={{ background: "var(--bg-card)", borderRadius: 12, padding: 24, border: "1px solid rgba(200,168,78,0.15)" }}>
              <h3 className="gold-text" style={{ marginBottom: 8 }}>Freestyle Haircut</h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: 8 }}>{t("student_freestyle_time")}</p>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", lineHeight: 1.6 }}>{t("student_freestyle_desc")}</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={250}>
          <div style={{ background: "var(--bg-card)", borderRadius: 16, padding: "32px", border: "1px solid rgba(200,168,78,0.15)", marginBottom: 30 }}>
            <h3 className="gold-text" style={{ fontSize: "1.2rem", marginBottom: 20 }}>{t("student_notes_title")}</h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
              {notes.map((note, i) => (
                <li key={i} style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.8, display: "flex", gap: 10 }}>
                  <span style={{ color: "var(--color-gold)", minWidth: 16 }}>•</span>{note}
                </li>
              ))}
            </ul>
            <p style={{ color: "var(--text-muted)", marginTop: 20, fontSize: "0.9rem" }}>
              {t("student_contact_note")} <strong style={{ color: "var(--text-secondary)" }}>27440-66437</strong> &amp; <strong style={{ color: "var(--text-secondary)" }}>6936524834</strong> — Μάρρας Πανάγος
            </p>
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
              <input className="form-input" placeholder="School Name" style={{ gridColumn: "1 / -1" }} />
            </div>
            <div style={{ marginTop: 16, display: "flex", alignItems: "flex-start", gap: 8 }}>
              <input type="checkbox" id="student-terms" style={{ marginTop: 4, accentColor: "var(--color-gold)" }} />
              <label htmlFor="student-terms" style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>{t("student_terms")}</label>
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

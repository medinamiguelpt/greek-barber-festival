"use client";
import Link from "next/link";
import PageBanner from "@/components/PageBanner";
import Reveal from "@/components/Reveal";
import { useLanguage, Language } from "@/components/LanguageContext";

const CATEGORIES_DATA: Record<Language, { title: string; time: string; desc: string; href: string; image: string }[]> = {
  el: [
    { title: "Old School Haircut", image: "/comp-oldschool.png", href: "/competition/oldschoolhaircut", time: "60", desc: "Θα διαγωνιστείς σε old school κούρεμα της επιλογής σου." },
    { title: "Modern Barbering", image: "/comp-modern.png", href: "/competition/modernbarbering", time: "60", desc: "Θα διαγωνιστείς σε ένα modern haircut της επιλογής σου." },
    { title: "Fastest Low Fade", image: "/comp-fastest.png", href: "/competition/fastestlowfade", time: "15", desc: "Αυτό το θέμα αφορά τον πιο γρήγορο και τον πιο καλό τεχνίτη." },
    { title: "Freestyle Total Look", image: "/comp-freestyle.png", href: "/competition/freestyletotallook", time: "60", desc: "Θα διαγωνιστείς σε ελεύθερο θέμα χρησιμοποιώντας την φαντασία σου." },
  ],
  en: [
    { title: "Old School Haircut", image: "/comp-oldschool.png", href: "/competition/oldschoolhaircut", time: "60", desc: "Compete in an old school haircut of your choice." },
    { title: "Modern Barbering", image: "/comp-modern.png", href: "/competition/modernbarbering", time: "60", desc: "Compete in a modern haircut of your choice." },
    { title: "Fastest Low Fade", image: "/comp-fastest.png", href: "/competition/fastestlowfade", time: "15", desc: "This category is about the fastest and most precise barber." },
    { title: "Freestyle Total Look", image: "/comp-freestyle.png", href: "/competition/freestyletotallook", time: "60", desc: "Compete in a freestyle category using your imagination." },
  ],
  es: [
    { title: "Old School Haircut", image: "/comp-oldschool.png", href: "/competition/oldschoolhaircut", time: "60", desc: "Compite en un corte old school de tu elección." },
    { title: "Modern Barbering", image: "/comp-modern.png", href: "/competition/modernbarbering", time: "60", desc: "Compite en un corte modern barbering de tu elección." },
    { title: "Fastest Low Fade", image: "/comp-fastest.png", href: "/competition/fastestlowfade", time: "15", desc: "Esta categoría es para el barbero más rápido y preciso." },
    { title: "Freestyle Total Look", image: "/comp-freestyle.png", href: "/competition/freestyletotallook", time: "60", desc: "Compite en una categoría libre usando tu imaginación." },
  ],
  ar: [
    { title: "Old School Haircut", image: "/comp-oldschool.png", href: "/competition/oldschoolhaircut", time: "60", desc: "تنافس في قصة شعر كلاسيكية من اختيارك." },
    { title: "Modern Barbering", image: "/comp-modern.png", href: "/competition/modernbarbering", time: "60", desc: "تنافس في قصة شعر modern barbering من اختيارك." },
    { title: "Fastest Low Fade", image: "/comp-fastest.png", href: "/competition/fastestlowfade", time: "15", desc: "هذه الفئة تختص بأسرع وأدق حلاق." },
    { title: "Freestyle Total Look", image: "/comp-freestyle.png", href: "/competition/freestyletotallook", time: "60", desc: "تنافس في فئة حرة باستخدام خيالك." },
  ],
  pt: [
    { title: "Old School Haircut", image: "/comp-oldschool.png", href: "/competition/oldschoolhaircut", time: "60", desc: "Compita num corte old school à sua escolha." },
    { title: "Modern Barbering", image: "/comp-modern.png", href: "/competition/modernbarbering", time: "60", desc: "Compita num corte modern barbering à sua escolha." },
    { title: "Fastest Low Fade", image: "/comp-fastest.png", href: "/competition/fastestlowfade", time: "15", desc: "Esta categoria é para o barbeiro mais rápido e preciso." },
    { title: "Freestyle Total Look", image: "/comp-freestyle.png", href: "/competition/freestyletotallook", time: "60", desc: "Compita numa categoria livre usando a sua imaginação." },
  ],
  de: [
    { title: "Old School Haircut", image: "/comp-oldschool.png", href: "/competition/oldschoolhaircut", time: "60", desc: "Treten Sie in einem Old-School-Haarschnitt Ihrer Wahl an." },
    { title: "Modern Barbering", image: "/comp-modern.png", href: "/competition/modernbarbering", time: "60", desc: "Treten Sie in einem Modern-Barbering-Haarschnitt Ihrer Wahl an." },
    { title: "Fastest Low Fade", image: "/comp-fastest.png", href: "/competition/fastestlowfade", time: "15", desc: "Diese Kategorie kürt den schnellsten und präzisesten Barbier." },
    { title: "Freestyle Total Look", image: "/comp-freestyle.png", href: "/competition/freestyletotallook", time: "60", desc: "Treten Sie in einer freien Kategorie mit Ihrer Kreativität an." },
  ],
};

const NOTES_DATA: Record<Language, string[]> = {
  el: [
    "Ακολουθούμε τα διεθνή πρότυπα των barber events. Για αυτό δεν θα έχουμε καθρέπτες αυξάνοντας το βαθμό δυσκολίας.",
    "Τα μοντέλα του επαγγελματικού διαγωνισμού (1+2 θέματα) που είναι επαγγελματίες υπάλληλοι, απόφοιτοι σχολών και σπουδαστές θα πρέπει να πληρώσουν το αντίστοιχο αντίτιμο της γενικής εισόδου.",
    "Τα μοντέλα που δεν έχουν καμία σχέση με τον κλάδο η είσοδος τους είναι δωρεάν και θα πρέπει μετά τη λήξη του διαγωνισμού να αποχωρήσουν από τις αίθουσες.",
    "Δεν επιτρέπονται συνοδοί. (Α' βαθμού συγγένεια 20.00 € συμμετοχή)",
    "Εάν το επιθυμείτε μπορείτε να κλείσετε ραντεβού με τους φωτογράφους του φεστιβάλ για λήψη φωτογραφιών ή βίντεο σε προνομιακή τιμή.",
    "Η διοργάνωση δεν φέρει καμία ευθύνη για τυχόν απώλειες ή ζημιές των εργαλείων σας.",
    "Η διοργάνωση μπορεί να αναδημοσιεύσει φωτογραφίες δικές σας και των μοντέλων για διαφημιστικούς λόγους.",
    "Η διοργάνωση έχει το δικαίωμα να αλλάξει ή μετατρέψει οποιοδήποτε στοιχείο του διαγωνισμού χωρίς προειδοποίηση.",
  ],
  en: [
    "We follow international barber event standards. There will be no mirrors, increasing the difficulty level.",
    "Models in the professional competition (1+2 categories) who are professional employees, school graduates, or students must pay the general admission fee.",
    "Models with no connection to the industry have free entry and must leave the competition area after the event ends.",
    "Companions are not allowed. (1st degree relatives: €20.00 participation fee)",
    "You can book an appointment with the festival photographers for photos or videos at a special rate.",
    "The organizers are not responsible for any loss or damage to your tools.",
    "The organizers may republish your photos and models' photos for promotional purposes.",
    "The organizers reserve the right to change or modify any aspect of the competition without notice.",
  ],
  es: [
    "Seguimos los estándares internacionales de eventos barber. No habrá espejos, aumentando el nivel de dificultad.",
    "Los modelos de la competición profesional (1+2 categorías) que sean empleados profesionales, graduados o estudiantes deberán pagar la entrada general.",
    "Los modelos sin relación con el sector tienen entrada gratuita y deben abandonar el recinto tras finalizar la competición.",
    "No se permiten acompañantes. (1er grado de parentesco: €20.00 de participación)",
    "Puede reservar una cita con los fotógrafos del festival para fotos o vídeos a precio especial.",
    "Los organizadores no son responsables de pérdidas o daños en sus herramientas.",
    "Los organizadores pueden republicar fotos con fines promocionales.",
    "Los organizadores se reservan el derecho a modificar cualquier aspecto de la competición sin previo aviso.",
  ],
  ar: [
    "نتبع المعايير الدولية لفعاليات الحلاقة. لن تكون هناك مرايا لزيادة مستوى الصعوبة.",
    "الموديلات في المسابقة الاحترافية (1+2 فئات) من الموظفين المحترفين والخريجين والطلاب يجب عليهم دفع رسوم الدخول العام.",
    "الموديلات التي لا علاقة لها بالقطاع لديها دخول مجاني ويجب مغادرة القاعة بعد انتهاء المسابقة.",
    "لا يُسمح بالمرافقين. (الدرجة الأولى من الأقارب: €20.00 رسوم مشاركة)",
    "يمكنكم حجز موعد مع مصوري المهرجان للصور أو الفيديو بسعر مميز.",
    "المنظمون غير مسؤولين عن فقدان أو تلف أدواتكم.",
    "يحق للمنظمين إعادة نشر صوركم وصور الموديلات لأغراض ترويجية.",
    "يحتفظ المنظمون بحق تعديل أي جانب من المسابقة دون إشعار مسبق.",
  ],
  pt: [
    "Seguimos os padrões internacionais de eventos barber. Não haverá espelhos, aumentando o nível de dificuldade.",
    "Os modelos na competição profissional (1+2 categorias) que sejam funcionários profissionais, licenciados ou estudantes devem pagar a entrada geral.",
    "Modelos sem relação com o setor têm entrada gratuita e devem sair do espaço após o fim da competição.",
    "Não são permitidos acompanhantes. (1º grau de parentesco: €20.00 de participação)",
    "Pode marcar uma sessão com os fotógrafos do festival para fotos ou vídeos a preço especial.",
    "Os organizadores não são responsáveis por perdas ou danos nas suas ferramentas.",
    "Os organizadores podem republicar fotos para fins promocionais.",
    "Os organizadores reservam-se o direito de alterar qualquer aspeto da competição sem aviso prévio.",
  ],
  de: [
    "Wir folgen internationalen Barber-Event-Standards. Es wird keine Spiegel geben, was den Schwierigkeitsgrad erhöht.",
    "Modelle beim Profiwettbewerb (1+2 Kategorien), die Berufsangestellte, Schulabsolventen oder Schüler sind, müssen den allgemeinen Eintrittspreis zahlen.",
    "Modelle ohne Branchenbezug haben freien Eintritt und müssen nach Wettbewerbsende den Saal verlassen.",
    "Begleitpersonen sind nicht erlaubt. (1. Verwandtschaftsgrad: €20.00 Teilnahmegebühr)",
    "Sie können einen Termin mit den Festival-Fotografen für Fotos oder Videos zu einem Sonderpreis buchen.",
    "Die Veranstalter haften nicht für Verlust oder Beschädigung Ihrer Werkzeuge.",
    "Die Veranstalter dürfen Fotos zu Werbezwecken veröffentlichen.",
    "Die Veranstalter behalten sich das Recht vor, jeden Aspekt des Wettbewerbs ohne Vorankündigung zu ändern.",
  ],
};

export default function CompetitionPage() {
  const { t, lang } = useLanguage();
  const categories = CATEGORIES_DATA[lang] || CATEGORIES_DATA.el;
  const notes = NOTES_DATA[lang] || NOTES_DATA.el;
  return (
    <>
      <PageBanner title={t("competition_title")} image="https://static.wixstatic.com/media/335ee3_a59bf4ba5f294fcb81e4b0cf0de54aab~mv2.jpg/v1/fill/w_1920,h_600,al_c,q_80,enc_avif,quality_auto/335ee3_a59bf4ba5f294fcb81e4b0cf0de54aab~mv2.jpg" />
      <section style={{ padding: "80px 24px", maxWidth: 1100, margin: "0 auto" }}>
        <Reveal>
          <h2 className="gold-text" style={{ textAlign: "center", fontSize: "1.8rem", marginBottom: 30 }}>{t("comp_topics_title")}</h2>
        </Reveal>
        <Reveal delay={100}>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.9, textAlign: "center", maxWidth: 860, margin: "0 auto 50px" }}>
            {t("comp_overview_intro")}
          </p>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24 }}>
          {categories.map((cat, i) => (
            <Reveal key={cat.href} delay={i * 150}>
              <Link href={cat.href} className="card-hover" style={{ display: "block", textDecoration: "none", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(200,168,78,0.15)", background: "var(--bg-card)" }}>
                <div className="img-zoom" style={{ height: 300 }}>
                  <img src={cat.image} alt={cat.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div style={{ padding: "20px 24px" }}>
                  <h3 style={{ color: "var(--color-gold)", fontSize: "1.1rem", marginBottom: 4 }}>{cat.title}</h3>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: 8 }}>{t("comp_time")} {cat.time} {t("comp_cat_time_unit")}</p>
                  <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", lineHeight: 1.6 }}>{cat.desc}</p>
                  <span style={{ display: "inline-block", marginTop: 12, color: "var(--color-gold)", fontSize: "0.8rem", fontFamily: "var(--font-display)", borderBottom: "1px solid var(--color-gold)" }}>{t("learn_more")}</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div style={{ background: "var(--bg-card)", borderRadius: 16, padding: "40px 32px", border: "1px solid rgba(200,168,78,0.2)", marginTop: 60 }}>
            <h3 className="gold-text" style={{ fontSize: "1.2rem", marginBottom: 24, textAlign: "center" }}>{t("comp_notes_title")}</h3>
            <ol style={{ paddingLeft: 20 }}>
              {notes.map((note, i) => (
                <li key={i} style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.8, marginBottom: 12 }}>{note}</li>
              ))}
            </ol>
            <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginTop: 20, textAlign: "center" }}>
              {t("comp_notes_more")}{" "}
              <Link href="/competition/rules" style={{ color: "var(--color-gold)" }}>{t("comp_notes_link")}</Link>.
            </p>
          </div>
        </Reveal>

        <div style={{ marginTop: 40, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
          {[
            { key: "nav_student_comp", href: "/competition/student" },
            { key: "nav_comp_cost", href: "/competition/fees" },
            { key: "nav_comp_rules", href: "/competition/rules" },
          ].map((link) => (
            <Reveal key={link.href}>
              <Link href={link.href} style={{ display: "block", textDecoration: "none", textAlign: "center", padding: "20px", background: "rgba(200,168,78,0.08)", borderRadius: 12, border: "1px solid rgba(200,168,78,0.15)", color: "var(--color-gold)", fontFamily: "var(--font-display)", fontSize: "0.95rem", transition: "all 0.3s" }}>
                {t(link.key as Parameters<typeof t>[0])}
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}

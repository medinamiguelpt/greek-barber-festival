import PageBanner from "@/components/PageBanner";
import Reveal from "@/components/Reveal";

export default function OldSchoolHaircutPage() {
  return (
    <>
      <PageBanner title="OLD SCHOOL HAIRCUT" image="https://static.wixstatic.com/media/335ee3_a6131c9e7ce94f6ab66dbb47f3e6ee7e~mv2.jpg/v1/fill/w_1920,h_600,al_c,q_80,enc_avif,quality_auto/DSC_9235.jpg" />
      <section style={{ padding: "80px 24px", maxWidth: 800, margin: "0 auto" }}>
        <Reveal>
          <div style={{ background: "var(--color-charcoal)", borderRadius: 16, padding: "40px 32px", border: "1px solid rgba(200,168,78,0.2)", marginBottom: 30 }}>
            <h2 className="gold-text" style={{ fontSize: "1.5rem", marginBottom: 8 }}>1. Old School Haircuts</h2>
            <p style={{ color: "var(--color-gold)", fontFamily: "var(--font-display)", fontSize: "1rem", marginBottom: 20 }}>Χρόνος: 60 λεπτά</p>
            <h3 style={{ color: "#fff", fontSize: "1.1rem", marginBottom: 12 }}>Περιγραφή</h3>
            <p style={{ color: "#ccc", lineHeight: 1.8, marginBottom: 24 }}>
              Θα διαγωνιστείς σε old school κούρεμα της επιλογής σου (pompadour, long trim pompadour, side part, boogie part etc.)
            </p>
            <h3 style={{ color: "#fff", fontSize: "1.1rem", marginBottom: 12 }}>Προϋποθέσεις:</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
              {["Το μήκος των μαλλιών στον αυχένα πρέπει να είναι τουλάχιστον 1 εκατοστό και στο πάνω μέρος τουλάχιστον 5 εκατοστά.",
                "Επιτρέπονται όλα τα εργαλεία.",
                "Δεν επιτρέπεται το προ-κούρεμα και το χρώμα.",
                "Δεν επιτρέπεται η χρήση ζελέ και λακ.",
                "Επιτρέπεται η προετοιμασία της γενειάδας ή του μουστακιού. (Η γενειάδα και το μουστάκι δεν βαθμολογούνται)."
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <span style={{ color: "var(--color-gold)", fontFamily: "var(--font-display)", minWidth: 20 }}>{i + 1})</span>
                  <span style={{ color: "#ccc", fontSize: "0.95rem" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
        <Reveal delay={200}>
          <div style={{ background: "var(--color-charcoal)", borderRadius: 16, padding: "40px 32px", border: "1px solid rgba(200,168,78,0.2)" }}>
            <h3 style={{ color: "#fff", fontSize: "1.1rem", marginBottom: 16 }}>Κριτήρια:</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[{ name: "Τεχνική εκτέλεση / Technical Execution", points: "30 - 60 βαθμοί" },
                { name: "Καθαρότητα κουρέματος / Cleanliness of haircut", points: "25 - 50 βαθμοί" },
                { name: "Styling", points: "20 - 40 βαθμοί" },
                { name: "Ένωση γραμμών / Blending", points: "15 - 30 βαθμοί" },
                { name: "Ντύσιμο κι εμφάνιση διαγωνιζόμενου", points: "5 - 10 βαθμοί" },
                { name: "Ντύσιμο κι εμφάνιση μοντέλου", points: "5 - 10 βαθμοί" }
              ].map((c, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "12px 16px", background: "rgba(200,168,78,0.05)", borderRadius: 8, flexWrap: "wrap", gap: 8 }}>
                  <span style={{ color: "#ccc" }}>{i+1}) {c.name}</span>
                  <span style={{ color: "var(--color-gold)", fontFamily: "var(--font-display)" }}>{c.points}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 20, padding: 16, background: "rgba(200,168,78,0.1)", borderRadius: 8, textAlign: "center" }}>
              <p style={{ color: "var(--color-gold)", fontFamily: "var(--font-display)" }}>Bonus 10 βαθμών από τον κάθε κριτή, σε έναν και μόνο διαγωνιζόμενο.</p>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
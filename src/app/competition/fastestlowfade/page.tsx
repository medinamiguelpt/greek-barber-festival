import PageBanner from "@/components/PageBanner";
import Reveal from "@/components/Reveal";

export default function FastestLowFadePage() {
  return (
    <>
      <PageBanner title="FASTEST LOW FADE" image="https://static.wixstatic.com/media/335ee3_98fac8e7ca754f8f95d6eb57e2e610d0~mv2.jpg/v1/fill/w_1920,h_600,al_c,q_80,enc_avif,quality_auto/DSC_9229.jpg" />
      <section style={{ padding: "80px 24px", maxWidth: 800, margin: "0 auto" }}>
        <Reveal>
          <div style={{ background: "var(--color-charcoal)", borderRadius: 16, padding: "40px 32px", border: "1px solid rgba(200,168,78,0.2)", marginBottom: 30 }}>
            <h2 className="gold-text" style={{ fontSize: "1.5rem", marginBottom: 8 }}>3. Fastest Low Fade</h2>
            <p style={{ color: "var(--color-gold)", fontFamily: "var(--font-display)", fontSize: "1rem", marginBottom: 20 }}>Χρόνος: 15 λεπτά</p>
            <h3 style={{ color: "#fff", fontSize: "1.1rem", marginBottom: 12 }}>Περιγραφή</h3>
            <p style={{ color: "#ccc", lineHeight: 1.8, marginBottom: 24 }}>Το πιο γρήγορο και καθαρό low fade κούρεμα. Ταχύτητα και ακρίβεια σε 15 λεπτά.</p>
            <h3 style={{ color: "#fff", fontSize: "1.1rem", marginBottom: 12 }}>Προϋποθέσεις:</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {["Επιτρέπονται όλα τα εργαλεία.", "Δεν επιτρέπεται το προ-κούρεμα.", "Δεν επιτρέπεται η χρήση ζελέ και λακ."].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 12 }}>
                  <span style={{ color: "var(--color-gold)", fontFamily: "var(--font-display)", minWidth: 20 }}>{i+1})</span>
                  <span style={{ color: "#ccc" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
        <Reveal delay={200}>
          <div style={{ background: "var(--color-charcoal)", borderRadius: 16, padding: "40px 32px", border: "1px solid rgba(200,168,78,0.2)" }}>
            <h3 style={{ color: "#fff", fontSize: "1.1rem", marginBottom: 16 }}>Κριτήρια:</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[{ name: "Τεχνική εκτέλεση", points: "30 - 60 βαθμοί" }, { name: "Καθαρότητα κουρέματος", points: "25 - 50 βαθμοί" }, { name: "Ένωση γραμμών / Blending", points: "25 - 50 βαθμοί" }, { name: "Ταχύτητα / Speed", points: "15 - 30 βαθμοί" }, { name: "Εμφάνιση διαγωνιζόμενου", points: "5 - 10 βαθμοί" }].map((c, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "12px 16px", background: "rgba(200,168,78,0.05)", borderRadius: 8, flexWrap: "wrap", gap: 8 }}>
                  <span style={{ color: "#ccc" }}>{i+1}) {c.name}</span>
                  <span style={{ color: "var(--color-gold)", fontFamily: "var(--font-display)" }}>{c.points}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
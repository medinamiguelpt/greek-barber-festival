"use client";
import PageBanner from "@/components/PageBanner";
import Reveal from "@/components/Reveal";

export default function StudentCompetitionPage() {
  return (
    <>
      <PageBanner title="ΜΑΘΗΤΙΚΟΣ ΔΙΑΓΩΝΙΣΜΟΣ" image="https://static.wixstatic.com/media/335ee3_9c6d7b8f7e694e40b10bda0de7eee0f0~mv2.jpg/v1/fill/w_1920,h_600,al_c,q_80,enc_avif,quality_auto/LSD_4282.jpg" />
      <section style={{ padding: "80px 24px", maxWidth: 800, margin: "0 auto" }}>
        <Reveal>
          <div style={{ background: "var(--color-charcoal)", borderRadius: 16, padding: "40px 32px", border: "1px solid rgba(200,168,78,0.2)", marginBottom: 30 }}>
            <p style={{ color: "#ccc", lineHeight: 1.8, marginBottom: 20 }}>
              Στα πλαίσια του 8ου Greek Barber Festival θα διοργανωθεί μαθητικός διαγωνισμός. Μπορούν να συμμετέχουν μαθητές σχολών κομμωτικής από δημόσιες, ιδιωτικές, ΕΠΑΛ και ΙΕΚ σχολές.
            </p>
            <p style={{ color: "#ccc", lineHeight: 1.8, marginBottom: 24 }}>
              Τα βραβεία θα επιβραβεύουν τις ικανότητες και την επίδοση των μαθητών, κριτές θα είναι οι κάτοχοι Best Barber of the Year από τους προηγούμενους 7 διαγωνισμούς.
            </p>

            <h3 className="gold-text" style={{ fontSize: "1.2rem", marginBottom: 16 }}>Διαγωνιστικά Θέματα (2)</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 16, marginBottom: 24 }}>
              <div style={{ padding: 20, background: "rgba(200,168,78,0.08)", borderRadius: 12, textAlign: "center", border: "1px solid rgba(200,168,78,0.15)" }}>
                <h4 style={{ color: "var(--color-gold)", fontSize: "1rem" }}>Freestyle Haircut</h4>
                <p style={{ color: "#999", fontSize: "0.9rem", marginTop: 4 }}>60 λεπτά</p>
              </div>
              <div style={{ padding: 20, background: "rgba(200,168,78,0.08)", borderRadius: 12, textAlign: "center", border: "1px solid rgba(200,168,78,0.15)" }}>
                <h4 style={{ color: "var(--color-gold)", fontSize: "1rem" }}>Fast & Cleanest Mid Fade</h4>
                <p style={{ color: "#999", fontSize: "0.9rem", marginTop: 4 }}>15 λεπτά</p>
              </div>
            </div>

            <p style={{ color: "#aaa", fontSize: "0.9rem", marginBottom: 8 }}>Υποχρεωτικό: συμμετοχή και στα 2 θέματα.</p>
            <div style={{ textAlign: "center", padding: 16, background: "rgba(200,168,78,0.1)", borderRadius: 8, marginBottom: 24 }}>
              <span style={{ fontSize: "2rem", fontFamily: "var(--font-display)", color: "var(--color-gold)" }}>€60</span>
              <p style={{ color: "#aaa", fontSize: "0.85rem" }}>(συμπεριλαμβάνεται είσοδος στο φεστιβάλ)</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div style={{ background: "var(--color-charcoal)", borderRadius: 16, padding: "40px 32px", border: "1px solid rgba(200,168,78,0.2)", marginBottom: 30 }}>
            <h3 className="gold-text" style={{ fontSize: "1.2rem", marginBottom: 16 }}>Σημαντικές Σημειώσεις:</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {["Δεν θα έχουμε καθρέπτες (διεθνή πρότυπα).",
                "Χρειάζονται 2 μοντέλα.",
                "Μοντέλα χωρίς σχέση με τον κλάδο: δωρεάν είσοδος, αποχωρούν μετά.",
                "Δυνατότητα ραντεβού με φωτογράφους σε προνομιακή τιμή.",
                "Διοργάνωση δεν ευθύνεται για απώλειες εργαλείων.",
                "Υποχρεωτική βεβαίωση σπουδών.",
                "Δεν επιτρέπονται διακριτικά σχολών κατά τον διαγωνισμό.",
                "Διοργάνωση μπορεί να αναδημοσιεύσει φωτογραφίες."
              ].map((note, i) => (
                <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <span style={{ color: "var(--color-gold)", fontFamily: "var(--font-display)", minWidth: 20 }}>{i+1})</span>
                  <span style={{ color: "#ccc", fontSize: "0.95rem" }}>{note}</span>
                </div>
              ))}
            </div>
            <p style={{ color: "#aaa", marginTop: 20, fontSize: "0.9rem" }}>
              Επικοινωνία: <strong style={{ color: "#ccc" }}>27440-66437</strong> & <strong style={{ color: "#ccc" }}>6936524834</strong> Μάρρας Πανάγος
            </p>
          </div>
        </Reveal>

        <Reveal delay={300}>
          <div style={{ background: "var(--color-charcoal)", borderRadius: 16, padding: "40px 32px", border: "1px solid rgba(200,168,78,0.2)" }}>
            <h2 className="gold-text" style={{ fontSize: "1.5rem", marginBottom: 30, textAlign: "center" }}>ΔΗΛΩΣΗ ΣΥΜΜΕΤΟΧΗΣ</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 16 }}>
              <input className="form-input" placeholder="Όνομα" />
              <input className="form-input" placeholder="Επίθετο" />
              <input className="form-input" type="email" placeholder="Email" />
              <input className="form-input" placeholder="Τηλέφωνο Επικοινωνίας" />
              <input className="form-input" placeholder="Όνομα Σχολής" style={{ gridColumn: "1 / -1" }} />
              <select className="form-input" style={{ gridColumn: "1 / -1" }}>
                <option value="">Θα διαγωνιστώ σε...</option>
                <option value="both">Και τα 2 θέματα (υποχρεωτικό)</option>
              </select>
            </div>
            <div style={{ marginTop: 16, display: "flex", alignItems: "flex-start", gap: 8 }}>
              <input type="checkbox" id="student-terms" style={{ marginTop: 4, accentColor: "var(--color-gold)" }} />
              <label htmlFor="student-terms" style={{ color: "#999", fontSize: "0.85rem" }}>Αποδέχομαι τους κανονισμούς</label>
            </div>
            <div style={{ textAlign: "center", marginTop: 24 }}>
              <button className="btn-gold">ΕΓΓΡΑΦΗ</button>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
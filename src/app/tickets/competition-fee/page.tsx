"use client";
import PageBanner from "@/components/PageBanner";
import Reveal from "@/components/Reveal";

export default function CompetitionFeePage() {
  return (
    <>
      <PageBanner title="ΚΟΣΤΟΣ ΣΥΜΜΕΤΟΧΗΣ" image="https://static.wixstatic.com/media/335ee3_70cb3b2360a14ecfa2b25f61b9f6ea2b~mv2.jpg/v1/fill/w_1920,h_600,al_c,q_80,enc_avif,quality_auto/LSD_4155.jpg" />
      <section style={{ padding: "80px 24px", maxWidth: 900, margin: "0 auto" }}>
        {/* Professional Competition */}
        <Reveal>
          <div style={{ background: "var(--color-charcoal)", borderRadius: 16, padding: "40px 32px", border: "1px solid rgba(200,168,78,0.2)", marginBottom: 30 }}>
            <h2 className="gold-text" style={{ fontSize: "1.5rem", marginBottom: 24, textAlign: "center" }}>ΕΠΑΓΓΕΛΜΑΤΙΚΟΣ ΔΙΑΓΩΝΙΣΜΟΣ</h2>
            <h3 style={{ color: "#ccc", fontSize: "1.1rem", marginBottom: 16, textAlign: "center" }}>Για 1 διαγωνιστικό θέμα:</h3>
            <div style={{ display: "grid", gap: 12, marginBottom: 24 }}>
              {[
                { name: "Old School Haircut", cost: "€80 + €150 (γενική είσοδος)" },
                { name: "Το πιο γρήγορο κούρεμα", cost: "€80 + €150 (γενική είσοδος)" },
                { name: "Freestyle – Total Look", cost: "€80 + €150 (γενική είσοδος)" },
                { name: "Modern Barbering", cost: "€80 + €150 (γενική είσοδος)" },
              ].map((item) => (
                <div key={item.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", background: "rgba(200,168,78,0.05)", borderRadius: 8 }}>
                  <span style={{ color: "#fff" }}>{item.name}</span>
                  <span style={{ color: "var(--color-gold)", fontFamily: "var(--font-display)" }}>{item.cost}</span>
                </div>
              ))}
            </div>
            <p style={{ color: "#aaa", fontSize: "0.85rem", textAlign: "center", marginBottom: 20 }}>*Οι παραπάνω τιμές ισχύουν για την επιλογή ενός διαγωνιστικού θέματος.</p>
            <p style={{ color: "var(--color-gold)", textAlign: "center", fontFamily: "var(--font-display)", fontSize: "1rem" }}>
              Για τίτλο &quot;Best Barber of the Year&quot; → τουλάχιστον 3 θέματα.
            </p>
          </div>
        </Reveal>

        {/* Multiple Topics */}
        <Reveal delay={150}>
          <div style={{ background: "var(--color-charcoal)", borderRadius: 16, padding: "40px 32px", border: "1px solid rgba(200,168,78,0.2)", marginBottom: 30 }}>
            <h2 className="gold-text" style={{ fontSize: "1.3rem", marginBottom: 20, textAlign: "center" }}>Πολλαπλά θέματα</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
              {[
                { topics: "2 θέματα", price: "€150 + €100", note: "(γενική είσοδος)" },
                { topics: "3 θέματα", price: "€300", note: "(ΔΩΡΕΑΝ γενική είσοδος)" },
                { topics: "4 θέματα", price: "€300", note: "(ΔΩΡΕΑΝ γενική είσοδος)" },
              ].map((item) => (
                <div key={item.topics} style={{ textAlign: "center", padding: 20, background: "rgba(200,168,78,0.08)", borderRadius: 12, border: "1px solid rgba(200,168,78,0.15)" }}>
                  <h3 style={{ color: "var(--color-gold)", fontSize: "1rem" }}>{item.topics}</h3>
                  <div style={{ fontSize: "1.8rem", fontFamily: "var(--font-display)", color: "#fff", margin: "8px 0" }}>{item.price}</div>
                  <p style={{ color: "#aaa", fontSize: "0.8rem" }}>{item.note}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Student Competition */}
        <Reveal delay={250}>
          <div style={{ background: "var(--color-charcoal)", borderRadius: 16, padding: "40px 32px", border: "1px solid rgba(200,168,78,0.2)", marginBottom: 30 }}>
            <h2 className="gold-text" style={{ fontSize: "1.3rem", marginBottom: 20, textAlign: "center" }}>ΜΑΘΗΤΙΚΟΣ ΔΙΑΓΩΝΙΣΜΟΣ</h2>
            <div style={{ textAlign: "center", padding: 20, background: "rgba(200,168,78,0.08)", borderRadius: 12 }}>
              <h3 style={{ color: "var(--color-gold)", fontSize: "1rem" }}>2 θέματα</h3>
              <div style={{ fontSize: "2rem", fontFamily: "var(--font-display)", color: "#fff", margin: "8px 0" }}>€60</div>
              <p style={{ color: "#aaa", fontSize: "0.85rem" }}>(ΔΩΡΕΑΝ γενική είσοδος)</p>
            </div>
          </div>
        </Reveal>

        {/* Notes */}
        <Reveal delay={300}>
          <div style={{ background: "rgba(200,168,78,0.05)", borderRadius: 12, padding: "20px 24px", marginBottom: 30 }}>
            <p style={{ color: "#aaa", fontSize: "0.85rem", lineHeight: 1.8 }}>
              *Τα ονόματα των μοντέλων υποχρεωτικό να δηλωθούν στην γραμματεία 15 μέρες πριν.<br />
              *Μοντέλα για 1-2 θέματα (ιδιοκτήτες, υπάλληλοι, σπουδαστές, απόφοιτοι): €50 είσοδος.<br />
              *Μοντέλα χωρίς σχέση με τον χώρο αποχωρούν μετά τη λήξη κάθε θέματος.
            </p>
          </div>
        </Reveal>

        {/* Registration Form */}
        <Reveal delay={350}>
          <div style={{ background: "var(--color-charcoal)", borderRadius: 16, padding: "40px 32px", border: "1px solid rgba(200,168,78,0.2)" }}>
            <h2 className="gold-text" style={{ fontSize: "1.5rem", marginBottom: 30, textAlign: "center" }}>ΔΗΛΩΣΗ ΣΥΜΜΕΤΟΧΗΣ</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 16 }}>
              <input className="form-input" placeholder="Όνομα" />
              <input className="form-input" placeholder="Επίθετο" />
              <input className="form-input" type="email" placeholder="Email" />
              <input className="form-input" placeholder="Τηλέφωνο" />
              <input className="form-input" placeholder="Διεύθυνση" />
              <input className="form-input" placeholder="Πόλη" />
              <input className="form-input" placeholder="ΤΚ" />
              <select className="form-input">
                <option value="">Επιλογή Θέματος</option>
                <option value="oldschool">Old School HairCut</option>
                <option value="freestyle">Freestyle/Total Look</option>
                <option value="modern">Modern Barbering</option>
                <option value="fastest">Fastest Low Fade</option>
                <option value="all">Όλα τα παραπάνω</option>
              </select>
            </div>
            <div style={{ marginTop: 16, display: "flex", alignItems: "flex-start", gap: 8 }}>
              <input type="checkbox" id="terms" style={{ marginTop: 4, accentColor: "var(--color-gold)" }} />
              <label htmlFor="terms" style={{ color: "#999", fontSize: "0.85rem" }}>Έχω διαβάσει και αποδέχομαι τους όρους συμμετοχής</label>
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

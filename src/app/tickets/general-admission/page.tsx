"use client";
import PageBanner from "@/components/PageBanner";
import Reveal from "@/components/Reveal";

export default function GeneralAdmissionPage() {
  return (
    <>
      <PageBanner title="ΓΕΝΙΚΗ ΕΙΣΟΔΟΣ" image="https://static.wixstatic.com/media/335ee3_70cb3b2360a14ecfa2b25f61b9f6ea2b~mv2.jpg/v1/fill/w_1920,h_600,al_c,q_80,enc_avif,quality_auto/LSD_4155.jpg" />
      <section style={{ padding: "80px 24px", maxWidth: 900, margin: "0 auto" }}>
        {/* Presale Pricing */}
        <Reveal>
          <div style={{ background: "var(--color-charcoal)", borderRadius: 16, padding: "40px 32px", border: "1px solid rgba(200,168,78,0.2)", marginBottom: 30 }}>
            <h2 className="gold-text" style={{ fontSize: "1.5rem", marginBottom: 24, textAlign: "center" }}>Προπώληση έως 28 Φεβρουαρίου 2026</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 20 }}>
              <div style={{ textAlign: "center", padding: 20, background: "rgba(200,168,78,0.05)", borderRadius: 12 }}>
                <div style={{ fontSize: "2.5rem", fontFamily: "var(--font-display)", color: "var(--color-gold)" }}>€160</div>
                <h3 style={{ color: "#fff", fontSize: "1rem", margin: "8px 0 4px" }}>Επαγγελματίες*</h3>
                <p style={{ color: "#999", fontSize: "0.8rem" }}>*Ιδιοκτήτες και Υπάλληλοι Καταστημάτων, Freelancers, Απόφοιτοι ιδιωτικής ή δημόσιας σχολής.</p>
              </div>
              <div style={{ textAlign: "center", padding: 20, background: "rgba(200,168,78,0.05)", borderRadius: 12 }}>
                <div style={{ fontSize: "2.5rem", fontFamily: "var(--font-display)", color: "var(--color-gold)" }}>€40</div>
                <h3 style={{ color: "#fff", fontSize: "1rem", margin: "8px 0 4px" }}>Σπουδαστές σχολών*</h3>
                <p style={{ color: "#999", fontSize: "0.8rem" }}>*(απαιτείται βεβαίωση σπουδών)</p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Festival Crew Bonus - Presale */}
        <Reveal delay={100}>
          <div style={{ background: "var(--color-charcoal)", borderRadius: 16, padding: "40px 32px", border: "1px solid rgba(200,168,78,0.2)", marginBottom: 30 }}>
            <h2 className="gold-text" style={{ fontSize: "1.3rem", marginBottom: 20, textAlign: "center" }}>Festival Crew Bonus — Προπώληση</h2>
            <p style={{ color: "#ccc", textAlign: "center", marginBottom: 16 }}>Επωφελήσου από τις ειδικές τιμές.</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 20 }}>
              <div style={{ textAlign: "center", padding: 20, background: "rgba(200,168,78,0.08)", borderRadius: 12, border: "1px solid rgba(200,168,78,0.15)" }}>
                <h3 style={{ color: "var(--color-gold)", fontSize: "1rem" }}>3+ άτομα</h3>
                <p style={{ color: "#fff", fontSize: "1.2rem", margin: "8px 0" }}>€160 / άτομο</p>
                <p style={{ color: "#aaa", fontSize: "0.85rem" }}>+ 1 εξάδα προϊόντα &quot;Marras Hair&quot; bonus ανά άτομο</p>
              </div>
              <div style={{ textAlign: "center", padding: 20, background: "rgba(200,168,78,0.08)", borderRadius: 12, border: "1px solid rgba(200,168,78,0.15)" }}>
                <h3 style={{ color: "var(--color-gold)", fontSize: "1rem" }}>5+ άτομα</h3>
                <p style={{ color: "#fff", fontSize: "1.2rem", margin: "8px 0" }}>€150 / άτομο</p>
                <p style={{ color: "#aaa", fontSize: "0.85rem" }}>+ 2 εξάδες προϊόντων &quot;Marras Hair&quot; bonus ανά άτομο</p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* General Admission Pricing */}
        <Reveal delay={200}>
          <div style={{ background: "var(--color-charcoal)", borderRadius: 16, padding: "40px 32px", border: "1px solid rgba(200,168,78,0.2)", marginBottom: 30 }}>
            <h2 className="gold-text" style={{ fontSize: "1.5rem", marginBottom: 24, textAlign: "center" }}>Γενική Είσοδος</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 20 }}>
              <div style={{ textAlign: "center", padding: 20, background: "rgba(200,168,78,0.05)", borderRadius: 12 }}>
                <div style={{ fontSize: "2.5rem", fontFamily: "var(--font-display)", color: "var(--color-gold)" }}>€180</div>
                <h3 style={{ color: "#fff", fontSize: "1rem", margin: "8px 0 4px" }}>Επαγγελματίες*</h3>
                <p style={{ color: "#999", fontSize: "0.8rem" }}>*Ιδιοκτήτες και Υπάλληλοι Καταστημάτων, Freelancers, Απόφοιτοι ιδιωτικής ή δημόσιας σχολής.</p>
              </div>
              <div style={{ textAlign: "center", padding: 20, background: "rgba(200,168,78,0.05)", borderRadius: 12 }}>
                <div style={{ fontSize: "2.5rem", fontFamily: "var(--font-display)", color: "var(--color-gold)" }}>€50</div>
                <h3 style={{ color: "#fff", fontSize: "1rem", margin: "8px 0 4px" }}>Σπουδαστές σχολών*</h3>
                <p style={{ color: "#999", fontSize: "0.8rem" }}>*(απαιτείται βεβαίωση σπουδών)</p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* General Festival Crew Bonus */}
        <Reveal delay={300}>
          <div style={{ background: "var(--color-charcoal)", borderRadius: 16, padding: "40px 32px", border: "1px solid rgba(200,168,78,0.2)", marginBottom: 30 }}>
            <h2 className="gold-text" style={{ fontSize: "1.3rem", marginBottom: 20, textAlign: "center" }}>Festival Crew Bonus — Γενική Είσοδος</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 20 }}>
              <div style={{ textAlign: "center", padding: 20, background: "rgba(200,168,78,0.08)", borderRadius: 12, border: "1px solid rgba(200,168,78,0.15)" }}>
                <h3 style={{ color: "var(--color-gold)", fontSize: "1rem" }}>3+ άτομα</h3>
                <p style={{ color: "#fff", fontSize: "1.2rem", margin: "8px 0" }}>€180 / άτομο</p>
                <p style={{ color: "#aaa", fontSize: "0.85rem" }}>+ 1 εξάδα προϊόντων &quot;Marras Hair&quot; bonus ανά άτομο</p>
              </div>
              <div style={{ textAlign: "center", padding: 20, background: "rgba(200,168,78,0.08)", borderRadius: 12, border: "1px solid rgba(200,168,78,0.15)" }}>
                <h3 style={{ color: "var(--color-gold)", fontSize: "1rem" }}>5+ άτομα</h3>
                <p style={{ color: "#fff", fontSize: "1.2rem", margin: "8px 0" }}>€180 / άτομο</p>
                <p style={{ color: "#aaa", fontSize: "0.85rem" }}>+ 2 εξάδες προϊόντων &quot;Marras Hair&quot; bonus ανά άτομο</p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Companions note */}
        <Reveal delay={350}>
          <p style={{ textAlign: "center", color: "#aaa", fontSize: "0.95rem", marginBottom: 30, padding: "16px", background: "rgba(200,168,78,0.05)", borderRadius: 8 }}>
            Σημείωση: Επιτρέπονται οι συνοδοί (Α&#39; βαθμού συγγένειας) με γενική είσοδο <strong style={{ color: "var(--color-gold)" }}>€30.00</strong>
          </p>
        </Reveal>

        {/* Contact phones */}
        <Reveal delay={400}>
          <p style={{ textAlign: "center", color: "#999", marginBottom: 40 }}>
            Για περισσότερες πληροφορίες στα τηλέφωνα: <strong style={{ color: "#ccc" }}>27440-66437 — 6945977046 — 6936524834 — 6946466324</strong>
          </p>
        </Reveal>

        {/* Registration Form */}
        <Reveal delay={450}>
          <div style={{ background: "var(--color-charcoal)", borderRadius: 16, padding: "40px 32px", border: "1px solid rgba(200,168,78,0.2)" }}>
            <h2 className="gold-text" style={{ fontSize: "1.5rem", marginBottom: 30, textAlign: "center" }}>ΦΟΡΜΑ ΕΓΓΡΑΦΗΣ</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 16 }}>
              <input className="form-input" placeholder="Όνομα" />
              <input className="form-input" placeholder="Επίθετο" />
              <input className="form-input" type="email" placeholder="Email" />
              <input className="form-input" placeholder="Τηλέφωνο" />
              <input className="form-input" placeholder="ΤΚ" />
              <input className="form-input" placeholder="Διεύθυνση" />
              <input className="form-input" placeholder="Πόλη" />
              <select className="form-input">
                <option value="">Επιλέξτε ένα από τα παρακάτω</option>
                <option value="professional">Επαγγελματίας</option>
                <option value="student">Σπουδαστής</option>
              </select>
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

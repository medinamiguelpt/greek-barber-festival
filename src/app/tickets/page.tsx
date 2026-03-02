import Link from "next/link";
import PageBanner from "@/components/PageBanner";
import Reveal from "@/components/Reveal";

export default function TicketsPage() {
  return (
    <>
      <PageBanner title="ΕΙΣΙΤΗΡΙΑ" image="https://static.wixstatic.com/media/335ee3_70cb3b2360a14ecfa2b25f61b9f6ea2b~mv2.jpg/v1/fill/w_1920,h_600,al_c,q_80,enc_avif,quality_auto/LSD_4155.jpg" />
      <section style={{ padding: "80px 24px", maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: 30 }}>
          <Reveal>
            <Link href="/tickets/general-admission" className="card-hover" style={{ display: "block", textDecoration: "none", background: "var(--color-charcoal)", borderRadius: 16, padding: "40px 32px", border: "1px solid rgba(200,168,78,0.15)", textAlign: "center" }}>
              <h2 className="gold-text" style={{ fontSize: "1.5rem", marginBottom: 12 }}>Γενική Είσοδος</h2>
              <p style={{ color: "#999", marginBottom: 20, fontSize: "0.95rem" }}>Επαγγελματίες &amp; Σπουδαστές</p>
              <div style={{ fontSize: "2.5rem", fontFamily: "var(--font-display)", color: "var(--color-gold)", marginBottom: 8 }}>από €40</div>
              <p style={{ color: "#777", fontSize: "0.85rem" }}>Προπώληση έως 28 Φεβρουαρίου 2026</p>
              <div className="btn-gold" style={{ marginTop: 24, display: "inline-block" }}>ΠΕΡΙΣΣΟΤΕΡΑ</div>
            </Link>
          </Reveal>
          <Reveal delay={200}>
            <Link href="/tickets/competition-fee" className="card-hover" style={{ display: "block", textDecoration: "none", background: "var(--color-charcoal)", borderRadius: 16, padding: "40px 32px", border: "1px solid rgba(200,168,78,0.15)", textAlign: "center" }}>
              <h2 className="gold-text" style={{ fontSize: "1.5rem", marginBottom: 12 }}>Κόστος Διαγωνισμού</h2>
              <p style={{ color: "#999", marginBottom: 20, fontSize: "0.95rem" }}>Επαγγελματικός &amp; Μαθητικός</p>
              <div style={{ fontSize: "2.5rem", fontFamily: "var(--font-display)", color: "var(--color-gold)", marginBottom: 8 }}>από €60</div>
              <p style={{ color: "#777", fontSize: "0.85rem" }}>Κόστος ανά θέμα / πολλαπλά θέματα</p>
              <div className="btn-gold" style={{ marginTop: 24, display: "inline-block" }}>ΠΕΡΙΣΣΟΤΕΡΑ</div>
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}

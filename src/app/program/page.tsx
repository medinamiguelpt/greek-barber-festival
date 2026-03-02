import Link from "next/link";
import PageBanner from "@/components/PageBanner";
import Reveal from "@/components/Reveal";

export default function ProgramPage() {
  return (
    <>
      <PageBanner title="ΠΡΟΓΡΑΜΜΑ" image="https://static.wixstatic.com/media/335ee3_e9e30a3fd4b64fc8a1a12b8e5df1042b~mv2.jpg/v1/fill/w_1920,h_600,al_c,q_80,enc_avif,quality_auto/335ee3_e9e30a3fd4b64fc8a1a12b8e5df1042b~mv2.jpg" />
      <section style={{ padding: "80px 24px", maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
        <Reveal>
          <Link href="/program/mainstage" className="card-hover" style={{ display: "block", textDecoration: "none", background: "var(--color-charcoal)", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(200,168,78,0.15)" }}>
            <div className="img-zoom" style={{ height: 300 }}>
              <img
                src="https://static.wixstatic.com/media/335ee3_0cbc5cc783d9462e8a13a4ab6ce0a12d~mv2.jpg/v1/fill/w_800,h_500,al_c,q_80,enc_avif,quality_auto/360_F_315929483_O3zCF74h869pep9L2WMi6cWS2bhO2AjH.jpg"
                alt="Mainstage Schedule"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <div style={{ padding: "24px 32px" }}>
              <h2 className="gold-text" style={{ fontSize: "1.5rem", marginBottom: 8 }}>Κεντρική Σκηνή</h2>
              <p style={{ color: "#999" }}>Δείτε το πρόγραμμα της κεντρικής σκηνής</p>
              <div className="btn-gold" style={{ marginTop: 20, display: "inline-block" }}>ΠΡΟΓΡΑΜΜΑ ΣΚΗΝΗΣ</div>
            </div>
          </Link>
        </Reveal>
      </section>
    </>
  );
}

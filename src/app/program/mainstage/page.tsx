import PageBanner from "@/components/PageBanner";
import Reveal from "@/components/Reveal";

export default function MainstagePage() {
  return (
    <>
      <PageBanner title="ΚΕΝΤΡΙΚΗ ΣΚΗΝΗ" image="https://static.wixstatic.com/media/335ee3_e9e30a3fd4b64fc8a1a12b8e5df1042b~mv2.jpg/v1/fill/w_1920,h_600,al_c,q_80,enc_avif,quality_auto/335ee3_e9e30a3fd4b64fc8a1a12b8e5df1042b~mv2.jpg" />
      <section style={{ padding: "80px 24px", maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
        <Reveal>
          <h2 className="gold-text" style={{ fontSize: "1.8rem", marginBottom: 30 }}>ΠΡΟΓΡΑΜΜΑ ΚΕΝΤΡΙΚΗΣ ΣΚΗΝΗΣ</h2>
        </Reveal>
        <Reveal delay={200}>
          <div style={{ background: "var(--color-charcoal)", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(200,168,78,0.15)" }}>
            <img
              src="https://static.wixstatic.com/media/335ee3_0cbc5cc783d9462e8a13a4ab6ce0a12d~mv2.jpg/v1/fill/w_900,h_600,al_c,q_80,enc_avif,quality_auto/360_F_315929483_O3zCF74h869pep9L2WMi6cWS2bhO2AjH.jpg"
              alt="Schedule"
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        </Reveal>
        <Reveal delay={300}>
          <p style={{ color: "#999", fontSize: "0.85rem", marginTop: 20, fontStyle: "italic" }}>
            *Το πρόγραμμα στην κεντρική σκηνή μπορεί να τροποποιηθεί ανά πάσα στιγμή χωρίς ειδοποίηση από τους διοργανωτές
          </p>
        </Reveal>
      </section>
    </>
  );
}

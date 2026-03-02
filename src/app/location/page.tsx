import PageBanner from "@/components/PageBanner";
import Reveal from "@/components/Reveal";

export default function LocationPage() {
  return (
    <>
      <PageBanner title="ΤΟΠΟΘΕΣΙΑ" image="https://static.wixstatic.com/media/335ee3_e9e30a3fd4b64fc8a1a12b8e5df1042b~mv2.jpg/v1/fill/w_1920,h_600,al_c,q_80,enc_avif,quality_auto/335ee3_e9e30a3fd4b64fc8a1a12b8e5df1042b~mv2.jpg" />
      <section style={{ padding: "80px 24px", maxWidth: 900, margin: "0 auto" }}>
        <Reveal>
          <div style={{ background: "var(--color-charcoal)", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(200,168,78,0.2)" }}>
            <a
              href="https://www.google.com/maps/place/%CE%9A%CE%9B%CE%A9%CE%A3%CE%A4%CE%91%CE%99+%CE%A0%CE%95%CE%A4%CE%91%CE%9B%CE%9F%CE%A5%CE%94%CE%91%CE%A3+%CE%91.%CE%95.%CE%92.%CE%95./@37.9887571,23.6831104,17z"
              target="_blank" rel="noopener noreferrer"
              style={{ display: "block" }}
            >
              <img
                src="https://static.wixstatic.com/media/335ee3_df38d55480fc4349b016e64cfe2fb19d~mv2.png/v1/fill/w_900,h_600,al_c,q_85,enc_avif,quality_auto/Screenshot%202026-02-11%20230716.png"
                alt="Map Location"
                style={{ width: "100%", height: "auto" }}
              />
            </a>
            <div style={{ padding: "32px", textAlign: "center" }}>
              <h2 style={{ color: "#fff", fontSize: "1.3rem", marginBottom: 8 }}>26-27 Απριλίου 2026 ΑΘΗΝΑ</h2>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 8 }}>
                <h3 style={{ color: "var(--color-gold)", fontSize: "1.1rem", fontWeight: 400 }}>Εργοστάσιο &quot;Κλωσταί Πεταλούδα&quot;</h3>
                <img src="https://static.wixstatic.com/media/335ee3_8bbc727aac9149779115e8f126a96b37~mv2.png/v1/fill/w_68,h_52,al_c,q_85,enc_avif,quality_auto/%CF%80%CE%B5%CF%842.png" alt="Butterfly" style={{ height: 24 }} />
              </div>
              <p style={{ color: "#999", marginBottom: 4 }}>Παρ. Λεωφόρος Κηφισσού 42, Αιγάλεω</p>
              <p style={{ color: "#777", fontSize: "0.9rem" }}>(πλησίον Τεχνοχώρου &quot;Cartel&quot;)</p>
              <a
                href="https://www.google.com/maps/place/%CE%9A%CE%9B%CE%A9%CE%A3%CE%A4%CE%91%CE%99+%CE%A0%CE%95%CE%A4%CE%91%CE%9B%CE%9F%CE%A5%CE%94%CE%91%CE%A3+%CE%91.%CE%95.%CE%92.%CE%95./@37.9887571,23.6831104,17z"
                target="_blank" rel="noopener noreferrer"
                className="btn-gold"
                style={{ display: "inline-block", marginTop: 24, textDecoration: "none" }}
              >
                ΔΕΙΤΕ ΤΟ ΧΑΡΤΗ
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
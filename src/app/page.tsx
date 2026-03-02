"use client";
import Link from "next/link";
import CountdownTimer from "@/components/CountdownTimer";
import SponsorsCarousel from "@/components/SponsorsCarousel";
import Reveal from "@/components/Reveal";

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <img
            src="https://static.wixstatic.com/media/335ee3_f36a88cb36434c28be8630bc8dddef00~mv2.png/v1/fill/w_1920,h_1080,al_c,q_90,enc_avif,quality_auto/dok5.png"
            alt="Greek Barber Festival"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(13,13,13,0.55) 0%, rgba(13,13,13,0.65) 40%, rgba(13,13,13,0.85) 70%, rgba(13,13,13,0.97) 100%)" }} />
        </div>

        <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "0 24px", maxWidth: 900, margin: "0 auto" }}>
          <img
            src="https://static.wixstatic.com/media/335ee3_b2d2b07967304098a7d75f3fdac86fb9~mv2.png/v1/fill/w_330,h_312,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/6thgbfest%20white.png"
            alt="8th GBF Logo"
            style={{ height: "clamp(120px, 20vw, 200px)", margin: "0 auto 24px", display: "block" }}
          />
          <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "#fff", marginBottom: 8 }}>
            26-27 Απριλίου 2026 <span className="gold-text">ΑΘΗΝΑ</span>
          </h1>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 8 }}>
            <h2 style={{ fontSize: "clamp(1rem, 2.5vw, 1.5rem)", color: "#ddd", fontWeight: 400 }}>
              Εργοστάσιο &quot;Κλωσταί Πεταλούδα&quot;
            </h2>
            <img src="https://static.wixstatic.com/media/335ee3_8bbc727aac9149779115e8f126a96b37~mv2.png/v1/fill/w_94,h_72,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/%CF%80%CE%B5%CF%842.png" alt="Butterfly" style={{ height: 28 }} />
          </div>
          <p style={{ color: "#999", fontSize: "0.95rem", marginBottom: 32 }}>Παρ. Λεωφόρος Κηφισσού 42, Αιγάλεω (πλησίον Τεχνοχώρου &quot;Cartel&quot;)</p>

          <CountdownTimer />

          <div style={{ marginTop: 36, display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/tickets" className="btn-gold" style={{ textDecoration: "none" }}>ΕΙΣΙΤΗΡΙΑ</Link>
            <Link href="/competition" style={{ textDecoration: "none", fontFamily: "var(--font-display)", textTransform: "uppercase", letterSpacing: "0.1em", padding: "14px 36px", border: "2px solid var(--color-gold)", color: "var(--color-gold)", fontWeight: 700, transition: "all 0.3s" }}>ΔΙΑΓΩΝΙΣΜΟΣ</Link>
          </div>
        </div>

        <div style={{ position: "absolute", bottom: 30, left: "50%", transform: "translateX(-50%)", zIndex: 2 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold)" strokeWidth="2" style={{ animation: "fadeInUp 1.5s ease infinite" }}>
            <path d="M7 13l5 5 5-5M7 7l5 5 5-5" />
          </svg>
        </div>
      </section>

      {/* About Section */}
      <section style={{ padding: "100px 24px", maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
        <Reveal>
          <p style={{ fontSize: "clamp(1rem, 2vw, 1.2rem)", lineHeight: 1.8, color: "#ccc" }}>
            Το 8ο Greek Barber Festival είναι το σημείο συνάντησης της barber κουλτούρας στην Ελλάδα. Για 2 μέρες οι εμβληματικοί εργοστασιακοί χώροι της ιστορικής κλωστοϋφαντουργίας &quot;Κλωσταί Πεταλούδα&quot; στην Αθήνα, μετατρέπονται σε κέντρο έμπνευσης εκπαίδευσης και δημιουργίας. Ζωντανές παρουσιάσεις, εκπαιδευτικά σεμινάρια και διαγωνισμοί δημιουργούν μια μοναδική εμπειρία γνώσης, έμπνευσης και επαγγελματικής εξέλιξης. Ραντεβού 26-27 Απριλίου στο 8ο Greek Barber Festival.
          </p>
        </Reveal>
        <Reveal delay={200}>
          <h2 className="gold-text" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", marginTop: 32 }}>
            Εκπαίδευση - Εξέλιξη - Επιτυχία
          </h2>
        </Reveal>
      </section>

      {/* After Movies Section */}
      <section style={{ padding: "60px 24px 100px", maxWidth: 900, margin: "0 auto" }}>
        <Reveal>
          <h2 className="gold-text" style={{ textAlign: "center", fontSize: "clamp(1.5rem, 3vw, 2.2rem)", marginBottom: 50 }}>After Movies</h2>
        </Reveal>
        <div style={{ display: "flex", flexDirection: "column", gap: 50 }}>
          {[
            { title: "After Movie 7th Greek Barber Festival", id: "dQw4w9WgXcQ" },
            { title: "After Movie 6th Greek Barber Festival", id: "dQw4w9WgXcQ" },
            { title: "After Movie 5th Greek Barber Festival", id: "dQw4w9WgXcQ" },
          ].map((video, i) => (
            <Reveal key={i} delay={i * 150}>
              <div>
                <h3 className="gold-text" style={{ textAlign: "center", fontSize: "1.1rem", marginBottom: 16, fontWeight: 500 }}>{video.title}</h3>
                <div style={{ position: "relative", paddingBottom: "56.25%", background: "#000", borderRadius: 12, overflow: "hidden", border: "1px solid rgba(200,168,78,0.15)" }}>
                  <iframe
                    src={`https://www.youtube.com/embed/${video.id}?autoplay=0&mute=1&loop=1&playlist=${video.id}`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }}
                  />
                </div>
              </div>
            </Reveal>
          ))}
          {/* NOTE: Replace the YouTube video IDs above with the actual GBF after movie video IDs */}
        </div>
      </section>

      {/* Guest Educators 2026 */}
      <section style={{ padding: "80px 24px", background: "var(--color-charcoal)" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <Reveal>
            <h2 className="gold-text" style={{ textAlign: "center", fontSize: "clamp(1.5rem, 3vw, 2.2rem)", marginBottom: 50 }}>Guest Educators 2026</h2>
          </Reveal>
          <div style={{ display: "flex", gap: 30, justifyContent: "center", flexWrap: "wrap" }}>
            {[
              { name: "@srgo", img: "https://static.wixstatic.com/media/335ee3_f27cef887a604cd1b014df6bb42a4aad~mv2.jpg/v1/fill/w_296,h_370,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Sergio.jpg", link: "https://www.instagram.com/srgo/?hl=en" },
              { name: "@pedrenato", img: "https://static.wixstatic.com/media/335ee3_0f107dda385d45a3b2dbc5333757b1d4~mv2.png/v1/fill/w_296,h_370,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Pedroa.png", link: "https://www.instagram.com/pedrenato/?hl=en" },
            ].map((educator, i) => (
              <Reveal key={i} delay={i * 200}>
                <a href={educator.link} target="_blank" rel="noopener noreferrer" className="card-hover" style={{ display: "block", textDecoration: "none", borderRadius: 12, overflow: "hidden", border: "1px solid rgba(200,168,78,0.15)", width: 280 }}>
                  <div className="img-zoom">
                    <img src={educator.img} alt={educator.name} style={{ width: "100%", height: 350, objectFit: "cover" }} />
                  </div>
                  <div style={{ padding: "16px 20px", display: "flex", alignItems: "center", gap: 8, background: "rgba(13,13,13,0.8)" }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="var(--color-gold)"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                    <span style={{ color: "var(--color-gold)", fontFamily: "var(--font-display)", fontSize: "0.95rem" }}>{educator.name}</span>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsors Carousel */}
      <section style={{ padding: "80px 24px" }}>
        <Reveal>
          <h2 className="gold-text" style={{ textAlign: "center", fontSize: "clamp(1.5rem, 3vw, 2.2rem)", marginBottom: 30 }}>Sponsors 7th GBF</h2>
        </Reveal>
        <SponsorsCarousel />
      </section>

      {/* Hero Photo Section */}
      <section style={{ position: "relative", overflow: "hidden" }}>
        <img
          src="https://static.wixstatic.com/media/335ee3_e9e30a3fd4b64fc8a1a12b8e5df1042b~mv2.jpg"
          alt="Festival Scene"
          style={{ width: "100%", height: "auto", display: "block" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(13,13,13,0.5), rgba(13,13,13,0.8))", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 24px" }}>
          <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)", color: "#fff", marginBottom: 8 }}>
            26-27 Απριλίου 2026 <span className="gold-text">ΑΘΗΝΑ</span>
          </h2>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <p style={{ color: "#ddd", fontSize: "1.1rem" }}>Εργοστάσιο &quot;Κλωσταί Πεταλούδα&quot;</p>
            <img src="https://static.wixstatic.com/media/335ee3_8bbc727aac9149779115e8f126a96b37~mv2.png/v1/fill/w_68,h_52,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/%CF%80%CE%B5%CF%842.png" alt="Butterfly" style={{ height: 24 }} />
          </div>
          <p style={{ color: "#999", fontSize: "0.9rem", marginTop: 4 }}>Παρ. Λεωφόρος Κηφισσού 42, Αιγάλεω (πλησίον Τεχνοχώρου &quot;Cartel&quot;)</p>
        </div>
      </section>
    </>
  );
}

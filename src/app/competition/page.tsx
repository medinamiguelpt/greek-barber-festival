import Link from "next/link";
import PageBanner from "@/components/PageBanner";
import Reveal from "@/components/Reveal";

const CATEGORIES = [
  {
    title: "Old School Haircut",
    image: "https://static.wixstatic.com/media/335ee3_a6131c9e7ce94f6ab66dbb47f3e6ee7e~mv2.jpg/v1/fill/w_500,h_500,al_c,q_80,enc_avif,quality_auto/DSC_9235.jpg",
    href: "/competition/oldschoolhaircut",
    time: "60 λεπτά",
  },
  {
    title: "Modern Barbering",
    image: "https://static.wixstatic.com/media/335ee3_01e1ae9b5a324b47a094dd86c3325618~mv2.jpg/v1/fill/w_500,h_500,al_c,q_80,enc_avif,quality_auto/DSC_9228.jpg",
    href: "/competition/modernbarbering",
    time: "60 λεπτά",
  },
  {
    title: "Fastest Low Fade",
    image: "https://static.wixstatic.com/media/335ee3_98fac8e7ca754f8f95d6eb57e2e610d0~mv2.jpg/v1/fill/w_500,h_500,al_c,q_80,enc_avif,quality_auto/DSC_9229.jpg",
    href: "/competition/fastestlowfade",
    time: "15 λεπτά",
  },
  {
    title: "Freestyle Total Look",
    image: "https://static.wixstatic.com/media/335ee3_adf4dc1e0b8f4b7e8f6f2f0e5c0d9b8a~mv2.jpg/v1/fill/w_500,h_500,al_c,q_80,enc_avif,quality_auto/DSC_9225.jpg",
    href: "/competition/freestyletotallook",
    time: "60 λεπτά",
  },
];

export default function CompetitionPage() {
  return (
    <>
      <PageBanner title="ΔΙΑΓΩΝΙΣΜΟΣ" image="https://static.wixstatic.com/media/335ee3_9c6d7b8f7e694e40b10bda0de7eee0f0~mv2.jpg/v1/fill/w_1920,h_600,al_c,q_80,enc_avif,quality_auto/LSD_4282.jpg" />
      <section style={{ padding: "80px 24px", maxWidth: 1100, margin: "0 auto" }}>
        <Reveal>
          <h2 className="gold-text" style={{ textAlign: "center", fontSize: "1.8rem", marginBottom: 50 }}>Διαγωνιστικά Θέματα</h2>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24 }}>
          {CATEGORIES.map((cat, i) => (
            <Reveal key={cat.href} delay={i * 150}>
              <Link href={cat.href} className="card-hover" style={{ display: "block", textDecoration: "none", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(200,168,78,0.15)", background: "var(--color-charcoal)" }}>
                <div className="img-zoom" style={{ height: 260 }}>
                  <img src={cat.image} alt={cat.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div style={{ padding: "20px 24px" }}>
                  <h3 style={{ color: "var(--color-gold)", fontSize: "1.1rem", marginBottom: 4 }}>{cat.title}</h3>
                  <p style={{ color: "#999", fontSize: "0.85rem" }}>Χρόνος: {cat.time}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* Quick links to other competition pages */}
        <div style={{ marginTop: 60, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
          {[
            { label: "Μαθητικός Διαγωνισμός", href: "/competition/student" },
            { label: "Κόστος Συμμετοχής", href: "/competition/fees" },
            { label: "Όροι Συμμετοχής", href: "/competition/rules" },
          ].map((link) => (
            <Reveal key={link.href}>
              <Link href={link.href} style={{ display: "block", textDecoration: "none", textAlign: "center", padding: "20px", background: "rgba(200,168,78,0.08)", borderRadius: 12, border: "1px solid rgba(200,168,78,0.15)", color: "var(--color-gold)", fontFamily: "var(--font-display)", fontSize: "0.95rem", transition: "all 0.3s" }}>
                {link.label}
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}

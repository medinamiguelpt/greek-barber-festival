import Link from "next/link";
import PageBanner from "@/components/PageBanner";
import Reveal from "@/components/Reveal";

const TOPICS = [
  { title: "Old School Haircut", time: "60 λεπτά", href: "/competition/oldschoolhaircut", img: "https://static.wixstatic.com/media/335ee3_a6131c9e7ce94f6ab66dbb47f3e6ee7e~mv2.jpg/v1/fill/w_500,h_500,al_c,q_80,enc_avif,quality_auto/DSC_9235.jpg" },
  { title: "Modern Barbering", time: "60 λεπτά", href: "/competition/modernbarbering", img: "https://static.wixstatic.com/media/335ee3_01e1ae9b5a324b47a094dd86c3325618~mv2.jpg/v1/fill/w_500,h_500,al_c,q_80,enc_avif,quality_auto/DSC_9228.jpg" },
  { title: "Fastest Low Fade", time: "15 λεπτά", href: "/competition/fastestlowfade", img: "https://static.wixstatic.com/media/335ee3_98fac8e7ca754f8f95d6eb57e2e610d0~mv2.jpg/v1/fill/w_500,h_500,al_c,q_80,enc_avif,quality_auto/DSC_9229.jpg" },
  { title: "Freestyle Total Look", time: "60 λεπτά", href: "/competition/freestyletotallook", img: "https://static.wixstatic.com/media/335ee3_e9e30a3fd4b64fc8a1a12b8e5df1042b~mv2.jpg/v1/fill/w_500,h_500,al_c,q_80,enc_avif,quality_auto/335ee3_e9e30a3fd4b64fc8a1a12b8e5df1042b~mv2.jpg" },
];

export default function TopicsPage() {
  return (
    <>
      <PageBanner title="ΔΙΑΓΩΝΙΣΤΙΚΑ ΘΕΜΑΤΑ" image="https://static.wixstatic.com/media/335ee3_9c6d7b8f7e694e40b10bda0de7eee0f0~mv2.jpg/v1/fill/w_1920,h_600,al_c,q_80,enc_avif,quality_auto/LSD_4282.jpg" />
      <section style={{ padding: "80px 24px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24 }}>
          {TOPICS.map((t, i) => (
            <Reveal key={t.href} delay={i * 150}>
              <Link href={t.href} className="card-hover" style={{ display: "block", textDecoration: "none", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(200,168,78,0.15)", background: "var(--color-charcoal)" }}>
                <div className="img-zoom" style={{ height: 260 }}>
                  <img src={t.img} alt={t.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div style={{ padding: "20px 24px" }}>
                  <h3 style={{ color: "var(--color-gold)", fontSize: "1.1rem", marginBottom: 4 }}>{t.title}</h3>
                  <p style={{ color: "#999", fontSize: "0.85rem" }}>Χρόνος: {t.time}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
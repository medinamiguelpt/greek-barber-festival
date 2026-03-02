import Link from "next/link";
import PageBanner from "@/components/PageBanner";

export default function FeesPage() {
  return (
    <>
      <PageBanner title="ΚΟΣΤΟΣ ΣΥΜΜΕΤΟΧΗΣ" image="https://static.wixstatic.com/media/335ee3_9c6d7b8f7e694e40b10bda0de7eee0f0~mv2.jpg/v1/fill/w_1920,h_600,al_c,q_80,enc_avif,quality_auto/LSD_4282.jpg" />
      <section style={{ padding: "80px 24px", maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
        <p style={{ color: "#ccc", fontSize: "1.1rem", marginBottom: 30 }}>Για πλήρεις τιμές και δήλωση συμμετοχής:</p>
        <Link href="/tickets/competition-fee" className="btn-gold" style={{ textDecoration: "none", display: "inline-block" }}>ΔΕΙΤΕ ΑΝΑΛΥΤΙΚΑ ΚΟΣΤΗ & ΕΓΓΡΑΦΗ</Link>
      </section>
    </>
  );
}
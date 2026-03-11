"use client";
import PageBanner from "@/components/PageBanner";
import Reveal from "@/components/Reveal";
import { useLanguage } from "@/components/LanguageContext";

export default function ContactPage() {
  const { t } = useLanguage();
  return (
    <>
      <PageBanner title={t("contact_title")} image="https://static.wixstatic.com/media/335ee3_e9e30a3fd4b64fc8a1a12b8e5df1042b~mv2.jpg/v1/fill/w_1920,h_600,al_c,q_80,enc_avif,quality_auto/335ee3_e9e30a3fd4b64fc8a1a12b8e5df1042b~mv2.jpg" />
      <section style={{ padding: "80px 24px", maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
        <Reveal>
          <div style={{ background: "var(--bg-card)", borderRadius: 16, padding: "50px 40px", border: "1px solid rgba(200,168,78,0.2)" }}>
            <h2 style={{ color: "var(--text-primary)", fontSize: "1rem", marginBottom: 8 }}>{t("contact_person_label")}</h2>
            <p style={{ color: "var(--color-gold)", fontSize: "1.3rem", fontFamily: "var(--font-display)", marginBottom: 30 }}>Μάρρα Ελένη</p>

            <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "center" }}>
              <a href="tel:+302744066437" style={{ color: "var(--text-secondary)", textDecoration: "none", fontSize: "1.5rem", fontFamily: "var(--font-display)" }}>+30 27440-66437</a>
              <a href="tel:+306945977046" style={{ color: "var(--text-secondary)", textDecoration: "none", fontSize: "1.5rem", fontFamily: "var(--font-display)" }}>+30 6945977046</a>
              <a href="mailto:eleni_marra@yahoo.gr" style={{ color: "var(--color-gold)", textDecoration: "none", fontSize: "1.1rem" }}>eleni_marra@yahoo.gr</a>
            </div>

            <div style={{ marginTop: 40, paddingTop: 30, borderTop: "1px solid var(--border-faint)" }}>
              <h3 className="gold-text" style={{ fontSize: "1rem", marginBottom: 16 }}>{t("contact_follow")}</h3>
              <div style={{ display: "flex", gap: 20, justifyContent: "center" }}>
                <a href="https://www.instagram.com/greekbarberfestival/?hl=el" target="_blank" rel="noopener noreferrer" style={{ color: "var(--text-secondary)", textDecoration: "none", display: "flex", alignItems: "center", gap: 8, transition: "color 0.3s" }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  greekbarberfestival
                </a>
                <a href="https://www.facebook.com/GreekBarberFestival/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--text-secondary)", textDecoration: "none", display: "flex", alignItems: "center", gap: 8, transition: "color 0.3s" }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  Greek Barber Festival
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
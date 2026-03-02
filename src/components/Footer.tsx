import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ background: "var(--color-charcoal)", borderTop: "1px solid rgba(200,168,78,0.2)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "60px 24px 30px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 40, marginBottom: 40 }}>
          {/* Logo & Info */}
          <div>
            <img
              src="https://static.wixstatic.com/media/335ee3_15d7f8c921374c6c887025883fc9f226~mv2.png/v1/fill/w_169,h_334,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Greek%20Barber%20Festival_colored_white_icon.png"
              alt="GBF Icon"
              style={{ height: 120, marginBottom: 16 }}
            />
            <p style={{ color: "#999", fontSize: "0.9rem", lineHeight: 1.6 }}>
              26-27 Απριλίου 2026 ΑΘΗΝΑ<br />
              Εργοστάσιο &quot;Κλωσταί Πεταλούδα&quot;
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 8 }}>
              <img
                src="https://static.wixstatic.com/media/335ee3_8bbc727aac9149779115e8f126a96b37~mv2.png/v1/fill/w_68,h_52,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/%CF%80%CE%B5%CF%842.png"
                alt="Butterfly"
                style={{ height: 24 }}
              />
              <span style={{ color: "#999", fontSize: "0.85rem" }}>Παρ. Λεωφόρος Κηφισσού 42, Αιγάλεω</span>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 style={{ color: "var(--color-gold)", fontSize: "1rem", marginBottom: 16 }}>Τηλέφωνα Επικοινωνίας</h3>
            <p style={{ color: "#ccc", marginBottom: 8 }}>+30 27440-66437</p>
            <p style={{ color: "#ccc", marginBottom: 16 }}>+30 6945977046</p>
            <h3 style={{ color: "var(--color-gold)", fontSize: "1rem", marginBottom: 12 }}>Find us &amp; Follow us</h3>
            <div style={{ display: "flex", gap: 12 }}>
              <a href="https://www.instagram.com/greekbarberfestival/?hl=el" target="_blank" rel="noopener noreferrer" style={{ color: "#ccc", textDecoration: "none", display: "flex", alignItems: "center", gap: 6, fontSize: "0.9rem" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                greekbarberfestival
              </a>
            </div>
            <div style={{ marginTop: 8 }}>
              <a href="https://www.facebook.com/GreekBarberFestival/" target="_blank" rel="noopener noreferrer" style={{ color: "#ccc", textDecoration: "none", display: "flex", alignItems: "center", gap: 6, fontSize: "0.9rem" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                Greek Barber Festival
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 style={{ color: "var(--color-gold)", fontSize: "1rem", marginBottom: 16 }}>Σύνδεσμοι</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                { label: "Εισιτήρια", href: "/tickets" },
                { label: "Πρόγραμμα", href: "/program" },
                { label: "Διαγωνισμός", href: "/competition" },
                { label: "Φωτογραφίες", href: "/photos" },
                { label: "Χορηγοί", href: "/sponsors" },
                { label: "Επικοινωνία", href: "/contact" },
                { label: "Τοποθεσία", href: "/location" },
              ].map((link) => (
                <Link key={link.href} href={link.href} style={{ color: "#999", textDecoration: "none", fontSize: "0.9rem", transition: "color 0.3s" }}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 20, textAlign: "center" }}>
          <a href="http://www.greekbarberfestival.gr" target="_blank" rel="noopener noreferrer" style={{ color: "var(--color-gold)", textDecoration: "none", fontSize: "0.9rem" }}>
            www.greekbarberfestival.gr
          </a>
          <p style={{ color: "#666", fontSize: "0.8rem", marginTop: 8 }}>© 2026 Greek Barber Festival. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

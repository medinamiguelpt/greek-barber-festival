"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const NAV_ITEMS = [
  {
    label: "ΕΙΣΙΤΗΡΙΑ",
    href: "/tickets",
    children: [
      { label: "Γενική Είσοδος", href: "/tickets/general-admission" },
      { label: "Διαγωνισμός", href: "/tickets/competition-fee" },
    ],
  },
  {
    label: "ΠΡΟΓΡΑΜΜΑ",
    href: "/program",
    children: [
      { label: "Κεντρική Σκηνή", href: "/program/mainstage" },
    ],
  },
  {
    label: "ΔΙΑΓΩΝΙΣΜΟΣ",
    href: "/competition",
    children: [
      { label: "Διαγωνιστικά Θέματα", href: "/competition/topics" },
      { label: "Μαθητικός Διαγωνισμός", href: "/competition/student" },
      { label: "Κόστος Συμμετοχής", href: "/competition/fees" },
      { label: "Όροι Συμμετοχής", href: "/competition/rules" },
    ],
  },
  { label: "ΦΩΤΟΓΡΑΦΙΕΣ", href: "/photos" },
  { label: "ΧΟΡΗΓΟΙ", href: "/sponsors" },
  { label: "ΕΠΙΚΟΙΝΩΝΙΑ", href: "/contact" },
  { label: "ΤΟΠΟΘΕΣΙΑ", href: "/location" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 9999,
          background: scrolled ? "rgba(13,13,13,0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(200,168,78,0.15)" : "none",
          transition: "all 0.4s ease",
          padding: scrolled ? "8px 0" : "16px 0",
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
            <img
              src="https://static.wixstatic.com/media/335ee3_b2d2b07967304098a7d75f3fdac86fb9~mv2.png/v1/fill/w_165,h_156,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/6thgbfest%20white.png"
              alt="Greek Barber Festival"
              style={{ height: scrolled ? 45 : 55, transition: "height 0.4s ease" }}
            />
          </Link>

          {/* Desktop Nav */}
          <div style={{ display: "flex", gap: 24, alignItems: "center" }} className="desktop-nav">
            {NAV_ITEMS.map((item) =>
              item.children ? (
                <div key={item.href} className="dropdown">
                  <Link href={item.href} className="nav-link">
                    {item.label}
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="currentColor" style={{ marginLeft: 4, verticalAlign: "middle" }}>
                      <path d="M5 6L0 0h10z" />
                    </svg>
                  </Link>
                  <div className="dropdown-menu">
                    {item.children.map((child) => (
                      <Link key={child.href} href={child.href}>{child.label}</Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link key={item.href} href={item.href} className="nav-link">
                  {item.label}
                </Link>
              )
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            style={{
              display: "none",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 8,
              zIndex: 10001,
            }}
          >
            <div style={{ width: 28, height: 20, position: "relative" }}>
              <span style={{ position: "absolute", left: 0, width: "100%", height: 2, background: mobileOpen ? "var(--color-gold)" : "#fff", transition: "all 0.3s", top: mobileOpen ? 9 : 0, transform: mobileOpen ? "rotate(45deg)" : "none" }} />
              <span style={{ position: "absolute", left: 0, width: "100%", height: 2, background: "#fff", top: 9, opacity: mobileOpen ? 0 : 1, transition: "opacity 0.3s" }} />
              <span style={{ position: "absolute", left: 0, width: "100%", height: 2, background: mobileOpen ? "var(--color-gold)" : "#fff", transition: "all 0.3s", top: mobileOpen ? 9 : 18, transform: mobileOpen ? "rotate(-45deg)" : "none" }} />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="mobile-menu" onClick={(e) => { if (e.target === e.currentTarget) setMobileOpen(false); }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {NAV_ITEMS.map((item) => (
              <div key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => !item.children && setMobileOpen(false)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "14px 0",
                    color: "#fff",
                    textDecoration: "none",
                    fontFamily: "var(--font-display)",
                    fontSize: "1.2rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  {item.label}
                  {item.children && (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setOpenDropdown(openDropdown === item.href ? null : item.href);
                      }}
                      style={{ background: "none", border: "none", color: "var(--color-gold)", cursor: "pointer", padding: "4px 8px" }}
                    >
                      <svg width="12" height="8" viewBox="0 0 12 8" fill="currentColor" style={{ transform: openDropdown === item.href ? "rotate(180deg)" : "none", transition: "transform 0.3s" }}>
                        <path d="M6 8L0 0h12z" />
                      </svg>
                    </button>
                  )}
                </Link>
                {item.children && openDropdown === item.href && (
                  <div style={{ paddingLeft: 20, paddingBottom: 8 }}>
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setMobileOpen(false)}
                        style={{ display: "block", padding: "10px 0", color: "#aaa", textDecoration: "none", fontSize: "0.95rem", borderBottom: "1px solid rgba(255,255,255,0.03)" }}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 1024px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>
    </>
  );
}

"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useLanguage, LANG_LABELS, Language } from "./LanguageContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const { t, lang, setLang, theme, toggleTheme } = useLanguage();

  const NAV_ITEMS = [
    {
      label: t("nav_tickets"),
      href: "/tickets",
      children: [
        { label: t("nav_general_admission"), href: "/tickets/general-admission" },
        { label: t("nav_competition_cost"), href: "/tickets/competition-fee" },
      ],
    },
    {
      label: t("nav_program"),
      href: "/program",
      children: [
        { label: t("nav_mainstage"), href: "/program/mainstage" },
      ],
    },
    {
      label: t("nav_competition"),
      href: "/competition",
      children: [
        { label: t("nav_competition_topics"), href: "/competition/topics" },
        { label: t("nav_student"), href: "/competition/student" },
        { label: t("nav_fees"), href: "/competition/fees" },
        { label: t("nav_rules"), href: "/competition/rules" },
      ],
    },
    { label: t("nav_photos"), href: "/photos" },
    { label: t("nav_sponsors"), href: "/sponsors" },
    { label: t("nav_contact"), href: "/contact" },
    { label: t("nav_location"), href: "/location" },
  ];

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

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const isDark = theme === "dark";

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 9999,
        background: scrolled ? "var(--nav-scrolled)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "none",
        transition: "all 0.4s ease",
        padding: scrolled ? "8px 0" : "16px 0",
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
            <img src="/8thgbfest-white.png" alt="Greek Barber Festival"
              style={{ height: scrolled ? 45 : 55, transition: "height 0.4s ease", filter: "var(--logo-filter)" }} />
          </Link>

          {/* Desktop Nav */}
          <div style={{ display: "flex", gap: 20, alignItems: "center" }} className="desktop-nav">
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
                <Link key={item.href} href={item.href} className="nav-link">{item.label}</Link>
              )
            )}

            {/* Theme Toggle */}
            <button onClick={toggleTheme} aria-label="Toggle theme"
              title={isDark ? "Light mode" : "Dark mode"}
              style={{ background: "var(--gold-bg)", border: "1px solid var(--border)", borderRadius: 20, width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.3s", flexShrink: 0 }}>
              {isDark
                ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c8a84e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
                : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a68a3e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
              }
            </button>

            {/* Language Switcher */}
            <div ref={langRef} style={{ position: "relative" }}>
              <button onClick={() => setLangOpen(!langOpen)}
                style={{ background: "var(--gold-bg)", border: "1px solid var(--border)", borderRadius: 20, padding: "6px 12px", display: "flex", alignItems: "center", gap: 6, cursor: "pointer", color: "var(--color-gold)", fontFamily: "var(--font-display)", fontSize: "0.8rem", letterSpacing: "0.05em", transition: "all 0.3s" }}>
                <span style={{ fontSize: "1rem" }}>{LANG_LABELS[lang].flag}</span>
                <span>{lang.toUpperCase()}</span>
                <svg width="8" height="5" viewBox="0 0 10 6" fill="currentColor" style={{ transform: langOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}><path d="M5 6L0 0h10z"/></svg>
              </button>

              {langOpen && (
                <div style={{ position: "absolute", top: "calc(100% + 8px)", right: 0, background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden", minWidth: 170, boxShadow: "0 12px 40px rgba(0,0,0,0.3)", zIndex: 100 }}>
                  {(Object.keys(LANG_LABELS) as Language[]).map((l) => (
                    <button key={l} onClick={() => { setLang(l); setLangOpen(false); }}
                      style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "10px 16px", background: l === lang ? "var(--gold-bg)" : "transparent", border: "none", borderBottom: "1px solid var(--border-faint)", cursor: "pointer", color: l === lang ? "var(--color-gold)" : "var(--text-secondary)", fontFamily: "var(--font-body)", fontSize: "0.9rem", textAlign: "left", transition: "background 0.2s", direction: "ltr" }}>
                      <span style={{ fontSize: "1.1rem" }}>{LANG_LABELS[l].flag}</span>
                      <span>{LANG_LABELS[l].label}</span>
                      {l === lang && <span style={{ marginLeft: "auto", color: "var(--color-gold)" }}>✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile controls */}
          <div style={{ display: "none", alignItems: "center", gap: 8 }} className="mobile-controls">
            <button onClick={toggleTheme} aria-label="Toggle theme"
              style={{ background: "var(--gold-bg)", border: "1px solid var(--border)", borderRadius: 20, width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              {isDark
                ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c8a84e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
                : <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a68a3e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
              }
            </button>

            <button onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu"
              style={{ background: "none", border: "none", cursor: "pointer", padding: 8, zIndex: 10001 }}>
              <div style={{ width: 28, height: 20, position: "relative" }}>
                <span style={{ position: "absolute", left: 0, width: "100%", height: 2, background: mobileOpen ? "var(--color-gold)" : "var(--text-primary)", transition: "all 0.3s", top: mobileOpen ? 9 : 0, transform: mobileOpen ? "rotate(45deg)" : "none" }} />
                <span style={{ position: "absolute", left: 0, width: "100%", height: 2, background: "var(--text-primary)", top: 9, opacity: mobileOpen ? 0 : 1, transition: "opacity 0.3s" }} />
                <span style={{ position: "absolute", left: 0, width: "100%", height: 2, background: mobileOpen ? "var(--color-gold)" : "var(--text-primary)", transition: "all 0.3s", top: mobileOpen ? 9 : 18, transform: mobileOpen ? "rotate(-45deg)" : "none" }} />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="mobile-menu" onClick={(e) => { if (e.target === e.currentTarget) setMobileOpen(false); }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {/* Language row */}
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", paddingBottom: 16, borderBottom: "1px solid var(--border-faint)", marginBottom: 8 }}>
              {(Object.keys(LANG_LABELS) as Language[]).map((l) => (
                <button key={l} onClick={() => setLang(l)}
                  style={{ background: l === lang ? "var(--gold-bg)" : "transparent", border: `1px solid ${l === lang ? "var(--color-gold)" : "var(--border)"}`, borderRadius: 16, padding: "4px 10px", cursor: "pointer", color: l === lang ? "var(--color-gold)" : "var(--text-muted)", fontSize: "0.8rem", fontFamily: "var(--font-display)", display: "flex", alignItems: "center", gap: 4 }}>
                  <span>{LANG_LABELS[l].flag}</span>
                  <span>{l.toUpperCase()}</span>
                </button>
              ))}
            </div>

            {NAV_ITEMS.map((item) => (
              <div key={item.href}>
                <Link href={item.href} onClick={() => !item.children && setMobileOpen(false)}
                  style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0", color: "var(--text-primary)", textDecoration: "none", fontFamily: "var(--font-display)", fontSize: "1.2rem", textTransform: "uppercase", letterSpacing: "0.05em", borderBottom: "1px solid var(--border-faint)" }}>
                  {item.label}
                  {item.children && (
                    <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); setOpenDropdown(openDropdown === item.href ? null : item.href); }}
                      style={{ background: "none", border: "none", color: "var(--color-gold)", cursor: "pointer", padding: "4px 8px" }}>
                      <svg width="12" height="8" viewBox="0 0 12 8" fill="currentColor" style={{ transform: openDropdown === item.href ? "rotate(180deg)" : "none", transition: "transform 0.3s" }}>
                        <path d="M6 8L0 0h12z" />
                      </svg>
                    </button>
                  )}
                </Link>
                {item.children && openDropdown === item.href && (
                  <div style={{ paddingLeft: 20, paddingBottom: 8 }}>
                    {item.children.map((child) => (
                      <Link key={child.href} href={child.href} onClick={() => setMobileOpen(false)}
                        style={{ display: "block", padding: "10px 0", color: "var(--text-muted)", textDecoration: "none", fontSize: "0.95rem", borderBottom: "1px solid var(--border-faint)" }}>
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
          .mobile-controls { display: flex !important; }
        }
        .dropdown { position: relative; }
        .dropdown-menu {
          display: none; position: absolute; top: calc(100% + 12px); left: 50%; transform: translateX(-50%);
          background: var(--bg-card); border: 1px solid var(--border); border-radius: 12px;
          overflow: hidden; min-width: 200px; box-shadow: 0 12px 40px rgba(0,0,0,0.3); z-index: 100;
        }
        .dropdown:hover .dropdown-menu { display: block; }
        .dropdown-menu a { display: block; padding: 12px 20px; color: var(--text-secondary); text-decoration: none; font-family: var(--font-body); font-size: 0.9rem; border-bottom: 1px solid var(--border-faint); transition: background 0.2s, color 0.2s; }
        .dropdown-menu a:hover { background: var(--gold-bg); color: var(--color-gold); }
        .nav-link { font-family: var(--font-display); font-size: 0.8rem; letter-spacing: 0.08em; text-decoration: none; color: var(--text-primary); transition: color 0.2s; }
        .nav-link:hover { color: var(--color-gold); }
        .mobile-menu { position: fixed; inset: 0; z-index: 9998; padding: 100px 32px 40px; overflow-y: auto; background: var(--mobile-menu-bg); }
      `}</style>
    </>
  );
}

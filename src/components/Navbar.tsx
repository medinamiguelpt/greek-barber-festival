"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useLanguage, LANG_LABELS, Language } from "./LanguageContext";

// ── Chevron icon ──────────────────────────────────────────────────────────────
function Chevron({ open }: { open?: boolean }) {
  return (
    <svg
      width="10" height="6" viewBox="0 0 10 6"
      fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
      style={{ transition: "transform 0.25s ease", transform: open ? "rotate(180deg)" : "rotate(0deg)", display: "block" }}
    >
      <path d="M1 1l4 4 4-4" />
    </svg>
  );
}

// ── Sun / Moon icons ──────────────────────────────────────────────────────────
function SunIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
      stroke="#c8a84e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}
function MoonIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
      stroke="#a68a3e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const { t, lang, setLang, theme, toggleTheme } = useLanguage();
  const isDark = theme === "dark";

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
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <>
      {/* ─── NAV BAR ─────────────────────────────────────────────────────────── */}
      <nav className={`gbf-nav${scrolled ? " gbf-nav--scrolled" : ""}`}>
        <div className="gbf-nav__inner">

          {/* Logo */}
          <Link href="/" className="gbf-nav__logo">
            <img src="/8thgbfest-white.png" alt="Greek Barber Festival" />
          </Link>

          {/* Desktop links */}
          <div className="gbf-nav__links">
            {NAV_ITEMS.map((item) =>
              item.children ? (
                <div key={item.href} className="gbf-dropdown">
                  <Link href={item.href} className="gbf-nav__link">
                    <span>{item.label}</span>
                    <Chevron />
                  </Link>
                  <div className="gbf-dropdown__panel">
                    {item.children.map((child) => (
                      <Link key={child.href} href={child.href} className="gbf-dropdown__item">
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link key={item.href} href={item.href} className="gbf-nav__link">
                  {item.label}
                </Link>
              )
            )}
          </div>

          {/* Right controls */}
          <div className="gbf-nav__controls">
            <button onClick={toggleTheme} aria-label={isDark ? "Light mode" : "Dark mode"} className="gbf-icon-btn">
              {isDark ? <SunIcon /> : <MoonIcon />}
            </button>

            <div ref={langRef} style={{ position: "relative" }}>
              <button onClick={() => setLangOpen((o) => !o)} className="gbf-lang-btn">
                <span className="gbf-lang-btn__flag">{LANG_LABELS[lang].flag}</span>
                <span>{lang.toUpperCase()}</span>
                <Chevron open={langOpen} />
              </button>

              {langOpen && (
                <div className="gbf-lang-panel">
                  {(Object.keys(LANG_LABELS) as Language[]).map((l) => (
                    <button
                      key={l}
                      onClick={() => { setLang(l); setLangOpen(false); }}
                      className={`gbf-lang-panel__item${l === lang ? " gbf-lang-panel__item--active" : ""}`}
                    >
                      <span>{LANG_LABELS[l].flag}</span>
                      <span>{LANG_LABELS[l].label}</span>
                      {l === lang && (
                        <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor"
                          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: "auto" }}>
                          <polyline points="2 7 6 11 12 3" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile controls */}
          <div className="gbf-mobile-controls">
            <button onClick={toggleTheme} aria-label="Toggle theme" className="gbf-icon-btn gbf-icon-btn--sm">
              {isDark ? <SunIcon /> : <MoonIcon />}
            </button>
            <button onClick={() => setMobileOpen((o) => !o)} aria-label="Toggle menu" className="gbf-hamburger">
              <span className={`gbf-hamburger__bar gbf-hamburger__bar--1${mobileOpen ? " open" : ""}`} />
              <span className={`gbf-hamburger__bar gbf-hamburger__bar--2${mobileOpen ? " open" : ""}`} />
              <span className={`gbf-hamburger__bar gbf-hamburger__bar--3${mobileOpen ? " open" : ""}`} />
            </button>
          </div>

        </div>
      </nav>

      {/* ─── MOBILE MENU ────────────────────────────────────────────────────── */}
      {mobileOpen && (
        <div className="gbf-mobile-menu" onClick={(e) => { if (e.target === e.currentTarget) setMobileOpen(false); }}>
          <div className="gbf-mobile-menu__body">

            <div className="gbf-mobile-menu__langs">
              {(Object.keys(LANG_LABELS) as Language[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`gbf-mobile-menu__lang-chip${l === lang ? " active" : ""}`}
                >
                  <span>{LANG_LABELS[l].flag}</span>
                  <span>{l.toUpperCase()}</span>
                </button>
              ))}
            </div>

            {NAV_ITEMS.map((item) => (
              <div key={item.href} className="gbf-mobile-menu__row">
                <div className="gbf-mobile-menu__row-top">
                  <Link
                    href={item.href}
                    onClick={() => !item.children && setMobileOpen(false)}
                    className="gbf-mobile-menu__row-label"
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <button
                      onClick={() => setOpenDropdown(openDropdown === item.href ? null : item.href)}
                      className="gbf-mobile-menu__expand"
                    >
                      <Chevron open={openDropdown === item.href} />
                    </button>
                  )}
                </div>

                {item.children && openDropdown === item.href && (
                  <div className="gbf-mobile-menu__sub">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setMobileOpen(false)}
                        className="gbf-mobile-menu__sub-link"
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

      {/* ─── STYLES ─────────────────────────────────────────────────────────── */}
      <style>{`

        /* Nav shell */
        .gbf-nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 9999;
          padding: 18px 0;
          background: transparent;
          transition: padding 0.35s ease, background 0.35s ease,
                      backdrop-filter 0.35s ease, border-bottom 0.35s ease;
        }
        .gbf-nav--scrolled {
          padding: 10px 0;
          background: var(--nav-scrolled);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--border);
        }
        .gbf-nav__inner {
          max-width: 1300px;
          margin: 0 auto;
          padding: 0 32px;
          display: flex;
          align-items: center;
          gap: 32px;
        }

        /* Logo */
        .gbf-nav__logo { display: flex; align-items: center; text-decoration: none; flex-shrink: 0; }
        .gbf-nav__logo img {
          height: 52px;
          filter: var(--logo-filter);
          transition: height 0.35s ease;
        }
        .gbf-nav--scrolled .gbf-nav__logo img { height: 40px; }

        /* Desktop link list */
        .gbf-nav__links { display: flex; align-items: center; gap: 2px; flex: 1; }

        /* Individual nav link */
        .gbf-nav__link {
          display: inline-flex; align-items: center; gap: 5px;
          padding: 7px 12px;
          border-radius: 8px;
          font-family: var(--font-display);
          font-size: 0.775rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          text-decoration: none;
          color: var(--text-primary);
          white-space: nowrap;
          transition: background 0.15s ease, color 0.15s ease;
        }
        .gbf-nav__link:hover { background: rgba(200,168,78,0.08); color: var(--color-gold); }

        /* Right controls */
        .gbf-nav__controls { display: flex; align-items: center; gap: 8px; flex-shrink: 0; margin-left: auto; }

        /* Icon button (theme toggle) */
        .gbf-icon-btn {
          display: flex; align-items: center; justify-content: center;
          width: 36px; height: 36px;
          border-radius: 50%;
          background: var(--gold-bg);
          border: 1px solid var(--border);
          cursor: pointer;
          transition: background 0.2s ease;
          flex-shrink: 0;
        }
        .gbf-icon-btn:hover { background: rgba(200,168,78,0.15); }
        .gbf-icon-btn--sm { width: 32px; height: 32px; }

        /* Language button */
        .gbf-lang-btn {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 7px 12px; border-radius: 20px;
          background: var(--gold-bg); border: 1px solid var(--border);
          cursor: pointer; color: var(--color-gold);
          font-family: var(--font-display); font-size: 0.775rem; letter-spacing: 0.05em;
          transition: background 0.2s ease;
        }
        .gbf-lang-btn:hover { background: rgba(200,168,78,0.15); }
        .gbf-lang-btn__flag { font-size: 1rem; line-height: 1; }

        /* Language panel */
        .gbf-lang-panel {
          position: absolute; top: calc(100% + 10px); right: 0;
          min-width: 178px; border-radius: 14px; overflow: hidden;
          background: var(--bg-card);
          border: 1px solid var(--border);
          box-shadow: 0 4px 16px rgba(0,0,0,0.12), 0 16px 40px rgba(0,0,0,0.18);
          z-index: 200;
          animation: gbf-fade-in 0.14s ease forwards;
        }
        .gbf-lang-panel__item {
          width: 100%; display: flex; align-items: center; gap: 10px;
          padding: 11px 16px;
          background: transparent; border: none;
          border-bottom: 1px solid var(--border-faint);
          cursor: pointer; color: var(--text-secondary);
          font-family: var(--font-body); font-size: 0.9rem; text-align: left;
          transition: background 0.12s ease, color 0.12s ease;
          direction: ltr;
        }
        .gbf-lang-panel__item:last-child { border-bottom: none; }
        .gbf-lang-panel__item:hover { background: rgba(200,168,78,0.07); color: var(--color-gold); }
        .gbf-lang-panel__item--active { color: var(--color-gold); }

        /* Dropdown */
        .gbf-dropdown { position: relative; }
        .gbf-dropdown__panel {
          display: none;
          position: absolute; top: calc(100% + 8px);
          left: 50%; transform: translateX(-50%);
          min-width: 210px; border-radius: 14px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          box-shadow: 0 4px 16px rgba(0,0,0,0.12), 0 16px 40px rgba(0,0,0,0.18);
          z-index: 150;
        }
        .gbf-dropdown__panel::before {
          content: '';
          position: absolute;
          top: -16px; left: 0; right: 0;
          height: 16px;
        }
        .gbf-dropdown__item:first-child { border-radius: 14px 14px 0 0; }
        .gbf-dropdown__item:last-child  { border-radius: 0 0 14px 14px; border-bottom: none; }
        .gbf-dropdown__item:only-child  { border-radius: 14px; }
        .gbf-dropdown:hover .gbf-dropdown__panel {
          display: block;
          animation: gbf-fade-in 0.14s ease forwards;
        }
        .gbf-dropdown:hover .gbf-nav__link svg { transform: rotate(180deg); }
        .gbf-dropdown__item {
          display: flex; align-items: center;
          padding: 12px 18px;
          color: var(--text-secondary); text-decoration: none;
          font-family: var(--font-body); font-size: 0.875rem; letter-spacing: 0.01em;
          border-bottom: 1px solid var(--border-faint);
          transition: background 0.12s ease, color 0.12s ease;
          white-space: nowrap;
        }
        .gbf-dropdown__item:last-child { border-bottom: none; }
        .gbf-dropdown__item:hover { background: rgba(200,168,78,0.07); color: var(--color-gold); }

        /* Shared animation */
        @keyframes gbf-fade-in {
          from { opacity: 0; transform: translateX(-50%) translateY(-6px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }

        /* Hamburger */
        .gbf-mobile-controls { display: none; align-items: center; gap: 8px; margin-left: auto; }
        .gbf-hamburger {
          position: relative; width: 30px; height: 20px;
          background: none; border: none; cursor: pointer; padding: 0; flex-shrink: 0;
        }
        .gbf-hamburger__bar {
          position: absolute; left: 0; width: 100%; height: 2px;
          border-radius: 2px; background: var(--text-primary);
          transition: all 0.3s ease;
        }
        .gbf-hamburger__bar--1 { top: 0; }
        .gbf-hamburger__bar--2 { top: 9px; }
        .gbf-hamburger__bar--3 { top: 18px; }
        .gbf-hamburger__bar--1.open { top: 9px; transform: rotate(45deg); background: var(--color-gold); }
        .gbf-hamburger__bar--2.open { opacity: 0; }
        .gbf-hamburger__bar--3.open { top: 9px; transform: rotate(-45deg); background: var(--color-gold); }

        /* Mobile menu overlay */
        .gbf-mobile-menu {
          position: fixed; inset: 0; z-index: 9998;
          background: var(--mobile-menu-bg); overflow-y: auto;
        }
        .gbf-mobile-menu__body { padding: 92px 28px 48px; display: flex; flex-direction: column; }

        /* Language chips row */
        .gbf-mobile-menu__langs {
          display: flex; flex-wrap: wrap; gap: 8px;
          padding-bottom: 20px; margin-bottom: 4px;
          border-bottom: 1px solid var(--border-faint);
        }
        .gbf-mobile-menu__lang-chip {
          display: inline-flex; align-items: center; gap: 5px;
          padding: 5px 12px; border-radius: 20px;
          border: 1px solid var(--border); background: transparent;
          cursor: pointer; color: var(--text-muted);
          font-family: var(--font-display); font-size: 0.78rem;
          transition: all 0.15s ease;
        }
        .gbf-mobile-menu__lang-chip.active {
          background: var(--gold-bg); border-color: var(--color-gold); color: var(--color-gold);
        }

        /* Nav rows */
        .gbf-mobile-menu__row { border-bottom: 1px solid var(--border-faint); }
        .gbf-mobile-menu__row-top {
          display: flex; align-items: center; justify-content: space-between;
        }
        .gbf-mobile-menu__row-label {
          flex: 1; padding: 16px 0;
          color: var(--text-primary); text-decoration: none;
          font-family: var(--font-display); font-size: 1.1rem;
          text-transform: uppercase; letter-spacing: 0.06em;
        }
        .gbf-mobile-menu__expand {
          background: none; border: none; color: var(--color-gold);
          cursor: pointer; padding: 8px; display: flex; align-items: center;
        }

        /* Sub-links */
        .gbf-mobile-menu__sub { padding: 4px 0 14px 16px; }
        .gbf-mobile-menu__sub-link {
          display: block; padding: 10px 0;
          color: var(--text-muted); text-decoration: none;
          font-family: var(--font-body); font-size: 0.95rem;
          border-bottom: 1px solid var(--border-faint);
          transition: color 0.15s ease;
        }
        .gbf-mobile-menu__sub-link:last-child { border-bottom: none; }
        .gbf-mobile-menu__sub-link:hover { color: var(--color-gold); }

        /* Responsive breakpoint */
        @media (max-width: 1024px) {
          .gbf-nav__links    { display: none; }
          .gbf-nav__controls { display: none; }
          .gbf-mobile-controls { display: flex; }
        }

      `}</style>
    </>
  );
}

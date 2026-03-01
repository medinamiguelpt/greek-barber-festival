"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useI18n } from "@/lib/i18n";
import { LOCALES } from "@/lib/translations";
import { IMG } from "@/lib/images";
import { ChevronDown, Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { key: "home", href: "/" },
  { key: "tickets", href: "/tickets" },
  { key: "program", href: "/program" },
  { key: "competition", href: "/competition" },
  { key: "photos", href: "/photos" },
  { key: "sponsors", href: "/sponsors" },
  { key: "contact", href: "/contact" },
  { key: "location", href: "/location" },
] as const;

export function Navbar() {
  const { t, lang, setLang } = useI18n();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const currentFlag = LOCALES.find((l) => l.code === lang)?.flag ?? "🇬🇷";

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${scrolled ? "bg-bg/92 backdrop-blur-xl border-b border-border py-2 px-4 md:px-7" : "py-3.5 px-4 md:px-8"}`}>
        <div className="max-w-[1300px] mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
            <img src={IMG.logo} alt="GBF" className="h-9" />
          </Link>
          <div className="hidden lg:flex items-center gap-5">
            {NAV_ITEMS.map((item) => {
              const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link key={item.key} href={item.href} className={`nav-link text-[10px] font-semibold tracking-[2px] ${isActive ? "active text-gold" : "text-tx-sec"}`}>
                  {t.nav[item.key] || item.key}
                </Link>
              );
            })}
            <div className="relative">
              <button onClick={() => setLangOpen(!langOpen)} className="flex items-center gap-1 bg-gold/8 border border-border rounded-full px-2.5 py-1 text-gold text-[11px] font-medium transition-all hover:bg-gold/15 cursor-pointer">
                {currentFlag}
                <span className="text-[9px] tracking-wider">{lang.toUpperCase()}</span>
                <ChevronDown size={10} className={`transition-transform ${langOpen ? "rotate-180" : ""}`} />
              </button>
              {langOpen && (
                <div className="absolute top-full right-0 mt-2 bg-card border border-border rounded-xl overflow-hidden min-w-[140px] shadow-2xl animate-drop-in z-50">
                  {LOCALES.map((loc) => (
                    <button key={loc.code} onClick={() => { setLang(loc.code); setLangOpen(false); }} className={`flex items-center gap-2 w-full px-3 py-2 text-[11px] transition-all hover:bg-gold/10 hover:text-gold cursor-pointer ${lang === loc.code ? "text-gold bg-gold/5" : "text-tx-sec"}`}>
                      {loc.flag} {loc.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <button className="lg:hidden text-gold cursor-pointer" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>
      {mobileOpen && (
        <div className="fixed inset-0 bg-bg/98 backdrop-blur-3xl z-40 flex flex-col items-center justify-center gap-5">
          {NAV_ITEMS.map((item) => {
            const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link key={item.key} href={item.href} onClick={() => setMobileOpen(false)} className={`font-display text-2xl tracking-[2px] transition-colors ${isActive ? "text-gold" : "text-tx-sec hover:text-gold"}`}>
                {t.nav[item.key] || item.key}
              </Link>
            );
          })}
          <div className="flex flex-wrap gap-2 mt-4 justify-center">
            {LOCALES.map((loc) => (
              <button key={loc.code} onClick={() => { setLang(loc.code); setMobileOpen(false); }} className={`rounded-full px-3 py-1.5 text-[11px] font-medium border border-border cursor-pointer transition-all ${lang === loc.code ? "bg-gold text-bg" : "bg-gold/8 text-gold hover:bg-gold/15"}`}>
                {loc.flag} {loc.code.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

"use client";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { IMG } from "@/lib/images";
import { useCountdown } from "@/lib/countdown";
import { SectionWrap } from "@/components/page-banner";

export default function HomePage() {
  const { t } = useI18n();
  const cd = useCountdown("2026-04-26T09:00:00+03:00");

  return (
    <>
      {/* HERO */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center relative overflow-hidden px-5 pt-[120px] pb-16 bg-[linear-gradient(170deg,#0e0e12_0%,#1a1520_40%,#0e0e12_100%)]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_20%,rgba(200,164,78,0.12)_0%,transparent_60%)] pointer-events-none" />
        <div className="relative z-10 animate-fade-up">
          <div className="inline-block text-[11px] font-semibold tracking-[4px] text-gold px-6 py-2 border border-gold/30 rounded-full mb-7">{t.hero.badge}</div>
          <img src={IMG.banner} alt="Greek Barber Festival" className="max-w-[400px] w-full mb-5 drop-shadow-[0_10px_40px_rgba(200,164,78,0.15)] mx-auto" />
          <p className="text-[clamp(15px,2.5vw,20px)] font-light tracking-[6px] text-tx-sec mb-1.5">{t.hero.date} · {t.hero.city}</p>
          <p className="font-display italic text-[clamp(14px,1.8vw,18px)] text-gold-light mb-1">{t.hero.venue}</p>
          <div className="flex items-center justify-center gap-2 mb-1">
            <img src={IMG.venue} alt="" className="w-9 h-7" />
            <span className="text-[13px] text-tx-mut">{t.hero.addr}</span>
          </div>
          <p className="text-[12px] text-tx-mut mb-8">{t.hero.near}</p>
          <div className="flex gap-5 justify-center mb-9 flex-wrap">
            {([[cd.d, t.days], [cd.h, t.hrs], [cd.m, "MIN"], [cd.s, "SEC"]] as [number, string][]).map(([v, l], i) => (
              <div key={i} className="text-center min-w-[52px]">
                <div className="font-display text-[clamp(26px,4vw,44px)] font-bold text-gold leading-none">{String(v).padStart(2, "0")}</div>
                <div className="text-[9px] tracking-[3px] text-tx-mut mt-1">{l}</div>
              </div>
            ))}
          </div>
          <div className="flex gap-3 flex-wrap justify-center">
            <Link href="/tickets" className="cta-gold">{t.hero.cta}</Link>
            <Link href="/competition" className="cta-outline">{t.hero.cta2}</Link>
          </div>
        </div>
        <img src={IMG.heroPhoto} alt="Festival" className="absolute -bottom-5 -right-[5%] w-[clamp(180px,28vw,350px)] rounded-2xl opacity-20 blur-[1px] pointer-events-none" />
      </section>

      {/* ABOUT */}
      <SectionWrap className="text-center">
        <p className="text-[12px] font-semibold tracking-[5px] text-gold mb-2.5">{t.about.motto}</p>
        <h2 className="font-display text-[clamp(24px,4vw,38px)] font-black mb-4">{t.about.title}</h2>
        <div className="gold-line" />
        <p className="text-[15px] leading-[1.9] text-tx-sec max-w-[780px] mx-auto">{t.about.text}</p>
      </SectionWrap>

      {/* AFTER MOVIES */}
      <div className="bg-surface py-12">
        <SectionWrap>
          <h2 className="font-display text-[32px] font-black text-center mb-8">{t.videos.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[t.videos.v7, t.videos.v6, t.videos.v5].map((v, i) => (
              <div key={i} className="bg-card border border-border rounded-2xl overflow-hidden card-hover">
                <div className="relative pt-[56.25%] bg-black">
                  <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" title={v} className="absolute inset-0 w-full h-full border-none" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                </div>
                <div className="p-4"><p className="text-[13px] font-semibold text-tx-sec">{v}</p></div>
              </div>
            ))}
          </div>
        </SectionWrap>
      </div>

      {/* GUEST EDUCATORS */}
      <SectionWrap>
        <h2 className="font-display text-[32px] font-black text-center mb-8">{t.edu.title}</h2>
        <div className="flex gap-6 justify-center flex-wrap">
          {[{ img: IMG.educators.srgo, name: "SRGO", handle: "@srgo", url: "https://www.instagram.com/srgo/" }, { img: IMG.educators.pedro, name: "Pedro Renato", handle: "@pedrenato", url: "https://www.instagram.com/pedrenato/" }].map((edu, i) => (
            <a key={i} href={edu.url} target="_blank" rel="noopener" className="no-underline text-inherit max-w-[290px]">
              <div className="bg-card border border-border rounded-2xl overflow-hidden card-hover">
                <div className="overflow-hidden h-[350px]"><img src={edu.img} alt={edu.name} className="w-full h-full object-cover img-zoom" /></div>
                <div className="p-4 text-center">
                  <div className="font-display text-[19px] font-bold">{edu.name}</div>
                  <div className="text-[13px] text-gold mt-1">{edu.handle}</div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </SectionWrap>

      {/* SPONSORS PREVIEW */}
      <div className="bg-surface py-12">
        <SectionWrap>
          <h2 className="font-display text-[32px] font-black text-center mb-8">{t.sponsors.title}</h2>
          <div className="flex flex-wrap gap-4 justify-center items-center">
            {[IMG.sponsors.marras, IMG.sponsors.pinin, IMG.sponsors.images, IMG.sponsors.logoFinal].map((src, i) => (
              <div key={i} className="bg-card border border-border rounded-xl px-6 py-5 flex items-center justify-center min-w-[150px] min-h-[70px] transition-all hover:border-gold hover:scale-105">
                <img src={src} alt="" className="max-w-[130px] max-h-[70px] object-contain" />
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link href="/sponsors" className="cta-outline text-[10px] px-6 py-2.5">{t.nav.sponsors} →</Link>
          </div>
        </SectionWrap>
      </div>
    </>
  );
}

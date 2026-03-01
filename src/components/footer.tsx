"use client";
import { useI18n } from "@/lib/i18n";
import { IMG } from "@/lib/images";
import { Instagram, Facebook, Globe } from "lucide-react";

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="bg-card border-t border-border pt-12 pb-6 px-5">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-[auto_1fr_1fr] gap-9 items-start">
        <div><img src={IMG.footerIcon} alt="GBF" className="h-28" /></div>
        <div>
          <h4 className="font-display text-[15px] text-gold mb-2.5">{t.footer.phones}</h4>
          <p className="text-[13px] text-tx-sec leading-8">+30 27440-66437<br />+30 6945977046</p>
          <div className="mt-3.5">
            <p className="text-[12px] text-tx-sec">{t.hero.date} · {t.hero.city}</p>
            <p className="text-[12px] text-tx-sec italic">{t.hero.venue}</p>
            <div className="flex items-center gap-1.5 mt-1">
              <img src={IMG.venue} alt="" className="w-6 h-[18px]" />
              <span className="text-[11px] text-tx-mut">{t.hero.addr}</span>
            </div>
            <p className="text-[10px] text-tx-mut mt-0.5">{t.hero.near}</p>
          </div>
        </div>
        <div>
          <h4 className="font-display text-[15px] text-gold mb-2.5">{t.footer.follow}</h4>
          <a className="flex items-center gap-2 text-tx-sec text-[13px] py-1 hover:text-gold transition-colors" href="https://www.instagram.com/greekbarberfestival/" target="_blank" rel="noopener"><Instagram size={14} /> @greekbarberfestival</a>
          <a className="flex items-center gap-2 text-tx-sec text-[13px] py-1 hover:text-gold transition-colors" href="https://www.facebook.com/GreekBarberFestival/" target="_blank" rel="noopener"><Facebook size={14} /> Greek Barber Festival</a>
          <a className="flex items-center gap-2 text-tx-sec text-[13px] py-1 hover:text-gold transition-colors" href="https://www.greekbarberfestival.gr" target="_blank" rel="noopener"><Globe size={14} /> www.greekbarberfestival.gr</a>
        </div>
      </div>
      <div className="max-w-[1200px] mx-auto mt-5 pt-4 border-t border-border text-center text-[10px] text-tx-mut">{t.footer.rights}</div>
    </footer>
  );
}

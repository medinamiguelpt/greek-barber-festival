"use client";
import { useI18n } from "@/lib/i18n";
import { IMG } from "@/lib/images";
import { PageBanner, SectionWrap } from "@/components/page-banner";

function PriceRow({ label, price }: { label: string; price: string }) {
  return (
    <div className="flex justify-between py-2.5 border-b border-gold/8 text-[14px]">
      <span>{label}</span><span className="text-gold font-bold">{price}</span>
    </div>
  );
}

export default function TicketsPage() {
  const { t } = useI18n();
  return (
    <>
      <PageBanner img={IMG.banners.tickets} title={t.tickets.title} />
      <SectionWrap>
        <div className="bg-card border border-border rounded-2xl p-7 mb-7">
          <div className="text-[12px] font-bold tracking-[3px] text-gold mb-3.5">{t.tickets.presale}</div>
          <PriceRow label={`${t.tickets.pro}*`} price={t.tickets.proPrice1} />
          <p className="text-[12px] text-tx-mut my-1">*{t.tickets.proNote}</p>
          <PriceRow label={`${t.tickets.student}*`} price={t.tickets.studentPrice1} />
          <p className="text-[12px] text-tx-mut my-1">{t.tickets.studentNote}</p>
          <div className="bg-gold/6 rounded-xl p-4 mt-3">
            <div className="text-[12px] font-bold tracking-[2px] text-gold mb-1.5">🎉 {t.tickets.crew}</div>
            <p className="text-[13px] text-tx-sec leading-7">{t.tickets.crew1}<br />{t.tickets.crew2}</p>
          </div>
        </div>
        <div className="bg-card border border-border rounded-2xl p-7 mb-7">
          <div className="text-[12px] font-bold tracking-[3px] text-gold mb-3.5">{t.tickets.genTitle}</div>
          <PriceRow label={`${t.tickets.pro}*`} price={t.tickets.proPrice2} />
          <p className="text-[12px] text-tx-mut my-1">*{t.tickets.proNote}</p>
          <PriceRow label={`${t.tickets.student}*`} price={t.tickets.studentPrice2} />
          <p className="text-[12px] text-tx-mut my-1">{t.tickets.studentNote}</p>
          <div className="bg-gold/6 rounded-xl p-4 mt-3">
            <div className="text-[12px] font-bold tracking-[2px] text-gold mb-1.5">🎉 {t.tickets.crew}</div>
            <p className="text-[13px] text-tx-sec leading-7">{t.tickets.crew3}<br />{t.tickets.crew4}</p>
          </div>
        </div>
        <p className="text-[14px] text-tx-sec leading-7 mb-3">{t.tickets.companion}</p>
        <p className="text-[13px] text-tx-mut">{t.tickets.info}</p>
      </SectionWrap>
    </>
  );
}

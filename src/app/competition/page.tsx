"use client";
import { useI18n } from "@/lib/i18n";
import { IMG } from "@/lib/images";
import { PageBanner, SectionWrap } from "@/components/page-banner";

const ICONS = ["✂️", "💈", "⚡", "🎨"];

export default function CompetitionPage() {
  const { t } = useI18n();
  return (
    <>
      <PageBanner img={IMG.banners.competition} title={t.comp.title} />
      <SectionWrap>
        <p className="text-[16px] leading-[1.9] text-tx-sec mb-8">{t.comp.intro}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {t.comp.cats.map((cat, i) => (
            <div key={i} className="rounded-2xl overflow-hidden bg-card border border-border card-hover">
              <div className="overflow-hidden h-[260px]"><img src={IMG.competitionPhotos[i]} alt={cat.name} className="w-full h-full object-cover img-zoom" /></div>
              <div className="p-5">
                <span className="text-[28px] block mb-1">{ICONS[i]}</span>
                <div className="font-display text-[17px] font-bold mb-1.5">{cat.name}</div>
                <span className="inline-block bg-gold/12 text-gold px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wider mb-2">{cat.time}</span>
                <p className="text-[13px] text-tx-sec leading-relaxed">{cat.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="border-l-[3px] border-gold bg-gold/4 rounded-r-xl p-5 mb-5">
          <p className="text-[14px] text-tx-sec leading-[1.8]">{t.comp.note}</p>
        </div>
        <h3 className="font-display text-[20px] text-gold my-5">📋 {t.notesTitle}</h3>
        <div className="flex flex-col gap-2 mb-6">
          {t.comp.notes.map((note, i) => (
            <div key={i} className="flex gap-2.5 text-[14px] text-tx-sec leading-7">
              <span className="text-gold font-bold shrink-0">{i + 1})</span><span>{note}</span>
            </div>
          ))}
        </div>
        <p className="text-[14px] text-gold font-medium">{t.comp.contactNote}</p>
      </SectionWrap>
    </>
  );
}

"use client";
import { useI18n } from "@/lib/i18n";
import { IMG } from "@/lib/images";
import { PageBanner, SectionWrap } from "@/components/page-banner";

export default function ProgramPage() {
  const { t } = useI18n();
  return (
    <>
      <PageBanner img={IMG.banners.program} title={t.program.title} />
      <SectionWrap className="text-center">
        <img src={IMG.programSchedule} alt="Schedule" className="max-w-full rounded-xl border border-border mb-5" />
        <p className="text-[14px] text-gold italic">{t.program.note}</p>
      </SectionWrap>
    </>
  );
}

"use client";
import { useI18n } from "@/lib/i18n";
import { IMG, MAP_URL } from "@/lib/images";
import { PageBanner, SectionWrap } from "@/components/page-banner";

export default function LocationPage() {
  const { t } = useI18n();
  return (
    <>
      <PageBanner img={IMG.banners.location} title={t.loc.title} />
      <SectionWrap className="text-center">
        <p className="text-[16px] text-tx-sec leading-[1.9] max-w-[700px] mx-auto mb-6">{t.loc.text}</p>
        <a href={MAP_URL} target="_blank" rel="noopener" className="cta-gold mb-6 inline-block">{t.loc.map} 📍</a>
        <div className="block">
          <a href={MAP_URL} target="_blank" rel="noopener">
            <img src={IMG.mapScreenshot} alt="Map" className="max-w-full rounded-xl border border-border transition-transform hover:scale-[1.02] mx-auto" />
          </a>
        </div>
      </SectionWrap>
    </>
  );
}

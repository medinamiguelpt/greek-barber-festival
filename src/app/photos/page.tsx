"use client";
import { useI18n } from "@/lib/i18n";
import { IMG } from "@/lib/images";
import { PageBanner, SectionWrap } from "@/components/page-banner";

export default function PhotosPage() {
  const { t } = useI18n();
  return (
    <>
      <PageBanner img={IMG.banners.photos} title={t.photos.title} />
      <SectionWrap>
        <p className="text-[15px] text-tx-sec leading-[1.8] mb-7 text-center">{t.photos.text}</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {IMG.galleryPhotos.map((src, i) => (
            <div key={i} className="rounded-xl overflow-hidden aspect-square border border-border transition-transform hover:scale-[1.03]">
              <img src={src} alt="" className="w-full h-full object-cover img-zoom" />
            </div>
          ))}
        </div>
      </SectionWrap>
    </>
  );
}

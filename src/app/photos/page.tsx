"use client";
import { useState } from "react";
import PageBanner from "@/components/PageBanner";
import Lightbox from "@/components/Lightbox";
import Reveal from "@/components/Reveal";
import { useLanguage } from "@/components/LanguageContext";

const PHOTOS = [
  { name: "BMW_1077", id: "335ee3_b4430974708e4fb1b7d6c49bab3ff62c" },
  { name: "BMW_1059", id: "335ee3_390c2b38381f4d10a07aa6d21b537593" },
  { name: "BMW_1032", id: "335ee3_ca19f50e821343b2ae41a12c1bd79350" },
  { name: "BMW_1031", id: "335ee3_834a91275c424abfb9315b5bcb23db6f" },
  { name: "BMW_0985", id: "335ee3_6e8f46d273074d18b6488a217d2f1780" },
  { name: "BMW_0876", id: "335ee3_af6f475771fe42679b9d043d4004be92" },
  { name: "BMW_0851", id: "335ee3_bba1ef01e338409bb77f71ff0bc3fa04" },
  { name: "BMW_0816", id: "335ee3_4827cd597b334f78a69767af2814ddc5" },
  { name: "BMW_0838", id: "335ee3_4aafc0e582e043daa57e86869ec12bf8" },
  { name: "BMW_0800", id: "335ee3_19e8330170f741ef808fecc420d31311" },
  { name: "DSC_7643", id: "335ee3_67dd2a32df5d492eb8186b54cb9f7723" },
  { name: "DSC_7628", id: "335ee3_da7e98ee8b0b4c4f8521777aae852674" },
  { name: "DSC_7627", id: "335ee3_52aad1b432114f4d8217b8e7cc888c98" },
  { name: "DSC_7621", id: "335ee3_3344eacb29344a7da7353b12c0280199" },
  { name: "DSC_7619", id: "335ee3_3f6d1f2bffbe4422973eb3b1f67fff65" },
  { name: "DSC_7616", id: "335ee3_699a09b92f3d44dbb05db0b58ef34715" },
  { name: "DSC_7607", id: "335ee3_e9cf57e5f0fc46448d46a3028e00dded" },
  { name: "DSC_7603", id: "335ee3_318ab8b3e03147e48931594152dba319" },
  { name: "DSC_7602", id: "335ee3_6d7047dfa54a49d491ab231292c072cf" },
  { name: "DSC_7601", id: "335ee3_968831eaee9444809a013fd5260502ac" },
  { name: "DSC_7599", id: "335ee3_b127aea63385417c9b7d1f3380ecfc47" },
  { name: "DSC_7592", id: "335ee3_1f4325fbda914c73b1f64314364c5521" },
  { name: "DSC_7591", id: "335ee3_942df6a8cda345d5bf70885ff0d53cd9" },
  { name: "DSC_7590", id: "335ee3_6ddba2984ade4c8799e2c6e1b88aeed8" },
  { name: "DSC_7587", id: "335ee3_33380ec5bae2493aa6a9ebf38310f4b9" },
];

const getUrl = (id: string, size: string) =>
  `https://static.wixstatic.com/media/${id}~mv2.jpg/v1/fill/${size},al_c,q_90,enc_avif,quality_auto/${id}~mv2.jpg`;

export default function PhotosPage() {
  const { t } = useLanguage();
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  return (
    <>
      <PageBanner title={t("photos_title")} image="https://static.wixstatic.com/media/335ee3_c35f964f33b84b5faad69de2635c3e22~mv2.jpg/v1/crop/x_0,y_168,w_1500,h_350/fill/w_1920,h_450,al_c,q_80,enc_avif,quality_auto/DSC_7278.jpg" />
      <section style={{ padding: "80px 24px", maxWidth: 1200, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <p style={{ color: "var(--text-secondary)", fontSize: "1rem", lineHeight: 1.8 }}>
              {t("photos_thanks")}
            </p>
            <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
              {t("photos_download")}
            </p>
            <p style={{ color: "var(--color-gold)", fontSize: "0.95rem", marginTop: 12, fontFamily: "var(--font-display)" }}>
              {t("photos_see_you")}
            </p>
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
          {PHOTOS.map((photo, i) => (
            <Reveal key={photo.id} delay={i * 80}>
              <div
                className="img-zoom card-hover"
                style={{ borderRadius: 12, overflow: "hidden", cursor: "pointer", aspectRatio: "1", border: "1px solid rgba(200,168,78,0.1)" }}
                onClick={() => setLightboxIdx(i)}
              >
                <img
                  src={getUrl(photo.id, "w_600,h_600")}
                  alt={photo.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  loading="lazy"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {lightboxIdx !== null && (
        <Lightbox
          src={getUrl(PHOTOS[lightboxIdx].id, "w_1200,h_1200")}
          alt={PHOTOS[lightboxIdx].name}
          onClose={() => setLightboxIdx(null)}
        />
      )}
    </>
  );
}
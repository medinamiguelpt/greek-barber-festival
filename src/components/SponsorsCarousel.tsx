"use client";
import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";

const SPONSOR_LOGOS = [
  { src: "https://static.wixstatic.com/media/335ee3_471e976778f74ce4889a298051082e37~mv2.jpg/v1/fill/w_200,h_200,al_c,q_80,enc_avif,quality_auto/Men_Stories_Logo_Noir_Final_Vectoris%C3%A9_jp.jpg", alt: "High Hair / Farmavita", dark: true },
  { src: "https://static.wixstatic.com/media/335ee3_1e742648a2bd417f848262f22e18afd5~mv2_d_4604_1659_s_2.jpg/v1/fill/w_377,h_136,al_c,q_80,enc_avif,quality_auto/salon%20tech_JPG.jpg", alt: "Salontech", dark: false },
  { src: "https://static.wixstatic.com/media/335ee3_b03379d4d74f4deeaf1df6143c499448~mv2_d_4602_1658_s_2.jpg/v1/fill/w_380,h_137,al_c,q_80,enc_avif,quality_auto/smart%20vacuum_JPG.jpg", alt: "Smart Vacuum", dark: false },
  { src: "https://static.wixstatic.com/media/335ee3_3e404e356cad4c978c7d605ba34c2d3c~mv2_d_4602_1658_s_2.jpg/v1/fill/w_380,h_137,al_c,q_80,enc_avif,quality_auto/bachatouris_JPG.jpg", alt: "HairLand Bachatouri", dark: false },
  { src: "https://static.wixstatic.com/media/335ee3_2295c7fa1ec24e0da4664e26641a17b4~mv2.jpeg/v1/crop/x_43,y_211,w_1100,h_404/fill/w_382,h_141,al_c,q_80,enc_avif,quality_auto/LOGO-FINAL%20(1).jpeg", alt: "Hall of Beauty", dark: true },
  { src: "https://static.wixstatic.com/media/335ee3_0b2facd9a23d4523925c8596e26878a1~mv2.jpg/v1/fit/w_361,h_225,q_90,enc_avif,quality_auto/335ee3_0b2facd9a23d4523925c8596e26878a1~mv2.jpg", alt: "Kirios Barber", dark: true },
  { src: "https://static.wixstatic.com/media/335ee3_25637d3d0b4f4224a4cc4aaeca2b9d74~mv2.jpg/v1/fit/w_142,h_225,q_90,enc_avif,quality_auto/335ee3_25637d3d0b4f4224a4cc4aaeca2b9d74~mv2.jpg", alt: "Pinin / Extreme Barber", dark: false },
  { src: "https://static.wixstatic.com/media/335ee3_4d3d4e770dc447eaaf81e470fb8cdec1~mv2.png/v1/fit/w_225,h_225,q_90,enc_avif,quality_auto/335ee3_4d3d4e770dc447eaaf81e470fb8cdec1~mv2.png", alt: "Images", dark: true },
  { src: "https://static.wixstatic.com/media/335ee3_2221fc4dd0ab492aafee32fc4f25eb08~mv2.jpg/v1/fill/w_324,h_103,al_c,q_80,enc_avif,quality_auto/maquina-de-corte-trimmer-stealth-babylis.jpg", alt: "BaByliss", dark: false },
  { src: "https://static.wixstatic.com/media/335ee3_260d86f785f64a7783504003423f978f~mv2.jpg/v1/fill/w_142,h_142,al_c,q_80,enc_avif,quality_auto/matakki.jpg", alt: "Matakki", dark: false },
  { src: "https://static.wixstatic.com/media/335ee3_eb9fc652c7fe4ffd88162fb1e1456f8b~mv2.png/v1/fill/w_205,h_45,al_c,q_85,enc_avif,quality_auto/slick%20gorilla.png", alt: "Slick Gorilla", dark: true },
  { src: "https://static.wixstatic.com/media/335ee3_b65516ff01dc4d089f30e37bde7490d0~mv2.png/v1/fill/w_189,h_57,al_c,q_85,enc_avif,quality_auto/JACKBONE%20LOGO%20LETTERS.png", alt: "Jackbone", dark: true },
  { src: "https://static.wixstatic.com/media/335ee3_43033eeaaddb4a47b17ea7b979b1c456~mv2.png/v1/fill/w_315,h_92,al_c,q_85,enc_avif,quality_auto/Farmavita_logo_image_picture.png", alt: "Farmavita", dark: false },
  { src: "https://static.wixstatic.com/media/335ee3_4a5dee5f4d5e4c8692fc424ec7d603c2~mv2.png/v1/fill/w_243,h_81,al_c,q_85,enc_avif,quality_auto/Kopia%20av%20Noberu_Black.png", alt: "Noberu", dark: true },
  { src: "https://static.wixstatic.com/media/335ee3_0e7ec5013b7844d69c6eaef09b0e5c19~mv2_d_4595_1659_s_2.jpg/v1/fill/w_257,h_93,al_c,q_80,enc_avif,quality_auto/morgan%27s_JPG.jpg", alt: "Morgan's", dark: false },
  { src: "https://static.wixstatic.com/media/335ee3_eb55dc14281d4962949a311d9092aac6~mv2.png/v1/fill/w_209,h_45,al_c,q_85,enc_avif,quality_auto/lv3.png", alt: "LV3", dark: true },
];

export default function SponsorsCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const pausedRef = useRef(false);
  const draggingRef = useRef(false);
  const animRef = useRef<number>(0);
  const posRef = useRef(0);

  const items = [...SPONSOR_LOGOS, ...SPONSOR_LOGOS, ...SPONSOR_LOGOS];

  const animate = useCallback(() => {
    if (!pausedRef.current && !draggingRef.current && trackRef.current) {
      posRef.current -= 0.5;
      const singleSetWidth = trackRef.current.scrollWidth / 3;
      if (Math.abs(posRef.current) >= singleSetWidth) {
        posRef.current += singleSetWidth;
      }
      if (posRef.current > 0) {
        posRef.current -= singleSetWidth;
      }
      trackRef.current.style.transform = `translateX(${posRef.current}px)`;
    }
    animRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [animate]);

  const onPointerDown = (clientX: number) => {
    draggingRef.current = true;
    setIsDragging(true);
    startXRef.current = clientX;
    scrollLeftRef.current = posRef.current;
  };

  const onPointerMove = (clientX: number) => {
    if (!draggingRef.current) return;
    const dx = clientX - startXRef.current;
    posRef.current = scrollLeftRef.current + dx;
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(${posRef.current}px)`;
    }
  };

  const onPointerUp = () => {
    draggingRef.current = false;
    setIsDragging(false);
  };

  return (
    <div
      style={{ overflow: "hidden", padding: "20px 0", cursor: isDragging ? "grabbing" : "grab" }}
      onMouseEnter={() => { pausedRef.current = true; }}
      onMouseLeave={() => { pausedRef.current = false; draggingRef.current = false; setIsDragging(false); }}
      onMouseDown={(e) => onPointerDown(e.clientX)}
      onMouseMove={(e) => onPointerMove(e.clientX)}
      onMouseUp={onPointerUp}
      onTouchStart={(e) => onPointerDown(e.touches[0].clientX)}
      onTouchMove={(e) => onPointerMove(e.touches[0].clientX)}
      onTouchEnd={onPointerUp}
    >
      <div
        ref={trackRef}
        style={{
          display: "flex",
          gap: 40,
          width: "max-content",
          willChange: "transform",
          userSelect: "none",
        }}
      >
        {items.map((logo, i) => (
          <div
            key={i}
            style={{
              background: logo.dark ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.85)",
              borderRadius: 12,
              padding: "16px 24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minWidth: 160,
              height: 100,
              flexShrink: 0,
              pointerEvents: "none",
            }}
          >
            <Image src={logo.src} alt={logo.alt} width={140} height={70} style={{ objectFit: "contain", maxHeight: 70, maxWidth: 140 }} draggable={false} />
          </div>
        ))}
      </div>
    </div>
  );
}

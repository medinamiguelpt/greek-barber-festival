"use client";
import { useRef, useState, useEffect, useCallback } from "react";

const SPONSOR_LOGOS = [
  { src: "https://static.wixstatic.com/media/335ee3_0b2facd9a23d4523925c8596e26878a1~mv2.jpg/v1/fit/w_361,h_225,q_90,enc_avif,quality_auto/335ee3_0b2facd9a23d4523925c8596e26878a1~mv2.jpg", alt: "Marras Hair", dark: true },
  { src: "https://static.wixstatic.com/media/335ee3_25637d3d0b4f4224a4cc4aaeca2b9d74~mv2.jpg/v1/fit/w_142,h_225,q_90,enc_avif,quality_auto/335ee3_25637d3d0b4f4224a4cc4aaeca2b9d74~mv2.jpg", alt: "Pinin", dark: false },
  { src: "https://static.wixstatic.com/media/335ee3_4d3d4e770dc447eaaf81e470fb8cdec1~mv2.png/v1/fit/w_225,h_225,q_90,enc_avif,quality_auto/335ee3_4d3d4e770dc447eaaf81e470fb8cdec1~mv2.png", alt: "Sponsor", dark: true },
  { src: "https://static.wixstatic.com/media/335ee3_2295c7fa1ec24e0da4664e26641a17b4~mv2.jpeg/v1/fit/w_335,h_225,q_90,enc_avif,quality_auto/335ee3_2295c7fa1ec24e0da4664e26641a17b4~mv2.jpeg", alt: "Hall of Beauty", dark: true },
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
            <img src={logo.src} alt={logo.alt} style={{ maxHeight: 70, maxWidth: 140, objectFit: "contain" }} draggable={false} />
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";
export function PageBanner({ img, title }: { img: string; title: string }) {
  return (
    <div className="w-full h-[240px] relative overflow-hidden">
      <img src={img} alt="" className="w-full h-full object-cover brightness-[0.45]" />
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="font-display text-[clamp(24px,5vw,42px)] font-black tracking-[3px] text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.5)]">{title}</h1>
      </div>
    </div>
  );
}

export function SectionWrap({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`max-w-[1100px] mx-auto px-6 py-12 ${className}`}>{children}</div>;
}

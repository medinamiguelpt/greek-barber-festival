export default function PageBanner({ title, image }: { title: string; image: string }) {
  return (
    <div className="page-banner">
      <img src={image} alt={title} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(13,13,13,0.25) 0%, rgba(13,13,13,0.65) 100%)" }} />
      <h1 style={{ position: "relative", zIndex: 2, textAlign: "center", color: "var(--text-primary)", fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "0.08em", textShadow: "0 2px 12px rgba(0,0,0,0.8), 0 0 40px rgba(0,0,0,0.5)" }}>{title}</h1>
    </div>
  );
}

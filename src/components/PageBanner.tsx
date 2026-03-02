export default function PageBanner({ title, image }: { title: string; image: string }) {
  return (
    <div className="page-banner">
      <img src={image} alt={title} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
      <h1 className="gold-text" style={{ position: "relative", zIndex: 2, textAlign: "center" }}>{title}</h1>
    </div>
  );
}

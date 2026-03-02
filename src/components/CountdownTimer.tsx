"use client";
import { useState, useEffect } from "react";

export default function CountdownTimer() {
  const target = new Date("2026-04-26T10:00:00+03:00").getTime();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const tick = () => {
      const now = Date.now();
      const diff = Math.max(0, target - now);
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  const units = [
    { value: timeLeft.days, label: "ΗΜΕΡΕΣ" },
    { value: timeLeft.hours, label: "ΩΡΕΣ" },
    { value: timeLeft.minutes, label: "ΛΕΠΤΑ" },
    { value: timeLeft.seconds, label: "ΔΕΥΤ." },
  ];

  return (
    <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
      {units.map((u) => (
        <div key={u.label} style={{ textAlign: "center", minWidth: 80 }}>
          <div style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 700,
            background: "linear-gradient(135deg, var(--color-gold-light), var(--color-gold))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            lineHeight: 1,
          }}>
            {String(u.value).padStart(2, "0")}
          </div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: "0.7rem", color: "#888", letterSpacing: "0.15em", marginTop: 4 }}>
            {u.label}
          </div>
        </div>
      ))}
    </div>
  );
}

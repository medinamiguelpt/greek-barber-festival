"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const DEMO = { email: "demo@barbershop.com", password: "demo1234" };

export default function LoginPage() {
  const router = useRouter();
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);
  const [ready,    setReady]    = useState(false);
  const [showPass, setShowPass] = useState(false);

  useEffect(() => {
    try {
      const s = JSON.parse(localStorage.getItem("gbf-auth-session") ?? "null");
      if (s && Date.now() < s.expires) { router.replace("/dashboard"); return; }
    } catch {}
    setReady(true);
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setTimeout(() => {
      if (email.trim().toLowerCase() === DEMO.email && password === DEMO.password) {
        localStorage.setItem("gbf-auth-session", JSON.stringify({
          email: email.trim().toLowerCase(),
          businessName: "Demo Barbershop",
          loginTime: Date.now(),
          expires: Date.now() + 24 * 60 * 60 * 1000,
          device: navigator.userAgent.includes("Mobile") ? "Mobile" : "Desktop",
        }));
        router.push("/dashboard");
      } else {
        setError("Incorrect email or password.");
        setLoading(false);
      }
    }, 700);
  };

  const C = {
    bg: "#F5F0E8", surface: "#FFFFFF", border: "#E0D5C5",
    accent: "#3D4F35", accentLight: "#EAF0E6", accentMid: "#6B7D60",
    text: "#2A2520", textMuted: "#7A6F64", textFaint: "#B0A898",
    red: "#B04040",
  };

  if (!ready) return <div style={{ minHeight: "100vh", background: C.bg }} />;

  const inputStyle = (focused = false): React.CSSProperties => ({
    width: "100%", boxSizing: "border-box", padding: "12px 14px",
    border: `1.5px solid ${focused ? C.accent : C.border}`, borderRadius: 10,
    background: C.bg, color: C.text, fontSize: 15, fontFamily: "inherit",
    outline: "none", transition: "border-color 0.15s",
  });

  return (
    <div style={{
      minHeight: "100vh", background: C.bg, fontFamily: "'Source Sans 3', sans-serif",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      padding: "24px 16px",
    }}>
      <div style={{ width: "100%", maxWidth: 420 }}>

        {/* Wordmark */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 44, lineHeight: 1 }}>✂️</div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 600, color: C.text, marginTop: 10 }}>
            Greek Barber Festival
          </div>
          <div style={{ fontSize: 11, color: C.textMuted, marginTop: 5, letterSpacing: "0.1em", textTransform: "uppercase" }}>
            AI Receptionist Platform
          </div>
        </div>

        {/* Card */}
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 20, padding: "32px" }}>
          <div style={{ marginBottom: 24 }}>
            <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: C.text, fontFamily: "'Playfair Display', serif" }}>Welcome back</h1>
            <p style={{ margin: "5px 0 0", fontSize: 14, color: C.textMuted }}>Sign in to your barbershop dashboard</p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            {/* Email */}
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: C.textMuted, marginBottom: 6, letterSpacing: "0.04em", textTransform: "uppercase" }}>
                Email address
              </label>
              <input
                type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="you@barbershop.com" required autoComplete="email"
                style={inputStyle()}
                onFocus={e => (e.target.style.borderColor = C.accent)}
                onBlur={e => (e.target.style.borderColor = C.border)}
              />
            </div>

            {/* Password */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <label style={{ fontSize: 12, fontWeight: 700, color: C.textMuted, letterSpacing: "0.04em", textTransform: "uppercase" }}>Password</label>
                <button type="button" style={{ fontSize: 12, color: C.accent, background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", padding: 0 }}>
                  Forgot password?
                </button>
              </div>
              <div style={{ position: "relative" }}>
                <input
                  type={showPass ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••" required autoComplete="current-password"
                  style={{ ...inputStyle(), paddingRight: 44 }}
                  onFocus={e => (e.target.style.borderColor = C.accent)}
                  onBlur={e => (e.target.style.borderColor = C.border)}
                />
                <button type="button" onClick={() => setShowPass(v => !v)} style={{
                  position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
                  background: "none", border: "none", cursor: "pointer", color: C.textMuted, fontSize: 14, padding: 4,
                }}>
                  {showPass ? "🙈" : "👁"}
                </button>
              </div>
            </div>

            {error && (
              <div style={{ background: "#FDF0F0", border: "1px solid #E0C0C0", borderRadius: 8, padding: "10px 14px", fontSize: 13, color: C.red, marginBottom: 16 }}>
                {error}
              </div>
            )}

            <button type="submit" disabled={loading} style={{
              width: "100%", padding: "13px", borderRadius: 10,
              background: loading ? C.accentMid : C.accent,
              color: "#fff", fontSize: 15, fontWeight: 700, border: "none",
              cursor: loading ? "not-allowed" : "pointer",
              fontFamily: "inherit", letterSpacing: "0.02em", transition: "background 0.15s",
            }}>
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>
        </div>

        {/* Demo credentials */}
        <div style={{ marginTop: 16, background: C.accentLight, border: `1px dashed ${C.accentMid}`, borderRadius: 14, padding: "14px 18px" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: C.accentMid, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>
            Demo access
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <div style={{ fontSize: 13, color: C.text }}>
              <span style={{ color: C.textMuted, display: "inline-block", width: 72, fontSize: 12 }}>Email</span>
              <code style={{ fontFamily: "monospace", fontWeight: 600, fontSize: 13 }}>{DEMO.email}</code>
            </div>
            <div style={{ fontSize: 13, color: C.text }}>
              <span style={{ color: C.textMuted, display: "inline-block", width: 72, fontSize: 12 }}>Password</span>
              <code style={{ fontFamily: "monospace", fontWeight: 600, fontSize: 13 }}>{DEMO.password}</code>
            </div>
          </div>
          <button
            type="button"
            onClick={() => { setEmail(DEMO.email); setPassword(DEMO.password); }}
            style={{
              marginTop: 10, fontSize: 12, color: C.accent, background: "none", border: `1px solid ${C.accentMid}`,
              borderRadius: 6, padding: "5px 10px", cursor: "pointer", fontFamily: "inherit", fontWeight: 600,
            }}
          >
            Fill demo credentials
          </button>
        </div>

        <p style={{ textAlign: "center", marginTop: 24, fontSize: 12, color: C.textFaint }}>
          AI Receptionist Platform · Greek Barber Festival 2026
        </p>
      </div>
    </div>
  );
}

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { unoptimized: true },

  // ── HTTP Security Headers ──────────────────────────────────────────────────
  // Applied to every route. These mitigate common web attacks.
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Prevent the page from being embedded in an iframe (clickjacking)
          { key: "X-Frame-Options",        value: "DENY" },
          // Prevent MIME-type sniffing
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Restrict referrer info sent to third parties
          { key: "Referrer-Policy",        value: "strict-origin-when-cross-origin" },
          // Limit browser features — microphone allowed (ElevenLabs call widget)
          { key: "Permissions-Policy",     value: "camera=(), geolocation=()" },
          // Force HTTPS for 1 year (HSTS) — only effective in production
          { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
          // Basic XSS protection for legacy browsers
          { key: "X-XSS-Protection",      value: "1; mode=block" },
        ],
      },
    ];
  },
};

export default nextConfig;

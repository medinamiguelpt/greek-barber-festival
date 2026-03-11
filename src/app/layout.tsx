import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ThemeProvider from "@/components/ThemeProvider";
import { LanguageProvider } from "@/components/LanguageContext";

const BASE_URL = "https://greekbarberfestival.gr"; // TODO: replace with production domain

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "8th Greek Barber Festival | 26-27 Απριλίου 2026, Αθήνα",
    template: "%s | Greek Barber Festival",
  },
  description:
    "Το 8ο Greek Barber Festival είναι το σημείο συνάντησης της barber κουλτούρας στην Ελλάδα. 26-27 Απριλίου 2026, Εργοστάσιο Κλωσταί Πεταλούδα, Αθήνα.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: { url: "/apple-touch-icon.png", sizes: "180x180" },
  },
  openGraph: {
    type: "website",
    siteName: "Greek Barber Festival",
    title: "8th Greek Barber Festival | 26-27 Απριλίου 2026, Αθήνα",
    description:
      "Το 8ο Greek Barber Festival είναι το σημείο συνάντησης της barber κουλτούρας στην Ελλάδα. 26-27 Απριλίου 2026, Εργοστάσιο Κλωσταί Πεταλούδα, Αθήνα.",
    url: BASE_URL,
    images: [{ url: "/8thgbfest-white.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "8th Greek Barber Festival | 26-27 Απριλίου 2026, Αθήνα",
    description:
      "Το 8ο Greek Barber Festival είναι το σημείο συνάντησης της barber κουλτούρας στην Ελλάδα. 26-27 Απριλίου 2026, Εργοστάσιο Κλωσταί Πεταλούδα, Αθήνα.",
    images: ["/8thgbfest-white.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="el" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;600;700&family=Source+Sans+3:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <script dangerouslySetInnerHTML={{ __html: `
          try {
            var t = localStorage.getItem('theme');
            if (t === 'light') document.documentElement.setAttribute('data-theme', 'light');
          } catch(e) {}
        ` }} />
      </head>
      <body className="grain">
        <LanguageProvider>
          <ThemeProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}

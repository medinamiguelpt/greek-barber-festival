"use client";
import { I18nProvider } from "@/lib/i18n";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { usePathname } from "next/navigation";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  return (
    <I18nProvider>
      <Navbar />
      <main className={isHome ? "" : "pt-[60px]"}>{children}</main>
      <Footer />
    </I18nProvider>
  );
}

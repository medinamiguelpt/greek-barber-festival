import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "AI Receptionist Dashboard — Greek Barber Festival" },
  description: "Kostas AI Agent — live receptionist dashboard",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: "100vh", background: "#F5F0E8", fontFamily: "'Source Sans 3', sans-serif" }}>
      {children}
    </div>
  );
}

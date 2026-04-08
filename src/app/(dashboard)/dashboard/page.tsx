"use client";
import { useState, useEffect, useCallback, useRef, createContext, useContext } from "react";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { LanguageKey, LANG_META, LangSettings, DEFAULT_LANG, translate } from "./translations";


// ── Types ────────────────────────────────────────────────────────────────────
interface AgentData {
  id: string; name: string; language: string; languages: string[];
  llm: string; voice_id: string; last_7_day_call_count: number; status: string;
}
interface ConversationSummary {
  conversation_id: string;
  status: "in-progress" | "processing" | "done" | "error";
  start_time_unix_secs: number;
  call_duration_secs: number;
  message_count: number;
}
interface TranscriptMessage {
  role: "agent" | "user";
  message: string;
  time_in_call_secs: number;
}
interface ConversationDetail {
  conversation_id: string;
  status: string;
  transcript: TranscriptMessage[];
  metadata: { start_time_unix_secs: number; call_duration_secs: number };
  analysis?: { transcript_summary?: string };
}
interface AiBooking {
  conversation_id: string;
  source: "ai-call";
  status: string;       // "confirmed" | "in-progress"
  client_name: string;
  service: string;
  barber: string;
  date: string;         // "DD/MM"
  time: string;         // "HH:MM"
  price: number;
  duration_secs: number;
  start_time_unix_secs: number;
  message_count: number;
  summary: string;
  call_status: string;  // raw ElevenLabs status
}
type PaletteKey = "botanical" | "azure" | "sunset" | "lavender" | "rose" | "slate";
type ModeKey = "light" | "dark" | "system";
type DensityKey = "compact" | "comfortable" | "spacious";
type SettingsSection = "profile" | "appearance" | "dashboard" | "display" | "language" | "account" | "security";
interface Settings {
  mode: ModeKey; palette: PaletteKey; defaultTab: "hub" | "ledger";
  density: DensityKey; showServices: boolean; autoRefresh: "off" | "30s" | "1m" | "5m";
}
interface Colors {
  bg: string; surface: string; surfaceAlt: string; border: string; borderFaint: string;
  accent: string; accentMid: string; accentLight: string;
  text: string; textMuted: string; textFaint: string;
  green: string; greenLight: string; amber: string; amberLight: string;
  red: string; redLight: string; row: string; overlay: string;
}
interface BusinessProfile {
  businessName: string; ownerName: string; size: "solo" | "small" | "medium" | "large";
  email: string; phone: string; address: string; city: string;
  country: string; postcode: string; website: string; hours: string;
  barbers: string; // comma-separated
  agentId: string;
  twoFactorEnabled: boolean;
}

// ── Translation context ───────────────────────────────────────────────────────
const LangCtx = createContext<(key: string) => string>(k => k);
function useT() { return useContext(LangCtx); }

// ── Palettes ──────────────────────────────────────────────────────────────────
const PALETTES: Record<PaletteKey, { name: string; swatch: string; light: Colors; dark: Colors }> = {
  botanical: {
    name: "Botanical", swatch: "#3D4F35",
    light: {
      bg: "#F5F0E8", surface: "#FFFFFF", surfaceAlt: "#FAF7F2", border: "#E0D5C5", borderFaint: "#EDE8DF",
      accent: "#3D4F35", accentMid: "#6B7D60", accentLight: "#EAF0E6",
      text: "#2A2520", textMuted: "#7A6F64", textFaint: "#B0A898",
      green: "#3D7A50", greenLight: "#EAF5EE", amber: "#B8782A", amberLight: "#FDF3E3",
      red: "#B04040", redLight: "#FDF0F0", row: "#FAF8F4", overlay: "rgba(42,37,32,0.5)",
    },
    dark: {
      bg: "#161C14", surface: "#1E2A1C", surfaceAlt: "#243022", border: "#334530", borderFaint: "#2A3828",
      accent: "#8FBF7F", accentMid: "#6A9A5C", accentLight: "#243020",
      text: "#DCF0D4", textMuted: "#8AAC80", textFaint: "#567050",
      green: "#5DB87A", greenLight: "#1A3A28", amber: "#E8A84A", amberLight: "#3A2A10",
      red: "#E07070", redLight: "#3A1818", row: "#1A2418", overlay: "rgba(0,0,0,0.7)",
    },
  },
  azure: {
    name: "Azure", swatch: "#1B5EBE",
    light: {
      bg: "#EEF4FF", surface: "#FFFFFF", surfaceAlt: "#F5F8FF", border: "#C8D8F0", borderFaint: "#DDE8F8",
      accent: "#1B5EBE", accentMid: "#4A80D4", accentLight: "#DDEEFF",
      text: "#1A2340", textMuted: "#5A7090", textFaint: "#9AB0C8",
      green: "#2E7A52", greenLight: "#E0F5EC", amber: "#B07020", amberLight: "#FDF3DC",
      red: "#C04040", redLight: "#FDEAEA", row: "#F3F7FF", overlay: "rgba(26,35,64,0.5)",
    },
    dark: {
      bg: "#0D1525", surface: "#152035", surfaceAlt: "#1C2A40", border: "#243858", borderFaint: "#1C3050",
      accent: "#7BAEF8", accentMid: "#4A80D4", accentLight: "#1A3060",
      text: "#D8E8FF", textMuted: "#7AA0C8", textFaint: "#3A6090",
      green: "#5DB87A", greenLight: "#0F2820", amber: "#E8A84A", amberLight: "#2A1E08",
      red: "#E07070", redLight: "#2A1010", row: "#112030", overlay: "rgba(0,0,0,0.7)",
    },
  },
  sunset: {
    name: "Sunset", swatch: "#C04A28",
    light: {
      bg: "#FEF6EE", surface: "#FFFFFF", surfaceAlt: "#FDF8F4", border: "#F0D4C0", borderFaint: "#F8E8D8",
      accent: "#C04A28", accentMid: "#D4784A", accentLight: "#FDEADC",
      text: "#2A1508", textMuted: "#906040", textFaint: "#C89870",
      green: "#3A7040", greenLight: "#E5F5E8", amber: "#B87020", amberLight: "#FDF3DC",
      red: "#C03030", redLight: "#FDEAEA", row: "#FDF5EE", overlay: "rgba(42,21,8,0.5)",
    },
    dark: {
      bg: "#1E0E08", surface: "#2C1810", surfaceAlt: "#38201A", border: "#583020", borderFaint: "#482818",
      accent: "#FF9070", accentMid: "#D06040", accentLight: "#3A1808",
      text: "#FFE8D8", textMuted: "#C09070", textFaint: "#705040",
      green: "#5DB87A", greenLight: "#0F2818", amber: "#E8A84A", amberLight: "#2A1800",
      red: "#FF7878", redLight: "#2A0808", row: "#281408", overlay: "rgba(0,0,0,0.7)",
    },
  },
  lavender: {
    name: "Lavender", swatch: "#6747C7",
    light: {
      bg: "#F3F0FF", surface: "#FFFFFF", surfaceAlt: "#F8F6FF", border: "#D5CCF0", borderFaint: "#E5E0F8",
      accent: "#6747C7", accentMid: "#9070D8", accentLight: "#EBE5FF",
      text: "#1E1540", textMuted: "#70609A", textFaint: "#A898CC",
      green: "#2E7A52", greenLight: "#E0F5EC", amber: "#A07020", amberLight: "#FDF3DC",
      red: "#B84050", redLight: "#FDEAEC", row: "#F5F2FF", overlay: "rgba(30,21,64,0.5)",
    },
    dark: {
      bg: "#100D20", surface: "#1A1838", surfaceAlt: "#222048", border: "#38305A", borderFaint: "#2C2848",
      accent: "#B09AEE", accentMid: "#8070C8", accentLight: "#28204A",
      text: "#E4DEFF", textMuted: "#9080C8", textFaint: "#503870",
      green: "#5DB87A", greenLight: "#0F2820", amber: "#E8A84A", amberLight: "#281800",
      red: "#E07080", redLight: "#280818", row: "#141228", overlay: "rgba(0,0,0,0.72)",
    },
  },
  rose: {
    name: "Rose", swatch: "#C0305A",
    light: {
      bg: "#FFF0F5", surface: "#FFFFFF", surfaceAlt: "#FFF5F8", border: "#F0C8D8", borderFaint: "#F8DDE8",
      accent: "#C0305A", accentMid: "#D86080", accentLight: "#FFE5EE",
      text: "#2A0F1E", textMuted: "#90607A", textFaint: "#C898A8",
      green: "#3A7040", greenLight: "#E5F5E8", amber: "#A87020", amberLight: "#FDF3DC",
      red: "#C03030", redLight: "#FDEAEA", row: "#FDF5F8", overlay: "rgba(42,15,30,0.5)",
    },
    dark: {
      bg: "#1E0810", surface: "#2C1220", surfaceAlt: "#381828", border: "#582038", borderFaint: "#481828",
      accent: "#FF80A8", accentMid: "#D06080", accentLight: "#3A0820",
      text: "#FFD8E8", textMuted: "#C07090", textFaint: "#704050",
      green: "#5DB87A", greenLight: "#0F2818", amber: "#E8A84A", amberLight: "#2A1400",
      red: "#FF8080", redLight: "#2A0808", row: "#280E18", overlay: "rgba(0,0,0,0.7)",
    },
  },
  slate: {
    name: "Slate", swatch: "#3A4A5E",
    light: {
      bg: "#F2F4F8", surface: "#FFFFFF", surfaceAlt: "#F7F8FA", border: "#D0D8E4", borderFaint: "#E0E6EE",
      accent: "#3A4A5E", accentMid: "#5A6E88", accentLight: "#E0E8F0",
      text: "#1A2030", textMuted: "#5A6A7A", textFaint: "#9AAABB",
      green: "#2E7A52", greenLight: "#E0F5EC", amber: "#A07030", amberLight: "#FDF3DC",
      red: "#B84040", redLight: "#FDEAEA", row: "#F5F7FA", overlay: "rgba(26,32,48,0.5)",
    },
    dark: {
      bg: "#0E1218", surface: "#182028", surfaceAlt: "#202A38", border: "#2A3848", borderFaint: "#222E3C",
      accent: "#8AAAC8", accentMid: "#5A7898", accentLight: "#1C2A3C",
      text: "#D8E4F0", textMuted: "#7898B0", textFaint: "#3A5068",
      green: "#5DB87A", greenLight: "#0F2820", amber: "#E8A84A", amberLight: "#241800",
      red: "#E07070", redLight: "#281010", row: "#141C28", overlay: "rgba(0,0,0,0.7)",
    },
  },
};

// ── Defaults ──────────────────────────────────────────────────────────────────
const DEFAULT_SETTINGS: Settings = {
  mode: "light", palette: "botanical", defaultTab: "hub",
  density: "comfortable", showServices: true, autoRefresh: "off",
};
const DEFAULT_PROFILE: BusinessProfile = {
  businessName: "Demo Barbershop",
  ownerName: "",
  size: "small",
  email: "demo@barbershop.com",
  phone: "",
  address: "",
  city: "Athens",
  country: "GR",
  postcode: "",
  website: "",
  hours: "Tue–Sat · 10:00–20:00",
  barbers: "Nikos, Giorgos, Eleni, Petros",
  agentId: "agent_5001kjkkjvs6e7fs5t5fkjh1hhwc",
  twoFactorEnabled: false,
};

function loadSettings(): Settings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  try { const s = localStorage.getItem("gbf-dashboard-settings"); return s ? { ...DEFAULT_SETTINGS, ...JSON.parse(s) } : DEFAULT_SETTINGS; } catch { return DEFAULT_SETTINGS; }
}
function loadProfile(): BusinessProfile {
  if (typeof window === "undefined") return DEFAULT_PROFILE;
  try { const s = localStorage.getItem("gbf-business-profile"); return s ? { ...DEFAULT_PROFILE, ...JSON.parse(s) } : DEFAULT_PROFILE; } catch { return DEFAULT_PROFILE; }
}
function loadLangSettings(): LangSettings {
  if (typeof window === "undefined") return DEFAULT_LANG;
  try { const s = localStorage.getItem("gbf-language-settings"); return s ? { ...DEFAULT_LANG, ...JSON.parse(s) } : DEFAULT_LANG; } catch { return DEFAULT_LANG; }
}
function resolveMode(mode: ModeKey): "light" | "dark" {
  if (mode !== "system") return mode;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
function getColors(settings: Settings): Colors {
  const p = PALETTES[settings.palette] ?? PALETTES.botanical;
  return p[typeof window !== "undefined" ? resolveMode(settings.mode) : "light"];
}

// ── Static data ───────────────────────────────────────────────────────────────
const TODAY = new Date();
const fmt = (d: Date) => d.toLocaleDateString("el-GR", { day: "2-digit", month: "2-digit" });
const d0 = fmt(TODAY), d1 = fmt(new Date(TODAY.getTime() + 86400000)), d2 = fmt(new Date(TODAY.getTime() + 172800000));

const APPOINTMENTS = [
  { id: 1,  name: "Αλέξανδρος", service: "Haircut",              barber: "Nikos",   date: d0, time: "10:30", status: "confirmed",   price: 15 },
  { id: 2,  name: "Maria S.",   service: "Eyebrow Grooming",     barber: "Eleni",   date: d0, time: "11:00", status: "confirmed",   price: 8  },
  { id: 3,  name: "Δημήτρης",  service: "Full Grooming Package", barber: "Giorgos", date: d0, time: "12:00", status: "in-progress", price: 40 },
  { id: 4,  name: "Sofia A.",   service: "Hot Towel Shave",      barber: "Petros",  date: d0, time: "13:30", status: "confirmed",   price: 18 },
  { id: 5,  name: "Νίκος Κ.",  service: "Beard Trim & Shaping", barber: "Nikos",   date: d0, time: "14:00", status: "pending",     price: 12 },
  { id: 6,  name: "Elena P.",   service: "Hair Colour",          barber: "Eleni",   date: d0, time: "15:00", status: "confirmed",   price: 20 },
  { id: 7,  name: "Βασίλης",   service: "Head Shave",           barber: "Giorgos", date: d0, time: "16:30", status: "confirmed",   price: 15 },
  { id: 8,  name: "Κώστας Μ.", service: "Scalp Massage",        barber: "Petros",  date: d0, time: "17:00", status: "cancelled",   price: 10 },
  { id: 9,  name: "Θανάσης",   service: "Haircut",              barber: "Nikos",   date: d1, time: "10:30", status: "confirmed",   price: 15 },
  { id: 10, name: "Ειρήνη",    service: "Full Grooming Package", barber: "Eleni",  date: d1, time: "11:00", status: "pending",     price: 40 },
  { id: 11, name: "Παναγιώτης",service: "Hot Towel Shave",      barber: "Giorgos", date: d1, time: "13:00", status: "confirmed",   price: 18 },
  { id: 12, name: "Μαρία Κ.",  service: "Eyebrow Grooming",     barber: "Eleni",   date: d1, time: "14:30", status: "confirmed",   price: 8  },
  { id: 13, name: "Γιώργης",   service: "Beard Trim & Shaping", barber: "Petros",  date: d1, time: "15:00", status: "confirmed",   price: 12 },
  { id: 14, name: "Στέλιος",   service: "Haircut",              barber: "Nikos",   date: d2, time: "10:00", status: "confirmed",   price: 15 },
  { id: 15, name: "Χριστίνα",  service: "Hair Colour",          barber: "Eleni",   date: d2, time: "11:00", status: "confirmed",   price: 20 },
];
const LANG_LABELS: Record<string, string> = {
  el: "Greek 🇬🇷", en: "English 🇬🇧", es: "Spanish 🇪🇸",
  pt: "Portuguese 🇵🇹", fr: "French 🇫🇷", de: "German 🇩🇪", ar: "Arabic 🇸🇦",
};
const DENSITY_PAD: Record<DensityKey, { card: string; row: string; gap: number }> = {
  compact:     { card: "14px 18px", row: "9px 14px",  gap: 14 },
  comfortable: { card: "20px 24px", row: "14px 16px", gap: 20 },
  spacious:    { card: "28px 32px", row: "18px 20px", gap: 28 },
};
const STATUS_BORDER: Record<string, string> = {
  confirmed: "#3D7A50", "in-progress": "#B8782A", pending: "#9AAABB", cancelled: "#B04040",
};
const MOCK_SESSIONS = [
  { id: 1, device: "Chrome · macOS", location: "Athens, GR", current: true,  lastSeen: "Now" },
  { id: 2, device: "Safari · iPhone", location: "Athens, GR", current: false, lastSeen: "2h ago" },
];

// ── Analytics Mock Data ───────────────────────────────────────────────────────
const REVENUE_TREND = [
  { label: "25/3", revenue: 280, appts: 14 },
  { label: "26/3", revenue: 0,   appts: 0  },
  { label: "27/3", revenue: 340, appts: 17 },
  { label: "28/3", revenue: 295, appts: 15 },
  { label: "29/3", revenue: 410, appts: 21 },
  { label: "30/3", revenue: 365, appts: 18 },
  { label: "31/3", revenue: 320, appts: 16 },
  { label: "1/4",  revenue: 0,   appts: 0  },
  { label: "2/4",  revenue: 380, appts: 19 },
  { label: "3/4",  revenue: 425, appts: 22 },
  { label: "4/4",  revenue: 310, appts: 16 },
  { label: "5/4",  revenue: 450, appts: 23 },
  { label: "6/4",  revenue: 390, appts: 20 },
  { label: "Today",revenue: 175, appts: 9  },
];
const CALL_TREND = [
  { label: "Tue", successful: 8,  failed: 1 },
  { label: "Wed", successful: 12, failed: 2 },
  { label: "Thu", successful: 9,  failed: 0 },
  { label: "Fri", successful: 15, failed: 3 },
  { label: "Sat", successful: 18, failed: 2 },
  { label: "Sun", successful: 0,  failed: 0 },
  { label: "Mon", successful: 11, failed: 1 },
];
const BARBER_STATS = [
  { name: "Nikos",   revenue: 1840, clients: 87, appts: 92, topService: "Haircut",          avgTicket: 21.1, utilization: 88, color: "#3D7A50" },
  { name: "Giorgos", revenue: 1620, clients: 74, appts: 79, topService: "Full Package",     avgTicket: 20.5, utilization: 78, color: "#1B5EBE" },
  { name: "Eleni",   revenue: 1280, clients: 68, appts: 73, topService: "Eyebrow Grooming", avgTicket: 17.5, utilization: 72, color: "#C0305A" },
  { name: "Petros",  revenue: 1100, clients: 52, appts: 58, topService: "Hot Towel Shave",  avgTicket: 19.0, utilization: 63, color: "#6747C7" },
];
const SERVICE_STATS = [
  { name: "Haircut",          count: 48, revenue: 720, pct: 32 },
  { name: "Beard Trim",       count: 32, revenue: 384, pct: 21 },
  { name: "Hot Towel Shave",  count: 18, revenue: 324, pct: 12 },
  { name: "Eyebrow Grooming", count: 16, revenue: 128, pct: 11 },
  { name: "Full Package",     count: 14, revenue: 560, pct: 9  },
  { name: "Hair Colour",      count: 10, revenue: 200, pct: 7  },
  { name: "Head Shave",       count: 8,  revenue: 120, pct: 5  },
  { name: "Scalp Massage",    count: 6,  revenue: 60,  pct: 4  },
];
const PEAK_DAYS = ["Tue", "Wed", "Thu", "Fri", "Sat"];
const PEAK_HOURS_LABELS = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
const PEAK_DATA = [
  [1, 2, 2, 3, 2, 2, 1, 1, 0, 0],
  [2, 3, 3, 4, 3, 3, 2, 2, 1, 0],
  [1, 2, 3, 3, 2, 2, 2, 1, 0, 0],
  [2, 4, 4, 4, 3, 4, 3, 3, 2, 1],
  [3, 4, 4, 4, 4, 4, 4, 3, 2, 1],
];
const PEAK_LABELS = ["Quiet", "Light", "Moderate", "Busy", "Peak"];

// ── Demo AI bookings (simulated call history for demo purposes) ───────────────
// Timestamps are computed relative to page load so "X ago" labels stay accurate.
// IDs start with "demo_" so transcript fetch is skipped (no real ElevenLabs record).
const _N  = Math.floor(Date.now() / 1000);
const _dfmt = (d: Date) => d.toLocaleDateString("el-GR", { day: "2-digit", month: "2-digit" });
const _pastDate = (daysAgo: number) => _dfmt(new Date(Date.now() - daysAgo * 86400000));

type TMsg = { role: "agent" | "user"; message: string; time_in_call_secs: number };
const DEMO_TRANSCRIPTS: Record<string, TMsg[]> = {
  demo_001: [
    { role: "agent", message: "Καλησπέρα, ευχαριστούμε που επικοινωνήσατε με το Demo Barbershop! Πώς μπορώ να σας βοηθήσω;", time_in_call_secs: 0 },
    { role: "user",  message: "Γεια σας, θα ήθελα να κλείσω ένα ραντεβού για κούρεμα.", time_in_call_secs: 7 },
    { role: "agent", message: "Φυσικά! Έχουμε τον Nikos, τον Giorgos, την Eleni και τον Petros διαθέσιμους. Έχετε κάποια προτίμηση;", time_in_call_secs: 10 },
    { role: "user",  message: "Με τον Nikos παρακαλώ. Μπορείτε σήμερα στις 10:30;", time_in_call_secs: 18 },
    { role: "agent", message: "Μια στιγμή να ελέγξω τη διαθεσιμότητα... Ναι, ο Nikos είναι ελεύθερος σήμερα στις 10:30! Πώς σας λένε;", time_in_call_secs: 22 },
    { role: "user",  message: "Μιχάλης.", time_in_call_secs: 32 },
    { role: "agent", message: "Τέλεια Μιχάλη! Έχω κλείσει ραντεβού για κούρεμα με τον Nikos σήμερα στις 10:30. Σας περιμένουμε!", time_in_call_secs: 35 },
    { role: "user",  message: "Ευχαριστώ πολύ!", time_in_call_secs: 44 },
    { role: "agent", message: "Παρακαλώ! Καλή συνέχεια!", time_in_call_secs: 46 },
  ],
  demo_002: [
    { role: "agent", message: "Good afternoon, thank you for calling Demo Barbershop! How can I help you today?", time_in_call_secs: 0 },
    { role: "user",  message: "Hi! I'd like to book a hair colouring appointment please.", time_in_call_secs: 6 },
    { role: "agent", message: "Of course! We have Eleni who specialises in hair colour and colouring treatments. Would you like to book with her?", time_in_call_secs: 9 },
    { role: "user",  message: "Yes, that sounds great. Do you have anything available this afternoon?", time_in_call_secs: 18 },
    { role: "agent", message: "Let me check availability… We have a slot at 14:00 this afternoon with Eleni. Does that work for you?", time_in_call_secs: 22 },
    { role: "user",  message: "Perfect, yes! That works.", time_in_call_secs: 33 },
    { role: "agent", message: "Wonderful! May I take your name please?", time_in_call_secs: 36 },
    { role: "user",  message: "Elena, Elena Papadimitriou.", time_in_call_secs: 41 },
    { role: "agent", message: "Great, Elena! You're booked for a hair colour with Eleni today at 14:00. We look forward to seeing you!", time_in_call_secs: 44 },
    { role: "user",  message: "Thank you so much!", time_in_call_secs: 53 },
    { role: "agent", message: "You're welcome! See you this afternoon!", time_in_call_secs: 55 },
  ],
  demo_003: [
    { role: "agent", message: "Καλημέρα, Demo Barbershop! Τι μπορώ να κάνω για εσάς;", time_in_call_secs: 0 },
    { role: "user",  message: "Γεια σας! Θα ήθελα να κλείσω ένα full grooming package. Έχω μία ειδική εκδήλωση αύριο.", time_in_call_secs: 5 },
    { role: "agent", message: "Εξαιρετικά! Το full grooming package περιλαμβάνει κούρεμα, περιποίηση γενιάς και φαβορίτες. Ποιον κουρέα προτιμάτε;", time_in_call_secs: 9 },
    { role: "user",  message: "Τον Giorgos αν είναι δυνατόν. Μπορεί χθες στις 11;", time_in_call_secs: 20 },
    { role: "agent", message: "Ναι, ο Giorgos είναι διαθέσιμος στις 11:00! Το όνομά σας παρακαλώ;", time_in_call_secs: 25 },
    { role: "user",  message: "Δημήτρης Αναστασίου.", time_in_call_secs: 34 },
    { role: "agent", message: "Τέλεια Δημήτρη! Έχω κλείσει full grooming package με τον Giorgos στις 11:00. Καλή επιτυχία στην εκδήλωση!", time_in_call_secs: 37 },
    { role: "user",  message: "Ευχαριστώ πολύ!", time_in_call_secs: 48 },
  ],
  demo_004: [
    { role: "agent", message: "Demo Barbershop, καλησπέρα! Πώς μπορώ να σας εξυπηρετήσω;", time_in_call_secs: 0 },
    { role: "user",  message: "Γεια σας, θέλω να κλείσω ραντεβού για διαμόρφωση φρυδιών με την Eleni.", time_in_call_secs: 6 },
    { role: "agent", message: "Φυσικά! Η Eleni είναι ειδικεύεται στο eyebrow grooming. Ποιο απόγευμα σας βολεύει;", time_in_call_secs: 10 },
    { role: "user",  message: "Χθες στις 4 και μισή αν γίνεται.", time_in_call_secs: 18 },
    { role: "agent", message: "Βλέπω ότι η Eleni είναι ελεύθερη στις 16:30. Πώς σας λένε;", time_in_call_secs: 22 },
    { role: "user",  message: "Sofia Makri.", time_in_call_secs: 30 },
    { role: "agent", message: "Άψογα Sofia! Eyebrow grooming με την Eleni στις 16:30. Σας περιμένουμε!", time_in_call_secs: 33 },
  ],
  demo_005: [
    { role: "agent", message: "Καλημέρα, Demo Barbershop! Τι μπορώ να κάνω για εσάς;", time_in_call_secs: 0 },
    { role: "user",  message: "Γεια σας. Θέλω να ακυρώσω το ραντεβού μου, κάτι έτυχε στη δουλειά.", time_in_call_secs: 5 },
    { role: "agent", message: "Λυπάμαι που το ακούω αυτό. Μπορείτε να μου πείτε το όνομά σας για να βρω το ραντεβού;", time_in_call_secs: 10 },
    { role: "user",  message: "Κώστας Βασιλόπουλος.", time_in_call_secs: 18 },
    { role: "agent", message: "Βρήκα το ραντεβού σας Κώστα — hot towel shave με τον Petros στις 09:30. Θέλετε να το ακυρώσω;", time_in_call_secs: 22 },
    { role: "user",  message: "Ναι παρακαλώ.", time_in_call_secs: 32 },
    { role: "agent", message: "Το ραντεβού ακυρώθηκε. Θα θέλατε να κλείσουμε κάποια άλλη ημέρα;", time_in_call_secs: 35 },
    { role: "user",  message: "Όχι αυτή τη στιγμή, θα επικοινωνήσω ξανά. Ευχαριστώ.", time_in_call_secs: 41 },
    { role: "agent", message: "Κανένα πρόβλημα! Σας περιμένουμε όποτε θέλετε. Καλή συνέχεια!", time_in_call_secs: 45 },
  ],
  demo_006: [
    { role: "agent", message: "Demo Barbershop, καλημέρα! Πώς μπορώ να σας βοηθήσω;", time_in_call_secs: 0 },
    { role: "user",  message: "Γεια! Θέλω ραντεβού για beard trim and shaping. Ειδικά με τον Nikos αν μπορεί.", time_in_call_secs: 6 },
    { role: "agent", message: "Ο Nikos κάνει εξαιρετική δουλειά στη διαμόρφωση γενιάς! Πότε σας βολεύει;", time_in_call_secs: 11 },
    { role: "user",  message: "Πριν λίγες μέρες στη 1 το μεσημέρι;", time_in_call_secs: 19 },
    { role: "agent", message: "Ο Nikos είναι ελεύθερος εκείνη την ώρα. Το όνομά σας;", time_in_call_secs: 23 },
    { role: "user",  message: "Γιώργης Παπαδόπουλος. Και μια ερώτηση — πουλάτε και προϊόντα για γένια;", time_in_call_secs: 30 },
    { role: "agent", message: "Ναι, έχουμε μια επιλογή από premium προϊόντα περιποίησης γενιάς. Μπορείτε να ρωτήσετε τον Nikos όταν έρθετε!", time_in_call_secs: 37 },
    { role: "user",  message: "Τέλεια, ευχαριστώ!", time_in_call_secs: 50 },
    { role: "agent", message: "Παρακαλώ Γιώργη! Beard trim με τον Nikos στις 13:00 είναι κλεισμένο. Σας περιμένουμε!", time_in_call_secs: 53 },
  ],
  demo_007: [
    { role: "agent", message: "Good afternoon, Demo Barbershop! How can I assist you?", time_in_call_secs: 0 },
    { role: "user",  message: "Hi, I wanted to ask about scalp massage — do you offer that?", time_in_call_secs: 6 },
    { role: "agent", message: "Yes we do! Our scalp massage is a relaxing 30-minute treatment that improves circulation and reduces tension. It's priced at €10. Would you like to book one?", time_in_call_secs: 10 },
    { role: "user",  message: "That sounds wonderful. Yes, I'd like to book with Eleni if possible.", time_in_call_secs: 24 },
    { role: "agent", message: "Eleni is available Wednesday at 15:00. Does that work for you?", time_in_call_secs: 28 },
    { role: "user",  message: "Perfect! And can I make it a regular weekly appointment?", time_in_call_secs: 36 },
    { role: "agent", message: "Absolutely, we'd love that! I'll note your preference. May I have your name?", time_in_call_secs: 40 },
    { role: "user",  message: "Maria Konstantinou.", time_in_call_secs: 48 },
    { role: "agent", message: "Wonderful Maria! Scalp massage with Eleni at 15:00 is confirmed. We look forward to making this a weekly treat for you!", time_in_call_secs: 51 },
  ],
  demo_008: [
    { role: "agent", message: "Good morning, Demo Barbershop! How can I help you?", time_in_call_secs: 0 },
    { role: "user",  message: "Hi there, my name's James. I'd like to book a haircut.", time_in_call_secs: 5 },
    { role: "agent", message: "Hi James! Happy to help. Do you have a preferred barber or style in mind?", time_in_call_secs: 9 },
    { role: "user",  message: "I've heard Giorgos is good. Do you have him available Tuesday morning?", time_in_call_secs: 16 },
    { role: "agent", message: "Yes! Giorgos has a slot at 11:30 on Tuesday. Shall I book that for you?", time_in_call_secs: 21 },
    { role: "user",  message: "Please, yes. Also — can you give me directions? I'm not familiar with the area.", time_in_call_secs: 30 },
    { role: "agent", message: "Of course! We're on Kifissou 42, Athens. There's parking nearby. Google Maps will get you there easily.", time_in_call_secs: 36 },
    { role: "user",  message: "Great, thanks a lot!", time_in_call_secs: 50 },
    { role: "agent", message: "You're welcome James! Haircut with Giorgos Tuesday at 11:30 — see you then!", time_in_call_secs: 53 },
    { role: "user",  message: "Perfect, see you!", time_in_call_secs: 62 },
  ],
  demo_009: [
    { role: "agent", message: "Demo Barbershop, καλημέρα! Σε τι μπορώ να σας βοηθήσω;", time_in_call_secs: 0 },
    { role: "user",  message: "Γεια σας. Θέλω να κλείσω ξύρισμα κεφαλιού με τον Petros.", time_in_call_secs: 5 },
    { role: "agent", message: "Βεβαίως! Ο Petros είναι ειδικός στο head shave. Πότε θέλετε να έρθετε;", time_in_call_secs: 9 },
    { role: "user",  message: "Δευτέρα πρωί, 10 η ώρα.", time_in_call_secs: 16 },
    { role: "agent", message: "Ο Petros είναι ελεύθερος Δευτέρα στις 10:00. Το όνομά σας;", time_in_call_secs: 19 },
    { role: "user",  message: "Αλέξανδρος.", time_in_call_secs: 27 },
    { role: "agent", message: "Αλέξανδρε, έχω κλείσει head shave με τον Petros Δευτέρα στις 10:00. Σας περιμένουμε!", time_in_call_secs: 30 },
    { role: "user",  message: "Ευχαριστώ, γεια σας.", time_in_call_secs: 39 },
  ],
  demo_010: [
    { role: "agent", message: "Καλησπέρα, Demo Barbershop! Πώς μπορώ να σας εξυπηρετήσω;", time_in_call_secs: 0 },
    { role: "user",  message: "Γεια σας, είμαι ο Νίκος, τακτικός πελάτης. Θέλω να κλείσω beard trim.", time_in_call_secs: 6 },
    { role: "agent", message: "Γεια σας Νίκο, χαιρόμαστε που μας καλείτε ξανά! Με τον Giorgos όπως συνήθως;", time_in_call_secs: 11 },
    { role: "user",  message: "Ναι ακριβώς. Έχει ώρα την Κυριακή στις 12;", time_in_call_secs: 20 },
    { role: "agent", message: "Ναι, ο Giorgos είναι ελεύθερος! Κλείνω beard trim & shaping Κυριακή 12:00.", time_in_call_secs: 24 },
    { role: "user",  message: "Εξαιρετικά, ευχαριστώ!", time_in_call_secs: 34 },
    { role: "agent", message: "Παρακαλώ Νίκο! Σας περιμένουμε. Καλό απόγευμα!", time_in_call_secs: 37 },
  ],
};

const DEMO_AI_BOOKINGS: AiBooking[] = [
  {
    conversation_id: "demo_001", source: "ai-call", status: "confirmed",
    client_name: "Μιχάλης", service: "Haircut", barber: "Nikos",
    date: d0, time: "10:30", price: 0, duration_secs: 87, message_count: 9,
    start_time_unix_secs: _N - 3 * 3600,
    summary: "The client Michalis called to book a haircut for today at 10:30. The agent confirmed availability with Nikos and the appointment was scheduled. The client asked for a classic short cut.",
    call_status: "done",
  },
  {
    conversation_id: "demo_002", source: "ai-call", status: "confirmed",
    client_name: "Elena P.", service: "Hair Colour", barber: "Eleni",
    date: d0, time: "14:00", price: 0, duration_secs: 134, message_count: 12,
    start_time_unix_secs: _N - 5 * 3600,
    summary: "Elena called inquiring about hair colouring options. The agent explained the available services and pricing, then scheduled a hair colour appointment for this afternoon at 14:00 with Eleni.",
    call_status: "done",
  },
  {
    conversation_id: "demo_003", source: "ai-call", status: "confirmed",
    client_name: "Δημήτρης", service: "Full Grooming Package", barber: "Giorgos",
    date: _pastDate(1), time: "11:00", price: 0, duration_secs: 112, message_count: 10,
    start_time_unix_secs: _N - 26 * 3600,
    summary: "Dimitris called yesterday to book a full grooming package. The agent confirmed Giorgos was available at 11:00 and the appointment was confirmed. The client mentioned it was for a special occasion.",
    call_status: "done",
  },
  {
    conversation_id: "demo_004", source: "ai-call", status: "confirmed",
    client_name: "Sofia M.", service: "Eyebrow Grooming", barber: "Eleni",
    date: _pastDate(1), time: "16:30", price: 0, duration_secs: 68, message_count: 7,
    start_time_unix_secs: _N - 30 * 3600,
    summary: "Sofia called to schedule an eyebrow grooming session for yesterday afternoon. The agent confirmed Eleni's availability at 16:30 and completed the booking quickly.",
    call_status: "done",
  },
  {
    conversation_id: "demo_005", source: "ai-call", status: "confirmed",
    client_name: "Κώστας Β.", service: "Hot Towel Shave", barber: "Petros",
    date: _pastDate(2), time: "09:30", price: 0, duration_secs: 45, message_count: 5,
    start_time_unix_secs: _N - 52 * 3600,
    summary: "The client called to cancel his hot towel shave appointment originally scheduled with Petros. The agent cancelled the booking and offered to reschedule, but the client said he would call back later.",
    call_status: "done",
  },
  {
    conversation_id: "demo_006", source: "ai-call", status: "confirmed",
    client_name: "Γιώργης Π.", service: "Beard Trim & Shaping", barber: "Nikos",
    date: _pastDate(3), time: "13:00", price: 0, duration_secs: 93, message_count: 8,
    start_time_unix_secs: _N - 75 * 3600,
    summary: "Giorgis called to book a beard trim and shaping session. He asked specifically for Nikos and the agent confirmed availability for Thursday at 13:00. The client also asked about beard care products available at the shop.",
    call_status: "done",
  },
  {
    conversation_id: "demo_007", source: "ai-call", status: "confirmed",
    client_name: "Maria K.", service: "Scalp Massage", barber: "Eleni",
    date: _pastDate(4), time: "15:00", price: 0, duration_secs: 78, message_count: 8,
    start_time_unix_secs: _N - 98 * 3600,
    summary: "Maria called asking about scalp massage services. The agent explained the treatment and booked a 30-minute scalp massage with Eleni for Wednesday at 15:00. The client sounded very interested in making it a regular appointment.",
    call_status: "done",
  },
  {
    conversation_id: "demo_008", source: "ai-call", status: "confirmed",
    client_name: "James T.", service: "Haircut", barber: "Giorgos",
    date: _pastDate(5), time: "11:30", price: 0, duration_secs: 101, message_count: 11,
    start_time_unix_secs: _N - 122 * 3600,
    summary: "James called in English requesting a haircut appointment. The agent switched to English to assist him, confirmed a slot with Giorgos at 11:30 on Tuesday, and provided directions to the barbershop upon request.",
    call_status: "done",
  },
  {
    conversation_id: "demo_009", source: "ai-call", status: "confirmed",
    client_name: "Αλέξανδρος", service: "Head Shave", barber: "Petros",
    date: _pastDate(6), time: "10:00", price: 0, duration_secs: 59, message_count: 6,
    start_time_unix_secs: _N - 148 * 3600,
    summary: "Alexandros called requesting a head shave appointment. The agent confirmed Petros was available Monday at 10:00 and scheduled the booking. The call was short and efficient.",
    call_status: "done",
  },
  {
    conversation_id: "demo_010", source: "ai-call", status: "confirmed",
    client_name: "Νίκος Π.", service: "Beard Trim & Shaping", barber: "Giorgos",
    date: _pastDate(7), time: "12:00", price: 0, duration_secs: 82, message_count: 9,
    start_time_unix_secs: _N - 170 * 3600,
    summary: "Nikos called to book a beard trim and shaping. The agent confirmed Giorgos was available last Sunday at noon and the appointment was successfully scheduled. The client mentioned he is a regular customer.",
    call_status: "done",
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────
function timeAgo(unixSecs: number): string {
  const diff = Math.floor(Date.now() / 1000 - unixSecs);
  if (diff < 10) return "Just now";
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}
function fmtDuration(secs: number): string {
  if (!secs || secs < 1) return "—";
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return m > 0 ? `${m}m ${s}s` : `${s}s`;
}

// ── Responsive CSS ────────────────────────────────────────────────────────────
const RESPONSIVE_CSS = `
  @keyframes gbf-pulse     { 0%,100%{opacity:1} 50%{opacity:0.35} }
  @keyframes gbf-shimmer   { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
  @keyframes gbf-fadeIn    { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
  @keyframes gbf-slideR    { from{transform:translateX(100%);opacity:.8} to{transform:translateX(0);opacity:1} }
  @keyframes gbf-slideU    { from{transform:translateY(100%);opacity:.8} to{transform:translateY(0);opacity:1} }
  @keyframes gbf-staggerIn { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
  @keyframes gbf-numIn     { from{opacity:0;transform:translateY(8px) scale(.94)} to{opacity:1;transform:translateY(0) scale(1)} }
  @keyframes gbf-ringPulse { 0%,100%{transform:scale(1);opacity:.6} 50%{transform:scale(1.06);opacity:1} }

  .gbf-skeleton { background:linear-gradient(90deg,rgba(128,128,128,.1) 25%,rgba(128,128,128,.2) 50%,rgba(128,128,128,.1) 75%); background-size:200% 100%; animation:gbf-shimmer 1.5s infinite; border-radius:8px; }
  .gbf-tab-content { animation:gbf-fadeIn .22s ease-out both; }
  button:focus-visible,select:focus-visible { outline:2px solid currentColor; outline-offset:2px; }
  .gbf-btn:active { opacity:.75; transform:scale(.97); }
  .gbf-card-pressable:active { transform:scale(.99); }

  /* ── Hover lift ─────────────────────────────────────── */
  .gbf-lift {
    transition: transform .22s cubic-bezier(.34,1.56,.64,1), box-shadow .22s ease, border-color .18s ease;
    will-change: transform;
  }
  .gbf-lift:hover  { transform:translateY(-4px); box-shadow:0 12px 32px rgba(0,0,0,.13); }
  .gbf-lift:active { transform:translateY(-1px) scale(.99); transition-duration:.08s; }

  .gbf-lift-sm { transition:transform .18s ease, box-shadow .18s ease, border-color .18s ease; }
  .gbf-lift-sm:hover  { transform:translateY(-2px); box-shadow:0 4px 16px rgba(0,0,0,.1); }
  .gbf-lift-sm:active { transform:scale(.985); }

  /* ── Stagger-in ─────────────────────────────────────── */
  .gbf-stagger > * { animation:gbf-staggerIn .32s ease both; }
  .gbf-stagger > *:nth-child(1){ animation-delay:.03s }
  .gbf-stagger > *:nth-child(2){ animation-delay:.08s }
  .gbf-stagger > *:nth-child(3){ animation-delay:.13s }
  .gbf-stagger > *:nth-child(4){ animation-delay:.18s }
  .gbf-stagger > *:nth-child(5){ animation-delay:.22s }
  .gbf-stagger > *:nth-child(6){ animation-delay:.26s }
  .gbf-stagger > *:nth-child(n+7){ animation-delay:.30s }

  /* ── Number pop-in ──────────────────────────────────── */
  .gbf-num-in { animation:gbf-numIn .42s cubic-bezier(.34,1.56,.64,1) both; }

  /* ── Table row hover ────────────────────────────────── */
  .gbf-tr-hover { transition:background .12s; }
  .gbf-tr-hover:hover { filter:brightness(.97); }
  .gbf-tr-hover.gbf-ai-row:hover { filter:brightness(.96); cursor:pointer; }

  /* ── Heat cell ──────────────────────────────────────── */
  .gbf-heat-cell {
    transition:transform .18s ease, box-shadow .18s ease, opacity .18s ease;
    border-radius:6px; cursor:default;
  }
  .gbf-heat-cell:hover { transform:scale(1.25); box-shadow:0 3px 10px rgba(0,0,0,.22); position:relative; z-index:2; }

  /* ── Tooltip ────────────────────────────────────────── */
  .gbf-tip { position:relative; }
  .gbf-tip::after {
    content:attr(data-tip);
    position:absolute; bottom:calc(100% + 7px); left:50%; transform:translateX(-50%);
    background:rgba(15,15,15,.9); color:#fff; font-size:11px; font-weight:600;
    padding:5px 10px; border-radius:7px; white-space:nowrap; pointer-events:none;
    opacity:0; transition:opacity .15s; z-index:60;
  }
  .gbf-tip:hover::after { opacity:1; }

  /* ── Bar chart row hover ─────────────────────────────── */
  .gbf-bar-row { transition:opacity .15s; }
  .gbf-bar-row:hover { opacity:.85; }
  .gbf-bar-row:hover .gbf-bar-label { font-weight:700; }

  /* ── Service item ───────────────────────────────────── */
  .gbf-svc-item {
    transition:background .15s, border-color .15s, transform .18s ease;
    cursor:default;
  }
  .gbf-svc-item:hover { transform:translateY(-2px); }

  /* ── Terminal ring pulse (idle) ─────────────────────── */
  .gbf-ring-idle { animation:gbf-ringPulse 3s ease-in-out infinite; }

  /* ── Feed card ──────────────────────────────────────── */
  .gbf-feed-card { transition:transform .2s ease, box-shadow .2s ease, border-color .18s ease; }
  .gbf-feed-card:hover { transform:translateY(-2px); box-shadow:0 6px 20px rgba(0,0,0,.11); cursor:pointer; }

  /* ElevenLabs widget — sit above page chrome, below settings drawer */
  elevenlabs-convai {
    position:fixed !important;
    bottom:24px !important;
    right:24px !important;
    z-index:500 !important;
  }
  @media(max-width:768px){
    elevenlabs-convai {
      bottom:20px !important;
      right:16px !important;
    }
  }

  /* Layout */
  .gbf-header         { padding:0 32px; }
  .gbf-header-inner   { height:64px; }
  .gbf-header-date    { display:block; }
  .gbf-header-live-text { display:inline; }
  .gbf-tabs-inner     { padding:0 32px; }
  .gbf-tab-btn        { padding:16px 24px; font-size:14px; white-space:nowrap; }
  .gbf-tab-full       { display:inline; }
  .gbf-tab-short      { display:none; }
  .gbf-content        { padding:28px 32px 108px; }
  .gbf-stat-grid      { display:grid; grid-template-columns:repeat(4,1fr); gap:16px; }
  .gbf-hub-grid       { display:grid; grid-template-columns:1fr 1.2fr; gap:20px; align-items:start; }
  .gbf-hub-main       { display:grid; grid-template-columns:340px 1fr; gap:20px; align-items:start; }
  .gbf-services-grid  { display:grid; grid-template-columns:repeat(auto-fill,minmax(190px,1fr)); gap:10px; }
  .gbf-ledger-table   { display:block; }
  .gbf-ledger-cards   { display:none; }
  .gbf-filter-selects { display:flex; flex-wrap:wrap; gap:8px; flex:1; }
  .gbf-footer         { padding:16px 32px; }

  /* Settings drawer — desktop: slide from right */
  .gbf-settings-drawer {
    position:fixed; top:0; right:0; bottom:0; left:auto;
    width:680px; border-radius:0; max-height:100vh;
    animation:gbf-slideR .28s cubic-bezier(.32,.72,0,1) both;
  }
  .gbf-settings-body  { display:flex; flex:1; overflow:hidden; min-height:0; }
  .gbf-settings-nav   { width:190px; flex-shrink:0; padding:8px 0; overflow-y:auto; }
  .gbf-settings-main  { flex:1; overflow-y:auto; padding:0 28px 48px; }
  .gbf-settings-handle{ display:none; }
  .gbf-mob-back       { display:none!important; }
  .gbf-mob-hide       { } /* no-op on desktop */

  /* Tablet */
  @media(max-width:1024px){
    .gbf-stat-grid  { grid-template-columns:repeat(2,1fr); }
    .gbf-hub-grid   { grid-template-columns:1fr; }
    .gbf-hub-main   { grid-template-columns:1fr; }
    .gbf-content    { padding:24px 24px 100px; }
    .gbf-header     { padding:0 24px; }
    .gbf-tabs-inner { padding:0 24px; }
    .gbf-settings-drawer { width:560px; }
    .gbf-settings-nav    { width:170px; }
  }

  /* Mobile */
  @media(max-width:768px){
    .gbf-header         { padding:0 16px; }
    .gbf-header-inner   { height:56px; }
    .gbf-header-date    { display:none; }
    .gbf-header-live-text { display:none; }
    .gbf-tabs-inner     { padding:0; }
    .gbf-tab-btn        { padding:13px 0; font-size:13px; flex:1; justify-content:center; }
    .gbf-tab-full       { display:none; }
    .gbf-tab-short      { display:inline; }
    .gbf-content        { padding:14px 14px 104px; }
    .gbf-stat-grid      { grid-template-columns:repeat(2,1fr); gap:10px; }
    .gbf-services-grid  { grid-template-columns:repeat(2,1fr); gap:8px; }
    .gbf-ledger-table   { display:none; }
    .gbf-ledger-cards   { display:flex; flex-direction:column; gap:10px; }
    .gbf-filter-selects { flex-direction:column; gap:8px; }
    .gbf-footer         { padding:14px 16px; flex-wrap:wrap; gap:4px; }
    /* Settings bottom sheet */
    .gbf-settings-drawer {
      top:auto; right:0; bottom:0; left:0;
      width:100%; border-radius:20px 20px 0 0; max-height:94vh;
      animation:gbf-slideU .3s cubic-bezier(.32,.72,0,1) both;
    }
    .gbf-settings-handle { display:flex; }
    .gbf-settings-body   { flex-direction:column; }
    .gbf-settings-nav    { width:100%; padding:0; }
    .gbf-settings-main   { padding:0 16px 48px; }
    .gbf-mob-back        { display:flex!important; }
    .gbf-mob-hide        { display:none!important; }
  }

  @media(max-width:390px){
    .gbf-content    { padding:12px 12px 96px; }
    .gbf-stat-grid  { gap:8px; }
    .gbf-services-grid { grid-template-columns:1fr; }
  }

  @supports(padding-bottom:env(safe-area-inset-bottom)){
    .gbf-content        { padding-bottom:calc(108px + env(safe-area-inset-bottom)); }
    .gbf-settings-drawer{ padding-bottom:env(safe-area-inset-bottom); }
    .gbf-footer         { padding-bottom:calc(14px + env(safe-area-inset-bottom)); }
  }

  /* RTL layout (Arabic) */
  @keyframes gbf-slideL { from{transform:translateX(-100%);opacity:.8} to{transform:translateX(0);opacity:1} }
  [dir="rtl"] .gbf-settings-drawer {
    right:auto; left:0; border-left:none;
    animation-name:gbf-slideL;
  }
  [dir="rtl"] .gbf-settings-nav   { border-right:none; border-left-width:1px; border-left-style:solid; }
  [dir="rtl"] .gbf-settings-main  { direction:rtl; }
  [dir="rtl"] .gbf-footer         { direction:rtl; }
  @media(max-width:768px){
    [dir="rtl"] .gbf-settings-drawer { right:0; left:0; animation-name:gbf-slideU; }
  }
`;

// ── Skeleton ──────────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div style={{ background: "rgba(128,128,128,0.08)", border: "1px solid rgba(128,128,128,0.12)", borderRadius: 14, padding: "20px 24px" }}>
      <div className="gbf-skeleton" style={{ height: 28, width: "45%", marginBottom: 8 }} />
      <div className="gbf-skeleton" style={{ height: 13, width: "65%", marginBottom: 6 }} />
      <div className="gbf-skeleton" style={{ height: 12, width: "50%" }} />
    </div>
  );
}

// ── Settings Panel ────────────────────────────────────────────────────────────
const NAV_ITEMS: { id: SettingsSection; label: string; icon: string; desc: string }[] = [
  { id: "profile",    label: "Business Profile", icon: "🏪", desc: "Your barbershop info" },
  { id: "appearance", label: "Appearance",        icon: "🎨", desc: "Theme & colours" },
  { id: "dashboard",  label: "Dashboard",         icon: "📊", desc: "Data & refresh" },
  { id: "display",    label: "Display",           icon: "⊡",  desc: "Layout & density" },
  { id: "language",   label: "Language",          icon: "🌐", desc: "UI & translation" },
  { id: "account",    label: "Account",           icon: "👤", desc: "Email & plan" },
  { id: "security",   label: "Security",          icon: "🔒", desc: "Auth & sessions" },
];

function SettingsPanel({
  settings, onUpdate, profile, onProfileUpdate, onClose, onLogout, C,
  langSettings, onLangUpdate,
}: {
  settings: Settings; onUpdate: (p: Partial<Settings>) => void;
  profile: BusinessProfile; onProfileUpdate: (p: Partial<BusinessProfile>) => void;
  onClose: () => void; onLogout: () => void; C: Colors;
  langSettings: LangSettings; onLangUpdate: (p: Partial<LangSettings>) => void;
}) {
  const t = useT();
  const [activeSection, setActiveSection] = useState<SettingsSection>("profile");
  const [mobContent, setMobContent] = useState(false); // mobile: false=list, true=content
  const [profileDraft, setProfileDraft] = useState<BusinessProfile>(profile);
  const [profileSaved, setProfileSaved] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState("");

  // Scroll lock
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  const handleNavClick = (id: SettingsSection) => {
    setActiveSection(id);
    setMobContent(true);
    setProfileSaved(false);
  };
  const handleBack = () => setMobContent(false);

  const saveProfile = () => {
    onProfileUpdate(profileDraft);
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 2500);
  };

  // ── Helpers ──────────────────────────────────────────────────────────────
  const section = (title: string, desc?: string) => (
    <div style={{ marginBottom: 18, marginTop: 28, paddingBottom: 10, borderBottom: `1px solid ${C.borderFaint}` }}>
      <div style={{ fontSize: 15, fontWeight: 700, color: C.text }}>{title}</div>
      {desc && <div style={{ fontSize: 12, color: C.textMuted, marginTop: 2 }}>{desc}</div>}
    </div>
  );

  const field = (label: string, value: string, onChange: (v: string) => void, opts?: { type?: string; placeholder?: string; readonly?: boolean; mono?: boolean; hint?: string }) => (
    <div style={{ marginBottom: 14 }}>
      <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: C.textMuted, marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</label>
      <input
        type={opts?.type ?? "text"} value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={opts?.placeholder ?? ""} readOnly={opts?.readonly}
        style={{
          width: "100%", boxSizing: "border-box", padding: "10px 12px", borderRadius: 8,
          border: `1px solid ${C.border}`, background: opts?.readonly ? C.surfaceAlt : C.surface,
          color: C.text, fontSize: 14, fontFamily: opts?.mono ? "monospace" : "inherit",
          outline: "none", transition: "border-color .15s",
        }}
        onFocus={e => !opts?.readonly && (e.target.style.borderColor = C.accent)}
        onBlur={e => (e.target.style.borderColor = C.border)}
      />
      {opts?.hint && <div style={{ fontSize: 11, color: C.textFaint, marginTop: 4 }}>{opts.hint}</div>}
    </div>
  );

  const toggle = (label: string, sublabel: string, value: boolean, onChange: (v: boolean) => void) => (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: `1px solid ${C.borderFaint}` }}>
      <div style={{ marginRight: 16 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: C.text }}>{label}</div>
        <div style={{ fontSize: 12, color: C.textMuted, marginTop: 2 }}>{sublabel}</div>
      </div>
      <button onClick={() => onChange(!value)} className="gbf-btn" style={{
        width: 48, height: 28, borderRadius: 99, border: "none", cursor: "pointer",
        background: value ? C.accent : C.border, position: "relative", transition: "background .2s", flexShrink: 0,
      }}>
        <span style={{ position: "absolute", top: 3, left: value ? 23 : 3, width: 22, height: 22, borderRadius: "50%", background: "#fff", transition: "left .2s", boxShadow: "0 1px 4px rgba(0,0,0,.25)" }} />
      </button>
    </div>
  );

  const pill = (label: string, active: boolean, onClick: () => void) => (
    <button onClick={onClick} className="gbf-btn" style={{
      flex: 1, minHeight: 40, padding: "8px 10px", borderRadius: 9,
      border: `1.5px solid ${active ? C.accent : C.border}`,
      background: active ? C.accentLight : C.surfaceAlt,
      color: active ? C.accent : C.textMuted,
      fontSize: 13, fontWeight: active ? 700 : 500, cursor: "pointer", fontFamily: "inherit",
      transition: "all .15s",
    }}>{label}</button>
  );

  const selectRow = (label: string, value: string, options: [string, string][], onChange: (v: string) => void) => (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: `1px solid ${C.borderFaint}` }}>
      <span style={{ fontSize: 14, fontWeight: 500, color: C.text }}>{label}</span>
      <select value={value} onChange={e => onChange(e.target.value)} style={{
        fontSize: 13, color: C.text, background: C.surfaceAlt, border: `1px solid ${C.border}`,
        borderRadius: 8, padding: "7px 10px", cursor: "pointer", outline: "none", fontFamily: "inherit", minHeight: 38,
      }}>
        {options.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
      </select>
    </div>
  );

  // ── Section: Profile ──────────────────────────────────────────────────────
  const ProfileSection = () => (
    <div>
      {section("Business Information")}
      {field("Business name", profileDraft.businessName, v => setProfileDraft(d => ({ ...d, businessName: v })), { placeholder: "e.g. Kostas Barbershop" })}
      {field("Owner / Contact name", profileDraft.ownerName, v => setProfileDraft(d => ({ ...d, ownerName: v })), { placeholder: "Your full name" })}
      <div style={{ marginBottom: 14 }}>
        <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: C.textMuted, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>Business size</label>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
          {([["solo","Solo (just me)"],["small","2–5 barbers"],["medium","6–15 barbers"],["large","16+ barbers"]] as [BusinessProfile["size"], string][]).map(([val, lbl]) => (
            <button key={val} onClick={() => setProfileDraft(d => ({ ...d, size: val }))} className="gbf-btn" style={{
              padding: "9px 10px", borderRadius: 8, cursor: "pointer", fontFamily: "inherit", fontSize: 13, fontWeight: 500,
              border: `1.5px solid ${profileDraft.size === val ? C.accent : C.border}`,
              background: profileDraft.size === val ? C.accentLight : C.surface,
              color: profileDraft.size === val ? C.accent : C.textMuted, transition: "all .15s",
            }}>{lbl}</button>
          ))}
        </div>
      </div>

      {section("Contact & Location")}
      {field("Email", profileDraft.email, v => setProfileDraft(d => ({ ...d, email: v })), { type: "email", placeholder: "hello@yourbarbershop.com" })}
      {field("Phone", profileDraft.phone, v => setProfileDraft(d => ({ ...d, phone: v })), { type: "tel", placeholder: "+30 210 000 0000" })}
      {field("Website", profileDraft.website, v => setProfileDraft(d => ({ ...d, website: v })), { type: "url", placeholder: "https://yourbarbershop.com" })}
      {field("Street address", profileDraft.address, v => setProfileDraft(d => ({ ...d, address: v })), { placeholder: "e.g. Kifissou 42" })}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <div>{field("City", profileDraft.city, v => setProfileDraft(d => ({ ...d, city: v })), { placeholder: "Athens" })}</div>
        <div>{field("Postcode", profileDraft.postcode, v => setProfileDraft(d => ({ ...d, postcode: v })), { placeholder: "12345" })}</div>
      </div>
      <div style={{ marginBottom: 14 }}>
        <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: C.textMuted, marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.05em" }}>Country</label>
        <select value={profileDraft.country} onChange={e => setProfileDraft(d => ({ ...d, country: e.target.value }))} style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: `1px solid ${C.border}`, background: C.surface, color: C.text, fontSize: 14, fontFamily: "inherit", outline: "none" }}>
          {[["GR","🇬🇷 Greece"],["GB","🇬🇧 United Kingdom"],["DE","🇩🇪 Germany"],["ES","🇪🇸 Spain"],["FR","🇫🇷 France"],["IT","🇮🇹 Italy"],["US","🇺🇸 United States"],["AU","🇦🇺 Australia"]].map(([v,l]) => <option key={v} value={v}>{l}</option>)}
        </select>
      </div>

      {section("Operations")}
      {field("Operating hours", profileDraft.hours, v => setProfileDraft(d => ({ ...d, hours: v })), { placeholder: "e.g. Tue–Sat · 10:00–20:00" })}
      {field("Team members", profileDraft.barbers, v => setProfileDraft(d => ({ ...d, barbers: v })), { placeholder: "Nikos, Giorgos, Eleni, Petros", hint: "Comma-separated — shown in the dashboard and agent config" })}

      {section("AI Configuration")}
      {field("ElevenLabs Agent ID", profileDraft.agentId, () => {}, { readonly: true, mono: true, hint: "Contact support to change your agent ID" })}

      <button onClick={saveProfile} style={{
        marginTop: 20, width: "100%", padding: "12px", borderRadius: 10,
        background: profileSaved ? C.green : C.accent, color: "#fff",
        fontSize: 14, fontWeight: 700, border: "none", cursor: "pointer",
        fontFamily: "inherit", transition: "background .2s",
      }}>
        {profileSaved ? t("profileSaved") : t("saveProfile")}
      </button>
      <p style={{ fontSize: 12, color: C.textFaint, marginTop: 10, lineHeight: 1.5, textAlign: "center" }}>
        Changes are reflected immediately in the dashboard and AI agent greeting.
      </p>
    </div>
  );

  // ── Section: Appearance ───────────────────────────────────────────────────
  const AppearanceSection = () => (
    <div>
      {section("Color palette & mode")}
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 28, marginBottom: 6, paddingRight: 4 }}>
        <span style={{ fontSize: 10, color: C.textFaint, letterSpacing: "0.06em" }}>☀ LIGHT</span>
        <span style={{ fontSize: 10, color: C.textFaint, letterSpacing: "0.06em" }}>🌙 DARK</span>
      </div>
      {(Object.entries(PALETTES) as [PaletteKey, typeof PALETTES[PaletteKey]][]).map(([key, p]) => {
        const lightActive = settings.palette === key && settings.mode === "light";
        const darkActive  = settings.palette === key && settings.mode === "dark";
        const sysActive   = settings.palette === key && settings.mode === "system";
        return (
          <div key={key} style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 0", borderBottom: `1px solid ${C.borderFaint}` }}>
            <span style={{ flex: 1, fontSize: 14, fontWeight: 500, color: C.text }}>{p.name}</span>
            <button onClick={() => onUpdate({ palette: key, mode: "light" })} title={`${p.name} Light`} className="gbf-btn" style={{ width: 40, height: 40, borderRadius: 10, cursor: "pointer", position: "relative", overflow: "hidden", background: p.light.bg, border: `2.5px solid ${(lightActive || sysActive) ? p.light.accent : "transparent"}`, boxShadow: (lightActive || sysActive) ? `0 0 0 1px ${p.light.accentMid}` : "0 1px 4px rgba(0,0,0,.12)", transition: "all .15s", flexShrink: 0 }}>
              <div style={{ position: "absolute", bottom: 5, right: 5, width: 10, height: 10, borderRadius: "50%", background: p.light.accent }} />
              {(lightActive || sysActive) && <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13 }}>✓</div>}
            </button>
            <button onClick={() => onUpdate({ palette: key, mode: "dark" })} title={`${p.name} Dark`} className="gbf-btn" style={{ width: 40, height: 40, borderRadius: 10, cursor: "pointer", position: "relative", overflow: "hidden", background: p.dark.bg, border: `2.5px solid ${darkActive ? p.dark.accent : "transparent"}`, boxShadow: darkActive ? `0 0 0 1px ${p.dark.accentMid}` : "0 1px 4px rgba(0,0,0,.3)", transition: "all .15s", flexShrink: 0 }}>
              <div style={{ position: "absolute", bottom: 5, right: 5, width: 10, height: 10, borderRadius: "50%", background: p.dark.accent }} />
              {darkActive && <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, color: p.dark.text }}>✓</div>}
            </button>
          </div>
        );
      })}
      {toggle("Follow system", "Auto-switch with OS dark mode", settings.mode === "system", v => onUpdate({ mode: v ? "system" : "light" }))}
    </div>
  );

  // ── Section: Dashboard ────────────────────────────────────────────────────
  const DashboardSection = () => (
    <div>
      {section("Data", "Configure how the dashboard fetches and displays live data")}
      {selectRow("Auto-refresh", settings.autoRefresh, [["off","Off"],["30s","Every 30 s"],["1m","Every minute"],["5m","Every 5 min"]], v => onUpdate({ autoRefresh: v as Settings["autoRefresh"] }))}
      <div style={{ marginTop: 20, background: C.accentLight, borderRadius: 10, padding: "14px 16px", border: `1px solid ${C.border}` }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 4 }}>Data sources</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {[["ElevenLabs Conversational AI","Connected","✓"],["Appointment Ledger","Local data","✓"],["Live call stats","7-day rolling","✓"]].map(([name, note, status]) => (
            <div key={name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 13 }}>
              <span style={{ color: C.textMuted }}>{name}</span>
              <span style={{ color: C.green, fontWeight: 600, fontSize: 12 }}>{status} {note}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ── Section: Display ──────────────────────────────────────────────────────
  const DisplaySection = () => (
    <div>
      {section("Layout", "Adjust how content is sized and spaced")}
      <div style={{ fontSize: 13, color: C.textMuted, marginBottom: 8 }}>Density</div>
      <div style={{ display: "flex", gap: 6, marginBottom: 20 }}>
        {pill("Compact",  settings.density === "compact",     () => onUpdate({ density: "compact" }))}
        {pill("Default",  settings.density === "comfortable", () => onUpdate({ density: "comfortable" }))}
        {pill("Spacious", settings.density === "spacious",    () => onUpdate({ density: "spacious" }))}
      </div>
      {toggle("Show services grid", "Pricing table on the Hub tab", settings.showServices, v => onUpdate({ showServices: v }))}
    </div>
  );

  // ── Section: Account ──────────────────────────────────────────────────────
  const PLANS = [
    { id: "demo",         name: "Demo",         price: "Free",     color: "#9AAABB", features: ["1 AI Agent","50 calls/month","Basic analytics"] },
    { id: "starter",      name: "Starter",      price: "€29/mo",   color: "#3D7A50", features: ["1 AI Agent","500 calls/month","Full analytics","Email support"] },
    { id: "professional", name: "Professional", price: "€79/mo",   color: "#1B5EBE", features: ["3 AI Agents","Unlimited calls","Custom branding","Priority support"] },
    { id: "enterprise",   name: "Enterprise",   price: "Custom",   color: "#6747C7", features: ["Unlimited agents","White-label","Dedicated SLA","Phone support"] },
  ];
  const initials = (profile.ownerName || profile.businessName).slice(0, 2).toUpperCase();

  const AccountSection = () => (
    <div>
      {section("Your account")}
      <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "12px 0", borderBottom: `1px solid ${C.borderFaint}`, marginBottom: 4 }}>
        <div style={{ width: 52, height: 52, borderRadius: "50%", background: C.accent, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 700, flexShrink: 0 }}>{initials}</div>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: C.text }}>{profile.businessName || "My Barbershop"}</div>
          <div style={{ fontSize: 13, color: C.textMuted }}>{profile.email}</div>
        </div>
        <span style={{ marginLeft: "auto", background: C.accentLight, color: C.accent, fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 99, textTransform: "uppercase", flexShrink: 0 }}>Demo</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 2, marginBottom: 8 }}>
        {[["Change email", "Update your login email address"],["Change password","Use a strong, unique password"]].map(([label, desc]) => (
          <button key={label} className="gbf-btn" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", background: "none", border: "none", borderBottom: `1px solid ${C.borderFaint}`, cursor: "pointer", fontFamily: "inherit", width: "100%" }}>
            <div style={{ textAlign: "left" }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: C.text }}>{label}</div>
              <div style={{ fontSize: 12, color: C.textMuted }}>{desc}</div>
            </div>
            <span style={{ color: C.textFaint, fontSize: 16 }}>›</span>
          </button>
        ))}
      </div>

      {section("Subscription")}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {PLANS.map(plan => {
          const current = plan.id === "demo";
          return (
            <div key={plan.id} style={{ border: `1.5px solid ${current ? plan.color : C.border}`, borderRadius: 12, padding: "14px 16px", background: current ? C.accentLight : C.surface, transition: "all .15s" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: plan.color }} />
                  <span style={{ fontSize: 14, fontWeight: 700, color: C.text }}>{plan.name}</span>
                  {current && <span style={{ fontSize: 10, background: plan.color, color: "#fff", padding: "2px 7px", borderRadius: 99, fontWeight: 700 }}>CURRENT</span>}
                </div>
                <span style={{ fontSize: 15, fontWeight: 700, color: plan.color }}>{plan.price}</span>
              </div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {plan.features.map(f => <span key={f} style={{ fontSize: 11, color: C.textMuted, background: C.surfaceAlt, padding: "2px 8px", borderRadius: 99, border: `1px solid ${C.borderFaint}` }}>{f}</span>)}
              </div>
              {!current && (
                <button className="gbf-btn" style={{ marginTop: 10, width: "100%", padding: "8px", borderRadius: 8, background: plan.color, color: "#fff", fontSize: 13, fontWeight: 700, border: "none", cursor: "pointer", fontFamily: "inherit" }}>
                  Upgrade to {plan.name}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  // ── Section: Security ─────────────────────────────────────────────────────
  const SecuritySection = () => (
    <div>
      {section("Authentication")}
      {toggle("Two-factor authentication", "Require a code from your phone on login", profile.twoFactorEnabled, v => onProfileUpdate({ twoFactorEnabled: v }))}
      {profile.twoFactorEnabled && (
        <div style={{ marginTop: 10, background: C.greenLight, borderRadius: 8, padding: "10px 14px", fontSize: 13, color: C.green, fontWeight: 600 }}>
          ✓ 2FA is active. Your account is protected.
        </div>
      )}

      {section("Active sessions", "Devices currently signed in to your account")}
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 14 }}>
        {MOCK_SESSIONS.map(sess => (
          <div key={sess.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 14px", background: C.surfaceAlt, borderRadius: 10, border: `1px solid ${C.borderFaint}` }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{sess.device}</div>
              <div style={{ fontSize: 12, color: C.textMuted, marginTop: 2 }}>{sess.location} · {sess.lastSeen}</div>
            </div>
            {sess.current
              ? <span style={{ fontSize: 11, fontWeight: 700, color: C.green, background: C.greenLight, padding: "3px 9px", borderRadius: 99 }}>Current</span>
              : <button className="gbf-btn" style={{ fontSize: 12, color: C.red, background: C.redLight, border: "none", borderRadius: 8, padding: "5px 10px", cursor: "pointer", fontFamily: "inherit", fontWeight: 600 }}>Revoke</button>
            }
          </div>
        ))}
      </div>
      <button className="gbf-btn" style={{ width: "100%", padding: "10px", borderRadius: 9, background: "transparent", border: `1px solid ${C.border}`, color: C.textMuted, fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>
        Sign out all other devices
      </button>

      {section("API & Integration")}
      <div style={{ background: C.surfaceAlt, border: `1px solid ${C.border}`, borderRadius: 10, padding: "12px 14px", marginBottom: 14 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: C.textMuted, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>ElevenLabs Agent ID</div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <code style={{ flex: 1, fontSize: 12, color: C.textMuted, fontFamily: "monospace", wordBreak: "break-all" }}>
            {profile.agentId.slice(0, 12)}••••••••••••{profile.agentId.slice(-4)}
          </code>
          <button className="gbf-btn" onClick={() => navigator.clipboard?.writeText(profile.agentId)} style={{ fontSize: 11, background: C.accentLight, color: C.accent, border: "none", borderRadius: 6, padding: "5px 9px", cursor: "pointer", fontFamily: "inherit", fontWeight: 600, flexShrink: 0 }}>
            Copy
          </button>
        </div>
      </div>
      <div style={{ fontSize: 12, color: C.textFaint, lineHeight: 1.5, marginBottom: 24 }}>
        Your API credentials are stored server-side and never exposed to the browser. All calls to ElevenLabs are proxied through our secure backend.
      </div>

      {/* Sign out */}
      <button onClick={onLogout} className="gbf-btn" style={{ width: "100%", padding: "11px", borderRadius: 9, background: "transparent", border: `1px solid ${C.border}`, color: C.textMuted, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", marginBottom: 10 }}>
        Sign out
      </button>

      {/* Danger zone */}
      <div style={{ border: `1px solid ${C.red}22`, borderRadius: 12, padding: "16px" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: C.red, marginBottom: 6 }}>Danger zone</div>
        <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 12 }}>
          Permanently delete your account and all data. This action cannot be undone.
        </div>
        <input
          type="text" value={deleteConfirm} onChange={e => setDeleteConfirm(e.target.value)}
          placeholder='Type "DELETE" to confirm'
          style={{ width: "100%", boxSizing: "border-box", padding: "9px 12px", borderRadius: 8, border: `1px solid ${C.border}`, background: C.surface, color: C.text, fontSize: 13, fontFamily: "inherit", outline: "none", marginBottom: 8 }}
        />
        <button disabled={deleteConfirm !== "DELETE"} className="gbf-btn" style={{
          width: "100%", padding: "10px", borderRadius: 8, fontSize: 13, fontWeight: 700, fontFamily: "inherit",
          background: deleteConfirm === "DELETE" ? C.red : C.surfaceAlt,
          color: deleteConfirm === "DELETE" ? "#fff" : C.textFaint,
          border: "none", cursor: deleteConfirm === "DELETE" ? "pointer" : "not-allowed", transition: "all .15s",
        }}>
          Delete account
        </button>
      </div>
    </div>
  );

  // ── Section: Language ─────────────────────────────────────────────────────
  const LanguageSection = () => (
    <div>
      {section(t("interfaceLang"))}
      <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 24 }}>
        {(Object.entries(LANG_META) as [LanguageKey, typeof LANG_META[LanguageKey]][]).map(([key, meta]) => {
          const active = langSettings.lang === key;
          return (
            <button key={key} onClick={() => onLangUpdate({ lang: key })} className="gbf-btn" style={{
              display: "flex", alignItems: "center", gap: 12, padding: "11px 14px",
              borderRadius: 10, border: `1.5px solid ${active ? C.accent : C.border}`,
              background: active ? C.accentLight : C.surface, cursor: "pointer",
              fontFamily: "inherit", textAlign: "left", transition: "all .15s", width: "100%",
            }}>
              <span style={{ fontSize: 22, flexShrink: 0 }}>{meta.flag}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: active ? 700 : 500, color: active ? C.accent : C.text }}>{meta.native}</div>
                <div style={{ fontSize: 12, color: C.textMuted }}>{meta.name}</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                {meta.rtl && <span style={{ fontSize: 10, color: C.textFaint, background: C.surfaceAlt, padding: "2px 6px", borderRadius: 99, border: `1px solid ${C.borderFaint}` }}>RTL</span>}
                {active && <span style={{ color: C.accent, fontSize: 16 }}>✓</span>}
              </div>
            </button>
          );
        })}
      </div>

      {section(t("translateScope"), t("translateScopeHint"))}
      {toggle(t("translateUI"),       "Labels, tabs, buttons, navigation",   langSettings.translateUI,       v => onLangUpdate({ translateUI: v }))}
      {toggle(t("translateServices"), "Service names in appointments",        langSettings.translateServices, v => onLangUpdate({ translateServices: v }))}
      {toggle(t("translateDates"),    "Date & time locale formatting",        langSettings.translateDates,    v => onLangUpdate({ translateDates: v }))}

      <div style={{ marginTop: 20, background: C.accentLight, borderRadius: 10, padding: "14px 16px", border: `1px solid ${C.border}` }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: C.textFaint, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>{t("previewLabel")}</div>
        <div style={{ fontSize: 14, color: C.text, fontWeight: 600 }}>{t("aiDashboard")}</div>
        <div style={{ fontSize: 13, color: C.textMuted, marginTop: 4 }}>{t("hubFull")} · {t("ledgerFull")}</div>
        <div style={{ fontSize: 12, color: C.textFaint, marginTop: 4 }}>{t("confirmed")} · {t("pending")} · {t("cancelled")}</div>
      </div>
    </div>
  );

  const renderSection = () => {
    switch (activeSection) {
      case "profile":    return <ProfileSection />;
      case "appearance": return <AppearanceSection />;
      case "dashboard":  return <DashboardSection />;
      case "display":    return <DisplaySection />;
      case "language":   return <LanguageSection />;
      case "account":    return <AccountSection />;
      case "security":   return <SecuritySection />;
    }
  };

  const activeNav = NAV_ITEMS.find(n => n.id === activeSection);

  return (
    <>
      {/* Backdrop — above ElevenLabs widget (z 200) */}
      <div onClick={onClose} style={{ position: "fixed", inset: 0, background: C.overlay, zIndex: 10000, backdropFilter: "blur(3px)", WebkitBackdropFilter: "blur(3px)" }} />

      <div className="gbf-settings-drawer" style={{ zIndex: 10001, background: C.surface, borderLeft: `1px solid ${C.border}`, boxShadow: "-12px 0 48px rgba(0,0,0,.2)", display: "flex", flexDirection: "column" }}>

        {/* Drag handle (mobile) */}
        <div className="gbf-settings-handle" style={{ justifyContent: "center", padding: "10px 0 2px" }}>
          <div style={{ width: 40, height: 4, borderRadius: 99, background: C.border }} />
        </div>

        {/* Header */}
        <div style={{ padding: "14px 20px", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: 10, position: "sticky", top: 0, background: C.surface, zIndex: 1, flexShrink: 0 }}>
          {/* Mobile back button */}
          <button className={`gbf-btn gbf-mob-back`} onClick={handleBack} style={{ display: mobContent ? undefined : "none", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", color: C.accent, fontSize: 14, fontWeight: 600, padding: "4px 0", fontFamily: "inherit", flexShrink: 0 }}>
            {t("back")}
          </button>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: C.text }}>{mobContent ? t(`sNav${activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}`) : t("settingsTitle")}</div>
            <div style={{ fontSize: 12, color: C.textMuted, marginTop: 1 }}>{mobContent ? t(`sNav${activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}Desc`) : t("settingsSubtitle")}</div>
          </div>
          <button onClick={onClose} className="gbf-btn" style={{ background: C.surfaceAlt, border: `1px solid ${C.border}`, borderRadius: 9, width: 34, height: 34, cursor: "pointer", fontSize: 19, color: C.textMuted, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>×</button>
        </div>

        {/* Body */}
        <div className="gbf-settings-body">
          {/* Nav sidebar */}
          <nav className={`gbf-settings-nav${mobContent ? " gbf-mob-hide" : ""}`} style={{ borderRight: `1px solid ${C.border}`, background: C.surfaceAlt }}>
            {NAV_ITEMS.map(item => {
              const active = activeSection === item.id;
              return (
                <button key={item.id} onClick={() => handleNavClick(item.id)} className="gbf-btn" style={{
                  display: "flex", alignItems: "center", gap: 10, width: "100%",
                  padding: "11px 16px", background: active ? C.accentLight : "transparent",
                  border: "none", borderLeft: `3px solid ${active ? C.accent : "transparent"}`,
                  cursor: "pointer", fontFamily: "inherit", textAlign: "left",
                  transition: "all .12s",
                }}>
                  <span style={{ fontSize: 17, flexShrink: 0 }}>{item.icon}</span>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: active ? 700 : 500, color: active ? C.accent : C.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{t(`sNav${item.id.charAt(0).toUpperCase() + item.id.slice(1)}`)}</div>
                  </div>
                  {/* Mobile chevron */}
                  <span className="gbf-mob-back" style={{ marginLeft: "auto", color: C.textFaint, fontSize: 14 }}>›</span>
                </button>
              );
            })}
          </nav>

          {/* Content area */}
          <div className={`gbf-settings-main${!mobContent ? " gbf-mob-hide" : ""}`}>
            <div style={{ paddingTop: 4 }}>
              {renderSection()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ── GearIcon ──────────────────────────────────────────────────────────────────
function GearIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>
  );
}

// ── StatCard ──────────────────────────────────────────────────────────────────
function StatCard({ value, label, sub, C, density, loading, onClick, tip }: {
  value: string | number; label: string; sub?: string;
  C: Colors; density: DensityKey; loading?: boolean;
  onClick?: () => void; tip?: string;
}) {
  const [hov, setHov] = useState(false);
  const pad = DENSITY_PAD[density];
  const isClickable = !!onClick;
  if (loading) return <SkeletonCard />;

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="gbf-lift"
      style={{
        background: C.surface,
        border: `1px solid ${hov && isClickable ? C.accent : C.border}`,
        borderRadius: 14, padding: pad.card, position: "relative", overflow: "hidden",
        cursor: isClickable ? "pointer" : "default",
      }}
    >
      {/* Clickable indicator arrow */}
      {isClickable && (
        <div style={{ position: "absolute", top: 10, right: 12, fontSize: 13, color: C.accent, opacity: hov ? 0.9 : 0.3, transition: "opacity .18s, transform .18s", transform: hov ? "translateX(2px)" : "none" }}>→</div>
      )}
      {/* Accent bar at top */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: hov && isClickable ? C.accent : "transparent", borderRadius: "14px 14px 0 0", transition: "background .18s" }} />
      <div key={String(value)} className="gbf-num-in" style={{ fontSize: 28, fontWeight: 800, color: C.accent, letterSpacing: "-0.5px", lineHeight: 1.1 }}>{value}</div>
      <div style={{ fontSize: 13, fontWeight: 600, color: C.text, marginTop: 4 }}>{label}</div>
      {sub && <div style={{ fontSize: 12, color: C.textMuted, marginTop: 2 }}>{sub}</div>}
      {tip && hov && (
        <div style={{ position: "absolute", bottom: 8, right: 10, fontSize: 10, color: C.textFaint, fontStyle: "italic" }}>{tip}</div>
      )}
    </div>
  );
}

// ── Badge ─────────────────────────────────────────────────────────────────────
function Badge({ status, C }: { status: string; C: Colors }) {
  const cfg: Record<string, { label: string; bg: string; color: string }> = {
    confirmed:     { label: "Confirmed",   bg: C.greenLight, color: C.green },
    "in-progress": { label: "In Progress", bg: C.amberLight, color: C.amber },
    pending:       { label: "Pending",     bg: C.borderFaint, color: C.textMuted },
    cancelled:     { label: "Cancelled",   bg: C.redLight,   color: C.red },
  };
  const c = cfg[status] ?? cfg.pending;
  return <span style={{ background: c.bg, color: c.color, fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 99, textTransform: "uppercase", letterSpacing: "0.05em", whiteSpace: "nowrap" }}>{c.label}</span>;
}

// ── HubTab ────────────────────────────────────────────────────────────────────
function HubTab({ agent, C, density, showServices, loading, profile, conversations, aiBookings, liveCall, onTabChange, onConvSelect }: {
  agent: AgentData | null; C: Colors; density: DensityKey;
  showServices: boolean; loading: boolean; profile: BusinessProfile;
  conversations: ConversationSummary[]; aiBookings: AiBooking[]; liveCall: boolean;
  onTabChange: (tab: "hub" | "ledger" | "analytics") => void;
  onConvSelect: (convId: string) => void;
}) {
  const t = useT();
  const languages = agent?.languages ?? ["el", "en", "es", "pt", "fr", "de", "ar"];

  const sevenDaysAgo    = Math.floor(Date.now() / 1000) - 7 * 86400;
  const real7dCalls     = conversations.filter(c => c.start_time_unix_secs > sevenDaysAgo).length;
  const aiTodayBookings = aiBookings.filter(b => b.date === d0 && b.call_status !== "error");
  const mockTodayAppts  = APPOINTMENTS.filter(a => a.date === d0 && a.status !== "cancelled");
  const totalTodayCount = aiTodayBookings.length > 0 ? aiTodayBookings.length : mockTodayAppts.length;
  const revenue         = mockTodayAppts.reduce((s, a) => s + a.price, 0);
  const callCount       = real7dCalls > 0 ? real7dCalls : (agent?.last_7_day_call_count ?? 0);
  const pad             = DENSITY_PAD[density];
  const barbers         = profile.barbers.split(",").map(b => b.trim()).filter(Boolean);
  const agentName       = agent?.name?.split(/\s*[\u2014—]\s*/)[0] ?? "Kostas";

  // Categorise each booking for the feed
  type FeedEntry = AiBooking & { feedType: string; feedColor: string; feedBg: string };
  const feedEntries: FeedEntry[] = aiBookings.map(b => {
    const sum = b.summary.toLowerCase();
    let feedType = "CALL"; let feedColor = C.accent; let feedBg = C.accentLight;
    if (b.call_status === "in-progress" || b.call_status === "processing") {
      feedType = "LIVE";    feedColor = C.red;      feedBg = C.redLight;
    } else if (b.call_status === "error") {
      feedType = "MISSED";  feedColor = C.textFaint; feedBg = C.borderFaint;
    } else if (/\bcancel/i.test(sum)) {
      feedType = "CANCEL";  feedColor = C.amber;    feedBg = C.amberLight;
    } else if (/reschedul/i.test(sum)) {
      feedType = "RESCHEDULE"; feedColor = C.accentMid; feedBg = C.accentLight;
    } else if (b.service && b.service !== "—") {
      feedType = "BOOKED";  feedColor = C.green;    feedBg = C.greenLight;
    }
    return { ...b, feedType, feedColor, feedBg };
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: pad.gap }}>

      {/* ── Stat cards ── */}
      <div className="gbf-stat-grid gbf-stagger">
        <StatCard value={languages.length} label={t("languages")}     sub={t("autoDetected")}  C={C} density={density} loading={loading} />
        <StatCard value={totalTodayCount}  label={t("bookingsToday")} sub={liveCall ? "📞 Live call now" : t("viaAI")} C={C} density={density} loading={loading} onClick={() => onTabChange("ledger")} tip="Open Ledger" />
        <StatCard value={`€${revenue}`}    label={t("revenueToday")}  sub={aiTodayBookings.length > 0 ? t("fromAICalls") : t("demoData")} C={C} density={density} loading={loading} onClick={() => onTabChange("analytics")} tip="View Analytics" />
        <StatCard value={callCount}        label={t("callsWeek")}     sub={t("realTime")}       C={C} density={density} loading={loading} onClick={() => onTabChange("analytics")} tip="View Analytics" />
      </div>

      {/* ── Main two-col: Terminal + Live Feed ── */}
      <div style={{ display: "grid", gridTemplateColumns: "340px 1fr", gap: pad.gap, alignItems: "start" }} className="gbf-hub-main">

        {/* ── INTERACTION TERMINAL ── */}
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 20, overflow: "hidden", display: "flex", flexDirection: "column" }}>
          {/* Terminal header */}
          <div style={{ padding: "14px 20px", borderBottom: `1px solid ${C.borderFaint}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.12em", color: C.textFaint, textTransform: "uppercase" }}>Interaction Terminal</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 5, background: liveCall ? C.redLight : C.greenLight, padding: "4px 10px", borderRadius: 99 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: liveCall ? C.red : C.green, display: "inline-block", animation: "gbf-pulse 1.5s infinite" }} />
              <span style={{ fontSize: 10, fontWeight: 800, color: liveCall ? C.red : C.green, letterSpacing: "0.08em" }}>{liveCall ? "ON CALL" : "ALWAYS ACTIVE"}</span>
            </div>
          </div>

          {/* Agent visual */}
          <div style={{ padding: "28px 20px 20px", display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
            {/* Outer ring + avatar */}
            <div style={{ position: "relative" }}>
              <div className={liveCall ? "" : "gbf-ring-idle"} style={{ width: 120, height: 120, borderRadius: "50%", border: `2px solid ${C.borderFaint}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: 96, height: 96, borderRadius: "50%", border: `2px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ width: 72, height: 72, borderRadius: "50%", background: liveCall ? C.redLight : C.accentLight, border: `2px solid ${liveCall ? C.red + "44" : C.accentMid + "44"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, animation: liveCall ? "gbf-pulse 2s infinite" : "none", transition: "background .3s, border-color .3s" }}>
                    ✂️
                  </div>
                </div>
              </div>
              {/* Status dot */}
              <div style={{ position: "absolute", bottom: 6, right: 6, width: 14, height: 14, borderRadius: "50%", background: liveCall ? C.red : C.green, border: `2px solid ${C.surface}`, animation: "gbf-pulse 2s infinite" }} />
            </div>

            {/* Agent name */}
            <div style={{ textAlign: "center" }}>
              {loading
                ? <div className="gbf-skeleton" style={{ height: 20, width: 90, margin: "0 auto" }} />
                : <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 600, color: C.text }}>{agentName}</div>
              }
              <div style={{ fontSize: 12, color: C.textMuted, marginTop: 3 }}>{t("aiFrontDesk")}</div>
            </div>

            {/* Live status line */}
            <div style={{ fontSize: 12, color: liveCall ? C.red : C.textFaint, fontStyle: "italic", textAlign: "center", minHeight: 18, lineHeight: 1.4 }}>
              {liveCall
                ? "Call in progress — updating…"
                : "Ready to handle the next appointment"}
            </div>

            {/* Call prompt */}
            <div style={{ width: "100%", background: C.accentLight, border: `1px dashed ${C.accentMid}`, borderRadius: 12, padding: "12px 16px", textAlign: "center" }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.accent }}>{t("tapCall")}</div>
              <div style={{ fontSize: 11, color: C.accentMid, marginTop: 3 }}>{t("anyLang")} — tap ✂️ button ↘</div>
            </div>

            {/* Languages */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5, justifyContent: "center" }}>
              {languages.map(lang => (
                <span key={lang} style={{ background: C.surfaceAlt, color: C.textMuted, fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 99, border: `1px solid ${C.borderFaint}` }}>
                  {LANG_LABELS[lang] ?? lang.toUpperCase()}
                </span>
              ))}
            </div>
          </div>

          {/* Agent details */}
          <div style={{ padding: "0 20px 6px", borderTop: `1px solid ${C.borderFaint}` }}>
            {[
              [t("business"), profile.businessName || "Greek Barber Festival"],
              [t("hours"),    profile.hours || "Tue–Sat · 10:00–20:00"],
              [t("llm"),      agent?.llm ?? "gemini-2.5-flash"],
            ].map(([label, value]) => (
              <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 0", borderBottom: `1px solid ${C.borderFaint}` }}>
                <span style={{ fontSize: 12, color: C.textMuted }}>{label}</span>
                <span style={{ fontSize: 12, color: C.text, fontWeight: 600, textAlign: "right", maxWidth: "58%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{value}</span>
              </div>
            ))}
          </div>

          {/* Team */}
          <div style={{ padding: "14px 20px 20px" }}>
            <div style={{ fontSize: 10, fontWeight: 800, color: C.textFaint, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>{t("team")}</div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {(barbers.length > 0 ? barbers : ["Nikos","Giorgos","Eleni","Petros"]).map(b => (
                <span key={b} style={{ background: C.accentLight, color: C.accent, fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 99 }}>{b}</span>
              ))}
            </div>
          </div>
        </div>

        {/* ── LIVE ACTION FEED ── */}
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 20, overflow: "hidden", display: "flex", flexDirection: "column" }}>
          {/* Feed header */}
          <div style={{ padding: "14px 20px", borderBottom: `1px solid ${C.borderFaint}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.12em", color: C.textFaint, textTransform: "uppercase" }}>Live Action Feed</div>
              <div style={{ fontSize: 11, color: C.textFaint, marginTop: 2 }}>Real calls · updates every 10s</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              {liveCall && (
                <div style={{ display: "flex", alignItems: "center", gap: 5, background: C.redLight, padding: "4px 10px", borderRadius: 99, marginRight: 6 }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.red, display: "inline-block", animation: "gbf-pulse 0.8s infinite" }} />
                  <span style={{ fontSize: 10, fontWeight: 800, color: C.red, letterSpacing: "0.06em" }}>LIVE</span>
                </div>
              )}
              <span style={{ fontSize: 11, color: C.textFaint }}>{aiBookings.length} calls</span>
            </div>
          </div>

          {/* Feed entries */}
          <div className="gbf-stagger" style={{ overflowY: "auto", maxHeight: 520, padding: "12px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
            {feedEntries.length === 0 ? (
              <div style={{ padding: "48px 24px", textAlign: "center" }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>📞</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 6 }}>No calls yet</div>
                <div style={{ fontSize: 13, color: C.textMuted, lineHeight: 1.5 }}>
                  Use the ✂️ widget (bottom-right) to make a call.<br />It will appear here in real time.
                </div>
              </div>
            ) : feedEntries.map(entry => {
              const isLiveEntry = entry.feedType === "LIVE";
              const rawQuote = entry.summary
                ? entry.summary.replace(/^The (conversation|call|client|user)/i, "").replace(/^[\s,\.]+/, "").trim()
                : "";
              const firstSentence = rawQuote.split(/[.!?]/)[0]?.trim() ?? "";
              const quote = firstSentence.length > 20 ? firstSentence : rawQuote.slice(0, 120);
              const tags: string[] = [];
              if (entry.service && entry.service !== "—") tags.push(entry.service);
              if (entry.barber && entry.barber !== "TBD") tags.push(entry.barber);
              if (entry.date) tags.push(`${entry.date}${entry.time ? " · " + entry.time : ""}`);

              return (
                <div key={entry.conversation_id}
                  className="gbf-feed-card"
                  onClick={() => onConvSelect(entry.conversation_id)}
                  title="Click to view full transcript in Ledger"
                  style={{ border: `1px solid ${isLiveEntry ? entry.feedColor + "55" : C.borderFaint}`, borderRadius: 14, background: isLiveEntry ? entry.feedBg : C.surfaceAlt, overflow: "hidden" }}>

                  {/* Card header */}
                  <div style={{ padding: "10px 14px 8px", display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 9, fontWeight: 900, letterSpacing: "0.1em", color: entry.feedColor, background: entry.feedBg, border: `1px solid ${entry.feedColor}44`, padding: "3px 8px", borderRadius: 99, flexShrink: 0, textTransform: "uppercase" }}>
                      {isLiveEntry && <span style={{ display: "inline-block", width: 5, height: 5, borderRadius: "50%", background: entry.feedColor, marginRight: 4, animation: "gbf-pulse 0.8s infinite", verticalAlign: "middle" }} />}
                      {entry.feedType}
                    </span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: C.text, flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{entry.client_name}</span>
                    <span style={{ fontSize: 11, color: C.textFaint, flexShrink: 0 }}>{timeAgo(entry.start_time_unix_secs)}</span>
                  </div>

                  {/* Quote */}
                  {quote && (
                    <div style={{ padding: "0 14px 10px" }}>
                      <div style={{ fontSize: 12, color: C.textMuted, lineHeight: 1.5, fontStyle: "italic" }}>
                        &ldquo;{quote}{quote.length < rawQuote.length ? "…" : ""}&rdquo;
                      </div>
                    </div>
                  )}

                  {/* Tag pills */}
                  {tags.length > 0 && (
                    <div style={{ padding: "8px 14px 10px", borderTop: `1px solid ${C.borderFaint}`, display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center" }}>
                      <span style={{ fontSize: 10, fontWeight: 700, color: C.textFaint, background: C.borderFaint, padding: "3px 8px", borderRadius: 99 }}>Client</span>
                      {tags.map((tag, i) => (
                        <span key={i} style={{ fontSize: 10, fontWeight: 600, color: C.accent, background: C.accentLight, padding: "3px 9px", borderRadius: 99 }}>{tag}</span>
                      ))}
                      {entry.duration_secs > 0 && (
                        <span style={{ fontSize: 10, color: C.textFaint, marginLeft: "auto" }}>{fmtDuration(entry.duration_secs)}</span>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Feed footer */}
          {feedEntries.length > 0 && (
            <div style={{ padding: "10px 20px", borderTop: `1px solid ${C.borderFaint}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 11, color: C.textFaint }}>Showing {feedEntries.length} most recent calls</span>
              <button onClick={() => onTabChange("ledger")} className="gbf-btn" style={{ fontSize: 11, color: C.accent, fontWeight: 700, background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 4, padding: "4px 0", transition: "opacity .15s" }}>
                View full history in Ledger →
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── Features strip ── */}
      <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: pad.card, display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
        {([["🗣️", t("feat1")],["📅", t("feat2")],["💈", t("feat3")]] as [string,string][]).map(([icon, text]) => (
          <div key={text} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
            <span style={{ fontSize: 18, flexShrink: 0 }}>{icon}</span>
            <span style={{ fontSize: 13, color: C.text, lineHeight: 1.45 }}>{text}</span>
          </div>
        ))}
      </div>

      {/* ── Services ── */}
      {showServices && (
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: pad.card }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 600, color: C.text, marginBottom: 14 }}>{t("servicesTitle")}</div>
          <div className="gbf-services-grid gbf-stagger">
            {([[t("svcHaircut"),"€15"],[t("svcBeard"),"€12"],[t("svcShave"),"€18"],[t("svcFull"),"€40"],[t("svcHead"),"€15"],[t("svcScalp"),"€10"],[t("svcBrow"),"€8"],[t("svcColour"),"€20"]] as [string,string][]).map(([name, price]) => (
              <div key={name} className="gbf-lift-sm gbf-svc-item" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", background: C.surfaceAlt, borderRadius: 10, border: `1px solid ${C.borderFaint}` }}>
                <span style={{ fontSize: 13, color: C.text, fontWeight: 500 }}>{name}</span>
                <span style={{ fontSize: 14, color: C.accent, fontWeight: 700, marginLeft: 8 }}>{price}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── LedgerTab ─────────────────────────────────────────────────────────────────
function LedgerTab({ C, density, aiBookings, liveCall, selectedConvId, onConvSelected }: {
  C: Colors; density: DensityKey; aiBookings: AiBooking[]; liveCall: boolean;
  selectedConvId?: string | null; onConvSelected?: () => void;
}) {
  const t = useT();
  const [filterDate,   setFilterDate]   = useState("all");
  const [filterBarber, setFilterBarber] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [viewMode,     setViewMode]     = useState<"appointments" | "calls" | "all">("all");
  const [expandedCall, setExpandedCall] = useState<string | null>(null);
  const [transcripts,  setTranscripts]  = useState<Record<string, ConversationDetail>>({});
  const [loadingCallId,setLoadingCallId]= useState<string | null>(null);
  const transcriptsRef = useRef(transcripts);
  useEffect(() => { transcriptsRef.current = transcripts; }, [transcripts]);
  const pad = DENSITY_PAD[density];

  // ── Fetch transcript (no toggle behaviour) ────────────────────────────────
  const fetchTranscript = useCallback(async (id: string, summary?: string) => {
    if (transcriptsRef.current[id]) return;
    if (id.startsWith("demo_")) {
      setTranscripts(prev => ({ ...prev, [id]: { conversation_id: id, status: "done", transcript: DEMO_TRANSCRIPTS[id] ?? [], metadata: { start_time_unix_secs: 0, call_duration_secs: 0 }, analysis: { transcript_summary: summary ?? "" } } }));
      return;
    }
    setLoadingCallId(id);
    try {
      const data: ConversationDetail = await fetch(`/api/elevenlabs/conversation/${id}`).then(r => r.json());
      setTranscripts(prev => ({ ...prev, [id]: data }));
    } catch {}
    finally { setLoadingCallId(null); }
  }, []);

  // ── React whenever parent selects a conversation from the Hub feed ────────
  useEffect(() => {
    if (!selectedConvId) return;
    setExpandedCall(selectedConvId);
    fetchTranscript(selectedConvId);
    const timer = setTimeout(() => {
      const el = document.getElementById(`ledger-entry-${selectedConvId}`);
      if (el) {
        const top = el.getBoundingClientRect().top + window.pageYOffset - 90;
        window.scrollTo({ top, behavior: "smooth" });
        el.style.outline = `2.5px solid ${C.accent}`;
        el.style.outlineOffset = "2px";
        el.style.borderRadius = "14px";
        setTimeout(() => { el.style.outline = ""; el.style.outlineOffset = ""; }, 2500);
      }
      onConvSelected?.();
    }, 300);
    return () => clearTimeout(timer);
  }, [selectedConvId]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── User-click toggle: expand / collapse ─────────────────────────────────
  async function loadCallTranscript(id: string, summary?: string) {
    if (expandedCall === id) { setExpandedCall(null); return; }
    setExpandedCall(id);
    await fetchTranscript(id, summary);
  }

  // ── Merge demo appointments + AI bookings ──────────────────────────────────
  interface UnifiedEntry {
    id: string; name: string; service: string; barber: string;
    date: string; time: string; price: number; status: string;
    source: "demo" | "ai-call";
    conversation_id?: string; summary?: string; start_time_unix_secs?: number;
    call_status?: string; message_count?: number;
  }

  const demoEntries: UnifiedEntry[] = APPOINTMENTS.map(a => ({ ...a, id: String(a.id), source: "demo" }));
  const aiEntries: UnifiedEntry[]   = aiBookings.map(b => ({
    id:           b.conversation_id,
    name:         b.client_name,
    service:      b.service,
    barber:       b.barber,
    date:         b.date,
    time:         b.time,
    price:        b.price,
    status:       b.status,
    source:       "ai-call",
    conversation_id:      b.conversation_id,
    summary:              b.summary,
    start_time_unix_secs: b.start_time_unix_secs,
    call_status:          b.call_status,
    message_count:        b.message_count,
  }));

  // Combine — AI entries first (most recent first), then demo
  const aiSorted = [...aiEntries].sort((a, b) => (b.start_time_unix_secs ?? 0) - (a.start_time_unix_secs ?? 0));
  const allEntries: UnifiedEntry[] = viewMode === "appointments"
    ? demoEntries
    : viewMode === "calls"
      ? aiSorted
      : [...aiSorted, ...demoEntries];

  // Dates for filter: combine both sources
  const dates = Array.from(new Set(allEntries.map(a => a.date)));

  const filtered = allEntries.filter(a =>
    (filterDate   === "all" || a.date   === filterDate) &&
    (filterBarber === "all" || a.barber === filterBarber) &&
    (filterStatus === "all" || a.status === filterStatus)
  );
  const active  = filtered.filter(a => a.status !== "cancelled" && a.call_status !== "error");
  const revenue = active.reduce((s, a) => s + a.price, 0);
  const fillPct = Math.round((active.filter(a => a.date === d0).length / 20) * 100);

  const selectStyle: React.CSSProperties = { fontSize: 13, color: C.text, background: C.surfaceAlt, border: `1px solid ${C.border}`, borderRadius: 8, padding: "8px 10px", cursor: "pointer", outline: "none", fontFamily: "inherit", minHeight: 40, width: "100%" };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: pad.gap }}>

      {/* Live call alert in ledger */}
      {liveCall && (
        <div style={{ background: C.amberLight, border: `1px solid ${C.amber}55`, borderRadius: 12, padding: "12px 16px", display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: C.amber, display: "inline-block", animation: "gbf-pulse 1s infinite", flexShrink: 0 }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: C.amber }}>Live AI call in progress</span>
            <span style={{ fontSize: 12, color: C.textMuted, marginLeft: 8 }}>Entry will appear below when the call ends.</span>
          </div>
        </div>
      )}

      <div className="gbf-stat-grid gbf-stagger">
        <StatCard value={`${fillPct}%`}  label={t("occupancy")}     sub={t("todaySlots")}     C={C} density={density} />
        <StatCard value={new Set(active.map(a => a.name)).size} label={t("clients")} sub={t("inView")} C={C} density={density} />
        <StatCard value={`€${revenue}`}  label={t("revenue")}       sub={t("confirmedOnly")}  C={C} density={density} />
        <StatCard value={active.length}  label={t("appointments")}  sub={`${aiBookings.length} AI · ${APPOINTMENTS.length} demo`} C={C} density={density} />
      </div>

      {/* View toggle + filters */}
      <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: "14px 16px" }}>
        {/* View mode pills */}
        <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
          {([["all", "All entries"], ["calls", "📞 AI Calls"], ["appointments", "📅 Demo appointments"]] as [typeof viewMode, string][]).map(([mode, label]) => (
            <button key={mode} onClick={() => setViewMode(mode)} className="gbf-btn" style={{
              padding: "6px 14px", borderRadius: 99, border: `1.5px solid ${viewMode === mode ? C.accent : C.border}`,
              background: viewMode === mode ? C.accentLight : C.surfaceAlt, color: viewMode === mode ? C.accent : C.textMuted,
              fontSize: 12, fontWeight: viewMode === mode ? 700 : 500, cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap",
            }}>{label}</button>
          ))}
        </div>
        <div style={{ fontSize: 12, fontWeight: 700, color: C.textFaint, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>{t("filterAppts")}</div>
        <div className="gbf-filter-selects">
          <select value={filterDate}   onChange={e => setFilterDate(e.target.value)}   style={selectStyle}>
            {[["all", t("allDates")], ...dates.map(d => [d, d] as [string,string])].map(([v,l]) => <option key={v} value={v}>{l}</option>)}
          </select>
          <select value={filterBarber} onChange={e => setFilterBarber(e.target.value)} style={selectStyle}>
            {[["all", t("allBarbers")],["Nikos","Nikos"],["Giorgos","Giorgos"],["Eleni","Eleni"],["Petros","Petros"],["TBD","TBD"]].map(([v,l]) => <option key={v} value={v}>{l}</option>)}
          </select>
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} style={selectStyle}>
            {[["all", t("allStatuses")],["confirmed", t("confirmed")],["in-progress", t("inProgress")],["pending", t("pending")],["cancelled", t("cancelled")]].map(([v,l]) => <option key={v} value={v}>{l}</option>)}
          </select>
        </div>
        <div style={{ marginTop: 10, fontSize: 12, color: C.textMuted }}>{filtered.length} {t("apptsShown")} {aiBookings.length > 0 && `· ${aiBookings.length} real AI calls`}</div>
      </div>

      {/* Desktop table */}
      <div className="gbf-ledger-table" style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 600 }}>
            <thead><tr style={{ background: C.surfaceAlt }}>
              {["","Client","Service","Barber","Date","Time","Price","Status"].map(h => (
                <th key={h} style={{ padding: "10px 16px", fontSize: 11, fontWeight: 700, color: C.textFaint, textAlign: "left", textTransform: "uppercase", letterSpacing: "0.08em", borderBottom: `1px solid ${C.border}`, whiteSpace: "nowrap" }}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {filtered.length === 0
                ? <tr><td colSpan={8} style={{ padding: 40, textAlign: "center", color: C.textMuted, fontSize: 14 }}>No entries match the filters.</td></tr>
                : filtered.map((a, i) => {
                  const isAI     = a.source === "ai-call";
                  const isLiveRow = a.call_status === "in-progress" || a.call_status === "processing";
                  const isOpen   = expandedCall === a.id;
                  const detail   = a.conversation_id ? transcripts[a.conversation_id] : undefined;
                  return (
                    <>
                      <tr key={a.id} id={`ledger-entry-${a.id}`} className={`gbf-tr-hover${isAI ? " gbf-ai-row" : ""}`} style={{ background: isLiveRow ? C.amberLight : (i % 2 === 0 ? C.surface : C.surfaceAlt), cursor: isAI ? "pointer" : "default" }}
                        onClick={() => isAI && a.conversation_id ? loadCallTranscript(a.conversation_id, a.summary) : undefined}>
                        <td style={{ padding: pad.row, borderBottom: `1px solid ${C.borderFaint}`, width: 28 }}>
                          {isAI && <span title="Booked via AI call" style={{ fontSize: 13 }}>📞</span>}
                        </td>
                        <td style={{ padding: pad.row, borderBottom: `1px solid ${C.borderFaint}` }}>
                          <div style={{ fontSize: 14, fontWeight: 600, color: C.text }}>{a.name}</div>
                          {isAI && a.start_time_unix_secs && <div style={{ fontSize: 10, color: C.textFaint }}>{timeAgo(a.start_time_unix_secs)}</div>}
                        </td>
                        <td style={{ padding: pad.row, fontSize: 13, color: C.textMuted, borderBottom: `1px solid ${C.borderFaint}`, whiteSpace: "nowrap" }}>{a.service}</td>
                        <td style={{ padding: pad.row, borderBottom: `1px solid ${C.borderFaint}` }}><span style={{ background: C.accentLight, color: C.accent, fontSize: 12, fontWeight: 600, padding: "3px 10px", borderRadius: 99 }}>{a.barber}</span></td>
                        <td style={{ padding: pad.row, fontSize: 13, color: C.text, borderBottom: `1px solid ${C.borderFaint}`, whiteSpace: "nowrap" }}>{a.date}</td>
                        <td style={{ padding: pad.row, fontSize: 13, color: C.text, borderBottom: `1px solid ${C.borderFaint}` }}>{a.time}</td>
                        <td style={{ padding: pad.row, fontSize: 13, fontWeight: 700, color: a.price > 0 ? C.accent : C.textFaint, borderBottom: `1px solid ${C.borderFaint}` }}>{a.price > 0 ? `€${a.price}` : "—"}</td>
                        <td style={{ padding: pad.row, borderBottom: `1px solid ${C.borderFaint}` }}>
                          <div style={{ display: "flex", gap: 5, alignItems: "center", flexWrap: "wrap" }}>
                            <Badge status={a.status} C={C} />
                            {isAI && <span style={{ fontSize: 10, background: C.accentLight, color: C.accent, padding: "2px 7px", borderRadius: 99, fontWeight: 700 }}>AI</span>}
                          </div>
                        </td>
                      </tr>
                      {/* Expanded transcript row */}
                      {isOpen && isAI && (
                        <tr key={`${a.id}-detail`}>
                          <td colSpan={8} style={{ background: C.surfaceAlt, borderBottom: `1px solid ${C.border}`, padding: "12px 20px" }}>
                            {loadingCallId === a.conversation_id ? (
                              <div style={{ display: "flex", gap: 10 }}>
                                <div className="gbf-skeleton" style={{ height: 12, width: "30%" }} />
                                <div className="gbf-skeleton" style={{ height: 12, width: "20%" }} />
                              </div>
                            ) : detail ? (
                              <div>
                                {detail.analysis?.transcript_summary && (
                                  <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 10, lineHeight: 1.5 }}>
                                    <span style={{ fontWeight: 700, color: C.accent }}>Summary: </span>
                                    {detail.analysis.transcript_summary}
                                  </div>
                                )}
                                <div style={{ display: "flex", flexDirection: "column", gap: 6, maxHeight: 240, overflowY: "auto" }}>
                                  {(detail.transcript ?? []).map((msg, mi) => (
                                    <div key={mi} style={{ display: "flex", gap: 8 }}>
                                      <span style={{ fontSize: 10, fontWeight: 700, color: msg.role === "agent" ? C.accent : C.textMuted, minWidth: 36, flexShrink: 0, paddingTop: 1, textTransform: "uppercase" }}>{msg.role === "agent" ? "AI" : "User"}</span>
                                      <span style={{ fontSize: 12, color: C.text, lineHeight: 1.45 }}>{msg.message}</span>
                                    </div>
                                  ))}
                                  {(detail.transcript ?? []).length === 0 && <span style={{ fontSize: 12, color: C.textFaint }}>No transcript yet.</span>}
                                </div>
                              </div>
                            ) : <span style={{ fontSize: 12, color: C.red }}>Failed to load.</span>}
                          </td>
                        </tr>
                      )}
                    </>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile cards */}
      <div className="gbf-ledger-cards">
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "48px 24px", color: C.textMuted }}>
            <div style={{ fontSize: 32, marginBottom: 10 }}>📭</div>
            <div style={{ fontSize: 15, fontWeight: 600, color: C.text }}>{t("noAppts")}</div>
            <div style={{ fontSize: 13, marginTop: 4 }}>{t("adjustFilters")}</div>
          </div>
        ) : filtered.map(a => {
          const isAI     = a.source === "ai-call";
          const isLiveRow= a.call_status === "in-progress" || a.call_status === "processing";
          const isOpen   = expandedCall === a.id;
          const detail   = a.conversation_id ? transcripts[a.conversation_id] : undefined;
          return (
            <div key={a.id} id={`ledger-entry-${a.id}`}>
              <div className={`gbf-lift-sm${isAI ? " gbf-card-pressable" : ""}`}
                onClick={() => isAI && a.conversation_id ? loadCallTranscript(a.conversation_id, a.summary) : undefined}
                style={{ background: isLiveRow ? C.amberLight : C.surface, borderRadius: 14, overflow: "hidden", border: `1px solid ${isLiveRow ? C.amber + "55" : C.border}`, borderLeft: `4px solid ${STATUS_BORDER[a.status] ?? C.border}`, cursor: isAI ? "pointer" : "default" }}>
                <div style={{ padding: "14px 16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                        {isAI && <span style={{ fontSize: 12 }}>📞</span>}
                        <span style={{ fontSize: 15, fontWeight: 700, color: C.text, lineHeight: 1.2 }}>{a.name}</span>
                        {isAI && <span style={{ fontSize: 10, background: C.accentLight, color: C.accent, padding: "2px 7px", borderRadius: 99, fontWeight: 700 }}>AI</span>}
                      </div>
                      <div style={{ fontSize: 13, color: C.textMuted, marginTop: 3 }}>{a.service}</div>
                      {isAI && a.start_time_unix_secs && <div style={{ fontSize: 11, color: C.textFaint, marginTop: 2 }}>{timeAgo(a.start_time_unix_secs)}</div>}
                    </div>
                    <div style={{ fontSize: 20, fontWeight: 700, color: a.price > 0 ? C.accent : C.textFaint, lineHeight: 1.1, flexShrink: 0 }}>{a.price > 0 ? `€${a.price}` : "—"}</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 10 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                      <span style={{ background: C.accentLight, color: C.accent, fontSize: 12, fontWeight: 600, padding: "3px 10px", borderRadius: 99 }}>{a.barber}</span>
                      <span style={{ fontSize: 12, color: C.textMuted }}>{a.date} · {a.time}</span>
                    </div>
                    <Badge status={a.status} C={C} />
                  </div>
                </div>
              </div>
              {/* Mobile transcript expansion */}
              {isOpen && isAI && (
                <div style={{ background: C.surfaceAlt, border: `1px solid ${C.border}`, borderTop: "none", borderRadius: "0 0 12px 12px", padding: "12px 16px" }}>
                  {loadingCallId === a.conversation_id ? (
                    <div className="gbf-skeleton" style={{ height: 12, width: "60%" }} />
                  ) : detail ? (
                    <div>
                      {detail.analysis?.transcript_summary && (
                        <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 10, lineHeight: 1.5 }}>
                          <span style={{ fontWeight: 700, color: C.accent }}>Summary: </span>{detail.analysis.transcript_summary}
                        </div>
                      )}
                      <div style={{ display: "flex", flexDirection: "column", gap: 6, maxHeight: 200, overflowY: "auto" }}>
                        {(detail.transcript ?? []).map((msg, mi) => (
                          <div key={mi} style={{ display: "flex", gap: 8 }}>
                            <span style={{ fontSize: 10, fontWeight: 700, color: msg.role === "agent" ? C.accent : C.textMuted, minWidth: 32, flexShrink: 0, textTransform: "uppercase" }}>{msg.role === "agent" ? "AI" : "You"}</span>
                            <span style={{ fontSize: 12, color: C.text, lineHeight: 1.45 }}>{msg.message}</span>
                          </div>
                        ))}
                        {(detail.transcript ?? []).length === 0 && <span style={{ fontSize: 12, color: C.textFaint }}>No transcript yet.</span>}
                      </div>
                    </div>
                  ) : <span style={{ fontSize: 12, color: C.red }}>Failed to load.</span>}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── RecentCallsSection ────────────────────────────────────────────────────────
function RecentCallsSection({ conversations, liveCall, C, density }: {
  conversations: ConversationSummary[]; liveCall: boolean; C: Colors; density: DensityKey;
}) {
  const pad = DENSITY_PAD[density];
  const [expandedId, setExpandedId]   = useState<string | null>(null);
  const [transcripts, setTranscripts] = useState<Record<string, ConversationDetail>>({});
  const [loadingId,   setLoadingId]   = useState<string | null>(null);

  const recent = conversations.slice(0, 15);

  async function loadTranscript(id: string) {
    if (transcripts[id]) { setExpandedId(expandedId === id ? null : id); return; }
    setLoadingId(id);
    setExpandedId(id);
    try {
      const data: ConversationDetail = await fetch(`/api/elevenlabs/conversation/${id}`).then(r => r.json());
      setTranscripts(prev => ({ ...prev, [id]: data }));
    } catch {}
    finally { setLoadingId(null); }
  }

  const statusColor = (s: string) => {
    if (s === "in-progress" || s === "processing") return C.amber;
    if (s === "done") return C.green;
    return C.red;
  };
  const statusLabel = (s: string) => {
    if (s === "in-progress") return "Live";
    if (s === "processing")  return "Processing";
    if (s === "done")        return "Done";
    return "Error";
  };

  if (recent.length === 0) return (
    <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: pad.card }}>
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 600, color: C.text, marginBottom: 6 }}>Recent AI Calls</div>
      <div style={{ fontSize: 13, color: C.textMuted }}>No calls recorded yet. Try the widget below!</div>
    </div>
  );

  return (
    <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: pad.card }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, gap: 8, flexWrap: "wrap" }}>
        <div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 600, color: C.text }}>Recent AI Calls</div>
          <div style={{ fontSize: 12, color: C.textMuted, marginTop: 2 }}>Live from ElevenLabs · click to view transcript</div>
        </div>
        {liveCall && (
          <div style={{ display: "flex", alignItems: "center", gap: 7, background: C.redLight, padding: "6px 14px", borderRadius: 99 }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: C.red, display: "inline-block", animation: "gbf-pulse 1s infinite" }} />
            <span style={{ fontSize: 12, fontWeight: 700, color: C.red }}>Call in progress</span>
          </div>
        )}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {recent.map(conv => {
          const isLive    = conv.status === "in-progress" || conv.status === "processing";
          const isOpen    = expandedId === conv.conversation_id;
          const detail    = transcripts[conv.conversation_id];
          const isLoading = loadingId === conv.conversation_id;

          return (
            <div key={conv.conversation_id} style={{ border: `1px solid ${isLive ? C.amber + "88" : C.borderFaint}`, borderRadius: 12, overflow: "hidden", background: isLive ? C.amberLight : C.surfaceAlt }}>
              {/* Row header */}
              <button
                onClick={() => loadTranscript(conv.conversation_id)}
                className="gbf-btn"
                style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", background: "transparent", border: "none", cursor: "pointer", textAlign: "left", fontFamily: "inherit" }}
              >
                {/* Status dot */}
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: statusColor(conv.status), flexShrink: 0, animation: isLive ? "gbf-pulse 1s infinite" : "none" }} />
                {/* Time */}
                <span style={{ fontSize: 12, color: C.textMuted, minWidth: 70, flexShrink: 0 }}>{timeAgo(conv.start_time_unix_secs)}</span>
                {/* Status badge */}
                <span style={{ fontSize: 11, fontWeight: 700, color: statusColor(conv.status), background: statusColor(conv.status) + "22", padding: "3px 9px", borderRadius: 99, flexShrink: 0 }}>{statusLabel(conv.status)}</span>
                {/* Duration */}
                <span style={{ fontSize: 12, color: C.textMuted, marginLeft: "auto", flexShrink: 0 }}>{fmtDuration(conv.call_duration_secs)}</span>
                {/* Msgs */}
                {conv.message_count > 0 && (
                  <span style={{ fontSize: 11, color: C.textFaint, flexShrink: 0 }}>{conv.message_count} msgs</span>
                )}
                {/* Chevron */}
                <span style={{ fontSize: 12, color: C.textFaint, flexShrink: 0, transform: isOpen ? "rotate(180deg)" : "none", transition: "transform .2s" }}>▾</span>
              </button>

              {/* Expanded transcript */}
              {isOpen && (
                <div style={{ padding: "0 16px 14px", borderTop: `1px solid ${C.borderFaint}` }}>
                  {isLoading ? (
                    <div style={{ display: "flex", gap: 8, alignItems: "center", padding: "12px 0" }}>
                      <div className="gbf-skeleton" style={{ height: 12, width: "40%" }} />
                      <div className="gbf-skeleton" style={{ height: 12, width: "30%" }} />
                    </div>
                  ) : detail ? (
                    <div>
                      {/* Summary */}
                      {detail.analysis?.transcript_summary && (
                        <div style={{ fontSize: 12, color: C.textMuted, background: C.accentLight, padding: "10px 12px", borderRadius: 8, marginTop: 12, marginBottom: 12, lineHeight: 1.5 }}>
                          <span style={{ fontWeight: 700, color: C.accent }}>Summary: </span>
                          {detail.analysis.transcript_summary}
                        </div>
                      )}
                      {/* Transcript messages */}
                      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 10, maxHeight: 320, overflowY: "auto" }}>
                        {(detail.transcript ?? []).map((msg, i) => {
                          const isAgent = msg.role === "agent";
                          return (
                            <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                              <span style={{ fontSize: 10, fontWeight: 700, color: isAgent ? C.accent : C.textMuted, minWidth: 38, flexShrink: 0, paddingTop: 2, textTransform: "uppercase" }}>
                                {isAgent ? "AI" : "User"}
                              </span>
                              <div style={{ flex: 1, minWidth: 0 }}>
                                <span style={{ fontSize: 13, color: C.text, lineHeight: 1.45 }}>{msg.message}</span>
                                <span style={{ fontSize: 10, color: C.textFaint, marginLeft: 8 }}>{fmtDuration(msg.time_in_call_secs)}</span>
                              </div>
                            </div>
                          );
                        })}
                        {(detail.transcript ?? []).length === 0 && (
                          <span style={{ fontSize: 12, color: C.textFaint }}>No transcript available yet.</span>
                        )}
                      </div>
                    </div>
                  ) : (
                    <span style={{ fontSize: 12, color: C.red, padding: "10px 0", display: "block" }}>Failed to load transcript.</span>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── AnalyticsTab ──────────────────────────────────────────────────────────────
function AnalyticsTab({ C, density, conversations, liveCall }: {
  C: Colors; density: DensityKey; conversations: ConversationSummary[]; liveCall: boolean;
}) {
  const t = useT();
  const pad = DENSITY_PAD[density];

  // KPIs — blend real conversation data with mock historical data
  const sevenDaysAgo    = Math.floor(Date.now() / 1000) - 7 * 86400;
  const realCalls7d     = conversations.filter(c => c.start_time_unix_secs > sevenDaysAgo).length;
  const realDone        = conversations.filter(c => c.status === "done").length;
  const realFailed      = conversations.filter(c => c.status === "error").length;
  const totalRevenue    = REVENUE_TREND.reduce((s, d) => s + d.revenue, 0);
  const totalAppts      = REVENUE_TREND.reduce((s, d) => s + d.appts, 0);
  const successCalls    = realCalls7d > 0 ? realDone  : CALL_TREND.reduce((s, d) => s + d.successful, 0);
  const failedCalls     = realCalls7d > 0 ? realFailed: CALL_TREND.reduce((s, d) => s + d.failed, 0);
  const totalCalls      = realCalls7d > 0 ? realCalls7d : successCalls + failedCalls;
  const successRate     = Math.round((successCalls / Math.max(totalCalls, 1)) * 100);
  const avgTicket       = totalAppts > 0 ? (totalRevenue / totalAppts).toFixed(2) : "0";
  const totalBarberRev = BARBER_STATS.reduce((s, b) => s + b.revenue, 0);
  const maxCallsDay    = Math.max(...CALL_TREND.map(d => d.successful + d.failed), 1);
  const maxSvcCount    = Math.max(...SERVICE_STATS.map(s => s.count));

  // Revenue SVG chart
  const maxRev = Math.max(...REVENUE_TREND.map(d => d.revenue), 1);
  const W = 600, H = 100, padX = 8, padY = 10;
  const pts = REVENUE_TREND.map((d, i) => ({
    x: padX + (i / (REVENUE_TREND.length - 1)) * (W - padX * 2),
    y: padY + (1 - d.revenue / maxRev) * (H - padY * 2),
    ...d,
  }));
  const linePoints  = pts.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
  const areaPoints  = [`${pts[0].x.toFixed(1)},${H}`, ...pts.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`), `${pts[pts.length-1].x.toFixed(1)},${H}`].join(" ");
  const labelIdxs   = [0, 3, 6, 9, 13];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: pad.gap }}>

      {/* ── KPI Row ── */}
      <div className="gbf-stat-grid gbf-stagger">
        <StatCard value={`€${totalRevenue.toLocaleString()}`} label={t("aMonthRevenue")}    sub={t("aLast14d")}                                             C={C} density={density} />
        <StatCard value={`${successRate}%`}                   label={t("aCallSuccessRate")} sub={`${successCalls} ${t("aOkLabel")} · ${failedCalls} ${t("aMissedShort")}`} C={C} density={density} />
        <StatCard value={totalCalls}                          label={t("aAICallsWeek")}     sub={`${failedCalls} ${t("aUnanswered")}`}                       C={C} density={density} />
        <StatCard value={`€${avgTicket}`}                     label={t("aAvgTicket")}       sub={t("aPerAppt")}                                              C={C} density={density} />
      </div>

      {/* ── Revenue Trend ── */}
      <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: pad.card }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20, gap: 8 }}>
          <div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 600, color: C.text }}>{t("aRevenueTrend")}</div>
            <div style={{ fontSize: 12, color: C.textMuted, marginTop: 2 }}>{t("aDailyEarnings")}</div>
          </div>
          <div style={{ textAlign: "right", flexShrink: 0 }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: C.accent, lineHeight: 1 }}>€{totalRevenue.toLocaleString()}</div>
            <div style={{ fontSize: 11, color: C.textMuted, marginTop: 2 }}>{totalAppts} {t("aAppointments")}</div>
          </div>
        </div>
        {/* Area Chart */}
        <svg width="100%" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" style={{ display: "block", height: 110, borderRadius: 10 }}>
          <defs>
            <linearGradient id="gbf-rev-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={C.accent} stopOpacity="0.28" />
              <stop offset="100%" stopColor={C.accent} stopOpacity="0.02" />
            </linearGradient>
          </defs>
          {/* Grid */}
          {[0, 33, 66, 100].map(pct => {
            const y = padY + (pct / 100) * (H - padY * 2);
            return <line key={pct} x1={padX} y1={y} x2={W - padX} y2={y} stroke={C.borderFaint} strokeWidth="0.8" />;
          })}
          {/* Area fill */}
          <polygon points={areaPoints} fill="url(#gbf-rev-grad)" />
          {/* Line */}
          <polyline points={linePoints} fill="none" stroke={C.accent} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
          {/* Dots on non-zero days */}
          {pts.filter(p => p.revenue > 0).map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r="3.5" fill={C.accent} />
          ))}
          {/* Zero-day markers */}
          {pts.filter(p => p.revenue === 0).map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r="2.5" fill="none" stroke={C.border} strokeWidth="1.5" />
          ))}
        </svg>
        {/* X-axis labels */}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
          {labelIdxs.map(i => (
            <span key={i} style={{ fontSize: 10, color: C.textFaint }}>{REVENUE_TREND[i].label}</span>
          ))}
        </div>
        {/* Zero = closed indicator */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 10, paddingTop: 10, borderTop: `1px solid ${C.borderFaint}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", border: `1.5px solid ${C.border}`, background: "transparent" }} />
            <span style={{ fontSize: 11, color: C.textFaint }}>{t("aClosedDay")}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: C.accent }} />
            <span style={{ fontSize: 11, color: C.textFaint }}>{t("aRevRecorded")}</span>
          </div>
        </div>
      </div>

      {/* ── Two-col row: Calls + Services ── */}
      <div className="gbf-hub-grid">

        {/* AI Calls Chart */}
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: pad.card }}>
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 600, color: C.text }}>{t("aAICalls")}</div>
            <div style={{ fontSize: 12, color: C.textMuted, marginTop: 2 }}>{t("aCallsSubtitle")}</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {CALL_TREND.map(day => {
              const total = day.successful + day.failed;
              const sPct  = total > 0 ? (day.successful / maxCallsDay) * 100 : 0;
              const fPct  = total > 0 ? (day.failed    / maxCallsDay) * 100 : 0;
              return (
                <div key={day.label} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 12, color: C.textMuted, width: 30, flexShrink: 0 }}>{day.label}</span>
                  <div style={{ flex: 1, display: "flex", height: 22, borderRadius: 6, overflow: "hidden", background: C.borderFaint }}>
                    <div style={{ width: `${sPct}%`, background: C.green, transition: "width .4s", borderRadius: fPct > 0 ? "6px 0 0 6px" : 6 }} />
                    <div style={{ width: `${fPct}%`, background: C.red,   transition: "width .4s", borderRadius: sPct > 0 ? "0 6px 6px 0" : 6 }} />
                  </div>
                  <span style={{ fontSize: 12, color: total === 0 ? C.textFaint : C.text, fontWeight: 600, width: 22, textAlign: "right", flexShrink: 0 }}>{total}</span>
                </div>
              );
            })}
          </div>
          {/* Totals + legend */}
          <div style={{ display: "flex", gap: 16, marginTop: 16, paddingTop: 12, borderTop: `1px solid ${C.borderFaint}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 10, height: 10, borderRadius: 2, background: C.green, flexShrink: 0 }} />
              <span style={{ fontSize: 12, color: C.textMuted }}>{t("aAnswered")} ({successCalls})</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 10, height: 10, borderRadius: 2, background: C.red, flexShrink: 0 }} />
              <span style={{ fontSize: 12, color: C.textMuted }}>{t("aMissed")} ({failedCalls})</span>
            </div>
          </div>
          {/* Success rate pill */}
          <div style={{ marginTop: 10, background: C.greenLight, borderRadius: 10, padding: "10px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 13, color: C.green, fontWeight: 600 }}>{t("aSuccessRate")}</span>
            <span style={{ fontSize: 18, fontWeight: 700, color: C.green }}>{successRate}%</span>
          </div>
        </div>

        {/* Service Breakdown */}
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: pad.card }}>
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 600, color: C.text }}>{t("aSvcBreakdown")}</div>
            <div style={{ fontSize: 12, color: C.textMuted, marginTop: 2 }}>{t("aSvcSubtitle")}</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {SERVICE_STATS.map((svc, i) => (
              <div key={svc.name}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 5 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    {i === 0 && <span style={{ fontSize: 11 }}>🏅</span>}
                    <span style={{ fontSize: 13, color: C.text, fontWeight: i < 3 ? 600 : 400 }}>{svc.name}</span>
                  </div>
                  <div style={{ display: "flex", gap: 10, flexShrink: 0 }}>
                    <span style={{ fontSize: 11, color: C.textFaint }}>{svc.count}×</span>
                    <span style={{ fontSize: 12, color: C.accent, fontWeight: 700 }}>€{svc.revenue}</span>
                  </div>
                </div>
                <div style={{ height: 6, background: C.borderFaint, borderRadius: 99, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${(svc.count / maxSvcCount) * 100}%`, background: i === 0 ? C.accent : C.accentMid, borderRadius: 99, opacity: i === 0 ? 1 : 0.6 + i * 0.04 * -1 + 0.3 }} />
                </div>
              </div>
            ))}
          </div>
          {/* Total */}
          <div style={{ marginTop: 14, paddingTop: 12, borderTop: `1px solid ${C.borderFaint}`, display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: 13, color: C.textMuted }}>{t("aTotalServices")}</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: C.accent }}>€{SERVICE_STATS.reduce((s, v) => s + v.revenue, 0).toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* ── Barber Performance ── */}
      <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: pad.card }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20, gap: 8, flexWrap: "wrap" }}>
          <div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 600, color: C.text }}>{t("aBarberPerf")}</div>
            <div style={{ fontSize: 12, color: C.textMuted, marginTop: 2 }}>{t("aBarberSubtitle")}</div>
          </div>
          <span style={{ fontSize: 11, color: C.textFaint, background: C.surfaceAlt, padding: "4px 10px", borderRadius: 99, border: `1px solid ${C.borderFaint}` }}>{t("aMonthOf")}</span>
        </div>
        <div className="gbf-stat-grid gbf-stagger">
          {BARBER_STATS.map((barber, rank) => (
            <div key={barber.name} className="gbf-lift" style={{ background: C.surfaceAlt, borderRadius: 14, padding: "18px 16px", border: `1.5px solid ${rank === 0 ? barber.color + "55" : C.borderFaint}`, position: "relative", overflow: "hidden" }}>
              {/* Rank badge */}
              <div style={{ position: "absolute", top: 10, right: 12, fontSize: 13, opacity: 0.8 }}>
                {["🥇","🥈","🥉",""][rank]}
              </div>
              {/* Avatar + name */}
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <div style={{ width: 42, height: 42, borderRadius: "50%", background: barber.color, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 700, flexShrink: 0, boxShadow: `0 2px 8px ${barber.color}55` }}>
                  {barber.name[0]}
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: C.text }}>{barber.name}</div>
                  <div style={{ fontSize: 11, color: C.textMuted }}>#{rank + 1} {t("aRanked")}</div>
                </div>
              </div>
              {/* Stats grid */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
                {[
                  [t("revenue"),    `€${barber.revenue.toLocaleString()}`, C.accent],
                  [t("clients"),   String(barber.clients),               C.text],
                  [t("appointments"), String(barber.appts),              C.text],
                  [t("aAvgTicket"),`€${barber.avgTicket}`,               C.text],
                ].map(([label, val, color]) => (
                  <div key={label as string} style={{ background: C.surface, borderRadius: 8, padding: "8px 10px" }}>
                    <div style={{ fontSize: 10, color: C.textFaint, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 2 }}>{label}</div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: color as string }}>{val}</div>
                  </div>
                ))}
              </div>
              {/* Top service */}
              <span style={{ fontSize: 11, background: C.accentLight, color: C.accent, padding: "4px 10px", borderRadius: 99, fontWeight: 600 }}>✦ {barber.topService}</span>
              {/* Utilization */}
              <div style={{ marginTop: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                  <span style={{ fontSize: 11, color: C.textFaint }}>{t("aScheduleUtil")}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: C.textMuted }}>{barber.utilization}%</span>
                </div>
                <div style={{ height: 5, background: C.borderFaint, borderRadius: 99, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${barber.utilization}%`, background: barber.color, borderRadius: 99 }} />
                </div>
              </div>
              {/* Revenue share */}
              <div style={{ marginTop: 8, fontSize: 11, color: C.textFaint }}>
                {Math.round((barber.revenue / totalBarberRev) * 100)}% {t("aTeamRevenue")}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Recent AI Calls (live from ElevenLabs) ── */}
      <RecentCallsSection conversations={conversations} liveCall={liveCall} C={C} density={density} />

      {/* ── Peak Hours Heatmap ── */}
      <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: pad.card }}>
        <div style={{ marginBottom: 18 }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 600, color: C.text }}>{t("aPeakHours")}</div>
          <div style={{ fontSize: 12, color: C.textMuted, marginTop: 2 }}>{t("aPeakSubtitle")}</div>
        </div>
        <div style={{ overflowX: "auto" }}>
          <div style={{ minWidth: 340 }}>
            {/* Hour header */}
            <div style={{ display: "flex", gap: 4, marginBottom: 8, marginLeft: 38 }}>
              {PEAK_HOURS_LABELS.map(h => (
                <div key={h} style={{ flex: 1, textAlign: "center", fontSize: 10, color: C.textFaint, fontWeight: 600 }}>{h}:00</div>
              ))}
            </div>
            {/* Rows */}
            {PEAK_DAYS.map((day, di) => (
              <div key={day} style={{ display: "flex", gap: 4, alignItems: "center", marginBottom: 5 }}>
                <span style={{ width: 34, fontSize: 11, fontWeight: 600, color: C.textMuted, flexShrink: 0 }}>{day}</span>
                {PEAK_DATA[di].map((intensity, hi) => {
                  const opacities = [0, 0.15, 0.35, 0.6, 0.9];
                  return (
                    <div key={hi}
                      className="gbf-heat-cell gbf-tip"
                      data-tip={`${day} ${PEAK_HOURS_LABELS[hi]}:00 — ${PEAK_LABELS[intensity]}`}
                      style={{
                        flex: 1, height: 30,
                        background: intensity === 0 ? C.borderFaint : C.accent,
                        opacity: intensity === 0 ? 0.25 : opacities[intensity],
                      }}
                    />
                  );
                })}
              </div>
            ))}
            {/* Legend */}
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 14, justifyContent: "flex-end" }}>
              <span style={{ fontSize: 10, color: C.textFaint }}>Quiet</span>
              {[0.15, 0.35, 0.6, 0.9].map((o, i) => (
                <div key={i} style={{ width: 20, height: 20, borderRadius: 4, background: C.accent, opacity: o }} />
              ))}
              <span style={{ fontSize: 10, color: C.textFaint }}>Peak</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const router = useRouter();
  const [authReady,     setAuthReady]     = useState(false);
  const [settings,      setSettings]      = useState<Settings>(DEFAULT_SETTINGS);
  const [profile,       setProfile]       = useState<BusinessProfile>(DEFAULT_PROFILE);
  const [langSettings,  setLangSettings]  = useState<LangSettings>(DEFAULT_LANG);
  const [agent,         setAgent]         = useState<AgentData | null>(null);
  const [loading,       setLoading]       = useState(true);
  const [settingsOpen,  setSettingsOpen]  = useState(false);
  const [langOpen,      setLangOpen]      = useState(false);
  const [C,             setC]             = useState<Colors>(PALETTES.botanical.light);
  const [tab,           setTab]           = useState<"hub" | "ledger" | "analytics">("hub");
  const [selectedConvId, setSelectedConvId] = useState<string | null>(null);
  const widgetRef = useRef<HTMLDivElement>(null);
  const [conversations, setConversations] = useState<ConversationSummary[]>([]);
  const [liveCall,      setLiveCall]      = useState(false);
  const [aiBookings,    setAiBookings]    = useState<AiBooking[]>([]);

  // ── Auth guard ──
  useEffect(() => {
    try {
      const s = JSON.parse(localStorage.getItem("gbf-auth-session") ?? "null");
      if (s && Date.now() < s.expires) { setAuthReady(true); return; }
    } catch {}
    router.replace("/dashboard/login");
  }, [router]);

  // ── Load persisted state ──
  useEffect(() => {
    if (!authReady) return;
    const s = loadSettings();
    const p = loadProfile();
    const l = loadLangSettings();
    setSettings(s);
    setProfile(p);
    setLangSettings(l);
    setTab("hub");
    setC(getColors(s));
  }, [authReady]);

  useEffect(() => { setC(getColors(settings)); }, [settings]);

  useEffect(() => {
    if (settings.mode !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const h = () => setC(getColors(settings));
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, [settings]);

  const updateSettings = useCallback((patch: Partial<Settings>) => {
    setSettings(prev => {
      const next = { ...prev, ...patch };
      localStorage.setItem("gbf-dashboard-settings", JSON.stringify(next));
      return next;
    });
  }, []);

  const updateProfile = useCallback((patch: Partial<BusinessProfile>) => {
    setProfile(prev => {
      const next = { ...prev, ...patch };
      localStorage.setItem("gbf-business-profile", JSON.stringify(next));
      return next;
    });
  }, []);

  const updateLangSettings = useCallback((patch: Partial<LangSettings>) => {
    setLangSettings(prev => {
      const next = { ...prev, ...patch };
      localStorage.setItem("gbf-language-settings", JSON.stringify(next));
      return next;
    });
  }, []);

  const t = useCallback((key: string): string => {
    const { lang, translateUI, translateServices } = langSettings;
    if (lang === "en") return translate(key, "en");
    const isService = key.startsWith("svc") || key === "servicesTitle";
    if (isService) return translateServices ? translate(key, lang) : translate(key, "en");
    return translateUI ? translate(key, lang) : translate(key, "en");
  }, [langSettings]);

  const handleLogout = useCallback(() => {
    localStorage.removeItem("gbf-auth-session");
    router.push("/dashboard/login");
  }, [router]);

  const fetchDashboardData = useCallback(async () => {
    try {
      const [data, bookingsData] = await Promise.all([
        fetch("/api/elevenlabs").then(r => r.json()),
        fetch("/api/elevenlabs/bookings").then(r => r.json()).catch(() => ({ bookings: [] })),
      ]);
      if (data.agent) setAgent(data.agent);
      const convs: ConversationSummary[] = data.conversations ?? [];
      setConversations(convs);
      setLiveCall(data.has_live_call ?? convs.some(c => c.status === "in-progress" || c.status === "processing"));
      // Real bookings first (most recent), then demo ones fill the rest
      const real: AiBooking[] = bookingsData.bookings ?? [];
      const realIds = new Set(real.map((b: AiBooking) => b.conversation_id));
      const demos = DEMO_AI_BOOKINGS.filter(d => !realIds.has(d.conversation_id));
      setAiBookings([...real, ...demos]);
    } catch { /* swallow — UI stays stale */ }
    finally { setLoading(false); }
  }, []);

  // Initial fetch + 10 s poll (paused while tab is hidden)
  useEffect(() => {
    fetchDashboardData();
    const iv = setInterval(() => { if (!document.hidden) fetchDashboardData(); }, 10_000);
    return () => clearInterval(iv);
  }, [fetchDashboardData]);

  // Refresh 2 s after the widget signals a call ended
  useEffect(() => {
    const container = widgetRef.current;
    if (!container) return;
    const handler = () => setTimeout(fetchDashboardData, 2000);
    container.addEventListener("elevenlabs-convai:call_ended", handler);
    return () => container.removeEventListener("elevenlabs-convai:call_ended", handler);
  }, [fetchDashboardData]);


  if (!authReady) return <div style={{ minHeight: "100vh", background: "#F5F0E8" }} />;

  const isRTL = LANG_META[langSettings.lang].rtl;
  const tabs = [
    { id: "hub"       as const, label: t("hubFull"),        short: t("hubShort")        },
    { id: "ledger"    as const, label: t("ledgerFull"),     short: t("ledgerShort")     },
    { id: "analytics" as const, label: t("analyticsFull"),  short: t("analyticsShort")  },
  ];

  return (
    <LangCtx.Provider value={t}>
    <>
      <style>{RESPONSIVE_CSS}</style>
      <Script
        src="https://elevenlabs.io/convai-widget/index.js"
        strategy="afterInteractive"
        onLoad={() => {
          const el = widgetRef.current;
          if (el && !el.querySelector("elevenlabs-convai")) {
            const w = document.createElement("elevenlabs-convai");
            w.setAttribute("agent-id", "agent_5001kjkkjvs6e7fs5t5fkjh1hhwc");
            el.appendChild(w);
          }
        }}
      />
      <div ref={widgetRef} />

      {settingsOpen && (
        <SettingsPanel
          settings={settings} onUpdate={updateSettings}
          profile={profile} onProfileUpdate={updateProfile}
          onClose={() => setSettingsOpen(false)}
          onLogout={handleLogout}
          C={C}
          langSettings={langSettings} onLangUpdate={updateLangSettings}
        />
      )}

      <div dir={isRTL ? "rtl" : "ltr"} style={{ minHeight: "100vh", background: C.bg, color: C.text, transition: "background .3s, color .3s" }}>

        {/* Header */}
        <header className="gbf-header" style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, position: "sticky", top: 0, zIndex: 30, transition: "background .3s" }}>
          <div className="gbf-header-inner" style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
              <span style={{ fontSize: 22, flexShrink: 0 }}>✂️</span>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 600, color: C.text, lineHeight: 1.2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {profile.businessName || "Greek Barber Festival"}
                </div>
                <div style={{ fontSize: 10, color: C.textMuted, letterSpacing: "0.07em", textTransform: "uppercase" }}>{t("aiDashboard")}</div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
              <span className="gbf-header-date" style={{ fontSize: 13, color: C.textMuted }}>
                {new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })}
              </span>
              <div style={{ display: "flex", alignItems: "center", gap: 6, background: loading ? C.borderFaint : C.greenLight, padding: "6px 11px", borderRadius: 99, transition: "background .3s" }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: loading ? C.textFaint : C.green, display: "inline-block", animation: loading ? "none" : "gbf-pulse 2s infinite", flexShrink: 0 }} />
                <span className="gbf-header-live-text" style={{ fontSize: 11, color: loading ? C.textMuted : C.green, fontWeight: 700, letterSpacing: "0.04em" }}>
                  {loading ? t("loading") : t("live")}
                </span>
              </div>
              {/* Language picker */}
              <div style={{ position: "relative", flexShrink: 0 }}>
                <button
                  onClick={() => setLangOpen(v => !v)}
                  className="gbf-btn"
                  title="Language"
                  style={{
                    display: "flex", alignItems: "center", gap: 5,
                    padding: "0 10px", height: 40, borderRadius: 10,
                    border: `1px solid ${C.border}`, background: langOpen ? C.accentLight : C.surfaceAlt,
                    cursor: "pointer", fontFamily: "inherit", color: C.text, transition: "all .15s",
                  }}
                >
                  <span style={{ fontSize: 16 }}>{LANG_META[langSettings.lang].flag}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", color: C.textMuted }}>{langSettings.lang.toUpperCase()}</span>
                </button>
                {langOpen && (
                  <>
                    <div onClick={() => setLangOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 200 }} />
                    <div style={{
                      position: "absolute", top: "calc(100% + 8px)", right: isRTL ? "auto" : 0, left: isRTL ? 0 : "auto",
                      zIndex: 201, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14,
                      boxShadow: "0 8px 32px rgba(0,0,0,.18)", padding: 8, minWidth: 190,
                    }}>
                      {(Object.entries(LANG_META) as [LanguageKey, typeof LANG_META[LanguageKey]][]).map(([key, meta]) => {
                        const active = langSettings.lang === key;
                        return (
                          <button key={key} onClick={() => { updateLangSettings({ lang: key }); setLangOpen(false); }} className="gbf-btn" style={{
                            display: "flex", alignItems: "center", gap: 10, width: "100%",
                            padding: "9px 12px", borderRadius: 10, border: "none",
                            background: active ? C.accentLight : "transparent",
                            cursor: "pointer", fontFamily: "inherit", textAlign: "left", transition: "background .1s",
                          }}>
                            <span style={{ fontSize: 18, flexShrink: 0 }}>{meta.flag}</span>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ fontSize: 13, fontWeight: active ? 700 : 500, color: active ? C.accent : C.text }}>{meta.native}</div>
                            </div>
                            {active && <span style={{ color: C.accent, fontSize: 14, flexShrink: 0 }}>✓</span>}
                          </button>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>

              <button onClick={() => setSettingsOpen(true)} title="Settings" className="gbf-btn" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 40, height: 40, borderRadius: 10, border: `1px solid ${C.border}`, background: C.surfaceAlt, color: C.textMuted, cursor: "pointer", flexShrink: 0, transition: "all .15s" }}>
                <GearIcon />
              </button>
            </div>
          </div>
        </header>

        {/* Live call banner */}
        {liveCall && (
          <div style={{ background: C.red, color: "#fff", padding: "8px 32px", display: "flex", alignItems: "center", gap: 10, fontSize: 13, fontWeight: 600 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#fff", display: "inline-block", animation: "gbf-pulse 1s infinite", flexShrink: 0 }} />
            <span className="gbf-header-live-text">Live call in progress — dashboard updates every 10 s</span>
            <span style={{ marginLeft: "auto", fontSize: 11, fontWeight: 400, opacity: 0.85 }}>Go to Analytics to see transcript</span>
          </div>
        )}

        {/* Tabs */}
        <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}` }}>
          <div className="gbf-tabs-inner" style={{ maxWidth: 1200, margin: "0 auto", display: "flex" }}>
            {tabs.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)} className="gbf-tab-btn gbf-btn" style={{ fontWeight: tab === t.id ? 700 : 500, color: tab === t.id ? C.accent : C.textMuted, background: "transparent", border: "none", borderBottom: tab === t.id ? `3px solid ${C.accent}` : "3px solid transparent", cursor: "pointer", fontFamily: "inherit", transition: "color .15s, border-color .15s", display: "flex", alignItems: "center" }}>
                <span className="gbf-tab-full">{t.label}</span>
                <span className="gbf-tab-short">{t.short}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content — all three tabs stay mounted; CSS hides the inactive ones */}
        <div className="gbf-content" style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: tab === "hub"       ? "block" : "none" }} className="gbf-tab-content">
            <HubTab agent={agent} C={C} density={settings.density} showServices={settings.showServices} loading={loading} profile={profile} conversations={conversations} aiBookings={aiBookings} liveCall={liveCall}
              onTabChange={setTab}
              onConvSelect={(id) => { setSelectedConvId(id); setTab("ledger"); }} />
          </div>
          <div style={{ display: tab === "ledger"    ? "block" : "none" }} className="gbf-tab-content">
            <LedgerTab C={C} density={settings.density} aiBookings={aiBookings} liveCall={liveCall}
              selectedConvId={selectedConvId} onConvSelected={() => setSelectedConvId(null)} />
          </div>
          <div style={{ display: tab === "analytics" ? "block" : "none" }} className="gbf-tab-content">
            <AnalyticsTab C={C} density={settings.density} conversations={conversations} liveCall={liveCall} />
          </div>
        </div>

        {/* Footer */}
        <footer className="gbf-footer" style={{ borderTop: `1px solid ${C.border}`, display: "flex", justifyContent: "center", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 12, color: C.textMuted }}>{t("poweredBy")}</span>
          <span style={{ fontSize: 12, fontWeight: 700, color: C.accent }}>ElevenLabs Conversational AI</span>
          <span style={{ fontSize: 12, color: C.textFaint }}>·</span>
          <span style={{ fontSize: 12, color: C.textMuted }}>{t("footerSuffix")}</span>
        </footer>
      </div>
    </>
    </LangCtx.Provider>
  );
}

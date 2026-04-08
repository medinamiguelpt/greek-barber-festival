import { NextResponse } from "next/server";

const AGENT_ID = "agent_5001kjkkjvs6e7fs5t5fkjh1hhwc";
const BASE = "https://api.elevenlabs.io/v1";

// ── Service detection ─────────────────────────────────────────────────────────
// Patterns are checked case-insensitively against the full transcript + summary
const SERVICE_PATTERNS: { name: string; patterns: RegExp[] }[] = [
  {
    name: "Full Grooming Package",
    patterns: [
      /full\s*(grooming\s*)?package/i,
      /πλήρ(ες|η)\s*πακέτο/i,
      /πακέτο\s*(περιποίησης|grooming)/i,
      /full\s*service/i,
    ],
  },
  {
    name: "Hot Towel Shave",
    patterns: [
      /hot\s*towel\s*shave/i,
      /ξύρισμα\s*(με\s*(ζεστή|θερμή)\s*πετσέτα|κλασικό)/i,
      /straight\s*razor/i,
      /traditional\s*shave/i,
    ],
  },
  {
    name: "Head Shave",
    patterns: [
      /head\s*shave/i,
      /ξύρισμα\s*(κεφαλιού|κεφάλι)/i,
      /shave\s*(my\s*)?head/i,
      /zero\s*(cut|grade)/i,
    ],
  },
  {
    name: "Beard Trim & Shaping",
    patterns: [
      /beard\s*(trim|shap|groom|cut|style)/i,
      /trim\s*(my\s*)?beard/i,
      /μούσι\s*(κόψιμο|κούρεμα|φρεσκάρισμα|διαμόρφωση|τακτοποίηση)?/i,
      /γενειάδα/i,
      /φρεσκάρισμα\s*(γενι|μούσι)/i,
      /\bbeard\b/i,
    ],
  },
  {
    name: "Eyebrow Grooming",
    patterns: [
      /eyebrow/i,
      /brow\s*(shap|trim|groom)/i,
      /φρύδι(α|ων)?/i,
      /διαμόρφωση\s*φρυδιών/i,
    ],
  },
  {
    name: "Scalp Massage",
    patterns: [
      /scalp\s*massage/i,
      /μασάζ\s*(κεφαλιού|κεφάλι)/i,
      /head\s*massage/i,
    ],
  },
  {
    name: "Hair Colour",
    patterns: [
      /hair\s*(colo(u)?r|dye|tint)/i,
      /colo(u)?r\s*(my\s*)?hair/i,
      /βαφή\s*μαλλιών/i,
      /βάψ(ιμο|ω)\s*μαλλιά/i,
    ],
  },
  {
    name: "Haircut",
    patterns: [
      /hair(cut|trim|style)/i,
      /cut\s*(my\s*)?(hair|locks)/i,
      /κούρεμα\s*(μαλλιών)?/i,
      /κόψ(ιμο|ω|ε)\s*(τα\s*)?μαλλιά/i,
      /\bhaircut\b/i,
      /\bcut\b/i,
      /\bκούρεμα\b/i,
    ],
  },
];

// Returns the canonical service name for the first pattern that matches, or ""
function detectService(text: string): string {
  for (const { name, patterns } of SERVICE_PATTERNS) {
    for (const re of patterns) {
      if (re.test(text)) return name;
    }
  }
  return "";
}

// ── Date/time extraction ──────────────────────────────────────────────────────
const TODAY = new Date();

// Map day-of-week words → date offset from today
const DAY_NAMES: { re: RegExp; offset: (today: number) => number }[] = [
  { re: /\b(today|σήμερα)\b/i,    offset: _d => 0 },
  { re: /\b(tomorrow|αύριο)\b/i,  offset: _d => 1 },
  { re: /\b(monday|δευτέρα)\b/i,  offset: d => (8 - d) % 7 || 7 },
  { re: /\b(tuesday|τρίτη)\b/i,   offset: d => (9 - d) % 7 || 7 },
  { re: /\b(wednesday|τετάρτη)\b/i, offset: d => (10 - d) % 7 || 7 },
  { re: /\b(thursday|πέμπτη)\b/i, offset: d => (11 - d) % 7 || 7 },
  { re: /\b(friday|παρασκευή)\b/i, offset: d => (12 - d) % 7 || 7 },
  { re: /\b(saturday|σάββατο)\b/i, offset: d => (13 - d) % 7 || 7 },
  { re: /\b(sunday|κυριακή)\b/i,  offset: d => (14 - d) % 7 || 7 },
];

function extractDate(text: string): string {
  // Explicit DD/MM
  const dmMatch = text.match(/\b(\d{1,2})[\/\-](\d{1,2})\b/);
  if (dmMatch) return `${dmMatch[1].padStart(2,"0")}/${dmMatch[2].padStart(2,"0")}`;

  // Day-of-week words
  const todayDow = TODAY.getDay(); // 0=Sun, 1=Mon …
  for (const { re, offset } of DAY_NAMES) {
    if (re.test(text)) {
      const target = new Date(TODAY);
      target.setDate(TODAY.getDate() + offset(todayDow));
      return target.toLocaleDateString("el-GR", { day: "2-digit", month: "2-digit" });
    }
  }
  return "";
}

function extractTime(text: string): string {
  // "10:30", "10.30"
  const hhmm = text.match(/\b(\d{1,2})[:\.](\d{2})\b/);
  if (hhmm) return `${hhmm[1].padStart(2,"0")}:${hhmm[2]}`;

  // "10 AM" / "3 PM" / "10 o'clock"
  const ampm = text.match(/\b(\d{1,2})\s*(am|pm)\b/i);
  if (ampm) {
    let h = parseInt(ampm[1]);
    if (/pm/i.test(ampm[2]) && h < 12) h += 12;
    if (/am/i.test(ampm[2]) && h === 12) h = 0;
    return `${String(h).padStart(2,"0")}:00`;
  }

  // Greek: "στις δέκα" "στις 3" etc.
  const greekNum: Record<string, number> = {
    δύο:2,τρεις:3,τέσσερις:4,πέντε:5,έξι:6,εφτά:7,επτά:7,
    οχτώ:8,οκτώ:8,εννιά:9,εννέα:9,δέκα:10,έντεκα:11,δώδεκα:12,
    μία:1,μια:1,
  };
  const greekMatch = text.match(/στις\s+([α-ωΑ-Ω]+|\d{1,2})/i);
  if (greekMatch) {
    const word = greekMatch[1].toLowerCase();
    const h = greekNum[word] ?? parseInt(word);
    if (!isNaN(h)) return `${String(h).padStart(2,"0")}:00`;
  }
  return "";
}

// ── Name extraction ───────────────────────────────────────────────────────────
const KNOWN_BARBERS = ["nikos", "giorgos", "eleni", "petros"];

// Common words that look capitalised but aren't names
const NON_NAMES = new Set([
  "okay","ok","yes","no","hi","hello","hey","thank","thanks","sure","great",
  "good","sorry","please","can","would","could","like","need","want","have",
  "just","know","well","right","also","may","let","see","got","get","one",
  // Greek
  "ναι","όχι","γεια","ευχαριστώ","παρακαλώ","καλά","εντάξει","είμαι",
  "θέλω","μπορώ","έχω","είναι","english","greek",
]);

function inferNameFromTranscript(
  transcript: { role: string; message: string }[],
  summary: string,
): string {
  // 1. Check the summary first: "The client [Name] called" / "caller [Name]"
  const sumMatch = summary.match(
    /(?:client|customer|caller|caller named?|named?)\s+([A-ZΑ-Ω][a-zα-ω]{2,20})/i
  );
  if (sumMatch && !NON_NAMES.has(sumMatch[1].toLowerCase()) && !KNOWN_BARBERS.includes(sumMatch[1].toLowerCase())) {
    return capitalise(sumMatch[1]);
  }

  // 2. Explicit introduction in user messages
  const userMsgs = transcript.filter(m => m.role === "user");
  for (const msg of userMsgs) {
    const explicit = msg.message.match(
      /(?:i['']?m|my name is|call me|it['']?s|είμαι|ονομάζομαι|με λένε|λέγομαι)\s+([Α-ΩA-Zα-ωa-z][α-ωa-z]{1,20})/i
    );
    if (explicit) {
      const name = explicit[1];
      if (!NON_NAMES.has(name.toLowerCase()) && !KNOWN_BARBERS.includes(name.toLowerCase()))
        return capitalise(name);
    }
  }

  // 3. AI agent says the client's name back (e.g. "Great, [Name], I've booked...")
  const agentMsgs = transcript.filter(m => m.role === "agent");
  for (const msg of agentMsgs) {
    // Strip language tags like <English>...</English>
    const clean = msg.message.replace(/<[^>]+>/g, " ").trim();
    const m = clean.match(
      /(?:great|perfect|wonderful|of course|sure)[\s,!]+([A-ZΑ-Ω][a-zα-ω]{2,20})[,\s]/i
    );
    if (m && !NON_NAMES.has(m[1].toLowerCase()) && !KNOWN_BARBERS.includes(m[1].toLowerCase())) {
      return capitalise(m[1]);
    }
    // "[Name], you are booked..."
    const booked = clean.match(/^([A-ZΑ-Ω][a-zα-ω]{2,20})[,\s]+(?:you are|you've been|you're)\s+booked/i);
    if (booked && !NON_NAMES.has(booked[1].toLowerCase()) && !KNOWN_BARBERS.includes(booked[1].toLowerCase())) {
      return capitalise(booked[1]);
    }
  }

  // 4. First plausible capitalised word in early user messages
  for (const msg of userMsgs.slice(0, 5)) {
    const words = msg.message.match(/\b[A-ZΑ-Ω][a-zα-ω]{2,20}\b/g) ?? [];
    for (const w of words) {
      if (!NON_NAMES.has(w.toLowerCase()) && !KNOWN_BARBERS.includes(w.toLowerCase()))
        return w;
    }
  }
  return "";
}

function inferBarberFromTranscript(
  transcript: { role: string; message: string }[]
): string {
  const all = transcript.map(m => m.message).join(" ").toLowerCase();
  for (const b of KNOWN_BARBERS) {
    if (new RegExp(`\\b${b}\\b`, "i").test(all)) return capitalise(b);
  }
  return "";
}

function capitalise(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}

// ── Try to extract field values from data_collection_results ─────────────────
function extractField(
  dcr: Record<string, { value?: string }> | undefined,
  ...keys: string[]
): string {
  if (!dcr) return "";
  for (const k of keys) {
    const val = dcr[k]?.value?.trim();
    if (val && !["n/a","null","undefined","none",""].includes(val.toLowerCase())) return val;
  }
  return "";
}

// ── Parse Greek/English date strings into "DD/MM" ─────────────────────────────
function normalizeDate(raw: string): string {
  if (!raw) return "";
  if (/^\d{1,2}\/\d{1,2}/.test(raw)) return raw.slice(0, 5);
  if (/^\d{4}-\d{2}-\d{2}/.test(raw)) {
    const [, m, d] = raw.split("-");
    return `${d}/${m}`;
  }
  return raw;
}

// ── Main route ────────────────────────────────────────────────────────────────
export async function GET() {
  const EL_KEY = process.env.ELEVENLABS_API_KEY;
  if (!EL_KEY) return NextResponse.json({ bookings: [] });

  try {
    const convsRes = await fetch(
      `${BASE}/convai/conversations?agent_id=${AGENT_ID}&page_size=50`,
      { headers: { "xi-api-key": EL_KEY }, cache: "no-store" }
    );
    if (!convsRes.ok) return NextResponse.json({ bookings: [] });

    const convsData = await convsRes.json();
    const allConvs: {
      conversation_id: string;
      status: string;
      start_time_unix_secs: number;
      call_duration_secs: number;
      message_count: number;
    }[] = convsData.conversations ?? [];

    const toEnrich = allConvs.slice(0, 10);

    const details = await Promise.all(
      toEnrich.map(c =>
        fetch(`${BASE}/convai/conversations/${c.conversation_id}`, {
          headers: { "xi-api-key": EL_KEY },
          cache: "no-store",
        })
          .then(r => (r.ok ? r.json() : null))
          .catch(() => null)
      )
    );

    const bookings = toEnrich.map((conv, i) => {
      const detail = details[i];
      type DCR = Record<string, { value?: string }>;
      const dcr: DCR | undefined = detail?.analysis?.data_collection_results;
      const summary: string = detail?.analysis?.transcript_summary ?? "";
      const transcript: { role: string; message: string; time_in_call_secs: number }[] =
        detail?.transcript ?? [];

      // Separate user vs agent messages and build text corpora
      const userText   = transcript.filter(m => m.role === "user").map(m => m.message).join(" ");
      const fullText   = transcript.map(m => m.message).join(" ");

      // ── Client name ──────────────────────────────────────────────────────
      const clientName =
        extractField(dcr, "client_name", "customer_name", "name", "caller_name") ||
        inferNameFromTranscript(transcript, summary);

      // ── Service ──────────────────────────────────────────────────────────
      // Priority: structured data → summary (most accurate, describes actual booking)
      //           → user messages only (avoids AI upsell false positives) → all text
      const service =
        extractField(dcr, "service", "service_type", "requested_service", "haircut_type") ||
        detectService(summary) ||
        detectService(userText) ||
        detectService(fullText);

      // ── Barber ───────────────────────────────────────────────────────────
      const barber =
        extractField(dcr, "barber", "barber_name", "preferred_barber", "stylist") ||
        inferBarberFromTranscript(transcript);

      // ── Date ─────────────────────────────────────────────────────────────
      // Summary often states the confirmed date; user text states the requested date.
      const rawDate =
        extractField(dcr, "appointment_date", "date", "booking_date") ||
        extractDate(summary) ||
        extractDate(userText) ||
        extractDate(fullText);

      // ── Time ─────────────────────────────────────────────────────────────
      const rawTime =
        extractField(dcr, "appointment_time", "time", "booking_time") ||
        extractTime(summary) ||
        extractTime(userText) ||
        extractTime(fullText);

      // ── Fallbacks from call timestamp ────────────────────────────────────
      const callDate = new Date(conv.start_time_unix_secs * 1000);
      const fallbackDate = callDate.toLocaleDateString("el-GR", { day: "2-digit", month: "2-digit" });
      const fallbackTime = callDate.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });

      const isLive = conv.status === "in-progress" || conv.status === "processing";

      return {
        conversation_id:      conv.conversation_id,
        source:               "ai-call",
        status:               isLive ? "in-progress" : "confirmed",
        client_name:          clientName || "Client",
        service:              service || "—",
        barber:               barber || "TBD",
        date:                 normalizeDate(rawDate) || fallbackDate,
        time:                 rawTime || fallbackTime,
        price:                0,
        duration_secs:        conv.call_duration_secs,
        start_time_unix_secs: conv.start_time_unix_secs,
        message_count:        conv.message_count,
        summary,
        call_status:          conv.status,
      };
    });

    return NextResponse.json({ bookings });
  } catch {
    return NextResponse.json({ bookings: [] });
  }
}

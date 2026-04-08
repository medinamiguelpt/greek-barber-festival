import { NextResponse } from "next/server";

const AGENT_ID = "agent_5001kjkkjvs6e7fs5t5fkjh1hhwc";
const BASE = "https://api.elevenlabs.io/v1";

export async function GET() {
  const EL_KEY = process.env.ELEVENLABS_API_KEY;

  if (!EL_KEY) {
    return NextResponse.json({ error: "ELEVENLABS_API_KEY not set" }, { status: 500 });
  }

  try {
    const [agentRes, convsRes] = await Promise.all([
      fetch(`${BASE}/convai/agents/${AGENT_ID}`, {
        headers: { "xi-api-key": EL_KEY },
        cache: "no-store",
      }),
      fetch(`${BASE}/convai/conversations?agent_id=${AGENT_ID}&page_size=100`, {
        headers: { "xi-api-key": EL_KEY },
        cache: "no-store",
      }),
    ]);

    if (!agentRes.ok) {
      const err = await agentRes.text();
      return NextResponse.json({ error: `ElevenLabs agent error: ${err}` }, { status: agentRes.status });
    }

    const agentText = await agentRes.text();
    const convsText = convsRes.ok ? await convsRes.text() : "{}";
    const agentData = JSON.parse(Buffer.from(agentText).toString("utf8"));
    const convsData = convsRes.ok ? JSON.parse(Buffer.from(convsText).toString("utf8")) : {};

    const languagePresets = agentData?.conversation_config?.language_presets ?? {};
    const defaultLang = agentData?.conversation_config?.agent?.language ?? "el";
    const allLangs = Array.from(new Set([defaultLang, ...Object.keys(languagePresets)]));

    const allConvs: {
      conversation_id: string;
      status: string;
      start_time_unix_secs: number;
      call_duration_secs: number;
      message_count: number;
    }[] = convsData.conversations ?? [];

    // Compute real 7-day call count from actual conversation timestamps
    const sevenDaysAgo = Math.floor(Date.now() / 1000) - 7 * 86400;
    const real7dCount = allConvs.filter(c => c.start_time_unix_secs > sevenDaysAgo).length;

    // Check for active call
    const hasLiveCall = allConvs.some(
      c => c.status === "in-progress" || c.status === "processing"
    );

    return NextResponse.json({
      agent: {
        id: agentData.agent_id ?? AGENT_ID,
        name: agentData.name ?? "Kostas",
        language: defaultLang,
        languages: allLangs,
        llm: agentData?.conversation_config?.agent?.prompt?.llm ?? "gemini-2.5-flash",
        voice_id: agentData?.conversation_config?.tts?.voice_id ?? "",
        last_7_day_call_count: real7dCount,
        status: "active",
      },
      conversations: allConvs,
      total_conversations: allConvs.length,
      has_live_call: hasLiveCall,
    });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

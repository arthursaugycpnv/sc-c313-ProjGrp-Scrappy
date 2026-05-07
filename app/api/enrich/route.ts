import { NextRequest, NextResponse } from "next/server";
import { enrichBatch } from "@/lib/ai";
import type { Prospect } from "@/lib/places";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const prospects = body.prospects as Prospect[] | undefined;

    if (!prospects || !Array.isArray(prospects) || prospects.length === 0) {
      return NextResponse.json(
        { error: "Paramètre 'prospects' requis (array)" },
        { status: 400 }
      );
    }

    // Garde-fou : on évite d'enrichir > 30 leads à la fois pour éviter
    // les timeouts et limiter les coûts.
    const limited = prospects.slice(0, 30);

    const enriched = await enrichBatch(limited);
    return NextResponse.json({ count: enriched.length, enriched });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erreur inconnue";
    console.error("[/api/enrich] error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

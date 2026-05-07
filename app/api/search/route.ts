import { NextRequest, NextResponse } from "next/server";
import { searchProspects } from "@/lib/places";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const query = String(body.query ?? "").trim();
    const city = String(body.city ?? "").trim();
    const radiusKm = Number(body.radiusKm ?? 10);
    const noWebsiteOnly = body.noWebsiteOnly !== false;

    if (!query || !city) {
      return NextResponse.json(
        { error: "Paramètres requis: query, city" },
        { status: 400 }
      );
    }

    const prospects = await searchProspects({
      query,
      city,
      radiusKm,
      noWebsiteOnly,
    });

    return NextResponse.json({
      count: prospects.length,
      prospects,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erreur inconnue";
    console.error("[/api/search] error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

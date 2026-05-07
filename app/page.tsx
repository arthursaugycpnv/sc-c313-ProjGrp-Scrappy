"use client";

import { useMemo, useState } from "react";

type Prospect = {
  id: string;
  name: string;
  category: string;
  address: string;
  phone: string | null;
  rating: number | null;
  reviewCount: number;
  googleMapsUrl: string;
  hasWebsite: boolean;
};

type EnrichedProspect = Prospect & {
  score: number;
  reasoning: string;
  outreach: string;
};

export default function Home() {
  const [query, setQuery] = useState("plombier");
  const [city, setCity] = useState("Lyon");
  const [radius, setRadius] = useState(10);

  const [prospects, setProspects] = useState<Prospect[]>([]);
  const [enriched, setEnriched] = useState<EnrichedProspect[]>([]);

  const [isSearching, setIsSearching] = useState(false);
  const [isEnriching, setIsEnriching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const list = useMemo<EnrichedProspect[] | Prospect[]>(
    () => (enriched.length > 0 ? enriched : prospects),
    [enriched, prospects]
  );
  const isEnrichedView = enriched.length > 0;

  async function runSearch() {
    setError(null);
    setEnriched([]);
    setIsSearching(true);
    try {
      const res = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, city, radiusKm: radius, noWebsiteOnly: true }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Erreur recherche");
      setProspects(data.prospects ?? []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur");
    } finally {
      setIsSearching(false);
    }
  }

  async function runEnrich() {
    if (prospects.length === 0) return;
    setError(null);
    setIsEnriching(true);
    try {
      const res = await fetch("/api/enrich", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prospects }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Erreur enrichissement");
      setEnriched(data.enriched ?? []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur");
    } finally {
      setIsEnriching(false);
    }
  }

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text).catch(() => {});
  }

  function exportCsv() {
    if (list.length === 0) return;
    const headers = isEnrichedView
      ? ["score", "name", "category", "address", "phone", "rating", "reviewCount", "googleMapsUrl", "outreach"]
      : ["name", "category", "address", "phone", "rating", "reviewCount", "googleMapsUrl"];

    const escape = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;
    const rows = list.map((p) =>
      headers.map((h) => escape((p as Record<string, unknown>)[h])).join(",")
    );
    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `prospects-${query}-${city}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Prospect Finder <span className="text-brand-500">·</span>
        </h1>
        <p className="mt-1 text-slate-600">
          Trouve des entreprises sur Google Maps qui n'ont pas (encore) de site web.
        </p>
      </header>

      <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <Field label="Métier / mot-clé">
            <input
              className="input"
              placeholder="plombier, restaurant, coiffeur…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </Field>
          <Field label="Ville">
            <input
              className="input"
              placeholder="Lyon"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </Field>
          <Field label={`Rayon : ${radius} km`}>
            <input
              type="range"
              min={1}
              max={50}
              value={radius}
              onChange={(e) => setRadius(Number(e.target.value))}
              className="w-full accent-brand-500"
            />
          </Field>
          <div className="flex items-end">
            <button
              onClick={runSearch}
              disabled={isSearching || !query || !city}
              className="btn-primary w-full"
            >
              {isSearching ? "Recherche…" : "Chercher des prospects"}
            </button>
          </div>
        </div>

        {error && (
          <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700 ring-1 ring-red-200">
            {error}
          </div>
        )}
      </section>

      {prospects.length > 0 && (
        <section className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
          <div className="text-sm text-slate-700">
            <strong>{prospects.length}</strong> prospect(s) sans site web
            {isEnrichedView && (
              <span className="ml-2 rounded-full bg-emerald-100 px-2 py-0.5 text-xs text-emerald-700">
                IA appliquée — triés par score
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {!isEnrichedView && (
              <button
                onClick={runEnrich}
                disabled={isEnriching}
                className="btn-secondary"
              >
                {isEnriching ? "Enrichissement IA…" : "✨ Enrichir avec l'IA"}
              </button>
            )}
            <button onClick={exportCsv} className="btn-secondary">
              📥 Export CSV
            </button>
          </div>
        </section>
      )}

      <section className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        {list.map((p) => {
          const e = isEnrichedView ? (p as EnrichedProspect) : null;
          return (
            <article
              key={p.id}
              className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">{p.name}</h3>
                  <div className="mt-1 text-xs uppercase tracking-wide text-slate-500">
                    {p.category}
                  </div>
                </div>
                {e && <ScoreBadge score={e.score} />}
              </div>

              <div className="mt-3 space-y-1 text-sm text-slate-600">
                <div>📍 {p.address}</div>
                {p.phone && <div>📞 {p.phone}</div>}
                <div>
                  ⭐ {p.rating ?? "—"} ({p.reviewCount} avis)
                </div>
                <a
                  href={p.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block text-brand-600 hover:underline"
                >
                  Voir sur Google Maps →
                </a>
              </div>

              {e && (
                <div className="mt-4 border-t border-slate-100 pt-4">
                  <div className="text-xs italic text-slate-500">{e.reasoning}</div>
                  <div className="mt-3 rounded-lg bg-slate-50 p-3 text-sm whitespace-pre-wrap text-slate-700 ring-1 ring-slate-100">
                    {e.outreach}
                  </div>
                  <button
                    onClick={() => copyToClipboard(e.outreach)}
                    className="mt-3 text-xs font-medium text-brand-600 hover:underline"
                  >
                    📋 Copier le message
                  </button>
                </div>
              )}
            </article>
          );
        })}
      </section>

      {prospects.length === 0 && !isSearching && (
        <div className="mt-12 rounded-2xl bg-white p-10 text-center text-slate-500 shadow-sm ring-1 ring-slate-200">
          Lance une recherche pour voir les prospects 🚀
        </div>
      )}

      <style jsx global>{`
        .input {
          width: 100%;
          border-radius: 0.5rem;
          border: 1px solid rgb(226 232 240);
          background: white;
          padding: 0.5rem 0.75rem;
          font-size: 0.875rem;
          color: rgb(15 23 42);
          outline: none;
        }
        .input:focus {
          border-color: rgb(14 165 233);
          box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.15);
        }
        .btn-primary {
          background: rgb(14 165 233);
          color: white;
          font-weight: 600;
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          font-size: 0.875rem;
          transition: background 0.15s;
        }
        .btn-primary:hover:not(:disabled) {
          background: rgb(2 132 199);
        }
        .btn-primary:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .btn-secondary {
          background: white;
          border: 1px solid rgb(226 232 240);
          color: rgb(15 23 42);
          font-weight: 500;
          padding: 0.5rem 0.875rem;
          border-radius: 0.5rem;
          font-size: 0.875rem;
        }
        .btn-secondary:hover:not(:disabled) {
          background: rgb(248 250 252);
        }
        .btn-secondary:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>
    </main>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-slate-700">{label}</span>
      {children}
    </label>
  );
}

function ScoreBadge({ score }: { score: number }) {
  const color =
    score >= 75
      ? "bg-emerald-100 text-emerald-700"
      : score >= 50
      ? "bg-amber-100 text-amber-700"
      : "bg-slate-100 text-slate-600";
  return (
    <div
      className={`flex h-12 w-12 flex-col items-center justify-center rounded-full text-sm font-bold ${color}`}
      title="Score IA (0-100)"
    >
      {score}
    </div>
  );
}

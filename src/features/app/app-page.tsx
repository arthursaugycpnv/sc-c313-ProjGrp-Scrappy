"use client";

import { useMemo, useState } from "react";

import { Card } from "@/components/ui/card";

import type { Locale } from "@/i18n/routing";

import type { KanbanStatus } from "./lead-types";
import { useLeadStore } from "./lead-store";
import { leadsToCsv, downloadTextFile } from "./export";
import { KanbanBoard } from "./kanban-board";
import { LeadTable } from "./lead-table";
import { mockSearchProspects } from "./mock-search";

const tabDefs = [
  { id: "search", label: "1. Prospects" },
  { id: "scoring", label: "2. Scoring" },
  { id: "contacts", label: "3. Contacts" },
  { id: "kanban", label: "4. Kanban" },
] as const;

type TabId = (typeof tabDefs)[number]["id"];

export function AppPage({ locale }: { locale: Locale }) {
  const { leads, addLeads, moveLead, removeLead, clearAll } = useLeadStore();
  const [tab, setTab] = useState<TabId>("search");

  const [activityType, setActivityType] = useState("plombier");
  const [region, setRegion] = useState("Lausanne");
  const [targetCount, setTargetCount] = useState(50);
  const [loading, setLoading] = useState(false);

  const hasContacts = useMemo(
    () => leads.some((l) => l.contact.email || l.contact.phone),
    [leads],
  );

  const exportCsv = () => {
    const csv = leadsToCsv(leads);
    downloadTextFile(`leads-${locale}.csv`, csv, "text/csv;charset=utf-8");
  };

  const doSearch = async () => {
    setLoading(true);
    try {
      const results = await mockSearchProspects({
        activityType,
        region,
        targetCount,
      });
      addLeads(results);
      setTab("scoring");
    } finally {
      setLoading(false);
    }
  };

  const onMove = (id: string, status: KanbanStatus) => moveLead(id, status);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">
          Dashboard — Prospection & Lead Tracker
        </h1>
        <p className="text-sm text-[rgb(var(--foreground))]/70">
          Version MVP locale (sans API): recherche simulée, scoring, contacts,
          export CSV, kanban.
        </p>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {tabDefs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={
              tab === t.id
                ? "h-10 rounded-full bg-foreground px-4 text-sm font-medium text-background"
                : "h-10 rounded-full border border-[rgb(var(--border))] px-4 text-sm hover:bg-white/5"
            }
          >
            {t.label}
          </button>
        ))}

        <div className="ml-auto flex flex-wrap gap-2">
          <button
            className="h-10 rounded-full border border-[rgb(var(--border))] px-4 text-sm hover:bg-white/5"
            onClick={exportCsv}
            disabled={leads.length === 0}
          >
            Export CSV
          </button>
          <button
            className="h-10 rounded-full border border-[rgb(var(--border))] px-4 text-sm hover:bg-white/5"
            onClick={clearAll}
            disabled={leads.length === 0}
          >
            Tout effacer
          </button>
        </div>
      </div>

      {tab === "search" ? (
        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Card className="p-4 lg:col-span-1">
            <div className="text-sm font-medium">Recherche automatique</div>
            <div className="mt-1 text-xs text-[rgb(var(--foreground))]/60">
              Source cible: Google Maps (mock). 50–100 résultats.
            </div>

            <div className="mt-4 flex flex-col gap-3">
              <label className="text-xs text-[rgb(var(--foreground))]/60">
                Type d’activité
                <input
                  value={activityType}
                  onChange={(e) => setActivityType(e.target.value)}
                  className="mt-1 h-10 w-full rounded-xl border border-[rgb(var(--border))] bg-transparent px-3 text-sm"
                />
              </label>

              <label className="text-xs text-[rgb(var(--foreground))]/60">
                Zone géographique
                <input
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="mt-1 h-10 w-full rounded-xl border border-[rgb(var(--border))] bg-transparent px-3 text-sm"
                />
              </label>

              <label className="text-xs text-[rgb(var(--foreground))]/60">
                Volume cible (50–100)
                <input
                  type="number"
                  min={50}
                  max={100}
                  value={targetCount}
                  onChange={(e) => setTargetCount(Number(e.target.value))}
                  className="mt-1 h-10 w-full rounded-xl border border-[rgb(var(--border))] bg-transparent px-3 text-sm"
                />
              </label>

              <button
                className="mt-2 h-11 rounded-full bg-foreground px-4 text-sm font-medium text-background disabled:opacity-60"
                onClick={doSearch}
                disabled={loading}
              >
                {loading ? "Recherche…" : "Lancer la recherche"}
              </button>
            </div>
          </Card>

          <div className="lg:col-span-2">
            <LeadTable leads={leads} onMove={onMove} onRemove={removeLead} />
          </div>
        </div>
      ) : null}

      {tab === "scoring" ? (
        <div className="mt-6">
          <LeadTable leads={leads} onMove={onMove} onRemove={removeLead} />
        </div>
      ) : null}

      {tab === "contacts" ? (
        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Card className="p-4 lg:col-span-1">
            <div className="text-sm font-medium">Données de contact</div>
            <div className="mt-1 text-xs text-[rgb(var(--foreground))]/60">
              Extraction: téléphone, email, URL, adresse. Enrichissement:
              (placeholder).
            </div>

            <div className="mt-4 flex flex-col gap-2 text-sm">
              <div>Leads: {leads.length}</div>
              <div>
                Leads avec contact: {hasContacts ? "Oui" : "Non (mock limité)"}
              </div>
              <button
                className="mt-2 h-10 rounded-full bg-foreground px-4 text-sm font-medium text-background disabled:opacity-60"
                onClick={exportCsv}
                disabled={leads.length === 0}
              >
                Export CSV (1 clic)
              </button>
            </div>
          </Card>

          <div className="lg:col-span-2">
            <LeadTable leads={leads} onMove={onMove} onRemove={removeLead} />
          </div>
        </div>
      ) : null}

      {tab === "kanban" ? (
        <div className="mt-6">
          <KanbanBoard leads={leads} onMove={onMove} />
        </div>
      ) : null}
    </main>
  );
}

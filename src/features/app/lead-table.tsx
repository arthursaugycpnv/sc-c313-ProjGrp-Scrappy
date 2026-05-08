"use client";

import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import type { KanbanStatus, Lead } from "./lead-types";
import { kanbanStatuses } from "./lead-types";
import { scoreToColor } from "./scoring";

export function LeadTable({
  leads,
  onMove,
  onRemove,
}: {
  leads: Lead[];
  onMove: (id: string, status: KanbanStatus) => void;
  onRemove: (id: string) => void;
}) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return leads;
    const q = query.trim().toLowerCase();
    return leads.filter((l) =>
      [l.name, l.category, l.location, l.contact.email, l.contact.phone]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(q)),
    );
  }, [leads, query]);

  return (
    <Card className="p-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col">
          <div className="text-sm font-medium">Leads ({filtered.length})</div>
          <div className="text-xs text-[rgb(var(--foreground))]/60">
            Recherche rapide, scoring, contact, et statut kanban.
          </div>
        </div>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Filtrer (nom, email, catégorie, lieu…)"
          className="h-10 w-full md:w-96 rounded-xl border border-[rgb(var(--border))] bg-transparent px-3 text-sm"
        />
      </div>

      <div className="mt-4 overflow-auto">
        <table className="w-full min-w-[1000px] text-sm">
          <thead>
            <tr className="text-left text-[rgb(var(--foreground))]/60">
              <th className="py-2 pr-4">Entreprise</th>
              <th className="py-2 pr-4">Catégorie</th>
              <th className="py-2 pr-4">Lieu</th>
              <th className="py-2 pr-4">Avis</th>
              <th className="py-2 pr-4">Score</th>
              <th className="py-2 pr-4">Contact</th>
              <th className="py-2 pr-4">Kanban</th>
              <th className="py-2 pr-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((l) => {
              const score = l.score ?? 0;
              const color = scoreToColor(score);
              return (
                <tr key={l.id} className="border-t border-[rgb(var(--border))]">
                  <td className="py-3 pr-4">
                    <div className="font-medium">{l.name}</div>
                    <div className="text-xs text-[rgb(var(--foreground))]/60">
                      {l.contact.websiteUrl ? (
                        <a
                          href={l.contact.websiteUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="underline"
                        >
                          {l.contact.websiteUrl}
                        </a>
                      ) : (
                        "Pas de site"
                      )}
                    </div>
                  </td>
                  <td className="py-3 pr-4">{l.category}</td>
                  <td className="py-3 pr-4">{l.location}</td>
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-2">
                      <Badge>{l.googleRating?.toFixed(1) ?? "—"}★</Badge>
                      <span className="text-xs text-[rgb(var(--foreground))]/60">
                        {l.reviewCount ?? 0} avis
                      </span>
                    </div>
                  </td>
                  <td className="py-3 pr-4">
                    <Badge
                      className={cn(
                        color === "green" &&
                          "bg-emerald-500/15 text-emerald-300",
                        color === "orange" && "bg-amber-500/15 text-amber-300",
                        color === "red" && "bg-rose-500/15 text-rose-300",
                      )}
                    >
                      {score}%
                    </Badge>
                  </td>

                  <td className="py-3 pr-4 text-xs">
                    <div>{l.contact.phone ?? "—"}</div>
                    <div>{l.contact.email ?? "—"}</div>
                  </td>

                  <td className="py-3 pr-4">
                    <select
                      value={l.kanbanStatus ?? "Nouveau"}
                      onChange={(e) =>
                        onMove(l.id, e.target.value as KanbanStatus)
                      }
                      className="h-9 rounded-xl border border-[rgb(var(--border))] bg-transparent px-2 text-sm"
                    >
                      {kanbanStatuses.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>

                  <td className="py-3 pr-4">
                    <button
                      className="h-9 rounded-xl border border-[rgb(var(--border))] px-3 text-sm hover:bg-white/5"
                      onClick={() => onRemove(l.id)}
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              );
            })}

            {filtered.length === 0 ? (
              <tr>
                <td
                  className="py-8 text-center text-[rgb(var(--foreground))]/60"
                  colSpan={8}
                >
                  Aucun lead.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

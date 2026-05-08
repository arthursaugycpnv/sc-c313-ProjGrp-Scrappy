"use client";

import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import type { KanbanStatus, Lead } from "./lead-types";
import { kanbanStatuses } from "./lead-types";
import { scoreToColor } from "./scoring";

export type SortKey =
  | "name"
  | "address"
  | "phone"
  | "category"
  | "location"
  | "rating"
  | "score"
  | "kanban";

export type SortDir = "asc" | "desc";

function compareText(a: string, b: string) {
  return a.localeCompare(b, undefined, { sensitivity: "base" });
}

function nextSort(
  current: { key: SortKey; dir: SortDir } | null,
  key: SortKey,
): { key: SortKey; dir: SortDir } {
  if (!current || current.key !== key) return { key, dir: "asc" };
  return { key, dir: current.dir === "asc" ? "desc" : "asc" };
}

function SortTh({
  k,
  sort,
  setSort,
  children,
  className,
}: {
  k: SortKey;
  sort: null | { key: SortKey; dir: SortDir };
  setSort: React.Dispatch<
    React.SetStateAction<null | { key: SortKey; dir: SortDir }>
  >;
  children: React.ReactNode;
  className?: string;
}) {
  const active = sort?.key === k;
  const arrow = active ? (sort?.dir === "asc" ? "▲" : "▼") : "";
  return (
    <th className={cn("py-2 pr-4", className)}>
      <button
        type="button"
        onClick={() => setSort((s) => nextSort(s, k))}
        className={cn(
          "inline-flex items-center gap-2 hover:text-[rgb(var(--foreground))]",
          active && "text-[rgb(var(--foreground))]",
        )}
        aria-label={`Trier par ${String(children)}`}
      >
        <span>{children}</span>
        <span className="text-[10px] opacity-70">{arrow}</span>
      </button>
    </th>
  );
}

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
  const [sort, setSort] = useState<null | { key: SortKey; dir: SortDir }>(null);

  const filtered = useMemo(() => {
    if (!query.trim()) return leads;
    const q = query.trim().toLowerCase();
    return leads.filter((l) =>
      [l.name, l.category, l.location, l.contact.email, l.contact.phone]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(q)),
    );
  }, [leads, query]);

  const sorted = useMemo(() => {
    if (!sort) return filtered;

    const dir = sort.dir === "asc" ? 1 : -1;
    const get = (l: Lead): string | number => {
      switch (sort.key) {
        case "name":
          return l.name ?? "";
        case "category":
          return l.category ?? "";
        case "location":
          return l.location ?? "";
        case "address":
          return l.contact.address ?? "";
        case "phone":
          return l.contact.phone ?? "";
        case "rating":
          return l.googleRating ?? -1;
        case "score":
          return l.score ?? 0;
        case "kanban":
          return l.kanbanStatus ?? "Nouveau";
        default:
          return "";
      }
    };

    return [...filtered].sort((a, b) => {
      const av = get(a);
      const bv = get(b);
      if (typeof av === "number" && typeof bv === "number") return (av - bv) * dir;
      return compareText(String(av), String(bv)) * dir;
    });
  }, [filtered, sort]);

  return (
    <Card className="p-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col">
          <div className="text-sm font-medium">Leads ({sorted.length})</div>
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
              <SortTh k="name" sort={sort} setSort={setSort}>
                Nom
              </SortTh>
              <SortTh k="address" sort={sort} setSort={setSort}>
                Adresse
              </SortTh>
              <SortTh k="phone" sort={sort} setSort={setSort}>
                Téléphone
              </SortTh>
              <SortTh k="category" sort={sort} setSort={setSort}>
                Catégorie
              </SortTh>
              <SortTh k="location" sort={sort} setSort={setSort}>
                Zone
              </SortTh>
              <SortTh k="rating" sort={sort} setSort={setSort}>
                Avis
              </SortTh>
              <SortTh k="score" sort={sort} setSort={setSort}>
                Score
              </SortTh>
              <SortTh k="kanban" sort={sort} setSort={setSort}>
                Kanban
              </SortTh>
              <th className="py-2 pr-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((l) => {
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
                          Site
                        </a>
                      ) : (
                        "—"
                      )}
                      {l.contact.email ? (
                        <span className="ml-2">{l.contact.email}</span>
                      ) : null}
                    </div>
                  </td>

                  <td className="py-3 pr-4 text-xs">
                    {l.contact.address ?? "—"}
                  </td>

                  <td className="py-3 pr-4 text-xs">
                    {l.contact.phone ?? "—"}
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
                  colSpan={9}
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

"use client";

import { useMemo } from "react";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import type { KanbanStatus, Lead } from "./lead-types";
import { kanbanStatuses } from "./lead-types";
import { scoreToColor } from "./scoring";

export function KanbanBoard({
  leads,
  onMove,
}: {
  leads: Lead[];
  onMove: (id: string, status: KanbanStatus) => void;
}) {
  const grouped = useMemo(() => {
    const map = new Map<KanbanStatus, Lead[]>();
    for (const s of kanbanStatuses) map.set(s, []);
    for (const l of leads) {
      const s = (l.kanbanStatus ?? "Nouveau") as KanbanStatus;
      map.get(s)?.push(l);
    }
    return map;
  }, [leads]);

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
      {kanbanStatuses.map((status) => {
        const items = grouped.get(status) ?? [];
        return (
          <Card key={status} className="p-3">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">{status}</div>
              <div className="text-xs text-[rgb(var(--foreground))]/60">
                {items.length}
              </div>
            </div>

            <div className="mt-3 flex flex-col gap-2">
              {items.map((l) => {
                const score = l.score ?? 0;
                const color = scoreToColor(score);
                return (
                  <div
                    key={l.id}
                    className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--background))]/40 p-2"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="text-sm font-medium leading-tight">
                          {l.name}
                        </div>
                        <div className="text-xs text-[rgb(var(--foreground))]/60">
                          {l.category} • {l.location}
                        </div>
                      </div>
                      <div
                        className={cn(
                          "shrink-0 rounded-full px-2 py-1 text-xs",
                          color === "green" &&
                            "bg-emerald-500/15 text-emerald-300",
                          color === "orange" &&
                            "bg-amber-500/15 text-amber-300",
                          color === "red" && "bg-rose-500/15 text-rose-300",
                        )}
                      >
                        {score}%
                      </div>
                    </div>

                    <div className="mt-2 flex flex-wrap gap-2">
                      {kanbanStatuses
                        .filter((s) => s !== status)
                        .map((s) => (
                          <button
                            key={s}
                            className="h-8 rounded-full border border-[rgb(var(--border))] px-3 text-xs hover:bg-white/5"
                            onClick={() => onMove(l.id, s)}
                          >
                            → {s}
                          </button>
                        ))}
                    </div>
                  </div>
                );
              })}

              {items.length === 0 ? (
                <div className="py-6 text-center text-xs text-[rgb(var(--foreground))]/60">
                  Aucun prospect
                </div>
              ) : null}
            </div>
          </Card>
        );
      })}
    </div>
  );
}

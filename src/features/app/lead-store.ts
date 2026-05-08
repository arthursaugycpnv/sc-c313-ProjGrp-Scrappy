"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import type { KanbanStatus, Lead } from "./lead-types";
import { kanbanStatuses } from "./lead-types";
import { scoreLeadFromLead } from "./scoring";

const STORAGE_KEY = "scrappy.leads.v1";

type StoreState = {
  leads: Lead[];
};

function readStorage(): StoreState {
  if (typeof window === "undefined") return { leads: [] };
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return { leads: [] };
  try {
    const parsed = JSON.parse(raw) as StoreState;
    if (!Array.isArray(parsed.leads)) return { leads: [] };
    return { leads: parsed.leads };
  } catch {
    return { leads: [] };
  }
}

function writeStorage(state: StoreState) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function withDerivedFields(lead: Lead): Lead {
  const score = scoreLeadFromLead(lead);
  return {
    ...lead,
    score,
    kanbanStatus: lead.kanbanStatus ?? "Nouveau",
  };
}

export function useLeadStore() {
  const [state, setState] = useState<StoreState>(() => readStorage());

  useEffect(() => {
    // Ensure derived fields are present for legacy entries.
    setState((s) => ({ leads: s.leads.map(withDerivedFields) }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    writeStorage(state);
  }, [state]);

  const leads = useMemo(
    () => state.leads.map(withDerivedFields),
    [state.leads],
  );

  const addLeads = useCallback((newLeads: Lead[]) => {
    setState((s) => {
      const byId = new Map(s.leads.map((l) => [l.id, l] as const));
      for (const l of newLeads) byId.set(l.id, withDerivedFields(l));
      return { leads: Array.from(byId.values()) };
    });
  }, []);

  const updateLead = useCallback((id: string, patch: Partial<Lead>) => {
    setState((s) => ({
      leads: s.leads.map((l) =>
        l.id === id ? withDerivedFields({ ...l, ...patch }) : l,
      ),
    }));
  }, []);

  const moveLead = useCallback(
    (id: string, status: KanbanStatus) => {
      if (!kanbanStatuses.includes(status)) return;
      updateLead(id, { kanbanStatus: status });
    },
    [updateLead],
  );

  const removeLead = useCallback((id: string) => {
    setState((s) => ({ leads: s.leads.filter((l) => l.id !== id) }));
  }, []);

  const clearAll = useCallback(() => setState({ leads: [] }), []);

  return {
    leads,
    addLeads,
    updateLead,
    moveLead,
    removeLead,
    clearAll,
  };
}

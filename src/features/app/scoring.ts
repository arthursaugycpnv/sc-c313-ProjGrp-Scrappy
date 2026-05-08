import type { Lead } from "./lead-types";

export type LeadSignals = {
  googleRating?: number;
  reviewCount?: number;
  hasWebsite?: boolean;
  hasPhone?: boolean;
  hasEmail?: boolean;
  // Placeholder for future: performance metrics from website audit.
  websiteFast?: boolean;
};

function clamp0to100(value: number) {
  return Math.max(0, Math.min(100, Math.round(value)));
}

/**
 * Simple, deterministic scoring based on explicit signals.
 * 0..100
 */
export function scoreLead(signals: LeadSignals): number {
  let score = 0;

  // Rating: up to 40
  if (typeof signals.googleRating === "number") {
    score += (signals.googleRating / 5) * 40;
  }

  // Reviews: up to 20 (log-ish)
  if (typeof signals.reviewCount === "number") {
    const rc = Math.max(0, signals.reviewCount);
    score += Math.min(20, Math.log10(rc + 1) * 10);
  }

  // Contact completeness: up to 25
  if (signals.hasWebsite) score += 10;
  if (signals.hasPhone) score += 10;
  if (signals.hasEmail) score += 5;

  // Site speed (if known): +/-15
  if (signals.hasWebsite && typeof signals.websiteFast === "boolean") {
    score += signals.websiteFast ? 15 : -5;
  }

  return clamp0to100(score);
}

export function deriveSignalsFromLead(lead: Lead): LeadSignals {
  return {
    googleRating: lead.googleRating,
    reviewCount: lead.reviewCount,
    hasWebsite: Boolean(lead.contact.websiteUrl),
    hasPhone: Boolean(lead.contact.phone),
    hasEmail: Boolean(lead.contact.email),
  };
}

export function scoreLeadFromLead(lead: Lead): number {
  return scoreLead(deriveSignalsFromLead(lead));
}

export function scoreToColor(score: number): "green" | "orange" | "red" {
  if (score >= 70) return "green";
  if (score >= 40) return "orange";
  return "red";
}

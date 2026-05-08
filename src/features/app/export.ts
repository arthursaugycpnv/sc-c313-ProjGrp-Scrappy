import type { Lead } from "./lead-types";

function csvEscape(value: unknown): string {
  const s = String(value ?? "");
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

export type ExportFormat = "csv";

export function leadsToCsv(leads: Lead[]): string {
  const headers = [
    "id",
    "name",
    "category",
    "location",
    "googleRating",
    "reviewCount",
    "score",
    "status",
    "phone",
    "email",
    "websiteUrl",
    "address",
    "createdAt",
  ];

  const rows = leads.map((l) => [
    l.id,
    l.name,
    l.category,
    l.location,
    l.googleRating ?? "",
    l.reviewCount ?? "",
    l.score ?? "",
    l.kanbanStatus ?? "",
    l.contact.phone ?? "",
    l.contact.email ?? "",
    l.contact.websiteUrl ?? "",
    l.contact.address ?? "",
    l.createdAt,
  ]);

  return [
    headers.map(csvEscape).join(","),
    ...rows.map((r) => r.map(csvEscape).join(",")),
  ].join("\n");
}

export function downloadTextFile(
  filename: string,
  contents: string,
  mime: string,
) {
  const blob = new Blob([contents], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

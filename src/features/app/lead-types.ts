export type LeadContact = {
  phone?: string;
  email?: string;
  websiteUrl?: string;
  address?: string;
};

export type Lead = {
  id: string;
  name: string;
  category: string;
  location: string;
  googleRating?: number; // 0..5
  reviewCount?: number;
  contact: LeadContact;
  score?: number; // 0..100
  kanbanStatus?: KanbanStatus;
  createdAt: string;
};

export const kanbanStatuses = [
  "Nouveau",
  "Contacté",
  "Intéressé",
  "Relance",
  "Conclu",
] as const;

export type KanbanStatus = (typeof kanbanStatuses)[number];

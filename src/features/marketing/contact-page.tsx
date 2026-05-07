"use client";

import { motion } from "framer-motion";
import { useLocale } from "next-intl";

import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function ContactPage() {
  const locale = useLocale() as "fr" | "en" | "de" | "it";
  const t = copy[locale];

  return (
    <div>
      <Section>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <Badge>{t.badge}</Badge>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
            {t.title}
          </h1>
          <p className="mt-4 max-w-2xl text-[rgb(var(--foreground))]/70">
            {t.subtitle}
          </p>
        </motion.div>
      </Section>

      <Section className="pt-0">
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <div className="text-sm font-semibold">{t.form.title}</div>
            <p className="mt-2 text-sm text-[rgb(var(--foreground))]/70">
              {t.form.desc}
            </p>
            <form
              className="mt-5 grid gap-3"
              onSubmit={(e) => e.preventDefault()}
            >
              <label className="grid gap-1 text-sm">
                <span className="text-[rgb(var(--foreground))]/70">
                  {t.form.name}
                </span>
                <input
                  className="h-11 rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--background))]/60 px-4"
                  placeholder={t.form.namePh}
                />
              </label>
              <label className="grid gap-1 text-sm">
                <span className="text-[rgb(var(--foreground))]/70">
                  {t.form.email}
                </span>
                <input
                  className="h-11 rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--background))]/60 px-4"
                  placeholder={t.form.emailPh}
                />
              </label>
              <label className="grid gap-1 text-sm">
                <span className="text-[rgb(var(--foreground))]/70">
                  {t.form.msg}
                </span>
                <textarea
                  className="min-h-32 rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--background))]/60 px-4 py-3"
                  placeholder={t.form.msgPh}
                />
              </label>
              <button className="mt-2 inline-flex h-11 items-center justify-center rounded-full bg-foreground px-5 text-sm font-medium text-background hover:opacity-90">
                {t.form.submit}
              </button>
              <p className="text-xs text-[rgb(var(--foreground))]/60">
                {t.form.note}
              </p>
            </form>
          </Card>

          <Card>
            <div className="text-sm font-semibold">{t.alt.title}</div>
            <p className="mt-2 text-sm text-[rgb(var(--foreground))]/70">
              {t.alt.desc}
            </p>
            <div className="mt-5 grid gap-3">
              {t.alt.items.map((it: { k: string; v: string }) => (
                <div
                  key={it.k}
                  className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--muted))] p-4"
                >
                  <div className="text-xs font-semibold uppercase tracking-wide text-[rgb(var(--foreground))]/70">
                    {it.k}
                  </div>
                  <div className="mt-1 text-sm">{it.v}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </Section>
    </div>
  );
}

const copy = {
  fr: {
    badge: "Contact",
    title: "Parlons de ta prospection",
    subtitle:
      "Dis-nous ton objectif et ton audience. On te répond avec une reco claire (et actionnable).",
    form: {
      title: "Envoyer un message",
      desc: "Formulaire placeholder (sans backend). Tu peux brancher un service (Resend, Formspree, etc.) plus tard.",
      name: "Nom",
      namePh: "Ex: Alex",
      email: "Email",
      emailPh: "alex@mail.com",
      msg: "Message",
      msgPh:
        "Ex: Je cible les plombiers sur Genève et je veux 200 leads/mois...",
      submit: "Envoyer",
      note: "Conseil: précise niche + zone + offre. On te répond plus vite.",
    },
    alt: {
      title: "Autres moyens",
      desc: "Pour les demandes pro, partenariats ou retours produit.",
      items: [
        { k: "Email", v: "hello@leadforge.ai (placeholder)" },
        { k: "Temps de réponse", v: "24–48h (jours ouvrés)" },
        { k: "Langues", v: "FR / EN / DE / IT" },
      ],
    },
  },
  en: {
    badge: "Contact",
    title: "Let’s talk about your outreach",
    subtitle:
      "Tell us your goal and audience. We’ll reply with a clear, actionable recommendation.",
    form: {
      title: "Send a message",
      desc: "Placeholder form (no backend). You can connect Resend/Formspree later.",
      name: "Name",
      namePh: "e.g. Alex",
      email: "Email",
      emailPh: "alex@mail.com",
      msg: "Message",
      msgPh: "e.g. I target plumbers in Geneva and want ~200 leads/month…",
      submit: "Send",
      note: "Tip: include niche + area + offer for faster replies.",
    },
    alt: {
      title: "Other ways",
      desc: "For partnerships, product feedback, or business inquiries.",
      items: [
        { k: "Email", v: "hello@leadforge.ai (placeholder)" },
        { k: "Response time", v: "24–48h (business days)" },
        { k: "Languages", v: "FR / EN / DE / IT" },
      ],
    },
  },
  de: {
    badge: "Kontakt",
    title: "Lass uns über deine Akquise sprechen",
    subtitle:
      "Erzähl uns Ziel und Audience. Wir antworten mit einer klaren, umsetzbaren Empfehlung.",
    form: {
      title: "Nachricht senden",
      desc: "Placeholder-Formular (ohne Backend). Später Resend/Formspree anbinden.",
      name: "Name",
      namePh: "z.B. Alex",
      email: "E-Mail",
      emailPh: "alex@mail.com",
      msg: "Nachricht",
      msgPh: "z.B. Ich targetiere Klempner in Genf und will 200 Leads/Monat…",
      submit: "Senden",
      note: "Tipp: Nische + Region + Angebot angeben.",
    },
    alt: {
      title: "Weitere Wege",
      desc: "Für Partnerschaften, Feedback oder Business-Anfragen.",
      items: [
        { k: "E-Mail", v: "hello@leadforge.ai (placeholder)" },
        { k: "Antwortzeit", v: "24–48h (Werktage)" },
        { k: "Sprachen", v: "FR / EN / DE / IT" },
      ],
    },
  },
  it: {
    badge: "Contatto",
    title: "Parliamo della tua prospezione",
    subtitle:
      "Raccontaci obiettivo e audience. Rispondiamo con una raccomandazione chiara e azionabile.",
    form: {
      title: "Invia un messaggio",
      desc: "Form placeholder (senza backend). Puoi collegare Resend/Formspree più avanti.",
      name: "Nome",
      namePh: "Es: Alex",
      email: "Email",
      emailPh: "alex@mail.com",
      msg: "Messaggio",
      msgPh: "Es: target idraulici a Ginevra e voglio 200 lead/mese…",
      submit: "Invia",
      note: "Consiglio: indica nicchia + zona + offerta.",
    },
    alt: {
      title: "Altri canali",
      desc: "Per partnership, feedback prodotto o richieste business.",
      items: [
        { k: "Email", v: "hello@leadforge.ai (placeholder)" },
        { k: "Tempo risposta", v: "24–48h (giorni lavorativi)" },
        { k: "Lingue", v: "FR / EN / DE / IT" },
      ],
    },
  },
};

import type { Metadata } from "next";
import Link from "next/link";
import type { SVGProps } from "react";
import { ArrowRightIcon, CheckIcon } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { APP_SIGNIN_LABEL, APP_SIGNIN_URL, SITE_URL } from "@/lib/site-config";
import { SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Cenník",
  description:
    "Cenník FIDO Calcul pre služby, stavebníctvo a stavebníctvo s dochádzkou. Pozrite si balíky, funkcie a porovnanie plánov.",
  alternates: {
    canonical: "/pricing",
  },
  openGraph: {
    title: "Cenník | FIDO Calcul",
    description:
      "Pozrite si ceny FIDO Calcul pre služby, stavebníctvo a stavebníctvo s dochádzkou vrátane porovnania plánov.",
    url: `${SITE_URL}/pricing`,
    images: [
      {
        url: "/assets/app-icon.jpg",
        width: 512,
        height: 512,
        alt: "Cenník FIDO Calcul",
      },
    ],
  },
  twitter: {
    title: "Cenník | FIDO Calcul",
    description:
      "Pozrite si ceny FIDO Calcul pre služby, stavebníctvo a stavebníctvo s dochádzkou vrátane porovnania plánov.",
    images: ["/assets/app-icon.jpg"],
  },
};

type Plan = {
  id: string;
  name: string;
  price: string;
  cadence: string;
  description: string;
  features: string[];
  featured?: boolean;
  comparison: {
    mode: string;
    quotes: string;
    aiQuotes: boolean;
    invoices: boolean;
    notes: boolean;
    photos: boolean;
    attendance: boolean;
  };
};

const plans: Plan[] = [
  {
    id: "free",
    name: "Free",
    price: "0 €",
    cadence: "/ mes",
    description: "Základný vstup do FIDO Calcul pre jednotlivca, ktorý si chce prostredie vyskúšať bez mesačného záväzku.",
    features: ["Základné cenové ponuky", "Poznámky k projektu", "Foto k zákazke", "1 aktívny projekt"],
    comparison: {
      mode: "Skúška / základ",
      quotes: "Základné",
      aiQuotes: false,
      invoices: false,
      notes: true,
      photos: true,
      attendance: false,
    },
  },
  {
    id: "services",
    name: "Služby a ostatné",
    price: "7,90 €",
    cadence: "/ mes",
    description: "Pre servisné, menšie a iné zákazky, kde potrebujete cenové ponuky, faktúry, poznámky a foto.",
    features: ["Cenové ponuky", "Faktúry", "Poznámky", "Foto"],
    comparison: {
      mode: "Služby a ostatné",
      quotes: "Áno",
      aiQuotes: false,
      invoices: true,
      notes: true,
      photos: true,
      attendance: false,
    },
  },
  {
    id: "construction",
    name: "Stavebníctvo",
    price: "13,90 €",
    cadence: "/ mes",
    description: "Stavebný workflow s AI cenovými ponukami, faktúrami, poznámkami a fotkami pre detailnejšie projekty.",
    features: ["AI cenové ponuky", "Faktúry", "Poznámky", "Foto"],
    featured: true,
    comparison: {
      mode: "Stavebníctvo",
      quotes: "Áno",
      aiQuotes: true,
      invoices: true,
      notes: true,
      photos: true,
      attendance: false,
    },
  },
  {
    id: "attendance",
    name: "Stavebníctvo + Dochádzka",
    price: "25,90 €",
    cadence: "/ mes",
    description: "Plný stavebný režim pre tímy, ktoré chcú AI nacenenie aj dochádzku a hodinové záznamy v jednej appke.",
    features: ["AI cenové ponuky", "Faktúry", "Poznámky a foto", "Dochádzka"],
    comparison: {
      mode: "Stavebníctvo + dochádzka",
      quotes: "Áno",
      aiQuotes: true,
      invoices: true,
      notes: true,
      photos: true,
      attendance: true,
    },
  },
];

const comparisonRows: Array<{
  label: string;
  key: keyof Plan["comparison"];
}> = [
  { label: "Režim použitia", key: "mode" },
  { label: "Cenové ponuky", key: "quotes" },
  { label: "AI cenové ponuky", key: "aiQuotes" },
  { label: "Faktúry", key: "invoices" },
  { label: "Poznámky", key: "notes" },
  { label: "Foto", key: "photos" },
  { label: "Dochádzka", key: "attendance" },
];

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function XIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="m18 6-12 12" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

function ComparisonValue({ value }: { value: string | boolean }) {
  if (typeof value === "boolean") {
    return value ? (
      <span className="inline-flex items-center justify-center text-[#2563eb]">
        <CheckIcon className="h-4 w-4" />
      </span>
    ) : (
      <span className="inline-flex items-center justify-center text-[color:var(--muted)]">
        <XIcon className="h-4 w-4" />
      </span>
    );
  }

  return <span>{value}</span>;
}

function PricingCard({ plan }: { plan: Plan }) {
  return (
    <div
      className={cn(
        "panel flex h-full flex-col rounded-[2rem] p-6 shadow-[0_24px_70px_rgba(10,10,10,0.1)] sm:p-7",
        plan.featured && "border-black/10 shadow-[0_34px_90px_rgba(59,130,246,0.18)]"
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[color:var(--muted)]">Balík</p>
          <h2 className="mt-3 font-display text-[2rem] font-black tracking-[-0.05em] text-[color:var(--foreground)]">{plan.name}</h2>
        </div>
        {plan.featured ? (
          <span className="rounded-full bg-[#2563eb] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white">
            Najčastejší
          </span>
        ) : null}
      </div>

      <div className="mt-8 flex items-end gap-2">
        <p className="font-display text-[3.25rem] font-black leading-none tracking-[-0.06em] text-[color:var(--foreground)]">{plan.price}</p>
        <p className="pb-1 text-sm text-[color:var(--muted)]">{plan.cadence}</p>
      </div>

      <p className="mt-5 min-h-[84px] text-sm leading-7 text-[color:var(--muted)]">{plan.description}</p>

      <a
        href={APP_SIGNIN_URL}
        className="mt-6 inline-flex items-center justify-center gap-3 rounded-[1rem] bg-[color:var(--foreground)] px-5 py-4 text-sm font-semibold text-[color:var(--background)] transition duration-300 hover:-translate-y-0.5"
      >
        {APP_SIGNIN_LABEL}
        <ArrowRightIcon className="h-4 w-4" />
      </a>

      <div className="mt-6 h-px bg-[color:var(--line)]" />

      <ul className="mt-6 space-y-3">
        {plan.features.map((feature) => (
          <li key={feature} className="flex gap-3 text-sm leading-7 text-[color:var(--foreground)]">
            <span className="mt-1 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-[#2563eb] text-white">
              <CheckIcon className="h-3 w-3" />
            </span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function PricingPage() {
  return (
    <SiteShell activePath="/pricing">
      <section className="section-shell pt-12 sm:pt-16 lg:pt-20">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <div className="pill">Cenník</div>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mx-auto mt-6 max-w-[12ch] font-display text-[clamp(3.4rem,7vw,6.4rem)] font-black leading-[0.92] tracking-[-0.05em] text-[color:var(--foreground)]">
              Začnite s FIDO Calcul zadarmo.
            </h1>
          </Reveal>
          <Reveal delay={150}>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[color:var(--muted)] sm:text-xl">
              Vyberte si režim podľa typu práce. Free na vstup, služby pre menšie zákazky, stavebníctvo s AI nacenením a plnú verziu s dochádzkou pre tím.
            </p>
          </Reveal>
          <Reveal delay={220}>
            <div className="mt-8 inline-flex items-center gap-1 rounded-full border border-[color:var(--line)] bg-[color:var(--panel)] p-1 shadow-[var(--shadow-soft)]">
              <span className="rounded-full bg-[color:var(--foreground)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--background)]">
                Mesačne
              </span>
              <span className="px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">Bez viazanosti</span>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-shell pt-12 lg:pt-16">
        <div className="relative">
          <div className="pointer-events-none absolute inset-x-12 top-10 h-56 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.18),transparent_70%)] blur-3xl" />
          <div className="relative grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {plans.map((plan, index) => (
              <Reveal key={plan.id} delay={index * 80}>
                <PricingCard plan={plan} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell pt-16 lg:pt-20">
        <Reveal>
          <div className="rounded-[2.2rem] border border-[color:var(--line)] bg-[color:var(--panel)] px-5 py-6 shadow-[var(--shadow-soft)] sm:px-7 sm:py-8">
            <div className="overflow-x-auto">
              <div className="min-w-[980px]">
                <div className="grid grid-cols-[1.3fr_repeat(4,minmax(0,1fr))] gap-x-6 px-2 pb-6">
                  <div className="self-end">
                    <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[color:var(--muted)]">Porovnanie</p>
                    <h2 className="mt-3 font-display text-4xl font-black tracking-[-0.05em] text-[color:var(--foreground)]">Funkcie</h2>
                  </div>

                  {plans.map((plan) => (
                    <div key={plan.id} className="flex flex-col items-start gap-3">
                      <div>
                        <p className="font-display text-[1.55rem] font-black tracking-[-0.05em] text-[color:var(--foreground)]">{plan.name}</p>
                        <p className="mt-1 text-sm text-[color:var(--muted)]">
                          {plan.price} {plan.cadence}
                        </p>
                      </div>
                      <a
                        href={APP_SIGNIN_URL}
                        className="inline-flex w-full items-center justify-center rounded-[0.95rem] bg-[color:var(--foreground)] px-4 py-3 text-sm font-semibold text-[color:var(--background)] transition duration-300 hover:-translate-y-0.5"
                      >
                        {APP_SIGNIN_LABEL}
                      </a>
                    </div>
                  ))}
                </div>

                <div className="border-t border-[color:var(--line)]">
                  {comparisonRows.map((row) => (
                    <div key={row.key} className="grid grid-cols-[1.3fr_repeat(4,minmax(0,1fr))] gap-x-6 border-b border-[color:var(--line)] px-2 py-5">
                      <div className="text-lg font-semibold text-[color:var(--foreground)]">{row.label}</div>
                      {plans.map((plan) => (
                        <div key={`${plan.id}-${row.key}`} className="flex items-center text-sm leading-7 text-[color:var(--foreground)]">
                          <ComparisonValue value={plan.comparison[row.key]} />
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="section-shell pt-16 lg:pt-20">
        <Reveal y={42}>
          <div className="panel rounded-[2rem] p-8 sm:p-10">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-[color:var(--muted)]">Ak máte väčší tím</p>
                <h2 className="mt-4 font-display text-[clamp(2.3rem,4vw,4rem)] font-black tracking-[-0.05em] text-[color:var(--foreground)]">
                  Potrebujete nasadenie pre viac ľudí?
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-8 text-[color:var(--muted)] sm:text-lg">
                  Ak chcete FIDO Calcul nastaviť pre väčší interný tím alebo potrebujete pomoc s prechodom zo starého workflow, ozvite sa a pripravíme vhodný spôsob nasadenia.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href={APP_SIGNIN_URL}
                  className="inline-flex items-center justify-center gap-3 rounded-full bg-[color:var(--foreground)] px-6 py-4 text-sm font-semibold text-[color:var(--background)] transition duration-300 hover:-translate-y-1"
                >
                  {APP_SIGNIN_LABEL}
                  <ArrowRightIcon className="h-4 w-4" />
                </a>
                <Link
                  href="/kontakt"
                  className="inline-flex items-center justify-center gap-3 rounded-full border border-[color:var(--line)] bg-[color:var(--surface)] px-6 py-4 text-sm font-semibold text-[color:var(--foreground)] transition duration-300 hover:-translate-y-1"
                >
                  Kontakt
                  <ArrowRightIcon className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </SiteShell>
  );
}

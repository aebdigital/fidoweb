"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { SVGProps } from "react";
import { ArrowRightIcon, CheckIcon } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { APP_SIGNIN_LABEL, APP_SIGNIN_URL } from "@/lib/site-config";

type Plan = {
  id: string;
  name: string;
  monthlyPrice: number;
  featured?: boolean;
  inheritedLabel: string;
  extras: string[];
  comparison: {
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
    monthlyPrice: 0,
    inheritedLabel: "Základné funkcie.",
    extras: ["1 aktívny projekt", "Základné cenové ponuky", "Poznámky k projektu", "Foto k zákazke"],
    comparison: {
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
    monthlyPrice: 7.9,
    inheritedLabel: "Všetko z Free, plus...",
    extras: ["Faktúry", "Neobmedzené projekty", "Klienti a dodávatelia", "Dokumenty v jednom toku"],
    comparison: {
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
    monthlyPrice: 13.9,
    featured: true,
    inheritedLabel: "Všetko zo Služby a ostatné, plus...",
    extras: ["AI cenové ponuky", "Miestnosti a detail projektu", "Stavebný workflow", "Presnejšie nacenenie"],
    comparison: {
      aiQuotes: true,
      invoices: true,
      notes: true,
      photos: true,
      attendance: false,
    },
  },
  {
    id: "attendance",
    name: "Dochádzka",
    monthlyPrice: 25.9,
    inheritedLabel: "Všetko zo Stavebníctva, plus...",
    extras: ["Dochádzka", "Hodinové záznamy", "Členovia tímu", "Fakturácia z odpracovaného času"],
    comparison: {
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
  { label: "Poznámky", key: "notes" },
  { label: "Foto", key: "photos" },
  { label: "Faktúry", key: "invoices" },
  { label: "AI cenové ponuky", key: "aiQuotes" },
  { label: "Dochádzka", key: "attendance" },
];

const YEARLY_FACTOR = 10 / 12;
const YEARLY_DISCOUNT_PERCENT = ((1 - YEARLY_FACTOR) * 100).toFixed(1).replace(".", ",");

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

function formatPrice(value: number) {
  if (value === 0) return "0 €";
  return `${value.toFixed(2).replace(".", ",")} €`;
}

function RollingDigit({ digit }: { digit: string }) {
  return (
    <span className="price-digit-window" style={{ ["--price-digit-offset" as string]: Number(digit) }}>
      <span
        className="price-digit-strip"
      >
        {Array.from({ length: 10 }).map((_, index) => (
          <span key={index} className="price-digit-cell">
            {index}
          </span>
        ))}
      </span>
    </span>
  );
}

function AnimatedPriceValue({ value, animate }: { value: number; animate: boolean }) {
  const formatted = value.toFixed(2).replace(".", ",");

  if (!animate) {
    return <span>{formatted} €</span>;
  }

  return (
    <span className="inline-flex items-end whitespace-nowrap">
      {formatted.split("").map((char, index) =>
        /\d/.test(char) ? (
          <RollingDigit key={index} digit={char} />
        ) : (
          <span key={index} className="px-[0.01em]">
            {char}
          </span>
        )
      )}
      <span className="ml-[0.08em]">€</span>
    </span>
  );
}

function PlanPrice({ amount, yearly }: { amount: number; yearly: boolean }) {
  const display = useMemo(() => (yearly ? amount * YEARLY_FACTOR : amount), [amount, yearly]);

  return (
    <div className="mt-3 min-h-[84px]">
      <div className="flex flex-nowrap items-end gap-2 whitespace-nowrap">
        <p className="font-display text-[3.05rem] font-extrabold leading-none  text-[color:var(--foreground)] sm:text-[3.25rem]">
          <AnimatedPriceValue value={display} animate={amount > 0} />
        </p>
        <p className="pb-1 text-sm text-[color:var(--muted)]">{amount === 0 ? "" : "/ mes"}</p>
      </div>
      {amount > 0 && yearly ? (
        <p className="mt-2 text-xs font-medium text-[color:var(--muted)]">účtované ročne</p>
      ) : (
        <div className="mt-2 h-[18px]" />
      )}
    </div>
  );
}

function PricingCard({ plan, yearly }: { plan: Plan; yearly: boolean }) {
  return (
    <div
      className={cn(
        "panel flex h-full flex-col rounded-[2rem] p-6 shadow-[0_24px_70px_rgba(10,10,10,0.1)] sm:p-7",
        plan.featured && "border-black/10 shadow-[0_34px_90px_rgba(59,130,246,0.18)]"
      )}
    >
      <div className="min-h-[138px]">
        <div className="flex items-start justify-between gap-4">
          <h2 className="max-w-[13ch] font-display text-[1.2rem] font-semibold  text-[color:var(--foreground)] sm:text-[1.3rem]">{plan.name}</h2>
          <div className="flex items-center gap-2">
            {yearly && plan.monthlyPrice > 0 ? (
              <span className="rounded-full border border-[#bfdbfe] bg-[#eff6ff] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#2563eb]">
                -{YEARLY_DISCOUNT_PERCENT} %
              </span>
            ) : null}
          </div>
        </div>

        <PlanPrice amount={plan.monthlyPrice} yearly={yearly} />
      </div>

      <Link
        href={APP_SIGNIN_URL}
        className="mt-2 inline-flex w-full items-center justify-center gap-3 rounded-[1rem] bg-[color:var(--foreground)] px-5 py-4 text-sm font-semibold text-[color:var(--background)] transition duration-300 hover:-translate-y-0.5"
      >
        {APP_SIGNIN_LABEL}
        <ArrowRightIcon className="h-4 w-4" />
      </Link>

      <div className="mt-6 h-px bg-[color:var(--line)]" />

      <p className="mt-6 text-sm font-medium text-[color:var(--muted)]">{plan.inheritedLabel}</p>

      <ul className="mt-6 space-y-3">
        {plan.extras.map((feature) => (
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

export function PricingPageClient() {
  const [yearly, setYearly] = useState(false);

  return (
    <>
      <section className="section-shell pt-10 sm:pt-12 lg:pt-14">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <div className="pill">Cenník</div>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mx-auto mt-4 max-w-[11ch] font-display text-[clamp(2.5rem,5vw,4.5rem)] font-extrabold leading-[0.96]  text-[color:var(--foreground)]">
              Vyberte si plán pre svoj typ práce.
            </h1>
          </Reveal>
          <Reveal delay={150}>
            <div className="mt-7 flex flex-col items-center gap-3">
              <div className="inline-flex items-center gap-3 rounded-full border border-[color:var(--line)] bg-[color:var(--panel)] p-1 shadow-[var(--shadow-soft)]">
                <button
                  type="button"
                  onClick={() => setYearly(false)}
                  className={cn(
                    "rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition-all duration-300",
                    !yearly
                      ? "bg-[color:var(--foreground)] text-[color:var(--background)] shadow-[0_14px_32px_rgba(10,10,10,0.16)]"
                      : "text-[color:var(--muted)]"
                  )}
                >
                  Mesačne
                </button>
                <button
                  type="button"
                  onClick={() => setYearly(true)}
                  className={cn(
                    "rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition-all duration-300",
                    yearly
                      ? "bg-[color:var(--foreground)] text-[color:var(--background)] shadow-[0_14px_32px_rgba(10,10,10,0.16)]"
                      : "text-[color:var(--muted)]"
                  )}
                >
                  Ročne
                </button>
                <span className="rounded-full border border-[#bfdbfe] bg-[#eff6ff] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#2563eb]">
                  -{YEARLY_DISCOUNT_PERCENT} %
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-shell pt-10 lg:pt-14">
        <div className="relative">
          <div className="pointer-events-none absolute inset-x-12 top-10 h-56 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.18),transparent_70%)] blur-3xl" />
          <div className="relative grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {plans.map((plan, index) => (
              <Reveal key={plan.id} delay={index * 80}>
                <PricingCard plan={plan} yearly={yearly} />
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
                <div className="grid grid-cols-[1.3fr_repeat(4,minmax(0,1fr))] gap-x-6 px-2 pb-4">
                  <div className="self-end">
                    <h2 className="font-display text-4xl font-extrabold  text-[color:var(--foreground)]">Funkcie</h2>
                  </div>

                  {plans.map((plan) => {
                    const display = yearly ? plan.monthlyPrice * 0.8 : plan.monthlyPrice;
                    return (
                      <div key={plan.id} className="flex flex-col items-start gap-3">
                        <div>
                          <p className="font-display text-[1.55rem] font-extrabold  text-[color:var(--foreground)]">{plan.name}</p>
                          <p className="mt-1 text-sm text-[color:var(--muted)]">
                            {formatPrice(display)} {plan.monthlyPrice === 0 ? "" : "/ mes"}
                          </p>
                        </div>
                        <Link
                          href={APP_SIGNIN_URL}
                          className="inline-flex w-full items-center justify-center rounded-[0.95rem] bg-[color:var(--foreground)] px-4 py-3 text-sm font-semibold text-[color:var(--background)] transition duration-300 hover:-translate-y-0.5"
                        >
                          {APP_SIGNIN_LABEL}
                        </Link>
                      </div>
                    );
                  })}
                </div>

                <div className="border-t border-[color:var(--line)]">
                  {comparisonRows.map((row) => (
                    <div key={row.key} className="grid grid-cols-[1.3fr_repeat(4,minmax(0,1fr))] gap-x-6 border-b border-[color:var(--line)] px-2 py-3.5">
                      <div className="text-lg font-semibold text-[color:var(--foreground)]">{row.label}</div>
                      {plans.map((plan) => (
                        <div key={`${plan.id}-${row.key}`} className="flex items-center text-sm leading-6 text-[color:var(--foreground)]">
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
    </>
  );
}

"use client";

import Image from "next/image";
import type { SVGProps } from "react";
import { useRef } from "react";
import { CalendarIcon, CheckIcon, DocumentIcon, GridIcon } from "@/components/icons";
import { useSmoothedNumber } from "@/components/use-smoothed-number";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function SparkIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8Z" />
      <path d="M5 19h.01" />
      <path d="M19 5h.01" />
    </svg>
  );
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

const beforeChips = ["Tabuľky", "PDF", "Správy"];
const afterChips = ["FIDO CALCUL"];

export function BeforeAfterShowcase() {
  const boundsRef = useRef<DOMRect | null>(null);
  const draggingRef = useRef(false);
  const { value: split, setTarget } = useSmoothedNumber({
    initialValue: 56,
    stiffness: 0.16,
    precision: 0.05,
  });

  const handleMove = (clientX: number, rect: DOMRect) => {
    const next = ((clientX - rect.left) / rect.width) * 100;
    setTarget(clamp(next, 18, 82));
  };

  return (
    <div className="panel p-3 sm:p-4">
      <div
        className="group relative h-[560px] overflow-hidden rounded-[2rem] border border-[color:var(--line)] bg-[color:var(--surface)] shadow-[0_40px_100px_rgba(10,10,10,0.12)]"
        style={{ touchAction: "pan-y" }}
        onPointerEnter={(event) => {
          boundsRef.current = event.currentTarget.getBoundingClientRect();
        }}
        onPointerDown={(event) => {
          if (event.pointerType === "mouse") return;
          boundsRef.current = event.currentTarget.getBoundingClientRect();
          draggingRef.current = true;
          event.currentTarget.setPointerCapture?.(event.pointerId);
          handleMove(event.clientX, boundsRef.current);
        }}
        onPointerMove={(event) => {
          const bounds = boundsRef.current ?? event.currentTarget.getBoundingClientRect();
          boundsRef.current = bounds;

          if (event.pointerType !== "mouse" && !draggingRef.current) return;
          handleMove(event.clientX, bounds);
        }}
        onPointerUp={(event) => {
          if (event.pointerType === "mouse") return;
          draggingRef.current = false;
          event.currentTarget.releasePointerCapture?.(event.pointerId);
        }}
        onPointerCancel={(event) => {
          if (event.pointerType === "mouse") return;
          draggingRef.current = false;
          event.currentTarget.releasePointerCapture?.(event.pointerId);
        }}
        onPointerLeave={(event) => {
          boundsRef.current = null;
          draggingRef.current = false;
          if (event.pointerType !== "mouse") return;
          setTarget(56);
        }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#fafaf8_0%,#f1f1ed_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,0,0,0.05),transparent_36%)]" />

        <div className="absolute inset-0 px-8 py-8 sm:px-10 sm:py-10">
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[color:var(--muted)]">Predtým</p>
              <h3 className="mt-3 font-display text-[clamp(2rem,3vw,2.9rem)] font-extrabold leading-[0.95]  text-[color:var(--foreground)]">Roztrúsené podklady</h3>
              <p className="mt-3 max-w-sm text-sm leading-7 text-[color:var(--muted)]">Ponuka, hodiny, poznámky a klient sa skladajú z rôznych miest, takže tím stále dohľadáva, čo je vlastne finálne.</p>
            </div>
            <div className="flex flex-wrap justify-end gap-2">
              {beforeChips.map((chip) => (
                <span key={chip} className="rounded-full border border-black/8 bg-white/72 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[color:var(--foreground)] shadow-sm">
                  {chip}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-6 overflow-hidden rounded-[1.4rem] border border-black/10 shadow-[0_22px_55px_rgba(10,10,10,0.1)]">
            <Image
              src="/assets/before-spreadsheet.png"
              alt="Excel rozpočet pred FIDO Calcul"
              width={2276}
              height={1214}
              className="w-full"
            />
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 0 0 ${split}%)`, willChange: "clip-path" }}>
          <div className="absolute inset-0 bg-[linear-gradient(135deg,#7d83ac_0%,#5f678f_44%,#4d577a_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_24%)]" />

          <div className="absolute inset-0 px-8 py-8 text-white sm:px-10 sm:py-10">
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-white/65">Potom</p>
                <h3 className="mt-3 font-display text-[clamp(2rem,3vw,2.9rem)] font-extrabold leading-[0.95] ">Jeden pokojný workflow</h3>
                <p className="mt-3 max-w-sm text-sm leading-7 text-white/72">Projekt, klient, denný záznam aj dokument vznikajú v jednej appke, takže tím už nič neprepisuje medzi nástrojmi.</p>
              </div>
              <div className="flex flex-wrap justify-end gap-2">
                {afterChips.map((chip) => (
                  <span key={chip} className="rounded-full border border-white/18 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white">
                    {chip}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-10 rounded-[1.8rem] border border-white/14 bg-[#4b5476]/78 p-5 shadow-[0_28px_70px_rgba(15,20,40,0.24)] backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/55">Projekt</p>
                  <h4 className="mt-2 font-display text-3xl font-extrabold ">Rodinný dom Ražtočná</h4>
                </div>
                <span className="inline-flex items-center gap-2 rounded-full bg-[#51A2F7] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white">
                  <span className="h-2 w-2 rounded-full bg-white" />
                  Cenová ponuka
                </span>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {[
                  { label: "Miestnosti", value: "6", icon: GridIcon },
                  { label: "Hodiny", value: "41h", icon: CalendarIcon },
                  { label: "Doklady", value: "3", icon: DocumentIcon },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="rounded-[1.2rem] border border-white/12 bg-white/7 px-4 py-4">
                      <div className="flex items-center justify-between">
                        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/55">{item.label}</p>
                        <Icon className="h-4 w-4 text-white/62" />
                      </div>
                      <p className="mt-4 text-2xl font-semibold">{item.value}</p>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 rounded-[1.2rem] border border-white/12 bg-white/7 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/55">Faktúra</p>
                    <p className="mt-2 text-lg font-semibold">202603014</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/55">Celkom</p>
                    <p className="mt-2 text-lg font-semibold">28 440 EUR</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2 text-sm text-white/72">
                  <CheckIcon className="h-4 w-4 text-[#8bf0a9]" />
                  Klient, hodiny aj projekt sú už prepojené.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-y-0 z-20" style={{ left: `${split}%`, willChange: "left" }}>
          <div className="absolute inset-y-0 w-px -translate-x-1/2 bg-white/92 shadow-[0_0_0_1px_rgba(0,0,0,0.06)]" />
          <div className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white text-[color:var(--foreground)] shadow-[0_18px_45px_rgba(0,0,0,0.16)]">
            <SparkIcon className="h-5 w-5" />
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-24 bg-gradient-to-t from-black/12 to-transparent opacity-40" />
      </div>
    </div>
  );
}

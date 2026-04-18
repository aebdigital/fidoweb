"use client";

import Image from "next/image";
import type { SVGProps } from "react";
import { useRef } from "react";
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
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-gray-500">Predtým</p>
              <h3 className="mt-3 font-display text-[clamp(2rem,3vw,2.9rem)] font-extrabold leading-[0.95] text-gray-900">Roztrúsené podklady</h3>
              <p className="mt-3 max-w-sm text-sm leading-7 text-gray-500">Jedno excelové, druhé v e-maili, tretie v zošite — a keď príde zákazník s otázkou, nikto nevie povedať, ktoré číslo je to posledné.</p>
            </div>
            <div className="flex flex-wrap justify-end gap-2">
              {beforeChips.map((chip) => (
                <span key={chip} className="rounded-full border border-black/8 bg-white/72 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-gray-900 shadow-sm">
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
          <div className="absolute inset-0 bg-black" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_24%)]" />

          <div className="absolute inset-0 px-8 py-8 text-white sm:px-10 sm:py-10">
            <div className="flex items-start justify-between gap-6">
              <div className="flex flex-wrap gap-2">
                {afterChips.map((chip) => (
                  <span key={chip} className="rounded-full border border-white/18 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white">
                    {chip}
                  </span>
                ))}
              </div>
              <div className="text-right ml-auto">
                <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-white/65">Potom</p>
                <h3 className="mt-3 font-display text-[clamp(2rem,3vw,2.9rem)] font-extrabold leading-[0.95]">Všetko na jednom mieste</h3>
                <p className="mt-3 max-w-sm ml-auto text-sm leading-7 text-white/72">Fido Calcul rozdeľuje každý projekt do jasných sekcií — klient, miestnosti, cenová ponuka, doklady aj súbory sú vždy tam, kde ich čakáte.</p>
              </div>
            </div>

            <div className="mt-6 overflow-hidden rounded-[1.4rem] border border-white/14 shadow-[0_22px_55px_rgba(10,10,10,0.22)]">
              <Image
                src="/assets/app-project-detail.webp"
                alt="Fido Calcul — detail projektu"
                width={1992}
                height={1428}
                className="w-full"
              />
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

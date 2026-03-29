"use client";

import Image from "next/image";
import type { SVGProps } from "react";
import { useEffect, useRef, useState } from "react";
import { ArrowRightIcon, CalendarIcon, DocumentIcon, GridIcon, UsersIcon } from "@/components/icons";
import { useSmoothedNumber } from "@/components/use-smoothed-number";

type CategoryId = "construction" | "services";

type CategoryCard = {
  id: CategoryId;
  name: string;
  image: string;
  count: string;
  timer?: string;
};

type PreviewProject = {
  id: string;
  number: string;
  name: string;
  client: string;
  status: string;
  total: string;
  rooms: number;
};

const navigation = [
  { label: "Projekty", icon: GridIcon, active: true },
  { label: "Denník", icon: CalendarIcon, active: false },
  { label: "Faktúry", icon: DocumentIcon, active: false },
  { label: "Klienti", icon: UsersIcon, active: false },
] as const;

function RefreshIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M21 12a9 9 0 1 1-2.64-6.36" />
      <path d="M21 3v6h-6" />
    </svg>
  );
}

const categoryCards: CategoryCard[] = [
  {
    id: "construction",
    name: "Stavebníctvo",
    image: "/assets/construction.jpg",
    count: "128 projektov",
    timer: "02:14:27",
  },
  {
    id: "services",
    name: "Služby a ostatné",
    image: "/assets/services.jpg",
    count: "46 projektov",
  },
];

const previewProjects: Record<CategoryId, PreviewProject[]> = {
  construction: [
    {
      id: "raztocna",
      number: "202603014",
      name: "Rodinný dom Ražtočná",
      client: "Novakovci",
      status: "Denník aktívny",
      total: "28 440 EUR",
      rooms: 6,
    },
    {
      id: "oknarska",
      number: "202603011",
      name: "Bytový dom Oknárska",
      client: "RNV Okná",
      status: "Cenová ponuka",
      total: "12 900 EUR",
      rooms: 4,
    },
    {
      id: "chata",
      number: "202602028",
      name: "Chata Hory Sever",
      client: "Mrazikovci",
      status: "Záloha",
      total: "9 860 EUR",
      rooms: 3,
    },
  ],
  services: [
    {
      id: "servis",
      number: "202603006",
      name: "Servis okien Ružinov",
      client: "Dve lamely",
      status: "Cenová ponuka",
      total: "1 480 EUR",
      rooms: 2,
    },
    {
      id: "montaz",
      number: "202602030",
      name: "Montáž dverí Most pri BA",
      client: "Biela 21",
      status: "Denník aktívny",
      total: "3 920 EUR",
      rooms: 5,
    },
  ],
};

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function statusTone(status: string) {
  if (status.includes("Denník")) return "#73D38A";
  if (status.includes("Záloha")) return "#F5A623";
  return "#51A2F7";
}

function renderStatusMark(status: string, color: string) {
  if (status.includes("Denník")) {
    return <span className="text-[9px] font-bold leading-none" style={{ color }}>✓</span>;
  }

  if (status.includes("Záloha")) {
    return <span className="text-[9px] font-bold leading-none" style={{ color }}>€</span>;
  }

  return <span className="text-[9px] font-bold leading-none" style={{ color }}>?</span>;
}

export function HeroProjectPeek() {
  const [category, setCategory] = useState<CategoryId>("construction");
  const [selectedId, setSelectedId] = useState(previewProjects.construction[0].id);
  const shellRef = useRef<HTMLDivElement>(null);
  const measureFrameRef = useRef<number | null>(null);
  const didInitRef = useRef(false);
  const { value: scrollProgress, setTarget: setScrollProgressTarget, jumpTo: jumpToScrollProgress } = useSmoothedNumber({
    initialValue: 0,
    stiffness: 0.12,
    precision: 0.001,
  });

  const projects = previewProjects[category];
  const selectedProject = projects.find((project) => project.id === selectedId) ?? projects[0];
  const dynamicScaleX = 0.92 + scrollProgress * 0.18;
  const dynamicScaleY = 0.94 + scrollProgress * 0.1;
  const dynamicTranslate = 34 - scrollProgress * 34;

  useEffect(() => {
    const measureScrollProgress = () => {
      measureFrameRef.current = null;
      const shell = shellRef.current;
      if (!shell) return;

      const rect = shell.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const start = viewportHeight * 0.95;
      const end = viewportHeight * 0.12;
      const rawProgress = (start - rect.top) / Math.max(start - end, 1);
      const nextProgress = Math.max(0, Math.min(1, rawProgress));

      if (!didInitRef.current) {
        jumpToScrollProgress(nextProgress);
        didInitRef.current = true;
        return;
      }

      setScrollProgressTarget(nextProgress);
    };

    const requestMeasure = () => {
      if (measureFrameRef.current !== null) return;
      measureFrameRef.current = window.requestAnimationFrame(measureScrollProgress);
    };

    measureScrollProgress();
    window.addEventListener("scroll", requestMeasure, { passive: true });
    window.addEventListener("resize", requestMeasure);

    return () => {
      window.removeEventListener("scroll", requestMeasure);
      window.removeEventListener("resize", requestMeasure);

      if (measureFrameRef.current !== null) {
        window.cancelAnimationFrame(measureFrameRef.current);
      }
    };
  }, [jumpToScrollProgress, setScrollProgressTarget]);

  return (
    <div
      ref={shellRef}
      className="relative mx-auto w-full will-change-transform"
      style={{
        maxWidth: "65rem",
        transform: `translate3d(0, ${dynamicTranslate}px, 0) scale3d(${dynamicScaleX}, ${dynamicScaleY}, 1)`,
        transformOrigin: "center top",
      }}
    >
      <div className="relative overflow-hidden rounded-[2.5rem] border border-[color:var(--line)] bg-[color:var(--panel)] shadow-[0_62px_150px_rgba(10,10,10,0.24)] dark:shadow-[0_70px_160px_rgba(0,0,0,0.46)]">
        <div className="flex items-center gap-2 border-b border-[color:var(--line)] px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
        </div>

        <div className="grid lg:min-h-[35rem] lg:grid-cols-[220px_minmax(0,1fr)]">
          <aside className="hidden border-r border-[color:var(--line)] bg-white/92 px-4 py-4 dark:bg-[#0f0f0f]/96 lg:flex lg:w-[220px] lg:flex-col">
            <div className="flex h-14 items-center justify-center border-b border-[color:var(--line)] pb-4">
              <Image src="/assets/logo.png" alt="Logo FIDO Calcul" width={108} height={40} className="h-10 w-auto dark:hidden" />
              <Image src="/assets/dark-logo.jpg" alt="Logo FIDO Calcul v tmavom režime" width={108} height={40} className="hidden h-10 w-auto dark:block" />
            </div>
            <div className="mt-6 flex flex-1 flex-col">
              <div className="space-y-2">
                {navigation.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.label}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-[1.1rem] px-3 py-3 text-left text-sm font-semibold transition-transform duration-200",
                        item.active
                          ? "bg-[color:var(--foreground)] text-[color:var(--background)] shadow-[0_18px_40px_rgba(10,10,10,0.15)]"
                          : "text-[color:var(--muted)] hover:translate-x-1 hover:bg-[color:var(--surface)] hover:text-[color:var(--foreground)]"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-auto flex items-center gap-3 rounded-[1.1rem] px-3 py-3 text-left text-sm font-semibold text-[color:var(--muted)] transition-transform duration-200 hover:translate-x-1 hover:bg-[color:var(--surface)] hover:text-[color:var(--foreground)]">
                <RefreshIcon className="h-4 w-4" />
                <span>Obnoviť</span>
              </div>
            </div>
          </aside>

          <div className="min-w-0 bg-[#f7f7f5] p-4 dark:bg-[#090909] sm:p-5">
            <div>
              <h3 className="font-display text-[2rem] font-extrabold tracking-[-0.05em] text-[color:var(--foreground)]">Projekty</h3>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {categoryCards.map((card) => (
                <button
                  key={card.id}
                  type="button"
                  onClick={() => {
                    setCategory(card.id);
                    setSelectedId(previewProjects[card.id][0].id);
                  }}
                  className={cn(
                    "group relative h-[148px] overflow-hidden rounded-[1.7rem] border text-left transition-transform duration-200",
                    category === card.id
                      ? "border-black/10 shadow-[0_22px_50px_rgba(10,10,10,0.16)]"
                      : "border-transparent hover:-translate-y-1"
                  )}
                >
                  <Image src={card.image} alt={card.name} fill className="object-cover" />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.2)_32%,rgba(255,255,255,0.92)_100%)] dark:bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.18)_34%,rgba(0,0,0,0.76)_100%)]" />
                  {card.timer ? (
                    <div className="absolute right-3 top-3 rounded-xl bg-[#ef4444] px-2 py-1 text-[10px] font-black text-white shadow-[0_10px_24px_rgba(239,68,68,0.34)]">
                      {card.timer}
                    </div>
                  ) : null}
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <p className="text-[1.7rem] font-semibold leading-none text-gray-900 dark:text-white">{card.name}</p>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-5 flex items-center gap-4">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-[1rem] border border-black/12 bg-white px-3 py-1.5 text-sm font-medium text-[color:var(--foreground)] shadow-sm dark:border-white/12 dark:bg-[#111111]"
              >
                <span>Kedykoľvek</span>
                <ChevronDownSmall className="h-4 w-4" />
              </button>
              <div className="relative flex-1">
                <SearchSmall className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[color:var(--muted)]" />
                <div className="rounded-[1rem] border border-black/12 bg-white py-2 pl-10 pr-4 text-sm text-[color:var(--muted)] shadow-sm dark:border-white/12 dark:bg-[#111111]">
                  Hľadať
                </div>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              {projects.map((project) => (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => setSelectedId(project.id)}
                  className={cn(
                    "w-full rounded-[1.6rem] border px-4 py-4 text-left transition-all duration-200",
                    selectedProject.id === project.id
                      ? "border-black/10 bg-white shadow-[0_24px_60px_rgba(10,10,10,0.12)] dark:border-white/10 dark:bg-[#111111]"
                      : "border-black/10 bg-white/92 hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(10,10,10,0.08)] dark:border-white/10 dark:bg-[#111111]"
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="mb-1 flex items-center gap-2">
                        <span className="text-xs font-semibold text-[color:var(--muted)]">{project.number}</span>
                        {project.status.includes("Denník") ? (
                          <span className="inline-flex items-center gap-1 rounded-lg bg-[#ef4444] px-2 py-0.5 text-[10px] font-black text-white shadow-[0_10px_26px_rgba(239,68,68,0.24)]">
                            <ClockSmall className="h-3 w-3" />
                            02:14:27
                          </span>
                        ) : null}
                      </div>
                      <p className="mt-2 truncate text-lg font-semibold text-[color:var(--foreground)]">{project.name}</p>
                      <p className="mt-1 truncate text-sm text-[color:var(--muted)]">
                        {project.client} · {project.rooms} miestností
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-3">
                      <div className="text-right">
                        <div className="mb-1 flex justify-end">
                          <span
                            className="inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[10px] font-medium text-white dark:text-gray-900"
                            style={{ backgroundColor: statusTone(project.status) }}
                          >
                            <span className="inline-flex h-3.5 w-3.5 items-center justify-center rounded-full bg-white">
                              {renderStatusMark(project.status, statusTone(project.status))}
                            </span>
                            {project.status}
                          </span>
                        </div>
                        <p className="text-[1.25rem] font-semibold leading-none text-[color:var(--foreground)]">{project.total}</p>
                        <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">Bez DPH</p>
                      </div>
                      <ArrowRightIcon className="h-4 w-4 text-[color:var(--muted)]" />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChevronDownSmall(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function SearchSmall(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

function ClockSmall(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

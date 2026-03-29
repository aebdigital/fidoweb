"use client";

import Image from "next/image";
import type { ReactNode, SVGProps } from "react";
import { useState } from "react";
import {
  ArrowRightIcon,
  CalendarIcon,
  CheckIcon,
  DocumentIcon,
  GridIcon,
  SlidersIcon,
  UsersIcon,
} from "@/components/icons";
import { Reveal } from "@/components/reveal";

type NavKey = "projects" | "dennik" | "invoices" | "clients" | "settings";
type ProjectCategory = "construction" | "services";
type DennikTab = "timer" | "members" | "analytics";

type ProjectRowData = {
  id: string;
  number: string;
  name: string;
  client: string;
  total: string;
  rooms: number;
  status: string;
  tone: "green" | "blue" | "orange";
  timer?: string;
};

type ClientRecord = {
  id: string;
  name: string;
  address: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
  businessId: string;
  taxId: string;
  vatId: string;
  contactPerson: string;
  type: "personal" | "corporation";
  projects: Array<{ name: string; rooms: number; total: string; invoice: string }>;
};

type InvoicePreviewRecord = {
  id: string;
  number: string;
  issueDate: string;
  projectName: string;
  clientName: string;
  amount: string;
  status: "paid" | "unpaid" | "overdue";
  statusLabel: string;
  type: "invoice" | "proforma";
  items: Array<{ label: string; qty: string; unitPrice: string; total: string }>;
};

const desktopMenu: Array<{ key: NavKey; label: string; icon: typeof GridIcon }> = [
  { key: "projects", label: "Projekty", icon: GridIcon },
  { key: "dennik", label: "Denník", icon: CalendarIcon },
  { key: "invoices", label: "Faktúry", icon: DocumentIcon },
  { key: "clients", label: "Klienti", icon: UsersIcon },
  { key: "settings", label: "Nastavenia", icon: SlidersIcon },
];

const categoryCards = [
  {
    id: "construction" as const,
    name: "Stavebníctvo",
    image: "/assets/construction.jpg",
    count: "128 projektov",
    timer: "02:14:27",
  },
  {
    id: "services" as const,
    name: "Služby a ostatné",
    image: "/assets/services.jpg",
    count: "46 projektov",
  },
];

const projectRows: Record<ProjectCategory, ProjectRowData[]> = {
  construction: [
    {
      id: "p1",
      number: "202603014",
      name: "Rodinný dom Ražtočná",
      client: "Novakovci",
      total: "28 440 EUR",
      rooms: 6,
      status: "Cenová ponuka",
      tone: "blue",
      timer: "02:14:27",
    },
    {
      id: "p2",
      number: "202603011",
      name: "Bytový dom Oknárska",
      client: "RNV Okná",
      total: "12 900 EUR",
      rooms: 4,
      status: "Cenová ponuka",
      tone: "blue",
    },
    {
      id: "p3",
      number: "202602028",
      name: "Chata Hory sever",
      client: "Mrazikovci",
      total: "9 860 EUR",
      rooms: 3,
      status: "Záloha",
      tone: "orange",
    },
  ],
  services: [
    {
      id: "s1",
      number: "202603006",
      name: "Servis okien Ružinov",
      client: "Dve lamely",
      total: "1 480 EUR",
      rooms: 2,
      status: "Cenová ponuka",
      tone: "blue",
    },
    {
      id: "s2",
      number: "202602030",
      name: "Montáž dverí Most pri BA",
      client: "Biela 21",
      total: "3 920 EUR",
      rooms: 5,
      status: "Cenová ponuka",
      tone: "blue",
      timer: "00:46:11",
    },
    {
      id: "s3",
      number: "202602021",
      name: "Zameranie kancelárií Apollo",
      client: "Studio Obrys",
      total: "880 EUR",
      rooms: 1,
      status: "Záloha",
      tone: "orange",
    },
  ],
};

const clients: ClientRecord[] = [
  {
    id: "c1",
    name: "RNV Okná",
    address: "Bratislava, Sládkovičova 18",
    email: "office@rnvokna.sk",
    phone: "+421 905 220 110",
    street: "Sládkovičova 18",
    city: "Bratislava",
    postalCode: "821 04",
    country: "Slovensko",
    businessId: "50291821",
    taxId: "2120262214",
    vatId: "SK2120262214",
    contactPerson: "Roman Novotný",
    type: "corporation",
    projects: [
      { name: "Bytový dom Oknárska", rooms: 4, total: "12 900 EUR", invoice: "202603006" },
      { name: "Servis okien Ružinov", rooms: 2, total: "1 480 EUR", invoice: "202603002" },
    ],
  },
  {
    id: "c2",
    name: "Novakovci",
    address: "Pezinok, Javorova 7",
    email: "novakovci@gmail.com",
    phone: "+421 904 555 991",
    street: "Javorova 7",
    city: "Pezinok",
    postalCode: "902 01",
    country: "Slovensko",
    businessId: "",
    taxId: "",
    vatId: "",
    contactPerson: "",
    type: "personal",
    projects: [
      { name: "Rodinný dom Ražtočná", rooms: 6, total: "28 440 EUR", invoice: "202603008" },
    ],
  },
  {
    id: "c3",
    name: "Štúdio Obrys",
    address: "Bratislava, Mlynské nivy 12",
    email: "team@obrys.sk",
    phone: "+421 911 301 221",
    street: "Mlynské nivy 12",
    city: "Bratislava",
    postalCode: "821 09",
    country: "Slovensko",
    businessId: "48190214",
    taxId: "2120061822",
    vatId: "SK2120061822",
    contactPerson: "Petra Kráľová",
    type: "corporation",
    projects: [
      { name: "Zameranie kancelárií Apollo", rooms: 1, total: "880 EUR", invoice: "202602021" },
    ],
  },
];

const dennikMembers = [
  { name: "Roman Novotný", email: "roman@fido.sk", hours: "38h", status: "owner" },
  { name: "Matúš Čierny", email: "matus@fido.sk", hours: "21h", status: "member" },
  { name: "Nina B", email: "nina@fido.sk", hours: "16h", status: "pending" },
];

const generatedInvoices = [
  {
    number: "202603012",
    title: "Spoločná faktúra",
    amount: "1 944 EUR",
  },
  {
    number: "202603009",
    title: "Bytový dom Oknárska",
    amount: "812 EUR",
  },
];

const invoicePreviewRecords: InvoicePreviewRecord[] = [
  {
    id: "inv-1",
    number: "202603014",
    issueDate: "24. 3. 2026",
    projectName: "Rodinný dom Ražtočná",
    clientName: "Novakovci",
    amount: "28 440 EUR",
    status: "unpaid",
    statusLabel: "Splatné o 3 dni",
    type: "invoice",
    items: [
      { label: "Obývačka", qty: "14 prác", unitPrice: "488 EUR", total: "6 840 EUR" },
      { label: "Kuchyňa", qty: "9 prác", unitPrice: "469 EUR", total: "4 220 EUR" },
      { label: "Spálňa", qty: "7 prác", unitPrice: "451 EUR", total: "3 160 EUR" },
    ],
  },
  {
    id: "inv-2",
    number: "202603011",
    issueDate: "18. 3. 2026",
    projectName: "Bytový dom Oknárska",
    clientName: "RNV Okná",
    amount: "12 900 EUR",
    status: "overdue",
    statusLabel: "Po splatnosti 2 dni",
    type: "invoice",
    items: [
      { label: "Montáž okien", qty: "12 prác", unitPrice: "525 EUR", total: "6 300 EUR" },
      { label: "Doplnky a tesnenia", qty: "6 prác", unitPrice: "340 EUR", total: "2 040 EUR" },
    ],
  },
  {
    id: "inv-3",
    number: "202602028",
    issueDate: "8. 3. 2026",
    projectName: "Chata Hory sever",
    clientName: "Mrazikovci",
    amount: "9 860 EUR",
    status: "paid",
    statusLabel: "Uhradené",
    type: "proforma",
    items: [
      { label: "Záloha na výrobu", qty: "1", unitPrice: "9 860 EUR", total: "9 860 EUR" },
    ],
  },
];

const projectDetailRooms = [
  { name: "Obývačka", works: 14, total: "6 840 EUR" },
  { name: "Kuchyňa", works: 9, total: "4 220 EUR" },
];

const projectDetailFiles = [
  "/assets/construction.jpg",
  "/assets/services.jpg",
  "/assets/screens/projects.jpg",
  "/assets/construction.jpg",
  "/assets/services.jpg",
  "/assets/screens/projects.jpg",
];

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function ChevronDownIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function ChevronLeftIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function XIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="m18 6-12 12" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

function PlusIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </svg>
  );
}

function ArchiveIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M3 7h18" />
      <path d="M5 7v11a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7" />
      <path d="M9 12h6" />
      <path d="M4 3h16v4H4z" />
    </svg>
  );
}

function PaperclipIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="m21.44 11.05-8.49 8.49a6 6 0 0 1-8.49-8.49l8.48-8.48a4 4 0 1 1 5.66 5.66l-8.49 8.48a2 2 0 1 1-2.82-2.83l7.78-7.78" />
    </svg>
  );
}

function TrashIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M3 6h18" />
      <path d="M8 6V4h8v2" />
      <path d="M6 6l1 14h10l1-14" />
      <path d="M10 10v6" />
      <path d="M14 10v6" />
    </svg>
  );
}

function RefreshIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M21 12a9 9 0 1 1-2.64-6.36" />
      <path d="M21 3v6h-6" />
    </svg>
  );
}

function ClockIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function TimerIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M10 2h4" />
      <path d="M12 14v-4" />
      <circle cx="12" cy="14" r="8" />
      <path d="M12 6V4" />
    </svg>
  );
}

function SearchIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

function BuildingIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M3 21h18" />
      <path d="M5 21V7l7-4 7 4v14" />
      <path d="M9 9h.01" />
      <path d="M9 13h.01" />
      <path d="M15 9h.01" />
      <path d="M15 13h.01" />
      <path d="M11 21v-4h2v4" />
    </svg>
  );
}

function UserIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M20 21a8 8 0 0 0-16 0" />
      <circle cx="12" cy="8" r="4" />
    </svg>
  );
}

function BarChartIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M4 20V10" />
      <path d="M10 20V4" />
      <path d="M16 20v-7" />
      <path d="M22 20V8" />
    </svg>
  );
}

function MoneyIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M4 7h16v10H4z" />
      <path d="M7 10h.01" />
      <path d="M17 14h.01" />
      <path d="M12 9.5a2.5 2.5 0 1 0 0 5" />
      <path d="M12 9.5V8" />
      <path d="M12 16v-1.5" />
    </svg>
  );
}

function MonthGrid({
  year,
  month,
  selectedDay,
  activeDays = [],
  rangeStart,
  rangeEnd,
  compact = false,
}: {
  year: number;
  month: number;
  selectedDay?: number;
  activeDays?: number[];
  rangeStart?: number;
  rangeEnd?: number;
  compact?: boolean;
}) {
  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const offset = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;
  const activeSet = new Set(activeDays);
  const weekdays = ["Po", "Ut", "St", "St", "Pi", "So", "Ne"];

  return (
    <div className={cn("grid grid-cols-7", compact ? "gap-y-1.5" : "gap-y-2")}>
      {weekdays.map((label, index) => (
        <div key={`${label}-${index}`} className="pb-2 text-center text-[10px] font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
          {label}
        </div>
      ))}
      {Array.from({ length: offset }).map((_, index) => (
        <div key={`empty-${index}`} />
      ))}
      {Array.from({ length: daysInMonth }).map((_, index) => {
        const day = index + 1;
        const isSelected = day === selectedDay;
        const isInRange = typeof rangeStart === "number" && typeof rangeEnd === "number" && day >= rangeStart && day <= rangeEnd;
        const isRangeStart = isInRange && day === rangeStart;
        const isRangeEnd = isInRange && day === rangeEnd;

        return (
          <div key={`day-${day}`} className={cn("relative py-0.5", isInRange && "bg-blue-100/80 dark:bg-blue-900/20", isRangeStart && "rounded-l-full", isRangeEnd && "rounded-r-full")}>
            <div
              className={cn(
                "relative mx-auto flex items-center justify-center rounded-full font-semibold transition-colors",
                compact ? "h-8 w-8 text-xs" : "h-10 w-10 text-sm",
                isSelected
                  ? "bg-blue-500 text-white shadow-[0_8px_20px_rgba(59,130,246,0.28)]"
                  : isInRange
                    ? "text-blue-800 dark:text-blue-100"
                    : "text-[color:var(--foreground)]"
              )}
            >
              {day}
              {activeSet.has(day) ? (
                <span className={cn("absolute rounded-[2px]", compact ? "right-0.5 top-0.5 h-1.5 w-1.5" : "right-1 top-1 h-1.5 w-1.5", isSelected ? "bg-white" : "bg-[#22c55e]")} />
              ) : null}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function AppSidebar({ active }: { active: NavKey }) {
  return (
    <aside className="hidden border-r border-[color:var(--line)] bg-white/92 px-4 py-4 dark:bg-[#0f0f0f]/96 lg:flex lg:w-[220px] lg:flex-col">
      <div className="flex h-14 items-center justify-center border-b border-[color:var(--line)] pb-4">
        <Image src="/assets/logo.png" alt="Logo FIDO Calcul" width={108} height={40} className="h-10 w-auto dark:hidden" />
        <Image src="/assets/dark-logo.jpg" alt="Logo FIDO Calcul v tmavom režime" width={108} height={40} className="hidden h-10 w-auto dark:block" />
      </div>
      <div className="mt-6 flex flex-1 flex-col">
        <div className="space-y-2">
          {desktopMenu.map((item) => {
            const Icon = item.icon;
            const isActive = item.key === active;

            return (
              <button
                key={item.key}
                type="button"
                className={cn(
                  "flex w-full items-center gap-3 rounded-[1.1rem] px-3 py-3 text-left text-sm font-semibold transition-transform duration-200",
                  isActive
                    ? "bg-[color:var(--foreground)] text-[color:var(--background)] shadow-[0_18px_40px_rgba(10,10,10,0.15)]"
                    : "text-[color:var(--muted)] hover:translate-x-1 hover:bg-[color:var(--surface)] hover:text-[color:var(--foreground)]"
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          className="mt-auto flex items-center gap-3 rounded-[1.1rem] px-3 py-3 text-left text-sm font-semibold text-[color:var(--muted)] transition-transform duration-200 hover:translate-x-1 hover:bg-[color:var(--surface)] hover:text-[color:var(--foreground)]"
        >
          <RefreshIcon className="h-4 w-4" />
          <span>Obnoviť</span>
        </button>
      </div>
    </aside>
  );
}

function DesktopShell({
  active,
  children,
  viewportClassName,
}: {
  active: NavKey;
  children: ReactNode;
  viewportClassName?: string;
}) {
  return (
    <div className="overflow-hidden rounded-[2rem] border border-[color:var(--line)] bg-[color:var(--panel)] shadow-[0_32px_80px_rgba(10,10,10,0.12)]">
      <div className={cn("grid min-h-[740px] lg:grid-cols-[220px_minmax(0,1fr)]", viewportClassName)}>
        <AppSidebar active={active} />
        <div className="min-w-0 bg-[#f7f7f5] p-4 dark:bg-[#090909] lg:p-5">{children}</div>
      </div>
    </div>
  );
}

function MobileBottomBar({ active }: { active: NavKey }) {
  return (
    <div
      className="absolute bottom-4 left-4 right-4 z-20 rounded-[30px] px-3 py-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.15)] backdrop-blur-[20px]"
      style={{
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.12) 40%, rgba(255,255,255,0.02) 60%, rgba(0,0,0,0.05) 100%)",
        border: "1px solid rgba(255,255,255,0.35)",
      }}
    >
      <div className="flex items-center justify-around gap-1">
        {desktopMenu.map((item) => {
          const Icon = item.icon;
          const isActive = item.key === active;

          return (
            <div key={item.key} className="flex min-w-0 flex-col items-center gap-1 rounded-2xl px-1 py-0.5">
              <Icon className={cn("h-5 w-5", isActive ? "text-[#3b82f6]" : "text-gray-400")} />
              <span className={cn("text-[11px] font-medium", isActive ? "text-[#3b82f6]" : "text-gray-400")}>{item.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PhoneShell({
  active,
  children,
  screenClassName,
}: {
  active: NavKey;
  children: ReactNode;
  screenClassName?: string;
}) {
  return (
    <div className="mx-auto w-full max-w-[390px] rounded-[2.4rem] border border-black/10 bg-black p-3 shadow-[0_28px_80px_rgba(0,0,0,0.22)] dark:border-white/10 dark:bg-[#020202]">
      <div className="relative overflow-hidden rounded-[1.9rem] bg-white dark:bg-[#0a0a0a]">
        <div className="absolute left-1/2 top-3 z-20 h-1.5 w-24 -translate-x-1/2 rounded-full bg-black/80 dark:bg-white/80" />
        <div className={cn("relative h-[760px] overflow-hidden", screenClassName)}>{children}</div>
        <MobileBottomBar active={active} />
      </div>
    </div>
  );
}

function AppHeaderButton({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <div
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-full border text-sm shadow-sm",
        dark
          ? "border-[color:var(--foreground)] bg-[color:var(--foreground)] text-[color:var(--background)]"
          : "border-[color:var(--line)] bg-white text-[color:var(--foreground)] dark:bg-[#111111]"
      )}
    >
      {children}
    </div>
  );
}

function CategoryTile({
  category,
  active,
  onClick,
  compact = false,
}: {
  category: (typeof categoryCards)[number];
  active: boolean;
  onClick?: () => void;
  compact?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group relative overflow-hidden rounded-[1.9rem] text-left transition-transform duration-200",
        compact ? "h-[164px]" : "h-[140px]",
        active ? "ring-1 ring-black/10 shadow-[0_20px_42px_rgba(0,0,0,0.14)]" : "hover:-translate-y-1"
      )}
    >
      <Image src={category.image} alt={category.name} fill className="object-cover" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.16)_36%,rgba(255,255,255,0.92)_100%)] dark:bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.2)_34%,rgba(0,0,0,0.74)_100%)]" />
      {category.timer ? (
        <div className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-xl bg-[#ef4444] px-2 py-1 text-[10px] font-extrabold text-white shadow-[0_10px_24px_rgba(239,68,68,0.34)]">
          <ClockIcon className="h-3 w-3" />
          <span>{category.timer}</span>
        </div>
      ) : null}
      <div className="absolute inset-x-0 bottom-0 p-4">
        <h4 className="text-[1.75rem] font-semibold leading-none text-black dark:text-white">{category.name}</h4>
      </div>
    </button>
  );
}

function StatusPill({ label, tone }: { label: string; tone: "green" | "blue" | "orange" }) {
  const config =
    tone === "green"
      ? { color: "#73D38A", icon: "check" as const }
      : tone === "orange"
        ? { color: "#F5A623", icon: "euro" as const }
        : { color: "#51A2F7", icon: "question" as const };

  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[10px] font-medium text-white dark:text-gray-900"
      style={{ backgroundColor: config.color }}
    >
      <span className="inline-flex h-3.5 w-3.5 items-center justify-center rounded-full bg-white">
        {config.icon === "check" ? (
          <CheckIcon className="h-[9px] w-[9px]" style={{ color: config.color }} />
        ) : config.icon === "euro" ? (
          <span className="text-[9px] font-bold leading-none" style={{ color: config.color }}>
            €
          </span>
        ) : (
          <span className="text-[9px] font-bold leading-none" style={{ color: config.color }}>
            ?
          </span>
        )}
      </span>
      {label}
    </span>
  );
}

function ProjectRow({ project, active = false, onClick }: { project: ProjectRowData; active?: boolean; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "w-full rounded-[1.6rem] border px-4 py-4 text-left transition-all duration-200",
        active
          ? "border-black/10 bg-white shadow-[0_18px_46px_rgba(10,10,10,0.12)] dark:border-white/10 dark:bg-[#111111]"
          : "border-black/10 bg-white/92 hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(10,10,10,0.08)] dark:border-white/10 dark:bg-[#111111]"
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center gap-2">
            <span className="text-xs font-semibold text-[color:var(--muted)]">{project.number}</span>
            {project.timer ? (
              <span className="inline-flex items-center gap-1 rounded-lg bg-[#ef4444] px-2 py-0.5 text-[10px] font-extrabold text-white shadow-[0_10px_26px_rgba(239,68,68,0.24)]">
                <ClockIcon className="h-3 w-3" />
                {project.timer}
              </span>
            ) : null}
          </div>
          <h4 className="truncate text-[1.4rem] font-semibold leading-none text-[color:var(--foreground)]">{project.name}</h4>
          <p className="mt-2 truncate text-sm text-[color:var(--muted)]">
            {project.client} · {project.rooms} miestností
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <div className="text-right">
            <div className="mb-1 flex justify-end">
              <StatusPill label={project.status} tone={project.tone} />
            </div>
            <p className="text-[1.25rem] font-semibold leading-none text-[color:var(--foreground)]">{project.total}</p>
            <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">Bez DPH</p>
          </div>
          <ArrowRightIcon className="h-4 w-4 text-[color:var(--muted)]" />
        </div>
      </div>
    </button>
  );
}

function ProjectsDesktopScene() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("construction");
  const [selectedProjectId, setSelectedProjectId] = useState(projectRows.construction[0].id);
  const projects = projectRows[activeCategory];
  const selectedProject = projects.find((item) => item.id === selectedProjectId) ?? projects[0];

  return (
    <DesktopShell active="projects">
      <div className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="font-display text-[2rem] font-extrabold tracking-[-0.05em] text-[color:var(--foreground)]">Projekty</h3>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {categoryCards.map((category) => (
            <CategoryTile
              key={category.id}
              category={category}
              active={activeCategory === category.id}
              onClick={() => {
                setActiveCategory(category.id);
                setSelectedProjectId(projectRows[category.id][0].id);
              }}
            />
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-[1rem] border border-black/12 bg-white px-3 py-1.5 text-sm font-medium text-[color:var(--foreground)] shadow-sm dark:border-white/12 dark:bg-[#111111]"
          >
            <span>Kedykoľvek</span>
            <ChevronDownIcon className="h-4 w-4" />
          </button>
          <div className="relative flex-1">
            <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[color:var(--muted)]" />
            <div className="rounded-[1rem] border border-black/12 bg-white py-2 pl-10 pr-4 text-sm text-[color:var(--muted)] shadow-sm dark:border-white/12 dark:bg-[#111111]">
              Hľadať
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {projects.map((project) => (
            <ProjectRow key={project.id} project={project} active={selectedProject.id === project.id} onClick={() => setSelectedProjectId(project.id)} />
          ))}
        </div>
      </div>
    </DesktopShell>
  );
}

function ProjectsMobileScene() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("construction");
  const [selectedProjectId, setSelectedProjectId] = useState(projectRows.construction[0].id);
  const projects = projectRows[activeCategory];
  const selectedProject = projects.find((item) => item.id === selectedProjectId) ?? projects[0];

  return (
    <PhoneShell active="projects">
      <div className="h-full overflow-y-auto bg-white px-4 pb-28 pt-6 dark:bg-[#0a0a0a]">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-display text-[2.2rem] font-extrabold leading-none tracking-[-0.05em] text-[color:var(--foreground)]">Projekty</h3>
          </div>
        </div>

        <div className="mt-4 space-y-3">
          {categoryCards.map((category) => (
            <CategoryTile
              key={category.id}
              category={category}
              compact
              active={activeCategory === category.id}
              onClick={() => {
                setActiveCategory(category.id);
                setSelectedProjectId(projectRows[category.id][0].id);
              }}
            />
          ))}
        </div>

        <div className="mt-5 flex items-center gap-3">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-[1rem] border border-black/12 bg-white px-3 py-2 text-sm font-medium text-[color:var(--foreground)] shadow-sm dark:border-white/12 dark:bg-[#111111]"
          >
            <span>Kedykoľvek</span>
            <ChevronDownIcon className="h-4 w-4" />
          </button>
          <div className="relative min-w-0 flex-1">
            <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[color:var(--muted)]" />
            <div className="rounded-[1rem] border border-black/12 bg-white py-2 pl-10 pr-4 text-sm text-[color:var(--muted)] shadow-sm dark:border-white/12 dark:bg-[#111111]">
              Hľadať
            </div>
          </div>
        </div>

        <div className="mt-5 space-y-3">
          {projects.map((project) => (
            <ProjectRow key={project.id} project={project} active={selectedProject.id === project.id} onClick={() => setSelectedProjectId(project.id)} />
          ))}
        </div>
      </div>
    </PhoneShell>
  );
}

function ProjectDetailDesktopScene() {
  const client = clients[1];

  return (
    <DesktopShell active="projects" viewportClassName="h-[72vh] min-h-0">
      <div className="flex h-full flex-col gap-4 overflow-hidden">
        <div className="space-y-3">
          <button type="button" className="inline-flex items-center gap-2 text-sm font-medium text-[color:var(--muted)]">
            <ChevronLeftIcon className="h-4 w-4" />
            Naspäť
          </button>

          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <h3 className="truncate font-display text-[2.35rem] font-extrabold leading-none tracking-[-0.045em] text-[color:var(--foreground)]">Rodinný dom Ražtočná</h3>
            </div>
            <div className="flex items-center gap-2">
              <button type="button" className="rounded-[1rem] bg-[#16a34a] px-4 py-2.5 text-sm font-bold text-white shadow-[0_14px_30px_rgba(22,163,74,0.26)]">
                Denník
              </button>
              <AppHeaderButton>
                <ArchiveIcon className="h-4 w-4" />
              </AppHeaderButton>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-base font-bold text-[color:var(--foreground)]">202603014</span>
            <StatusPill label="Cenová ponuka" tone="blue" />
          </div>

          <input
            readOnly
            value="Poznámka k cenovej ponuke"
            className="w-full rounded-[1.2rem] border-none bg-[color:var(--surface)] px-4 py-3 text-sm font-medium text-[color:var(--muted)] outline-none"
          />
        </div>

        <div className="grid min-h-0 flex-1 gap-4 xl:grid-cols-[minmax(0,1fr)_300px]">
          <div className="min-h-0 space-y-4 overflow-y-auto pr-1">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <UserIcon className="h-5 w-5 text-[color:var(--foreground)]" />
                <h4 className="text-xl font-semibold text-[color:var(--foreground)]">Klient a dodávateľ</h4>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-[1.5rem] bg-white p-4 shadow-[0_10px_24px_rgba(0,0,0,0.05)] dark:bg-[#111111]">
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-[1.2rem] font-semibold text-[color:var(--foreground)]">{client.name}</p>
                      <p className="mt-1 truncate text-sm text-[color:var(--muted)]">{client.street}</p>
                    </div>
                    <ArrowRightIcon className="h-4 w-4 text-[color:var(--muted)]" />
                  </div>
                </div>
                <div className="rounded-[1.5rem] bg-white p-4 shadow-[0_10px_24px_rgba(0,0,0,0.05)] dark:bg-[#111111]">
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-[1.2rem] font-semibold text-[color:var(--foreground)]">FIDO Calcul</p>
                      <p className="mt-1 truncate text-sm text-[color:var(--muted)]">50291821</p>
                    </div>
                    <ArrowRightIcon className="h-4 w-4 text-[color:var(--muted)]" />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <DocumentIcon className="h-5 w-5 text-[color:var(--foreground)]" />
                  <h4 className="text-xl font-semibold text-[color:var(--foreground)]">Projekt</h4>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    className="flex h-10 w-10 items-center justify-center rounded-[1.1rem] bg-[#ef4444] text-white shadow-[0_14px_30px_rgba(239,68,68,0.24)]"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                  <AppHeaderButton dark>
                    <PlusIcon className="h-4 w-4" />
                  </AppHeaderButton>
                </div>
              </div>
              <div className="space-y-3">
                {projectDetailRooms.map((room) => (
                <div key={room.name} className="flex items-center justify-between rounded-[1.5rem] bg-white px-5 py-4 shadow-[0_10px_24px_rgba(0,0,0,0.05)] dark:bg-[#111111]">
                  <div className="min-w-0">
                      <p className="truncate text-[1.2rem] font-semibold text-[color:var(--foreground)]">{room.name}</p>
                      <p className="mt-1 text-sm text-[color:var(--muted)]">{room.works} prác</p>
                  </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[color:var(--muted)]">Bez DPH</p>
                        <p className="text-lg font-semibold text-[color:var(--foreground)]">{room.total}</p>
                      </div>
                      <ArrowRightIcon className="h-4 w-4 text-[color:var(--muted)]" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <MoneyIcon className="h-5 w-5 text-[color:var(--foreground)]" />
                <h4 className="text-xl font-semibold text-[color:var(--foreground)]">Cenová ponuka</h4>
              </div>
              <div className="rounded-[1.6rem] bg-white p-5 shadow-[0_10px_24px_rgba(0,0,0,0.05)] dark:bg-[#111111]">
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-base font-semibold text-[color:var(--foreground)]">
                    <span>bez DPH</span>
                    <span>11 060 EUR</span>
                  </div>
                  <div className="flex items-center justify-between text-base font-semibold text-[color:var(--foreground)]">
                    <span>DPH (23%)</span>
                    <span>2 544 EUR</span>
                  </div>
                  <div className="flex items-center justify-between pt-1 text-2xl font-extrabold text-[color:var(--foreground)]">
                    <span>Spolu</span>
                    <span>13 604 EUR</span>
                  </div>
                </div>

                <div className="mt-5 flex gap-3">
                  <button type="button" className="flex-1 rounded-[1.2rem] border-2 border-[color:var(--foreground)] bg-white px-4 py-3 text-base font-bold text-[color:var(--foreground)] dark:bg-[#111111]">
                    Náhľad
                  </button>
                  <button type="button" className="flex-1 rounded-[1.2rem] bg-[color:var(--foreground)] px-4 py-3 text-base font-bold text-[color:var(--background)]">
                    Odoslať
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="min-h-0 space-y-4 overflow-y-auto pr-1">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <DocumentIcon className="h-5 w-5 text-[color:var(--foreground)]" />
                <h4 className="text-xl font-semibold text-[color:var(--foreground)]">Poznámky k projektu</h4>
              </div>
              <div className="min-h-[128px] rounded-[1.6rem] bg-white p-4 text-sm leading-7 text-[color:var(--muted)] shadow-[0_10px_24px_rgba(0,0,0,0.05)] dark:bg-[#111111]">
                Klient chce začať montáž v druhej polovici apríla. Priorita sú obývačka a kuchyňa, zvyšok môže ísť po dodaní materiálu.
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <PaperclipIcon className="h-5 w-5 text-[color:var(--foreground)]" />
                  <h4 className="text-xl font-semibold text-[color:var(--foreground)]">Súbory</h4>
                </div>
                <AppHeaderButton dark>
                  <PlusIcon className="h-4 w-4" />
                </AppHeaderButton>
              </div>
              <div className="rounded-[1.6rem] bg-[color:var(--surface)] p-3 shadow-sm">
                <div className="grid grid-cols-3 gap-2">
                  {projectDetailFiles.slice(0, 4).map((src, index) => (
                    <div key={`${src}-${index}`} className="relative aspect-square overflow-hidden rounded-[1rem] border border-[color:var(--line)] bg-white dark:bg-[#111111]">
                      <Image src={src} alt={`Súbor ${index + 1}`} fill className="object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DesktopShell>
  );
}

function ProjectDetailMobileScene() {
  return (
    <PhoneShell active="projects" screenClassName="h-[68vh]">
      <div className="h-full overflow-y-auto bg-white px-4 pb-28 pt-6 dark:bg-[#0a0a0a]">
        <button type="button" className="inline-flex items-center gap-2 text-sm font-medium text-[color:var(--muted)]">
          <ChevronLeftIcon className="h-4 w-4" />
          Naspäť
        </button>

        <div className="mt-4">
          <p className="text-base font-bold text-[color:var(--foreground)]">202603014</p>
          <div className="mt-2">
            <StatusPill label="Cenová ponuka" tone="blue" />
          </div>
          <h3 className="mt-3 font-display text-[2.15rem] font-extrabold leading-none tracking-[-0.045em] text-[color:var(--foreground)]">Rodinný dom Ražtočná</h3>
        </div>

        <div className="mt-4 rounded-[1.25rem] bg-[color:var(--surface)] px-4 py-3 text-sm font-medium text-[color:var(--muted)]">
          Poznámka k cenovej ponuke
        </div>

        <div className="mt-5 space-y-5">
          <div className="space-y-2">
            <h4 className="text-lg font-semibold text-[color:var(--foreground)]">Klient a dodávateľ</h4>
            <div className="space-y-3">
              <div className="rounded-[1.4rem] bg-white p-4 shadow-[0_10px_24px_rgba(0,0,0,0.05)] dark:bg-[#111111]">
                <p className="text-[1.1rem] font-semibold text-[color:var(--foreground)]">Novakovci</p>
                <p className="mt-1 text-sm text-[color:var(--muted)]">Javorová 7</p>
              </div>
              <div className="rounded-[1.4rem] bg-white p-4 shadow-[0_10px_24px_rgba(0,0,0,0.05)] dark:bg-[#111111]">
                <p className="text-[1.1rem] font-semibold text-[color:var(--foreground)]">FIDO Calcul</p>
                <p className="mt-1 text-sm text-[color:var(--muted)]">50291821</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-semibold text-[color:var(--foreground)]">Projekt</h4>
              <div className="flex gap-2">
                <button
                  type="button"
                  className="flex h-9 w-9 items-center justify-center rounded-[1rem] bg-[#ef4444] text-white shadow-[0_12px_24px_rgba(239,68,68,0.24)]"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  className="flex h-9 w-9 items-center justify-center rounded-[1rem] bg-[color:var(--foreground)] text-[color:var(--background)]"
                >
                  <PlusIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="space-y-3">
              {projectDetailRooms.map((room) => (
                <div key={room.name} className="rounded-[1.4rem] bg-white px-4 py-4 shadow-[0_10px_24px_rgba(0,0,0,0.05)] dark:bg-[#111111]">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-[1.05rem] font-semibold text-[color:var(--foreground)]">{room.name}</p>
                      <p className="mt-1 text-sm text-[color:var(--muted)]">{room.works} prác</p>
                    </div>
                    <p className="text-base font-semibold text-[color:var(--foreground)]">{room.total}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-lg font-semibold text-[color:var(--foreground)]">Cenová ponuka</h4>
            <div className="rounded-[1.4rem] bg-white p-4 shadow-[0_10px_24px_rgba(0,0,0,0.05)] dark:bg-[#111111]">
              <div className="space-y-1 text-base font-semibold text-[color:var(--foreground)]">
                <div className="flex items-center justify-between">
                  <span>bez DPH</span>
                  <span>11 060 EUR</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>DPH (23%)</span>
                  <span>2 544 EUR</span>
                </div>
                <div className="flex items-center justify-between pt-1 text-xl font-extrabold">
                  <span>Spolu</span>
                  <span>13 604 EUR</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-lg font-semibold text-[color:var(--foreground)]">Súbory</h4>
            <div className="rounded-[1.4rem] bg-white p-4 shadow-[0_10px_24px_rgba(0,0,0,0.05)] dark:bg-[#111111]">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm font-medium text-[color:var(--muted)]">Projektové podklady</p>
                <button
                  type="button"
                  className="flex h-9 w-9 items-center justify-center rounded-[1rem] bg-[color:var(--foreground)] text-[color:var(--background)]"
                >
                  <PlusIcon className="h-4 w-4" />
                </button>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {projectDetailFiles.slice(0, 3).map((src, index) => (
                  <div key={`${src}-mobile-${index}`} className="relative aspect-square overflow-hidden rounded-[0.95rem] border border-[color:var(--line)] bg-[color:var(--surface)]">
                    <Image src={src} alt={`Súbor ${index + 1}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PhoneShell>
  );
}

function DennikAnalyticsView() {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 rounded-[1.35rem] bg-[color:var(--surface)] p-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex rounded-[1rem] bg-white p-1 shadow-[0_10px_24px_rgba(0,0,0,0.05)] dark:bg-[#111111]">
          {["Den", "Tyzden", "Mesiac"].map((label, index) => (
            <div
              key={label}
              className={cn(
                "flex-1 rounded-[0.85rem] px-4 py-2 text-center text-sm font-semibold",
                index === 2 ? "bg-[#3b82f6] text-white shadow-[0_10px_20px_rgba(59,130,246,0.24)]" : "text-[color:var(--muted)]"
              )}
            >
              {label}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-3">
          <button type="button" className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-[0_10px_24px_rgba(0,0,0,0.06)] dark:bg-[#111111]">
            <ChevronLeftIcon className="h-4 w-4 text-[color:var(--muted)]" />
          </button>
          <span className="min-w-[160px] text-center text-sm font-semibold text-[color:var(--foreground)]">M3/2026</span>
          <button type="button" className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-[0_10px_24px_rgba(0,0,0,0.06)] dark:bg-[#111111]">
            <ArrowRightIcon className="h-4 w-4 text-[color:var(--muted)]" />
          </button>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="rounded-[1.5rem] bg-[color:var(--surface)] p-4 shadow-inner">
          <div className="mb-4 flex items-center justify-between">
            <button type="button" className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-white dark:hover:bg-[#111111]">
              <ChevronLeftIcon className="h-4 w-4 text-[color:var(--muted)]" />
            </button>
            <h4 className="text-base font-semibold capitalize text-[color:var(--foreground)]">marec 2026</h4>
            <button type="button" className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-white dark:hover:bg-[#111111]">
              <ArrowRightIcon className="h-4 w-4 text-[color:var(--muted)]" />
            </button>
          </div>
          <MonthGrid year={2026} month={2} selectedDay={21} activeDays={[4, 6, 9, 14, 18, 19, 21, 27]} rangeStart={16} rangeEnd={22} />
        </div>

        <div className="space-y-4">
          <div className="rounded-[1.15rem] border border-[#d1d5db] bg-white p-4 shadow-[0_10px_24px_rgba(0,0,0,0.05)] dark:border-white/10 dark:bg-[#111111]">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <ClockIcon className="h-4 w-4 text-[color:var(--muted)]" />
                <span className="text-sm font-medium text-[color:var(--muted)]">Celkovy pocet hodin</span>
              </div>
              <span className="text-2xl font-bold text-[color:var(--foreground)]">42,00</span>
            </div>
          </div>

          <div className="rounded-[1.15rem] border border-[#c4b5fd] bg-white p-4 shadow-[0_10px_24px_rgba(0,0,0,0.05)] dark:border-[#4c1d95] dark:bg-[#111111]">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <UsersIcon className="h-4 w-4 text-[#8b5cf6]" />
                <span className="text-sm font-medium text-[color:var(--muted)]">Hodinova sadzba (EUR)</span>
              </div>
              <span className="text-2xl font-bold text-[color:var(--foreground)]">36,00</span>
            </div>
          </div>

          <div className="rounded-[1.15rem] border border-[#86efac] bg-white p-4 shadow-[0_10px_24px_rgba(0,0,0,0.05)] dark:border-[#14532d] dark:bg-[#111111]">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <MoneyIcon className="h-4 w-4 text-[#16a34a]" />
                <span className="text-sm font-medium text-[color:var(--muted)]">Celková suma</span>
              </div>
              <span className="text-2xl font-bold text-[color:var(--foreground)]">1 512 EUR</span>
            </div>
          </div>

          <button
            type="button"
            className="flex w-full items-center justify-center gap-2 rounded-[1.15rem] bg-[#3b82f6] px-4 py-4 text-base font-bold text-white shadow-[0_16px_32px_rgba(59,130,246,0.28)]"
          >
            <PlusIcon className="h-4 w-4" />
            <span>Vytvoriť faktúru</span>
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h5 className="text-lg font-semibold text-[color:var(--foreground)]">Vygenerované faktúry (2)</h5>
          <span className="text-sm text-[color:var(--muted)]">za vybrané obdobie</span>
        </div>
        {generatedInvoices.map((invoice) => (
          <button
            type="button"
            key={invoice.number}
            className="flex w-full items-center justify-between rounded-[1.15rem] bg-[color:var(--surface)] px-4 py-3 text-left"
          >
            <div className="min-w-0">
              <p className="text-base font-semibold text-[color:var(--foreground)]">Faktúra {invoice.number}</p>
              <p className="truncate text-sm text-[color:var(--muted)]">{invoice.title}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-base font-semibold text-[color:var(--foreground)]">{invoice.amount}</span>
              <ArrowRightIcon className="h-4 w-4 text-[color:var(--muted)]" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function DennikTimerView({ mobile = false }: { mobile?: boolean }) {
  return (
    <div className={cn("grid gap-4", mobile ? "" : "xl:grid-cols-[280px_minmax(0,1fr)]")}>
      <div className="rounded-[1.5rem] bg-[color:var(--surface)] p-4 shadow-inner">
        <div className="mb-4 flex items-center justify-between">
          <button type="button" className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-white dark:hover:bg-[#111111]">
            <ChevronLeftIcon className="h-4 w-4 text-[color:var(--muted)]" />
          </button>
          <h4 className="text-base font-semibold capitalize text-[color:var(--foreground)]">marec 2026</h4>
          <button type="button" className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-white dark:hover:bg-[#111111]">
            <ArrowRightIcon className="h-4 w-4 text-[color:var(--muted)]" />
          </button>
        </div>
        <MonthGrid year={2026} month={2} selectedDay={19} activeDays={[4, 6, 9, 14, 18, 19, 21, 27]} compact={mobile} />
      </div>

      <div className="space-y-4">
        <div className="rounded-[1.5rem] bg-[linear-gradient(135deg,#22c55e,#16a34a)] p-5 text-white">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm text-white/70">streda, 19. marec</p>
              <h4 className="mt-2 text-[2.25rem] font-extrabold leading-none">02:14:27</h4>
              <p className="mt-2 text-sm text-white/72">Aktívny timer</p>
            </div>
            <TimerIcon className="h-11 w-11 text-white/55" />
          </div>
          <div className="mt-4 flex gap-3">
            <button type="button" className="flex flex-1 items-center justify-center gap-2 rounded-[1.25rem] bg-white px-4 py-4 text-base font-bold text-[#111111]">
              <CheckIcon className="h-4 w-4" />
              <span>Stop timer</span>
            </button>
            <button type="button" className="flex h-[54px] w-[54px] items-center justify-center rounded-[1.25rem] bg-white/18 text-white">
              <PlusIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {[
            { time: "08:00 - 10:15", note: "Montáž okien v obývačke", hours: "2h 15m" },
            { time: "10:45 - 12:30", note: "Tesnenie a doplnky", hours: "1h 45m" },
            { time: "13:30 - 15:00", note: "Dokončenie detailov", hours: "1h 30m" },
          ].map((entry) => (
            <div key={entry.time} className="rounded-[1.15rem] border border-[color:var(--line)] bg-white px-4 py-3 shadow-[0_10px_24px_rgba(0,0,0,0.05)] dark:bg-[#111111]">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-[color:var(--foreground)]">{entry.time}</p>
                  <p className="mt-1 text-sm text-[color:var(--muted)]">{entry.note}</p>
                </div>
                <span className="rounded-full bg-[color:var(--surface)] px-3 py-1 text-xs font-semibold text-[color:var(--foreground)]">
                  {entry.hours}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DennikMembersView() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[color:var(--muted)]" />
          <input
            readOnly
            value=""
            placeholder="Pridať člena"
            className="w-full rounded-[1.25rem] border border-[color:var(--line)] bg-[color:var(--surface)] py-3 pl-10 pr-4 text-sm text-[color:var(--foreground)]"
          />
        </div>
        <button type="button" className="flex h-11 w-11 items-center justify-center rounded-[1.25rem] bg-[color:var(--foreground)] text-[color:var(--background)]">
          <PlusIcon className="h-4 w-4" />
        </button>
      </div>

      <div className="space-y-3">
        {dennikMembers.map((member) => (
          <div key={member.email} className="flex items-center justify-between gap-3 rounded-[1.25rem] border border-[color:var(--line)] bg-white px-4 py-3 shadow-[0_10px_24px_rgba(0,0,0,0.05)] dark:bg-[#111111]">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[color:var(--surface)] text-sm font-semibold text-[color:var(--foreground)]">
                {member.name.charAt(0)}
              </div>
              <div className="min-w-0">
                <p className="truncate text-base font-semibold text-[color:var(--foreground)]">{member.name}</p>
                <p className="truncate text-sm text-[color:var(--muted)]">{member.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {member.status === "pending" ? (
                <span className="rounded-full bg-[#f59e0b] px-2 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white">
                  Caka
                </span>
              ) : null}
              <span className="rounded-full bg-[color:var(--surface)] px-3 py-1 text-xs font-semibold text-[color:var(--foreground)]">{member.hours}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DennikContent({ tab, mobile = false }: { tab: DennikTab; mobile?: boolean }) {
  if (tab === "timer") return <DennikTimerView mobile={mobile} />;
  if (tab === "members") return <DennikMembersView />;
  return <DennikAnalyticsView />;
}

function DennikTabs({ activeTab, onChange }: { activeTab: DennikTab; onChange: (tab: DennikTab) => void }) {
  const items: Array<{ id: DennikTab; label: string; icon: ReactNode; tone: "green" | "blue" }> = [
    { id: "timer", label: "Prehľad", icon: <ClockIcon className="h-4 w-4" />, tone: "green" },
    { id: "members", label: "Členovia", icon: <UsersIcon className="h-4 w-4" />, tone: "green" },
    { id: "analytics", label: "Fakturácia", icon: <BarChartIcon className="h-4 w-4" />, tone: "blue" },
  ];

  return (
    <div className="flex gap-2">
      {items.map((item) => {
        const active = activeTab === item.id;
        const toneClass =
          item.tone === "green"
            ? active
              ? "bg-[#22c55e] text-white shadow-[0_14px_28px_rgba(34,197,94,0.24)]"
              : "text-[color:var(--muted)] hover:bg-[color:var(--surface)]"
            : active
              ? "bg-[#3b82f6] text-white shadow-[0_14px_28px_rgba(59,130,246,0.24)]"
              : "text-[color:var(--muted)] hover:bg-[color:var(--surface)]";

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onChange(item.id)}
            className={cn("flex flex-1 items-center justify-center gap-2 rounded-[0.95rem] px-4 py-2 text-sm font-semibold transition-colors", toneClass)}
          >
            {item.icon}
            <span className="truncate">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}

function DennikDesktopScene() {
  const [activeTab, setActiveTab] = useState<DennikTab>("analytics");

  return (
    <DesktopShell active="dennik">
      <div className="relative min-h-[700px] overflow-hidden rounded-[1.8rem] bg-[linear-gradient(180deg,rgba(0,0,0,0.02),transparent)] dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.03),transparent)]">
        <div className="absolute inset-0 p-6 opacity-45 blur-[1px]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-[color:var(--muted)]">Bytový dom Oknárska</p>
              <h3 className="mt-2 font-display text-[3.2rem] font-extrabold leading-none tracking-[-0.05em] text-[color:var(--foreground)]">Projekt</h3>
            </div>
            <div className="flex gap-2">
              <AppHeaderButton>
                <ArchiveIcon className="h-4 w-4" />
              </AppHeaderButton>
              <AppHeaderButton dark>
                <PlusIcon className="h-4 w-4" />
              </AppHeaderButton>
            </div>
          </div>
          <div className="mt-8 grid gap-3 xl:grid-cols-2">
            {projectRows.construction.map((project) => (
              <ProjectRow key={project.id} project={project} />
            ))}
          </div>
        </div>

        <div className="absolute inset-x-6 top-6 bottom-6 overflow-hidden rounded-[2rem] border border-[color:var(--line)] bg-white/96 shadow-[0_38px_90px_rgba(0,0,0,0.18)] backdrop-blur-xl dark:bg-[#0f0f0f]/96">
          <div className="border-b border-[color:var(--line)] px-5 pb-4 pt-5">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h3 className="truncate text-[1.9rem] font-bold leading-none text-[color:var(--foreground)]">Denník — Bytový dom Oknárska</h3>
                <p className="mt-2 truncate text-sm text-[color:var(--muted)]">Slowackeho 18, Bratislava</p>
              </div>
              <button type="button" className="flex h-9 w-9 items-center justify-center rounded-full text-[color:var(--muted)] transition-colors hover:bg-[color:var(--surface)] hover:text-[color:var(--foreground)]">
                <XIcon className="h-5 w-5" />
              </button>
            </div>
            <DennikTabs activeTab={activeTab} onChange={setActiveTab} />
          </div>
          <div className="h-[calc(100%-110px)] overflow-y-auto p-5">
            <DennikContent tab={activeTab} />
          </div>
        </div>
      </div>
    </DesktopShell>
  );
}

function DennikMobileScene() {
  const [activeTab, setActiveTab] = useState<DennikTab>("analytics");

  return (
    <PhoneShell active="dennik">
      <div className="h-full overflow-y-auto bg-black/40 px-0 pb-28 pt-12">
        <div className="min-h-full rounded-t-[2rem] bg-white shadow-[0_-18px_42px_rgba(0,0,0,0.18)] dark:bg-[#0f0f0f]">
          <div className="border-b border-[color:var(--line)] px-5 pb-4 pt-5">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h3 className="truncate text-[1.8rem] font-bold leading-none text-[color:var(--foreground)]">Denník</h3>
                <p className="mt-1 truncate text-sm text-[color:var(--muted)]">— Bytový dom Oknárska</p>
                <p className="mt-1 text-sm text-[color:var(--muted)]">Slowackeho 18</p>
              </div>
              <button type="button" className="flex h-9 w-9 items-center justify-center rounded-full text-[color:var(--muted)]">
                <XIcon className="h-5 w-5" />
              </button>
            </div>
            <DennikTabs activeTab={activeTab} onChange={setActiveTab} />
          </div>
          <div className="p-4">
            <DennikContent tab={activeTab} mobile />
          </div>
        </div>
      </div>
    </PhoneShell>
  );
}

function invoiceStatusStyle(status: InvoicePreviewRecord["status"]) {
  if (status === "paid") return { color: "#73D38A", text: "white" };
  if (status === "overdue") return { color: "#FF857C", text: "white" };
  return { color: "#51A2F7", text: "white" };
}

function InvoiceListRow({ invoice, active = false }: { invoice: InvoicePreviewRecord; active?: boolean }) {
  const style = invoiceStatusStyle(invoice.status);

  return (
    <div
      className={cn(
        "rounded-[1.5rem] border px-[15px] py-[10px] shadow-sm transition-all duration-200",
        active
          ? "border-black/10 bg-white shadow-[0_18px_46px_rgba(10,10,10,0.12)] dark:border-white/10 dark:bg-[#111111]"
          : "border-black/10 bg-white/92 dark:border-white/10 dark:bg-[#111111]"
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 text-[13px] font-medium text-[color:var(--muted)]">
            <span>{invoice.number}</span>
            <span className="font-semibold">{invoice.issueDate}</span>
          </div>
          <h4 className="mt-1 truncate text-[22px] font-semibold leading-[1.08] text-[color:var(--foreground)]">{invoice.projectName}</h4>
          <p className="truncate text-[13px] font-medium text-[color:var(--muted)]">{invoice.clientName}</p>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <div className="text-right">
            <span
              className="mb-1 inline-flex items-center rounded-full px-1.5 py-0.5 text-[10px] font-medium text-white dark:text-gray-900"
              style={{ backgroundColor: style.color, color: style.text }}
            >
              {invoice.statusLabel}
            </span>
            <div className="text-[20px] font-semibold text-[color:var(--foreground)]">{invoice.amount}</div>
            <div className="text-xs text-[color:var(--muted)]">Bez DPH</div>
          </div>
          <ArrowRightIcon className="h-4 w-4 text-[color:var(--muted)]" />
        </div>
      </div>
    </div>
  );
}

function CreateInvoiceOverlay({ invoice }: { invoice: InvoicePreviewRecord }) {
  return (
    <div className="absolute inset-x-6 top-6 bottom-6 flex overflow-hidden rounded-[2rem] border border-[color:var(--line)] bg-white/96 shadow-[0_38px_90px_rgba(0,0,0,0.18)] backdrop-blur-xl dark:bg-[#0f0f0f]/96">
      <div className="flex min-h-0 flex-1 flex-col">
      <div className="border-b border-[color:var(--line)] px-6 py-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="truncate text-[2.2rem] font-bold leading-none text-[color:var(--foreground)]">Vytvoriť faktúru</h3>
            <p className="mt-2 text-sm text-[color:var(--muted)]">{invoice.projectName}</p>
          </div>
          <button type="button" className="flex h-9 w-9 items-center justify-center rounded-full text-[color:var(--muted)] transition-colors hover:bg-[color:var(--surface)] hover:text-[color:var(--foreground)]">
            <XIcon className="h-5 w-5" />
          </button>
        </div>
        <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
          {[
            { label: "Faktúra", active: true },
            { label: "Zálohová faktúra", active: false },
            { label: "Dodací list", active: false },
          ].map((type) => (
            <button
              key={type.label}
              type="button"
              className={cn(
                "whitespace-nowrap rounded-[0.95rem] px-4 py-2 text-sm font-semibold transition-colors",
                type.active
                  ? "bg-[color:var(--foreground)] text-[color:var(--background)] shadow-[0_12px_26px_rgba(10,10,10,0.16)]"
                  : "border border-[color:var(--line)] bg-white text-[color:var(--muted)] dark:bg-[#111111]"
              )}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-8 pt-5 space-y-5">
        <div className="space-y-5">
          <div className="space-y-2">
            <h4 className="text-[1.45rem] font-semibold text-[color:var(--foreground)]">Zhrnutie</h4>
            <div className="rounded-[1.5rem] border border-[color:var(--line)] bg-white px-5 py-4 shadow-[0_10px_24px_rgba(0,0,0,0.05)] dark:bg-[#111111]">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[15px] font-semibold text-[color:var(--foreground)]">
                  <span>Cena bez DPH</span>
                  <span>11 060,00 €</span>
                </div>
                <div className="flex items-center justify-between text-[15px] font-semibold text-[color:var(--foreground)]">
                  <span>DPH</span>
                  <span>2 543,80 €</span>
                </div>
                <div className="flex items-center justify-between pt-0.5 text-[18px] font-semibold text-[color:var(--foreground)]">
                  <span>Celková cena</span>
                  <span>13 603,80 €</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-[1.45rem] font-semibold text-[color:var(--foreground)]">Nastavenia</h4>
            <div className="space-y-3">
              <div className="rounded-[1.35rem] bg-[color:var(--surface)] px-4 py-3">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-base font-medium text-[color:var(--foreground)]">Číslo faktúry</span>
                  <div className="rounded-[0.95rem] border-2 border-[color:var(--foreground)] bg-white px-3 py-2 text-right text-base font-medium text-[color:var(--foreground)] dark:bg-[#111111]">
                    202603015
                  </div>
                </div>
              </div>

              <div className="rounded-[1.35rem] bg-[color:var(--surface)] px-4 py-4">
                <span className="block text-base font-medium text-[color:var(--foreground)]">Názov projektu</span>
                <div className="mt-2 rounded-[1rem] border-2 border-[color:var(--foreground)] bg-white px-4 py-3 text-base text-[color:var(--foreground)] dark:bg-[#111111]">
                  {invoice.projectName}
                </div>
              </div>

              <div className="rounded-[1.35rem] bg-[color:var(--surface)] px-4 py-4">
                <span className="block text-base font-medium text-[color:var(--foreground)]">Klient</span>
                <div className="mt-2 flex items-center gap-3 rounded-[1rem] bg-white p-3 shadow-sm dark:bg-[#111111]">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#dbeafe] text-[#2563eb]">
                    <UserIcon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-base font-semibold text-[color:var(--foreground)]">{invoice.clientName}</p>
                    <p className="truncate text-xs text-[color:var(--muted)]">kontakt@fido.sk</p>
                  </div>
                </div>
              </div>

              <div className="rounded-[1.35rem] bg-[color:var(--surface)] px-4 py-4">
                <span className="block text-base font-medium text-[color:var(--foreground)]">Úvodná poznámka</span>
                <div className="mt-2 rounded-[1rem] border-2 border-[color:var(--foreground)] bg-white px-4 py-3 text-base text-[color:var(--foreground)] dark:bg-[#111111]">
                  Cenová ponuka CP-2026-014
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-[1.35rem] bg-[color:var(--surface)] px-4 py-3">
                  <span className="block text-base font-medium text-[color:var(--foreground)]">Dátum vystavenia</span>
                  <div className="mt-2 rounded-[0.95rem] border border-[color:var(--line)] bg-white px-3 py-2 text-sm font-medium text-[color:var(--foreground)] dark:bg-[#111111]">
                    29. 3. 2026
                  </div>
                </div>
                <div className="rounded-[1.35rem] bg-[color:var(--surface)] px-4 py-3">
                  <span className="block text-base font-medium text-[color:var(--foreground)]">Dátum dodania</span>
                  <div className="mt-2 rounded-[0.95rem] border border-[color:var(--line)] bg-white px-3 py-2 text-sm font-medium text-[color:var(--foreground)] dark:bg-[#111111]">
                    29. 3. 2026
                  </div>
                </div>
              </div>

              <div className="rounded-[1.35rem] bg-[color:var(--surface)] px-4 py-3">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-base font-medium text-[color:var(--foreground)]">Typ úhrady</span>
                  <div className="flex gap-2">
                    <button type="button" className="rounded-[0.9rem] bg-[color:var(--foreground)] px-4 py-2 text-sm font-medium text-[color:var(--background)]">
                      Bankový prevod
                    </button>
                    <button type="button" className="rounded-[0.9rem] border border-[color:var(--line)] bg-white px-4 py-2 text-sm font-medium text-[color:var(--muted)] dark:bg-[#111111]">
                      Hotovosť
                    </button>
                  </div>
                </div>
              </div>

              <div className="rounded-[1.35rem] bg-[color:var(--surface)] px-4 py-4">
                <span className="block text-base font-medium text-[color:var(--foreground)]">Splatnosť faktúry</span>
                <div className="mt-3 grid grid-cols-4 gap-2">
                  {[7, 14, 30, 45].map((days, index) => (
                    <button
                      key={days}
                      type="button"
                      className={cn(
                        "rounded-[0.95rem] px-3 py-2 text-center text-sm font-semibold",
                        index === 1
                          ? "bg-[color:var(--foreground)] text-[color:var(--background)]"
                          : "border border-[color:var(--line)] bg-white text-[color:var(--foreground)] dark:bg-[#111111]"
                      )}
                    >
                      {days} dní
                    </button>
                  ))}
                </div>
                <p className="mt-2 text-right text-xs text-[color:var(--muted)]">Splatnosť: 12. 4. 2026</p>
              </div>

              <div className="rounded-[1.35rem] bg-[color:var(--surface)] px-4 py-4">
                <span className="block text-base font-medium text-[color:var(--foreground)]">Poznámka na záver</span>
                <div className="mt-2 min-h-[96px] rounded-[1rem] border-2 border-[color:var(--foreground)] bg-white px-4 py-3 text-sm leading-7 text-[color:var(--muted)] dark:bg-[#111111]">
                  Ďakujeme za spoluprácu. Položky je ešte možné upraviť pred vygenerovaním PDF.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="space-y-2">
            <h4 className="text-[1.45rem] font-semibold text-[color:var(--foreground)]">Položky</h4>
            <div className="rounded-[1.5rem] border border-[color:var(--line)] bg-white px-5 py-4 shadow-[0_10px_24px_rgba(0,0,0,0.05)] dark:bg-[#111111]">
              <div className="relative mb-4">
                <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[color:var(--muted)]" />
                <input
                  readOnly
                  value=""
                  placeholder="Vyhľadať a pridať položku..."
                  className="w-full rounded-[1rem] bg-[color:var(--surface)] py-3 pl-12 pr-12 text-sm text-[color:var(--foreground)] outline-none"
                />
                <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-[color:var(--foreground)]">
                  <PlusIcon className="h-5 w-5" />
                </button>
              </div>

              <div className="grid gap-4 xl:grid-cols-3">
                {[
                  {
                    heading: "Práca",
                    items: [
                      { name: "Montáž okien", meta: "12 h · 36,00 € / h", total: "432,00 €" },
                      { name: "Tesnenie a doplnky", meta: "8 h · 34,00 € / h", total: "272,00 €" },
                    ],
                  },
                  {
                    heading: "Materiál",
                    items: [
                      { name: "Kovanie", meta: "4 ks · 128,00 €", total: "512,00 €" },
                      { name: "Parapety", meta: "6 ks · 74,00 €", total: "444,00 €" },
                    ],
                  },
                  {
                    heading: "Ostatné",
                    items: [
                      { name: "Doprava", meta: "1 × 68,00 €", total: "68,00 €" },
                      { name: "Lešenie", meta: "1 × 95,00 €", total: "95,00 €" },
                    ],
                  },
                ].map((group) => (
                  <div key={group.heading} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h5 className="text-base font-bold text-[color:var(--foreground)]">{group.heading}</h5>
                      <div className="flex items-center gap-1">
                        <button type="button" className="rounded-[0.75rem] bg-[#ef4444] p-1.5 text-white">
                          <TrashIcon className="h-4 w-4" />
                        </button>
                        <button type="button" className="rounded-[0.75rem] bg-[color:var(--foreground)] p-1.5 text-[color:var(--background)]">
                          <PlusIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {group.items.map((item) => (
                        <div key={item.name} className="rounded-[1rem] bg-[color:var(--surface)] px-4 py-3">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <p className="truncate text-sm font-semibold text-[color:var(--foreground)]">{item.name}</p>
                              <p className="mt-1 text-xs text-[color:var(--muted)]">{item.meta}</p>
                            </div>
                            <p className="text-sm font-semibold text-[color:var(--foreground)]">{item.total}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>

        <div className="mt-auto border-t border-[color:var(--line)] bg-white/96 px-5 py-4 backdrop-blur-xl dark:bg-[#111111]/96">
          <button
            type="button"
            className="btn-blue-gradient-web w-full rounded-[1.1rem] px-4 py-3 text-base font-extrabold text-white"
          >
            Vystaviť faktúru
          </button>
        </div>
      </div>
    </div>
  );
}

function InvoicesDesktopScene() {
  const [selectedInvoiceId] = useState(invoicePreviewRecords[0].id);
  const selectedInvoice = invoicePreviewRecords.find((invoice) => invoice.id === selectedInvoiceId) ?? invoicePreviewRecords[0];

  return (
    <DesktopShell active="invoices">
      <div className="relative min-h-[700px] overflow-hidden rounded-[1.8rem] bg-[linear-gradient(180deg,rgba(0,0,0,0.02),transparent)] dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.03),transparent)]">
        <div className="absolute inset-0 p-6 opacity-45 blur-[1px]">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display text-[3rem] font-extrabold leading-none tracking-[-0.05em] text-[color:var(--foreground)]">Faktúry</h3>
              <p className="mt-2 text-sm text-[color:var(--muted)]">Doklady, stavy a ceny na jednom mieste.</p>
            </div>
            <div className="flex gap-2">
              <AppHeaderButton>
                <DocumentIcon className="h-4 w-4" />
              </AppHeaderButton>
              <AppHeaderButton dark>
                <PlusIcon className="h-4 w-4" />
              </AppHeaderButton>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-4">
            <button type="button" className="inline-flex items-center gap-2 rounded-[1rem] border border-black/12 bg-white px-3 py-1.5 text-sm font-medium text-[color:var(--foreground)] shadow-sm dark:border-white/12 dark:bg-[#111111]">
              <span>2026</span>
              <ChevronDownIcon className="h-4 w-4" />
            </button>
            <div className="flex gap-2">
              {["Všetky", "Uhradené", "Neuhradené", "Po splatnosti"].map((filter, index) => (
                <div
                  key={filter}
                  className={cn(
                    "rounded-full border-2 px-4 py-1.5 text-sm font-bold",
                    index === 0
                      ? "border-gray-900 bg-gray-900 text-white"
                      : "border-transparent text-[color:var(--muted)]"
                  )}
                >
                  {filter}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 space-y-3">
            {invoicePreviewRecords.map((invoice, index) => (
              <InvoiceListRow key={invoice.id} invoice={invoice} active={index === 0} />
            ))}
          </div>
        </div>

        <CreateInvoiceOverlay invoice={selectedInvoice} />
      </div>
    </DesktopShell>
  );
}

function InvoicesMobileScene() {
  const [selectedInvoiceId] = useState(invoicePreviewRecords[0].id);
  const selectedInvoice = invoicePreviewRecords.find((invoice) => invoice.id === selectedInvoiceId) ?? invoicePreviewRecords[0];

  return (
    <PhoneShell active="invoices">
      <div className="relative h-full overflow-y-auto bg-white px-4 pb-28 pt-6 dark:bg-[#0a0a0a]">
        <div className="opacity-45 blur-[1px]">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-[2.2rem] font-extrabold leading-none tracking-[-0.05em] text-[color:var(--foreground)]">Faktúry</h3>
            <AppHeaderButton dark>
              <PlusIcon className="h-4 w-4" />
            </AppHeaderButton>
          </div>

          <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
            {["Všetky", "Uhradené", "Neuhradené"].map((filter, index) => (
              <div
                key={filter}
                className={cn(
                  "whitespace-nowrap rounded-full border-2 px-4 py-1.5 text-sm font-bold",
                  index === 0
                    ? "border-gray-900 bg-gray-900 text-white"
                    : "border-transparent text-[color:var(--muted)]"
                )}
              >
                {filter}
              </div>
            ))}
          </div>

          <div className="mt-4 space-y-3">
            {invoicePreviewRecords.map((invoice, index) => (
              <InvoiceListRow key={invoice.id} invoice={invoice} active={index === 0} />
            ))}
          </div>
        </div>

        <div className="absolute inset-x-4 top-20 bottom-6 overflow-hidden rounded-[2rem] border border-[color:var(--line)] bg-white/96 shadow-[0_38px_90px_rgba(0,0,0,0.18)] backdrop-blur-xl dark:bg-[#0f0f0f]/96">
          <div className="border-b border-[color:var(--line)] px-5 py-4">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h3 className="truncate text-[1.8rem] font-bold leading-none text-[color:var(--foreground)]">Vytvoriť faktúru</h3>
                <p className="mt-1 truncate text-sm text-[color:var(--muted)]">{selectedInvoice.projectName}</p>
              </div>
              <button type="button" className="flex h-9 w-9 items-center justify-center rounded-full text-[color:var(--muted)]">
                <XIcon className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
              {["Faktúra", "Zálohová", "Dodací list"].map((type, index) => (
                <button
                  key={type}
                  type="button"
                  className={cn(
                    "whitespace-nowrap rounded-[0.9rem] px-3 py-2 text-sm font-semibold",
                    index === 0
                      ? "bg-[color:var(--foreground)] text-[color:var(--background)]"
                      : "border border-[color:var(--line)] bg-white text-[color:var(--muted)] dark:bg-[#111111]"
                  )}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-4 overflow-y-auto p-4">
            <div className="space-y-2">
              <h4 className="text-lg font-semibold text-[color:var(--foreground)]">Zhrnutie</h4>
              <div className="rounded-[1.3rem] bg-[color:var(--surface)] p-4">
                <div className="space-y-1 text-[15px] font-semibold text-[color:var(--foreground)]">
                  <div className="flex items-center justify-between">
                    <span>Cena bez DPH</span>
                    <span>11 060,00 €</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>DPH</span>
                    <span>2 543,80 €</span>
                  </div>
                  <div className="flex items-center justify-between pt-1 text-lg">
                    <span>Celková cena</span>
                    <span>13 603,80 €</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-lg font-semibold text-[color:var(--foreground)]">Nastavenia</h4>
              <div className="rounded-[1.3rem] bg-[color:var(--surface)] p-4">
                <div className="space-y-3">
                  {[
                    ["Číslo faktúry", "202603015"],
                    ["Názov projektu", selectedInvoice.projectName],
                    ["Klient", selectedInvoice.clientName],
                    ["Dátum vystavenia", "29. 3. 2026"],
                  ].map(([label, value]) => (
                    <div key={label}>
                      <p className="text-sm font-medium text-[color:var(--foreground)]">{label}</p>
                      <div className="mt-1 rounded-[0.95rem] border border-[color:var(--line)] bg-white px-3 py-2 text-sm text-[color:var(--foreground)] dark:bg-[#111111]">
                        {value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-lg font-semibold text-[color:var(--foreground)]">Položky</h4>
              <div className="rounded-[1.3rem] bg-[color:var(--surface)] p-4">
                <div className="relative">
                  <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[color:var(--muted)]" />
                  <input
                    readOnly
                    value=""
                    placeholder="Vyhľadať a pridať položku..."
                    className="w-full rounded-[0.95rem] bg-white py-3 pl-10 pr-10 text-sm text-[color:var(--foreground)] dark:bg-[#111111]"
                  />
                  <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-[color:var(--foreground)]">
                    <PlusIcon className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-4 space-y-4">
                  {[
                    {
                      heading: "Práca",
                      items: [
                        ["Montáž okien", "12 h · 36,00 € / h", "432,00 €"],
                        ["Tesnenie a doplnky", "8 h · 34,00 € / h", "272,00 €"],
                      ],
                    },
                    {
                      heading: "Materiál",
                      items: [["Kovanie", "4 ks · 128,00 €", "512,00 €"]],
                    },
                    {
                      heading: "Ostatné",
                      items: [["Doprava", "1 × 68,00 €", "68,00 €"]],
                    },
                  ].map((group) => (
                    <div key={group.heading}>
                      <div className="mb-2 flex items-center justify-between">
                        <h5 className="text-sm font-bold text-[color:var(--foreground)]">{group.heading}</h5>
                        <div className="flex gap-1">
                          <button type="button" className="rounded-[0.7rem] bg-[#ef4444] p-1.5 text-white">
                            <TrashIcon className="h-3.5 w-3.5" />
                          </button>
                          <button type="button" className="rounded-[0.7rem] bg-[color:var(--foreground)] p-1.5 text-[color:var(--background)]">
                            <PlusIcon className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        {group.items.map(([name, meta, total]) => (
                          <div key={name} className="rounded-[0.95rem] bg-white px-3 py-3 dark:bg-[#111111]">
                            <div className="flex items-start justify-between gap-3">
                              <div className="min-w-0">
                                <p className="truncate text-sm font-semibold text-[color:var(--foreground)]">{name}</p>
                                <p className="mt-1 text-xs text-[color:var(--muted)]">{meta}</p>
                              </div>
                              <p className="text-sm font-semibold text-[color:var(--foreground)]">{total}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <button type="button" className="w-full rounded-[1rem] bg-[#3b82f6] px-4 py-3 text-sm font-extrabold text-white shadow-[0_14px_28px_rgba(59,130,246,0.28)]">
              Vystaviť faktúru
            </button>
          </div>
        </div>
      </div>
    </PhoneShell>
  );
}

function ClientDetailPanel({ client }: { client: ClientRecord }) {
  const CorporationOrPerson = client.type === "corporation" ? BuildingIcon : UserIcon;

  return (
    <div className="rounded-[1.8rem] border border-[color:var(--line)] bg-white p-5 shadow-[0_16px_38px_rgba(0,0,0,0.08)] dark:bg-[#111111]">
      <div className="mb-6 flex flex-col items-center text-center">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[color:var(--foreground)] text-[color:var(--background)] shadow-[0_18px_40px_rgba(0,0,0,0.14)]">
          <CorporationOrPerson className="h-10 w-10" />
        </div>
        <p className="mt-4 text-sm font-medium text-[color:var(--muted)]">
          {client.type === "corporation" ? "Firemná osoba" : "Súkromná osoba"}
        </p>
        <button type="button" className="mt-1 inline-flex items-center gap-1 text-xs text-[color:var(--foreground)] underline underline-offset-2">
          <span>Zmeniť typ osoby</span>
          <ChevronDownIcon className="h-4 w-4" />
        </button>
      </div>

      <div className="space-y-4">
        <div className="rounded-[1.5rem] border border-[color:var(--line)] bg-[color:var(--surface)] p-4">
          <p className="mb-3 text-sm font-semibold text-[color:var(--foreground)]">Kontakt</p>
          <div className="space-y-3">
            <div className="rounded-[1rem] border border-[color:var(--line)] bg-white px-4 py-3 dark:bg-[#0f0f0f]">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">Názov firmy</p>
              <p className="mt-1 text-[1.15rem] font-semibold text-[color:var(--foreground)]">{client.name}</p>
            </div>
            <div className="rounded-[1rem] border border-[color:var(--line)] bg-white px-4 py-3 dark:bg-[#0f0f0f]">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">E-mail</p>
              <p className="mt-1 text-[1.05rem] font-semibold text-[color:var(--foreground)]">{client.email}</p>
            </div>
            <div className="rounded-[1rem] border border-[color:var(--line)] bg-white px-4 py-3 dark:bg-[#0f0f0f]">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">Telefónne číslo</p>
              <p className="mt-1 text-[1.05rem] font-semibold text-[color:var(--foreground)]">{client.phone}</p>
            </div>
            {client.contactPerson ? (
              <div className="rounded-[1rem] border border-[color:var(--line)] bg-white px-4 py-3 dark:bg-[#0f0f0f]">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">Kontaktná osoba</p>
                <p className="mt-1 text-[1.05rem] font-semibold text-[color:var(--foreground)]">{client.contactPerson}</p>
              </div>
            ) : null}
          </div>
        </div>

        {client.type === "corporation" ? (
          <div className="rounded-[1.5rem] border border-[color:var(--line)] bg-[color:var(--surface)] p-4">
            <p className="mb-3 text-sm font-semibold text-[color:var(--foreground)]">Firemné informácie</p>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-[1rem] border border-[color:var(--line)] bg-white px-4 py-3 dark:bg-[#0f0f0f]">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">IČO</p>
                <p className="mt-1 text-sm font-semibold text-[color:var(--foreground)]">{client.businessId}</p>
              </div>
              <div className="rounded-[1rem] border border-[color:var(--line)] bg-white px-4 py-3 dark:bg-[#0f0f0f]">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">DIČ</p>
                <p className="mt-1 text-sm font-semibold text-[color:var(--foreground)]">{client.taxId}</p>
              </div>
              <div className="rounded-[1rem] border border-[color:var(--line)] bg-white px-4 py-3 dark:bg-[#0f0f0f]">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">IČ DPH</p>
                <p className="mt-1 text-sm font-semibold text-[color:var(--foreground)]">{client.vatId}</p>
              </div>
            </div>
          </div>
        ) : null}

        <div className="rounded-[1.5rem] border border-[color:var(--line)] bg-[color:var(--surface)] p-4">
          <p className="mb-3 text-sm font-semibold text-[color:var(--foreground)]">Adresa</p>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-[1rem] border border-[color:var(--line)] bg-white px-4 py-3 dark:bg-[#0f0f0f]">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">Ulica</p>
              <p className="mt-1 text-sm font-semibold text-[color:var(--foreground)]">{client.street}</p>
            </div>
            <div className="rounded-[1rem] border border-[color:var(--line)] bg-white px-4 py-3 dark:bg-[#0f0f0f]">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">Mesto</p>
              <p className="mt-1 text-sm font-semibold text-[color:var(--foreground)]">{client.city}</p>
            </div>
          </div>
        </div>

        <div>
          <div className="mb-3 flex items-center justify-between">
            <h4 className="text-lg font-semibold text-[color:var(--foreground)]">Projekty</h4>
            <span className="text-sm text-[color:var(--muted)]">{client.projects.length}</span>
          </div>
          <div className="space-y-3">
            {client.projects.map((project) => (
              <div key={project.name} className="flex gap-3">
                <div className="min-w-0 flex-1 rounded-[1.15rem] bg-[color:var(--surface)] px-4 py-3">
                  <p className="truncate text-[1.05rem] font-semibold text-[color:var(--foreground)]">{project.name}</p>
                  <p className="text-sm text-[color:var(--muted)]">{project.rooms} miestností</p>
                </div>
                <div className="flex w-[102px] flex-col items-center justify-center rounded-[1.15rem] border border-[color:var(--line)] bg-white px-3 py-3 text-center dark:bg-[#0f0f0f]">
                  <DocumentIcon className="h-4 w-4 text-[#2563eb]" />
                  <p className="mt-2 text-[11px] font-bold text-[color:var(--foreground)]">#{project.invoice}</p>
                  <p className="mt-1 text-[11px] text-[color:var(--muted)]">{project.total}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ClientsDesktopScene() {
  const [selectedClientId, setSelectedClientId] = useState(clients[0].id);
  const selectedClient = clients.find((client) => client.id === selectedClientId) ?? clients[0];

  return (
    <DesktopShell active="clients" viewportClassName="h-[70vh] min-h-0">
      <div className="grid h-full gap-4 xl:grid-cols-[minmax(0,0.88fr)_minmax(340px,0.92fr)]">
        <div className="space-y-4 overflow-y-auto pr-1">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h3 className="font-display text-[2rem] font-extrabold leading-none tracking-[-0.05em] text-[color:var(--foreground)]">Klienti</h3>
              <p className="mt-2 text-sm text-[color:var(--muted)]">Karty klientov, prepojene projekty a dokumenty v jednom rytme.</p>
            </div>
            <div className="flex gap-2">
              <AppHeaderButton>
                <ArchiveIcon className="h-4 w-4" />
              </AppHeaderButton>
              <AppHeaderButton dark>
                <PlusIcon className="h-4 w-4" />
              </AppHeaderButton>
            </div>
          </div>

          <div className="relative">
            <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[color:var(--muted)]" />
            <input
              readOnly
              placeholder="Hľadať"
              className="w-full rounded-[1.35rem] border-2 border-[color:var(--foreground)] bg-white py-3 pl-10 pr-4 text-sm text-[color:var(--foreground)] dark:bg-[#111111]"
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {clients.map((client) => (
              <button
                key={client.id}
                type="button"
                onClick={() => setSelectedClientId(client.id)}
                className={cn(
                  "rounded-[1.5rem] border bg-[color:var(--surface)] p-4 text-left transition-all duration-200",
                  selectedClient.id === client.id
                    ? "border-[color:var(--foreground)] shadow-[0_18px_46px_rgba(10,10,10,0.14)]"
                    : "border-transparent hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)]"
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-[1.3rem] font-semibold leading-none text-[color:var(--foreground)]">{client.name}</p>
                    <p className="mt-2 truncate text-sm text-[color:var(--muted)]">{client.address}</p>
                  </div>
                  <ArrowRightIcon className="h-4 w-4 shrink-0 text-[color:var(--muted)]" />
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-y-auto pr-1">
          <ClientDetailPanel client={selectedClient} />
        </div>
      </div>
    </DesktopShell>
  );
}

function ClientsMobileScene() {
  const [selectedClientId, setSelectedClientId] = useState(clients[0].id);
  const selectedClient = clients.find((client) => client.id === selectedClientId) ?? clients[0];

  return (
    <PhoneShell active="clients" screenClassName="h-[70vh]">
      <div className="h-full overflow-y-auto bg-white px-4 pb-28 pt-6 dark:bg-[#0a0a0a]">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-[2.2rem] font-extrabold leading-none tracking-[-0.05em] text-[color:var(--foreground)]">Klienti</h3>
          <AppHeaderButton dark>
            <PlusIcon className="h-4 w-4" />
          </AppHeaderButton>
        </div>

        <div className="relative mt-4">
          <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[color:var(--muted)]" />
          <input
            readOnly
              placeholder="Hľadať"
            className="w-full rounded-[1.35rem] border-2 border-[color:var(--foreground)] bg-white py-3 pl-10 pr-4 text-sm text-[color:var(--foreground)] dark:bg-[#111111]"
          />
        </div>

        <div className="mt-4 space-y-3">
          {clients.map((client) => (
            <button
              key={client.id}
              type="button"
              onClick={() => setSelectedClientId(client.id)}
              className={cn(
                "flex w-full items-center justify-between rounded-[1.5rem] bg-[color:var(--surface)] px-4 py-4 text-left transition-all duration-200",
                selectedClient.id === client.id && "ring-2 ring-[color:var(--foreground)]"
              )}
            >
              <div className="min-w-0">
                <p className="truncate text-[1.25rem] font-semibold leading-none text-[color:var(--foreground)]">{client.name}</p>
                <p className="mt-2 truncate text-sm text-[color:var(--muted)]">{client.address}</p>
              </div>
              <ArrowRightIcon className="h-4 w-4 shrink-0 text-[color:var(--muted)]" />
            </button>
          ))}
        </div>

        <div className="mt-5 rounded-[1.8rem] border border-[color:var(--line)] bg-white p-4 shadow-[0_20px_50px_rgba(0,0,0,0.12)] dark:bg-[#111111]">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[color:var(--foreground)] text-[color:var(--background)]">
              {selectedClient.type === "corporation" ? <BuildingIcon className="h-6 w-6" /> : <UserIcon className="h-6 w-6" />}
            </div>
            <div className="min-w-0">
              <p className="truncate text-lg font-semibold text-[color:var(--foreground)]">{selectedClient.name}</p>
              <p className="truncate text-sm text-[color:var(--muted)]">{selectedClient.type === "corporation" ? "Firemná osoba" : "Súkromná osoba"}</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="rounded-[1rem] border border-[color:var(--line)] bg-[color:var(--surface)] px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">E-mail</p>
              <p className="mt-1 text-sm font-semibold text-[color:var(--foreground)]">{selectedClient.email}</p>
            </div>
            <div className="rounded-[1rem] border border-[color:var(--line)] bg-[color:var(--surface)] px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">Adresa</p>
              <p className="mt-1 text-sm font-semibold text-[color:var(--foreground)]">{selectedClient.street}</p>
            </div>
            {selectedClient.projects.map((project) => (
              <div key={project.name} className="flex gap-3">
                <div className="min-w-0 flex-1 rounded-[1rem] bg-[color:var(--surface)] px-4 py-3">
                  <p className="truncate text-base font-semibold text-[color:var(--foreground)]">{project.name}</p>
                  <p className="text-sm text-[color:var(--muted)]">{project.rooms} miestností</p>
                </div>
                <div className="flex w-[94px] flex-col items-center justify-center rounded-[1rem] border border-[color:var(--line)] bg-[color:var(--surface)] px-3 py-3">
                  <DocumentIcon className="h-4 w-4 text-[#2563eb]" />
                  <p className="mt-1 text-[10px] font-bold text-[color:var(--foreground)]">#{project.invoice}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PhoneShell>
  );
}

function ShowcaseCopy({
  eyebrow,
  title,
  body,
  chips,
  className,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  body: string;
  chips: string[];
  className?: string;
  align?: "left" | "right";
}) {
  return (
    <div className={cn("space-y-5", className)}>
      <div>
        <p className={cn("text-xs uppercase tracking-[0.25em] text-[color:var(--muted)]", align === "right" && "text-right")}>{eyebrow}</p>
        <h3
          className={cn(
            "mt-4 font-display text-[clamp(2.3rem,4.4vw,4rem)] font-extrabold leading-[0.94] tracking-[-0.05em] text-[color:var(--foreground)]",
            align === "right" && "text-right"
          )}
        >
          {title}
        </h3>
        <p className={cn("mt-5 max-w-2xl text-base leading-8 text-[color:var(--muted)] sm:text-lg", align === "right" && "ml-auto text-right")}>{body}</p>
      </div>
      <div className={cn("flex flex-wrap gap-3", align === "right" && "justify-end")}>
        {chips.map((chip) => (
          <div key={chip} className="inline-flex items-center gap-2 rounded-full border border-[color:var(--line)] bg-[color:var(--surface)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--foreground)]">
            <CheckIcon className="h-3.5 w-3.5" />
            {chip}
          </div>
        ))}
      </div>
    </div>
  );
}

function ShowcaseBlock({
  eyebrow,
  title,
  body,
  chips,
  desktop,
  mobile,
  reverse = false,
}: {
  eyebrow: string;
  title: string;
  body: string;
  chips: string[];
  desktop: ReactNode;
  mobile: ReactNode;
  reverse?: boolean;
}) {
  return (
    <div className="panel overflow-hidden p-3 sm:p-4">
      <div className="relative isolate overflow-hidden rounded-[2rem] border border-[color:var(--line)] bg-[color:var(--surface)] shadow-[0_36px_100px_rgba(10,10,10,0.12)]">
        <div className="hidden lg:block">{desktop}</div>
        <div className="lg:hidden">{mobile}</div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[64%] bg-gradient-to-t from-[color:var(--background)] via-[color:var(--background)]/98 via-28% to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[42%] bg-[radial-gradient(circle_at_bottom,rgba(255,255,255,0.92),transparent_72%)] dark:bg-[radial-gradient(circle_at_bottom,rgba(0,0,0,0.72),transparent_72%)]" />

        <div className={cn("pointer-events-none absolute inset-x-0 bottom-0 z-10 p-5 sm:p-7 lg:p-8", reverse && "xl:flex xl:justify-end")}>
          <ShowcaseCopy
            eyebrow={eyebrow}
            title={title}
            body={body}
            chips={chips}
            className="max-w-[46rem]"
            align={reverse ? "right" : "left"}
          />
        </div>
      </div>
    </div>
  );
}

type ShowcaseTabId = "projects-overview" | "project-detail" | "dennik" | "invoices" | "clients";

const showcaseTabs: Array<{
  id: ShowcaseTabId;
  title: string;
  body: string;
  bullets: string[];
  DesktopComponent: () => ReactNode;
  MobileComponent: () => ReactNode;
}> = [
  {
    id: "projects-overview",
    title: "Prehľad projektov",
    body: "Kategórie, filtre, vyhľadávanie a projektové karty v prvom pohľade na appku.",
    bullets: ["Kategórie", "Filter času", "Vyhľadávanie"],
    DesktopComponent: ProjectsDesktopScene,
    MobileComponent: ProjectsMobileScene,
  },
  {
    id: "project-detail",
    title: "Detail projektu",
    body: "Klient, dodávateľ, miestnosti, cenová ponuka aj súbory v jednom sústredenom detaile.",
    bullets: ["Miestnosti", "Cenová ponuka", "Súbory"],
    DesktopComponent: ProjectDetailDesktopScene,
    MobileComponent: ProjectDetailMobileScene,
  },
  {
    id: "dennik",
    title: "Denník",
    body: "Denník ukazuje čas, členov aj fakturáciu vrátane kalendára a vygenerovaných faktúr.",
    bullets: ["Čas", "Členovia", "Fakturácia"],
    DesktopComponent: DennikDesktopScene,
    MobileComponent: DennikMobileScene,
  },
  {
    id: "invoices",
    title: "Faktúry",
    body: "Stránka faktúr ukazuje zoznam dokladov a otvorený detail v rovnakom pracovnom toku.",
    bullets: ["Zoznam dokladov", "Stavy", "Detail faktúry"],
    DesktopComponent: InvoicesDesktopScene,
    MobileComponent: InvoicesMobileScene,
  },
  {
    id: "clients",
    title: "Klienti",
    body: "Zoznam klientov aj otvorený detail s projektmi a dokladmi v tom istom systéme.",
    bullets: ["Karta klienta", "Projekty", "Doklady"],
    DesktopComponent: ClientsDesktopScene,
    MobileComponent: ClientsMobileScene,
  },
];

export function AppShowcaseSection() {
  const [activeTab, setActiveTab] = useState<ShowcaseTabId>("projects-overview");
  const activeItem = showcaseTabs.find((item) => item.id === activeTab) ?? showcaseTabs[0];
  const ActiveDesktopComponent = activeItem.DesktopComponent;
  const ActiveMobileComponent = activeItem.MobileComponent;

  return (
    <section className="mx-auto w-full max-w-[1440px] px-5 pt-16 sm:px-8 lg:px-10 lg:pt-24">
      <Reveal>
        <div>
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center rounded-full border border-[color:var(--line)] bg-white/80 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--muted)] dark:bg-white/5">
              Hlavné časti aplikácie
            </p>
            <h2 className="mx-auto mt-5 max-w-4xl font-display text-[clamp(2.6rem,5vw,4.8rem)] font-extrabold leading-[0.95] tracking-[-0.06em] text-[color:var(--foreground)]">
              Pozrite si, čo všetko FIDO Calcul zvládne.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-7 text-[color:var(--muted)] sm:text-base">
              Projekty, detail projektu, Denník, faktúry aj klienti držia pohromade v jednom systéme, aby tím nemusel prepínať medzi viacerými nástrojmi.
            </p>
          </div>

          <div className="mt-8 grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)] xl:items-start">
            <div className="space-y-3">
              {showcaseTabs.map((item) => {
                const active = item.id === activeTab;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveTab(item.id)}
                    className={cn(
                      "w-full rounded-[1.45rem] border px-5 py-4 text-left transition-all duration-300",
                      active
                        ? "border-[#60a5fa] bg-white shadow-[0_18px_46px_rgba(59,130,246,0.12)] dark:border-[#2563eb] dark:bg-[#111111]"
                        : "border-[color:var(--line)] bg-white/72 hover:-translate-y-0.5 hover:bg-white dark:bg-white/5 dark:hover:bg-white/[0.07]"
                    )}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <h3 className="font-display text-[1.4rem] font-semibold leading-[1] tracking-[-0.035em] text-[color:var(--foreground)]">
                          {item.title}
                        </h3>
                        <div
                          className={cn(
                            "grid transition-[grid-template-rows,opacity,margin] duration-300 ease-out",
                            active ? "mt-3 grid-rows-[1fr] opacity-100" : "mt-0 grid-rows-[0fr] opacity-0"
                          )}
                        >
                          <div className="overflow-hidden">
                            <p className="text-sm leading-6 text-[color:var(--muted)]">{item.body}</p>
                            <div className="mt-3 flex flex-wrap gap-2">
                              {item.bullets.map((bullet) => (
                                <div
                                  key={`${item.id}-${bullet}`}
                                  className="inline-flex items-center gap-2 rounded-full border border-[color:var(--line)] bg-[color:var(--surface)] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[color:var(--foreground)]"
                                >
                                  <CheckIcon className="h-3.5 w-3.5 text-[#2563eb]" />
                                  {bullet}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      <ArrowRightIcon className={cn("mt-1 h-4 w-4 shrink-0 transition-transform duration-300", active ? "rotate-90 text-[#2563eb]" : "text-[color:var(--muted)]")} />
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="min-w-0">
              <div className="rounded-[1.9rem] bg-white/84 shadow-[0_30px_90px_rgba(10,10,10,0.12)] dark:bg-white/[0.03]">
                <div className="hidden lg:block">
                  <ActiveDesktopComponent />
                </div>
                <div className="lg:hidden">
                  <ActiveMobileComponent />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

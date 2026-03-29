"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { CookieSettingsTrigger } from "@/components/cookie-consent";
import { ArrowRightIcon, CalendarIcon, DocumentIcon, GridIcon, SlidersIcon, UsersIcon } from "@/components/icons";
import { ThemeToggle } from "@/components/theme-toggle";

type ViewId = "projects" | "priceList" | "rooms" | "clients" | "settings";

type ViewSection = {
  id: ViewId;
  label: string;
  eyebrow: string;
  title: string;
  description: string;
  screenshot: string;
  bullets: string[];
  accent: string;
};

const viewSections: ViewSection[] = [
  {
    id: "projects",
    label: "Projekty",
    eyebrow: "Prehľad projektov",
    title: "Organizujte aktívne stavebné zákazky bez vizuálneho šumu.",
    description:
      "Táto plocha vychádza zo silnej kategorizácie v aplikácii a drží výber zákaziek rýchly, čitateľný a pokojný. Veľké titulky, mäkké karty a priame akcie robia svoju robotu.",
    screenshot: "/assets/screens/projects.jpg",
    bullets: [
      "Prehliadanie projektov podľa kategórií inšpirované iOS bubble pohľadmi vo FIDO Calcul.",
      "Rýchla hierarchia na skenovanie s výraznými titulkami a pokojnými sekundárnymi textami.",
      "Dosť priestoru na rast od jednej zákazky až po celé pracovisko dodávateľa.",
    ],
    accent: "128 aktívnych projektov",
  },
  {
    id: "priceList",
    label: "Cenník",
    eyebrow: "Hlavný cenník",
    title: "Držte materiál aj prácu v jednej vrstve bez zbytočného trenia.",
    description:
      "Cenník sa tu správa ako riadiaca plocha, nie ako cintorín tabuliek. Biely priestor, zaoblené moduly a prísna typografia držia čísla čitateľné.",
    screenshot: "/assets/screens/main-price-list.jpg",
    bullets: [
      "Navrhnuté pre opakovateľné kalkulácie práce a materiálu.",
      "Pôsobí prirodzene v existujúcom administratívnom postupe FIDO Calcul.",
      "Podporuje rýchlu prípravu ponuky bez straty presnosti.",
    ],
    accent: "Práca + materiál",
  },
  {
    id: "rooms",
    label: "Miestnosti",
    eyebrow: "Detailné kalkulácie",
    title: "Prepadnite sa z celého projektu rovno do rozpočtu konkrétnej miestnosti.",
    description:
      "Táto sekcia prekladá detailnú logiku miestností do uhladenej webovej prezentácie. Dáta sú stále hutné, ale zážitok ostáva vzdušný a pod kontrolou.",
    screenshot: "/assets/screens/rooms.jpg",
    bullets: [
      "Každý typ práce sa môže ukázať ako karta, riadok alebo rozbaľovací modul.",
      "Jasné medzisúčty držia každú miestnosť obchodne transparentnú.",
      "Funguje dobre pri desktopovom naceňovaní aj tabletových obhliadkach.",
    ],
    accent: "Kalkulácia po miestnostiach",
  },
  {
    id: "clients",
    label: "Klienti",
    eyebrow: "Správa klientov",
    title: "Karty klientov pôsobia prémiovo, jednoducho a pripravené na akciu.",
    description:
      "Aktuálna aplikácia používa čisté, zaoblené klientské bloky. Na webe sa z toho stáva silnejší prezentačný moment: detaily klienta, prepojené projekty a dokumenty v jednom ťahu.",
    screenshot: "/assets/screens/clients.jpg",
    bullets: [
      "Rýchle vyhľadávanie, čisté karty a okamžité prepojenie na projekty.",
      "Konzistentné s existujúcim čierno-bielym vizuálnym systémom aplikácie.",
      "Ľahko invertovateľné pre tmavý režim bez straty kontrastu.",
    ],
    accent: "Hľadať, upraviť, priradiť",
  },
  {
    id: "settings",
    label: "Nastavenia",
    eyebrow: "Systémové ovládanie",
    title: "Administratívne ovládanie ostáva kompaktné a stále pôsobí luxusne.",
    description:
      "Nastavenia vo FIDO Calcul sú svojou povahou funkčné. Tento koncept ich drží ľudské vďaka silným štítkom, mäkkým kontajnerom a zámernému rozostupu v oboch témach.",
    screenshot: "/assets/screens/settings.jpg",
    bullets: [
      "Téma, archív, synchronizácia a fakturačné preferencie môžu žiť v jednom rozhraní.",
      "Navrhnuté tak, aby ostalo čitateľné na desktope aj mobile.",
      "Používa rovnaké typografické pravidlá ako zvyšok produktu.",
    ],
    accent: "Malé detaily, vysoká jasnosť",
  },
];

const navItems = [
  { label: "Projekty", icon: GridIcon },
  { label: "Denník", icon: CalendarIcon },
  { label: "Faktúry", icon: DocumentIcon },
  { label: "Klienti", icon: UsersIcon },
  { label: "Nastavenia", icon: SlidersIcon },
];

const metrics = [
  { value: "5", label: "hlavných pohľadov prerobených z produktového jazyka" },
  { value: "2", label: "farebné svety: čistý svetlý a presný tmavý inverz" },
  { value: "1", label: "oddelený demo web uložený vo `fido-web`" },
];

const workflowSteps = [
  {
    step: "01",
    title: "Začnite kostrou projektu",
    body: "Stavby a služby sa čisto rozdeľujú hneď na začiatku, presne ako v existujúcom kategórickom systéme FIDO Calcul.",
    screenshot: "/assets/screens/projects.jpg",
  },
  {
    step: "02",
    title: "Postavte cenník",
    body: "Hlavná aj projektová cenová vrstva držia obchodnú logiku viditeľnú namiesto toho, aby ju schovali do formulárov.",
    screenshot: "/assets/screens/project-price-list.jpg",
  },
  {
    step: "03",
    title: "Prejdite do miestností a rozsahov",
    body: "Každá miestnosť sa mení na štruktúrovanú kalkulačnú plochu s dosť silnou hierarchiou, aby ostala rýchla aj pod tlakom.",
    screenshot: "/assets/screens/rooms.jpg",
  },
  {
    step: "04",
    title: "Pripojte ľudí a dokumenty",
    body: "Klienti, faktúry aj nastavenia ostávajú prepojené, takže naceňovací flow nikdy nepôsobí roztrhane.",
    screenshot: "/assets/screens/archive.jpg",
  },
];

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function CategoryBubble({ title, count, image, liveLabel }: { title: string; count: string; image: string; liveLabel?: string }) {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/40 shadow-[0_24px_60px_rgba(15,15,15,0.18)]">
      <Image src={image} alt={title} width={720} height={480} className="h-48 w-full object-cover" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0)_10%,rgba(255,255,255,0.22)_52%,rgba(0,0,0,0.58)_100%)] dark:bg-[linear-gradient(180deg,rgba(20,20,20,0)_10%,rgba(20,20,20,0.2)_45%,rgba(0,0,0,0.72)_100%)]" />
      <div className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-black shadow-lg dark:bg-black/70 dark:text-white">
        {count}
      </div>
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-white/70">Kategória</p>
          <h3 className="mt-2 font-display text-3xl font-extrabold text-white">{title}</h3>
        </div>
        {liveLabel ? (
          <div className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-red-500 px-3 py-1.5 text-xs font-bold text-white shadow-[0_16px_30px_rgba(220,38,38,0.45)]">
            <span className="h-2 w-2 rounded-full bg-white" />
            {liveLabel}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function SidebarPreview({ activeLabel }: { activeLabel: string }) {
  return (
    <aside className="hidden rounded-[2rem] border border-[color:var(--line)] bg-[color:var(--panel)] p-3 lg:flex lg:flex-col">
      <div className="flex items-center gap-3 border-b border-[color:var(--line)] px-3 py-4">
        <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl bg-[color:var(--background)] shadow-[var(--shadow-soft)]">
          <Image src="/assets/app-icon.jpg" alt="Ikona FIDO Calcul" width={44} height={44} className="h-11 w-11 object-cover" />
        </div>
        <div>
          <p className="text-[0.7rem] uppercase tracking-[0.25em] text-[color:var(--muted)]">Pracovisko</p>
          <p className="text-sm font-semibold text-[color:var(--foreground)]">FIDO Calcul administrácia</p>
        </div>
      </div>
      <div className="mt-3 flex-1 space-y-1.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.label === activeLabel;
          return (
            <div
              key={item.label}
              className={cn(
                "flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-semibold transition duration-300",
                isActive
                  ? "bg-[color:var(--foreground)] text-[color:var(--background)] shadow-[0_18px_50px_rgba(10,10,10,0.18)]"
                  : "text-[color:var(--muted)] hover:bg-[color:var(--surface)] hover:text-[color:var(--foreground)]"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </div>
          );
        })}
      </div>
      <div className="rounded-[1.6rem] border border-[color:var(--line)] bg-[color:var(--surface)] p-4">
        <p className="text-xs uppercase tracking-[0.24em] text-[color:var(--muted)]">Stav synchronizácie</p>
        <p className="mt-2 text-sm font-semibold text-[color:var(--foreground)]">Všetky zmeny pripravené na export</p>
      </div>
    </aside>
  );
}

function SurfaceCard({ title, body, value }: { title: string; body: string; value: string }) {
  return (
    <div className="panel h-full p-5">
      <p className="text-xs uppercase tracking-[0.25em] text-[color:var(--muted)]">{title}</p>
      <p className="mt-4 font-display text-4xl font-extrabold tracking-tight text-[color:var(--foreground)]">{value}</p>
      <p className="mt-4 max-w-xs text-sm leading-6 text-[color:var(--muted)]">{body}</p>
    </div>
  );
}

function ScreenshotFrame({ src, alt, compact = false }: { src: string; alt: string; compact?: boolean }) {
  return (
    <div className="overflow-hidden rounded-[2rem] border border-[color:var(--line)] bg-[color:var(--panel)] shadow-[var(--shadow-strong)]">
      <div className="flex items-center gap-2 border-b border-[color:var(--line)] px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
        <div className="ml-4 rounded-full bg-[color:var(--surface)] px-3 py-1 text-[0.68rem] uppercase tracking-[0.22em] text-[color:var(--muted)]">
          Pohľad FIDO Calcul
        </div>
      </div>
      <div className={cn("bg-[color:var(--surface)]", compact ? "p-3" : "p-4 md:p-5")}>
        <Image src={src} alt={alt} width={1600} height={1000} className="h-auto w-full rounded-[1.35rem] border border-[color:var(--line)] object-cover" />
      </div>
    </div>
  );
}

export function DemoPage() {
  const [activeView, setActiveView] = useState<ViewId>("projects");

  const activeSection = useMemo(() => {
    return viewSections.find((section) => section.id === activeView) ?? viewSections[0];
  }, [activeView]);

  return (
    <main className="relative min-h-screen overflow-hidden pb-10">
      <div className="page-haze" aria-hidden="true" />

      <header className="sticky top-0 z-50 border-b border-[color:var(--line)] bg-[color:var(--glass)] backdrop-blur-xl">
        <div className="section-shell flex h-20 items-center justify-between gap-6">
          <Link href="/" className="flex min-w-0 items-center gap-4">
            <div className="relative h-10 w-10 overflow-hidden rounded-xl border border-[color:var(--line)] bg-[color:var(--panel)] shadow-sm">
              <Image src="/assets/logo.png" alt="Logo FIDO Calcul" fill className="object-contain p-1 dark:hidden" />
              <Image src="/assets/dark-logo.jpg" alt="Logo FIDO Calcul v tmavom režime" fill className="hidden object-cover dark:block" />
            </div>
            <div className="min-w-0">
              <p className="text-[0.68rem] uppercase tracking-[0.26em] text-[color:var(--muted)]">Demo zážitok</p>
              <p className="truncate text-sm font-semibold text-[color:var(--foreground)]">FIDO Calcul</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-7 text-sm font-medium text-[color:var(--muted)] md:flex">
            <Link href="/" className="transition hover:text-[color:var(--foreground)]">
              Úvod
            </Link>
            <a href="#views" className="transition hover:text-[color:var(--foreground)]">
              Pohľady
            </a>
            <Link href="/pricing" className="transition hover:text-[color:var(--foreground)]">
              Cenník
            </Link>
            <Link href="/kontakt" className="transition hover:text-[color:var(--foreground)]">
              Kontakt
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/"
              className="hidden rounded-full bg-[color:var(--foreground)] px-5 py-3 text-sm font-semibold text-[color:var(--background)] transition duration-300 hover:-translate-y-0.5 sm:inline-flex"
            >
              Živý web
            </Link>
          </div>
        </div>
      </header>

      <section id="top" className="section-shell relative pt-12 sm:pt-16 lg:pt-20">
        <div className="space-y-10 lg:space-y-12">
          <div className="relative z-10 max-w-[76rem] space-y-8">
            <div className="space-y-6">
              <div className="pill">Pôvodný vizuálny smer uložený ako samostatné demo</div>
              <h1 className="max-w-[10.5ch] font-display text-[clamp(4rem,9vw,8.4rem)] font-extrabold leading-[0.9] tracking-[-0.04em] text-[color:var(--foreground)]">
                Najprv biela.
                <br />
                Čierny text.
                <br />
                Žiadny chaos.
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-[color:var(--muted)] sm:text-xl">
                Táto stránka zachováva pôvodnú konceptovú domovskú stránku pre projekt FIDO Calcul, postavenú priamo z aktuálneho jazyka iOS a webovej aplikácie: ťažké SF Pro titulky, veľkorysý biely priestor, zaoblené utilitné plochy a plný tmavý inverz.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <a href="#views" className="inline-flex items-center justify-center gap-3 rounded-full bg-[color:var(--foreground)] px-6 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--background)] transition duration-300 hover:-translate-y-1">
                Preskúmať pohľady
                <ArrowRightIcon className="h-4 w-4" />
              </a>
              <Link href="/" className="inline-flex items-center justify-center rounded-full border border-[color:var(--line)] bg-[color:var(--panel)] px-6 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--foreground)] transition duration-300 hover:-translate-y-1">
                Otvoriť hlavný web
              </Link>
            </div>
            <div className="grid gap-3 md:max-w-4xl md:grid-cols-3">
              {metrics.map((metric) => (
                <div key={metric.label} className="panel p-5">
                  <p className="font-display text-4xl font-extrabold tracking-[-0.05em] text-[color:var(--foreground)]">{metric.value}</p>
                  <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">{metric.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-8 top-16 h-40 w-40 rounded-full bg-black/[0.04] blur-3xl dark:bg-white/[0.06]" aria-hidden="true" />
            <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-black/[0.06] blur-3xl dark:bg-white/[0.08]" aria-hidden="true" />
            <div className="space-y-4">
              <div className="overflow-hidden rounded-[2.25rem] border border-[color:var(--line)] bg-[color:var(--panel)] p-4 shadow-[var(--shadow-strong)]">
                <div className="grid gap-4 lg:grid-cols-[250px_minmax(0,1fr)]">
                  <SidebarPreview activeLabel="Projekty" />
                  <div className="space-y-4">
                    <div className="grid gap-4 lg:grid-cols-2">
                      <CategoryBubble title="Stavby" count="128 projektov" image="/assets/construction.jpg" liveLabel="02:14:27" />
                      <CategoryBubble title="Služby" count="46 projektov" image="/assets/services.jpg" />
                    </div>
                    <div className="grid gap-4 xl:grid-cols-[minmax(0,1.35fr)_18rem]">
                      <ScreenshotFrame src="/assets/screens/projects.jpg" alt="Obrazovka projektov" compact />
                      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
                        <SurfaceCard title="Stav ponuky" value="Pripravené" body="Rozhranie je postavené tak, aby vás posunulo z kostry projektu do kalkulácie bez modal chaosu." />
                        <SurfaceCard title="Vrstva klienta" value="Prepojené" body="Projekty, miestnosti a klienti ostávajú v jednom vizuálnom systéme, ktorý sedí na existujúcu architektúru produktu." />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
                <div className="panel p-5">
                  <p className="text-xs uppercase tracking-[0.25em] text-[color:var(--muted)]">Typografia</p>
                  <h2 className="mt-3 font-display text-4xl font-extrabold tracking-[-0.05em] text-[color:var(--foreground)]">SF Pro Display Heavy</h2>
                  <p className="mt-4 max-w-lg text-sm leading-6 text-[color:var(--muted)]">
                    Hero aj titulky sekcií používajú ten istý ťažký tón, ktorý už dnes žije v iOS úvodných obrazovkách a tab rozhraní.
                  </p>
                </div>
                <div className="panel flex flex-col gap-6 p-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-[color:var(--muted)]">Systém režimov</p>
                    <h3 className="mt-3 max-w-md font-display text-3xl font-extrabold tracking-[-0.05em] text-[color:var(--foreground)]">Čistý svetlý režim a potom jeho presný vizuálny opak.</h3>
                  </div>
                  <div className="grid w-full max-w-[13rem] grid-cols-2 gap-3">
                    <div className="rounded-[1.5rem] border border-black/10 bg-white p-3 shadow-[0_18px_40px_rgba(0,0,0,0.08)]">
                      <div className="h-2 w-10 rounded-full bg-black" />
                      <div className="mt-6 h-20 rounded-[1rem] bg-black/[0.05]" />
                    </div>
                    <div className="rounded-[1.5rem] border border-white/10 bg-black p-3 shadow-[0_18px_40px_rgba(0,0,0,0.25)]">
                      <div className="h-2 w-10 rounded-full bg-white" />
                      <div className="mt-6 h-20 rounded-[1rem] bg-white/[0.08]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell pt-16 lg:pt-24">
        <div className="grid gap-4 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="panel flex flex-col justify-between p-8">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-[color:var(--muted)]">Jazyk produktu</p>
              <h2 className="mt-4 font-display text-5xl font-extrabold tracking-[-0.06em] text-[color:var(--foreground)]">
                Navrhnuté z reálnych pohľadov FIDO Calcul, nie z generickej SaaS výplne.
              </h2>
            </div>
            <p className="mt-8 max-w-xl text-base leading-8 text-[color:var(--muted)] sm:text-lg">
              Aktuálna aplikácia už má silnú osobnosť: predimenzované sekčné titulky, monochromatické základy, mäkké zaoblené panely a výrazné operatívne karty. Toto demo drží presne túto pozíciu a ukazuje vizuálny smer na jednom oddelenom mieste.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="panel p-6">
              <p className="text-xs uppercase tracking-[0.25em] text-[color:var(--muted)]">Prevzaté z iOS</p>
              <h3 className="mt-3 font-display text-3xl font-extrabold tracking-[-0.05em] text-[color:var(--foreground)]">Ťažké 40pt titulky</h3>
              <p className="mt-4 text-sm leading-7 text-[color:var(--muted)]">Priamo inšpirované komponentmi `ScreenTitle` a úvodným titulkom v iOS projekte.</p>
            </div>
            <div className="panel p-6 dark:bg-[linear-gradient(160deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))]">
              <p className="text-xs uppercase tracking-[0.25em] text-[color:var(--muted)]">Prevzaté z webovej aplikácie</p>
              <h3 className="mt-3 font-display text-3xl font-extrabold tracking-[-0.05em] text-[color:var(--foreground)]">Sidebar, karty a utilitná hierarchia</h3>
              <p className="mt-4 text-sm leading-7 text-[color:var(--muted)]">Prebrané z existujúceho rozloženia webovej aplikácie, ale zredukované na to podstatné pre prezentáciu.</p>
            </div>
            <div className="panel p-6 sm:col-span-2">
              <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-[color:var(--muted)]">Fragmenty aplikácie prenesené na web</p>
                  <h3 className="mt-3 font-display text-4xl font-extrabold tracking-[-0.05em] text-[color:var(--foreground)]">Kategórie projektov, obaly pohľadov aj obrazové panely prichádzajú z reálneho produktu.</h3>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <ScreenshotFrame src="/assets/screens/bottom-bar-clients.jpg" alt="Mobilná navigácia klientov" compact />
                  <ScreenshotFrame src="/assets/screens/settings.jpg" alt="Pohľad nastavení" compact />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="views" className="section-shell pt-16 lg:pt-24">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-[color:var(--muted)]">Pohľady</p>
            <h2 className="mt-3 max-w-3xl font-display text-5xl font-extrabold tracking-[-0.06em] text-[color:var(--foreground)]">
              Päť hlavných plôch, každá preložená do čistejšej webovej ukážky.
            </h2>
          </div>
          <p className="max-w-xl text-base leading-8 text-[color:var(--muted)] sm:text-lg">
            Prepínajte medzi reálnymi pohľadmi aplikácie nižšie. Každá sekcia má vlastné vysvetlenie a ostáva v tom istom monochromatickom systéme.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {viewSections.map((section) => (
            <button
              key={section.id}
              type="button"
              onClick={() => setActiveView(section.id)}
              className={cn(
                "rounded-full border px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] transition duration-300",
                activeView === section.id
                  ? "border-[color:var(--foreground)] bg-[color:var(--foreground)] text-[color:var(--background)] shadow-[0_18px_40px_rgba(10,10,10,0.16)]"
                  : "border-[color:var(--line)] bg-[color:var(--panel)] text-[color:var(--foreground)] hover:-translate-y-0.5"
              )}
            >
              {section.label}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-5 xl:grid-cols-[0.82fr_1.18fr]">
          <div className="panel flex flex-col p-8">
            <p className="text-xs uppercase tracking-[0.25em] text-[color:var(--muted)]">{activeSection.eyebrow}</p>
            <h3 className="mt-4 font-display text-4xl font-extrabold tracking-[-0.06em] text-[color:var(--foreground)]">{activeSection.title}</h3>
            <p className="mt-5 text-base leading-8 text-[color:var(--muted)] sm:text-lg">{activeSection.description}</p>
            <div className="mt-8 rounded-[1.8rem] border border-[color:var(--line)] bg-[color:var(--surface)] p-5">
              <p className="text-xs uppercase tracking-[0.25em] text-[color:var(--muted)]">Prečo to funguje</p>
              <ul className="mt-4 space-y-4">
                {activeSection.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3 text-sm leading-7 text-[color:var(--foreground)]">
                    <span className="mt-2 h-2 w-2 flex-none rounded-full bg-[color:var(--foreground)]" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6 inline-flex w-fit items-center rounded-full border border-[color:var(--line)] bg-[color:var(--background)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--foreground)]">
              {activeSection.accent}
            </div>
          </div>

          <div className="panel p-4 sm:p-5">
            <div className="grid gap-4 lg:grid-cols-[1fr_16rem]">
              <ScreenshotFrame src={activeSection.screenshot} alt={activeSection.label} />
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                <div className="rounded-[1.8rem] border border-[color:var(--line)] bg-[color:var(--surface)] p-5">
                  <p className="text-xs uppercase tracking-[0.25em] text-[color:var(--muted)]">Aktívny pohľad</p>
                  <h4 className="mt-3 font-display text-3xl font-extrabold tracking-[-0.05em] text-[color:var(--foreground)]">{activeSection.label}</h4>
                  <p className="mt-4 text-sm leading-7 text-[color:var(--muted)]">Čistý kontrast, veľká typografia a zaoblené kontajnery držia rozhranie zámerné namiesto preplneného.</p>
                </div>
                <div className="rounded-[1.8rem] border border-[color:var(--line)] bg-[color:var(--foreground)] p-5 text-[color:var(--background)] shadow-[0_24px_70px_rgba(10,10,10,0.18)]">
                  <p className="text-xs uppercase tracking-[0.25em] text-white/55">Dizajnová poznámka</p>
                  <p className="mt-4 font-display text-3xl font-extrabold tracking-[-0.05em]">Appka už mala správnu náladu.</p>
                  <p className="mt-4 text-sm leading-7 text-white/72">Tento build hlavne upravuje rozostupy, rytmus a kompozíciu, aby sa produkt vedel na webe prezentovať sebaistejšie.</p>
                </div>
                <div className="rounded-[1.8rem] border border-[color:var(--line)] bg-[color:var(--surface)] p-5 lg:min-h-[13rem]">
                  <p className="text-xs uppercase tracking-[0.25em] text-[color:var(--muted)]">Pripravené na témy</p>
                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <div className="rounded-[1.3rem] border border-black/10 bg-white p-3 shadow-[0_12px_24px_rgba(0,0,0,0.05)]">
                      <div className="h-2 w-9 rounded-full bg-black" />
                      <div className="mt-4 h-16 rounded-[1rem] bg-black/[0.05]" />
                    </div>
                    <div className="rounded-[1.3rem] border border-white/10 bg-black p-3 shadow-[0_12px_24px_rgba(0,0,0,0.18)]">
                      <div className="h-2 w-9 rounded-full bg-white" />
                      <div className="mt-4 h-16 rounded-[1rem] bg-white/[0.08]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="workflow" className="section-shell pt-16 lg:pt-24">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-[color:var(--muted)]">Postup</p>
            <h2 className="mt-3 max-w-3xl font-display text-5xl font-extrabold tracking-[-0.06em] text-[color:var(--foreground)]">
              Demo vysvetľuje reálny naceňovací flow namiesto toho, aby sa hralo na generickú šablónu.
            </h2>
          </div>
          <p className="max-w-xl text-base leading-8 text-[color:var(--muted)] sm:text-lg">
            Každý krok sa mapuje späť na to, ako FIDO Calcul naozaj funguje dnes: kategória, kalkulácia, klient, faktúra, archív.
          </p>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
          {workflowSteps.map((step) => (
            <div key={step.step} className="panel group flex h-full flex-col p-5 transition duration-300 hover:-translate-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-display text-4xl font-extrabold tracking-[-0.05em] text-[color:var(--foreground)]">{step.step}</span>
                <span className="rounded-full border border-[color:var(--line)] px-3 py-1 text-[0.68rem] uppercase tracking-[0.25em] text-[color:var(--muted)]">Krok</span>
              </div>
              <h3 className="mt-6 font-display text-3xl font-extrabold tracking-[-0.05em] text-[color:var(--foreground)]">{step.title}</h3>
              <p className="mt-4 text-sm leading-7 text-[color:var(--muted)]">{step.body}</p>
              <div className="mt-6 overflow-hidden rounded-[1.7rem] border border-[color:var(--line)] bg-[color:var(--surface)] p-3">
                <Image src={step.screenshot} alt={step.title} width={1200} height={800} className="h-44 w-full rounded-[1.2rem] object-cover transition duration-500 group-hover:scale-[1.03]" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="dark-mode" className="section-shell pt-16 lg:pt-24">
        <div className="panel overflow-hidden p-0">
          <div className="grid gap-px bg-[color:var(--line)] lg:grid-cols-2">
            <div className="bg-white p-8 text-black lg:p-10">
              <p className="text-xs uppercase tracking-[0.25em] text-black/45">Svetlý režim</p>
              <h2 className="mt-4 font-display text-5xl font-extrabold tracking-[-0.06em]">Čistá biela, tvrdá čierna, zdržanlivá sivá.</h2>
              <p className="mt-6 max-w-xl text-base leading-8 text-black/62 sm:text-lg">
                Toto je žiadaný default: čistá biela plocha, čierny text, pokojné sivé podporné vrstvy a žiadny dekoratívny chaos. Má to pôsobiť takmer ako tlač.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.8rem] border border-black/10 bg-black px-5 py-6 text-white shadow-[0_24px_60px_rgba(0,0,0,0.12)]">
                  <p className="text-xs uppercase tracking-[0.25em] text-white/55">Primárna akcia</p>
                  <p className="mt-4 font-display text-3xl font-extrabold tracking-[-0.05em]">Vytvoriť ponuku</p>
                </div>
                <div className="rounded-[1.8rem] border border-black/10 bg-black/[0.05] px-5 py-6">
                  <p className="text-xs uppercase tracking-[0.25em] text-black/45">Podporná plocha</p>
                  <p className="mt-4 font-display text-3xl font-extrabold tracking-[-0.05em]">Detaily klienta</p>
                </div>
              </div>
            </div>
            <div className="bg-black p-8 text-white lg:p-10">
              <p className="text-xs uppercase tracking-[0.25em] text-white/45">Tmavý režim</p>
              <h2 className="mt-4 font-display text-5xl font-extrabold tracking-[-0.06em]">Presný inverz, nie iná osobnosť.</h2>
              <p className="mt-6 max-w-xl text-base leading-8 text-white/68 sm:text-lg">
                Tmavý režim drží tie isté rozostupy, tú istú typografiu a tú istú zdržanlivosť. Mení sa len polarita, takže produkt stále vyzerá ako on sám.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.8rem] border border-white/10 bg-white px-5 py-6 text-black shadow-[0_24px_60px_rgba(0,0,0,0.25)]">
                  <p className="text-xs uppercase tracking-[0.25em] text-black/45">Primárna akcia</p>
                  <p className="mt-4 font-display text-3xl font-extrabold tracking-[-0.05em]">Vygenerovať faktúru</p>
                </div>
                <div className="rounded-[1.8rem] border border-white/10 bg-white/[0.06] px-5 py-6">
                  <p className="text-xs uppercase tracking-[0.25em] text-white/45">Podporná plocha</p>
                  <p className="mt-4 font-display text-3xl font-extrabold tracking-[-0.05em]">Nastavenia archívu</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="section-shell pt-16 lg:pt-24">
        <div className="rounded-[2.4rem] border border-[color:var(--line)] bg-[color:var(--foreground)] px-6 py-8 text-[color:var(--background)] shadow-[0_36px_100px_rgba(10,10,10,0.16)] sm:px-8 sm:py-10 lg:px-12 lg:py-14">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-white/55">Uložené demo</p>
              <h2 className="mt-4 max-w-4xl font-display text-[clamp(2.4rem,5vw,5rem)] font-extrabold leading-[0.95] tracking-[-0.06em]">
                Pôvodný koncept teraz žije tu ako `Demo`, zatiaľ čo hlavná stránka nesie reálny SaaS web.
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-8 text-white/70 sm:text-lg">
                Táto zachovaná stránka stále nesie svetlý dizajn, plný tmavý režim, lokálnu typografiu FIDO Calcul a vizuálne sekcie odvodené z aplikácie. Ostáva užitočnou vizuálnou referenciou, kým hlavný web produkt naozaj predáva.
              </p>
            </div>
            <Link href="/" className="inline-flex items-center justify-center gap-3 rounded-full bg-[color:var(--background)] px-6 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--foreground)] transition duration-300 hover:-translate-y-1">
              Otvoriť domovskú stránku
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <footer className="section-shell pt-10">
        <div className="flex flex-col gap-4 border-t border-[color:var(--line)] py-6 text-sm text-[color:var(--muted)] sm:flex-row sm:items-center sm:justify-between">
          <p>Demo stránka pre FIDO Calcul.</p>
          <div className="flex flex-wrap items-center gap-5">
            <p>Pôvodná konceptová domovská stránka je teraz oddelená v `/demo`.</p>
            <Link href="/gdpr" className="transition hover:text-[color:var(--foreground)]">
              GDPR
            </Link>
            <CookieSettingsTrigger className="transition hover:text-[color:var(--foreground)]">
              Cookies
            </CookieSettingsTrigger>
          </div>
        </div>
      </footer>
    </main>
  );
}

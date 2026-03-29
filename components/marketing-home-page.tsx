import { BeforeAfterShowcase } from "@/components/before-after-showcase";
import { AppleIcon, ArrowRightIcon, DocumentIcon, GridIcon, LayersIcon, UsersIcon } from "@/components/icons";
import { AppShowcaseSection } from "@/components/app-showcase-section";
import { HeroProjectPeek } from "@/components/hero-project-peek";
import { Reveal } from "@/components/reveal";
import { APP_SIGNIN_LABEL, APP_SIGNIN_URL, APP_STORE_URL } from "@/lib/site-config";
import { SiteShell } from "@/components/site-shell";

const featureCards = [
  {
    icon: GridIcon,
    title: "Postup postavený na projekte",
    body: "Začnite projektom a plynulo prejdite do miestností, rozsahov prác a cien bez zbytočného prepínania.",
  },
  {
    icon: LayersIcon,
    title: "Cenníky, ktoré zostanú použiteľné",
    body: "Hlavné aj projektové ceny fungujú v jednom rytme, takže ponuka ostáva rýchla aj pri detailných projektoch.",
  },
  {
    icon: DocumentIcon,
    title: "Faktúry naviazané na prácu",
    body: "Vytvárajte dokumenty z reálneho stavu projektu namiesto skladania všetkého znova v inom nástroji.",
  },
  {
    icon: UsersIcon,
    title: "Klienti a dodávatelia spolu",
    body: "Profily, projekty aj história dokumentov žijú v jednej vrstve namiesto troch rozbitých nástrojov.",
  },
];

const workflow = [
  {
    step: "01",
    title: "Vytvorte kostru projektu",
    body: "Založte projekt, priraďte klienta, vyberte kategóriu a nastavte obchodný rámec za pár minút.",
  },
  {
    step: "02",
    title: "Postavte kalkuláciu",
    body: "Použite cenníky, detail miestností a rozsahy prác tak, aby bola každá ponuka čitateľná a kontrolovateľná.",
  },
  {
    step: "03",
    title: "Sledujte prácu a extra položky",
    body: "Prejdite z cenovej ponuky do reálnej realizácie bez toho, aby sa stratila obchodná logika projektu.",
  },
  {
    step: "04",
    title: "Vygenerujte dokument",
    body: "Premeníte aktuálny stav projektu na faktúru, dodací list alebo ďalší dokument, ktorý práve potrebujete.",
  },
];

function FeatureCard({ icon: Icon, title, body }: { icon: typeof GridIcon; title: string; body: string }) {
  return (
    <div className="panel p-5">
      <div className="flex h-11 w-11 items-center justify-center rounded-[1.15rem] bg-[color:var(--foreground)] text-[color:var(--background)]">
        <Icon className="h-[18px] w-[18px]" />
      </div>
      <h3 className="mt-4 font-display text-[1.7rem] font-black leading-[1.02] tracking-[-0.045em] text-[color:var(--foreground)]">{title}</h3>
      <p className="mt-3 text-[13px] leading-6 text-[color:var(--muted)]">{body}</p>
    </div>
  );
}

export function MarketingHomePage() {
  return (
    <SiteShell activePath="/" ctaHref="https://app.fidocalcul.sk" ctaLabel="Prihlásiť sa">
      <section className="section-shell relative pt-6 sm:pt-8 lg:pt-10">
        <div className="relative overflow-hidden">
          <div className="relative z-10 mx-auto max-w-4xl text-center">
            <Reveal delay={20}>
              <div className="inline-flex items-center gap-3 rounded-full border border-black/8 bg-white/78 px-4 py-2 text-xs font-semibold text-[color:var(--foreground)] shadow-[0_12px_28px_rgba(10,10,10,0.08)] backdrop-blur-md dark:border-white/10 dark:bg-white/8">
                <div className="flex -space-x-2">
                  <span className="h-7 w-7 rounded-full border border-white bg-[#dbeafe]" />
                  <span className="h-7 w-7 rounded-full border border-white bg-[#bfdbfe]" />
                  <span className="h-7 w-7 rounded-full border border-white bg-[#93c5fd]" />
                </div>
                <span>Používa 12 000+ používateľov</span>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <h1 className="mx-auto mt-7 max-w-[12ch] font-display text-[clamp(3rem,6.4vw,5.8rem)] font-black leading-[0.94] tracking-[-0.05em] text-[color:var(--foreground)]">
                Stavby, cenníky
                <br />
                a fakturácia
                <br />
                v jednej appke.
              </h1>
            </Reveal>

            <Reveal delay={230}>
              <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[color:var(--muted)] sm:text-xl">
                FIDO Calcul drží projekty, klientov a dokumenty v jednom systéme, aby malé tímy nemuseli prepínať medzi viacerými nástrojmi.
              </p>
            </Reveal>

            <Reveal delay={330}>
              <div className="mt-8 flex w-full flex-row items-center justify-center gap-3 sm:w-auto sm:gap-4">
                <a href={APP_SIGNIN_URL} className="inline-flex min-w-0 flex-1 items-center justify-center gap-3 rounded-full bg-[color:var(--foreground)] px-5 py-4 text-sm font-semibold text-[color:var(--background)] transition duration-300 hover:-translate-y-1 sm:flex-none sm:px-7">
                  Web app
                  <ArrowRightIcon className="h-4 w-4" />
                </a>
                <a
                  href={APP_STORE_URL}
                  className="inline-flex min-w-0 flex-1 items-center justify-center gap-3 rounded-full border border-black/10 bg-white px-5 py-4 text-sm font-semibold text-[color:var(--foreground)] shadow-[0_14px_32px_rgba(10,10,10,0.08)] transition duration-300 hover:-translate-y-1 dark:border-black dark:bg-black dark:text-white sm:flex-none sm:px-7"
                >
                  <AppleIcon className="h-5 w-5" />
                  App Store
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal className="relative z-10 mt-10 flex justify-center sm:mt-12" delay={440} y={88} scale={0.96}>
            <div className="w-full max-w-[74rem]">
              <HeroProjectPeek />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-shell pt-16 lg:pt-24">
        <div className="grid gap-6 xl:grid-cols-[0.82fr_1.18fr] xl:items-start">
          <div>
            <Reveal>
              <h2 className="max-w-3xl font-display text-5xl font-black tracking-[-0.06em] text-[color:var(--foreground)]">
                Štyri piliere každého projektu.
              </h2>
            </Reveal>
            <Reveal delay={80}>
              <p className="mt-4 max-w-lg text-[15px] leading-7 text-[color:var(--muted)] sm:text-base">
                Projekty, cenníky, faktúry aj klienti sú prepojené do jedného toku — bez prepínania a bez duplicít.
              </p>
            </Reveal>

            <div className="mt-7 grid gap-4 md:grid-cols-2">
              {featureCards.map((card, index) => (
                <Reveal key={card.title} delay={120 + index * 90}>
                  <FeatureCard icon={card.icon} title={card.title} body={card.body} />
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={160} className="xl:pt-2">
            <BeforeAfterShowcase />
          </Reveal>
        </div>
      </section>

      <AppShowcaseSection />

      <section className="section-shell pt-16 lg:pt-24">
        <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div className="panel p-8">
              <p className="text-xs uppercase tracking-[0.25em] text-[color:var(--muted)]">Ako ho tímy používajú</p>
              <h2 className="mt-4 font-display text-5xl font-black tracking-[-0.06em] text-[color:var(--foreground)]">Od projektu po faktúru.</h2>
              <p className="mt-6 text-base leading-8 text-[color:var(--muted)] sm:text-lg">
                FIDO Calcul spája ceny, detail projektu, hodinovú prácu aj dokumenty do jedného operatívneho toku.
              </p>
              <div className="mt-8 rounded-[1.8rem] border border-[color:var(--line)] bg-[color:var(--surface)] p-5">
                <p className="text-xs uppercase tracking-[0.22em] text-[color:var(--muted)]">Čo sa tímu zmení</p>
                <ul className="mt-4 space-y-4">
                  {[
                    "Menej prepínania medzi tabuľkami počas nacenenia.",
                    "Jasnejšie prepojenie medzi realizáciou a fakturáciou.",
                    "Dáta klienta a dodávateľa ostávajú blízko samotnej práci.",
                  ].map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-7 text-[color:var(--foreground)]">
                      <span className="mt-2 h-2 w-2 flex-none rounded-full bg-[color:var(--foreground)]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

          <div className="grid gap-4 md:grid-cols-2">
            {workflow.map((item, index) => (
              <Reveal key={item.step} delay={index * 90}>
                <div className="panel flex h-full flex-col p-6">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-4xl font-black tracking-[-0.05em] text-[color:var(--foreground)]">{item.step}</span>
                    <span className="rounded-full border border-[color:var(--line)] px-3 py-1 text-[0.68rem] uppercase tracking-[0.25em] text-[color:var(--muted)]">Postup</span>
                  </div>
                  <h3 className="mt-6 font-display text-3xl font-black tracking-[-0.05em] text-[color:var(--foreground)]">{item.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-[color:var(--muted)]">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell pt-16 lg:pt-24">
        <Reveal y={48}>
          <div className="rounded-[2.4rem] border border-[color:var(--line)] bg-[color:var(--foreground)] px-6 py-8 text-[color:var(--background)] shadow-[0_36px_100px_rgba(10,10,10,0.16)] sm:px-8 sm:py-10 lg:px-12 lg:py-14">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-white/55 dark:text-black/45">Ďalší krok</p>
                <h2 className="mt-4 max-w-4xl font-display text-[clamp(2.4rem,5vw,5rem)] font-black leading-[0.95] tracking-[-0.06em]">
                  Pozrite si FIDO Calcul v akcii.
                </h2>
                <p className="mt-6 max-w-2xl text-base leading-8 text-white sm:text-lg dark:text-black">
                  Prihláste sa do aplikácie, pozrite cenník a ak budete chcieť, ozvite sa aj kvôli nasadeniu do vlastného pracovného postupu.
                </p>
              </div>
              <div className="flex">
                <a href={APP_SIGNIN_URL} className="inline-flex items-center justify-center gap-3 rounded-full bg-[color:var(--background)] px-6 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--foreground)] transition duration-300 hover:-translate-y-1">
                  {APP_SIGNIN_LABEL}
                  <ArrowRightIcon className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </SiteShell>
  );
}

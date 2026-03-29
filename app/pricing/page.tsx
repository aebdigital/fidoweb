import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { SiteShell } from "@/components/site-shell";
import { SITE_URL } from "@/lib/site-config";
import { PricingPageClient } from "@/components/pricing-page-client";

export const metadata: Metadata = {
  title: "Cenník",
  description:
    "Cenník FIDO Calcul pre služby, stavebníctvo aj dochádzku. Pozrite si plány, funkcie a porovnanie cien.",
  alternates: {
    canonical: "/pricing",
  },
  openGraph: {
    title: "Cenník | FIDO Calcul",
    description:
      "Pozrite si ceny FIDO Calcul pre služby, stavebníctvo aj dochádzku vrátane porovnania plánov.",
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
      "Pozrite si ceny FIDO Calcul pre služby, stavebníctvo aj dochádzku vrátane porovnania plánov.",
    images: ["/assets/app-icon.jpg"],
  },
};

export default function PricingPage() {
  return (
    <SiteShell activePath="/pricing">
      <PricingPageClient />

      <section className="section-shell pt-16 lg:pt-20">
        <Reveal y={42}>
          <div className="panel rounded-[2rem] p-8 sm:p-10">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-[color:var(--muted)]">Otázky</p>
                <h2 className="mt-4 font-display text-[clamp(2.3rem,4vw,4rem)] font-extrabold leading-[0.94] tracking-[-0.05em] text-[color:var(--foreground)]">
                  Máte otázky alebo si nie ste istí výberom?
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-8 text-[color:var(--muted)] sm:text-lg">
                  Ak si chcete len rýchlo overiť, ktorý plán sa vám oplatí najviac, pokojne sa ozvite a radi poradíme.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </SiteShell>
  );
}

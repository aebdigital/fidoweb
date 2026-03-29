import type { Metadata } from "next";
import { MailIcon, PhoneIcon } from "@/components/icons";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/reveal";
import { SiteShell } from "@/components/site-shell";
import { SITE_URL } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Kontaktujte FIDO Calcul kvôli produktu, onboarding procesu, cenám alebo tomu, ako FIDO Calcul zapadne do vášho workflow.",
  alternates: {
    canonical: "/kontakt",
  },
  openGraph: {
    title: "Kontakt | FIDO Calcul",
    description:
      "Kontaktujte FIDO Calcul kvôli produktu, onboarding procesu, cenám alebo tomu, ako FIDO Calcul zapadne do vášho workflow.",
    url: `${SITE_URL}/kontakt`,
    images: [
      {
        url: "/assets/app-icon.jpg",
        width: 512,
        height: 512,
        alt: "Kontakt FIDO Calcul",
      },
    ],
  },
  twitter: {
    title: "Kontakt | FIDO Calcul",
    description:
      "Kontaktujte FIDO Calcul kvôli produktu, onboarding procesu, cenám alebo tomu, ako FIDO Calcul zapadne do vášho workflow.",
    images: ["/assets/app-icon.jpg"],
  },
};

const contactInfo = [
  {
    icon: MailIcon,
    label: "E-mail",
    value: "kontakt@fido.sk",
    detail: "Pre otázky k produktu, pomoc s nastavením a overenie, či FIDO Calcul sedí na váš workflow.",
    href: "mailto:kontakt@fido.sk",
  },
  {
    icon: PhoneIcon,
    label: "Telefón",
    value: "+421 917 617 202",
    detail: "Pre rýchlejší kontakt a rozhovor o nasadení do vášho procesu.",
    href: "tel:+421917617202",
  },
];

export default function KontaktPage() {
  return (
    <SiteShell activePath="/kontakt">
      <section className="section-shell pt-12 sm:pt-16 lg:pt-20">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <div className="pill">Kontakt</div>
          </Reveal>
          <Reveal delay={80}>
              <h1 className="mx-auto mt-6 max-w-[11ch] font-display text-[clamp(3.4rem,7vw,6.2rem)] font-extrabold leading-[0.92] tracking-[-0.05em] text-[color:var(--foreground)]">
              Máte otázky?
            </h1>
          </Reveal>
          <Reveal delay={150}>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[color:var(--muted)] sm:text-xl">
              Ak chcete vidieť, ako FIDO Calcul zapadne do vašich projektov, cenotvorby, faktúr alebo tímového procesu, napíšte nám a ozveme sa vám späť.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-shell pt-12 lg:pt-16">
        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div className="panel p-8 sm:p-10">
              <p className="text-xs uppercase tracking-[0.24em] text-[color:var(--muted)]">Kontaktné údaje</p>
              <h2 className="mt-4 font-display text-4xl font-extrabold tracking-[-0.05em] text-[color:var(--foreground)]">
                Ozvite sa nám priamo.
              </h2>
              <p className="mt-4 max-w-lg text-base leading-8 text-[color:var(--muted)] sm:text-lg">
                Radi pomôžeme s otázkami k produktu, onboardingom, výberom správneho plánu aj s tým, či FIDO Calcul sedí na váš typ práce.
              </p>

              <div className="mt-8 space-y-4">
                {contactInfo.map((item) => {
                  const Icon = item.icon;

                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      className="block rounded-[1.5rem] border border-[color:var(--line)] bg-[color:var(--surface)] p-5 transition duration-300 hover:-translate-y-0.5"
                    >
                      <div className="flex h-11 w-11 items-center justify-center text-[color:var(--foreground)]">
                        <Icon className="h-4.5 w-4.5" />
                      </div>
                      <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.22em] text-[color:var(--muted)]">{item.label}</p>
                      <p className="mt-3 font-display text-[1.25rem] font-extrabold tracking-[-0.05em] text-[color:var(--foreground)] sm:text-[1.9rem]">{item.value}</p>
                      <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">{item.detail}</p>
                    </a>
                  );
                })}
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="panel p-8 sm:p-10">
              <p className="text-xs uppercase tracking-[0.24em] text-[color:var(--muted)]">Kontaktný formulár</p>
              <h2 className="mt-4 font-display text-4xl font-extrabold tracking-[-0.05em] text-[color:var(--foreground)]">
                Napíšte nám.
              </h2>
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>
    </SiteShell>
  );
}

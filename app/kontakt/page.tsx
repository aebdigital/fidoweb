import type { Metadata } from "next";
import { ArrowRightIcon, MailIcon, PhoneIcon } from "@/components/icons";
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
    label: "Email",
    value: "team@fidocalcul.com",
    detail: "For product questions, setup help, and workflow fit.",
    href: "mailto:team@fidocalcul.com",
  },
  {
    icon: PhoneIcon,
    label: "Phone",
    value: "+421 900 000 000",
    detail: "For faster contact and implementation conversations.",
    href: "tel:+421900000000",
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
            <h1 className="mx-auto mt-6 max-w-[11ch] font-display text-[clamp(3.4rem,7vw,6.2rem)] font-black leading-[0.92] tracking-[-0.05em] text-[color:var(--foreground)]">
              Let&apos;s talk about your workflow.
            </h1>
          </Reveal>
          <Reveal delay={150}>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[color:var(--muted)] sm:text-xl">
              If you want to see how FIDO Calcul fits your projects, pricing, invoices, or team process, send us a message and we&apos;ll get back to you.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-shell pt-12 lg:pt-16">
        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div className="panel p-8 sm:p-10">
              <p className="text-xs uppercase tracking-[0.24em] text-[color:var(--muted)]">Contact Info</p>
              <h2 className="mt-4 font-display text-4xl font-black tracking-[-0.05em] text-[color:var(--foreground)]">
                Reach us directly.
              </h2>
              <p className="mt-4 max-w-lg text-base leading-8 text-[color:var(--muted)] sm:text-lg">
                We can help with product questions, onboarding, choosing the right plan, or checking whether FIDO Calcul fits your type of work.
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
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[color:var(--foreground)] text-[color:var(--background)]">
                        <Icon className="h-4.5 w-4.5" />
                      </div>
                      <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.22em] text-[color:var(--muted)]">{item.label}</p>
                      <p className="mt-3 font-display text-[1.9rem] font-black tracking-[-0.05em] text-[color:var(--foreground)]">{item.value}</p>
                      <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">{item.detail}</p>
                    </a>
                  );
                })}
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="panel p-8 sm:p-10">
              <p className="text-xs uppercase tracking-[0.24em] text-[color:var(--muted)]">Contact Form</p>
              <h2 className="mt-4 font-display text-4xl font-black tracking-[-0.05em] text-[color:var(--foreground)]">
                Send a message.
              </h2>
              <form className="mt-8 grid gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="grid gap-2">
                    <span className="text-sm font-semibold text-[color:var(--foreground)]">Name</span>
                    <input
                      className="rounded-[1.2rem] border border-[color:var(--line)] bg-[color:var(--surface)] px-4 py-3 text-[color:var(--foreground)] outline-none transition focus:border-black/25 dark:focus:border-white/25"
                      placeholder="Your name"
                    />
                  </label>
                  <label className="grid gap-2">
                    <span className="text-sm font-semibold text-[color:var(--foreground)]">Email</span>
                    <input
                      className="rounded-[1.2rem] border border-[color:var(--line)] bg-[color:var(--surface)] px-4 py-3 text-[color:var(--foreground)] outline-none transition focus:border-black/25 dark:focus:border-white/25"
                      placeholder="name@company.com"
                    />
                  </label>
                </div>
                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-[color:var(--foreground)]">Company or team</span>
                  <input
                    className="rounded-[1.2rem] border border-[color:var(--line)] bg-[color:var(--surface)] px-4 py-3 text-[color:var(--foreground)] outline-none transition focus:border-black/25 dark:focus:border-white/25"
                    placeholder="Studio, contractor, estimator team..."
                  />
                </label>
                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-[color:var(--foreground)]">How can we help?</span>
                  <textarea
                    className="min-h-40 rounded-[1.2rem] border border-[color:var(--line)] bg-[color:var(--surface)] px-4 py-3 text-[color:var(--foreground)] outline-none transition focus:border-black/25 dark:focus:border-white/25"
                    placeholder="Tell us about your pricing flow, invoices, team setup, or what you want to solve."
                  />
                </label>
                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-3 rounded-full bg-[color:var(--foreground)] px-6 py-4 text-sm font-semibold text-[color:var(--background)] transition duration-300 hover:-translate-y-1"
                >
                  Send message
                  <ArrowRightIcon className="h-4 w-4" />
                </button>
              </form>
            </div>
          </Reveal>
        </div>
      </section>
    </SiteShell>
  );
}

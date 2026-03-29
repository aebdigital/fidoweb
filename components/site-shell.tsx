import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { CookieSettingsTrigger } from "@/components/cookie-consent";
import { ArrowRightIcon } from "@/components/icons";
import { ThemeToggle } from "@/components/theme-toggle";

type SiteShellProps = {
  activePath: "/" | "/demo" | "/pricing" | "/kontakt" | "/gdpr";
  children: ReactNode;
  ctaHref?: string;
  ctaLabel?: string;
};

const navigation = [
  { href: "/", label: "Úvod" },
  { href: "/pricing", label: "Cenník" },
  { href: "/kontakt", label: "Kontakt" },
] as const;

function isActive(activePath: SiteShellProps["activePath"], href: string) {
  return activePath === href;
}

export function SiteShell({ activePath, children, ctaHref = "/kontakt", ctaLabel = "Kontakt" }: SiteShellProps) {
  return (
    <main className="relative min-h-screen overflow-x-clip pb-10">
      <div className="page-haze" aria-hidden="true" />

      <header className="sticky top-0 z-50 border-b border-[color:var(--line)] bg-[color:var(--glass)] backdrop-blur-xl">
        <div className="section-shell flex h-20 items-center justify-between gap-4">
          <Link href="/" className="flex items-center">
            <Image src="/assets/logo.png" alt="Logo FIDO Calcul" width={108} height={40} className="h-10 w-auto dark:hidden" />
            <Image src="/assets/dark-logo.jpg" alt="Logo FIDO Calcul v tmavom režime" width={108} height={40} className="hidden h-10 w-auto dark:block" />
          </Link>

          <nav className="hidden items-center gap-2 md:flex">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  "rounded-full px-4 py-2 text-sm font-semibold transition duration-300",
                  isActive(activePath, item.href)
                    ? "bg-[color:var(--foreground)] text-[color:var(--background)] shadow-[0_18px_40px_rgba(10,10,10,0.16)]"
                    : "text-[color:var(--muted)] hover:bg-[color:var(--panel)] hover:text-[color:var(--foreground)]",
                ].join(" ")}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
              href={ctaHref}
              className="hidden items-center gap-2 rounded-full bg-[color:var(--foreground)] px-5 py-3 text-sm font-semibold text-[color:var(--background)] transition duration-300 hover:-translate-y-0.5 sm:inline-flex"
            >
              {ctaLabel}
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </header>

      {children}

      <footer className="section-shell pt-10">
        <div className="flex flex-col gap-4 border-t border-[color:var(--line)] py-6 text-sm text-[color:var(--muted)] sm:flex-row sm:items-center sm:justify-between">
          <p>Fido s.r.o. © 2026</p>
          <div className="flex flex-wrap items-center gap-5">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href} className="transition hover:text-[color:var(--foreground)]">
                {item.label}
              </Link>
            ))}
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

"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRightIcon } from "@/components/icons";
import { ThemeToggle } from "@/components/theme-toggle";

type NavItem = {
  href: string;
  label: string;
};

type MobileNavProps = {
  activePath: string;
  items: readonly NavItem[];
  ctaHref: string;
  ctaLabel: string;
};

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function MobileNav({ activePath, items, ctaHref, ctaLabel }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="group relative inline-flex h-12 w-12 items-center justify-center transition duration-300 hover:-translate-y-0.5 md:hidden"
        aria-expanded={open}
        aria-label={open ? "Zavrieť navigáciu" : "Otvoriť navigáciu"}
      >
        <span className="relative flex h-4 w-5 flex-col justify-between">
          <span
            className={cn(
              "h-[2px] rounded-full bg-[color:var(--foreground)] transition-all duration-300",
              open ? "w-5 translate-y-[7px] rotate-45" : "w-5"
            )}
          />
          <span
            className={cn(
              "h-[2px] rounded-full bg-[color:var(--foreground)] transition-all duration-300",
              open ? "opacity-0" : "w-3.5 self-end"
            )}
          />
          <span
            className={cn(
              "h-[2px] rounded-full bg-[color:var(--foreground)] transition-all duration-300",
              open ? "w-5 -translate-y-[7px] -rotate-45" : "w-4 self-start"
            )}
          />
        </span>
      </button>

      <div
        className={cn(
          "fixed inset-0 z-[70] md:hidden",
          open ? "pointer-events-auto" : "pointer-events-none"
        )}
        aria-hidden={!open}
      >
        <button
          type="button"
          aria-label="Zavrieť navigáciu"
          onClick={() => setOpen(false)}
          className="absolute inset-0"
        />

        <div
          className={cn(
            "absolute inset-x-0 bottom-0 top-[70vh] bg-white/34 backdrop-blur-2xl transition duration-300 dark:bg-black/42",
            open ? "opacity-100" : "opacity-0"
          )}
        />

        <div
          className={cn(
            "absolute inset-x-0 top-0 h-[70vh] overflow-hidden rounded-b-[2.2rem] border-b border-white/25 bg-[linear-gradient(180deg,rgba(255,255,255,0.985),rgba(239,246,255,0.97)_55%,rgba(220,234,255,0.95))] shadow-[0_30px_80px_rgba(37,99,235,0.18)] backdrop-blur-2xl transition-transform duration-500 dark:border-white/10 dark:bg-[linear-gradient(180deg,rgba(14,16,22,0.985),rgba(18,23,34,0.975)_55%,rgba(20,34,62,0.96))]",
            open ? "translate-y-0" : "-translate-y-[108%]"
          )}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.22),transparent_46%)] dark:bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.28),transparent_42%)]" />

          <div className="relative flex h-full flex-col px-5 pb-8 pt-24">
            <Link href="/" onClick={() => setOpen(false)} className="absolute left-5 top-5 flex items-center">
              <Image src="/assets/newdark.png" alt="Logo FIDO Calcul" width={108} height={40} className="h-10 w-auto" />
            </Link>

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-5 top-5 inline-flex h-12 w-12 items-center justify-center transition duration-300"
              aria-label="Zavrieť navigáciu"
            >
              <span className="relative flex h-4 w-4 items-center justify-center">
                <span className="absolute h-[2px] w-4 rotate-45 rounded-full bg-[color:var(--foreground)]" />
                <span className="absolute h-[2px] w-4 -rotate-45 rounded-full bg-[color:var(--foreground)]" />
              </span>
            </button>

            <div className="space-y-2">
              {items.map((item, index) => {
                const active = activePath === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center justify-between rounded-[1.5rem] px-5 py-4 text-lg font-semibold transition duration-300",
                      active
                        ? "bg-[color:var(--foreground)] text-[color:var(--background)] shadow-[0_18px_40px_rgba(10,10,10,0.14)]"
                        : "bg-white/60 text-[color:var(--foreground)] shadow-[0_10px_24px_rgba(10,10,10,0.04)] dark:bg-white/5"
                    )}
                    style={{
                      transitionDelay: open ? `${index * 35}ms` : "0ms",
                    }}
                  >
                    <span>{item.label}</span>
                    <ArrowRightIcon className="h-4 w-4" />
                  </Link>
                );
              })}
            </div>

            <div className="mt-6 flex items-center justify-end">
              <ThemeToggle />
            </div>

            <div className="mt-auto">
              <Link
                href={ctaHref}
                onClick={() => setOpen(false)}
                className="btn-blue-gradient-web inline-flex w-full items-center justify-center gap-3 rounded-full px-6 py-4 text-sm font-semibold text-white transition duration-300"
              >
                {ctaLabel}
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

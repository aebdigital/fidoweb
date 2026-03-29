"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";

const STORAGE_KEY = "fido-cookie-preferences";
const OPEN_EVENT = "fido-open-cookie-settings";

type CookiePreferences = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
};

const defaultPreferences: CookiePreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
};

function readStoredPreferences(): CookiePreferences | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as Partial<CookiePreferences> | null;
    if (!parsed) return null;

    return {
      necessary: true,
      analytics: Boolean(parsed.analytics),
      marketing: Boolean(parsed.marketing),
    };
  } catch {
    return null;
  }
}

function persistPreferences(preferences: CookiePreferences) {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      ...preferences,
      necessary: true,
      updatedAt: new Date().toISOString(),
    })
  );
}

function CookieToggle({
  title,
  description,
  checked,
  onChange,
  disabled = false,
}: {
  title: string;
  description: string;
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-[1.4rem] border border-[color:var(--line)] bg-[color:var(--surface)] px-4 py-4">
      <div className="max-w-[32rem]">
        <p className="text-sm font-semibold text-[color:var(--foreground)]">{title}</p>
        <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-disabled={disabled}
        onClick={disabled ? undefined : onChange}
        className={[
          "relative inline-flex h-8 w-14 flex-none items-center rounded-full border transition duration-300",
          checked
            ? "border-[color:var(--foreground)] bg-[color:var(--foreground)]"
            : "border-[color:var(--line)] bg-white dark:bg-[#111111]",
          disabled ? "cursor-not-allowed opacity-80" : "cursor-pointer",
        ].join(" ")}
      >
        <span
          className={[
            "absolute h-6 w-6 rounded-full transition duration-300",
            checked ? "translate-x-7 bg-[color:var(--background)]" : "translate-x-1 bg-[color:var(--foreground)]",
          ].join(" ")}
        />
      </button>
    </div>
  );
}

export function CookieSettingsTrigger({
  children = "Cookies",
  className,
}: {
  children?: ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}
      className={className}
    >
      {children}
    </button>
  );
}

export function CookieConsent() {
  const [mounted, setMounted] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>(defaultPreferences);

  useEffect(() => {
    setMounted(true);
    const stored = readStoredPreferences();

    if (stored) {
      setPreferences(stored);
      setShowBanner(false);
      return;
    }

    setShowBanner(true);
  }, []);

  useEffect(() => {
    if (!mounted) return undefined;

    const handleOpen = () => setShowModal(true);
    window.addEventListener(OPEN_EVENT, handleOpen);

    return () => window.removeEventListener(OPEN_EVENT, handleOpen);
  }, [mounted]);

  if (!mounted) return null;

  const savePreferences = (nextPreferences: CookiePreferences) => {
    const normalized = {
      necessary: true,
      analytics: nextPreferences.analytics,
      marketing: nextPreferences.marketing,
    };

    setPreferences(normalized);
    persistPreferences(normalized);
    setShowBanner(false);
    setShowModal(false);
  };

  return (
    <>
      {showBanner ? (
        <div className="fixed inset-x-0 bottom-0 z-[90] p-4 sm:p-6">
          <div className="mx-auto flex w-full max-w-[1080px] flex-col gap-5 rounded-[2rem] border border-[color:var(--line)] bg-[color:var(--glass)] p-5 shadow-[0_30px_90px_rgba(10,10,10,0.18)] backdrop-blur-2xl sm:flex-row sm:items-end sm:justify-between sm:p-6">
            <div className="max-w-2xl">
              <p className="text-xs uppercase tracking-[0.24em] text-[color:var(--muted)]">Cookies</p>
              <h2 className="mt-3 font-display text-3xl font-extrabold tracking-[-0.05em] text-[color:var(--foreground)]">Tento web používa cookies pre stabilitu a lepší prehľad o používaní.</h2>
              <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">
                Nevyhnutné cookies držia web funkčný. Analytické a marketingové cookies môžete zapnúť alebo nechať vypnuté v nastaveniach. Viac nájdete na stránke{" "}
                <Link href="/gdpr" className="font-semibold text-[color:var(--foreground)] underline decoration-black/15 underline-offset-4 dark:decoration-white/20">
                  GDPR
                </Link>
                .
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:min-w-[18rem]">
              <button
                type="button"
                onClick={() => savePreferences({ necessary: true, analytics: false, marketing: false })}
                className="rounded-full border border-[color:var(--line)] bg-[color:var(--panel)] px-5 py-3 text-sm font-semibold text-[color:var(--foreground)] transition duration-300 hover:-translate-y-0.5"
              >
                Odmietnuť voliteľné
              </button>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(true)}
                  className="flex-1 rounded-full border border-[color:var(--line)] bg-[color:var(--panel)] px-5 py-3 text-sm font-semibold text-[color:var(--foreground)] transition duration-300 hover:-translate-y-0.5"
                >
                  Nastavenia
                </button>
                <button
                  type="button"
                  onClick={() => savePreferences({ necessary: true, analytics: true, marketing: true })}
                  className="flex-1 rounded-full bg-[color:var(--foreground)] px-5 py-3 text-sm font-semibold text-[color:var(--background)] transition duration-300 hover:-translate-y-0.5"
                >
                  Prijať všetko
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {showModal ? (
        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/25 p-4 backdrop-blur-sm sm:items-center sm:p-6">
          <div className="w-full max-w-[760px] rounded-[2rem] border border-[color:var(--line)] bg-[color:var(--panel)] p-5 shadow-[0_35px_100px_rgba(10,10,10,0.24)] sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <div className="max-w-2xl">
                <p className="text-xs uppercase tracking-[0.24em] text-[color:var(--muted)]">Nastavenia cookies</p>
                <h2 className="mt-3 font-display text-4xl font-extrabold tracking-[-0.05em] text-[color:var(--foreground)]">Vyberte si, ktoré cookies môže používať web FIDO Calcul.</h2>
                <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">
                  Výber môžete kedykoľvek zmeniť znova cez odkaz Cookies vo footeri. Viac o spracovaní údajov je na stránke{" "}
                  <Link href="/gdpr" className="font-semibold text-[color:var(--foreground)] underline decoration-black/15 underline-offset-4 dark:decoration-white/20">
                    GDPR
                  </Link>
                  .
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--line)] bg-[color:var(--surface)] text-lg leading-none text-[color:var(--foreground)] transition duration-300 hover:-translate-y-0.5"
                aria-label="Zavrieť nastavenia cookies"
              >
                ×
              </button>
            </div>

            <div className="mt-6 space-y-3">
              <CookieToggle
                title="Nevyhnutné cookies"
                description="Zabezpečujú základné fungovanie rozhrania, tému, ochranu formulárov a uloženie vášho výberu cookies."
                checked
                disabled
                onChange={() => undefined}
              />
              <CookieToggle
                title="Analytické cookies"
                description="Pomáhajú pochopiť, ktoré sekcie marketing webu ľudia používajú najčastejšie, aby sa dal produktový obsah zlepšovať."
                checked={preferences.analytics}
                onChange={() => setPreferences((current) => ({ ...current, analytics: !current.analytics }))}
              />
              <CookieToggle
                title="Marketingové cookies"
                description="Používajú sa na meranie kampaní a lepšie zacielenie komunikačných vrstiev, ak sa na webe neskôr doplnia."
                checked={preferences.marketing}
                onChange={() => setPreferences((current) => ({ ...current, marketing: !current.marketing }))}
              />
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-between">
              <button
                type="button"
                onClick={() => savePreferences({ necessary: true, analytics: false, marketing: false })}
                className="rounded-full border border-[color:var(--line)] bg-[color:var(--panel)] px-5 py-3 text-sm font-semibold text-[color:var(--foreground)] transition duration-300 hover:-translate-y-0.5"
              >
                Odmietnuť voliteľné
              </button>
              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => savePreferences(preferences)}
                  className="rounded-full border border-[color:var(--line)] bg-[color:var(--panel)] px-5 py-3 text-sm font-semibold text-[color:var(--foreground)] transition duration-300 hover:-translate-y-0.5"
                >
                  Uložiť nastavenia
                </button>
                <button
                  type="button"
                  onClick={() => savePreferences({ necessary: true, analytics: true, marketing: true })}
                  className="rounded-full bg-[color:var(--foreground)] px-5 py-3 text-sm font-semibold text-[color:var(--background)] transition duration-300 hover:-translate-y-0.5"
                >
                  Prijať všetko
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

"use client";

import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@/components/icons";

type Theme = "light" | "dark";

function getPreferredTheme(): Theme {
  if (typeof window === "undefined") {
    return "light";
  }

  const storedTheme = window.localStorage.getItem("theme");
  if (storedTheme === "light" || storedTheme === "dark") {
    return storedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;
  window.localStorage.setItem("theme", theme);
}

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const currentTheme = getPreferredTheme();
    applyTheme(currentTheme);
    setTheme(currentTheme);
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    applyTheme(nextTheme);
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="relative inline-flex h-12 w-[76px] items-center rounded-full border border-[color:var(--line)] bg-white px-1 shadow-[var(--shadow-soft)] transition duration-300 hover:-translate-y-0.5 hover:border-black/20 dark:bg-black dark:hover:border-white/20"
      aria-label="Prepnúť farebnú tému"
    >
      <span
        className={[
          "absolute top-1 flex h-10 w-10 items-center justify-center rounded-full bg-[color:var(--foreground)] text-[color:var(--background)] shadow-[0_10px_24px_rgba(0,0,0,0.14)] transition-all duration-300",
          mounted && theme === "dark" ? "translate-x-[32px]" : "translate-x-0",
        ].join(" ")}
      >
        {mounted && theme === "dark" ? <MoonIcon className="h-4 w-4" /> : <SunIcon className="h-4 w-4" />}
      </span>
      <span className="relative z-10 flex w-full items-center justify-between px-2 text-[color:var(--muted)]">
        <SunIcon className="h-4 w-4" />
        <MoonIcon className="h-4 w-4" />
      </span>
    </button>
  );
}

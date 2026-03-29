"use client";

import { useMemo, useState } from "react";
import { ArrowRightIcon } from "@/components/icons";

type FormState = {
  name: string;
  email: string;
  company: string;
  message: string;
};

type SubmitState =
  | { status: "idle"; message: string }
  | { status: "loading"; message: string }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

const initialFormState: FormState = {
  name: "",
  email: "",
  company: "",
  message: "",
};

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialFormState);
  const [submitState, setSubmitState] = useState<SubmitState>({
    status: "idle",
    message: "",
  });

  const disabled = submitState.status === "loading";

  const statusClassName = useMemo(() => {
    if (submitState.status === "success") {
      return "border-emerald-500/25 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300";
    }

    if (submitState.status === "error") {
      return "border-red-500/25 bg-red-500/10 text-red-700 dark:text-red-300";
    }

    return "hidden";
  }, [submitState.status]);

  function updateField(field: keyof FormState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));

    if (submitState.status !== "idle") {
      setSubmitState({ status: "idle", message: "" });
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSubmitState({
      status: "loading",
      message: "Odosielame správu...",
    });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = (await response.json()) as { error?: string; message?: string };

      if (!response.ok) {
        setSubmitState({
          status: "error",
          message: data.error || "Správu sa nepodarilo odoslať. Skúste to prosím ešte raz.",
        });
        return;
      }

      setSubmitState({
        status: "success",
        message: data.message || "Správa bola odoslaná. Ozveme sa vám čo najskôr.",
      });
      setForm(initialFormState);
    } catch {
      setSubmitState({
        status: "error",
        message: "Správu sa nepodarilo odoslať. Skúste to prosím ešte raz.",
      });
    }
  }

  return (
    <form className="mt-8 grid gap-4" onSubmit={handleSubmit}>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2">
          <span className="text-sm font-semibold text-[color:var(--foreground)]">Meno</span>
          <input
            name="name"
            value={form.name}
            onChange={(event) => updateField("name", event.target.value)}
            className="rounded-[1.2rem] border border-[color:var(--line)] bg-[color:var(--surface)] px-4 py-3 text-[color:var(--foreground)] outline-none transition focus:border-black/25 dark:focus:border-white/25"
            placeholder="Vaše meno"
            autoComplete="name"
            required
            disabled={disabled}
          />
        </label>
        <label className="grid gap-2">
          <span className="text-sm font-semibold text-[color:var(--foreground)]">E-mail</span>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={(event) => updateField("email", event.target.value)}
            className="rounded-[1.2rem] border border-[color:var(--line)] bg-[color:var(--surface)] px-4 py-3 text-[color:var(--foreground)] outline-none transition focus:border-black/25 dark:focus:border-white/25"
            placeholder="meno@firma.sk"
            autoComplete="email"
            required
            disabled={disabled}
          />
        </label>
      </div>
      <label className="grid gap-2">
        <span className="text-sm font-semibold text-[color:var(--foreground)]">Firma alebo tím</span>
        <input
          name="company"
          value={form.company}
          onChange={(event) => updateField("company", event.target.value)}
          className="rounded-[1.2rem] border border-[color:var(--line)] bg-[color:var(--surface)] px-4 py-3 text-[color:var(--foreground)] outline-none transition focus:border-black/25 dark:focus:border-white/25"
          placeholder="Štúdio, dodávateľ, rozpočtársky tím..."
          autoComplete="organization"
          disabled={disabled}
        />
      </label>
      <label className="grid gap-2">
        <span className="text-sm font-semibold text-[color:var(--foreground)]">Ako vám môžeme pomôcť?</span>
        <textarea
          name="message"
          value={form.message}
          onChange={(event) => updateField("message", event.target.value)}
          className="min-h-40 rounded-[1.2rem] border border-[color:var(--line)] bg-[color:var(--surface)] px-4 py-3 text-[color:var(--foreground)] outline-none transition focus:border-black/25 dark:focus:border-white/25"
          placeholder="Napíšte nám o vašej cenotvorbe, faktúrach, nastavení tímu alebo tom, čo chcete vyriešiť."
          required
          disabled={disabled}
        />
      </label>

      <div
        className={`rounded-[1.2rem] border px-4 py-3 text-sm font-medium ${statusClassName}`}
        role={submitState.status === "idle" ? undefined : "status"}
        aria-live="polite"
      >
        {submitState.message}
      </div>

      <button
        type="submit"
        disabled={disabled}
        className="inline-flex items-center justify-center gap-3 rounded-full bg-[color:var(--foreground)] px-6 py-4 text-sm font-semibold text-[color:var(--background)] transition duration-300 hover:-translate-y-1 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {submitState.status === "loading" ? "Odosielame..." : "Odoslať správu"}
        <ArrowRightIcon className="h-4 w-4" />
      </button>
    </form>
  );
}

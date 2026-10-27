"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

/**
 * With NEXT_PUBLIC_FORMSPREE_ID set (see README), the form posts to Formspree,
 * which also validates and filters spam server-side. Without it, the form never
 * pretends to send: it opens the visitor's email app with the message filled in.
 */
const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID;

const types = ["Rive character", "Lottie animation", "UI / UX motion", "Explainer video", "Something else"];
const budgets = ["Prefer not to say", "Under $500", "$500 – $1,500", "$1,500 – $5,000", "$5,000+"];

type Errors = Partial<Record<"name" | "email" | "message", string>>;
type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("_gotcha")) return; // honeypot: bots fill hidden fields

    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const next: Errors = {};
    if (name.length < 2) next.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Please enter a valid email address.";
    if (message.length < 10) next.message = "Please add a few words about the project (10+ characters).";
    setErrors(next);
    if (Object.keys(next).length) {
      form.querySelector<HTMLElement>(`[name="${Object.keys(next)[0]}"]`)?.focus();
      return;
    }

    const type = String(data.get("type"));
    const budget = String(data.get("budget"));

    if (!FORMSPREE_ID) {
      const body = `${message}\n\nProject type: ${type}\nBudget: ${budget}\n\n— ${name} (${email})`;
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(`Project enquiry: ${type}`)}&body=${encodeURIComponent(body)}`;
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent")
    return (
      <div role="status" className="rounded-lg bg-lime p-8 md:p-12">
        <h2 className="text-3xl font-semibold tracking-tight">Thanks — message received.</h2>
        <p className="mt-3 text-ink/70">I&apos;ll get back to you soon at the email you gave.</p>
      </div>
    );

  const field = "mt-2 block min-h-12 w-full rounded-sm border bg-surface px-4 py-3 text-base outline-none transition-colors focus:border-violet";

  return (
    <form noValidate onSubmit={onSubmit} className="rounded-lg bg-surface p-6 md:p-10" aria-describedby="privacy">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Name" error={errors.name} id="name">
          <input id="name" name="name" autoComplete="name" required aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-err" : undefined} className={cn(field, errors.name ? "border-red-600" : "border-line")} />
        </Field>
        <Field label="Email" error={errors.email} id="email">
          <input id="email" name="email" type="email" autoComplete="email" required aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-err" : undefined} className={cn(field, errors.email ? "border-red-600" : "border-line")} />
        </Field>
        <Field label="Project type" id="type">
          <select id="type" name="type" className={cn(field, "border-line")}>
            {types.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </Field>
        <Field label="Budget (optional)" id="budget">
          <select id="budget" name="budget" className={cn(field, "border-line")}>
            {budgets.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
        </Field>
        <div className="sm:col-span-2">
          <Field label="Message" error={errors.message} id="message">
            <textarea id="message" name="message" rows={6} required aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-err" : undefined} className={cn(field, "resize-y", errors.message ? "border-red-600" : "border-line")} />
          </Field>
        </div>
        <div aria-hidden className="absolute left-[-9999px] h-px w-px overflow-hidden">
          <label>
            Leave this empty
            <input name="_gotcha" tabIndex={-1} autoComplete="off" />
          </label>
        </div>
      </div>
      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p id="privacy" className="max-w-sm text-xs leading-relaxed text-muted">
          {FORMSPREE_ID
            ? "Your details are sent via Formspree and used only to reply to you."
            : "This opens your email app with the message filled in — nothing is stored on this site."}
        </p>
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex min-h-12 items-center justify-center rounded-full bg-ink px-8 font-medium text-bg transition-colors hover:bg-violet disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : FORMSPREE_ID ? "Send message" : "Write email"}
        </button>
      </div>
      {status === "error" && (
        <p role="alert" className="mt-4 text-sm text-red-700">
          Something went wrong sending that. Please email <a className="underline" href={`mailto:${site.email}`}>{site.email}</a> directly.
        </p>
      )}
    </form>
  );
}

function Field({ label, error, id, children }: { label: string; error?: string; id: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-err`} className="mt-2 text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}

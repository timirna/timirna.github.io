"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/data/site";

/** Email band: opens the visitor's mail app with their address filled in — nothing is stored. */
export function JoinCTA() {
  const [error, setError] = useState("");
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = String(new FormData(e.currentTarget).get("email") ?? "").trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    const body = `Hi Timir,\n\nI'd like to talk about a project.\n\nReply to: ${email}`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent("New project")}&body=${encodeURIComponent(body)}`;
  }
  return (
    <section aria-labelledby="join-title" className="mx-4 mt-16 border-t-8 border-[#232323] px-2 py-16 text-center md:mx-12 md:py-20">
      <h2 id="join-title" className="text-[clamp(2rem,4vw,3rem)] font-black tracking-tight">
        Ready to make it move?
      </h2>
      <p className="mt-3 text-lg md:text-xl">Tell me about your project — I usually reply within a day.</p>
      <form noValidate onSubmit={onSubmit} className="mx-auto mt-6 flex max-w-2xl flex-col gap-2 sm:flex-row">
        <label htmlFor="join-email" className="sr-only">
          Your email address
        </label>
        <input
          id="join-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="Your email address"
          aria-invalid={!!error}
          aria-describedby={error ? "join-err" : undefined}
          className="h-14 flex-1 rounded border border-[#808080] bg-black/60 px-4 text-base placeholder:text-[#8c8c8c] focus:border-white focus:outline-none"
        />
        <button type="submit" className="h-14 rounded bg-red px-7 text-xl font-semibold text-white transition-colors hover:bg-[var(--red-hover)]">
          Get Started ›
        </button>
      </form>
      {error && (
        <p id="join-err" role="alert" className="mt-3 text-sm text-[#e87c03]">
          {error}
        </p>
      )}
    </section>
  );
}

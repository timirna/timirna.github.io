"use client";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="flex min-h-11 items-center gap-2 rounded bg-[rgba(109,109,110,.7)] px-5 font-bold text-white hover:bg-[rgba(109,109,110,.4)]"
    >
      ⎙ Print / Save as PDF
    </button>
  );
}

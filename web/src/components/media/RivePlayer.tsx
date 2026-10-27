"use client";

import { Alignment, Fit, Layout, RuntimeLoader, StateMachineInputType, useRive } from "@rive-app/react-canvas";
import { useCallback, useEffect, useImperativeHandle, useRef, useState, type Ref } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

// Copied into /public/rive by scripts/sync-static.mjs.
RuntimeLoader.setWasmUrl("/rive/rive.wasm");
RuntimeLoader.setWasmFallbackUrl("/rive/rive_fallback.wasm");

/**
 * A control discovered at runtime from the loaded .riv file — either a classic
 * state machine input or a data-binding (view model) property. Nothing is
 * hardcoded: if the file doesn't expose an input, no control is rendered.
 */
export type RiveControl =
  | { source: "input" | "vm"; kind: "number"; name: string; value: number }
  | { source: "input" | "vm"; kind: "boolean"; name: string; value: boolean }
  | { source: "input" | "vm"; kind: "trigger"; name: string }
  | { source: "vm"; kind: "enum"; name: string; value: string; options: string[] };

export type RiveHandle = {
  setNumber: (name: string, v: number) => boolean;
  setBoolean: (name: string, v: boolean) => boolean;
  fire: (name: string) => boolean;
  has: (name: string) => boolean;
};

type Hints = {
  /** Labels for a number input whose values are 0..n-1 (e.g. expressions). */
  numberLabels?: Record<string, string[]>;
  /** [min, max, step] for a number input/property, if known. */
  numberRanges?: Record<string, [number, number, number]>;
};

type Props = {
  src: string;
  stateMachine?: string;
  artboard?: string;
  label: string;
  className?: string;
  canvasClassName?: string;
  showControls?: boolean;
  hints?: Hints;
  fallbackHref?: string;
  handleRef?: Ref<RiveHandle>;
  onReady?: (controls: RiveControl[]) => void;
};

export function RivePlayer({
  src,
  stateMachine,
  artboard,
  label,
  className,
  canvasClassName,
  showControls = false,
  hints,
  fallbackHref,
  handleRef,
  onReady,
}: Props) {
  const box = useRef<HTMLDivElement>(null);
  const near = useInView(box, { margin: "200px", once: true });
  const visible = useInView(box, { margin: "0px" });
  const reduce = useReducedMotion();
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "error">("idle");
  const [controls, setControls] = useState<RiveControl[]>([]);
  const [paused, setPaused] = useState(false);
  const onReadyRef = useRef(onReady);
  useEffect(() => {
    onReadyRef.current = onReady;
  });

  const { rive, RiveComponent } = useRive(
    near
      ? {
          src,
          artboard,
          stateMachine,
          autoplay: !reduce,
          autoBind: true,
          layout: new Layout({ fit: Fit.Contain, alignment: Alignment.Center }),
          onLoad: () => setStatus("ready"),
          onLoadError: () => setStatus("error"),
        }
      : null,
  );

  const [loadingStarted, setLoadingStarted] = useState(false);
  if (near && !loadingStarted) {
    setLoadingStarted(true);
    setStatus("loading");
  }

  const discover = useCallback((): RiveControl[] => {
    if (!rive) return [];
    const found: RiveControl[] = [];
    if (stateMachine) {
      for (const input of rive.stateMachineInputs(stateMachine) ?? []) {
        if (input.type === StateMachineInputType.Number) found.push({ source: "input", kind: "number", name: input.name, value: Number(input.value) });
        else if (input.type === StateMachineInputType.Boolean) found.push({ source: "input", kind: "boolean", name: input.name, value: Boolean(input.value) });
        else if (input.type === StateMachineInputType.Trigger) found.push({ source: "input", kind: "trigger", name: input.name });
      }
    }
    const vm = rive.viewModelInstance;
    for (const prop of vm?.properties ?? []) {
      const t = String(prop.type);
      if (t === "number") found.push({ source: "vm", kind: "number", name: prop.name, value: vm!.number(prop.name)?.value ?? 0 });
      else if (t === "boolean") found.push({ source: "vm", kind: "boolean", name: prop.name, value: vm!.boolean(prop.name)?.value ?? false });
      else if (t === "trigger") found.push({ source: "vm", kind: "trigger", name: prop.name });
      else if (t === "enumType") {
        const e = vm!.enum(prop.name);
        if (e) found.push({ source: "vm", kind: "enum", name: prop.name, value: e.value, options: e.values });
      }
    }
    return found;
  }, [rive, stateMachine]);

  useEffect(() => {
    if (status !== "ready" || !rive) return;
    rive.resizeDrawingSurfaceToCanvas();
    const found = discover();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing from the external Rive runtime
    setControls(found);
    onReadyRef.current?.(found);
  }, [status, rive, discover]);

  // Pause when scrolled offscreen to save CPU; resume when back (unless the user paused).
  useEffect(() => {
    if (!rive || status !== "ready" || reduce) return;
    if (visible && !paused) rive.play();
    else rive.pause();
  }, [visible, paused, rive, status, reduce]);

  const setValue = useCallback(
    (name: string, value: number | boolean | string) => {
      if (!rive) return false;
      const input = stateMachine ? rive.stateMachineInputs(stateMachine)?.find((i) => i.name === name) : undefined;
      if (input && input.type !== StateMachineInputType.Trigger) {
        input.value = value as number | boolean;
      } else {
        const vm = rive.viewModelInstance;
        if (!vm) return false;
        if (typeof value === "number" && vm.number(name)) vm.number(name)!.value = value;
        else if (typeof value === "boolean" && vm.boolean(name)) vm.boolean(name)!.value = value;
        else if (typeof value === "string" && vm.enum(name)) vm.enum(name)!.value = value;
        else return false;
      }
      setControls((cs) => cs.map((c) => (c.name === name && "value" in c ? ({ ...c, value } as RiveControl) : c)));
      if (reduce || paused) rive.play();
      return true;
    },
    [rive, stateMachine, reduce, paused],
  );

  const fire = useCallback(
    (name: string) => {
      if (!rive) return false;
      const input = stateMachine ? rive.stateMachineInputs(stateMachine)?.find((i) => i.name === name) : undefined;
      if (input?.type === StateMachineInputType.Trigger) input.fire();
      else {
        const t = rive.viewModelInstance?.trigger(name);
        if (!t) return false;
        t.trigger();
      }
      if (reduce || paused) rive.play();
      return true;
    },
    [rive, stateMachine, reduce, paused],
  );

  useImperativeHandle(
    handleRef,
    () => ({
      setNumber: (n, v) => setValue(n, v),
      setBoolean: (n, v) => setValue(n, v),
      fire,
      has: (n) => controls.some((c) => c.name === n),
    }),
    [setValue, fire, controls],
  );

  return (
    <div className={cn("flex flex-col", className)}>
      <div ref={box} className={cn("relative min-h-0 flex-1", canvasClassName)}>
        {near && status !== "error" && <RiveComponent role="img" aria-label={label} className="absolute inset-0 h-full w-full" />}
        {status !== "ready" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center text-sm text-muted">
            {status === "error" ? (
              <>
                <span>This animation couldn&apos;t load here.</span>
                {fallbackHref && (
                  <a className="underline underline-offset-4 hover:text-violet" href={fallbackHref} target="_blank" rel="noopener noreferrer">
                    Open the standalone demo ↗
                  </a>
                )}
              </>
            ) : (
              <span className="h-8 w-8 animate-spin rounded-full border-2 border-line border-t-violet" aria-label="Loading animation" />
            )}
          </div>
        )}
      </div>

      {showControls && status === "ready" && (
        <div className="mt-4 space-y-3" aria-label={`${label} controls`} role="group">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              className="chip min-h-11 px-4 hover:border-ink"
              aria-pressed={paused}
            >
              {paused ? "▶ Play" : "❚❚ Pause"}
            </button>
            {controls
              .filter((c) => c.kind === "trigger")
              .map((c) => (
                <button key={c.name} type="button" className="chip min-h-11 px-4 hover:border-violet hover:text-violet" onClick={() => fire(c.name)}>
                  {c.name}
                </button>
              ))}
            {controls
              .filter((c): c is Extract<RiveControl, { kind: "boolean" }> => c.kind === "boolean")
              .map((c) => (
                <button
                  key={c.name}
                  type="button"
                  aria-pressed={c.value}
                  className={cn("chip min-h-11 px-4", c.value && "border-violet bg-violet text-white")}
                  onClick={() => setValue(c.name, !c.value)}
                >
                  {c.name}: {c.value ? "on" : "off"}
                </button>
              ))}
          </div>
          {controls.map((c) => {
            if (c.kind === "enum")
              return (
                <label key={c.name} className="flex items-center gap-3 text-sm">
                  <span className="w-28 shrink-0 font-mono text-xs text-muted">{c.name}</span>
                  <select
                    className="min-h-11 flex-1 rounded-sm border border-line bg-surface px-3"
                    value={c.value}
                    onChange={(e) => setValue(c.name, e.target.value)}
                  >
                    {c.options.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </label>
              );
            if (c.kind !== "number") return null;
            const labels = hints?.numberLabels?.[c.name];
            if (labels)
              return (
                <div key={c.name} className="flex flex-wrap gap-2" role="radiogroup" aria-label={c.name}>
                  {labels.map((l, i) => (
                    <button
                      key={l}
                      type="button"
                      role="radio"
                      aria-checked={c.value === i}
                      className={cn("chip min-h-11 px-4", c.value === i && "border-ink bg-ink text-bg")}
                      onClick={() => setValue(c.name, i)}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              );
            const [min, max, step] = hints?.numberRanges?.[c.name] ?? [0, 100, 1];
            return (
              <label key={c.name} className="flex items-center gap-3 text-sm">
                <span className="w-28 shrink-0 font-mono text-xs text-muted">{c.name}</span>
                <input
                  type="range"
                  min={min}
                  max={max}
                  step={step}
                  value={c.value}
                  onChange={(e) => setValue(c.name, Number(e.target.value))}
                  className="h-11 flex-1 accent-violet"
                />
                <output className="w-12 text-right font-mono text-xs">{c.value.toFixed(step < 1 ? 2 : 0)}</output>
              </label>
            );
          })}
          {controls.length === 0 && <p className="text-xs text-muted">This file has no exposed inputs — it plays on its own.</p>}
        </div>
      )}
    </div>
  );
}

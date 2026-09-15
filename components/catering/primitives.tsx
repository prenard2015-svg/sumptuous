"use client"

import { Minus, Plus, Check } from "lucide-react"
import { cn } from "@/lib/utils"

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-xs font-medium uppercase tracking-[0.22em] text-gold/80">
      {children}
    </span>
  )
}

export function Badge({
  children,
  variant = "gold",
}: {
  children: React.ReactNode
  variant?: "gold" | "muted"
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-[0.7rem] font-medium tracking-wide",
        variant === "gold"
          ? "bg-gold/15 text-gold ring-1 ring-inset ring-gold/30"
          : "bg-white/5 text-cream/70 ring-1 ring-inset ring-white/10",
      )}
    >
      {children}
    </span>
  )
}

export function Chip({
  label,
  active,
  onClick,
  size = "default",
}: {
  label: string
  active: boolean
  onClick: () => void
  size?: "default" | "sm"
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border transition-all",
        size === "sm" ? "px-3 py-1 text-xs" : "px-3.5 py-1.5 text-sm",
        active
          ? "border-gold/60 bg-gold/15 text-gold"
          : "border-white/12 bg-white/[0.03] text-cream/70 hover:border-white/25 hover:text-cream",
      )}
    >
      {active && <Check className="size-3" aria-hidden />}
      {label}
    </button>
  )
}

export function GuestCounter({
  value,
  onChange,
  error,
}: {
  value: number
  onChange: (n: number) => void
  error?: string | null
}) {
  return (
    <div>
      <div
        className={cn(
          "inline-flex items-center gap-1 rounded-full border bg-white/[0.03] p-1",
          error ? "border-destructive/60" : "border-white/12",
        )}
      >
        <button
          type="button"
          aria-label="Decrease guest count"
          onClick={() => onChange(value - 1)}
          className="grid size-9 place-items-center rounded-full text-cream/80 transition-colors hover:bg-white/8 hover:text-gold"
        >
          <Minus className="size-4" aria-hidden />
        </button>
        <input
          type="number"
          aria-label="Guest count"
          value={Number.isFinite(value) ? value : ""}
          onChange={(e) => {
            const raw = e.target.value
            onChange(raw === "" ? Number.NaN : Number.parseInt(raw, 10))
          }}
          className="w-16 bg-transparent text-center text-lg font-semibold text-cream tabular-nums outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
        <button
          type="button"
          aria-label="Increase guest count"
          onClick={() => onChange((Number.isFinite(value) ? value : 0) + 1)}
          className="grid size-9 place-items-center rounded-full text-cream/80 transition-colors hover:bg-white/8 hover:text-gold"
        >
          <Plus className="size-4" aria-hidden />
        </button>
      </div>
      {error && (
        <p className="mt-1.5 text-xs text-destructive" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

export function Field({
  label,
  required,
  error,
  children,
  hint,
}: {
  label: string
  required?: boolean
  error?: string | null
  children: React.ReactNode
  hint?: string
}) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center gap-1 text-sm font-medium text-cream/90">
        {label}
        {required && <span className="text-gold">*</span>}
      </span>
      {children}
      {hint && !error && (
        <span className="mt-1 block text-xs text-cream/45">{hint}</span>
      )}
      {error && (
        <span className="mt-1 block text-xs text-destructive" role="alert">
          {error}
        </span>
      )}
    </label>
  )
}

export const inputClass =
  "w-full rounded-xl border border-white/12 bg-white/[0.03] px-3.5 py-2.5 text-sm text-cream placeholder:text-cream/35 outline-none transition-colors focus:border-gold/50 focus:bg-white/[0.05] aria-invalid:border-destructive/60"

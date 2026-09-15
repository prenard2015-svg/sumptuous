"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown, Check } from "lucide-react"
import { OCCASIONS, type OccasionId } from "@/lib/catering-data"
import { cn } from "@/lib/utils"

export function OccasionSwitcher({
  value,
  onChange,
}: {
  value: OccasionId
  onChange: (id: OccasionId) => void
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const current = OCCASIONS.find((o) => o.id === value)

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", onDoc)
    return () => document.removeEventListener("mousedown", onDoc)
  }, [])

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="listbox"
        className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-4 py-2 text-sm text-cream transition-colors hover:border-gold/40"
      >
        <span className="text-cream/50">Planning:</span>
        <span className="font-medium">{current?.name}</span>
        <ChevronDown
          className={cn("size-4 text-cream/50 transition-transform", open && "rotate-180")}
          aria-hidden
        />
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute right-0 z-30 mt-2 w-60 overflow-hidden rounded-2xl border border-white/12 bg-panel p-1.5 shadow-2xl"
        >
          {OCCASIONS.map((o) => (
            <li key={o.id}>
              <button
                type="button"
                role="option"
                aria-selected={o.id === value}
                onClick={() => {
                  onChange(o.id)
                  setOpen(false)
                }}
                className={cn(
                  "flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2 text-left text-sm transition-colors",
                  o.id === value
                    ? "bg-gold/12 text-gold"
                    : "text-cream/80 hover:bg-white/5",
                )}
              >
                {o.name}
                {o.id === value && <Check className="size-4" aria-hidden />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

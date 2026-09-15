"use client"

import { useState } from "react"
import { ArrowRight, Check, Heart, Building2, Utensils, CalendarDays } from "lucide-react"
import { Button } from "@/components/ui/button"
import { OCCASIONS, type OccasionId } from "@/lib/catering-data"
import { useStore } from "@/lib/store"
import { SectionLabel } from "@/components/catering/primitives"
import { cn } from "@/lib/utils"

const ICONS: Record<OccasionId, typeof Heart> = {
  wedding: Heart,
  corporate: Building2,
  intimate: Utensils,
  weekly: CalendarDays,
}

export function OccasionPicker() {
  const { quote, update, setScreen } = useStore()
  const [selected, setSelected] = useState<OccasionId | null>(quote.occasionId)
  const [error, setError] = useState(false)

  function handleContinue() {
    if (!selected) {
      setError(true)
      return
    }
    const occasion = OCCASIONS.find((o) => o.id === selected)
    update({
      occasionId: selected,
      activeCategory: occasion?.categories[0] ?? null,
    })
    setScreen("showcase")
  }

  return (
    <main className="mx-auto flex min-h-svh w-full max-w-5xl flex-col justify-center px-5 py-14 sm:py-20">
      <header className="mb-10 text-center">
        <SectionLabel>Sumptuous Catering & Events · feel fine dining</SectionLabel>
        <h1 className="mt-4 text-balance text-4xl font-semibold leading-tight text-cream sm:text-5xl">
          What are we cooking toward?
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-pretty text-cream/60">
          Choose the planning moment that fits you. We&apos;ll shape the menu,
          service, and the next conversation with the chef around it.
        </p>
      </header>

      <ul className="grid gap-4 sm:grid-cols-2">
        {OCCASIONS.map((occasion) => {
          const Icon = ICONS[occasion.id]
          const isActive = selected === occasion.id
          return (
            <li key={occasion.id}>
              <button
                type="button"
                onClick={() => {
                  setSelected(occasion.id)
                  setError(false)
                }}
                aria-pressed={isActive}
                className={cn(
                  "group relative flex h-full w-full flex-col items-start gap-3 rounded-2xl border p-6 text-left transition-all",
                  isActive
                    ? "border-gold/60 bg-gold/[0.07] shadow-[0_0_0_1px_rgba(200,160,80,0.25),0_18px_40px_-24px_rgba(200,160,80,0.5)]"
                    : "border-white/10 bg-white/[0.02] hover:border-white/25 hover:bg-white/[0.04]",
                )}
              >
                <div className="flex w-full items-center justify-between">
                  <span
                    className={cn(
                      "grid size-11 place-items-center rounded-full transition-colors",
                      isActive
                        ? "bg-gold/20 text-gold"
                        : "bg-white/5 text-cream/70 group-hover:text-cream",
                    )}
                  >
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <span
                    className={cn(
                      "grid size-6 place-items-center rounded-full border transition-all",
                      isActive
                        ? "border-gold bg-gold text-charcoal"
                        : "border-white/20 text-transparent",
                    )}
                    aria-hidden
                  >
                    <Check className="size-3.5" />
                  </span>
                </div>
                <h2 className="text-xl font-semibold text-cream">
                  {occasion.name}
                </h2>
                <p className="text-sm leading-relaxed text-cream/55">
                  {occasion.concern}
                </p>
              </button>
            </li>
          )
        })}
      </ul>

      <div className="mt-10 flex flex-col items-center gap-3">
        <Button
          size="lg"
          onClick={handleContinue}
          disabled={!selected}
          className="h-12 w-full max-w-xs gap-2 rounded-full text-base sm:w-auto sm:px-10"
        >
          Continue
          <ArrowRight className="size-4" aria-hidden />
        </Button>
        {error && (
          <p className="text-sm text-destructive" role="alert">
            Pick a planning moment first so we can tailor the menu.
          </p>
        )}
        {!selected && !error && (
          <p className="text-xs text-cream/40">
            Select an occasion to begin.
          </p>
        )}
      </div>
    </main>
  )
}

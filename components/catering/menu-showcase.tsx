"use client"

import { useMemo } from "react"
import { Sparkles, Users, Utensils } from "lucide-react"
import {
  OCCASIONS,
  CATEGORIES,
  PACKAGES,
  DIETARY_TAGS,
  type CategoryId,
  type OccasionId,
} from "@/lib/catering-data"
import { useStore } from "@/lib/store"
import { OccasionSwitcher } from "@/components/catering/occasion-switcher"
import { PackageCard } from "@/components/catering/package-card"
import {
  SectionLabel,
  Chip,
  GuestCounter,
} from "@/components/catering/primitives"
import { validateGuestCount } from "@/lib/validation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function MenuShowcase() {
  const { quote, update, setScreen } = useStore()
  const occasion = OCCASIONS.find((o) => o.id === quote.occasionId)

  const availableCategories = useMemo(
    () =>
      CATEGORIES.filter((c) => occasion?.categories.includes(c.id)),
    [occasion],
  )

  const activeCategory = quote.activeCategory ?? availableCategories[0]?.id

  const visiblePackages = useMemo(() => {
    return PACKAGES.filter((p) => p.category === activeCategory).filter((p) => {
      if (quote.dietaryFilters.length === 0) return true
      return quote.dietaryFilters.every((d) => p.dietaryOptions.includes(d))
    })
  }, [activeCategory, quote.dietaryFilters])

  const guestError = validateGuestCount(quote.guestCount)

  function switchOccasion(id: OccasionId) {
    const next = OCCASIONS.find((o) => o.id === id)
    const nextCategory =
      next && next.categories.includes(activeCategory as CategoryId)
        ? activeCategory
        : next?.categories[0]
    update({ occasionId: id, activeCategory: nextCategory ?? null })
  }

  function toggleDietary(tag: string) {
    update({
      dietaryFilters: quote.dietaryFilters.includes(tag)
        ? quote.dietaryFilters.filter((d) => d !== tag)
        : [...quote.dietaryFilters, tag],
    })
  }

  if (!occasion) return null

  return (
    <main className="mx-auto w-full max-w-6xl px-5 py-8 sm:py-12">
      {/* Occasion header */}
      <header className="flex flex-col gap-6 border-b border-white/8 pb-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-2xl">
            <SectionLabel>{occasion.name}</SectionLabel>
            <h1 className="mt-3 text-balance text-3xl font-semibold leading-tight text-cream sm:text-4xl">
              {occasion.headline}
            </h1>
            <p className="mt-3 text-pretty leading-relaxed text-cream/60">
              {occasion.message}
            </p>
          </div>
          <OccasionSwitcher value={occasion.id} onChange={switchOccasion} />
        </div>
        <div className="flex items-start gap-2.5 rounded-xl border border-gold/15 bg-gold/[0.04] px-4 py-3 text-sm text-cream/70">
          <Sparkles className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden />
          <span>
            <span className="text-cream/90">What we&apos;ll focus on:</span>{" "}
            {occasion.concern}
          </span>
        </div>
      </header>

      {/* Preferences strip */}
      <section className="mt-8 grid gap-5 rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:grid-cols-[auto_1fr] sm:items-center sm:gap-8">
        <div className="flex items-center gap-4">
          <span className="grid size-10 place-items-center rounded-full bg-white/5 text-gold">
            <Users className="size-5" aria-hidden />
          </span>
          <div>
            <p className="text-sm font-medium text-cream">Guest count</p>
            <p className="text-xs text-cream/45">Adjusts your pricing guidance</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-4 sm:justify-end">
          <GuestCounter
            value={quote.guestCount}
            onChange={(n) => update({ guestCount: n })}
            error={guestError}
          />
          <Button
            variant="outline"
            className="h-11 gap-2 rounded-full border-gold/40 px-5 text-gold hover:bg-gold/10 hover:text-gold"
            onClick={() => {
              update({ selectedPackageId: null })
              setScreen("summary")
            }}
          >
            <Utensils className="size-4" aria-hidden />
            Design a custom menu
          </Button>
        </div>
      </section>

      {/* Category tabs */}
      <nav
        className="mt-8 flex flex-wrap gap-2"
        aria-label="Menu categories"
      >
        {availableCategories.map((cat) => {
          const isActive = cat.id === activeCategory
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => update({ activeCategory: cat.id })}
              aria-current={isActive}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-all",
                isActive
                  ? "bg-gold text-charcoal"
                  : "border border-white/12 bg-white/[0.03] text-cream/70 hover:border-white/25 hover:text-cream",
              )}
            >
              {cat.label}
            </button>
          )
        })}
      </nav>

      {/* Dietary filters */}
      <div className="mt-5 flex flex-wrap items-center gap-2">
        <span className="mr-1 text-xs font-medium uppercase tracking-wider text-cream/40">
          Dietary
        </span>
        {DIETARY_TAGS.map((tag) => (
          <Chip
            key={tag}
            label={tag}
            size="sm"
            active={quote.dietaryFilters.includes(tag)}
            onClick={() => toggleDietary(tag)}
          />
        ))}
        {quote.dietaryFilters.length > 0 && (
          <button
            type="button"
            onClick={() => update({ dietaryFilters: [] })}
            className="ml-1 text-xs text-cream/50 underline underline-offset-4 hover:text-gold"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Package grid or empty state */}
      {visiblePackages.length > 0 ? (
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visiblePackages.map((pkg) => (
            <li key={pkg.id}>
              <PackageCard
                pkg={pkg}
                onOpen={() => {
                  update({ selectedPackageId: pkg.id })
                  setScreen("detail")
                }}
              />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-8 flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-white/[0.02] px-6 py-16 text-center">
          <p className="text-lg font-medium text-cream">
            No package matches these filters
          </p>
          <p className="mt-2 max-w-sm text-sm text-cream/55">
            We can still tailor something for {occasion.name.toLowerCase()}. Clear
            a filter or design a custom menu with the chef.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button
              variant="outline"
              className="rounded-full border-white/20"
              onClick={() => update({ dietaryFilters: [] })}
            >
              Clear filters
            </Button>
            <Button
              className="rounded-full"
              onClick={() => {
                update({ selectedPackageId: null })
                setScreen("summary")
              }}
            >
              Design a custom menu
            </Button>
          </div>
        </div>
      )}
    </main>
  )
}

"use client"

import { useEffect, useState } from "react"
import { ArrowLeft, Check, Clock, Utensils, ArrowRight } from "lucide-react"
import {
  PACKAGES,
  SERVICE_STYLES,
  formatStartingPrice,
  priceUnitLabel,
} from "@/lib/catering-data"
import { useStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import {
  SectionLabel,
  Badge,
  Chip,
  GuestCounter,
} from "@/components/catering/primitives"
import { validateGuestCount } from "@/lib/validation"

export function PackageDetail() {
  const { quote, update, setScreen } = useStore()
  const [loading, setLoading] = useState(true)
  const pkg = PACKAGES.find((p) => p.id === quote.selectedPackageId)

  useEffect(() => {
    setLoading(true)
    const t = setTimeout(() => setLoading(false), 450)
    return () => clearTimeout(t)
  }, [quote.selectedPackageId])

  if (loading) {
    return (
      <main className="mx-auto w-full max-w-5xl px-5 py-10">
        <div className="animate-pulse space-y-6">
          <div className="h-4 w-32 rounded bg-white/10" />
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="aspect-[4/3] rounded-2xl bg-white/10" />
            <div className="space-y-4">
              <div className="h-8 w-2/3 rounded bg-white/10" />
              <div className="h-4 w-full rounded bg-white/10" />
              <div className="h-4 w-5/6 rounded bg-white/10" />
              <div className="h-24 rounded bg-white/10" />
            </div>
          </div>
        </div>
      </main>
    )
  }

  if (!pkg) {
    return (
      <main className="mx-auto flex min-h-[60svh] w-full max-w-2xl flex-col items-center justify-center px-5 text-center">
        <h1 className="text-2xl font-semibold text-cream">
          We couldn&apos;t open that package
        </h1>
        <p className="mt-2 text-cream/55">
          It may have been cleared from this session. Head back to the showcase
          to keep browsing.
        </p>
        <Button
          className="mt-6 rounded-full"
          onClick={() => setScreen("showcase")}
        >
          Back to showcase
        </Button>
      </main>
    )
  }

  const guestError = validateGuestCount(quote.guestCount)
  const serviceStyle = quote.serviceStyle || pkg.serviceNotes[0]

  function toggleDietaryNeed(tag: string) {
    update({
      dietaryNeeds: quote.dietaryNeeds.includes(tag)
        ? quote.dietaryNeeds.filter((d) => d !== tag)
        : [...quote.dietaryNeeds, tag],
    })
  }

  return (
    <main className="mx-auto w-full max-w-5xl px-5 py-8 sm:py-10">
      <button
        type="button"
        onClick={() => setScreen("showcase")}
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-cream/60 transition-colors hover:text-gold"
      >
        <ArrowLeft className="size-4" aria-hidden />
        Back to menu
      </button>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="relative overflow-hidden rounded-2xl border border-white/10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={pkg.image || "/placeholder.svg"}
            alt={pkg.title}
            className="aspect-[4/3] size-full object-cover"
          />
          {pkg.badge && (
            <div className="absolute left-4 top-4">
              <Badge>{pkg.badge}</Badge>
            </div>
          )}
        </div>

        <div>
          <SectionLabel>{pkg.title.length > 40 ? "Signature package" : "Package"}</SectionLabel>
          <h1 className="mt-3 text-balance text-2xl font-semibold leading-tight text-cream sm:text-3xl">
            {pkg.title}
          </h1>
          <p className="mt-3 leading-relaxed text-cream/60">{pkg.description}</p>

          <div className="mt-5 flex items-baseline gap-2">
            <span className="font-serif text-3xl text-gold">
              {pkg.startingPrice != null ? `From $${pkg.startingPrice}` : "Custom quote"}
            </span>
            {pkg.startingPrice != null && (
              <span className="text-sm text-cream/50">
                {pkg.priceUnit === "package"
                  ? priceUnitLabel(pkg.priceUnit)
                  : priceUnitLabel(pkg.priceUnit)}
              </span>
            )}
          </div>
          <p className="mt-1 text-xs text-cream/40">
            Starting guidance only — your final quote reflects guest count and
            customization.
          </p>

          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-cream/70">
            {pkg.courseCount != null && (
              <span className="inline-flex items-center gap-1.5">
                <Utensils className="size-4 text-gold" aria-hidden />
                {pkg.courseCount} courses
              </span>
            )}
            <span className="inline-flex items-center gap-1.5">
              <Clock className="size-4 text-gold" aria-hidden />
              {pkg.serviceNotes[0]}
            </span>
          </div>
        </div>
      </div>

      {/* Inclusions & service */}
      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gold/80">
            What&apos;s included
          </h2>
          <ul className="mt-4 space-y-2.5">
            {pkg.inclusions.map((inc) => (
              <li key={inc} className="flex items-start gap-2.5 text-sm text-cream/80">
                <Check className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden />
                {inc}
              </li>
            ))}
          </ul>
        </section>
        <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gold/80">
            Service details
          </h2>
          <ul className="mt-4 space-y-2.5">
            {pkg.serviceNotes.map((note) => (
              <li key={note} className="flex items-start gap-2.5 text-sm text-cream/80">
                <Check className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden />
                {note}
              </li>
            ))}
          </ul>
          {pkg.presentationNote ? (
            <p className="mt-4 border-t border-white/8 pt-4 text-sm italic text-cream/55">
              {pkg.presentationNote}
            </p>
          ) : (
            <p className="mt-4 border-t border-white/8 pt-4 text-sm text-cream/40">
              Presentation styled to your occasion.
            </p>
          )}
        </section>
      </div>

      {/* Customization */}
      <section className="mt-8 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
        <h2 className="text-lg font-semibold text-cream">Tailor this package</h2>
        <p className="mt-1 text-sm text-cream/50">
          Adjust the essentials now — you can refine everything on the next step.
        </p>

        <div className="mt-6 grid gap-8 md:grid-cols-2">
          <div>
            <p className="mb-2.5 text-sm font-medium text-cream/90">Guest count</p>
            <GuestCounter
              value={quote.guestCount}
              onChange={(n) => update({ guestCount: n })}
              error={guestError}
            />
          </div>

          {pkg.courseCount != null && (
            <div>
              <p className="mb-2.5 text-sm font-medium text-cream/90">
                Course count
              </p>
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: Math.max(3, pkg.courseCount) }, (_, i) => i + 2)
                  .filter((n) => n >= 2)
                  .slice(0, 6)
                  .map((n) => (
                    <Chip
                      key={n}
                      label={`${n} courses`}
                      size="sm"
                      active={(quote.courseCount ?? pkg.courseCount) === n}
                      onClick={() => update({ courseCount: n })}
                    />
                  ))}
              </div>
            </div>
          )}

          <div className="md:col-span-2">
            <p className="mb-2.5 text-sm font-medium text-cream/90">
              Service style
            </p>
            <div className="flex flex-wrap gap-2">
              {SERVICE_STYLES.map((style) => (
                <Chip
                  key={style}
                  label={style}
                  size="sm"
                  active={serviceStyle === style}
                  onClick={() => update({ serviceStyle: style })}
                />
              ))}
            </div>
          </div>

          <div className="md:col-span-2">
            <p className="mb-2.5 text-sm font-medium text-cream/90">
              Dietary needs
              {pkg.dietaryOptions.length === 0 && (
                <span className="ml-2 text-xs font-normal text-cream/40">
                  (tell the chef in your message)
                </span>
              )}
            </p>
            <div className="flex flex-wrap gap-2">
              {(pkg.dietaryOptions.length > 0
                ? pkg.dietaryOptions
                : ["Vegetarian", "Vegan", "Gluten-Free", "Nut-Free"]
              ).map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  size="sm"
                  active={quote.dietaryNeeds.includes(tag)}
                  onClick={() => toggleDietaryNeed(tag)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
        <Button
          variant="outline"
          className="rounded-full border-white/20"
          onClick={() => setScreen("showcase")}
        >
          Keep browsing
        </Button>
        <Button
          size="lg"
          className="gap-2 rounded-full"
          onClick={() => {
            if (!quote.serviceStyle) update({ serviceStyle })
            if (pkg.courseCount != null && quote.courseCount == null)
              update({ courseCount: pkg.courseCount })
            setScreen("summary")
          }}
        >
          Request quote for this package
          <ArrowRight className="size-4" aria-hidden />
        </Button>
      </div>
    </main>
  )
}

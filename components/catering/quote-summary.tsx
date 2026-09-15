"use client"

import { useMemo, useState } from "react"
import { ArrowLeft, ArrowRight, Check, Users } from "lucide-react"
import {
  OCCASIONS,
  PACKAGES,
  SERVICE_STYLES,
  BUDGET_COMFORT,
  DIETARY_TAGS,
  formatStartingPrice,
} from "@/lib/catering-data"
import { useStore } from "@/lib/store"
import { validateQuote, validateGuestCount } from "@/lib/validation"
import { buildChefMessage } from "@/lib/message"
import { Button } from "@/components/ui/button"
import {
  SectionLabel,
  Field,
  Chip,
  GuestCounter,
  inputClass,
} from "@/components/catering/primitives"
import { cn } from "@/lib/utils"

export function QuoteSummary() {
  const { quote, update, setScreen } = useStore()
  const [submitted, setSubmitted] = useState(false)
  const [savedCue, setSavedCue] = useState(false)

  const occasion = OCCASIONS.find((o) => o.id === quote.occasionId)
  const pkg = PACKAGES.find((p) => p.id === quote.selectedPackageId)
  const errors = validateQuote(quote)
  const guestError = validateGuestCount(quote.guestCount)

  const flashSaved = useMemo(
    () => () => {
      setSavedCue(true)
      setTimeout(() => setSavedCue(false), 1200)
    },
    [],
  )

  function toggleDietaryNeed(tag: string) {
    update({
      dietaryNeeds: quote.dietaryNeeds.includes(tag)
        ? quote.dietaryNeeds.filter((d) => d !== tag)
        : [...quote.dietaryNeeds, tag],
    })
  }

  function handleContinue() {
    setSubmitted(true)
    if (Object.keys(errors).length > 0) {
      const first = document.querySelector<HTMLElement>("[data-error='true']")
      first?.scrollIntoView({ behavior: "smooth", block: "center" })
      return
    }
    if (!quote.message.trim()) {
      update({ message: buildChefMessage(quote) })
    }
    setScreen("handoff")
  }

  if (!occasion) return null

  return (
    <main className="mx-auto w-full max-w-3xl px-5 py-8 sm:py-10">
      <button
        type="button"
        onClick={() => setScreen(pkg ? "detail" : "showcase")}
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-cream/60 transition-colors hover:text-gold"
      >
        <ArrowLeft className="size-4" aria-hidden />
        Back
      </button>

      <header className="mb-8">
        <SectionLabel>Prepare your inquiry</SectionLabel>
        <h1 className="mt-3 text-balance text-3xl font-semibold leading-tight text-cream">
          Review your quote request
        </h1>
        <p className="mt-3 text-pretty leading-relaxed text-cream/60">
          Tell the chef what matters most, and we&apos;ll shape the next
          conversation around it. Complete the essentials marked with a gold dot.
        </p>
      </header>

      {/* Selection recap */}
      <div className="mb-8 grid gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:grid-cols-2">
        <RecapRow label="Occasion" value={occasion.name} />
        <RecapRow
          label="Package"
          value={pkg ? pkg.title : "Custom menu"}
        />
        <RecapRow
          label="Starting from"
          value={pkg ? formatStartingPrice(pkg) : "Priced per request"}
        />
        <RecapRow
          label="Guests"
          value={Number.isFinite(quote.guestCount) ? `${quote.guestCount}` : "—"}
        />
      </div>

      {savedCue && (
        <div className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-gold/12 px-3 py-1 text-xs text-gold">
          <Check className="size-3.5" aria-hidden />
          Saved
        </div>
      )}

      <div className="space-y-6">
        <div className="grid gap-5 sm:grid-cols-2">
          <div data-error={submitted && !!errors.date}>
            <Field label="Preferred date" required error={submitted ? errors.date : null}>
              <input
                type="date"
                className={inputClass}
                value={quote.date}
                aria-invalid={submitted && !!errors.date}
                onChange={(e) => update({ date: e.target.value })}
                onBlur={flashSaved}
              />
            </Field>
          </div>
          <div data-error={submitted && !!errors.location}>
            <Field
              label="Location or venue"
              required
              error={submitted ? errors.location : null}
            >
              <input
                type="text"
                placeholder="e.g. Rooftop, 12 Vine St"
                className={inputClass}
                value={quote.location}
                aria-invalid={submitted && !!errors.location}
                onChange={(e) => update({ location: e.target.value })}
                onBlur={flashSaved}
              />
            </Field>
          </div>
        </div>

        <div data-error={submitted && !!errors.guestCount}>
          <Field
            label="Guest count"
            required
            error={submitted ? errors.guestCount : null}
          >
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-full bg-white/5 text-gold">
                <Users className="size-5" aria-hidden />
              </span>
              <GuestCounter
                value={quote.guestCount}
                onChange={(n) => update({ guestCount: n })}
                error={submitted ? guestError : null}
              />
            </div>
          </Field>
        </div>

        <div data-error={submitted && !!errors.serviceStyle}>
          <Field
            label="Service style"
            required
            error={submitted ? errors.serviceStyle : null}
          >
            <div className="flex flex-wrap gap-2">
              {SERVICE_STYLES.map((style) => (
                <Chip
                  key={style}
                  label={style}
                  active={quote.serviceStyle === style}
                  onClick={() => {
                    update({ serviceStyle: style })
                    flashSaved()
                  }}
                />
              ))}
            </div>
          </Field>
        </div>

        <Field label="Dietary needs" hint="Select any that apply to your guests">
          <div className="flex flex-wrap gap-2">
            {DIETARY_TAGS.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                active={quote.dietaryNeeds.includes(tag)}
                onClick={() => toggleDietaryNeed(tag)}
              />
            ))}
          </div>
        </Field>

        <Field
          label="Menu substitutions"
          hint="Anything to swap, avoid, or feature"
        >
          <input
            type="text"
            placeholder="e.g. swap beef main for a seafood option"
            className={inputClass}
            value={quote.substitutions}
            onChange={(e) => update({ substitutions: e.target.value })}
            onBlur={flashSaved}
          />
        </Field>

        <Field label="Budget comfort">
          <div className="flex flex-wrap gap-2">
            {BUDGET_COMFORT.map((b) => (
              <Chip
                key={b}
                label={b}
                active={quote.budgetComfort === b}
                onClick={() => {
                  update({ budgetComfort: b })
                  flashSaved()
                }}
              />
            ))}
          </div>
        </Field>

        <Field label="Note to the chef" hint="Optional — we can draft this for you next">
          <textarea
            rows={3}
            placeholder="Share the mood, the moment, or anything the chef should know."
            className={cn(inputClass, "resize-y")}
            value={quote.message}
            onChange={(e) => update({ message: e.target.value })}
            onBlur={flashSaved}
          />
        </Field>
      </div>

      {submitted && Object.keys(errors).length > 0 && (
        <p className="mt-6 rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive" role="alert">
          A few essentials still need attention — they&apos;re marked above. Your
          package choices are saved.
        </p>
      )}

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
        <Button
          variant="outline"
          className="rounded-full border-white/20"
          onClick={() => setScreen(pkg ? "detail" : "showcase")}
        >
          Back
        </Button>
        <Button size="lg" className="gap-2 rounded-full" onClick={handleContinue}>
          Prepare chef message
          <ArrowRight className="size-4" aria-hidden />
        </Button>
      </div>
    </main>
  )
}

function RecapRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-start sm:gap-0.5">
      <span className="text-xs uppercase tracking-wider text-cream/40">
        {label}
      </span>
      <span className="text-right text-sm font-medium text-cream sm:text-left">
        {value}
      </span>
    </div>
  )
}

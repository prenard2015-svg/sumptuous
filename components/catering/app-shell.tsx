"use client"

import { ChefHat } from "lucide-react"
import { StoreProvider, useStore } from "@/lib/store"
import { OccasionPicker } from "@/components/catering/occasion-picker"
import { MenuShowcase } from "@/components/catering/menu-showcase"
import { PackageDetail } from "@/components/catering/package-detail"
import { QuoteSummary } from "@/components/catering/quote-summary"
import { ChefHandoff } from "@/components/catering/chef-handoff"

function Screens() {
  const { screen, setScreen, quote } = useStore()

  return (
    <div className="flex min-h-svh flex-col bg-charcoal">
      {screen !== "occasion" && (
        <header className="sticky top-0 z-20 border-b border-white/8 bg-charcoal/85 backdrop-blur">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-3.5">
            <button
              type="button"
              onClick={() => setScreen(quote.occasionId ? "showcase" : "occasion")}
              className="inline-flex items-center gap-2 text-cream transition-opacity hover:opacity-80"
            >
              <span className="grid size-8 place-items-center rounded-full bg-gold/15 text-gold">
                <ChefHat className="size-4" aria-hidden />
              </span>
              <span className="font-serif text-lg font-semibold tracking-wide">
                Atelier
              </span>
            </button>
            <StepIndicator screen={screen} />
          </div>
        </header>
      )}

      <div className="flex-1">
        {screen === "occasion" && <OccasionPicker />}
        {screen === "showcase" && <MenuShowcase />}
        {screen === "detail" && <PackageDetail />}
        {screen === "summary" && <QuoteSummary />}
        {screen === "handoff" && <ChefHandoff />}
      </div>

      <Footer />
    </div>
  )
}

const STEPS: { key: string; label: string }[] = [
  { key: "showcase", label: "Browse" },
  { key: "summary", label: "Details" },
  { key: "handoff", label: "Send" },
]

function StepIndicator({ screen }: { screen: string }) {
  const activeIndex =
    screen === "handoff" ? 2 : screen === "summary" ? 1 : 0
  return (
    <ol className="hidden items-center gap-2 text-xs sm:flex">
      {STEPS.map((step, i) => (
        <li key={step.key} className="flex items-center gap-2">
          <span
            className={
              i <= activeIndex
                ? "font-medium text-gold"
                : "text-cream/40"
            }
          >
            {step.label}
          </span>
          {i < STEPS.length - 1 && (
            <span className="text-cream/20" aria-hidden>
              ·
            </span>
          )}
        </li>
      ))}
    </ol>
  )
}

function Footer() {
  return (
    <footer className="border-t border-white/8 px-5 py-6">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
        <p className="text-xs text-cream/40">
          Atelier — Private Catering & Chef Services. A concept prototype;
          prices and photos are representative.
        </p>
        <div id="ritual-badge-slot" />
      </div>
    </footer>
  )
}

export function AppShell() {
  return (
    <StoreProvider>
      <Screens />
    </StoreProvider>
  )
}

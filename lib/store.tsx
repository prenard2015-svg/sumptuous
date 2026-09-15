"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react"
import type { CategoryId, OccasionId } from "@/lib/catering-data"

export type Screen =
  | "occasion"
  | "showcase"
  | "detail"
  | "summary"
  | "handoff"

export type QuoteState = {
  occasionId: OccasionId | null
  activeCategory: CategoryId | null
  dietaryFilters: string[]
  selectedPackageId: string | null
  guestCount: number
  // customization
  dietaryNeeds: string[]
  substitutions: string
  serviceStyle: string
  courseCount: number | null
  // quote details
  date: string
  location: string
  budgetComfort: string
  message: string
}

const STORAGE_KEY = "atelier-quote-v1"

const defaultState: QuoteState = {
  occasionId: null,
  activeCategory: null,
  dietaryFilters: [],
  selectedPackageId: null,
  guestCount: 40,
  dietaryNeeds: [],
  substitutions: "",
  serviceStyle: "",
  courseCount: null,
  date: "",
  location: "",
  budgetComfort: "",
  message: "",
}

type StoreValue = {
  screen: Screen
  setScreen: (s: Screen) => void
  quote: QuoteState
  update: (patch: Partial<QuoteState>) => void
  reset: () => void
}

const StoreContext = createContext<StoreValue | null>(null)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [screen, setScreen] = useState<Screen>("occasion")
  const [quote, setQuote] = useState<QuoteState>(defaultState)
  const hydrated = useRef(false)

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw)
        if (parsed?.quote) setQuote({ ...defaultState, ...parsed.quote })
        if (parsed?.screen) setScreen(parsed.screen)
      }
    } catch {
      // ignore malformed session data
    }
    hydrated.current = true
  }, [])

  useEffect(() => {
    if (!hydrated.current) return
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ screen, quote }))
    } catch {
      // storage may be unavailable; demo continues in-memory
    }
  }, [screen, quote])

  const update = useCallback((patch: Partial<QuoteState>) => {
    setQuote((prev) => ({ ...prev, ...patch }))
  }, [])

  const reset = useCallback(() => {
    setQuote(defaultState)
    setScreen("occasion")
    try {
      sessionStorage.removeItem(STORAGE_KEY)
    } catch {
      // ignore
    }
  }, [])

  return (
    <StoreContext.Provider value={{ screen, setScreen, quote, update, reset }}>
      {children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error("useStore must be used within StoreProvider")
  return ctx
}

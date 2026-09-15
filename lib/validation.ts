import type { QuoteState } from "@/lib/store"

export function validateGuestCount(value: number): string | null {
  if (!Number.isFinite(value)) return "Enter a guest count"
  if (value <= 0) return "Guest count must be at least 1"
  if (!Number.isInteger(value)) return "Use a whole number of guests"
  if (value > 2000) return "For 2000+ guests, mention it in your message"
  return null
}

export type QuoteErrors = Partial<
  Record<"date" | "location" | "guestCount" | "serviceStyle", string>
>

export function validateQuote(quote: QuoteState): QuoteErrors {
  const errors: QuoteErrors = {}
  const guest = validateGuestCount(quote.guestCount)
  if (guest) errors.guestCount = guest
  if (!quote.date) errors.date = "Add a preferred date"
  if (!quote.location.trim()) errors.location = "Add a location or venue"
  if (!quote.serviceStyle) errors.serviceStyle = "Choose a service style"
  return errors
}

export function isQuoteComplete(quote: QuoteState): boolean {
  return Object.keys(validateQuote(quote)).length === 0
}

import type { QuoteState } from "@/lib/store"
import { OCCASIONS, PACKAGES } from "@/lib/catering-data"

export function buildChefMessage(quote: QuoteState): string {
  const occasion = OCCASIONS.find((o) => o.id === quote.occasionId)
  const pkg = PACKAGES.find((p) => p.id === quote.selectedPackageId)

  const lines: string[] = []
  lines.push(
    `Hi Chef — I'm planning ${
      occasion ? occasion.name.toLowerCase() : "an event"
    } and would love a quote.`,
  )
  lines.push("")
  lines.push(
    `• Package: ${pkg ? pkg.title : "A custom menu"}`,
  )
  if (Number.isFinite(quote.guestCount)) {
    lines.push(`• Guests: ${quote.guestCount}`)
  }
  if (quote.date) lines.push(`• Date: ${quote.date}`)
  if (quote.location) lines.push(`• Location: ${quote.location}`)
  if (quote.serviceStyle) lines.push(`• Service style: ${quote.serviceStyle}`)
  if (quote.courseCount) lines.push(`• Courses: ${quote.courseCount}`)
  if (quote.dietaryNeeds.length > 0) {
    lines.push(`• Dietary needs: ${quote.dietaryNeeds.join(", ")}`)
  }
  if (quote.substitutions.trim()) {
    lines.push(`• Substitutions: ${quote.substitutions.trim()}`)
  }
  if (quote.budgetComfort) lines.push(`• Budget comfort: ${quote.budgetComfort}`)
  lines.push("")
  lines.push("Could you share what a menu like this would look like? Thank you!")

  return lines.join("\n")
}

"use client"

import { Check, ArrowRight } from "lucide-react"
import {
  type Package,
  formatStartingPrice,
} from "@/lib/catering-data"
import { Badge } from "@/components/catering/primitives"

export function PackageCard({
  pkg,
  onOpen,
}: {
  pkg: Package
  onOpen: () => void
}) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] transition-all hover:border-gold/30 hover:bg-white/[0.04]">
      <div className="relative aspect-[4/3] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={pkg.image || "/placeholder.svg"}
          alt={pkg.title}
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent" />
        {pkg.badge && (
          <div className="absolute left-3 top-3">
            <Badge>{pkg.badge}</Badge>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-pretty text-lg font-semibold leading-snug text-cream">
          {pkg.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-cream/55">
          {pkg.description}
        </p>

        <ul className="mt-4 space-y-1.5">
          {pkg.inclusions.slice(0, 3).map((inc) => (
            <li key={inc} className="flex items-start gap-2 text-sm text-cream/70">
              <Check className="mt-0.5 size-3.5 shrink-0 text-gold" aria-hidden />
              {inc}
            </li>
          ))}
        </ul>

        {pkg.dietaryOptions.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {pkg.dietaryOptions.map((d) => (
              <span
                key={d}
                className="rounded-full bg-white/5 px-2 py-0.5 text-[0.68rem] text-cream/55 ring-1 ring-inset ring-white/8"
              >
                {d}
              </span>
            ))}
          </div>
        )}

        <div className="mt-5 flex items-end justify-between gap-3 border-t border-white/8 pt-4">
          <div>
            <span className="block font-serif text-xl text-gold">
              {pkg.startingPrice != null ? `From $${pkg.startingPrice}` : "Custom"}
            </span>
            <span className="text-xs text-cream/45">
              {pkg.startingPrice != null
                ? formatStartingPrice(pkg).replace(`From $${pkg.startingPrice} `, "").replace(`From $${pkg.startingPrice} · `, "")
                : "Priced per request"}
            </span>
          </div>
          <button
            type="button"
            onClick={onOpen}
            className="inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-gold/10 px-4 py-2 text-sm font-medium text-gold transition-colors hover:bg-gold/20"
          >
            View
            <ArrowRight className="size-3.5" aria-hidden />
          </button>
        </div>
      </div>
    </article>
  )
}

"use client"

import { useState } from "react"
import {
  ArrowLeft,
  Check,
  Copy,
  MessageCircle,
  Send,
  Sparkles,
} from "lucide-react"
import { useStore } from "@/lib/store"
import { OCCASIONS, PACKAGES } from "@/lib/catering-data"
import { buildChefMessage } from "@/lib/message"
import { Button } from "@/components/ui/button"
import { SectionLabel, inputClass } from "@/components/catering/primitives"
import { cn } from "@/lib/utils"

type SendState = "idle" | "sending" | "sent" | "fallback"

export function ChefHandoff() {
  const { quote, update, setScreen, reset } = useStore()
  const [state, setState] = useState<SendState>("idle")
  const [copied, setCopied] = useState(false)

  const occasion = OCCASIONS.find((o) => o.id === quote.occasionId)
  const pkg = PACKAGES.find((p) => p.id === quote.selectedPackageId)

  async function copyMessage() {
    try {
      await navigator.clipboard.writeText(quote.message)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      setState("fallback")
    }
  }

  function simulateSend() {
    setState("sending")
    setTimeout(() => {
      // Simulated handoff — no real WhatsApp delivery in this cut.
      setState("sent")
    }, 1400)
  }

  return (
    <main className="mx-auto w-full max-w-2xl px-5 py-8 sm:py-10">
      <button
        type="button"
        onClick={() => setScreen("summary")}
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-cream/60 transition-colors hover:text-gold"
      >
        <ArrowLeft className="size-4" aria-hidden />
        Back to summary
      </button>

      <header className="mb-8">
        <SectionLabel>Chef handoff</SectionLabel>
        <h1 className="mt-3 text-balance text-3xl font-semibold leading-tight text-cream">
          {state === "sent" ? "Your inquiry is ready" : "Review your chef message"}
        </h1>
        <p className="mt-3 text-pretty leading-relaxed text-cream/60">
          {state === "sent"
            ? "Nicely done. Here's the confirmation of what you've prepared for the chef."
            : "This is drafted from your choices. Edit anything, then send it over on WhatsApp."}
        </p>
      </header>

      {state === "sent" ? (
        <SentConfirmation
          occasionName={occasion?.name ?? "your event"}
          packageTitle={pkg ? pkg.title : "Custom menu"}
          onStartOver={() => {
            reset()
          }}
          onEdit={() => setState("idle")}
        />
      ) : (
        <>
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-medium text-cream/90">
                Message to the chef
              </span>
              <button
                type="button"
                onClick={() => update({ message: buildChefMessage(quote) })}
                className="inline-flex items-center gap-1.5 text-xs text-cream/50 transition-colors hover:text-gold"
              >
                <Sparkles className="size-3.5" aria-hidden />
                Redraft for me
              </button>
            </div>
            <textarea
              rows={12}
              value={quote.message}
              onChange={(e) => update({ message: e.target.value })}
              className={cn(inputClass, "resize-y font-mono text-[0.82rem] leading-relaxed")}
              aria-label="Editable chef message"
            />
          </div>

          {state === "fallback" && (
            <p className="mt-4 rounded-xl border border-gold/30 bg-gold/[0.06] px-4 py-3 text-sm text-cream/75">
              WhatsApp couldn&apos;t open here. Copy your inquiry below and paste
              it into WhatsApp to reach the chef.
            </p>
          )}

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button
              variant="outline"
              className="gap-2 rounded-full border-white/20 sm:flex-1"
              onClick={copyMessage}
            >
              {copied ? (
                <>
                  <Check className="size-4" aria-hidden /> Copied
                </>
              ) : (
                <>
                  <Copy className="size-4" aria-hidden /> Copy inquiry
                </>
              )}
            </Button>
            <Button
              size="lg"
              disabled={state === "sending" || !quote.message.trim()}
              className="gap-2 rounded-full bg-[oklch(0.72_0.17_150)] text-white hover:bg-[oklch(0.66_0.17_150)] sm:flex-[2]"
              onClick={simulateSend}
            >
              {state === "sending" ? (
                <>
                  <span className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  Sending…
                </>
              ) : (
                <>
                  <MessageCircle className="size-4" aria-hidden />
                  Send via WhatsApp
                </>
              )}
            </Button>
          </div>
          <p className="mt-3 text-center text-xs text-cream/40">
            This is a simulated handoff for the prototype — no message is actually
            delivered.
          </p>
        </>
      )}
    </main>
  )
}

function SentConfirmation({
  occasionName,
  packageTitle,
  onStartOver,
  onEdit,
}: {
  occasionName: string
  packageTitle: string
  onStartOver: () => void
  onEdit: () => void
}) {
  return (
    <div className="rounded-2xl border border-gold/25 bg-gradient-to-b from-gold/[0.08] to-transparent p-8 text-center">
      <span className="mx-auto grid size-14 place-items-center rounded-full bg-[oklch(0.72_0.17_150)] text-white">
        <Send className="size-6" aria-hidden />
      </span>
      <h2 className="mt-5 text-xl font-semibold text-cream">
        Inquiry prepared for the chef
      </h2>
      <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-cream/60">
        Your request for {packageTitle.toLowerCase().startsWith("custom") ? "a" : "the"}{" "}
        <span className="text-cream/90">{packageTitle}</span> ({occasionName.toLowerCase()})
        is ready. In a live version, the chef would receive this on WhatsApp and
        reply with a tailored quote.
      </p>
      <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
        <Button
          variant="outline"
          className="rounded-full border-white/20"
          onClick={onEdit}
        >
          Edit message
        </Button>
        <Button className="rounded-full" onClick={onStartOver}>
          Start a new inquiry
        </Button>
      </div>
    </div>
  )
}

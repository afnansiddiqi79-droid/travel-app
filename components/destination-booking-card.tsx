import { ArrowRightIcon, CalendarDaysIcon, CheckIcon } from "lucide-react"
import Link from "next/link"

import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { cn } from "cn"
import type { Destination } from "@/lib/types"
import { destinationPrice } from "@/lib/destinations"

const DEFAULT_PERKS = [
  "Free cancellation up to 7 days",
  "Travel insurance included",
  "24/7 customer support",
]

function formatDate(value?: string): string | null {
  if (!value) return null
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  const day = String(date.getDate()).padStart(2, "0")
  const month = String(date.getMonth() + 1).padStart(2, "0")
  return `${month}/${day}/${date.getFullYear()}`
}

export function DestinationBookingCard({
  destination,
  bookNowHref = "#",
  className,
}: {
  destination: Destination
  bookNowHref?: string
  className?: string
}) {
  const price = destinationPrice(destination)
  const departureDate = formatDate(destination.departureDate)
  const perks = destination.perks ?? DEFAULT_PERKS

  return (
    <Card
      className={cn(
        "group/card gap-0 rounded-2xl border-0 bg-neutral-900 py-0 text-white shadow-xl ring-0 shadow-neutral-900/20",
        className
      )}
    >
      <CardContent className="flex flex-col gap-4 p-5">
        <div className="flex flex-col gap-1">
          <p className="text-xs text-neutral-400">Starting from</p>
          {price !== null && (
            <p className="font-serif text-4xl font-bold tracking-tight text-teal-500">
              ${price.toLocaleString()}
            </p>
          )}
          <p className="text-xs text-neutral-400">per person</p>
        </div>

        <Separator className="bg-white/10" />

        {departureDate && (
          <div className="inline-flex items-center justify-between gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-neutral-900">
            {departureDate}
            <CalendarDaysIcon className="size-4 text-neutral-400" />
          </div>
        )}

        <Link
          href={bookNowHref}
          className="group/book inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-teal-600 px-4 text-sm font-semibold text-white shadow-lg shadow-teal-600/25 transition-all hover:bg-teal-500 hover:shadow-teal-500/30 active:translate-y-px"
        >
          Book now
          <ArrowRightIcon className="size-4 transition-transform group-hover/book:translate-x-0.5" />
        </Link>

        <Separator className="bg-white/10" />

        <ul className="flex flex-col gap-3">
          {perks.map((perk) => (
            <li
              key={perk}
              className="flex items-center gap-2.5 text-xs leading-snug text-neutral-300"
            >
              <CheckIcon className="size-3.5 shrink-0 text-teal-500" />
              {perk}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

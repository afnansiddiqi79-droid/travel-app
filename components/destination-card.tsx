/* eslint-disable @next/next/no-img-element */
import {
  ArrowUpRightIcon,
  CalendarDaysIcon,
  MapPinIcon,
  StarIcon,
} from "lucide-react"

import { Card } from "@/components/ui/card"
import { cn } from "cn"
import type { Destination } from "@/lib/types"
import { destinationPrice } from "@/lib/destinations"

function RatingBadge({ rating }: { rating: number }) {
  return (
    <span className="absolute top-2 right-2 z-10 inline-flex h-7 items-center gap-1 rounded-lg bg-white/95 px-2.5 text-sm font-semibold text-neutral-900 shadow-sm">
      {rating.toFixed(1)}
      <StarIcon className="size-3.5 fill-neutral-900 text-neutral-900" />
    </span>
  )
}

export function DestinationCard({
  destination,
  bookNowHref = "#",
  className,
}: {
  destination: Destination
  bookNowHref?: string
  className?: string
}) {
  const price = destinationPrice(destination)

  return (
    <Card
      className={cn(
        "gap-3.5 border-0 bg-transparent py-0 shadow-none ring-0",
        className
      )}
    >
      <div className="relative overflow-hidden rounded-xl">
        {typeof destination.rating === "number" && (
          <RatingBadge rating={destination.rating} />
        )}

        <img
          src={destination.imageUrl}
          alt={destination.name}
          className="aspect-[4/3] w-full rounded-xl object-cover"
          loading="lazy"
        />
      </div>

      <div className="flex flex-col gap-2">
        <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
          <MapPinIcon className="size-3.5" />
          {destination.country}
        </span>

        <div className="flex items-end justify-between gap-2">
          <h3 className="font-heading text-lg leading-snug font-medium text-foreground">
            {destination.name}
          </h3>
          {price !== null && (
            <p className="shrink-0 leading-none">
              <span className="text-lg font-semibold text-foreground">
                ${Math.round(price)}
              </span>
              <span className="text-[0.65rem] text-muted-foreground">
                /Person
              </span>
            </p>
          )}
        </div>

        {destination.duration && (
          <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
            <CalendarDaysIcon className="size-3.5" />
            {destination.duration}
          </span>
        )}

        <a
          href={bookNowHref}
          className="group/book mt-1 inline-flex w-fit items-center gap-1 text-xs font-bold tracking-widest text-cyan-700 uppercase underline underline-offset-4 hover:text-cyan-800"
        >
          Book Now
          <ArrowUpRightIcon className="size-3.5 transition-transform group-hover/book:translate-x-0.5 group-hover/book:-translate-y-0.5" />
        </a>
      </div>
    </Card>
  )
}

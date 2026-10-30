/* eslint-disable @next/next/no-img-element */
import {
  ArrowLeftIcon,
  CalendarDaysIcon,
  MapPinIcon,
  StarIcon,
} from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

import { DestinationBookingCard } from "@/components/destination-booking-card"
import { DestinationHighlights } from "@/components/destination-highlights"
import { DeleteDestinationDialog } from "@/components/delete-destination-dialog"
import { Separator } from "@/components/ui/separator"
import type { Destination } from "@/lib/types"
import { EditDestinationDialog } from "@/components/edit-destination-dialog"

async function getDestination(id: string): Promise<Destination | null> {
  try {
    const res = await fetch(`http://localhost:5000/destination/${id}`, {
      cache: "no-store",
    })

    if (!res.ok) {
      return null
    }

    const data = await res.json()

    if (Array.isArray(data)) {
      return (data[0] as Destination) ?? null
    }

    return (data?.destination ?? data?.data ?? data) as Destination
  } catch (error) {
    console.error("Error fetching destination:", error)
    return null
  }
}

export default async function DestinationDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const destination = await getDestination(id)

  if (!destination) {
    notFound()
  }

  const highlights = destination.highlights ?? []
  const overview = destination.overview ?? destination.description

  return (
    <main className="min-h-svh bg-neutral-50 px-6 py-8 sm:px-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col">
        {/* Top bar */}
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/destinations"
            className="inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900"
          >
            <ArrowLeftIcon className="size-4" />
            Back to Destinations
          </Link>

          <div className="flex items-center gap-2">
            <EditDestinationDialog destination={destination} id={id} />
            <DeleteDestinationDialog id={id} name={destination.name} />
          </div>
        </div>

        {/* Hero image */}
        <div className="mt-4 overflow-hidden rounded-xl ring-1 ring-neutral-200/70">
          <img
            src={destination.imageUrl}
            alt={destination.name}
            className="aspect-[16/8] w-full bg-neutral-200 object-cover"
            loading="lazy"
          />
        </div>

        {/* Details */}
        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_18rem]">
          <div className="flex flex-col gap-6">
            <header className="flex flex-col gap-2">
              <span className="inline-flex w-fit items-center gap-1.5 text-xs text-neutral-500">
                <MapPinIcon className="size-3.5" />
                {destination.country}
              </span>

              <h1 className="font-heading text-3xl font-medium tracking-tight text-neutral-900 sm:text-4xl">
                {destination.name}
              </h1>

              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
                {typeof destination.rating === "number" && (
                  <>
                    <StarIcon className="size-4 fill-emerald-600 text-emerald-600" />
                    <span className="font-semibold text-neutral-900">
                      {destination.rating.toFixed(1)}
                    </span>
                    {destination.reviewsCount != null && (
                      <span className="text-neutral-500">
                        ({destination.reviewsCount} reviews)
                      </span>
                    )}
                  </>
                )}

                {destination.duration && (
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-900">
                    <CalendarDaysIcon className="size-3.5" />
                    {destination.duration}
                  </span>
                )}
              </div>
            </header>

            {overview && (
              <section className="flex flex-col gap-2">
                <h2 className="font-heading text-xl text-neutral-900">
                  Overview
                </h2>
                <p className="max-w-2xl text-sm leading-relaxed text-neutral-600">
                  {overview}
                </p>
              </section>
            )}

            {highlights.length > 0 && (
              <section className="flex flex-col gap-3">
                <h2 className="font-heading text-xl text-neutral-900">
                  Highlights
                </h2>
                <DestinationHighlights highlights={highlights} />
              </section>
            )}

            <Separator className="bg-neutral-200" />

            {destination.description &&
              destination.description !== overview && (
                <p className="max-w-2xl text-sm leading-relaxed text-neutral-600">
                  {destination.description}
                </p>
              )}
          </div>

          <DestinationBookingCard
            destination={destination}
            className="h-fit lg:sticky lg:top-8"
          />
        </div>
      </div>
    </main>
  )
}

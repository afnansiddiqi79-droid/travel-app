"use client"

import * as React from "react"

import { DestinationCard } from "@/components/destination-card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  CATEGORY_OPTIONS,
  PRICE_RANGE_OPTIONS,
  SORT_OPTIONS,
  filterDestinations,
  sortDestinations,
} from "@/lib/destinations"
import type { Destination } from "@/lib/types"

function FilterSelect({
  ariaLabel,
  items,
  value,
  onValueChange,
}: {
  ariaLabel: string
  items: Array<{ label: string; value: string }>
  value: string | null
  onValueChange: (value: string | null) => void
}) {
  return (
    <Select items={items} value={value} onValueChange={onValueChange}>
      <SelectTrigger
        aria-label={ariaLabel}
        className="h-11 w-full rounded-none border-x-0 border-neutral-200 bg-transparent text-xs font-semibold tracking-widest text-neutral-700 uppercase !shadow-none dark:bg-transparent"
      >
        <SelectValue placeholder={ariaLabel} />
      </SelectTrigger>

      <SelectContent>
        {items.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export function DestinationsBrowser({
  destinations,
}: {
  destinations: Destination[]
}) {
  const [category, setCategory] = React.useState<string | null>("all")
  const [priceRange, setPriceRange] = React.useState<string | null>("any")
  const [sortBy, setSortBy] = React.useState<string | null>("featured")

  const visibleDestinations = sortDestinations(
    filterDestinations(destinations, {
      category: category ?? "all",
      priceRange: priceRange ?? "any",
    }),
    sortBy ?? "featured"
  )

  return (
    <div className="flex flex-col">
      <div className="grid border-y border-neutral-200 sm:grid-cols-3">
        <FilterSelect
          ariaLabel="Category"
          items={[
            { label: "All categories", value: "all" },
            ...CATEGORY_OPTIONS,
          ]}
          value={category}
          onValueChange={(next) => setCategory(next ?? "all")}
        />
        <FilterSelect
          ariaLabel="Price Range"
          items={PRICE_RANGE_OPTIONS}
          value={priceRange}
          onValueChange={(next) => setPriceRange(next ?? "any")}
        />
        <FilterSelect
          ariaLabel="Sort By"
          items={SORT_OPTIONS}
          value={sortBy}
          onValueChange={(next) => setSortBy(next ?? "featured")}
        />
      </div>

      <p className="mt-8 text-sm text-neutral-600">
        Showing {visibleDestinations.length} of {destinations.length}{" "}
        destinations
      </p>

      {visibleDestinations.length === 0 ? (
        <div className="mt-8 rounded-xl border border-dashed border-neutral-200 pt-12 pb-12 text-center">
          <p className="text-sm font-medium text-neutral-900">
            No destinations found
          </p>
          <p className="mt-1 text-sm text-neutral-500">
            Try changing the category or price range.
          </p>
        </div>
      ) : (
        <ul className="mt-4 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {visibleDestinations.map((destination, index) => (
            <li
              key={
                destination._id ??
                destination.id ??
                `${destination.name}-${index}`
              }
            >
              <DestinationCard
                destination={destination}
                bookNowHref={`/destinations/${destination._id ?? destination.id ?? ""}`}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

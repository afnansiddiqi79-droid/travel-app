import type { Destination } from "@/lib/types"

export const CATEGORY_OPTIONS = [
  { label: "Beach", value: "beach" },
  { label: "Adventure", value: "adventure" },
  { label: "Honeymoon", value: "honeymoon" },
  { label: "Cultural", value: "cultural" },
  { label: "Family", value: "family" },
  { label: "Safari", value: "safari" },
  { label: "Cruise", value: "cruise" },
  { label: "Mountain & Trek", value: "mountain-trek" },
]

export const PRICE_RANGE_OPTIONS = [
  { label: "Any price", value: "any" },
  { label: "Under $1,000", value: "under-1000" },
  { label: "$1,000 – $2,000", value: "1000-2000" },
  { label: "$2,000 – $3,000", value: "2000-3000" },
  { label: "Above $3,000", value: "above-3000" },
]

export const SORT_OPTIONS = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Name: A to Z", value: "name-asc" },
]

export function getCategoryLabel(value?: string | null): string | null {
  if (!value) return null
  return (
    CATEGORY_OPTIONS.find((option) => option.value === value)?.label ?? value
  )
}

export function destinationPrice(destination: Destination): number | null {
  const price = Number(destination.price)
  return Number.isFinite(price) ? price : null
}

const PRICE_RANGES: Record<string, { min: number; max: number } | null> = {
  "under-1000": { min: 0, max: 1000 },
  "1000-2000": { min: 1000, max: 2000 },
  "2000-3000": { min: 2000, max: 3000 },
  "above-3000": { min: 3000, max: Infinity },
}

export function filterDestinations(
  destinations: Destination[],
  { category, priceRange }: { category: string; priceRange: string }
): Destination[] {
  return destinations.filter((destination) => {
    const matchesCategory =
      category === "all" || destination.category === category

    if (!matchesCategory) return false

    if (priceRange === "any") return true

    const price = destinationPrice(destination)
    if (price === null) return false

    const range = PRICE_RANGES[priceRange] ?? {
      min: 0,
      max: Infinity,
    }
    return price >= range.min && price <= range.max
  })
}

export function sortDestinations(
  destinations: Destination[],
  sortBy: string
): Destination[] {
  const sorted = [...destinations]

  switch (sortBy) {
    case "price-asc":
      return sorted.sort(
        (a, b) => (destinationPrice(a) ?? 0) - (destinationPrice(b) ?? 0)
      )
    case "price-desc":
      return sorted.sort(
        (a, b) => (destinationPrice(b) ?? 0) - (destinationPrice(a) ?? 0)
      )
    case "name-asc":
      return sorted.sort((a, b) => a.name.localeCompare(b.name))
    default:
      return sorted
  }
}

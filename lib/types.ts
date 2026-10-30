export type Destination = {
  id?: string
  _id?: string
  name: string
  country: string
  category?: string | null
  price?: number | string | null
  duration?: string
  departureDate?: string
  imageUrl?: string
  description?: string
  rating?: number | null
  overview?: string
  highlights?: string[]
  reviewsCount?: number | null
  perks?: string[]
}

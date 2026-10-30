"use client"

import * as React from "react"
import { PlusIcon } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { CATEGORY_OPTIONS } from "@/lib/destinations"
import type { Destination } from "@/lib/types"
import { cn } from "cn"

export type DestinationFormState = {
  name: string
  country: string
  category: string | null
  price: string
  duration: string
  departureDate: string
  imageUrl: string
  description: string
}

export const EMPTY_DESTINATION_FORM: DestinationFormState = {
  name: "",
  country: "",
  category: null,
  price: "",
  duration: "",
  departureDate: "",
  imageUrl: "",
  description: "",
}

export function destinationToFormState(
  destination: Destination
): DestinationFormState {
  return {
    name: destination.name ?? "",
    country: destination.country ?? "",
    category: destination.category ?? null,
    price: destination.price == null ? "" : String(destination.price),
    duration: destination.duration ?? "",
    departureDate: destination.departureDate
      ? destination.departureDate.slice(0, 10)
      : "",
    imageUrl: destination.imageUrl ?? "",
    description: destination.description ?? "",
  }
}

export function DestinationForm({
  initialValues,
  onSubmit,
  submitLabel,
  loadingLabel = "Saving...",
  onSuccess,
  secondaryAction,
  className,
}: {
  initialValues?: Destination
  onSubmit: (values: DestinationFormState) => Promise<void>
  submitLabel: string
  loadingLabel?: string
  /** Runs after a successful submit (before the "saved" message settles). */
  onSuccess?: () => void
  secondaryAction?: {
    label: string
    /** Defaults to clearing the form. */
    onClick?: () => void
    className?: string
  }
  className?: string
}) {
  const [form, setForm] = React.useState<DestinationFormState>(() =>
    initialValues
      ? destinationToFormState(initialValues)
      : EMPTY_DESTINATION_FORM
  )
  const [loading, setLoading] = React.useState(false)
  const [message, setMessage] = React.useState("")

  function updateField<K extends keyof DestinationFormState>(
    field: K,
    value: DestinationFormState[K]
  ) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setMessage("")
    setLoading(true)

    try {
      await onSubmit(form)

      setMessage("Destination saved successfully!")
      setForm(EMPTY_DESTINATION_FORM)
      onSuccess?.()
    } catch (error) {
      console.error("Error saving destination:", error)

      setMessage(
        error instanceof Error ? error.message : "Something went wrong."
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("flex flex-col gap-6", className)}
    >
      <div className="flex flex-col gap-6">
        {/* Destination Name */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">Destination Name</Label>
          <Input
            id="name"
            name="name"
            value={form.name}
            onChange={(event) => updateField("name", event.target.value)}
            placeholder="Bali Paradise"
            required
          />
        </div>

        {/* Country and Category */}
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="country">Country</Label>
            <Input
              id="country"
              name="country"
              value={form.country}
              onChange={(event) => updateField("country", event.target.value)}
              placeholder="Bangladesh"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="category">Category</Label>

            <Select
              items={CATEGORY_OPTIONS}
              value={form.category}
              onValueChange={(value) => updateField("category", value ?? null)}
            >
              <SelectTrigger id="category" className="w-full">
                <SelectValue placeholder="Choose category" />
              </SelectTrigger>

              <SelectContent>
                {CATEGORY_OPTIONS.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Price and Duration */}
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="price">Price (USD)</Label>
            <Input
              id="price"
              name="price"
              type="number"
              min="0"
              step="0.01"
              value={form.price}
              onChange={(event) => updateField("price", event.target.value)}
              placeholder="e.g., 1299"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="duration">Duration</Label>
            <Input
              id="duration"
              name="duration"
              value={form.duration}
              onChange={(event) => updateField("duration", event.target.value)}
              placeholder="e.g., 7 Days/6 Nights"
              required
            />
          </div>
        </div>

        {/* Departure Date */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="departureDate">Departure Date</Label>
          <Input
            id="departureDate"
            name="departureDate"
            type="date"
            value={form.departureDate}
            onChange={(event) =>
              updateField("departureDate", event.target.value)
            }
            required
          />
        </div>

        {/* Image URL */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="imageUrl">Image URL</Label>
          <Input
            id="imageUrl"
            name="imageUrl"
            type="url"
            value={form.imageUrl}
            onChange={(event) => updateField("imageUrl", event.target.value)}
            placeholder="https://example.com/image.jpg"
            required
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={form.description}
            onChange={(event) => updateField("description", event.target.value)}
            placeholder="Describe the travel experience..."
            className="min-h-24"
          />
        </div>

        {/* Success or error message */}
        {message && (
          <p role="status" className="text-sm text-neutral-800">
            {message}
          </p>
        )}

        {/* Buttons */}
        <div className="mt-2 flex items-center justify-end gap-3">
          {secondaryAction && (
            <Button
              type="button"
              variant="outline"
              size="lg"
              disabled={loading}
              onClick={
                secondaryAction.onClick ??
                (() => {
                  setForm(EMPTY_DESTINATION_FORM)
                  setMessage("")
                })
              }
              className={
                secondaryAction.className ??
                "border-red-200 text-red-600 hover:bg-red-50 hover:text-red-600"
              }
            >
              {secondaryAction.label}
            </Button>
          )}

          <Button
            type="submit"
            size="lg"
            disabled={loading}
            className="bg-cyan-600 text-white hover:bg-cyan-700"
          >
            <PlusIcon data-icon="inline-start" />
            {loading ? loadingLabel : submitLabel}
          </Button>
        </div>
      </div>
    </form>
  )
}

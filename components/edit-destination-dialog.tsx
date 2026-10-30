"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { PencilIcon } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DestinationForm,
  type DestinationFormState,
} from "@/components/destination-form"
import { Button } from "@/components/ui/button"
import type { Destination } from "@/lib/types"

export function EditDestinationDialog({
  destination,
  id,
}: {
  destination: Destination
  /** The route id used to PATCH http://localhost:5000/destination/:id */
  id: string
}) {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()

  async function handleUpdate(values: DestinationFormState) {
    const response = await fetch(`http://localhost:5000/destination/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })

    const data = await response.json().catch(() => null)

    if (!response.ok) {
      throw new Error(data?.message || "Failed to update the destination.")
    }

    router.refresh()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button
            variant="outline"
            size="sm"
            className="bg-white border-black text-black hover:bg-white hover:text-black"
          />
        }
      >
        <PencilIcon data-icon="inline-start" />
        Edit
      </DialogTrigger>

      <DialogContent className="max-h-[calc(100svh-2rem)] overflow-y-auto sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Destination</DialogTitle>
          <DialogDescription>
            Update the travel package details, then save your changes.
          </DialogDescription>
        </DialogHeader>

        <DestinationForm
          key={open ? "open" : "closed"}
          initialValues={destination}
          submitLabel="Save Changes"
          loadingLabel="Updating..."
          onSubmit={handleUpdate}
          onSuccess={() => setOpen(false)}
          secondaryAction={{ label: "Cancel", onClick: () => setOpen(false) }}
        />
      </DialogContent>
    </Dialog>
  )
}

"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Trash2Icon, TrashIcon, TriangleAlertIcon } from "lucide-react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

export function DeleteDestinationDialog({
  id,
  name,
  label = "Cancel",
}: {
  /** The route id used for DELETE http://localhost:5000/destination/:id */
  id: string
  name: string
  label?: string
}) {
  const [open, setOpen] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const router = useRouter()

  async function handleDelete() {
    setError(null)
    setLoading(true)

    try {
      const response = await fetch(`http://localhost:5000/destination/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        const data = await response.json().catch(() => null)
        throw new Error(data?.message || "Failed to delete the travel package.")
      }

      setOpen(false)
      router.push("/destinations")
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <AlertDialog
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen)
        if (!nextOpen) setError(null)
      }}
    >
      <AlertDialogTrigger
        render={
          <Button
            variant="outline"
            size="sm"
            className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-600"
          />
        }
      >
        <TrashIcon data-icon="inline-start" />
        {label}
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-400">
            <TriangleAlertIcon />
          </AlertDialogMedia>
          <AlertDialogTitle>Delete Travel Package</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete{" "}
            <span className="font-semibold text-foreground">
              &quot;{name}&quot;
            </span>
            ? This action cannot be undone and will permanently remove this
            package from the system.
          </AlertDialogDescription>
          {error && (
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          )}
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel size="sm">Cancel</AlertDialogCancel>
          <AlertDialogAction
            size="sm"
            disabled={loading}
            onClick={handleDelete}
            className="bg-red-600 text-white hover:bg-red-700"
          >
            <Trash2Icon data-icon="inline-start" />
            {loading ? "Deleting..." : "Delete Package"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

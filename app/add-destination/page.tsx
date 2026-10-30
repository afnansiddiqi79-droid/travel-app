"use client"

import { useRouter } from "next/navigation"

import {
  DestinationForm,
  type DestinationFormState,
} from "@/components/destination-form"
import { toast } from "@/components/ui/toast"

export default function AddDestinationPage() {
  const router = useRouter()

  async function handleAdd(values: DestinationFormState) {
    const travelPackage = {
      ...values,
      price: values.price ? Number(values.price) : null,
    }

    const response = await fetch("http://localhost:5000/add-destination", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(travelPackage),
    })

    const data = await response.json().catch(() => null)

    if (!response.ok) {
      throw new Error(data?.message || "Failed to add travel package.")
    }

    toast.add({
      type: "success",
      title: "Travel package added successfully!",
      description: "You can now find it on the destinations page.",
    })

    router.push("/destinations")
  }

  return (
    <main className="min-h-svh bg-background px-6 py-10 sm:px-10">
      <div className="mx-auto w-full max-w-6xl">
        <h1 className="text-4xl font-normal tracking-tight text-neutral-900 sm:text-[2.5rem]">
          Add New Travel Package
        </h1>

        <DestinationForm
          submitLabel="Add Travel Package"
          loadingLabel="Adding..."
          onSubmit={handleAdd}
          secondaryAction={{ label: "Cancel" }}
          className="mx-auto mt-12 max-w-2xl rounded-xl border border-border bg-card p-6 shadow-none sm:p-8"
        />
      </div>
    </main>
  )
}

import { DestinationsBrowser } from "@/components/destinations-browser"
import type { Destination } from "@/lib/types"

async function getDestinations(): Promise<Destination[]> {
  try {
    const res = await fetch("http://localhost:5000/destinations", {
      cache: "no-store",
    })

    if (!res.ok) {
      throw new Error(`Failed to fetch destinations: ${res.status}`)
    }

    const data = await res.json()

    if (Array.isArray(data)) {
      return data as Destination[]
    }

    if (Array.isArray(data?.destinations)) {
      return data.destinations as Destination[]
    }

    if (Array.isArray(data?.data)) {
      return data.data as Destination[]
    }

    return []
  } catch (error) {
    console.error("Error fetching destinations:", error)
    return []
  }
}

export default async function AllDestinationPage() {
  const destinations = await getDestinations()

  return (
    <main className="min-h-svh bg-white px-6 py-10 sm:px-10">
      <div className="mx-auto w-full max-w-6xl">
        <header className="flex flex-col gap-2">
          <h1 className="font-heading text-3xl font-medium tracking-tight text-neutral-900 sm:text-4xl">
            Explore All Destinations
          </h1>
          <p className="text-sm text-neutral-500">
            Find your perfect travel experience from our curated collection
          </p>
        </header>

        {destinations.length === 0 ? (
          <div className="mt-10 rounded-xl border border-dashed border-neutral-200 py-16 text-center">
            <p className="text-sm font-medium text-neutral-900">
              No destinations available yet
            </p>
            <p className="mt-1 text-sm text-neutral-500">
              Make sure your API is running at{" "}
              <code className="text-xs">localhost:5000/destinations</code>.
            </p>
          </div>
        ) : (
          <section className="mt-10">
            <DestinationsBrowser destinations={destinations} />
          </section>
        )}
      </div>
    </main>
  )
}

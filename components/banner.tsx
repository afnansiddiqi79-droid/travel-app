"use client"
import Image from "next/image";
import { ArrowRightIcon } from "lucide-react";
import { cn } from "cn";

const searchFields = [
  { label: "Location", value: "Address, City Or Zip" },
  { label: "Date/Duration", value: "Anytime / 3 Days" },
  { label: "Budget", value: "$0 - $3,000" },
  { label: "People", value: "5-10" },
];

export function Banner() {
  return (
    <section className="relative flex min-h-[calc(100svh-3.5rem)] flex-col items-center justify-center overflow-hidden">
      <Image
        src="/Banner.png"
        alt="Aerial view of a turquoise bay surrounded by forested coastline"
        fill
        priority
        className="object-cover"
      />
      {/* darkens the photo slightly so the text stays readable */}
      <div className="absolute inset-0 bg-black/20" />

      <div className="relative z-10 flex flex-col items-center px-6 text-center text-white">
        <h1 className="max-w-2xl text-5xl font-light leading-tight tracking-tight sm:text-6xl lg:text-7xl">
          Discover Your Next Adventure
        </h1>
        <p className="mt-6 max-w-md text-sm leading-relaxed text-white/90">
          Explore breathtaking destinations and create unforgettable memories
          with our curated travel experiences.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            className="flex items-center gap-2 bg-cyan-500 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-cyan-600"
          >
            Explore Now
            <ArrowRightIcon className="size-4" />
          </button>
          <button
            type="button"
            className="bg-white/40 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-sm transition-colors hover:bg-white/50"
          >
            View Destination
          </button>
        </div>
      </div>

      <form
        className="absolute inset-x-0 bottom-0 z-10 grid grid-cols-2 divide-x divide-white/15 bg-neutral-900/50 backdrop-blur-sm sm:grid-cols-5"
        onSubmit={(event) => event.preventDefault()}
      >
        {searchFields.map((field) => (
          <div
            key={field.label}
            className={cn("flex flex-col gap-1 px-8 py-3.5 text-white")}
          >
            <label
              htmlFor={field.label.toLowerCase()}
              className="text-sm font-medium"
            >
              {field.label}
            </label>
            <input
              id={field.label.toLowerCase()}
              defaultValue={field.value}
              className="w-full bg-transparent text-xs text-white/80 outline-none placeholder:text-white/60"
            />
          </div>
        ))}
        <button
          type="submit"
          className="col-span-2 bg-cyan-500 px-10 py-6 text-sm font-medium text-white transition-colors hover:bg-cyan-600 sm:col-span-1"
        >
          Search
        </button>
      </form>
    </section>
  );
}

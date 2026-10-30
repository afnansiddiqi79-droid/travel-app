"use client";

import { ArrowUpRight } from "lucide-react";

export function NewsletterForm() {
  return (
    <form
      className="mt-4 flex max-w-60 items-center bg-neutral-800"
      onSubmit={(event) => event.preventDefault()}
    >
      <input
        type="email"
        placeholder="Enter email"
        aria-label="Email address"
        className="w-full bg-transparent px-4 py-2.5 text-sm text-white outline-none placeholder:text-neutral-500"
      />
      <button
        type="submit"
        aria-label="Subscribe"
        className="px-3 text-neutral-400 transition-colors hover:text-white"
      >
        <ArrowUpRight className="size-4" />
      </button>
    </form>
  );
}

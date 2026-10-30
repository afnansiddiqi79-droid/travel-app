import { CheckIcon } from "lucide-react"

import { cn } from "cn"

export function DestinationHighlights({
  highlights,
  className,
}: {
  highlights: string[]
  className?: string
}) {
  if (highlights.length === 0) return null

  return (
    <ul className={cn("grid gap-x-8 gap-y-2.5 sm:grid-cols-2", className)}>
      {highlights.map((highlight) => (
        <li
          key={highlight}
          className="flex items-center gap-2 text-xs text-neutral-600"
        >
          <CheckIcon className="size-3.5 shrink-0 text-emerald-600" />
          {highlight}
        </li>
      ))}
    </ul>
  )
}

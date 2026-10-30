import Image from "next/image";
import { ArrowRightIcon } from "lucide-react";
import { cn } from "cn";

export function Cta({
  title = "Ready To Start Your Journey?",
  subtitle = "Join thousands of travelers who have discovered the world with us",
  ctaLabel = "Book Your Trip Today",
  ctaHref = "#bookings",
}: {
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
}) {
  return (
    <section className="relative flex min-h-80 flex-col items-center justify-center overflow-hidden px-6 py-16 text-center sm:py-20">
      <Image
        src="/CTA.png"
        alt="Aerial view of a plane flying over a tropical island"
        fill
        sizes="100vw"
        className="object-cover"
      />
      {/* darkens the photo slightly so the text stays readable */}
      <div className="absolute inset-0 bg-black/30" />

      <div className="relative z-10 flex flex-col items-center text-white">
        <h2 className="text-3xl text-white sm:text-4xl">{title}</h2>
        <p className="mt-3 max-w-md text-sm text-white/90">{subtitle}</p>
        <a
          href={ctaHref}
          className={cn(
            "mt-8 flex items-center gap-3 bg-white px-6 py-3.5",
            "text-xs font-semibold uppercase tracking-wider text-neutral-900",
            "transition-colors hover:bg-cyan-50"
          )}
        >
          {ctaLabel}
          <ArrowRightIcon className="size-4" />
        </a>
      </div>
    </section>
  );
}

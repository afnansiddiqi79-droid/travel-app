import { NewsletterForm } from "@/components/newsletter-form";

type FooterLink = { label: string; href: string };

const quickLinks: FooterLink[] = [
  { label: "Home", href: "#" },
  { label: "Destinations", href: "#destinations" },
  { label: "My Bookings", href: "#bookings" },
  { label: "My Profile", href: "#profile" },
];

const supportLinks: FooterLink[] = [
  { label: "Help Center", href: "#help" },
  { label: "Terms of Service", href: "#terms" },
  { label: "Privacy Policy", href: "#privacy" },
];

function LinkColumn({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <div>
      <h4 className="text-xs font-medium uppercase tracking-wider text-neutral-400">
        {title}
      </h4>
      <ul className="mt-5 space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="text-sm text-neutral-400 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function XIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.9 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </svg>
  );
}

function LinkedInIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455ZM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125ZM6.89 20.452H3.785V9h3.105Z" />
    </svg>
  );
}

function InstagramIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      {...props}
    >
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.5" fill="currentColor" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="bg-neutral-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-14 sm:px-10 sm:py-16">
        <p className="text-5xl font-bold tracking-tight sm:text-6xl">
          Wanderlast
        </p>
        <p className="mt-3 text-sm text-neutral-400">
          Your gateway to extraordinary travel experiences around the world.
        </p>

        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <h4 className="text-xs font-medium uppercase tracking-wider text-neutral-400">
              Newsletter
            </h4>
            <p className="mt-3 text-xs text-neutral-500">
              Subscribe for exclusive travel deals and inspiration.
            </p>
            <NewsletterForm />
          </div>

          <LinkColumn title="Quick Links" links={quickLinks} />
          <LinkColumn title="Support" links={supportLinks} />
          <div>
            <h4 className="text-xs font-medium uppercase tracking-wider text-neutral-400">
              Contact Us
            </h4>
            <ul className="mt-5 space-y-3">
              <li className="text-sm text-neutral-400">756 901 1622</li>
              <li className="text-sm text-neutral-400">
                info@wandarland.com
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-neutral-500">
            © 2026 Wanderlust. All rights reserved.
          </p>
          <div className="flex items-center gap-5 text-neutral-400">
            <a href="#x" aria-label="X (Twitter)" className="transition-colors hover:text-white">
              <XIcon className="size-4" />
            </a>
            <a href="#linkedin" aria-label="LinkedIn" className="transition-colors hover:text-white">
              <LinkedInIcon className="size-4.5" />
            </a>
            <a href="#instagram" aria-label="Instagram" className="transition-colors hover:text-white">
              <InstagramIcon className="size-4.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

import Image from "next/image";
import { UserIcon } from "lucide-react";
import { cn } from "cn";

const navLinks = [
  { label: "Home", href: "/", active: true },
  { label: "Destinations", href: "/destinations"},
  { label: "Add Destinations", href: "/add-destination"},
  { label: "My Bookings", href: "#bookings" },
  
];

const accountLinks = [
  { label: "Profile", href: "#profile", icon: UserIcon },
  { label: "Login", href: "#login" },
  { label: "Sign Up", href: "#signup" },
];

export function Navbar() {
  return (
    <header className="relative z-20 flex h-14 items-center justify-between bg-white px-10">
      <nav className="flex items-center gap-7">
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className={cn(
              "border-b-2 border-transparent pb-0.5 text-sm text-neutral-800 hover:text-cyan-600",
              link.active &&
                "border-cyan-500 font-medium text-cyan-600 hover:text-cyan-600"
            )}
          >
            {link.label}
          </a>
        ))}
      </nav>

      <a href="#" className="absolute left-1/2 -translate-x-1/2">
        <Image
          src="/Wanderlast.png"
          alt="Wanderlast"
          width={132}
          height={30}
          priority
        />
      </a>

      <div className="flex items-center gap-7">
        {accountLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="flex items-center gap-1.5 text-sm text-neutral-800 hover:text-cyan-600"
          >
            {link.icon ? <link.icon className="size-4" /> : null}
            {link.label}
          </a>
        ))}
      </div>
    </header>
  );
}

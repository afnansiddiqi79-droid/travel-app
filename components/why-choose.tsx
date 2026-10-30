import Image from "next/image";
import { cn } from "cn";

type Feature = {
  title: string;
  description: string;
  image: string;
};

const defaultFeatures: Feature[] = [
  {
    title: "Safe & Secure",
    description:
      "Your safety is our priority with comprehensive travel insurance and 24/7 support.",
    image: "/ShieldCheck.png",
  },
  {
    title: "Expert Guides",
    description:
      "Local experts who bring destinations to life with authentic cultural insights.",
    image: "/MapTrifold.png",
  },
  {
    title: "24/7 Support",
    description:
      "Round-the-clock customer service to assist you wherever your journey takes you.",
    image: "/Headset.png",
  },
];

export function WhyChoose({
  title = "Why Choose Wanderlast",
  subtitle = "Your trusted partner for exceptional travel experiences",
  features = defaultFeatures,
}: {
  title?: string;
  subtitle?: string;
  features?: Feature[];
}) {
  return (
    <section className="bg-cyan-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="text-center">
          <h2 className="text-3xl text-neutral-900 sm:text-4xl">{title}</h2>
          <p className="mt-2 text-sm text-neutral-500">{subtitle}</p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className={cn("bg-white p-6 shadow-xs sm:p-7")}
            >
              <Image
                src={feature.image}
                alt=""
                width={40}
                height={40}
                aria-hidden
              />
              <h3 className="mt-5 text-xl text-neutral-900">
                {feature.title}
              </h3>
              <p className="mt-2 max-w-64 text-sm leading-relaxed text-neutral-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

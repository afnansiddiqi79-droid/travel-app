"use client";

import * as React from "react";
import Image from "next/image";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

type Testimonial = {
  quote: string;
  name: string;
  location: string;
  image: string;
};

const defaultTestimonials: Testimonial[] = [
  {
    quote:
      "The Bali Trip Was Absolutely Magical. Every Detail Was Perfectly Planned. The Resorts Were Luxurious And The Cultural Experiences Were Unforgettable.",
    name: "Michael Chen",
    location: "Singapore",
    image: "/person2.png",
  },
  {
    quote:
      "Swiss Alps Adventure Exceeded All Expectations. The Mountain Views Were Breathtaking And Our Guide Was Incredibly Knowledgeable. Highly Recommend!",
    name: "Sarah Johnson",
    location: "New York, USA",
    image: "/person1.png",
  },
  {
    quote:
      "The Japan Rail Pass Bundle Saved Us Hours of Planning. Every City We Visited Had a Curated Guide Ready for Us.",
    name: "Daniel Carter",
    location: "Melbourne, Australia",
    image: "/person2.png",
  },
  {
    quote:
      "From Booking to Boarding, Everything Was Flawless. The Support Team Even Helped Us Rebook a Flight at Midnight.",
    name: "Olivia Bennett",
    location: "London, UK",
    image: "/person1.png",
  },
];

export function Testimonials({
  title = "What Travelers Say",
  subtitle = "Real experiences from our happy travelers",
  items = defaultTestimonials,
}: {
  title?: string;
  subtitle?: string;
  items?: Testimonial[];
}) {
  const [api, setApi] = React.useState<CarouselApi>();

  return (
    <section className="bg-white py-16 sm:py-20">
      <Carousel
        setApi={setApi}
        opts={{ align: "start", loop: true }}
        className="mx-auto max-w-7xl px-6 sm:px-10"
      >
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl text-neutral-900 sm:text-4xl">{title}</h2>
            <p className="mt-2 text-sm text-neutral-500">{subtitle}</p>
          </div>
          <div className="hidden shrink-0 items-center gap-3 sm:flex">
            <button
              type="button"
              aria-label="Previous testimonial"
              onClick={() => api?.scrollPrev()}
              className="flex size-10 items-center justify-center rounded-full border border-neutral-200 text-neutral-400 transition-colors hover:border-cyan-500 hover:text-cyan-600"
            >
              <ArrowLeftIcon className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Next testimonial"
              onClick={() => api?.scrollNext()}
              className="flex size-10 items-center justify-center rounded-full border border-neutral-200 text-neutral-400 transition-colors hover:border-cyan-500 hover:text-cyan-600"
            >
              <ArrowRightIcon className="size-4" />
            </button>
          </div>
        </div>

        <CarouselContent className="mt-8">
          {items.map((item) => (
            <CarouselItem key={item.name} className="basis-full md:basis-1/2">
              <figure className="flex h-full gap-4 border border-neutral-100 p-4 shadow-xs sm:gap-6">
                <blockquote className="flex-1 self-center">
                  <p className="text-sm font-medium leading-snug text-neutral-900">
                    {item.quote}
                  </p>
                </blockquote>
                <figcaption className="self-end">
                  <cite className="text-sm text-cyan-600 not-italic">
                    — {item.name}
                  </cite>
                  <span className="mt-0.5 block text-xs text-neutral-500">
                    {item.location}
                  </span>
                </figcaption>
                <Image
                  src={item.image}
                  alt={`${item.name}, ${item.location}`}
                  width={148}
                  height={148}
                  className="h-auto w-32 self-stretch object-cover sm:w-36"
                />
              </figure>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}

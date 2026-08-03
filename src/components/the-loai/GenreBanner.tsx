"use client";

import { useEffect, useState } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { hashStringToHue } from "@/lib/hash";
import type { Story } from "@/lib/types";

export function GenreBanner({
  genreSlug,
  banners,
}: {
  genreSlug: string;
  banners: Story[];
}) {
  const [index, setIndex] = useState(0);
  const hasBanners = banners.length > 0;

  useEffect(() => {
    if (banners.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % banners.length);
    }, 6000);
    return () => clearInterval(id);
  }, [banners.length]);

  const hue = hashStringToHue(genreSlug);
  const active = hasBanners ? banners[index] : undefined;

  return (
    <section className="relative min-h-[280px] overflow-hidden rounded-2xl border border-navy-700 bg-navy-900 sm:min-h-[380px]">
      {active?.bannerUrl ? (
        <div key={active.id} className="animate-fade-in absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={active.bannerUrl}
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(10,18,36,0.1) 0%, rgba(10,18,36,0) 40%, rgba(10,18,36,0.5) 100%)",
            }}
          />
        </div>
      ) : (
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 15% 20%, hsl(${hue} 70% 22%), transparent 55%), radial-gradient(circle at 85% 80%, hsl(${
              (hue + 40) % 360
            } 65% 18%), transparent 50%), var(--color-navy-900)`,
          }}
        />
      )}

      {active && (
        <ButtonLink
          href={`/truyen/${active.slug}`}
          variant="primary"
          className="absolute bottom-4 right-4 px-5 py-2.5 text-sm"
        >
          ĐỌC NGAY →
        </ButtonLink>
      )}

      {banners.length > 1 && (
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5">
          {banners.map((story, i) => (
            <button
              key={story.id}
              type="button"
              aria-label={`Chuyển đến banner ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-6 bg-cyan-500" : "w-1.5 bg-navy-600"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}

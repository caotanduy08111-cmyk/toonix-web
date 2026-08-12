"use client";

import { useEffect, useState } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { ChevronDownIcon } from "@/components/icons";

const SLIDES = [
  {
    id: "kham-pha",
    eyebrow: "HOT",
    eyebrowClass: "bg-cyan-500 text-white",
    title: "KHÁM PHÁ THẾ GIỚI TRUYỆN TRANH KHÔNG GIỚI HẠN",
    subtitle: "Hàng ngàn bộ truyện hấp dẫn đang chờ bạn khám phá",
    ctaLabel: "ĐỌC NGAY",
    ctaHref: "/danh-sach",
    bannerUrl: "/banner/vi-than-2.png",
  },
  {
    id: "dem-khong-bong",
    eyebrow: "MỚI",
    eyebrowClass: "bg-sky-500 text-ink-50",
    title: "ĐÊM KHÔNG BÓNG",
    subtitle: "Hai huynh đệ kiếm khách mang huyết mạch bị nguyền, bóng tối phải dè chừng chính họ.",
    ctaLabel: "ĐỌC NGAY",
    ctaHref: "/truyen/dem-khong-bong",
    bannerUrl: "/banner/dem-khong-bong-wide.png",
  },
  {
    id: "cuoc-chien-cac-vi-than",
    eyebrow: "HOT",
    eyebrowClass: "bg-cyan-500 text-white",
    title: "CUỘC CHIẾN CÁC VỊ THẦN",
    subtitle: "Khi các vị thần cổ đại thức tỉnh, một chiến binh nửa thần phải chọn phe định đoạt số phận nhân gian.",
    ctaLabel: "ĐỌC NGAY",
    ctaHref: "/truyen/cuoc-chien-cac-vi-than",
    bannerUrl: "/banner/vi-than-1.png",
  },
];

export function HeroCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  const slide = SLIDES[index];

  return (
    <section className="relative aspect-[2/1] overflow-hidden rounded-2xl border border-navy-700 bg-navy-900 sm:aspect-auto sm:h-[380px]">
      <div
        key={`${slide.id}-bg`}
        className="animate-fade-in absolute inset-0"
        aria-hidden="true"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={slide.bannerUrl}
          alt=""
          className="h-full w-full object-cover object-[75%_center]"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, var(--color-navy-900) 0%, rgba(10,18,36,0.82) 30%, rgba(10,18,36,0.35) 55%, rgba(10,18,36,0.1) 75%, transparent 100%)",
          }}
        />
      </div>
      <div
        key={slide.id}
        className="animate-fade-up relative flex h-full flex-col justify-center gap-3 px-6 py-6 sm:gap-4 sm:px-10 sm:py-8"
      >
        <span
          className={`w-fit rounded px-2 py-1 text-xs font-bold tracking-wide ${slide.eyebrowClass}`}
        >
          {slide.eyebrow}
        </span>
        <h1 className="max-w-xl text-balance font-display text-2xl font-bold leading-[1.1] tracking-wide text-ink-50 sm:text-4xl">
          {slide.title}
        </h1>
        <p className="max-w-md text-xs text-ink-300 sm:text-sm">
          {slide.subtitle}
        </p>
        <ButtonLink
          href={slide.ctaHref}
          variant="primary"
          className="mt-1 w-fit px-5 py-2.5 text-sm"
        >
          {slide.ctaLabel} →
        </ButtonLink>
      </div>
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5">
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            type="button"
            aria-label={`Chuyển đến slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? "w-6 bg-cyan-500" : "w-1.5 bg-navy-600"
            }`}
          />
        ))}
      </div>
      <ChevronDownIcon className="absolute bottom-4 right-4 hidden animate-bounce text-ink-300/70 sm:block" />
    </section>
  );
}

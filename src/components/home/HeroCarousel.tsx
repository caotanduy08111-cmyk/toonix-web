"use client";

import { useEffect, useState } from "react";
import { ButtonLink } from "@/components/ui/Button";

const SLIDES = [
  {
    id: "kham-pha",
    eyebrow: "HOT",
    title: "KHÁM PHÁ THẾ GIỚI TRUYỆN TRANH KHÔNG GIỚI HẠN",
    subtitle: "Hàng ngàn bộ truyện hấp dẫn đang chờ bạn khám phá",
    ctaLabel: "ĐỌC NGAY",
    ctaHref: "/truyen/ve-than-bong-dem",
    hue: 220,
  },
  {
    id: "cap-nhat",
    eyebrow: "MỚI",
    title: "CẬP NHẬT MỖI NGÀY, KHÔNG BỎ LỠ CHƯƠNG MỚI",
    subtitle: "Theo dõi các bộ truyện đang ra chương liên tục mỗi tuần",
    ctaLabel: "XEM CẬP NHẬT",
    ctaHref: "/danh-sach?sort=updated",
    hue: 40,
  },
  {
    id: "cong-dong",
    eyebrow: "CỘNG ĐỒNG",
    title: "THAM GIA CỘNG ĐỒNG HƠN 128.000 ĐỘC GIẢ",
    subtitle: "Bình luận, đánh giá và thảo luận về bộ truyện bạn yêu thích",
    ctaLabel: "KHÁM PHÁ",
    ctaHref: "/cong-dong",
    hue: 280,
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
    <section
      className="relative overflow-hidden rounded-2xl border border-navy-700"
      style={{
        background: `radial-gradient(circle at 15% 20%, hsl(${slide.hue} 70% 22%), transparent 55%), radial-gradient(circle at 85% 80%, hsl(${
          (slide.hue + 40) % 360
        } 65% 18%), transparent 50%), var(--color-navy-900)`,
      }}
    >
      <div className="flex min-h-[280px] flex-col justify-center gap-4 px-6 py-10 sm:min-h-[320px] sm:px-10">
        <span className="w-fit rounded bg-gold-500 px-2 py-1 text-xs font-bold tracking-wide text-navy-950">
          {slide.eyebrow}
        </span>
        <h1 className="max-w-xl text-balance font-display text-3xl font-bold leading-[1.05] tracking-wide text-ink-50 sm:text-5xl">
          {slide.title}
        </h1>
        <p className="max-w-md text-sm text-ink-300 sm:text-base">
          {slide.subtitle}
        </p>
        <ButtonLink
          href={slide.ctaHref}
          variant="primary"
          className="mt-2 w-fit px-6 py-3 text-base"
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
              i === index ? "w-6 bg-gold-500" : "w-1.5 bg-navy-600"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

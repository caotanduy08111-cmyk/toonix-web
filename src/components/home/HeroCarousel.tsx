"use client";

import { useEffect, useState } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { CoverArt } from "@/components/story/CoverArt";
import { ChevronDownIcon } from "@/components/icons";

const SLIDES = [
  {
    id: "kham-pha",
    eyebrow: "HOT",
    eyebrowClass: "bg-cyan-500 text-white",
    title: "KHÁM PHÁ THẾ GIỚI TRUYỆN TRANH KHÔNG GIỚI HẠN",
    subtitle: "Hàng ngàn bộ truyện hấp dẫn đang chờ bạn khám phá",
    ctaLabel: "ĐỌC NGAY",
    ctaHref: "/truyen/ve-than-bong-dem",
    hue: 220,
    artSlug: "ve-than-bong-dem",
    artTitle: "Vệ Thần Bóng Đêm",
    artGenres: ["hanh-dong", "sieu-nhien"],
  },
  {
    id: "cap-nhat",
    eyebrow: "MỚI",
    eyebrowClass: "bg-sky-500 text-ink-50",
    title: "CẬP NHẬT MỖI NGÀY, KHÔNG BỎ LỠ CHƯƠNG MỚI",
    subtitle: "Theo dõi các bộ truyện đang ra chương liên tục mỗi tuần",
    ctaLabel: "XEM CẬP NHẬT",
    ctaHref: "/danh-sach?sort=updated",
    hue: 40,
    artSlug: "hero-cap-nhat",
    artTitle: "Cập Nhật",
    artGenres: ["the-thao"],
  },
  {
    id: "cong-dong",
    eyebrow: "CỘNG ĐỒNG",
    eyebrowClass: "bg-cyan-500 text-white",
    title: "THAM GIA CỘNG ĐỒNG HƠN 128.000 ĐỘC GIẢ",
    subtitle: "Bình luận, đánh giá và thảo luận về bộ truyện bạn yêu thích",
    ctaLabel: "KHÁM PHÁ",
    ctaHref: "/cong-dong",
    hue: 280,
    artSlug: "hero-cong-dong",
    artTitle: "Cộng Đồng",
    artGenres: ["khoa-hoc-vien-tuong"],
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
    <section className="relative overflow-hidden rounded-2xl border border-navy-700 bg-navy-900">
      <div
        key={`${slide.id}-bg`}
        className="animate-fade-in absolute inset-0"
        style={{
          background: `radial-gradient(circle at 15% 20%, hsl(${slide.hue} 70% 22%), transparent 55%), radial-gradient(circle at 85% 80%, hsl(${
            (slide.hue + 40) % 360
          } 65% 18%), transparent 50%), var(--color-navy-900)`,
        }}
      />
      <div
        key={`${slide.id}-art`}
        className="animate-fade-in pointer-events-none absolute inset-y-0 right-0 w-3/5 opacity-20 sm:w-1/2"
        aria-hidden="true"
      >
        <CoverArt
          slug={slide.artSlug}
          title={slide.artTitle}
          genres={slide.artGenres}
          className="h-[130%] w-full -translate-y-8 rotate-2"
          rounded={false}
        />
      </div>
      <div
        key={slide.id}
        className="animate-fade-up relative flex min-h-[280px] flex-col justify-center gap-4 px-6 py-10 sm:min-h-[320px] sm:px-10"
      >
        <span
          className={`w-fit rounded px-2 py-1 text-xs font-bold tracking-wide ${slide.eyebrowClass}`}
        >
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
              i === index ? "w-6 bg-cyan-500" : "w-1.5 bg-navy-600"
            }`}
          />
        ))}
      </div>
      <ChevronDownIcon className="absolute bottom-4 right-4 hidden animate-bounce text-ink-300/70 sm:block" />
    </section>
  );
}

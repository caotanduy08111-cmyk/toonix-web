// Spin Image — Originkit
// Originkit — props baked into the default export.
"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";

const FALLBACK_IMAGES = [
  "https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/ed7b1c40-3332-43d8-a9eb-4615ef341b00/w=800",
  "https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/bd541261-75be-469c-7dc0-dae0ce81c400/w=800",
  "https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/7d4d2641-d6a8-4fef-e85c-b12ed100d500/w=800",
  "https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/933a7615-f4b6-4eae-8ed1-705fa0e24400/w=800",
  "https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/31afae9c-5ba3-4ec3-2534-ed8198ed1100/w=800",
  "https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/859c75ea-953e-489e-be61-91a03a35d700/w=800",
  "https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/e60dd7f7-a44f-40a7-df62-095b19cd8700/w=800",
  "https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/eec164e9-23f8-4f87-b48a-a208fa806100/w=800",
];

type ImageItem = string | { src?: string; url?: string; srcSet?: string };

export interface SpinBadgeItem {
  src: string;
  href?: string;
  rank?: number;
  caption?: string;
}

interface SpinImageProps {
  images?: ImageItem[];
  items?: SpinBadgeItem[];
  imageWidth?: number;
  imageHeight?: number;
  direction?: "clockwise" | "anticlockwise";
  path?: "curved" | "straight";
  xCurve?: number;
  yCurve?: number;
  speed?: number;
  rounded?: number;
  orbitUnit?: "%" | "px";
  orbitWidthPx?: number;
  orbitWidthPct?: number;
  flat?: boolean;
}

function __OriginkitBase_SpinImage(props: SpinImageProps) {
  props = { ...COMPONENT_DEFAULTS, ...props };
  const {
    images,
    items: badgeItems,
    imageWidth,
    imageHeight,
    direction,
    path,
    xCurve,
    yCurve,
    speed,
    rounded,
    orbitUnit,
    orbitWidthPx,
    orbitWidthPct,
    flat,
  } = props;

  const items = useMemo((): SpinBadgeItem[] => {
    if (Array.isArray(badgeItems) && badgeItems.length > 0) {
      return badgeItems.slice(0, 30);
    }
    const extractUrl = (it: ImageItem): string | null => {
      if (!it) return null;
      if (typeof it === "string") return it.trim() || null;
      const url =
        it.src ||
        it.url ||
        (typeof it.srcSet === "string" ? it.srcSet.split(" ")[0] : null);
      return typeof url === "string" ? url.trim() || null : null;
    };
    const userUrls = Array.isArray(images)
      ? images.map(extractUrl).filter((u): u is string => Boolean(u))
      : [];
    const urls = userUrls.length > 0 ? userUrls : FALLBACK_IMAGES;
    return urls.slice(0, 30).map((src) => ({ src }));
  }, [images, badgeItems]);

  const n = items.length;

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [dims, setDims] = useState({ W: 0, H: 0 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const r = entries[0]?.contentRect;
      if (!r) return;
      const W = Math.round(r.width);
      const H = Math.round(r.height);
      if (!W || !H) return;
      setDims({ W, H });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const W = dims.W;
  const H = dims.H;

  // Each image container = exact imageWidth × imageHeight in px.
  const imgW = Math.max(1, imageWidth ?? 150);
  const imgH = Math.max(1, imageHeight ?? 150);

  // 0 = square … 20 = fully rounded (half the short side → circle if square).
  const r = Math.max(0, Math.min(20, rounded ?? 3));
  const radius = (r / 20) * (Math.min(imgW, imgH) / 2);

  // Ellipse major-axis half-length `a` = totalWidth / 2.
  // Custom off → fixed 100% canvas width. Custom on → user value.
  const totalW =
    orbitUnit === "px"
      ? Math.max(0, orbitWidthPx ?? 0)
      : (Math.max(0, Math.min(100, orbitWidthPct ?? 0)) / 100) * W;
  const a = totalW / 2;
  const b = flat ? 0 : a * 0.35; // fixed ellipse minor/major ratio

  // Initial tilt: major axis along TL→BR diagonal. `flat` forces a level,
  // perfectly horizontal orbit instead.
  const theta0 = flat ? 0 : Math.atan2(H, W);
  const dir = direction === "anticlockwise" ? -1 : 1;

  const [orbitPhi, setOrbitPhi] = useState(0);
  const rafRef = useRef<number | null>(null);

  // Speed 0 → static, 20 → ~1 rev/sec (very fast). Linear between.
  const revsPerSec = Math.max(0, Math.min(20, speed ?? 5)) * 0.05;

  useEffect(() => {
    if (!W || !H || revsPerSec <= 0) return;
    const start = performance.now();
    // Ellipse orientation stays static; images travel along the orbit path
    // at a constant speed set by `speed`.
    const tick = (now: number) => {
      const elapsed = (now - start) / 1000;
      setOrbitPhi(dir * 2 * Math.PI * revsPerSec * elapsed);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [W, H, revsPerSec, dir]);

  const cx = W / 2;
  const cy = H / 2;
  // Static ellipse orientation (fixed tilt) — positions never move.
  const cosT = Math.cos(theta0);
  const sinT = Math.sin(theta0);

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        // 3D viewing distance for the orbit tilt.
        perspective: 1200,
      }}
    >
      {/* Whole orbit rotates in 3D by the curve values. +90 X → left
          forward; +90 Y → top forward. Browser depth-sorts, all images
          stay rendered, and image size is untouched. */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          transformStyle: "preserve-3d",
          transform: `rotateY(${xCurve ?? 0}deg) rotateX(${-(yCurve ?? 0)}deg)`,
        }}
      >
        {n > 0 &&
          items.map((item, i) => {
            const phi = (i / n) * Math.PI * 2 + orbitPhi;
            const ex = a * Math.cos(phi);
            const ey = b * Math.sin(phi);
            // Static tilt rotation of the ellipse.
            const x = ex * cosT - ey * sinT;
            const y = ex * sinT + ey * cosT;
            const left = cx + x - imgW / 2;
            const top = cy + y - imgH / 2;
            // Curved path: size by major-axis depth. Straight: uniform.
            const depth = (Math.cos(phi) + 1) / 2; // 0 back … 1 front
            const sf = path === "curved" ? 0.6 + 0.8 * depth : 1;
            // Stack follows the motion: lower (nearer) on screen = more
            // "front" → higher z. Back-arc images stay behind, rising to
            // the top only as they swing to the front.
            const zIndex = Math.round(y);
            const hasBadge = item.rank !== undefined || item.caption;
            const style: CSSProperties = {
              position: "absolute",
              left,
              top,
              width: imgW,
              height: imgH,
              // Counter-rotate (inverse of the orbit wrapper)
              // so only the orbit shape curves — images keep
              // facing the viewer.
              transform: `rotateX(${yCurve ?? 0}deg) rotateY(${-(xCurve ?? 0)}deg) scale(${sf})`,
              zIndex,
              borderRadius: radius,
              overflow: "hidden",
              backgroundImage: `url(${item.src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              boxShadow: "0 8px 24px rgba(0,0,0,0.25), 0 2px 6px rgba(0,0,0,0.15)",
              willChange: "left, top, transform",
              pointerEvents: item.href ? "auto" : "none",
              textDecoration: "none",
              display: "block",
            };
            const content = (
              <>
                {item.rank !== undefined && (
                  <span
                    style={{
                      position: "absolute",
                      top: 4,
                      left: 4,
                      minWidth: 18,
                      height: 18,
                      padding: "0 4px",
                      borderRadius: 999,
                      background:
                        item.rank <= 3 ? "#22c8ea" : "rgba(5, 10, 23, 0.85)",
                      color: item.rank <= 3 ? "#02131a" : "#eef4ff",
                      fontSize: 10,
                      fontWeight: 800,
                      lineHeight: "18px",
                      textAlign: "center",
                    }}
                  >
                    {item.rank}
                  </span>
                )}
                {item.caption && (
                  <span
                    style={{
                      position: "absolute",
                      insetInline: 0,
                      bottom: 0,
                      padding: "10px 4px 4px",
                      background:
                        "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.75) 100%)",
                      color: "#eef4ff",
                      fontSize: 9,
                      fontWeight: 700,
                      textAlign: "center",
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {item.caption}
                  </span>
                )}
              </>
            );
            if (item.href) {
              return (
                <Link key={i} href={item.href} style={style}>
                  {hasBadge && content}
                </Link>
              );
            }
            return (
              <div key={i} style={style}>
                {hasBadge && content}
              </div>
            );
          })}
      </div>
    </div>
  );
}

const COMPONENT_DEFAULTS: SpinImageProps = {
  images: FALLBACK_IMAGES,
  imageWidth: 150,
  imageHeight: 150,
  direction: "anticlockwise",
  path: "curved",
  xCurve: -90,
  yCurve: -90,
  speed: 3,
  rounded: 3,
  orbitUnit: "%",
  orbitWidthPx: 600,
  orbitWidthPct: 60,
};

const __originkitPresetProps: Partial<SpinImageProps> = {
  path: "straight",
  xCurve: 13,
  orbitUnit: "px",
  orbitWidthPct: 96,
};

export default function SpinImage(props: SpinImageProps) {
  return <__OriginkitBase_SpinImage {...__originkitPresetProps} {...props} />;
}

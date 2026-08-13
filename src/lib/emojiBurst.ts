// Emoji Burst — adapted from Originkit's "Mobile Haptics" component.
// Fires a physics-based particle burst from a trigger element, anchored to
// the viewport (fixed position) so it always escapes clipped/overflow-hidden
// ancestors like rounded cover art.

interface Particle {
  el: HTMLSpanElement;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  vrot: number;
  size: number;
  life: number;
}

interface EmojiBurstOptions {
  emojis?: string[];
  burstCount?: number;
  power?: number;
  spread?: number;
  gravity?: number;
  emojiSize?: number;
}

const HEART_EMOJIS = ["❤️", "💖", "💕", "💗", "✨", "💘"];

export function burstEmojis(
  originEl: HTMLElement,
  options: EmojiBurstOptions = {}
) {
  if (typeof window === "undefined") return;

  const {
    emojis = HEART_EMOJIS,
    burstCount = 14,
    power = 11,
    spread = 55,
    gravity = 4,
    emojiSize = 18,
  } = options;

  const gravityVal = gravity * 0.15;
  const rect = originEl.getBoundingClientRect();
  const ox = rect.left + rect.width / 2;
  const oy = rect.top + rect.height / 2;

  const layer = document.createElement("div");
  layer.style.position = "fixed";
  layer.style.inset = "0";
  layer.style.zIndex = "9999";
  layer.style.pointerEvents = "none";
  layer.setAttribute("aria-hidden", "true");
  document.body.appendChild(layer);

  const particles: Particle[] = [];
  for (let k = 0; k < burstCount; k++) {
    const el = document.createElement("span");
    el.textContent = emojis[(Math.random() * emojis.length) | 0];
    el.style.position = "absolute";
    el.style.left = "0px";
    el.style.top = "0px";
    el.style.fontSize = `${emojiSize}px`;
    el.style.lineHeight = "1";
    el.style.willChange = "transform, opacity";
    layer.appendChild(el);

    const ang = ((-90 + (Math.random() * 2 - 1) * spread) * Math.PI) / 180;
    const speed = power * (0.65 + Math.random() * 0.8);
    particles.push({
      el,
      x: ox - emojiSize / 2,
      y: oy - emojiSize / 2,
      vx: Math.cos(ang) * speed,
      vy: Math.sin(ang) * speed,
      rot: Math.random() * 360,
      vrot: (Math.random() * 2 - 1) * 14,
      size: emojiSize,
      life: 60,
    });
  }

  let lastTs = 0;
  function step(ts: number) {
    let dt = lastTs ? (ts - lastTs) / 16.6667 : 1;
    lastTs = ts;
    if (dt > 3) dt = 3;

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.vy += gravityVal * dt;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.rot += p.vrot * dt;
      p.life -= dt;
      if (p.life <= 0) {
        p.el.remove();
        particles.splice(i, 1);
        continue;
      }
      const fade = p.life < 18 ? Math.max(0, p.life / 18) : 1;
      p.el.style.opacity = String(fade);
      p.el.style.transform = `translate(${p.x}px, ${p.y}px) rotate(${p.rot}deg)`;
    }

    if (particles.length > 0) {
      requestAnimationFrame(step);
    } else {
      layer.remove();
    }
  }
  requestAnimationFrame(step);
}

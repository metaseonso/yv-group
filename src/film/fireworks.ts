// Every firework in the film, and where each spark is at beat b. Nothing is stored between frames:
// a spark's place is computed from its launch time, so scrolling back un-blooms the sky.
import { CLEAR_BLOOM, ROCKET } from './beats';
import { easeOut, hash, lerp, span } from './ease';

export type Kind = 'peony' | 'ring' | 'chrys' | 'willow' | 'palm';
export type Anchor = 'world' | 'screen';
export type Shot = {
  at: number; rise: number; burst: number; life: number;
  x: number; y: number; kind: Kind; size: number; tone: number; anchor: Anchor; dirs: Float32Array;
};
/** Draws one spark. Screen anchor: x from the middle, y down from the top, in world units. */
export type Plot = (x: number, y: number, alpha: number, tone: number, r: number, anchor: Anchor) => void;
export type Streak = (x0: number, y0: number, x1: number, y1: number, alpha: number, tone: number, anchor: Anchor) => void;

const MAX = 110;
const PHYS: Record<Kind, { k: number; g: number; n: number; trail: boolean }> = {
  peony: { k: 2.6, g: 110, n: 96, trail: false },
  ring: { k: 2.8, g: 80, n: 64, trail: false },
  chrys: { k: 2.2, g: 130, n: 84, trail: true },
  willow: { k: 1.7, g: 300, n: 76, trail: true },
  palm: { k: 2.3, g: 190, n: 84, trail: true },
};

/** Directions with speeds. The golden angle spreads any prefix evenly, so a lower spark count still looks round. */
function directions(kind: Kind, seed: number) {
  const out = new Float32Array(MAX * 2);
  for (let i = 0; i < MAX; i++) {
    let angle = i * 2.399963 + hash(i, seed) * 0.12;
    let speed: number;
    if (kind === 'ring') speed = 0.96 + hash(i, seed + 1) * 0.04;
    else if (kind === 'palm') {
      angle = (i % 7) * ((Math.PI * 2) / 7) + 0.3 + hash(i, seed) * 0.06;
      speed = 0.3 + 0.7 * hash(i, seed + 1);
    } else {
      const z = hash(i, seed + 1) * 2 - 1;
      speed = Math.sqrt(1 - z * z) * (0.86 + hash(i, seed + 2) * 0.14);
    }
    out[i * 2] = Math.cos(angle) * speed;
    out[i * 2 + 1] = Math.sin(angle) * speed;
  }
  return out;
}

type Opts = { burst?: number; life?: number; anchor?: Anchor };
let seed = 7;
function shot(at: number, rise: number, x: number, y: number, kind: Kind, size: number, tone: number, o: Opts = {}): Shot {
  seed += 11;
  const burst = o.burst ?? at + rise;
  return { at, rise, burst, life: o.life ?? 1.25, x, y, kind, size, tone, anchor: o.anchor ?? 'world', dirs: directions(kind, seed) };
}

type Row = [x: number, y: number, kind: Kind, size: number, tone: number];
const FOUR: Row[] = [[-250, 820, 'peony', 300, 1], [220, 760, 'ring', 250, 0], [-60, 900, 'chrys', 320, 2], [290, 690, 'willow', 290, 3]];
const FIVE: Row[] = [[-300, 760, 'palm', 260, 2], [270, 830, 'peony', 280, 1], [-120, 690, 'ring', 240, 3], [140, 880, 'chrys', 300, 0], [0, 950, 'willow', 430, 2]];
const KINDS: Kind[] = ['peony', 'chrys', 'ring', 'willow', 'palm'];
const TEN: Row[] = Array.from({ length: 10 }, (_, i) => [
  Math.round((i / 9 - 0.5) * 1300 + (hash(i, 40) - 0.5) * 120),
  Math.round(700 + hash(i, 41) * 300),
  KINDS[i % KINDS.length]!,
  Math.round(250 + hash(i, 42) * 150),
  i % 4,
]);

export const SHOTS: Shot[] = [
  shot(ROCKET.launch[0], ROCKET.launch[1] - ROCKET.launch[0], 0, ROCKET.apex, 'peony', 520, 0, { burst: CLEAR_BLOOM, life: 1.7 }),
  ...FOUR.map(([x, y, k, s, t], i) => shot(9.8 + 0.25 * i, 0.6, x, y, k, s, t)),
  ...FIVE.map(([x, y, k, s, t], i) => shot(13.0 + 0.2 * i, 0.6, x, y, k, s, t, { life: i === 4 ? 1.8 : 1.3 })),
  ...TEN.map(([x, y, k, s, t], i) => shot(19.7 + 0.08 * i + hash(i, 43) * 0.06, 0.7, x, y, k, s, t, { life: 1.6 })),
  shot(33.0, 0, 0, 430, 'peony', 230, 2, { anchor: 'screen', life: 1.4 }),
];

function rocket(s: Shot, b: number, plot: Plot, streak: Streak) {
  const head = (t: number): [number, number] => {
    const p = easeOut(span(t, s.at, s.at + s.rise));
    return [s.x - 30 * (1 - p), lerp(ROCKET.base, s.y, p)];
  };
  let [px, py] = head(b);
  const hang = 1 - 0.6 * span(b, s.at + s.rise, s.burst);
  plot(px, py, hang, 2, 5, s.anchor);
  for (let j = 1; j <= 10; j++) {
    const [tx, ty] = head(b - j * 0.03);
    streak(px, py, tx, ty, (1 - j / 10) * 0.55 * hang, 2, s.anchor);
    px = tx;
    py = ty;
  }
}

/** Draws a bloom at local time t (shape) with fade time f; returns how much it lights the sky. */
function bloom(s: Shot, t: number, f: number, density: number, plot: Plot, streak: Streak) {
  const { k, g, n, trail } = PHYS[s.kind];
  const count = Math.max(14, Math.round(n * density));
  const fade = Math.max(0, 1 - f / s.life) ** 1.4;
  const out = 1 - Math.exp(-k * t);
  const sag = (g * (t - out / k)) / k;
  const t0 = Math.max(0, t - 0.1);
  const out0 = 1 - Math.exp(-k * t0);
  const sag0 = (g * (t0 - out0 / k)) / k;
  const flip = s.anchor === 'screen' ? -1 : 1;
  const twinkle = Math.floor(t * 40);
  for (let i = 0; i < count; i++) {
    const dx = s.dirs[i * 2]! * s.size;
    const dy = s.dirs[i * 2 + 1]! * s.size;
    const x = s.x + dx * out;
    const y = s.y + (dy * out - sag) * flip;
    const sparkle = hash(i, twinkle) < 0.15 && t > 0.3 ? 0.35 : 1;
    plot(x, y, fade * sparkle, s.tone, 4.2, s.anchor);
    if (trail) streak(x, y, s.x + dx * out0, s.y + (dy * out0 - sag0) * flip, fade * 0.45, s.tone, s.anchor);
  }
  if (t < 0.16) plot(s.x, s.y, 0.75 * (1 - t / 0.16), 0, s.size * 0.16, s.anchor);
  return t < 0.6 ? (1 - t / 0.6) ** 2 * (s.size / 400) : 0;
}

/** Draws every firework alive at beat b. Calm mode skips the rockets and holds each bloom open. Returns the sky's flash. */
export function drawShots(b: number, density: number, calm: boolean, plot: Plot, streak: Streak) {
  let flash = 0;
  for (const s of SHOTS) {
    if (b < s.at || b > s.burst + s.life) continue;
    if (b < s.burst) {
      if (!calm) rocket(s, b, plot, streak);
      continue;
    }
    const f = b - s.burst;
    flash += bloom(s, calm ? Math.min(f, 0.5) : f, f, density, plot, streak);
  }
  return calm ? 0 : flash;
}

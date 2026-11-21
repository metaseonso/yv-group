// Pure timing helpers. A beat is the film's unit of time; one beat is BEAT_SVH of scroll (beats.ts).
export const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

/** 0 before a, 1 after z, linear between. */
export const span = (b: number, a: number, z: number) => clamp01((b - a) / (z - a));

export const lerp = (a: number, z: number, p: number) => a + (z - a) * p;
export const easeOut = (p: number) => 1 - (1 - p) ** 3;
export const easeIn = (p: number) => p ** 3;
export const easeInOut = (p: number) => (p < 0.5 ? 4 * p ** 3 : 1 - (-2 * p + 2) ** 3 / 2);

/** Overshoots a little past 1 and settles: a paper piece snapping upright. */
export const easeBack = (p: number) => {
  const c = 1.4;
  return 1 + (c + 1) * (p - 1) ** 3 + c * (p - 1) ** 2;
};

/** Fades in over `len` beats from inAt, out over `len` beats from outAt. */
export const envelope = (b: number, inAt: number, outAt: number, len = 0.4) =>
  span(b, inAt, inAt + len) * (1 - span(b, outAt, outAt + len));

/** A repeatable random number in [0, 1) for index i and channel c. */
export const hash = (i: number, c: number) => {
  let h = Math.imul(i ^ 0x9e3779b9, 0x85ebca6b) ^ Math.imul(c + 1, 0xc2b2ae35);
  h ^= h >>> 15;
  h = Math.imul(h, 0x2c1b3c6d);
  h ^= h >>> 12;
  return (h >>> 0) / 4294967296;
};

// The paper landscape, drawn at build time as SVG path data.

/** A rolling ridge from x = -2000 to 2000; returns a closed path in an SVG box 4000 wide and `h` tall (y down). */
export function ridge(h: number, top: number, swell: number, seed: number) {
  const pts: string[] = [];
  for (let x = -2000; x <= 2000; x += 50) {
    const y = top + swell * (Math.sin(x / 310 + seed) * 0.6 + Math.sin(x / 137 + seed * 2.3) * 0.25 + Math.sin(x / 71 + seed) * 0.15);
    pts.push(`${x + 2000},${(h - y).toFixed(1)}`);
  }
  return `M0,${h} L${pts.join(' L')} L4000,${h} Z`;
}

/** A pine: three stacked triangles on a trunk, in a 100 x 200 box. */
export const PINE = 'M50 0 L72 52 L60 52 L82 104 L66 104 L92 166 L56 166 L56 200 L44 200 L44 166 L8 166 L34 104 L18 104 L40 52 L28 52 Z';

/** A crescent moon in a 100 x 100 box. */
export const MOON = 'M62 6 A46 46 0 1 0 94 70 A38 38 0 1 1 62 6 Z';

/** Grass tufts for the front corners, in a 400 x 160 box. */
export const GRASS =
  'M0 160 L0 90 L14 150 L22 40 L34 148 L50 70 L58 150 L74 20 L84 150 L104 86 L110 152 L130 50 L140 154 L160 100 L166 156 L190 64 L198 156 L224 110 L230 158 L258 80 L264 158 L294 124 L300 160 Z';

/** One footprint (a left foot) in a 40 x 80 box. */
export const FOOT =
  'M20 78 C9 78 7 66 8 56 C9 44 6 34 9 26 C12 18 30 18 32 28 C34 38 30 46 31 56 C32 68 30 78 20 78 Z';
export const TOES = [[10, 14, 3.6], [17, 9, 4], [24, 8, 3.8], [30, 11, 3.4], [34, 17, 3]] as const;

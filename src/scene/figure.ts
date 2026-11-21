// Cut-paper people, drawn at build time. Each figure is thick round strokes on a 60 x 120 box, so it reads as a silhouette.
export type Arms = 'up' | 'wave' | 'hips' | 'stand' | 'walk' | 'cheer' | 'clap';
export type Legs = 'stand' | 'walk' | 'dance';

type Line = number[];

const ARMS: Record<Arms, Line[]> = {
  up: [[30, 36, 18, 20, 14, 6], [30, 36, 42, 20, 46, 6]],
  wave: [[30, 36, 14, 26, 12, 12], [30, 37, 38, 52, 40, 66]],
  hips: [[30, 37, 17, 50, 26, 63], [30, 37, 43, 50, 34, 63]],
  stand: [[30, 37, 23, 52, 22, 67], [30, 37, 37, 52, 38, 67]],
  walk: [[30, 37, 21, 52, 16, 62], [30, 37, 39, 50, 44, 58]],
  cheer: [[30, 36, 16, 28, 8, 18], [30, 36, 44, 28, 52, 18]],
  clap: [[30, 37, 22, 52, 31, 44], [30, 37, 40, 52, 31, 44]],
};

const LEGS: Record<Legs, Line[]> = {
  stand: [[30, 68, 25, 92, 24, 115], [30, 68, 35, 92, 36, 115]],
  walk: [[30, 68, 22, 92, 16, 114], [30, 68, 38, 90, 44, 112]],
  dance: [[30, 68, 24, 92, 21, 115], [30, 68, 42, 86, 38, 108]],
};

const poly = (l: Line, w: number) => {
  const pts = [];
  for (let i = 0; i < l.length; i += 2) pts.push(`${l[i]},${l[i + 1]}`);
  return `<polyline points="${pts.join(' ')}" stroke-width="${w}"/>`;
};

/** One pass of the figure at a given extra stroke width: 0 for the body, a few units for the paper edge behind it. */
function pass(arms: Arms, legs: Legs, dress: boolean, bun: boolean, extra: number) {
  const parts = [
    ...ARMS[arms].map((l) => poly(l, 9 + extra)),
    ...LEGS[legs].map((l) => poly(l, 10 + extra)),
    poly([30, 30, 30, 68], 15 + extra),
    `<circle cx="30" cy="16" r="${9.5 + extra / 2}"/>`,
  ];
  if (dress) parts.push(`<path d="M30 32 L${15 - extra / 2} ${86 + extra / 2} L${45 + extra / 2} ${86 + extra / 2} Z" stroke-width="${3 + extra}"/>`);
  if (bun) parts.push(`<circle cx="37" cy="8" r="${4.5 + extra / 2}"/>`);
  return parts.join('');
}

export function figureSvg(arms: Arms, legs: Legs, dress = false, bun = false) {
  return `<g class="edge">${pass(arms, legs, dress, bun, 3.2)}</g><g class="ink">${pass(arms, legs, dress, bun, 0)}</g>`;
}

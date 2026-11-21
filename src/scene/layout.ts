// Who stands where, and when each piece pops up. x is world units from the middle; rows set the height and size.
import { BRAZIERS, EDGE, FIRST, PARTY, TORCHES } from '../film/beats';
import type { Arms, Legs } from './figure';

export type Row = 'back' | 'mid' | 'front';
export const ROWS: Record<Row, { y: number; s: number; d: number }> = {
  back: { y: 232, s: 0.62, d: 0.85 },
  mid: { y: 132, s: 0.8, d: 1 },
  front: { y: 22, s: 1, d: 1.15 },
};

/** Gives each piece in a list its pop beat, one after another. */
const timed = <T extends object>(list: T[], start: number, step: number) => list.map((p, i) => ({ ...p, pop: start + i * step }));

export type Person = {
  row: Row; x: number; arms: Arms; legs?: Legs; s?: number; dress?: boolean; bun?: boolean;
  /** Beat it pops up. */
  pop?: number;
  /** Walks in: [from x, start beat, end beat]. */
  walk?: [number, number, number];
};

const first: Person[] = timed<Person>([
  { row: 'mid', x: -140, arms: 'hips' },
  { row: 'mid', x: 150, arms: 'wave', dress: true },
  { row: 'back', x: -30, arms: 'stand', bun: true },
], FIRST.pop, FIRST.step);

const walkers: Person[] = [
  { row: 'mid', x: -255, arms: 'walk', legs: 'walk', walk: [-1500, 6.9, 8.3] },
  { row: 'back', x: 215, arms: 'walk', legs: 'walk', walk: [1400, 7.0, 8.2] },
  { row: 'front', x: 300, arms: 'walk', legs: 'walk', dress: true, walk: [1600, 7.1, 8.5] },
  { row: 'front', x: -395, arms: 'walk', legs: 'walk', walk: [-1700, 7.3, 8.6] },
  { row: 'front', x: -335, arms: 'walk', legs: 'walk', s: 0.62, bun: true, walk: [-1640, 7.3, 8.6] },
];

const edge: Person[] = timed<Person>([
  { row: 'back', x: -480, arms: 'cheer' },
  { row: 'back', x: 470, arms: 'up', dress: true },
  { row: 'mid', x: -430, arms: 'clap', legs: 'dance' },
  { row: 'mid', x: 420, arms: 'cheer', bun: true },
], EDGE.pop, EDGE.step);

const party: Person[] = timed<Person>([
  { row: 'back', x: -700, arms: 'up' },
  { row: 'back', x: -600, arms: 'cheer', dress: true },
  { row: 'back', x: 650, arms: 'clap' },
  { row: 'back', x: 760, arms: 'up', bun: true },
  { row: 'back', x: -360, arms: 'up', legs: 'dance' },
  { row: 'back', x: 360, arms: 'cheer' },
  { row: 'mid', x: -620, arms: 'wave', legs: 'dance' },
  { row: 'mid', x: 600, arms: 'up', dress: true },
  { row: 'mid', x: -790, arms: 'cheer' },
  { row: 'mid', x: 820, arms: 'clap', bun: true, legs: 'dance' },
  { row: 'front', x: -560, arms: 'up', legs: 'dance' },
  { row: 'front', x: 570, arms: 'cheer', dress: true },
], PARTY.pop, PARTY.step);

export const PEOPLE: Person[] = [...first, ...walkers, ...edge, ...party];

export type Light = { row: Row; x: number; pop: number };
type Spot = Omit<Light, 'pop'>;
export const BRAZIER_SPOTS: Light[] = timed<Spot>([
  { row: 'back', x: -540 }, { row: 'back', x: 560 }, { row: 'mid', x: -920 }, { row: 'mid', x: 930 },
], BRAZIERS.pop, BRAZIERS.step);

export const TORCH_SPOTS: Light[] = timed<Spot>([
  { row: 'mid', x: -330 }, { row: 'mid', x: 330 }, { row: 'front', x: -760 }, { row: 'front', x: 760 },
], TORCHES.pop, TORCHES.step);

export const TREES: { x: number; h: number }[] = [
  { x: -1180, h: 150 }, { x: -1040, h: 210 }, { x: -930, h: 130 }, { x: -760, h: 180 }, { x: -560, h: 120 },
  { x: -440, h: 160 }, { x: 470, h: 150 }, { x: 590, h: 205 }, { x: 720, h: 135 }, { x: 880, h: 185 },
  { x: 1010, h: 140 }, { x: 1150, h: 200 },
];

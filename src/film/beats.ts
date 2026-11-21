// Every moment of the film, in beats. One beat is BEAT_SVH of scroll. Scenes follow CONCEPTION.md.
// World units: the stage is 1000 units tall at most widths; y counts up from the bottom edge.

export const TOTAL = 34;
export const BEAT_SVH = 40;

/** [fade in at, fade out at] for each line of copy. 99 = stays. */
export const LINES = {
  scroll: [-1, 0.15],
  seek: [-1, 2.4],
  clear: [2.9, 4.6],
  move: [5.4, 6.8],
  journeyA: [7.0, 8.6],
  journeyB: [7.6, 8.6],
  firstLaunch: [9.0, 11.4],
  celebration: [9.6, 11.4],
  partA: [11.8, 14.4],
  partB: [12.4, 14.4],
  crowd: [14.8, 18.6],
  gather: [16.8, 18.6],
  sky: [19.0, 20.9],
  steps: [21.9, 99],
  groove: [24.8, 26.2],
  reach: [26.6, 28.0],
  promise: [28.3, 29.6],
  logo: [32.3, 99],
} as const satisfies Record<string, readonly [number, number]>;

/** The first firework blooms on the word "clear". */
export const CLEAR_BLOOM = 3.6;

/** The opening rocket: rises from the ground to its apex while the camera rides it. */
export const ROCKET = { launch: [0.3, 3.3], base: 140, apex: 2600, hold: 560 } as const;

export const DESCEND = [4.4, 6.2] as const;
export const RAIN = [4.2, 6.9] as const;
export const ZOOM_OUT = [19.0, 21.0] as const;

export const FIRST = { pop: 6.0, step: 0.15 };
export const EDGE = { pop: 10.5, step: 0.2 };
export const PARTY = { pop: 12.4, step: 0.1 };
export const BRAZIERS = { pop: 12.2, step: 0.15 };
export const TORCHES = { pop: 12.7, step: 0.15 };

export const PASSES = { start: 15.0, step: 0.2, hang: 1.0 };
export const CARDS = { start: 16.8, step: 0.12, hang: 0.9 };

export const PAGE = { flashIn: 21.0, flashPeak: 21.6, flashOut: 22.0, turn: [24.0, 24.9] } as const;
export const PRINTS = { start: 22.2, step: 0.14, count: 10 };

export const WARM = [26.6, 27.4] as const;
export const SETTLE = [28.2, 30.0] as const;
export const FLAME = { zoom: [30.0, 30.95], inferno: [30.4, 30.95], white: [30.85, 31.1], sky: 31.1, shoot: [31.1, 32.4], clear: [31.1, 31.6] } as const;

export const DANCE = [13.0, 28.2] as const;
export const QUIET = [28.2, 31.1] as const;

/** Where the camera zooms: the ground's middle, and the bonfire's flame. */
export const GROUND_Y = 150;
export const FLAME_Y = 215;

// Where the camera is at beat b. Pure: the same beat always gives the same camera, so scrolling back plays the film backwards.
import { DESCEND, FLAME, PAGE, ROCKET, SETTLE, ZOOM_OUT } from './beats';
import { easeIn, easeInOut, easeOut, lerp, span } from './ease';

export type Cam = {
  /** Height of the camera above the ground, in world units. */
  y: number;
  zoom: number;
  focus: 'ground' | 'flame';
  /** Past the flame: only the starfield is drawn. */
  sky: boolean;
  /** The starfield's own height; it keeps climbing after the flame. */
  starY: number;
};

export function rocketY(b: number) {
  return lerp(ROCKET.base, ROCKET.apex, easeOut(span(b, ROCKET.launch[0], ROCKET.launch[1])));
}

function zoomAt(b: number) {
  if (b < PAGE.flashPeak) return 1 - 0.15 * easeInOut(span(b, ZOOM_OUT[0], ZOOM_OUT[1]));
  const settled = lerp(0.92, 1, easeInOut(span(b, SETTLE[0], SETTLE[1])));
  return settled * (1 + 6 * easeIn(span(b, FLAME.zoom[0], FLAME.zoom[1])));
}

export function camera(b: number, reduced: boolean): Cam {
  const sky = b >= FLAME.sky;
  if (reduced) return { y: 0, zoom: 1, focus: 'ground', sky, starY: 0 };
  const follow = Math.max(0, rocketY(b) - ROCKET.hold);
  const y = follow * (1 - easeInOut(span(b, DESCEND[0], DESCEND[1])));
  const starY = y + 14000 * easeOut(span(b, FLAME.shoot[0], FLAME.shoot[1]));
  const focus = b >= FLAME.zoom[0] ? 'flame' : 'ground';
  return { y, zoom: zoomAt(b), focus, sky, starY };
}

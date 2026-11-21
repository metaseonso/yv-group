// The browser root: turns scroll into a beat and draws that beat. Runs only while the beat is moving;
// flames, embers and dancing run on the compositor without it.
import { FLAME_Y, GROUND_Y, TOTAL } from './beats';
import { camera } from './camera';
import { createSky, type View } from './canvas';
import { createStage } from './stage';

const track = document.querySelector<HTMLElement>('.track')!;
const stageEl = document.querySelector<HTMLElement>('.stage')!;
const probe = document.querySelector<HTMLElement>('[data-probe]')!;
const motion = matchMedia('(prefers-reduced-motion: reduce)');

const sky = createSky(document.querySelector<HTMLCanvasElement>('.sky')!);
const apply = createStage(stageEl);

let calm = motion.matches;
let view: View = { w: 1, h: 1, u: 1, dpr: 1 };
let top = 0;
let length = 1;
let target = 0;
let shown = 0;
let lastStar = 0;
let raf = 0;
let lastT = 0;
let density = 1;
let slowFrames = 0;
let fastFrames = 0;

function measure() {
  const r = stageEl.getBoundingClientRect();
  const u = probe.getBoundingClientRect().width / 1000 || 1;
  view = { w: r.width, h: r.height, u, dpr: Math.min(devicePixelRatio || 1, 1.75) };
  sky.resize(view);
  top = track.getBoundingClientRect().top + scrollY;
  length = Math.max(1, track.offsetHeight - innerHeight);
}

function beatFromScroll() {
  return Math.min(1, Math.max(0, (scrollY - top) / length)) * TOTAL;
}

function render(b: number) {
  const cam = camera(b, calm);
  const fy = view.h - (cam.focus === 'flame' ? FLAME_Y : GROUND_Y) * view.u;
  const starV = cam.starY - lastStar;
  lastStar = cam.starY;
  const flash = sky.frame(b, cam, fy, density, calm, starV);
  apply({ b, v: view, cam, fy, flash, calm });
}

/** Fewer sparks when frames run long, more again when there is room. Scenes never drop. */
function tune(ms: number) {
  if (ms > 19) slowFrames++;
  else if (ms < 14) fastFrames++;
  if (slowFrames > 8) {
    density = Math.max(0.3, density * 0.85);
    slowFrames = fastFrames = 0;
  } else if (fastFrames > 60) {
    density = Math.min(1, density + 0.05);
    slowFrames = fastFrames = 0;
  }
}

function tick(now: number) {
  raf = 0;
  const dt = lastT ? Math.min(64, now - lastT) : 16;
  lastT = now;
  shown = calm ? target : shown + (target - shown) * (1 - Math.exp(-dt / 120));
  if (Math.abs(target - shown) < 0.0008) shown = target;
  render(shown);
  tune(dt);
  if (shown !== target) raf = requestAnimationFrame(tick);
  else lastT = 0;
}

function wake() {
  target = beatFromScroll();
  if (!raf) raf = requestAnimationFrame(tick);
}

function restart() {
  measure();
  target = shown = beatFromScroll();
  render(shown);
}

addEventListener('scroll', wake, { passive: true });
addEventListener('resize', restart);
motion.addEventListener('change', () => {
  calm = motion.matches;
  restart();
});
document.fonts?.ready.then(restart);
restart();

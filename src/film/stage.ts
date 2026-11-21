// Moves the paper: reads each element's data-* beats once, then sets transform and opacity per frame.
// A value is written only when it changes, and only transform, opacity and visibility are touched.
import { DANCE, FLAME, PAGE, QUIET, WARM } from './beats';
import type { Cam } from './camera';
import type { View } from './canvas';
import { easeBack, easeIn, easeInOut, easeOut, envelope, lerp, span } from './ease';

export type Frame = { b: number; v: View; cam: Cam; fy: number; flash: number; calm: boolean };
type Track = (f: Frame) => void;
type El = HTMLElement | SVGElement;

const cache = new WeakMap<El, Record<string, string>>();
function put(el: El, prop: string, value: string) {
  let seen = cache.get(el);
  if (!seen) cache.set(el, (seen = {}));
  if (seen[prop] === value) return;
  seen[prop] = value;
  el.style.setProperty(prop, value);
}
const nums = (el: El, key: string) => (el.dataset[key] ?? '').split(' ').map(Number);
const show = (el: El, on: boolean) => put(el, 'visibility', on ? 'visible' : 'hidden');

const line = (el: El): Track => {
  const [a = 0, z = 0] = [...nums(el, 'in'), ...nums(el, 'out')];
  return ({ b, calm }) => {
    const o = envelope(b, a, z);
    const rise = calm ? 0 : (1 - span(b, a, a + 0.5)) * 22 - span(b, z, z + 0.4) * 14;
    put(el, 'opacity', o.toFixed(3));
    put(el, 'transform', rise ? `translate3d(0,${rise.toFixed(1)}px,0)` : 'none');
    show(el, o > 0);
  };
};

const pop = (el: El): Track => {
  const [s = 0] = nums(el, 'pop');
  return ({ b }) => {
    const p = span(b, s, s + 0.55);
    put(el, 'opacity', p > 0 ? '1' : '0');
    put(el, 'transform', p >= 1 ? 'none' : `rotateX(${(90 * (1 - easeBack(p))).toFixed(2)}deg)`);
  };
};

const walk = (el: El): Track => {
  const [dx = 0, s = 0, e = 1] = nums(el, 'walk');
  return ({ b, v }) => {
    const p = easeInOut(span(b, s, e));
    put(el, 'transform', p >= 1 ? 'none' : `translate3d(${(dx * (1 - p) * v.u).toFixed(1)}px,0,0)`);
    el.classList.toggle('is-walking', p > 0 && p < 1);
  };
};

const ignite = (el: El): Track => {
  const [s = 0] = nums(el, 'ignite');
  const grows = el.classList.contains('flame-wrap');
  return ({ b }) => {
    const p = span(b, s, s + 0.5);
    put(el, 'opacity', p.toFixed(3));
    if (grows) put(el, 'transform', `scale(${easeBack(p).toFixed(3)})`);
  };
};

const fly = (el: El): Track => {
  const [s = 0, h = 0, hx = 0, rot = 0] = nums(el, 'fly');
  return ({ b, v }) => {
    const pin = easeOut(span(b, s, s + 0.5));
    const pout = easeIn(span(b, h, h + 0.5));
    show(el, pin > 0 && pout < 1);
    if (pin <= 0 || pout >= 1) return;
    const x = pout > 0 ? lerp(hx, -0.9, pout) : lerp(0.9, hx, pin);
    const turn = pout > 0 ? lerp(rot, rot - 16, pout) : lerp(rot + 16, rot, pin);
    const y = (1 - pin) * -30 + pout * 24;
    put(el, 'transform', `translate3d(${(x * v.w).toFixed(1)}px,${y.toFixed(1)}px,0) rotate(${turn.toFixed(2)}deg)`);
  };
};

const layer = (el: El): Track => {
  const [d = 1] = nums(el, 'd');
  return ({ v, cam, fy }) => {
    const zoom = 1 + (cam.zoom - 1) * d;
    put(el, 'transform-origin', `50% ${fy.toFixed(1)}px`);
    put(el, 'transform', `scale(${zoom.toFixed(4)}) translate3d(0,${(cam.y * d * v.u).toFixed(1)}px,0)`);
  };
};

const simple = (sel: string, make: (el: El) => Track) => (root: HTMLElement) =>
  Array.from(root.querySelectorAll<El>(sel)).map(make);

const BUILDERS = [
  simple('[data-in]', line),
  simple('[data-pop]', pop),
  simple('[data-walk]', walk),
  simple('[data-ignite]', ignite),
  simple('[data-fly]', fly),
  simple('[data-d]', layer),
  simple('[data-until]', (el) => {
    const [until = 0] = nums(el, 'until');
    return ({ b }) => put(el, 'opacity', b < until ? '1' : '0');
  }),
  simple('[data-path]', (el) => {
    const [s = 0, e = 1] = nums(el, 'path');
    return ({ b }) => put(el, 'stroke-dashoffset', (1 - easeOut(span(b, s, e))).toFixed(3));
  }),
  simple('[data-print]', (el) => {
    const [s = 0] = nums(el, 'print');
    return ({ b }) => put(el, 'opacity', span(b, s, s + 0.12).toFixed(3));
  }),
];

/** The page-wide pieces: light over the scene, the white page, the crowd's mood. */
function scene(root: HTMLElement): Track {
  const q = <T extends El>(sel: string) => root.querySelector<T>(sel)!;
  const world = q('[data-world]');
  const [skyflash, warm, inferno, flash] = ['skyflash', 'warm', 'inferno', 'flash'].map((k) => q(`[data-k="${k}"]`));
  const box = q('[data-page-box]');
  const page = q('[data-page]');
  const shade = q('[data-page-shade]');
  const crowds = Array.from(root.querySelectorAll<El>('.crowd'));
  return ({ b, flash: lit, calm }) => {
    show(world, !(b > PAGE.flashPeak && b < PAGE.turn[0]) && b < FLAME.sky);
    put(skyflash!, 'opacity', Math.min(0.6, lit * 0.4).toFixed(3));
    put(warm!, 'opacity', (0.9 * span(b, WARM[0], WARM[1]) * (1 - span(b, FLAME.white[0], FLAME.white[1]))).toFixed(3));
    put(inferno!, 'opacity', (span(b, FLAME.inferno[0], FLAME.inferno[1]) * (1 - span(b, FLAME.sky, FLAME.sky + 0.3))).toFixed(3));
    const white = Math.max(span(b, PAGE.flashIn, PAGE.flashPeak) * (1 - span(b, PAGE.flashPeak, PAGE.flashOut)), span(b, FLAME.white[0], FLAME.white[1]) * (1 - span(b, FLAME.clear[0], FLAME.clear[1])));
    put(flash!, 'opacity', white.toFixed(3));
    const turn = easeInOut(span(b, PAGE.turn[0], PAGE.turn[1]));
    show(box, b >= PAGE.flashPeak && turn < 1);
    put(page, 'transform', calm || turn === 0 ? 'none' : `rotateY(${(-178 * turn).toFixed(2)}deg)`);
    put(page, 'opacity', calm ? (1 - turn).toFixed(3) : '1');
    put(shade, 'opacity', (turn * 0.9).toFixed(3));
    for (const c of crowds) {
      c.classList.toggle('is-dancing', b >= DANCE[0] && b < DANCE[1]);
      c.classList.toggle('is-quiet', b >= QUIET[0] && b < QUIET[1]);
    }
  };
}

export function createStage(root: HTMLElement) {
  const tracks: Track[] = [...BUILDERS.flatMap((build) => build(root)), scene(root)];
  return (f: Frame) => {
    for (const t of tracks) t(f);
  };
}

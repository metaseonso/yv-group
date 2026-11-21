// The one canvas: stars, rockets, blooms and rain. It draws only when the beat changes.
import type { Cam } from './camera';
import { hash } from './ease';
import { drawShots, type Anchor } from './fireworks';
import { drawRain } from './rain';
import { TONES } from './tones';

export type View = { w: number; h: number; u: number; dpr: number };

const STARS = 260;
const STAR_DEPTH = 0.25;

function sprite([r, g, b]: readonly [number, number, number]) {
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const x = c.getContext('2d')!;
  const grad = x.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, 'rgba(255,255,255,1)');
  grad.addColorStop(0.22, `rgba(${r},${g},${b},0.95)`);
  grad.addColorStop(0.5, `rgba(${r},${g},${b},0.28)`);
  grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
  x.fillStyle = grad;
  x.fillRect(0, 0, 64, 64);
  return c;
}

export function createSky(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d')!;
  const sprites = TONES.map(sprite);
  const inks = TONES.map(([r, g, b]) => `rgb(${r},${g},${b})`);
  let view: View = { w: 1, h: 1, u: 1, dpr: 1 };
  let cam: Cam = { y: 0, zoom: 1, focus: 'ground', sky: false, starY: 0 };
  let fy = 0;

  const toScreen = (x: number, y: number, anchor: Anchor): [number, number, number] => {
    if (anchor === 'screen') return [view.w / 2 + x * view.u, y * view.u, 1];
    const sx = view.w / 2 + x * view.u;
    const sy = view.h - (y - cam.y) * view.u;
    return [view.w / 2 + (sx - view.w / 2) * cam.zoom, fy + (sy - fy) * cam.zoom, cam.zoom];
  };

  const plot = (x: number, y: number, alpha: number, tone: number, r: number, anchor: Anchor) => {
    if (alpha <= 0.01) return;
    const [sx, sy, z] = toScreen(x, y, anchor);
    const size = Math.max(3, r * view.u * z * 2.4);
    if (sx < -size || sx > view.w + size || sy < -size || sy > view.h + size) return;
    ctx.globalAlpha = Math.min(1, alpha);
    ctx.drawImage(sprites[tone]!, sx - size / 2, sy - size / 2, size, size);
  };

  const streak = (x0: number, y0: number, x1: number, y1: number, alpha: number, tone: number, anchor: Anchor) => {
    if (alpha <= 0.01) return;
    const [ax, ay] = toScreen(x0, y0, anchor);
    const [bx, by] = toScreen(x1, y1, anchor);
    ctx.globalAlpha = alpha;
    ctx.strokeStyle = inks[tone]!;
    ctx.beginPath();
    ctx.moveTo(ax, ay);
    ctx.lineTo(bx, by);
    ctx.stroke();
  };

  function stars(starV: number) {
    const shift = cam.starY * STAR_DEPTH * view.u;
    const trail = Math.min(view.h * 0.4, Math.abs(starV) * STAR_DEPTH * view.u);
    ctx.fillStyle = ctx.strokeStyle = '#fff';
    for (let i = 0; i < STARS; i++) {
      const x = hash(i, 90) * view.w;
      const y = (((hash(i, 91) * view.h + shift) % view.h) + view.h) % view.h;
      const s = 0.6 + hash(i, 92) * 1.3;
      ctx.globalAlpha = 0.25 + hash(i, 93) * 0.6;
      if (trail > 2) {
        ctx.lineWidth = s;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x, y - trail);
        ctx.stroke();
      } else ctx.fillRect(x, y, s, s);
    }
  }

  return {
    resize(v: View) {
      view = v;
      canvas.width = Math.round(v.w * v.dpr);
      canvas.height = Math.round(v.h * v.dpr);
    },
    frame(b: number, c: Cam, focusY: number, density: number, calm: boolean, starV: number) {
      cam = c;
      fy = focusY;
      ctx.setTransform(view.dpr, 0, 0, view.dpr, 0, 0);
      ctx.globalCompositeOperation = 'source-over';
      ctx.clearRect(0, 0, view.w, view.h);
      stars(starV);
      ctx.globalCompositeOperation = 'lighter';
      ctx.lineWidth = Math.max(1, 1.3 * view.u);
      const flash = drawShots(b, density, calm, plot, streak);
      drawRain(b, density, calm, view.h / view.u, plot);
      ctx.globalAlpha = 1;
      return flash;
    },
  };
}

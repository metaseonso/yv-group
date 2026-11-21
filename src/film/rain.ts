// After the first bloom, tiny sparks rain down the screen while the camera comes back to the ground.
import { RAIN } from './beats';
import { hash, span } from './ease';
import type { Plot } from './fireworks';

/** viewH: the screen's height in world units. Calm mode holds the sparks still, mid-fall. */
export function drawRain(b: number, density: number, calm: boolean, viewH: number, plot: Plot) {
  const p = span(b, RAIN[0], RAIN[1]);
  if (p <= 0 || p >= 1) return;
  const n = Math.round(170 * density);
  const fadeAll = 1 - span(b, RAIN[1] - 0.5, RAIN[1]);
  for (let i = 0; i < n; i++) {
    const start = hash(i, 1) * 0.55;
    const speed = 0.75 + hash(i, 2) * 0.6;
    const q = calm ? 0.2 + hash(i, 5) * 0.6 : (p - start) * speed * 1.7;
    if (q < 0 || q > 1) continue;
    const x = (hash(i, 3) - 0.5) * 1500 + Math.sin(q * 6 + i) * 14;
    const y = -60 - hash(i, 4) * 200 + q * (viewH + 80);
    const alpha = Math.min(1, q * 6) * (1 - q) ** 0.6 * fadeAll;
    plot(x, y, alpha, i % 3 === 0 ? 3 : 2, 3.2, 'screen');
  }
}

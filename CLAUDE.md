# YV Group site

A web app under the account's "Building a web app" standard (`~/.claude/CLAUDE.md`). The brief is `CONCEPTION.md`.

## The speed law (YV)

Seonso, 2026-11-21: "establish law that everything needs to remain responsive with animations and lightweight/lightining fast."

Every screen, at every width, keeps its full animation **and** stays light and fast. Motion is never cut to make speed, and speed is never traded for motion. The numbers below are how that is measured:

| What | Holds at |
|---|---|
| Widths | Phone (360 px) to 1440 px, scaling proportionately; above 1440 it holds (shape taken from Block Law 0.5, decision 297) |
| First words on screen (LCP) | ≤ 1.5 s, mid phone on 4G |
| Answer to a touch (INP) | ≤ 100 ms |
| Layout shift (CLS) | 0 |
| Frame rate | 60 fps on a mid phone; the effect lowers its own particle count when a frame runs over 16.7 ms, never drops a scene |
| JS on first view | ≤ 50 KB gzip; no UI framework runtime |
| First view weight | ≤ 300 KB, fonts included; everything below the fold loads when it is near |
| Motion | Only `transform`, `opacity` and one canvas; no video files for the film |
| Text | Real HTML text in every language, never painted into the canvas |
| Calm on request | `prefers-reduced-motion` gets the same story as still frames with soft fades |

**Where it is checked:** in the one sandbox look with pictures (account standard "Checks"), the numbers read from Chrome's own performance panel. Nothing is built to check it.

**Stands with:** calmux ("smooth", "fast to open", "calm on request" guards: this law gives them numbers for YV); Impeccable pass before a screen is done; `modern-web-guidance` for how the browser features are built (Baseline: Widely available).

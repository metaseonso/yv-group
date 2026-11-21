# Decisions

Choices the brief did not fix. Newest last.

| Date | Choice | Why | Alternative | Reversible |
|---|---|---|---|---|
| 2026-11-21 | Astro, static, one page per language (`/`, `/pt/`, `/uk/`, `/ru/`) | Ships zero JS by default; i18n routing built in; four ready pages, no translating in the browser | Plain Vite + a page generator | Yes |
| 2026-11-21 | The film is one hand-written Canvas 2D plus DOM paper layers, driven by one scroll-progress number | Fits the 50 KB JS limit; fireworks are scrubbable and reversible (positions computed from time, no stored state) | GSAP ScrollTrigger + a particle library (~100 KB+) | Yes |
| 2026-11-21 | Literata variable font (Latin + Cyrillic) from `@fontsource-variable/literata` | A book face suits the storybook; `unicode-range` makes a page fetch only its alphabet (Latin 52 KB, Cyrillic 28 KB) | PT Serif; pyftsubset by hand | Yes |
| 2026-11-21 | Firework tones are white, silver, pale gold, amber, in one token list (`src/film/tones.ts`) | Black and white with warm glows until the group picks colours; one list to swap | Real colours now | Yes |
| 2026-11-21 | Pop-up mechanic: each paper piece stands up from flat (`rotateX` 90° → 0 from its bottom edge) as its scene arrives; the white page turns like a book page | The pop-up storybook look Seonso asked for, using only `transform` | Fades | Yes |
| 2026-11-21 | Block Law installed with `init`; its sample components, connections and `app/main.ts` removed | The web-app standard keeps two rules (80-line functions, no import loops) and no five-layer folders | Keep the samples | Yes |
| 2026-11-21 | `laws/` kept from the template | `blocklint` refuses a repository without the four laws (B010), though the web-app standard drops the verb registry | Remove them and fail lint | Yes |
| 2026-11-21 | Typecheck covers `src/` only | The law package's `laws/` files do not typecheck under the browser lib (its own code); `npm test` still runs them | Fix in `metaseonso/block-law` | Yes |
| 2026-11-21 | The org chart lives in `org-chart/` (source `ORG-CHART.md`, page `org-chart.html`), outside the Astro build, published as the claude.ai artifact "YV Organisation Chart" | Same home and channel as LTP's chart (`ltp-daily/org-chart/`, an artifact); an internal document, not a page of the public site | A route on the site | Yes |
| 2026-11-21 | YV tiers numbered 1–4 (Contractor, Partner, Managing Partner, GMP) | No employee ladder below, so LTP's 4–6 would start at an empty 4 | Keep LTP's numbers | Yes, pending Seonso (C8) |
| 2026-11-21 | Protocols numbered P1–P18 with P1 = the Season | Seonso's own "p= protocol, p1 early access" | Keep LTP's B-numbers | Yes |

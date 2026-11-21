# YV Group

## What

The YV Group site: one scroll film per language, a children's pop-up storybook at night. Brief: `CONCEPTION.md`. Speed law: `CLAUDE.md`. Choices: `docs/decisions.md`.

## Where

| Thing | Place |
|---|---|
| Pages (`/`, `/pt/`, `/uk/`, `/ru/`) | `src/pages/` → `src/components/Film.astro` |
| Words, per language | `src/copy/<lang>.ts` (pt, uk, ru: drafts until a group member writes them) |
| Every beat of the film | `src/film/beats.ts` |
| Camera | `src/film/camera.ts` |
| Fireworks, rain, stars | `src/film/fireworks.ts`, `rain.ts`, `canvas.ts` |
| Firework tones (the group's colour choice goes here) | `src/film/tones.ts` |
| Paper pieces and who stands where | `src/scene/` (`layout.ts` for positions and pop beats) |
| Colours, sizes, motion tokens | `src/styles/site.css` (`:root`) |
| Block Law | `blocklint.config.json`, `laws/`, `.githooks/pre-commit` |
| GitHub Pages preview (branch `gh-pages`, base `/yv-group`) | `astro.config.mjs`, `public/.nojekyll` (keeps `_astro/`) |

## When

| Moment | Command |
|---|---|
| Work on it | `npm run dev` (http://localhost:4321) |
| Before a commit (the hook runs lint and test) | `python "Desktop/Seonso PoV/scripts/heavy.py" run --owner yv -- npm run build` and `npm run typecheck` |
| Change a scene's timing | edit `src/film/beats.ts` only |
| Deploy the preview | `python "Desktop/Seonso PoV/scripts/heavy.py" run --owner yv -- npm run deploy` → https://metaseonso.github.io/yv-group/ |

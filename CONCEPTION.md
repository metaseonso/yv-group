# YV Group — Conception

Source: `Downloads\ChatGPT-Launch Anthem Rewrite-20261121-2202.md` (Seonso's thread, 2026-11-21). Status: **confirmed** (Seonso, 2026-11-21: "Confirmed, begin"). Gestation started the same day.

## Answers (Seonso, 2026-11-21)

| Open question | Answer | His words |
|---|---|---|
| Missing assets (logo, domain, contact, journey copy) | Placeholder text until they exist | "what you don't have we can lorum ipsum dolor" |
| Translations | Group members write them; Claude's drafts stand in until then | "translations will be by members of the group." |
| Colour | Black and white with warm glows; the group decides real colours later | "colours, need to be decided by the group, for now lets do black and white, with warm glows here and there." |
| Look | A children's pop-up storybook | "kind of like a childrens popup storybook." |

## Who YV is

Not a go-to-market agency. A remarkable group of people who show up and celebrate when someone launches something new and cool, and bring people with them. The capability (starter pack → full stack) exists underneath, but the page never reads as "a GTM consultancy". The film proves this rather than claims it.

Thesis the film shows: one person → a journey others join → a gathering → everyone in the groove.

## What we build

One page, one continuous night scene, driven by scroll (parallax). Four first-class languages, each its own path into the same gathering: **English · Português · Українська · Русский** (Ukrainian and Russian are separate).

## The film, scene by scene

| # | Copy (on screen) | What happens |
|---|---|---|
| 1 | Who you seek is seeking you. | One firework launches; camera rides the projectile up; words form in its trail |
| 2 | When your story is *clear* | Apex, a beat of stillness; it blooms on "clear" |
| 3 | They come ready to move. | Sparks rain down; camera pulls back; first silhouettes, one bonfire |
| 4 | *Journey line (see open copy)* | One person walks toward the fire, then another; paths lead to the light |
| 5 | Your first launch / should be a celebration. | Words in the sky; 4 fireworks, staggered, 4 colours: first crescendo |
| 6 | And we want to be part of making that party happen. | More people arrive from every path; braziers and torches light; silhouettes glow and dance; 5 fireworks, varied crescendo |
| 7 | So when the crowd starts | Early-access passes fly in, hang, fly out horizontally |
| 8 | to gather | Cards in a flurry: investors, strategic partners, players, media, creators, community |
| 9 | we can light up the sky. | Slow beat, then 10 fireworks together; overexposure to **white** |
| 10 | From the first steps, | Out of the white: footsteps / first marks on the ground |
| 11 | to everyone getting to the groove. | Camera comes down into the gathering: people dancing, fires pulsing, sparks through the crowd |
| 12 | Reach out. | Warm colour returns; bonfire pulsing and warm |
| 13 | We love showing our new friends that we've got their back. | Quietest moment: fire, people, embers. Then camera pushes into the flame, through orange → gold → white, and shoots up into a starfield |
| 14 | **YV GROUP** + logo mark | Against the stars; one small, elegant bloom behind it. Contact below |

"From the first steps, to everyone getting to the groove" replaces "From your go-to-market starter pack to the full stack" (Seonso, 20:20 in the thread). The capability list can live lower on the page as the practical explanation.

## Open: needs Seonso before gestation

| # | Question | Why it blocks |
|---|---|---|
| 1 | Journey copy: keep the thread's suggestion "Every launch is a journey. / And no great journey is meant to be traveled alone." or your own words? | ChatGPT wrote it; you asked for the idea, not these words |
| 2 | Colour: fireworks in four colours vs the account seal standard ("a page without [the seal] is black and white only") | The two standards meet here; YV is its own brand, so it likely keeps its own look ("each plant keeps its own look"), but that is your call |
| 3 | Logo mark and wordmark files for YV Group | Scene 14 needs the real mark |
| 4 | Domain and contact path (form, email, Telegram?) | "Reach out" needs somewhere to go |
| 5 | Who checks the Portuguese, Ukrainian and Russian copy | Machine drafts are fine to start; a native reader signs off before launch |

## Gestation queue (after your yes)

| Step | Tool | Have it |
|---|---|---|
| New repo `metaseonso/yv-group`, Block Law installed in the first commit | `npx github:metaseonso/block-law init`, `gh` | Yes |
| Static site, one page per language (`/en`, `/pt`, `/uk`, `/ru`), `hreflang`, zero JS by default | Astro (built-in i18n routing) | Install via npm |
| The film: one hand-written canvas (fireworks, sparks, fire, silhouettes) + one scroll-progress timeline | Plain TypeScript, Canvas 2D; no GSAP, no React | Write it |
| Words and cards: real HTML, animated with `transform`/`opacity` from the same timeline | CSS + the timeline | Write it |
| Fonts: one variable font with Latin + Cyrillic, self-hosted, subset | `fonttools` (pyftsubset) | Check at gestation |
| How browser features are built | `modern-web-guidance` skill | Yes (1.0.1) |
| How it looks, and the motion craft | Impeccable (`animate`, `optimize`, `polish`) | Yes (4.5.0) |
| Touch answers first, calm on request | `calmux` skill | Yes |
| Hosting and the sandbox look | Cloudflare (wrangler 4.166 via `heavy.py run`), branch previews | Yes |
| The one look with pictures | Built-in browser | Yes |

Seonso kit: checked. Its particle, sparkle and text pieces are React + `motion` (too heavy for the speed law), and the React Bits / Aceternity ones may not ship on a public site. Used as reference only.

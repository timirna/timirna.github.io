# TIMIR — Motion Portfolio

Next.js (App Router) + TypeScript + Tailwind CSS v4 + Motion for React, with live Rive and Lottie.
Exported as a static site and deployed to GitHub Pages at https://timirna.github.io.

## Run it locally

```bash
cd web
npm install
npm run dev        # http://localhost:3000
npm run build      # static export into web/out
npm start          # serve web/out
npm run lint && npm run typecheck
```

`npm run dev` and `npm run build` first run `scripts/sync-static.mjs`, which copies the existing
files from the repo root (`/assets`, the `*-preview` demos, `inovetix-reel`, `tavana-lottie-testbench`,
`motiondesk.html`, `admin.html`, `data.json`) into `web/public` so they keep their current URLs.
Earlier versions stay available: the original site at `/classic.html` and the dark redesign at `/dark.html`. Those copies are gitignored — edit the
originals at the repo root. The script also self-hosts the Rive runtime (`/rive/rive.wasm`).

## Deploying

`.github/workflows/deploy.yml` lints, typechecks, builds and publishes `web/out` on every push to `main`.

**One-time switch:** GitHub repo → Settings → Pages → Build and deployment → Source: **GitHub Actions**.
Until you flip this, Pages keeps serving the old `index.html` from the repo root.

## Editing content

| What | Where |
| --- | --- |
| Projects (cards, filters, `/work/[slug]` pages) | `src/data/projects.ts` |
| Homepage rows, Top 10 and the SohoPay films | `homeRows`, `topPicks`, `sohopayFilms` in `src/data/projects.ts` |
| Name, email, verified socials, showreel | `src/data/site.ts` |
| Playground demos | `src/data/playground.ts` |
| Friendly labels for known Rive inputs | `src/data/rive-hints.ts` |
| Design tokens (colours, radii, container) | `src/app/globals.css` |

- A project page is generated for every entry in `projects.ts`. Leave a field out rather than guess;
  `status: "in-progress"` shows an honest "Media in progress" placeholder.
- **Billboard:** the homepage hero is set in `src/app/page.tsx` (title, backdrop, teaser loop and the film Play opens).
- **Rive:** drop `.riv` files in `public/animations/rive/`. Controls are discovered at runtime from the
  file's state machine inputs and data-binding (view model) properties — nothing is hardcoded.
- **Lottie:** drop `.json` files in `public/animations/lottie/`.
- Video and posters live in the repo-root `assets/` folder and are served from `/assets/...`.

## Media still missing

- Showreel video (and captions).
- Reportability, Sports App Fox Mascot, Radar Gift Card, Kiosk Avatar, Cyclist Animation, Book Reveal:
  artwork / files / permission to show (see the `TODO`s in `projects.ts`).
- Some covers load from Fiverr's and Dribbble's CDNs; copy them into `assets/` if you want them self-hosted.

## Contact form

Without configuration the form validates input and opens the visitor's email app with the message filled
in — it never pretends to send. To receive submissions directly, create a free form at
https://formspree.io and build with `NEXT_PUBLIC_FORMSPREE_ID=<your form id>` (add it as a repository
variable and pass it in the workflow's build step). Formspree handles server-side validation and spam
filtering; the form also has a honeypot field.

## Environment variables

| Name | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_FORMSPREE_ID` | No | Enables direct form submission via Formspree |

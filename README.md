# Naufa Habibburahman Farros: personal portfolio

A standalone site: plain HTML, CSS and JavaScript. No build step, no framework, no dependencies (it only loads two Google Fonts, with system-font fallbacks).

## Run

Open `index.html` in a browser. To preview with a local server instead: `npx serve` (or `python3 -m http.server`) in this folder.

## Files

- `index.html`: page structure, About, Beyond the Code, goals, SEO and Open Graph tags.
- `css/style.css`: design tokens at the top (8px scale, orange/white/dark neutrals), then styles. The dark theme is the `[data-theme=dark]` block.
- `js/data.js`: **your content.** Projects, skills, achievements, email and social links.
- `js/main.js`: rendering, theme toggle, menu, filters, animations, ambient sound, and the Beyond the Code dice and puzzle.
- `img/`: your photo (`naufa-hero.jpg` square crop, `naufa-about.jpg` portrait; both from the same photo) and the three project screenshots.

## Animation and sound

- **Animation:** hero headline reveal, typed phrases and code, a node network, rising embers across the whole page (click for a spark burst), a glinting ornament under each section title, torch-flicker glow in the hero, staggered scroll reveals, and hover motion. With "reduce motion" on in the operating system, all of it is switched off.
- **Beyond the Code:** a d20 that tumbles, bursts into sparks on a natural 20 and shakes on a natural 1 (with an advantage option and roll history), and an ARG transmission where you turn a dial to decode the signal.
- **Sound:** the speaker button in the header turns on ambient fantasy sound (a low drone, soft wind and bell notes) plus dice and puzzle sound effects. It is synthesized in the browser, so there are no audio files or licenses to manage. It is off by default and never autoplays.

## Still to fill in

1. LinkedIn: set its `url` in `socials` in `js/data.js`.
2. Project `repo` URLs (code links), if you want them shown.
3. Cita Rasa: confirm `status` (currently "To be confirmed").
4. The Data Referensi screenshot shows the Kemendikdasmen logo. Fine for a class mockup, but crop or blur it if you want to avoid third-party branding.
5. Skill levels are a starting guess. Change `practiced`, `project` or `exploring` to match reality.
6. `index.html`: add `og:image` and `og:url` once the site has a public address.

## Add a project

Copy an object in `projects` in `js/data.js` and edit it. Put a 16:9 screenshot in `img/` and set `image`. Use `demo` plus `demoLabel` for a Figma or live link. Filters and cards update automatically.

## Publish

Upload the folder to GitHub Pages, Netlify (drag and drop) or any static host.

## Not yet verified

This was written without opening it in a browser. Check it at phone, tablet and desktop widths, tab through the page, and test the theme toggle, sound button, project filters, dice and dial.

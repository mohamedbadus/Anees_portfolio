# Fathima Anees A — Portfolio

Personal portfolio site for **Fathima Anees A**, full stack developer
(Java · Spring Boot · React), built as a dependency-free static site.

**Live sections:** About · Work · Stack · Learning · Contact

## Design

The organising idea is *the stack itself*. The hero renders the four layers she
works across — Client, API, Service, Data — as physical slabs with real depth
that respond to the pointer, and the skills section is grouped the same way.
Palette is violet and coral on a warm lilac paper; Bricolage Grotesque for
display, Manrope for body, JetBrains Mono for labels.

Light and dark themes both ship. The theme follows the visitor's system setting
on first load and remembers an explicit choice in `localStorage`.

## Files

```
index.html   markup and all copy
styles.css   design tokens, layout, both themes
script.js    theme switch, scroll reveal, stack parallax, scroll-spy
assets/      portrait + resume PDF
```

No build step, no dependencies.

## Run locally

```bash
npx serve .          # or: python3 -m http.server 4173
```

Then open the printed URL.

## Deploy

Any static host works. For **GitHub Pages**: push to `main`, then
Settings → Pages → Source: *Deploy from a branch* → `main` / `root`.

## Editing

- Copy, contact details and every skill tag live in `index.html`.
- Colours are CSS custom properties at the top of `styles.css` — `:root` for
  light, `[data-theme="dark"]` for dark.
- Replacing `assets/Fathima_Anees_Resume.pdf` updates both resume links.

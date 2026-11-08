# Rework

Open the file that owns the change. Run the matching block in [commands.md](commands.md), then look at the page in the browser.

## Change words on the home list

Edit the frontmatter in `src/content/projects/{slug}.mdx`: `title`, `summary`, `year`, `role`, `tags`, `order`, `status`, `seo`.

The home list and the project route both read this file. `order` is the list position (lower first). Equal `order` values fall back to newer `year` first.

## Change words inside a custom case study

Clarity and airport pickups render components, so the MDX body is unused.

- Clarity: `src/components/projects/clarity/` (`ClarityCaseStudy.astro`, `CaseHero.astro`, `StoryBeat.astro`, `CaseNamed.astro`).
- Airport pickups: `src/components/projects/airport-pickups/AirportCaseStudy.astro`. Draft prose for that story is `src/content/projects/airport-pickups.content.md`. Update the component when the draft is the version you want on the site. Keep that draft valid for the content schema, or move it out of `src/content/projects/`, because every `.md` in that folder is loaded as a project.

Section labels in the right-hand rail are the `sections` array in the composer. Each `id` must match an element `id` on the page. `data-guide` on a section is the line the scroll companion speaks.

## Add a project

Full steps: [src/projects/README.md](../src/projects/README.md).

1. Add `src/content/projects/{slug}.mdx`. The file name is the URL.
2. For a designed page, add `src/components/projects/{slug}/` and one import plus one line in `src/projects/registry.ts`.
3. The composer accepts `year`, `role`, and `next`.
4. Set `status: published` when the page should show the story. `stub` keeps the placeholder when there is no registry entry.
5. `npm run build`, then open `/projects/{slug}/` and the home list.

A published project with no registry line renders its MDX body through `ProjectStub` and `Prose`.

## Add a page that is not a project

Add `src/pages/{name}.astro`, wrap it in `BaseLayout`, and reuse an existing component. Quiet chrome (no header or footer) applies only to `/` and `/projects/…`. Any other path gets the site header and footer.

## Change color, type, or spacing

Edit the custom property in `src/styles/tokens.css`. Components should use `var(--color-*)`, `var(--type-*)`, `var(--space-*)`, `var(--dur-*)`, `var(--ease-*)`.

Dark mode is the `html[data-theme='dark']` block in that same file. Light is the default. The `prefers-color-scheme: dark` block is a fallback if the html theme attribute is missing; change both when a token should differ in the dark theme.

A class used by one component stays in that component’s `<style>`. A class used on many pages goes in `src/styles/global.css`.

## Change images

Put files in `src/assets/projects/{slug}/` and import them in the case-study component so Astro can resize them. Card hover art uses the `cover` field in the MDX frontmatter (`ProjectList.astro`). The first on-screen image loads eagerly; later images stay lazy.

## Theme, phone notch, companion

These survive refresh in `localStorage` (`theme`, `phone-notch`, `companion-enabled`, `companion-variant`). The boot script in `BaseLayout.astro` applies theme, notch, and guide on/off before first paint, including after an Astro view transition (`astro:before-swap`). Theme icons live in `ThemeSwitch.astro` (case settings and stub pages—not the home intro). Guide defaults off; turn it on in `CaseStudyBar.astro` settings.

## After a change

```bash
npm run build
```

Build must pass. Then, with the dev server running, check:

- `/` — titles, summaries, and order
- the project URL you touched
- light (the default) and dark (the theme control)
- a narrow window if the layout moved (the section rail hides below 960px)

`npm run preview` serves the `dist/` folder when you want the production HTML, not the dev server.

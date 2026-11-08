# Map

Static Astro site. `output: 'static'` in `astro.config.mjs`. One stylesheet (`src/styles/global.css`, which imports tokens and reset). MDX is enabled. Images prefer AVIF and WebP. The public site URL in config is `https://roshanashraf.pages.dev`. Deploy is Cloudflare Pages: `npm run build`, output directory `dist`.

## Request path

```
src/content/projects/{slug}.mdx     catalog row (title, year, order, status, …)
        │
        ▼
src/pages/projects/[slug].astro     one route for every catalog file
        │
        ├─ slug is in src/projects/registry.ts
        │     → src/components/projects/{slug}/…CaseStudy.astro
        │
        └─ slug is not in the registry
              → src/components/ProjectStub.astro
                 status: stub       → placeholder
                 status: published  → render the MDX body
```

Home does not hardcode the list. `src/components/ProjectList.astro` reads the `projects` collection and sorts by `order`, then newer `year` first.

`getStaticPaths` in `[slug].astro` uses that same sort and passes `next` (href + title of the following project) into a custom case study.

## Folders

| Path | Job |
|------|-----|
| `src/pages/` | URLs only. `index.astro` is `/`. `projects/[slug].astro` is `/projects/{slug}/`. `404.astro` is the missing page. |
| `src/layouts/BaseLayout.astro` | HTML shell, SEO, theme boot script, the one CSS import. |
| `src/components/` | Shared UI: home intro, project list, theme switch, stub, prose. |
| `src/components/case/` | Blocks reused across case studies: chapters, bands, phone, screen rail, section index, scroll companion, settings bar, next link. |
| `src/components/projects/{slug}/` | Markup that belongs to one project. |
| `src/projects/registry.ts` | Slug → that project’s component. Missing slug means the stub. |
| `src/content/projects/{slug}.mdx` | Catalog frontmatter. Body is used only for a published project with no registry entry. |
| `src/content.config.ts` | Allowed frontmatter fields. |
| `src/assets/projects/{slug}/` | Images. Import them in a component, or point `cover:` at them from MDX. |
| `src/styles/tokens.css` | Colors, type, space, motion. Light values on `:root`. Dark overrides on `html[data-theme='dark']`. |
| `src/styles/global.css` | Classes used on more than one page. |
| `src/styles/reset.css` | Base element reset. |
| `public/` | `favicon.svg`, `robots.txt`. Served as-is. |
| `handbook/` | This folder. |

## Catalog today

File name (without `.mdx`) is the URL slug.

| File | Status | Page |
|------|--------|------|
| `clarity.mdx` | published | `ClarityCaseStudy.astro` |
| `airport-pickups.mdx` | published | `AirportCaseStudy.astro` |
| `signal-to-system.mdx` | stub | `ProjectStub` |
| `fare-clarity.mdx` | stub | `ProjectStub` |
| `quiet-booking.mdx` | stub | `ProjectStub` |

Clarity and airport pickups keep their story in components. Their MDX files are frontmatter only.

`src/content/projects/airport-pickups.content.md` is a writing draft for the airport story. The content loader reads every `.md` and `.mdx` in that folder, and the schema requires `title`, `summary`, `year`, and `role`. A draft in that folder needs that frontmatter, or it needs to live outside `src/content/projects/`, or the build fails.

## Chrome

`BaseLayout` treats `/` and `/projects/…` as quiet pages: no site header, no site footer. `body` gets `page-home`. `main` gets `home-shell` on the home page and `case-shell` on a project. The 404 page gets the header, theme switch, and footer.

Theme is chosen before paint by an inline script in `BaseLayout`:

| `localStorage` key | Values | Effect |
|--------------------|--------|--------|
| `theme` | `light`, `dark` | Sets `html[data-theme]`. Empty means light. |
| `phone-notch` | `with`, `without` | Sets `html[data-phone-notch]`. Empty means no notch. Phone frames hide the island when `without`. |
| `companion-variant` | `dots`, `roshan` | Scroll guide on a case study. Read in `src/components/case/companion-variant.ts`. |

The visible controls for notch and companion are in `CaseStudyBar.astro` (case-study settings). The home and 404 theme buttons are `ThemeSwitch.astro`.

## Case-study pieces

A custom page composes these. Clarity is the reference; airport pickups uses a smaller set.

| Piece | File | Role |
|-------|------|------|
| Composer | `src/components/projects/{slug}/{Name}CaseStudy.astro` | Assembles the page. Props: `year`, `role`, `next`. |
| Top bar | `CaseStudyBar.astro` | Home link and settings. |
| Scroll guide | `CaseCompanion.astro` | Mascot. Sections with `data-guide` supply the line. |
| Section rail | `CaseIndex.astro` | Right-hand ticks. Each `id` matches an element on the page. |
| Phone | `PhoneMockup.astro` | One screen, image or video. |
| Screen row | `ScreenRail.astro` | A row of phones or images. |
| Next | `CaseNext.astro` | Link to the following project. |
| Story blocks | `CaseChapter`, `CaseBand`, `CasePlatePair`, `MetaStrip` | Shared chapter layouts. |

Companion and index behavior that cannot be done in CSS lives in `case-companion.client.ts` and `case-index.client.ts`. Those scripts are loaded by their components. New UI stays as HTML and CSS unless a control needs a script.

## Editing rules already in the repo

Cursor also loads:

- `.cursor/rules/file-structure.mdc` — which folder a new file belongs in.
- `.cursor/rules/project-constraints.mdc` — reuse components and tokens, keep the page static and fast, keep files easy to edit.
- `.cursor/rules/astro-components.mdc` — frontmatter, then HTML, then one `<style>` block.
- `.cursor/rules/css-structure.mdc` — tokens vs global CSS vs a component `<style>`.
- `AGENTS.md` — start the dev server in the background.

When two components need the same value, pass a prop or read it from the content collection. Skip a new `src/lib` folder and a new npm package for logic used once.

# Adding a portfolio project

Every new piece of work needs a **catalog file** in content. A **custom case study page** also needs a component folder and one line in the registry.

You do **not** edit `src/pages/projects/[slug].astro` for a new slug.

## Quick pick

| Goal | Do this |
|------|---------|
| “Coming soon” card + placeholder page | Path **A** only |
| Short story in Markdown | Path **A** with MDX body + `status: published` |
| Full designed case study (like Clarity) | Path **A** + **B** |

---

## Path A — Catalog (always)

1. Create `src/content/projects/{slug}.mdx`. The file name is the URL: `/projects/{slug}/`.

2. Fill frontmatter (see `src/content.config.ts` for allowed fields):

```yaml
---
title: Project name
summary: One line for cards and SEO.
year: 2026
role: Product design
tags:
  - Tag one
order: 2
status: stub
seo:
  title: Optional page title
  description: Optional meta description
---
```

3. Optional: add a **cover** image in frontmatter when you have art for the work grid.

4. Optional: write the **body** below the frontmatter for a simple MDX story (used when there is no custom component in the registry).

The home **Selected work** list reads this collection automatically (`order`, then `year`).

---

## Path B — Custom case study page

Use when the story needs bespoke sections, not just paragraphs.

1. Copy the shape of **Clarity**:
   - Folder: `src/components/projects/clarity/`
   - Composer: `ClarityCaseStudy.astro` (assembles sections)
   - Reuse blocks from `src/components/case/` (`CaseChapter`, `CaseBand`, `CasePlatePair`, `MetaStrip`, `CaseCompanion`, …)

2. Create `src/components/projects/{slug}/` with your composer (e.g. `FareClarityCaseStudy.astro`).

3. Register in **`registry.ts`** in this folder:

```ts
import YourCaseStudy from '../components/projects/{slug}/YourCaseStudy.astro';

export const projectViews = {
  clarity: ClarityCaseStudy,
  '{slug}': YourCaseStudy,
} as const;
```

4. Your composer must accept the same props as Clarity:

- `year` (number)
- `role` (string)
- `next` (`{ href, title } | null` — “next case study” link)

5. Set `status: published` in the MDX frontmatter when the page is ready.

### Optional — scroll companion (viewport guide)

Reuse the particle mascot from Clarity when the story has several scroll beats.

1. At the top of your composer:

```astro
import CaseStudyBar from '../../case/CaseStudyBar.astro';
import CaseCompanion from '../../case/CaseCompanion.astro';

<CaseStudyBar />
<CaseCompanion defaultLine="First line before scroll, or the hero line." />
```

`CaseStudyBar` adds a glass **Home** button at the top left, and a settings button at the bottom right. Settings opens the theme, notch, and guide choices. Guide is **Dots** (default particle) or **Roshan** (Figma-style pointer), saved in `localStorage` as `companion-variant`.

2. On each beat, set **`data-guide`** to the spoken line (first person, one sentence). The companion picks the section closest to the middle of the viewport. The caption shows **only when you hover or focus the mascot** — it stays in the side gutter so it does not sit over the reading column.

```html
<section data-guide="What I changed and why." data-guide-mode="method">
```

3. **Anchor presets** (`data-guide-mode`, optional): `hero` · `work` · `method` · `toolkit` · `faq` · `contact`.  
   If omitted: first section → `hero`, last → `contact`, middle sections cycle `work` / `method` / `toolkit`.

4. Clarity helpers that already wire this: `guideLine` on hero/close sections and `line` on `StoryBeat`. Optional `data-guide-mode` on sections sets companion anchor presets (`hero`, `work`, `method`, `toolkit`, `faq`, `contact`).

### Optional — section index

A fixed rail of ticks on the right. Hover or keyboard focus opens the section list; the current section is marked on the rail and in the list. Click a row to jump there.

```astro
import CaseIndex from '../../case/CaseIndex.astro';

const sections = [
  { id: 'overview', label: 'Project overview' },
  {
    id: 'problem',
    label: 'The problem',
    children: [
      { id: 'number', label: 'The number that started it' },
      { id: 'statement', label: 'Problem statement' },
    ],
  },
  { id: 'results', label: 'Results' },
];

<CaseIndex sections={sections} />
```

Each `id` must match an element on the page. Parents are sections too, not just group labels. The rail stays off the column below 960px wide.

**Clarity catalog-only MDX:** `src/content/projects/clarity.mdx` has frontmatter only; the page UI lives entirely in components.

---

## Optional site touches

- **Home marquee:** add the project title to the `reel` array in `src/pages/index.astro`.

---

## Checklist before you ship

- [ ] `npm run build` passes
- [ ] `/projects/{slug}/` looks right (stub, MDX, or custom)
- [ ] Card on home **Work** section shows correct title, summary, and order
- [ ] If custom: registry entry slug matches MDX file name (without `.mdx`)

---

## Where things live

| What | Where |
|------|--------|
| Card data + route slug | `src/content/projects/{slug}.mdx` |
| Slug → custom page | `src/projects/registry.ts` |
| Default page template | `src/components/ProjectStub.astro` |
| Shared case-study UI | `src/components/case/` |
| Scroll companion (mascot + bubble) | `src/components/case/CaseCompanion.astro` |
| Section index (tick rail + list) | `src/components/case/CaseIndex.astro` |
| Phone mockup (image or video) | `src/components/case/PhoneMockup.astro` |
| Screen row (carousel of phones or images) | `src/components/case/ScreenRail.astro` |
| Next case study link | `src/components/case/CaseNext.astro` |
| Home button and settings panel | `src/components/case/CaseStudyBar.astro` |
| One project’s UI | `src/components/projects/{slug}/` |

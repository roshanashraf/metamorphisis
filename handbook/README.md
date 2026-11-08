# Handbook

Read this folder before changing the site. It is for a person editing the portfolio later, and for an agent doing that work.

The site is a static UX portfolio for **roshanashraf**. Astro builds HTML. MDX files are the project catalog. A few projects have a custom page; the rest use a shared placeholder.

## Read in this order

1. [commands.md](commands.md) — copy a block into the terminal to install, run, build, or preview.
2. [map.md](map.md) — where files live, and how a URL becomes a page.
3. [rework.md](rework.md) — the usual changes, and which file to open.

Deeper “add a project” steps stay in [src/projects/README.md](../src/projects/README.md). Deploy settings stay in the root [README.md](../README.md).

## What to leave alone unless the task needs it

- `src/pages/projects/[slug].astro` already builds a page for every catalog file. A new project does not need a new route file.
- Colors, type, and spacing live in `src/styles/tokens.css`. Shared classes live in `src/styles/global.css`.
- One custom case study lives in `src/components/projects/{slug}/` and is registered in `src/projects/registry.ts`.

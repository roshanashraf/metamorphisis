# roshanashraf

Temporary-brand UX portfolio. Static **Astro** site with **MDX** content collections and CSS-first motion. Deploy target: **Cloudflare Pages** (free tier).

## Local

```bash
npm install
npm run dev
npm run build
npm run preview
```

- Node ≥ 22.23.4
- Build output: `dist/`

## Cloudflare Pages

Connect the GitHub repo `metamorphisis` in the Cloudflare dashboard → Workers & Pages → Create → Connect to Git.

| Setting | Value |
|---------|--------|
| Framework preset | Astro (or None) |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | `/` (repo root) |
| Node version | `22` (set `NODE_VERSION=22` in environment variables if needed) |
| Production branch | `main` |

No paid Cloudflare services required — static assets only.

Preview deployments: enable for pull requests in the Pages project settings.

## Structure

```
src/
  assets/projects/     # covers (Astro image pipeline)
  content/projects/    # MDX stubs → future case studies
  components/          # Hero, ProjectList, ProjectCard, …
  layouts/BaseLayout.astro
  pages/               # / , /projects/[slug] , 404
  styles/              # tokens, reset, global
```

Phase 1 ships three stub projects. Fill MDX bodies and set `status: published` when stories are ready — no route changes needed.

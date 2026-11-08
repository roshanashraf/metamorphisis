# Commands

Copy one block into the terminal from the repo root (`metamorphisis`). Node **22.23.4 or newer**. The dev server is [http://localhost:4321](http://localhost:4321).

## First time on this machine

```bash
node -v
npm install
```

`node -v` should print `v22.23.4` or higher. Then install dependencies once.

## Run the site (foreground)

```bash
npm run dev
```

Leave this terminal open. Stop it with `Ctrl+C`.

## Run the site in the background

Use this when an agent or editor should keep the terminal free. Astro remembers the process.

```bash
npx astro dev --background
```

```bash
npx astro dev status
```

```bash
npx astro dev logs
```

```bash
npx astro dev stop
```

## Check a production build

```bash
npm run build
```

Output lands in `dist/`. Then serve that folder:

```bash
npm run preview
```

Preview also defaults to [http://localhost:4321](http://localhost:4321). Stop it with `Ctrl+C`.

## Pages to open while it is running

```bash
open http://localhost:4321/
open http://localhost:4321/projects/clarity/
open http://localhost:4321/projects/airport-pickups/
open http://localhost:4321/projects/fare-clarity/
open http://localhost:4321/does-not-exist
```

`open` is macOS. On another system, paste the URL into a browser.

| URL | What it is |
|-----|------------|
| `/` | Home: intro and project list |
| `/projects/clarity/` | Custom case study |
| `/projects/airport-pickups/` | Custom case study |
| `/projects/fare-clarity/` | Stub (same pattern for `signal-to-system` and `quiet-booking`) |
| any unknown path | 404 |

## Astro CLI

`package.json` exposes the Astro binary as `npm run astro`.

```bash
npm run astro -- --help
```

```bash
npm run astro -- dev --help
```

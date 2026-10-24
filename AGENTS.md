<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

Where each page lives (templates, data files, edit recipes): `docs/WHERE-PAGES-LIVE.md`. Look up any page with `npm run where -- <slug or URL>`.
Location data is split into one file per page (`src/data/locations/<country>/<state>/<city>.ts`, `src/data/areas/<city>/<area>.ts`); new pages must also be listed in the folder's `index.ts` / `src/data/areas/_all.ts`. `npm run where -- <slug>` prints the file.

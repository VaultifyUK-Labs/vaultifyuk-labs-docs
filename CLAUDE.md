# vaultifyuk-labs-docs — handbook

Public documentation for VaultifyUK Labs, the technology division of VaultifyUK Limited, at
https://docs.labs.vaultifyuk.co.uk. Astro + Starlight, static output, British English.

## How it deploys

- **Cloudflare Workers Builds** (Git integration in the Cloudflare dashboard), not Cloudflare Pages
  and not a GitHub workflow. A push to `main` builds (`npm run build`) and deploys the Worker
  `vaultifyuk-labs-docs` with static assets from `dist/` (`wrangler.jsonc`). The build shows on the
  commit as the check run "Workers Builds: vaultifyuk-labs-docs" (GitHub app
  `cloudflare-workers-and-pages`).
- `main` is protected by the organisation ruleset (pull request required, no force-push, no
  deletion). Every change goes through a short-lived branch and a PR; merge only on John's typed
  "Merge". The merge is the release.
- There is no CI test suite in the repo. Before asking for a merge, run locally:
  `npm ci && npm run build`, then `npx wrangler dev` and check the statuses of changed and
  redirected paths with `curl -s -o /dev/null -w '%{http_code} %{redirect_url}'`.
- Rollback: revert the PR (or roll back the Worker version in Cloudflare, then revert the PR).
- `_redirects` (in `public/`, plus rules appended at build time by the `vault-section-redirects`
  integration in `astro.config.mjs`) is served by Workers static assets; `wrangler dev` reports
  how many rules it parsed.

## Product status and wording

- Smart Collections is **In review**. Public pages must not suggest it is installable, on the
  Shopify App Store, priced, on a plan or trial, or that unconfirmed features exist. Approved
  positioning (use verbatim): "Smart Collections is a planned VaultifyUK Labs product to help
  Shopify merchants keep their catalogues organised and easy to browse. We're reassessing its
  direction as Shopify's own tools evolve."
- Describe Labs as "VaultifyUK Labs, the technology division of VaultifyUK Limited".
- Shared addresses (support email, Labs website, Smart Collections product page, legal links)
  live in `src/data/site.ts`. Change them there, not in individual pages.
- No public "Edit page" links (`editLink` is not configured).

## Withdrawn documentation

Withdrawn on 25 Nov 2026 while Smart Collections is In review (brand alignment brief, section 10).
The source is kept for the `smart-collections-reassessment` job; it is not deleted.

How it works:

- Each page in `src/content/docs/smart-collections/` except `index.mdx` has `draft: true` in its
  frontmatter. Starlight leaves draft pages out of production builds, so they are absent from the
  generated pages, sidebar, prev/next links, the Pagefind search index and the sitemap. They still
  render under `npm run dev` for review.
- The public sidebar shows only the status page (`smart-collections/index.mdx`). The old sidebar
  is kept, unused, as `withdrawnSmartCollectionsSidebar` in `astro.config.mjs`.
- Each withdrawn path (with and without the trailing slash) answers **302** to
  `/smart-collections/` from `public/_redirects`. Temporary because the paths may come back after
  the reassessment. Exact paths only, so any other unknown path is a real 404. No chains.
- Check after any change: `npm run build`, then confirm `dist/` holds only the expected HTML
  pages, `dist/sitemap-0.xml` and `dist/pagefind` list none of the withdrawn pages, and the
  302s answer in one hop under `npx wrangler dev`.

To restore or replace a page (only once its content is approved and accurate):

1. Remove `draft: true` (and the two comment lines above it) from the page.
2. Delete its two lines from `public/_redirects`.
3. Add it to `sidebar` in `astro.config.mjs` (copy from `withdrawnSmartCollectionsSidebar`).
4. Update `smart-collections/index.mdx` and the homepage card so they no longer say the
   documentation is withdrawn. If every page returns, delete `index.mdx` only if a section landing
   page is no longer wanted: the build then adds a 301 from `/smart-collections/` to the first
   sidebar page.
5. Build and run the checks above.

Screenshots in the withdrawn pages point at `/screenshots/placeholder.png`, which never existed:
replace them with real images (`src/assets/screenshots/<product>/`) before restoring a page.

## Related jobs

- Visual alignment (headings, buttons, accent colour): `brand-align-docs-visual`.
- Docs privacy (Cloudflare Web Analytics, browser storage, NEL): `labs-docs-privacy-followups`.
  The forced-dark-mode and sidebar/TOC scripts in `astro.config.mjs` write to `localStorage`;
  change them only through that job.

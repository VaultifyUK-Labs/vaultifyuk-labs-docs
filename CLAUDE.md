# vaultifyuk-labs-docs — handbook

Public documentation for VaultifyUK Labs, the technology division of VaultifyUK Limited, at
https://docs.labs.vaultifyuk.co.uk. Astro + Starlight, static output, British English.

## How it deploys

- **Cloudflare Workers Builds** (Git integration in the Cloudflare dashboard), not Cloudflare Pages
  and not a GitHub workflow. A push to `main` builds (`npm run build`) and deploys the Worker
  `vaultifyuk-labs-docs` with static assets from `dist/` (`wrangler.jsonc`). The build shows on the
  commit as the check run "Workers Builds: vaultifyuk-labs-docs" (GitHub app
  `cloudflare-workers-and-pages`).
- Continuous delivery: the approved merge to `main` is the release. No `develop`, release
  branches, manual promotion or permanent preview. Merge only on John's typed "Merge".
- `main` rules (checked 25 Nov 2026): organisation ruleset "Standard Repository Protection" and
  repository ruleset "Protect Main" (both active, no bypass): pull request required (0
  approvals), no force-push, no deletion.
- Required check: **`Workers Builds: vaultifyuk-labs-docs`** (GitHub app
  `cloudflare-workers-and-pages`, id 85455). It runs `npm run build` on every pushed commit,
  PR branches included, and reports on that exact commit (all 15 recent `main` commits and every
  PR #7 commit had it). Added to "Protect Main" by John in GitHub (the session's GitHub access
  can't write rulesets); until that's done, check it has passed before merging. It stays reliable
  only while Workers Builds builds non-production branches and its build watch paths cover the
  whole repo; if the Worker is renamed, the check name changes and the ruleset must follow.
- Branch previews: Workers Builds builds every pushed branch as a Worker version that is not
  deployed, and comments its Preview URL and Branch Preview URL on the PR
  (`https://<branch>-vaultifyuk-labs-docs.john-b5e.workers.dev`). Preview responses carry
  `x-robots-tag: noindex`. Production is not changed by a branch build.
- `wrangler.jsonc` is the source of truth for the workers.dev settings (applied by every
  production `wrangler deploy`): `workers_dev: false` (the production
  `vaultifyuk-labs-docs.john-b5e.workers.dev` address is off; approved 25 Nov 2026) and
  `preview_urls: true` (branch previews stay on). Keep both explicit: left unset, wrangler turns
  workers.dev back on (no routes are listed) and preview URLs follow it. The custom domain
  `docs.labs.vaultifyuk.co.uk` is attached in the Cloudflare dashboard; `wrangler deploy` leaves it
  alone because the file lists no routes. Don't add routes here without moving the domain too.
- There is no CI test suite in the repo. Before asking for a merge, run locally:
  `npm ci && npm run build`, then `npx wrangler dev` and check the statuses of changed and
  redirected paths with `curl -s -o /dev/null -w '%{http_code} %{redirect_url}'`.
- Rollback: revert the PR; Workers Builds deploys the revert. (A Worker version rollback in the
  Cloudflare dashboard also exists; it needs John's access and isn't part of the routine.)
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
- Interim decisions (John, 25 Nov 2026):
  - Support address is **support@vaultifyuk.co.uk** (text and mailto) until mail for
    @labs.vaultifyuk.co.uk is configured and independently validated (job `labs-email-dns`),
    then back to support@labs.vaultifyuk.co.uk. The withdrawn pages' own text still names
    support@labs; it isn't built.
  - The status page does **not** link to the Smart Collections product page until the new Labs
    website is live and its page has been validated (Labs website cutover job). Don't link
    another page that makes unconfirmed product claims instead.
  - **No link to the Labs website** anywhere (header, phone menu, footer) until the cutover: it is
    still the Squarespace site with unconfirmed product claims. `LABS_URL` stays in
    `src/data/site.ts` (the legal links use it). To restore: a `SocialIcons` override showing a
    "Labs website ↗" link (desktop header and phone menu) and the same link in `SiteFooter.astro`
    (see PR #7's first commit, 1a535c3), then check it resolves to the new site in one hop.
  - The legal links point at `labs.vaultifyuk.co.uk/privacy`, `/terms`, `/cookies`,
    `/subprocessors` (one hop to Squarespace's `www.labs` until the cutover).
- No public "Edit page" links (`editLink` is not configured).

## Withdrawn documentation

**Temporary.** Withdrawn on 25 Nov 2026 while Smart Collections is In review (brand alignment brief, section 10).
The source is kept for the `smart-collections-reassessment` job; it is not deleted.

How it works:

- Each page in `src/content/docs/smart-collections/` except `status.mdx` has `draft: true` in its
  frontmatter. Starlight leaves draft pages out of production builds, so they are absent from the
  generated pages, sidebar, prev/next links, the Pagefind search index and the sitemap. They still
  render under `npm run dev` for review.
- The status page is `smart-collections/status.mdx` (`/smart-collections/status/`). The public
  sidebar shows only that page. The old sidebar
  is kept, unused, as `withdrawnSmartCollectionsSidebar` in `astro.config.mjs`.
- Each withdrawn path, and `/smart-collections/` itself (with and without the trailing slash),
  answers **302** to `/smart-collections/status/` from `public/_redirects`. Temporary because the
  paths may come back after the reassessment. Exact paths only, so any other unknown path is a
  real 404. One hop, no chains.
- Why the status page isn't at `/smart-collections/`: before 25 Nov 2026 that address was a
  **301** to `/smart-collections/overview/`, and browsers keep 301s. A 302 from the overview back
  to `/smart-collections/` looped ("too many redirects") in a browser that had seen the old site
  (proved with Playwright against old and new builds). A browser holding the old 301 now goes
  `/smart-collections/` → overview → status: two hops, no loop.
- Caching: `public/_headers` sends `Cache-Control: no-store` on exactly those 30 redirect paths
  (Workers static assets applies `_headers` to `_redirects` responses; checked under
  `wrangler dev` and on the branch preview), so browsers and the edge never keep them and a
  restored page works from the next deploy. Every other page keeps its normal caching. Never make
  these redirects permanent (301/308).
- `vault-section-redirects` (in `astro.config.mjs`) skips a section that already has a rule in
  `public/_redirects`, so it doesn't add a 301 for `/smart-collections/`.
- Check after any change: `npm run build`, then confirm `dist/` holds only the expected HTML
  pages (`/`, `/smart-collections/status/`, `404`), `dist/sitemap-0.xml` and `dist/pagefind` list
  none of the withdrawn pages, the 302s answer in one hop with `Cache-Control: no-store` under
  `npx wrangler dev` (it reports 30 redirect rules and 30 header rules); repeat on the PR's Branch
  Preview URL.

To restore or replace a page (only once its content is approved and accurate):

1. Remove `draft: true` (and the two comment lines above it) from the page.
2. Delete its two lines from `public/_redirects` and its two entries from `public/_headers`. Keep the `/smart-collections/` 302s until the
   section has a real landing page; never replace them with a 301.
3. Add it to `sidebar` in `astro.config.mjs` (copy from `withdrawnSmartCollectionsSidebar`).
4. Update `smart-collections/status.mdx` and the homepage card so they no longer say the
   documentation is withdrawn. If the whole section returns, decide where `/smart-collections/`
   should go and change its 302 in `public/_redirects` (or remove it to let the build add its
   301 to the first sidebar page, once that page is permanent).
5. Build and run the checks above.

Screenshots in the withdrawn pages point at `/screenshots/placeholder.png`, which never existed:
replace them with real images (`src/assets/screenshots/<product>/`) before restoring a page.

## Related jobs

- Visual alignment (headings, buttons, accent colour): `brand-align-docs-visual`.
- Docs privacy (Cloudflare Web Analytics, browser storage, NEL): `labs-docs-privacy-followups`.
  The forced-dark-mode and sidebar/TOC scripts in `astro.config.mjs` write to `localStorage`;
  change them only through that job.

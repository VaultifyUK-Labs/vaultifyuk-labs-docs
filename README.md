# VaultifyUK Labs Docs

Public documentation and knowledge base for VaultifyUK Labs products, built with Astro Starlight and deployed to [docs.labs.vaultifyuk.co.uk](https://docs.labs.vaultifyuk.co.uk).

## Project Overview

This repository contains the merchant-facing documentation site for VaultifyUK Labs. Each product has its own top-level section in the sidebar. Content is written in Markdown / MDX and served as a static site.

## Current Product Docs

- **Smart Collections**: In review. Its detailed pages are withdrawn from the public build; see `CLAUDE.md`, "Withdrawn documentation".

## Tech Stack

| Layer | Technology |
| --- | --- |
| Framework | [Astro](https://astro.build) |
| Docs theme | [Astro Starlight](https://starlight.astro.build) |
| Content | Markdown / MDX |
| Search | Pagefind (built-in via Starlight) |
| Deployment | Cloudflare Workers Builds (static assets) |

## Local Development

```bash
npm install
npm run dev
```

The dev server runs at [http://localhost:4321](http://localhost:4321).

## Build

```bash
npm run build    # production build → dist/
npm run preview  # preview the production build locally
```

Always run `npm run build` before merging to confirm the site compiles without errors.

## Content Structure

```text
src/
  content/
    docs/
      index.mdx                          # Homepage
      smart-collections/                 # Smart Collections docs
  assets/
    screenshots/                         # Product screenshots (see convention below)
  styles/
    custom.css                           # Theme overrides
astro.config.mjs                         # Astro + Starlight configuration
```

## Screenshot Convention

Screenshots in content files use a placeholder token until the real asset is ready:

```md
![Descriptive alt text](SCREENSHOT_PLACEHOLDER)
```

When adding a real screenshot, place it under the matching product folder and update the reference:

```text
src/assets/screenshots/<product-name>/screenshot-name.png
```

## Deployment

Cloudflare Workers Builds deploys `main` automatically to the Worker `vaultifyuk-labs-docs`, served only on the custom domain `docs.labs.vaultifyuk.co.uk`. Every pull request gets a Cloudflare branch preview (noindex) and the required check `Workers Builds: vaultifyuk-labs-docs`. See `CLAUDE.md` for the release, check, workers.dev and rollback details, and for the temporary withdrawal of the Smart Collections pages and Labs website links.

## Maintenance Notes

- Keep docs merchant-facing — explain what things do, not how they are implemented.
- Avoid technical implementation details unless they directly explain merchant-visible behaviour.
- Add one top-level sidebar group per product in `astro.config.mjs`.
- Keep styling changes minimal and Starlight-compatible; prefer CSS custom properties over component overrides.
- Run `npm run build` before merging any branch.

# SuiteOfficeLab — content and technical review update

Updated source for **https://suiteofficelab.com**. The existing React editors, converters, document viewer, archive browser, media utilities, and site styling remain in the project. The update adds real, visible educational content and transparency pages, not crawler-only text.

## Included improvements

- **48 routes** produce static HTML during the production build; **45 are indexable** and 3 converter aliases are `noindex` and canonicalized to their main tool pages.
- **35 primary application routes** have differentiated task-specific instructions, examples, file-format considerations, and warnings about limitations. The same data powers the live React help sections and statically generated HTML.
- **6 original learning guides** cover CSV data quality, PDF annotations/redaction/signing, Word-to-PDF layout issues, presentation compatibility, video compression, and a general file conversion checklist.
- Accessible `/about`, `/contact`, `/privacy`, and `/terms` pages with contact **cloudcordvoice@protonmail.com**. Keep these documents accurate as your services evolve.
- Persistent footer navigation on every rendered React route, with corresponding links in statically generated HTML.
- Up-to-date sitemap, robots, canonical references, Open Graph metadata, descriptive HTML, structured data, and a real `404.html`.
- Removed the obsolete CRA `public/index.html` file that could collide with the Vite output. `index.html` now shows a single meaningful page to users who disable JavaScript.
- Existing AdSense script and `ads.txt` publisher ID are preserved. **Verify that the publisher ID is yours.**

## Requirements

- Node.js 20.19+ (Node 22 is suitable)
- npm
- Cloudflare account access to the **existing** Worker if deploying there

## Build and deploy from Windows PowerShell

From the folder containing `package.json` and `wrangler.toml`:

```powershell
npm ci
npm run build
npx wrangler login
npx wrangler deploy
```

The Cloudflare Worker configuration is named `suiteofficelab` and deploys the generated `dist/` directory. **Confirm the Worker name and account** before deployment so you don't publish to the wrong service. Direct Wrangler deployment does not require a working GitHub push.

To preview locally:

```powershell
npm run dev
# or after building:
npm run preview
```

The build sequence is Vite client build → route HTML generation → validation. To run validation after a successful build:

```powershell
npm run verify:seo
```

**Cloudflare Git-connected builds:** use `npm ci && npm run build` for build and `npx wrangler deploy` for deployment; the build assets directory is `dist`.

## Important review and privacy checks

1. Test that all editor actions, downloads, file previews and export formats work in real browsers, including mobile.
2. Check that the built HTML served at `/csv`, `/word`, `/pdf`, `/guides/csv-data-quality`, `/privacy`, and `/contact` matches the live React content, and that unrecognized URLs return a 404 status.
3. Add the sitemap in Google Search Console, review indexing and canonicalization, repair any broken pages, and keep content maintained.
4. Use original content and check the rights of third-party material. The Archive feature fetches third-party material; it is not an owned document library.
5. Configure any legally required consent solution for advertising, including a **Google-certified CMP** when required for visitors in the EEA, UK, or Switzerland. This package does **not** include a consent management product.
6. Verify the site owner's publisher ID in `public/ads.txt` and `index.html`, your AdSense account setup, and which pages are appropriate for ads. Do not insert ad units in a way that resembles a download or editing control.
7. Review the Privacy Policy against the actual deployed infrastructure, analytics, and consent configuration. It is provided as a source-based draft, not a legal certification.

## Validation performed for this package

- All source JavaScript/JSX modules passed syntactic parsing with TypeScript's transpiler.
- A **synthetic Vite asset entry** was used to exercise the static HTML generator and verifier; all 48 pages passed both on first and repeat prerender.
- The full **Vite production build could not be verified in this environment** because npm registry requests failed with DNS `EAI_AGAIN`. Rebuild from a machine with functioning npm registry access and test before uploading.

No codebase can guarantee AdSense approval. Google evaluates originality, UX, traffic and ongoing maintenance, and the live site and publisher's account status determine whether ads are allowed.

See `ADSENSE_READINESS_REPORT.md` for a detailed review checklist.

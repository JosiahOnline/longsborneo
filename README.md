# Longs Borneo Travel & Tour

Complete website export, updated 23 October 2026, with 30 original AI illustrations, distinct package images, the original company logo, and Facebook/Instagram footer links.

## Upload to GitHub

1. Create a GitHub repository for the website.
2. Upload the **contents of this folder** to the repository root. Include the entire `dist` folder, `write-pages.cjs`, `package.json`, `vercel.json`, this guide and `.gitignore`.
3. Commit the uploaded files. The repository root should contain `vercel.json` directly, rather than a second enclosing folder.

If using the ZIP, unzip it first. Upload the extracted files, not the ZIP itself.

## Deploy on Vercel

1. In Vercel, add a new project and import your GitHub repository.
2. Keep the Root Directory at the repository root (`./`).
3. The included `vercel.json` supplies these settings:

| Setting | Value |
| --- | --- |
| Framework preset | Other |
| Build command | `npm run build` |
| Output directory | `dist` |
| Install command | Empty — dependency installation is skipped |
| Environment variables | None required |

4. Choose Deploy. When complete, open the Vercel website address.

All images and the logo are included. Website links and the package link in WhatsApp messages automatically use the domain where the website is running. No ChatGPT/Sites account connection is required by the website.

Configuration references: [Vercel project configuration](https://vercel.com/docs/project-configuration/vercel-json) and [build settings](https://vercel.com/docs/builds/configure-a-build).

## Make future changes

- `dist/packages.js`: the 11 packages, itineraries and current per-person pricing.
- `dist/booking-info.js`: attraction fees, booking terms and packing information.
- `dist/content.js`: shared text and language copy.
- `dist/app.js`: website interactions and enquiry flow.
- `dist/styles.css` and `dist/base.css`: appearance and responsive layout.
- `dist/assets/`: photos, company logo and photo credits.
- `write-pages.cjs`: generates the homepage, package pages, legacy redirects and 404 page.

After editing, run `npm run build` from this folder. No dependency installation is necessary. Vercel also runs this command on deployment.

The `dist` folder contains both the editable static assets and generated pages. Keep it in GitHub; do not add it to `.gitignore`.

## Optional local preview

With Node.js and Python 3 available, run these commands from this folder:

```sh
npm run build
python3 -m http.server 4173 --directory dist
```

Then visit [the local preview](http://localhost:4173). Use a local server; opening the HTML file directly will not resolve the root-relative image and script paths.

## Latest layout refinements

The full footer, social links and floating WhatsApp button appear on the homepage. Package pages end with an enquiry button directly above copyright. The social panel uses compact responsive spacing. Story photo captions use emotional phrases while the section retains its sample-story disclosure. The temple image is a revised AI approximation of the real building’s broad roof and proportions.

## Business address and operation hours

The full office address appears above the operation hours wherever hours are displayed: homepage footer and closing section, package enquiry panel, and enquiry form.

Lot 4, First Floor, Storey Shop Lot,
Taman Suria Batu 6, Jalan Lintas Sibuga,
90000 Sandakan, Sabah, Malaysia.

Monday–Saturday, 9am–5pm (Malaysia Time).

## Current website behavior

- WhatsApp enquiries use **+60138193899**. The visitor reviews the enquiry and sends it in WhatsApp. The website does not process payments or confirm bookings.
- All package prices are per person. Existing sample-review disclosures remain as displayed on the website.
- All 30 travel images are original AI illustrations. Their prompts are in `image-prompts.json`, and image metadata is in `dist/assets/image-provenance.json`. The company logo remains the supplied original. Sample traveller stories are fictional and labelled.
- Footer social links point to https://web.facebook.com/longsborneotours and https://www.instagram.com/longsborneo/. App opening depends on the visitor’s device settings.
- Fonts load from Google Fonts; the photos and logo are served from this project.
- Search indexing remains disabled, matching the current website. To enable it later, remove the `noindex,nofollow` meta tags from `write-pages.cjs`, change its generated `robots.txt` to allow crawling, and rebuild.
- This is a standalone static export. Access restrictions are controlled by your hosting settings.

## Export record

Source revision: `2eba6584db80675a1e28488aa9c18e68a3243aa5`.

This copy contains the website and its build/deployment files. The original Sites Git history, hosting identity, account settings and temporary work files are not part of the export.

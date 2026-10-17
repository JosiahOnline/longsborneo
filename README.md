# Longs Borneo Travel & Tour

Complete website export, prepared 17 October 2026, including the latest logo, unique package photos, mobile hero and removal of Ready pop-ups.

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

## Current website behavior

- WhatsApp enquiries use **+60 14-529 2281**. The visitor reviews the enquiry and sends it in WhatsApp. The website does not process payments or confirm bookings.
- All package prices are per person. Existing sample-review disclosures remain as displayed on the website.
- Photo attribution is in `dist/assets/credits.json` and the Photo credits dialog. Keep these credits and licence notices with the images.
- Fonts load from Google Fonts; the photos and logo are served from this project.
- Search indexing remains disabled, matching the current website. To enable it later, remove the `noindex,nofollow` meta tags from `write-pages.cjs`, change its generated `robots.txt` to allow crawling, and rebuild.
- This is a standalone static export. Access restrictions are controlled by your hosting settings.

## Export record

Source revision: `ed45cc7a0f0dc7748e5a539c4167a2d331cea485`.

This copy contains the website and its build/deployment files. The original Sites Git history, hosting identity, account settings and temporary work files are not part of the export.

# HydroAgent Website

This folder contains a standalone static website for HydroAgent and is ready to deploy to GitHub Pages.

## Files

- `index.html`: main landing page
- `styles.css`: visual design and responsive layout
- `script.js`: mobile navigation behavior
- `egu-2026.html`: conference summary page
- `manuscript-brief.html`: manuscript and benchmark brief
- `assets/`: logo, WebUI images, and proof figures

## Notes

- All site assets now live inside this folder, so the site can be deployed directly as a static root.
- Content is based on the current HydroAgent product framing, EGU deck framing, and repository notes.

## Preview

Open `index.html` directly in a browser, or serve the folder with any static file server.

## Deploy To GitHub Pages

1. Create a repository such as `hydroagent-lab.github.io` or any project repo.
2. Upload the full contents of this folder to the repository root.
3. In GitHub, open `Settings -> Pages`.
4. Set the source to deploy from the main branch root.
5. Wait for GitHub Pages to publish the site.

If you use a project repository instead of a user/org site, keep all links relative as they are now.

# Deploy to a `.io` Domain

This site is a static Next.js export. The deployment output is the `out/` folder produced by:

```bash
npm run build
```

## GitHub Pages / github.io

This repository includes `.github/workflows/deploy-github-pages.yml`.

After pushing to GitHub, open the repository settings:

```text
Settings -> Pages -> Source -> GitHub Actions
```

Then push to `master` or `main`. GitHub Actions will build the Next.js static export and deploy `out/`.

For an organization-level github.io site, use this repository name:

```text
HydroAgent-Lab.github.io
```

The public URL will be:

```text
https://hydroagent-lab.github.io/
```

## Recommended Option: Vercel

Use this if you want the simplest setup.

1. Push this project to GitHub.
2. Import the repository in Vercel.
3. Framework preset: `Next.js`.
4. Build command: `npm run build`.
5. Output directory: `out`.
6. Add the custom `.io` domain in Vercel Project Settings → Domains.
7. In your domain registrar DNS, point the domain to Vercel:
   - Apex domain: use Vercel's assigned `A` record.
   - `www`: use Vercel's assigned `CNAME`.

Vercel will issue HTTPS automatically.

## Recommended Option: Cloudflare Pages

Use this if your `.io` domain DNS is already managed by Cloudflare.

1. Push this project to GitHub.
2. Create a Cloudflare Pages project.
3. Build command: `npm run build`.
4. Build output directory: `out`.
5. Add your custom `.io` domain in Pages → Custom domains.
6. Cloudflare will configure HTTPS automatically if DNS is managed there.

## Manual Static Hosting

Any static host works because the site exports to `out/`.

Build locally:

```bash
npm run build
```

Upload the contents of `out/` to the static host.

## DNS Checklist

For a domain like `hydroagent.io`:

- `hydroagent.io` should point to the hosting provider's apex target.
- `www.hydroagent.io` should usually be a `CNAME`.
- Enable HTTPS.
- Redirect `www` to apex or apex to `www`, but choose one canonical version.

## After Deployment

Check these routes:

- `/`
- `/platform/`
- `/workflow/`
- `/research/`
- `/team/`
- `/contact/`
- `/zh/`
- `/zh/platform/`
- `/zh/workflow/`
- `/zh/research/`
- `/zh/team/`
- `/zh/contact/`

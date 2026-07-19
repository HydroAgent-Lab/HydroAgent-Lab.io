# HydroAgent-Lab Website

Multi-page bilingual (en/zh) website for HydroAgent-Lab, built with Next.js 15 App Router and exported as static files.

## Development

```bash
npm install
npm run dev -- -p 3001
```

## Production build

```bash
npm run build
```

The exported static site is generated in `out/`.

## Analytics

Google Analytics 4 (Measurement ID `G-6G0RNE8L4Z`) is loaded site-wide via `next/script` in `app/layout.js`, so every route (en + zh) is tracked.

## Project Structure

```
app/                      # Next.js App Router pages (en + zh, 24 pages total)
  globals.css             # CSS entry point (@imports all styles)
  layout.js               # Root layout
  page.js                 # Home (en)
  zh/                     # Chinese locale mirror
  platform/, capabilities/, workflow/, research/, runs/, team/, careers/, contact/
  white-papers/, events/, members/   # New placeholder pages

components/
  hero.js                 # Hero section — split layout (left text/CTA, right autoplay video)
  shell.js                # Site shell (dropdown nav + hamburger menu + footer)
  pages/                  # Per-page content components
    home.js, platform.js, capabilities.js, workflow.js,
    research.js, runs.js, team.js, careers.js, contact.js,
    white-papers.js, events.js, members.js
  cta-band.js, page-lead.js, section-header.js,
  capability-directory.js, product-preview.js, highlight-grid.js

content/
  site.js                 # Re-export assembler (imports sub-modules, exports getSiteContent + helpers)
  helpers.js              # Utility functions (normalizePath, localizeHref, stripLangPrefix, getLanguageSwitchHref)
  team-members.js         # hydroAgentTeamMembers array (15 members)
  nav.js                  # Nested 2-level nav structure, footer groups, CTA, switchLabel (en/zh)
  pages/                  # Per-page bilingual content
    home.js, platform.js, capabilities.js, workflow.js,
    research.js, runs.js, team.js, careers.js, contact.js,
    white-papers.js, events.js, members.js

styles/
  tokens.css              # CSS custom properties (colors, spacing, fonts)
  base.css                # Reset, body defaults, page-shell
  typography.css          # Headings, eyebrow, lang-zh adjustments
  nav.css                 # Site header/nav (dropdown, hamburger, drawer)
  hero.css                # Hero section
  sections.css            # Shared section layouts, cards, grids, buttons
  footer.css              # Site footer
  pages/                  # Per-page styles
    home.css, platform.css, capabilities.css, workflow.css,
    research.css, runs.css, team.css, careers.css, contact.css
```

## Design Language
- Gray scale: white #FFFFFF (`--surface-elevated`) → light gray #E5E5E5 (`--bg`, `--surface`) → mid gray #CBCCCC (`--bg-alt`, borders); dark accents #3E3F40 / #1F2021 / #060606 (`--dark-1/2/3`, for dark buttons etc.); brand blue in OKLCH sourced from the logo — `--accent` oklch(51% 0.15 258) ≈ #2570c0, `--accent-hover` deeper, `--accent-light` oklch(74% 0.09 235). NOTE: some section backgrounds are still hard-coded #fff / #F9FAFB and don't follow these tokens
- Split-layout hero: left text/CTA column + right autoplay demo video
- Multi-level nav: 5 top-level items, hover dropdown on desktop, hamburger drawer on mobile (≤900px)
- Type pairing: Inter Tight (display / headings `--font-display`) + Inter (body `--font`), loaded via next/font in app/layout.js, with CN fallback (PingFang SC / Microsoft YaHei)
- Named easings `--ease-out/in/in-out`; global `:focus-visible` ring; clean minimal cards, 200ms hover transitions
- Body text uses `--text-muted: #5f6773` (≈5.7:1 on white — meets WCAG AA)
- Home "Why Trust It" section: photo evidence cards (`.evidence-*`) — 5 river/basin photos (Unsplash License, free commercial use), label + full evidence text over a bottom scrim, no hover-flip. Titles align on a fixed baseline (`.evidence-overlay` absolute `top`, not flex-end) so all cards start at the same line. Grid capped at 1000px for side whitespace
- Dark theme placeholder in `styles/tokens.css` (via `[data-theme="dark"]`)

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
- Light background (#f0f0ee), pill navbar (#EDEDED), blue accent (#3B82F6)
- Split-layout hero: left text/CTA column + right autoplay demo video
- Multi-level nav: 5 top-level items, hover dropdown on desktop, hamburger drawer on mobile (≤900px)
- System font stack, clean minimal cards, 200ms hover transitions
- Dark theme placeholder in `styles/tokens.css` (via `[data-theme="dark"]`)

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

### Hero CTA 点击埋点

首页 hero 三个按钮通过 `components/track-link.js`（`TrackLink`，唯一的 client 组件边界，`hero.js` 仍是 Server Component）上报 GA4 自定义事件 `cta_click`，参数：

| 参数 | 说明 | 示例 |
|---|---|---|
| `cta_location` | 位置 | `hero` |
| `cta_id` | **稳定标识**，由未本地化路径推导，使 en/zh 可聚合 | `platform` / `demo` / `contact` |
| `cta_rank` | 视觉槽位（非标签），标签互换后仍可独立分析"哪个槽位被点" | `primary` / `secondary` / `tertiary` |
| `cta_label` | 实际显示文字，便于核对 | `Explore HydroAgent-FF` |
| `site_language` | 页面所属语言路由 | `en` / `zh` |

> 注意参数名是 `site_language` 而非 `language` —— 后者是 GA4 **内置**参数（访客浏览器语言），会冲突；且语义不同：浏览器为英文的访客也可能在看 zh 路由。

> **必须在 GA4 后台操作一次**：「管理 → 媒体资源设置 → 媒体资源 → 自定义分析数据 → 创建自定义维度」，把 `cta_id`、`cta_rank`、`site_language` 注册为**事件范围**（Event scope）自定义维度，否则这些参数不会出现在报表里（DebugView / 实时报告可以立刻看到，但标准报表看不到）。注册后数据从注册时刻起累积，不追溯历史。

`TrackLink` 对 `window.gtag` 做存在性检查：gtag 以 `afterInteractive` 加载，极快的点击可能赶在它之前，此时事件静默丢弃而不抛错 —— 导航永远不依赖埋点。

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
- Hero CTA cluster: **2+1 等宽网格，宽度收缩到最长标签**。`.hero-actions` 是 2 列 grid（`repeat(2, minmax(0, 1fr))`），第三个按钮自动落到第二行第一列，三个共用一个宽度。关键是 `width: max-content`：在 intrinsic sizing 下 CSS Grid 规范会把**所有 fr 轨道统一到最大轨道的 max-content 贡献**，因此两列都等于最长按钮（"Explore HydroAgent-FF"）的宽度，而不是各列按自身内容算 —— 既等宽又不拉伸，且无硬编码 px，中文页自动量出更窄的宽度。标签左对齐、箭头 `space-between` 右推，形成竖直箭头线（"乱"的根源是宽度参差，不是样式差异）。按钮内 `gap: 24px` 是最长按钮唯一的呼吸空间，因此它同时决定整组宽度（调宽窄的单一控制点）。只有 `.primary-action`（Try the demo）填色以保留主次。901–1400px 降为单列（文案栏仅 stage 的 34%，两列约 450px 放不下）；≤560px 单列且**不全宽** —— `width: max-content` + `min-width: 66%` + `max-width: 100%`，常态取 66%（三条通栏色块会像一堵墙），极窄屏由 `max-content` 兜底以免最长标签被截断。所有样式都限定在 `.hero-actions` 作用域内，因为 `.primary-action`/`.secondary-action` 与 `components/cta-band.js` 共用。三个 CTA 路径在 `content/pages/home.js` 里存无前缀值，由 `components/hero.js` 统一经 `localizeHref` 本地化
- Multi-level nav: 5 top-level items, hover dropdown on desktop, hamburger drawer on mobile (≤900px)
- Type pairing: Inter Tight (display / headings `--font-display`) + Inter (body `--font`), loaded via next/font in app/layout.js, with CN fallback (PingFang SC / Microsoft YaHei)
- Named easings `--ease-out/in/in-out`; global `:focus-visible` ring; clean minimal cards, 200ms hover transitions
- Body text uses `--text-muted: #5f6773` (≈5.7:1 on white — meets WCAG AA)
- Home "Why Trust It" section: photo evidence cards (`.evidence-*`) — 5 river/basin photos (Unsplash License, free commercial use), label + full evidence text over a bottom scrim, no hover-flip. Titles align on a fixed baseline (`.evidence-overlay` absolute `top`, not flex-end) so all cards start at the same line. Grid capped at 1000px for side whitespace
- Dark theme placeholder in `styles/tokens.css` (via `[data-theme="dark"]`)
- Demo 页色彩**三级配给制**（`styles/pages/demo.css`）：品牌蓝是稀缺资源，不是装饰。**L1 实心 `--accent`** 仅给发送按钮与结束 CTA（二者不同屏，故同屏最多 2 处实心蓝）；**L2 `--accent` 描边 / `--accent-wash` 淡底**给激活场景卡与结果卡（「当前」与「结论」）；**L3 中性灰**给用户气泡（`--dark-1`）、头像、checkbox、回放点 —— 它们不需要引导注意力。改此页配色时请维持这个配给，不要因为「这里加点蓝更好看」而回到 11 处蓝的状态
- Research 页首篇论文用 **Featured 头条块**（`.research-featured`），不是书目列表。原因：`research-paper-list` 为 N 篇设计，N=1 时那个 `01` 序号是负资产 —— 它在明说「我们只有一篇」。渲染分支在 `components/pages/research.js`：`papers.find(p => p.featured)` 走头条版式，其余走列表，第 2 篇起自动接管。版式为 55/45 非对称两栏（左结论、右研究事实表），**论文图整幅横跨、不进右栏** —— Figure 1 约 1.8:1 且标签密集，放进 45% 栏后等效字号只有 5–7px，不可读。**预印本徽章刻意用中性描边而非实心蓝**，并把「未经同行评审」写成字：预印本与已发表若视觉等权，是实验室主页最常见的可信度失分点。空状态虚线框仅在 `papers.length === 0` 时渲染，否则降级为一行尾注（虚线空框与已发布论文并存是自相矛盾的）
- 已知遗留：无（`--border` / `--border-strong` 的重复值已于 2026-07-25 修正为 #CBCCCC / #AEB0B2）

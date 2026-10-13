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

首页 hero 三个按钮通过 `components/track-link.js`（`TrackLink`，hero 里唯一的 client 组件边界，`hero.js` 仍是 Server Component）上报 GA4 自定义事件 `cta_click`，参数：

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
  platform/, capabilities/, demo/, research/, team/, careers/, contact/
  white-papers/, events/, members/   # White papers (v1.0.0 live), events, lab members
  paper-digest/           # Product → Paper Digest: daily AI-paper email sign-up (backend pending)

components/
  hero.js                 # Hero section — split layout (left text/CTA, right autoplay video)
  shell.js                # Site shell (dropdown nav + hamburger menu + footer)
  pages/                  # Per-page content components
    home.js, platform.js, capabilities.js, demo.js,
    research.js, team.js, careers.js, contact.js,
    white-papers.js, events.js, members.js, paper-digest.js
  news-carousel.js        # Home NEWS carousel — client component (scroll-snap track + dots)
  cta-band.js, page-lead.js, section-header.js,
  breadcrumb.js, demo-chat.js, track-link.js
  subscribe-form.js       # Paper Digest email form — client component; backend stub `sendSubscription`

content/
  site.js                 # Re-export assembler (imports sub-modules, exports getSiteContent + helpers)
  helpers.js              # Utility functions (normalizePath, localizeHref, stripLangPrefix, getLanguageSwitchHref)
  team-members.js         # hydroAgentTeamMembers array (15 members)
  nav.js                  # Nested 2-level nav structure, footer groups, CTA, switchLabel (en/zh)
  pages/                  # Per-page bilingual content
    home.js, platform.js, capabilities.js, demo.js,
    research.js, team.js, careers.js, contact.js,
    white-papers.js, events.js, members.js, paper-digest.js

public/assets/            # Static assets for the Next app — see ASSETS_GUIDE.md
  brand/ home/ platform/ careers/ contact/ team/ lab-members/
  hydroagent_webui/ demo/ events/ EGU26/ papers/ white-papers/
                          # Grouped by consuming page, not by file type. No loose files at
                          # root, and no .md files — everything here is published to the web.

archive/figures/          # Unreferenced source figures — kept in git, NOT deployed (30 MB)

styles/
  tokens.css              # CSS custom properties (colors, spacing, fonts)
  base.css                # Reset, body defaults, page-shell
  typography.css          # Headings, eyebrow, lang-zh adjustments
  nav.css                 # Site header/nav (dropdown, hamburger, drawer)
  hero.css                # Hero section
  sections.css            # Shared section layouts, cards, grids, buttons
  footer.css              # Site footer
  pages/                  # Per-page styles
    home.css, platform.css, capabilities.css, demo.css, research.css, white-papers.css,
    events.css, team.css, careers.css, contact.css, designv2.css, paper-digest.css
```

## Design Language
- Gray scale: white #FFFFFF (`--surface-elevated`) → light gray #E5E5E5 (`--bg`, `--surface`) → mid gray #CBCCCC (`--bg-alt`, borders); dark accents #3E3F40 / #1F2021 / #060606 (`--dark-1/2/3`, for dark buttons etc.); brand blue in OKLCH sourced from the logo — `--accent` oklch(51% 0.15 258) ≈ #2570c0, `--accent-hover` deeper, `--accent-light` oklch(74% 0.09 235). NOTE: some section backgrounds are still hard-coded #fff / #F9FAFB and don't follow these tokens
- Split-layout hero: left text/CTA column + right autoplay demo video
- Hero CTA cluster: **2+1 等宽网格，宽度收缩到最长标签**。`.hero-actions` 是 2 列 grid（`repeat(2, minmax(0, 1fr))`），第三个按钮自动落到第二行第一列，三个共用一个宽度。关键是 `width: max-content`：在 intrinsic sizing 下 CSS Grid 规范会把**所有 fr 轨道统一到最大轨道的 max-content 贡献**，因此两列都等于最长按钮（"Explore HydroAgent-FF"）的宽度，而不是各列按自身内容算 —— 既等宽又不拉伸，且无硬编码 px，中文页自动量出更窄的宽度。标签左对齐、箭头 `space-between` 右推，形成竖直箭头线（"乱"的根源是宽度参差，不是样式差异）。按钮内 `gap: 24px` 是最长按钮唯一的呼吸空间，因此它同时决定整组宽度（调宽窄的单一控制点）。只有 `.primary-action`（Try the demo）填色以保留主次。901–1400px 降为单列（文案栏仅 stage 的 34%，两列约 450px 放不下）；≤560px 单列且**不全宽** —— `width: max-content` + `min-width: 66%` + `max-width: 100%`，常态取 66%（三条通栏色块会像一堵墙），极窄屏由 `max-content` 兜底以免最长标签被截断。所有样式都限定在 `.hero-actions` 作用域内，因为 `.primary-action`/`.secondary-action` 与 `components/cta-band.js` 共用。三个 CTA 路径在 `content/pages/home.js` 里存无前缀值，由 `components/hero.js` 统一经 `localizeHref` 本地化
- Multi-level nav: 5 top-level items, hover dropdown on desktop, hamburger drawer on mobile (≤900px)
- Type pairing: Inter Tight (display / headings `--font-display`) + Inter (body `--font`), loaded via next/font in app/layout.js, with CN fallback (PingFang SC / Microsoft YaHei)
- Named easings `--ease-out/in/in-out`; global `:focus-visible` ring; clean minimal cards, 200ms hover transitions
- Body text uses `--text-muted: #5f6773` (≈5.7:1 on white — meets WCAG AA)
- 首页 **NEWS 板块**（首屏正下方，2026-10-12）：scroll-snap 轨道一屏一张卡，宽 880px，**和 "News" 标题左对齐，没有边框和底色**。同日用 Hallmark 改过：原来那版带边框、居中，比标题缩进去一截，缩略图又自带边框，在无框的首屏下方显得突兀。现在缩略图带纸张投影（和白皮书页封面同一手法），圆点在标题行右端；悬停或键盘聚焦时整块浮出 `--accent-wash` 淡蓝底。卡片的 padding 就是淡蓝底伸出的部分，轨道用负 margin 抵消，所以内容仍然对齐标题。CSS 区块顶部有 Hallmark 组件标记。条目在 `content/pages/home.js` 的 `newsSection.items`，**按时间倒序，每条链到站内详情页**（arXiv / DOI 外链放在详情页上）。加新闻就在两种语言的数组最前面各加一条，缩略图统一 480×678。`components/news-carousel.js` 渲染标题行和卡片，JS 只负责两件事：圆点跟随滚动位置，点圆点滚到对应卡片；JS 不运行时照样能滑。圆点：未选中是空心圆圈，当前是圆圈加实心圆点；点击区 24px，圆圈用 `--text-muted`，满足 3:1 的非文本对比度。整张卡是一个链接（标题链接的 `::after` 撑满卡片）。摘要限宽 62ch；手机上"阅读详情"紧跟摘要，桌面上和缩略图底边对齐。英文白皮书卡片不译标题（还没有官方英文版）；预印本标题在 zh 页保持英文，并标 `lang="en"`。手动滑动，不自动轮播（用户决定）
- Home "Why Trust It" section: photo evidence cards (`.evidence-*`) — 5 river/basin photos (Unsplash License, free commercial use), label + full evidence text over a bottom scrim, no hover-flip. Titles align on a fixed baseline (`.evidence-overlay` absolute `top`, not flex-end) so all cards start at the same line. Grid capped at 1000px for side whitespace
- Dark theme placeholder in `styles/tokens.css` (via `[data-theme="dark"]`)
- Demo 页色彩**三级配给制**（`styles/pages/demo.css`）：品牌蓝是稀缺资源，不是装饰。**L1 实心 `--accent`** 仅给发送按钮与结束 CTA（二者不同屏，故同屏最多 2 处实心蓝）；**L2 `--accent` 描边 / `--accent-wash` 淡底**给激活场景卡与结果卡（「当前」与「结论」）；**L3 中性灰**给用户气泡（`--dark-1`）、头像、checkbox、回放点 —— 它们不需要引导注意力。改此页配色时请维持这个配给，不要因为「这里加点蓝更好看」而回到 11 处蓝的状态
- Research 页首篇论文用 **Featured 头条块**（`.research-featured`），不是书目列表。原因：`research-paper-list` 为 N 篇设计，N=1 时那个 `01` 序号是负资产 —— 它在明说「我们只有一篇」。渲染分支在 `components/pages/research.js`：`papers.find(p => p.featured)` 走头条版式，其余走列表，第 2 篇起自动接管。版式为 55/45 非对称两栏（左结论、右研究事实表），**论文图整幅横跨、不进右栏** —— Figure 1 约 1.8:1 且标签密集，放进 45% 栏后等效字号只有 5–7px，不可读。**预印本徽章刻意用中性描边而非实心蓝**，并把「未经同行评审」写成字：预印本与已发表若视觉等权，是实验室主页最常见的可信度失分点。空状态虚线框仅在 `papers.length === 0` 时渲染，否则降级为一行尾注（虚线空框与已发布论文并存是自相矛盾的）
- **Gutter padding 与 max-width 不能写在同一个元素上**（2026-09-17 修复 Platform hero 后立的规矩）。全站用 `padding: … max(28px, calc(50vw - 540px))` 让内容对齐 1080px 居中列；这个左内边距**随视口无限增长**，而全局 `* { box-sizing: border-box }` 让 `max-width` 限制的是边框盒 —— 两者同框时，内容宽度 = `cap − padding`，视口越宽内容越窄，直至归零。正确写法是**外层只管 padding、内层只管 max-width**，见 `.cta-band`/`.cta-copy`、`.careers-frame`/`.careers-hero-inner`、`.platform-hero-copy`/`.platform-hero-copy-inner`。`tests/test_platform_hero_width.py` 有一条全站守卫测试防止复发
- 首页 Hero 截图是**无边框的切角矩形**，不是显示器边框。左上 / 右下两角以 45° 切掉，形状由 `--cut` 驱动的 `clip-path: polygon()` 定义，且**截图、蓝色光晕叠层、边缘光带三层必须共用同一条 clip-path**，否则叠层会沿着截图并不存在的边缘走。阴影用 `filter: drop-shadow()` 而非 `box-shadow` —— 后者描的是元素盒子，会把切角抹平。`tests/test_hero_monitor.py` 锁定了这几条（断言限定在 `.hero-monitor` 规则体内，不做全文件字符串搜索）
- Events 页分两层：**Collaborations 区块在上、活动时间线在下**（`components/pages/events.js`）。时间线记录一次性线下事件（有日期、有现场照片、事后不再变），而开放倡议会持续产出 results 和论文 —— 把 HydroTuring 塞进 zigzag 会同时踩两个坑：它没有现场照片（渲染成灰色占位块），也没有"更新"这一层。`collabSection.items[].updates` 是预留的追加位，后续进展只往数组里加，不动组件和样式。**版式直接复用时间线的 `.event-row` / `.event-row-body`**，只把媒体列换成 `.collab-row-media`（logo 要 contain + 留白，照片是 cover 裁切）—— 一页上放两套视觉语言（带边框的卡片 + 无边框的照片行）是这个区块第一版被推翻的原因。论文正式发表后再考虑在 Research 页单列一条
- **新 class 名先全局 grep 再用**：`styles/` 下所有 CSS 都由 `app/globals.css` @import 进同一个全局作用域，没有 CSS Modules。上面这个区块第一版取名 `.collab-card`，而 `styles/pages/capabilities.css` 里早有一套同名卡片（padding / hover / h3 / p 全都定义了），于是 Events 页的卡片静默继承了 Capabilities 页的样式 —— 构建不报错，只是变丑。页面专属 class 请带页面前缀或足够特异的词根
- White Papers 页首期 v1.0.0（2026-10-07，Zenodo DOI `10.5281/zenodo.23230110`，仅中文）。**有正式发布的语言（目前只有 zh）走出版物布局 `.wp-pub-*`**（2026-10-10 用 Hallmark 重做，CSS 顶部有标记与 slop-test 结果）：首屏左右分栏 —— 封面 | 标题、两个按钮、一行信息（版本 · 发布日 · 证据截至 · DOI）；下方"三项核心结论"与"关于这份白皮书"在首屏文字栏的左边线上排成单栏，宽 38rem（≈ 每行 36 个汉字）。没有卡片容器、没有眉标、全页一条分隔线；中文标题字距 0、正文行高 1.8；页面级间距/字号刻度挂在 `.white-papers-page` 上（`--wp-space-*` / `--wp-text-*`），不进全局 tokens。**完整版链 DOI，不链 Zenodo 文件直链**（发布两天后文件被改名，直链即 404）；速读版托管在 `public/assets/white-papers/`（2026-10-10 换成用户提供的新字体版，文件名不变）；英文版是"即将推出"占位（`links[].comingSoon`，有文件后换成 `href`）。**en 页是 coming soon + 一个"Read the Chinese edition ↗"按钮**（`papers: []` → PageLead + 空状态 + 更新频率；按钮来自 en `lead.action`，经 PageLead 的可选 `actions` 插槽渲染在标题下，链 DOI，和 zh 主按钮共用 `fullReportHref`）：英文版出来之前不发布任何非官方英文译文（用户决定）；英文版上线后 en 走出版物布局，按钮随兜底首屏一起消失。更新频率只保留"每季度白皮书 / 每年年度综述"，出版物布局里的"更新计划"由 `cadenceSection.items` 生成，一处维护。第 2 期需另设计归档列表（目前非 featured 条目不渲染）。`.hallmark/` 是 Hallmark 的运行记录（log + preflight），下次运行会读取
- **Paper Digest 页**（2026-10-13，Product 下第 4 项，`/paper-digest`）：每日抓取最新 AI 大模型论文、AI 提取总结后邮件推送的订阅页。整页只有 PageLead —— 左边标题 + 邮箱表单（经 `actions` 插槽），右边说明 + 3 行事实。**后端由同事另行部署**：接口是 `components/subscribe-form.js` 顶部的 `sendSubscription(email, lang)` 存根。请求成功时返回 `true` 或 fetch 的 Response，失败就抛错。`outcomeOf` 只把 `true` 和 `ok` 的 Response 算作成功，所以 `return fetch(...)`、`return res.ok` 两种写法遇到 4xx/5xx 都会显示失败，**不会对访客谎称已订阅**。接上之前存根返回 `NOT_CONNECTED`，表单显示"订阅功能即将开放"。CORS 要放行 `https://hydroagentlab.com`，并响应 OPTIONS 预检（JSON 请求一定会先发预检）。页面脚本加载完之前提交按钮是禁用的，否则浏览器会按原生 GET 提交，把邮箱放进网址（浏览器历史、服务器日志、GA 都会看到）。这时按钮不变暗，免得每次加载都闪一下；只有提交中才变暗（`.is-busy`）。输入框字号 16px：iOS 遇到小于 16px 的输入框，聚焦时会自动放大。按钮的两种文字叠放在同一格里，提交时宽度不变。校验由组件自己做（`noValidate`），提示语跟页面语言走。首页 NEWS 暂不加这条，等服务上线后再加（用户决定）
- **产品命名**（2026-10-13，用户决定）：
  - 首页板块标题、产品页大标题写全称：en 用 "HydroAgent for Flood Forecasting"，zh 用"洪水预报智能体"
  - 产品页正文第一次出现时，全称后括注简写：en 写 "HydroAgent for Flood Forecasting (HydroAgent-FF)"，zh 写"洪水预报智能体（HydroAgent-FF）"
  - 其他位置用 HydroAgent-FF（注意大写 H）：导航、页脚、按钮（"Explore HydroAgent-FF"）、视频角标、后文
  - 同理，en 产品页里 LLM 第一次出现时写 "large language model (LLM)"
  - 英文全称的断行：桌面和平板一行，手机两行，断成 "HydroAgent for / Flood Forecasting"（用户决定）
    - 产品页文字列 `.platform-hero-copy-inner` 宽 600px，因为 40px 字号下一行需要 578px，原来的 564px 放不下
    - 两处标题都加了 `text-wrap: balance`，保证 "Flood Forecasting" 不被拆开
- 已知遗留：① 所有子页 `<link rel="canonical">` 与 `og:url` 都指向首页、OG 标题也是首页文案 —— 根源是 `app/layout.js` 的 `alternates.canonical: "/"` 与 `openGraph.url`，会妨碍子页被收录、分享卡片显示错误；② 22 个子页 `<title>` 后缀重复（如 "White Papers | HydroAgent-Lab | HydroAgent-Lab"）—— 页面 title 已含后缀，又叠加了 layout 的 `%s | HydroAgent-Lab` 模板；③ 根节点恒为 `<html lang="en">`，/zh 页也一样（`SiteShell` 只加 `lang-zh` 类），中文内容需在元素上自行标 `lang="zh-CN"`；④ `html` / `body` 没有 `overflow-x: clip`（Hallmark 的硬性要求，目前实测 320–1440px 无横向滚动）；⑤ `styles/pages/demo.css:119` 有 autoprefixer 警告（`start` 建议改 `flex-start`）。均待修

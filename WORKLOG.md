# Work Log

## 2026-06-27

### 首页 WHO IT SERVES 卡片加高

将首页"适用对象 / Who It Serves"区域的三张卡片（`.scroll-card`）高度加长，新增 `min-height: 260px`。该样式由中英文版本共用，故一处修改即同时生效。

**Files modified:**
- `styles/pages/home.css` — `.scroll-card` 新增 `min-height: 260px`

### 首页 WHO IT SERVES 卡片高度回退 + 手机端宽度缩减 20%（同日修订）

- **网页端恢复**：移除 `.scroll-card` 的 `min-height: 260px`，恢复为由内容/padding 决定的原始高度。
- **手机端宽度 -20%**：`@media (max-width: 900px)` 下 `.scroll-card` 的 `min-width` 由 `44vw` 改为 `35.2vw`（44 × 0.8）。

**Files modified:**
- `styles/pages/home.css` — `.scroll-card` 移除 `min-height`；移动端 `min-width` 44vw → 35.2vw

### 首页 WHO IT SERVES 三卡尺寸统一 + 手机端固定宽度（同日修订）

- **电脑端**：`.scroll-strip` 本身为 `grid repeat(3,1fr)` + 默认 `stretch`，三卡已等宽等高，无需改动。
- **手机端**：`.scroll-card` 原 `min-width: 35.2vw` 无上限，最长文案卡会被撑到一行那么宽 → 三卡不等宽。改为固定 `flex: 0 0 52vw`，三卡等宽、收窄后长文案自然换两行，`flex` 默认 `stretch` 保证等高。

**Files modified:**
- `styles/pages/home.css` — 移动端 `.scroll-card` 由 `min-width: 35.2vw` 改为 `flex: 0 0 52vw`

### 首页 WHO IT SERVES 手机端短正文孤字修复（同日修订）

第一张卡中文正文"水文预报机构和业务团队"（11 字）在 52vw 下末字"队"被挤到第二行（孤字难看）。手机端卡片略加宽 + 缩小内边距给文字腾空间：`flex: 0 0 52vw → 54vw`，新增 `padding: 26px 16px`（桌面 32px 28px 不变）。短正文可放一行，最长第三张卡仍换两行，stretch 保持等高。

**Files modified:**
- `styles/pages/home.css` — 移动端 `.scroll-card` 宽度 52vw→54vw，新增 `padding: 26px 16px`

### 首页 WHO IT SERVES 手机端正文均衡换行（同日修订）

手机端 `.scroll-card p` 新增 `text-wrap: balance`，让多行正文各行长度更均衡，避免末行单字孤行。

**Files modified:**
- `styles/pages/home.css` — 移动端新增 `.scroll-card p { text-wrap: balance; }`

### 首页 Hero 背景由视频改为静态图（同日修订）

将 Hero 背景的 `<video>`（CloudFront mp4）替换为静态图片 `<img src="/assets/webui_light.jpg">`，保留 `hero-video-bg` class 以继承 `object-fit: cover` 及 `transform: scale(1.4)` 等样式。注意：原 `scale(1.4)` 缩放是为视频设计，UI 截图可能被裁切/略糊，必要时在 `styles/hero.css` 调整 `.hero-video-bg` 的 transform。

**Files modified:**
- `components/hero.js` — Hero 背景 `<video>` → `<img src="/assets/webui_light.jpg">`

### 首页 Hero 背景换深色图 + 取消缩放（同日修订）

- 图片源 `webui_light.jpg` → `webui_black.jpg`（深色）。
- 移除 `.hero-video-bg` 的 `transform: scale(1.4)` 与 `transform-origin: 30% center`，图片按 `object-fit: cover` 原比例铺满、不再放大；同时删除移动端无用的 `transform-origin` 残留。
- ⚠️ 背景变深色后，左侧白色 scrim 上的深色文字对比度需复核。

**Files modified:**
- `components/hero.js` — Hero 图片源改为 `/assets/webui_black.jpg`
- `styles/hero.css` — 移除 `.hero-video-bg` 的 transform 缩放及移动端 transform-origin 残留

### 首页 Hero 改回浅色图 + 手机端堆叠布局（同日修订）

- 背景图改回 `webui_light.jpg`（深色不和谐）。
- 手机端原为"满屏背景图 + 底部文字"，但宽屏浅色截图竖屏裁切后大片留白、图近乎隐形、文字孤悬左下。改为**堆叠布局**：`.hero-video-bg` 在 ≤900px 拉入正常流，成为顶部带圆角边框的截图 banner（`aspect-ratio:16/10`、`object-fit:cover`），文字排其下白底；`.hero` 取消 `min-height:100vh`，隐藏 `.brand-hero-scrim` 与 `.hero-video-tag`。

**Files modified:**
- `components/hero.js` — Hero 图片源改回 `/assets/webui_light.jpg`
- `styles/hero.css` — 移动端 Hero 改为堆叠布局（图 banner 在上、文字在下）

### 首页 Hero 桌面梯度模糊 + 手机裁剪优化（同日修订）

- **桌面**：新增 `.brand-hero::after` 模糊层，`backdrop-filter: blur(7px)` + 左→右 `mask` 渐变（0–30% 全模糊，62% 起清晰），文字区柔化、右侧 UI 锐利。
- **手机**：堆叠 banner 裁切优化，`aspect-ratio` 16/10→4/3、`object-position` 改 `50% 30%` 聚焦中间产品界面；移动端隐藏 `.brand-hero::after`。

**Files modified:**
- `styles/hero.css` — 桌面新增梯度模糊层；移动端 banner 裁切焦点调整 + 隐藏模糊层

### 首页 Hero 桌面恢复"内容偏右"设计（同日修订）

按最初视频版思路，桌面端 `.hero-video-bg` 恢复 `transform: scale(1.4); transform-origin: 30% center`，使图片视觉重心推向右 ~2/3、文字压左侧；移动端 banner 加 `transform: none` 避免被缩放。

**Files modified:**
- `styles/hero.css` — 桌面 `.hero-video-bg` 恢复 scale(1.4)+origin 30%；移动端 banner `transform: none`

### 首页 Hero 桌面图片下移避开导航栏（同日修订）

桌面端图片满屏铺在透明导航栏下，放大后截图顶部与 nav 重叠。`.hero-video-bg` 的 transform 由 `scale(1.4)` 改为 `scale(1.4) translateY(10%)`，把图片内容下移避开导航栏（translateY 可调）。

**Files modified:**
- `styles/hero.css` — 桌面 `.hero-video-bg` transform 增加 `translateY(10%)`

### 首页 Hero 背景图改回深色（同日修订）

Hero 图片源 `webui_light.jpg` → `webui_black.jpg`。注意：左侧白色 scrim + 深色文字在深色图上对比度需复核。

**Files modified:**
- `components/hero.js` — Hero 图片源改为 `/assets/webui_black.jpg`

### 首页 Hero 桌面"深底浅字"（同日修订）

新增 `@media (min-width: 901px)` 区块（隔离桌面，手机端白底深字不受影响）：scrim 由白色渐变改为深色渐变压暗左侧；`h1`/副标题/正文转浅色；`.secondary-action` 改浅色描边玻璃；`.hero-video-tag` 改深底浅字。`.primary-action`（accent 蓝底白字）与 eyebrow/`h1 span`（accent 蓝）保持不变。

**Files modified:**
- `styles/hero.css` — 新增桌面 `@media (min-width: 901px)` 深底浅字样式

### 首页 Hero 手机端改为与桌面一致（同日修订）

按要求取消手机端"图在上、文在下"的堆叠布局，改为与网页端一致的**满屏深色背景图 + 浅色文字浮层**：移动端 `.hero-video-bg` 恢复满屏（继承 base 的 absolute/cover，仅 `transform:none`+`object-position:center` 适配竖屏）；`.brand-hero-scrim` 改为底部深色渐变；`h1`/副标题/正文转浅色、`.secondary-action` 改浅色玻璃；`.hero` 恢复满屏高（移除 min-height:auto）。`.brand-hero::after` 梯度模糊在移动端也保留（与桌面一致）。

**Files modified:**
- `styles/hero.css` — 移动端 Hero 由堆叠 banner 改回满屏背景图 + 深底浅字

### 首页 Hero 深色版备份 + 恢复白色版（同日修订）

- **备份**：深色"深底浅字"完整设置存为 `styles/hero.backup_darkcolor.css`（不被 globals.css 引入，仅存档；含还原说明：拷回 hero.css + hero.js 改 webui_black.jpg）。
- **恢复白色**：图片源改回 `webui_light.jpg`；移动端 scrim 改回白色渐变、移除浅色文字覆盖（恢复基础深色字）；删除桌面 `@media(min-width:901px)` 深底浅字整块（桌面回到基础白 scrim + 深字）。桌面/手机均为白色版，结构（满屏图 + 浮层 + 梯度模糊 + scale 推右）保留。

**Files created:**
- `styles/hero.backup_darkcolor.css` — 深色版 Hero 备份（存档，未引入）

**Files modified:**
- `components/hero.js` — Hero 图片源改回 `/assets/webui_light.jpg`
- `styles/hero.css` — 移动端 scrim 改回白色、移除浅字覆盖；删除桌面深底浅字块

### 首页 Hero 底部提问栏叠层（同日修订）

主图 `scale(1.4)` 放大后底部提问栏被推出视口，新增 `webui_light_bottom.jpeg` 切片作为 `.hero-bottom-bar` 叠在底部恢复输入框：绝对定位钉底、`transform: scale(1.4) origin 30% bottom` 与主图水平缩放/锚点对齐、`z-index:1`（主图之上、scrim/文字之下，左侧被白罩盖、右侧输入框露出）；手机端主图未缩放故隐藏该切片。

**Files modified:**
- `components/hero.js` — 新增 `.hero-bottom-bar` 提问栏切片 `<img>`
- `styles/hero.css` — 新增 `.hero-bottom-bar` 样式 + 移动端隐藏

### 首页 Hero 两图整体缩小 + 提问栏上移（同日修订）

主图与提问栏切片缩放 `scale(1.4) → 1.25`；提问栏 `bottom: 0 → 56px`，抬到右下角 "HydroAgent-FF workflow demo"（`.hero-video-tag` @ bottom 24px）文字上方。

**Files modified:**
- `styles/hero.css` — `.hero-video-bg` 与 `.hero-bottom-bar` scale 1.4→1.25；`.hero-bottom-bar` bottom 0→56px

### 首页 Hero 两图再缩小 20%（同日修订）

两图 `scale(1.25) → 1.0`（再缩 20%）。注意：scale=1.0 无溢出余量，主图 `translateY(10%)` 会顶部露白，故一并去掉（→ translateY(0)）；副作用是"内容偏右"效果减弱、趋于居中（origin 在 scale=1 时无效）。

**Files modified:**
- `styles/hero.css` — `.hero-video-bg` scale→1、translateY→0；`.hero-bottom-bar` scale→1

### 首页 Hero 换大图 + 两图右移（同日修订）

大图源 `webui_light.jpg → webui_light.jpeg`（同界面、底部去掉输入框，与单独的提问栏切片配套）。两图各加 `translateX(5%)` 右移；左侧露出的小白边被白色 scrim 盖住。

**Files modified:**
- `components/hero.js` — 大图源 → `/assets/webui_light.jpeg`
- `styles/hero.css` — `.hero-video-bg` 与 `.hero-bottom-bar` 各加 `translateX(5%)`

### 首页 Hero 再缩小 10% + 右移 20%（同日修订）

两图 `scale(1) translateX(5%)` → `scale(0.9) translateX(20%)`。注意 scale<1 后图片不铺满容器、四周露页面白底（大图本身白底，接缝基本不可见）。

**Files modified:**
- `styles/hero.css` — `.hero-video-bg` 与 `.hero-bottom-bar` 改为 `scale(0.9) translateX(20%)`

### 首页 Hero 微调：扩大 5% + 左移 10%（同日修订）

两图 `scale(0.9) translateX(20%)` → `scale(0.95) translateX(10%)`。

**Files modified:**
- `styles/hero.css` — `.hero-video-bg` 与 `.hero-bottom-bar` 改为 `scale(0.95) translateX(10%)`

### 首页 Hero 梯度模糊减 10%（同日修订）

`.brand-hero::after` 的 `backdrop-filter` 由 `blur(7px)` → `blur(6.3px)`（-10%）。

**Files modified:**
- `styles/hero.css` — `.brand-hero::after` 模糊 7px→6.3px

### 首页 Hero 提问栏单独右移 5%（同日修订）

仅 `.hero-bottom-bar` 由 `translateX(10%)` → `translateX(15%)`（主图 10% 不变，两者不再完全对齐）。

**Files modified:**
- `styles/hero.css` — `.hero-bottom-bar` translateX 10%→15%

### 首页 Hero 提问栏左移 2%（同日修订）

`.hero-bottom-bar` `translateX(15%)` → `translateX(13%)`。

**Files modified:**
- `styles/hero.css` — `.hero-bottom-bar` translateX 15%→13%

### 首页 Hero 提问栏左移 0.8% + 上移 5%（同日修订）

`.hero-bottom-bar` → `scale(0.95) translateX(12.2%) translateY(-5%)`。

**Files modified:**
- `styles/hero.css` — `.hero-bottom-bar` translateX 13%→12.2%，新增 translateY(-5%)

### 首页 Hero 提问栏再上移 10%（同日修订）

`.hero-bottom-bar` translateY `-5% → -15%`。

**Files modified:**
- `styles/hero.css` — `.hero-bottom-bar` translateY -5%→-15%

### 首页 Hero 第二张图（提问栏）再上移 20%（同日修订）

`.hero-bottom-bar` translateY `-15% → -35%`。

**Files modified:**
- `styles/hero.css` — `.hero-bottom-bar` translateY -15%→-35%

### 首页 Hero 提问栏下移 10%（同日修订）

`.hero-bottom-bar` translateY `-35% → -25%`。

**Files modified:**
- `styles/hero.css` — `.hero-bottom-bar` translateY -35%→-25%

### 首页 Hero 手机端同步两图排版（同日修订）

移除手机端对 `.hero-video-bg`（transform:none/object-position）和 `.hero-bottom-bar`（display:none）的覆盖，使两图在手机端继承桌面 base transform，排版与桌面一致。白色 scrim、文字内边距等手机特有设置保留。

**Files modified:**
- `styles/hero.css` — 移动端不再覆盖两图 transform/显示，继承桌面排版

### 首页 Hero 手机端文字左下移 + 两图左移（同日修订）

手机端 `.hero-copy` 内边距 `0 20px 56px → 0 14px 32px`（文字向左下角）；两图新增手机端 transform 左移：`.hero-video-bg` `scale(0.95) translateX(-5%)`、`.hero-bottom-bar` `scale(0.95) translateX(-3%) translateY(-25%)`。

**Files modified:**
- `styles/hero.css` — 移动端 hero-copy 内边距调整 + 两图 translateX 左移

### 首页 Hero 手机端改为"文字在上、图在下"堆叠（同日修订）

为消除"导航 symbol + Hero 标题 + 截图内品牌头"三重重复，手机端改为堆叠布局：`.hero-copy` `order:-1` 置顶（正常流、padding-top 留出 header 高度）；`.hero-video-bg` 与 `.hero-bottom-bar` 改为 `position:relative` 顺排块（natural aspect，两图相接拼回完整 UI 截图）；隐藏 scrim/`::after`/video-tag。桌面端不变。

**Files modified:**
- `styles/hero.css` — 移动端 Hero 改为文字在上、两图在下的堆叠布局

### 首页 Hero 手机端改回叠加式 + 梯度模糊（同日修订）

按需求手机端从堆叠改回叠加：图片满屏背景、按钮在左下、四卡片在右侧、左→右梯度模糊（scrim 与 .brand-hero::after 继承 base 自动生效）。两图 transform 稍放大并右移/下移：`.hero-video-bg` `scale(1.15) translateX(12%) translateY(5%)`、`.hero-bottom-bar` `scale(1.15) translateX(12%) translateY(-25%)`。

**Files modified:**
- `styles/hero.css` — 移动端 Hero 改回叠加式布局 + 两图 transform 微调

## 2026-06-24

### Events 页面排版重构

将 Events 页从竖向卡片列表（左窄图 + 右文字）改为 zigzag 交错布局：

**新布局：**
- **A. Hero** — PageLead 改为 Capabilities 风格（facts 纵向排列 + 分割线 + grid 120px/1fr），与 Research / White Papers 一致
- **B. Zigzag 事件列表** — 左右对称两列（1fr 1fr），奇数行"图左文右"、偶数行"文左图右"交错排列。图片 4:3 比例圆角裁切，文字区含 meta / 标题 / 描述 / 链接
- **C. CtaBand** — 新增（之前没有）

**所有文字内容未做任何修改。**

**Files created:**
- `styles/pages/events.css` — 独立 CSS（hero facts / zigzag 行 / media / body / 响应式）

**Files modified:**
- `components/pages/events.js` — 完整重写：zigzag 布局 + SectionHeader + CtaBand
- `app/globals.css` — 新增 events.css import
- `styles/pages/designv2.css` — 移除旧的 events 样式（已迁移至独立文件）

### White Papers 页面排版重构

与 Research Papers 页面布局对齐，从"三卡片网格 + contact-callout"改为统一的专业排版：

**新布局：**
- **A. Hero** — PageLead 改为 Capabilities 风格（facts 纵向排列 + 分割线 + grid 120px/1fr）
- **B. Cadence + Status** — 左右对称分栏（1fr 1fr）。左列：SectionHeader + 3 条 cadence items（分割线列表，无边框卡片）。右列：empty state 卡片（虚线边框 + Follow us 链接）
- **C. CtaBand** — 保持不变

**所有文字内容未做任何修改。**

**Files created:**
- `styles/pages/white-papers.css` — 独立 CSS 文件（hero facts / 对称分栏 / cadence 列表 / empty state / 响应式）

**Files modified:**
- `components/pages/white-papers.js` — 完整重写：对齐 Research 页布局结构
- `app/globals.css` — 新增 white-papers.css import
- `styles/pages/designv2.css` — 移除旧的 white-papers 样式（已迁移至独立文件）

### Home Architecture 图替换为中英文双版本

将 Home 页 Architecture 区域的 SVG 架构图从单一英文版改为中英文双版本：
- EN (`/`) → `HydroAgent_Diagram.svg`
- ZH (`/zh`) → `HydroAgent_No_智能体运行层.svg`

通过 `lang` prop 动态选择 `<img src>`，无需修改内容数据文件。

**Files modified:**
- `components/pages/home.js` — img src 改为基于 lang 的三元表达式

### Research Papers 页面排版重构

将 Research 页从简单的"动机文本 + 状态卡片"两区块布局，重构为 4 段式专业学术页面：

**新布局：**
- **A. Hero** — PageLead 改为 Capabilities 页风格（facts 纵向排列 + 分割线 + grid 120px/1fr）
- **B. Motivation + Themes** — 左侧保留全部 3 段动机文字；右侧从"即将发布"状态卡片改为 3 张 Research Themes 主题卡片（带序号、hover 效果）
- **C. Paper List** — 新增论文列表区块（灰底），支持序号 / 标题 / 摘要 / method / 标签 pills / 状态 badge / preprint 链接。当前 `papers[]` 为空，显示 empty state（虚线边框居中卡片 + Follow us 链接）
- **D. CtaBand** — 保持不变

**数据结构扩展：**
- 新增 `themes[]`（3 项，中英双语）：LLM Agent × Hydrology / Forecaster-in-the-loop / Workflow automation
- 新增 `papers[]`（初始为空数组），预留 title / question / method / tags / status / year / links 字段
- `status` 保留用于 empty state 文案

**Files modified:**
- `content/pages/research.js` — 新增 themes[], papers[] 字段（en/zh）
- `components/pages/research.js` — 完整重写：4 区块布局 + paper row + empty state + status badge
- `styles/pages/research.css` — 完整重写：Capabilities 风格 hero facts + theme 卡片 + paper list + empty state + 响应式

**Verified:** `next build` succeeds, all 22 pages exported. `/research` 和 `/zh/research` 均返回 HTTP 200。

## 2026-06-23

### Capabilities 页面排版优化

**1. Section 2 改为 split-row 布局 + 交替背景色**
- 9 个能力项从 3×3 卡片网格改为左右分列行式布局（dt 标题 + dd 说明），带序号标记
- Section 2 加 `#F9FAFB` 灰底，形成 PageLead(灰) → Section1(白) → Section2(灰) → CTA(灰) 的视觉节奏

**2. Hero (PageLead) Facts 纵向排列**
- Facts 从横排 flex-row 改为纵向 stacked，每个 fact 独占一行
- 每行用 `grid: 120px label | 1fr value`，上下加 `border-top` 分割线
- Value 字号从 18px bold 降为 15px medium，长句子以正文方式阅读而非标题

**Files modified:**
- `components/pages/capabilities.js` — Section 2 改为 `<dl class="split-list">` + `<div class="split-row">`
- `styles/pages/capabilities.css` — facts 纵排 + 分割线 + value 字号调整 + tasks section 灰底 + split-index 样式

### Contact Page Redesign

Redesigned the Contact page layout from 4 sections with duplicate data to a cleaner 4-section design matching Home page section heights (80px padding).

**New layout:**
- **A. Hero Contact** — split left (eyebrow + title) / right (intro + email CTA button + response note + channels), replacing old PageLead + PrimarySection with duplicates removed
- **B. Inquiry Types** — changed from 3-up info cards to split-row (dt/dd) format with icons, better reading rhythm
- **C. How It Works** — changed from card grid to horizontal timeline (numbered dots + connecting lines), visually distinct from section B
- **D. CTA Callout** — merged old callout + added strong email CTA button, uses `--bg-alt` background for visual separation

**Responsive:** all 4 sections collapse to single-column on mobile (≤900px), timeline switches to vertical layout.

**Files modified:**
- `content/pages/contact.js` — simplified data structure, removed duplicates (facts/detail-cards), added channels array, new ctaCallout section
- `components/pages/contact.js` — full rewrite: 4 sections using content-section class for consistent padding
- `styles/pages/contact.css` — full rewrite: hero split, inquiry split-rows, horizontal timeline, CTA band

**Verified:** `next build` succeeds, all 24 pages exported. `/contact` returns HTTP 200.

### SVG Architecture Diagram Visual Style Upgrade

Upgraded `public/assets/assets/agent_infrastructure_recreated.svg` visual style for premium web presence. **No text, positions, or shapes were changed** — only CSS style definitions.

**Changes:**
- **Blue accent colors deepened:** #85c3ee→#4A9FE0, #afdbf6→#7EC4ED, #3a98d8→#2563EB, #65baea→#3B8ED6, #529cd9→#2E7DC8, #59aae2→#3585CC, #4190d6→#1D6FC0, #81caef→#5EAEE5, #2570c0→#1E40AF
- **Border strokes enhanced:** 0.25px→0.75px, 0.5px→1px; stroke colors shifted from washed gray (#f3f3f3, #edeeef, #efefef) to cool blue-gray (#CBD5E1, #B8C4D4, #94A3B8)
- **Connecting line strokes:** neutral gray (#494949, #474747) → deep navy (#1E3A5F) for stronger contrast
- **Background fills:** neutral whites/grays → cool-toned Tailwind slate palette (#F8FAFC, #F1F5F9, #E2E8F0, #EFF6FF, etc.)
- **Dark fills deepened:** #282828→#0F172A, #505050→#1E293B, #6c6c6d→#334155
- **Text style (.st79):** added fill #0F172A, letter-spacing 0.03em, extended font-family fallback chain
- **Light blue accent fills:** #def2fb→#DBEAFE, #e8eff9→#DBEAFE

**Files modified:**
- `public/assets/assets/agent_infrastructure_recreated.svg` — CSS style block only

### 创建中文版架构图 SVG

复制英文版 SVG 并将 12 个文字标签翻译为中文，另存为 `agent_infrastructure_recreated_zh.svg`。

| 英文 | 中文 |
|------|------|
| Forecast Models | 预报模型 |
| Scenario Inputs | 情景输入 |
| Knowledge Support | 知识支撑 |
| Bulletin | 预报简报 |
| Replay | 回放复盘 |
| Operational Updates | 业务更新 |
| Forecast Review | 预报审核 |
| Human Approval | 人工审批 |
| Release Control | 发布控制 |
| Hydrograph & Rainfall | 水文过程线与降雨 |
| Forecast Delivery | 预报发布 |
| Digital Twin Integration | 数字孪生集成 |

对于原来分两行的英文标签（如 "Forecast" + "Models"），中文四字即可单行显示，translate y 坐标向下微调 ~9px 保持垂直居中。"水文过程线与降雨" 和 "数字孪生集成" 因字数较多仍保留两行。

**Files created:**
- `public/assets/assets/agent_infrastructure_recreated_zh.svg` — 中文版架构图

## 2026-06-17

### Hero redesign: full-screen video background → split layout

Redesigned Hero section from fullscreen video background with bottom-left overlay text to a left-right split layout:
- **Left column:** eyebrow, title (HydroAgent), subtitle, description, primary + secondary CTA buttons
- **Right column:** autoplay/muted/loop demo video with rounded card frame and caption tag
- Responsive: stacks vertically on mobile (≤900px), video on top
- Primary button now filled (accent background) instead of outline-only
- Content updated for both EN and ZH with new copy per spec

**Files modified:**
- `content/pages/home.js` — new `subtitle`, `videoTag` fields; updated `text`, `primary`, `secondary`, `secondaryPath` for both EN and ZH
- `components/hero.js` — full rewrite: split layout with `.hero-left` / `.hero-right` columns
- `styles/hero.css` — full rewrite: CSS grid split layout, video card styling, responsive breakpoints

### Step 4: Build multi-level navigation system

**4a — Restructured nav data** (`content/nav.js`):
- Flat 8-item `nav[]` → nested 2-level structure with 5 top-level items (Home, Product, Research, Team, Contact & Join)
- Added `footerGroups` data (moved from hardcoded shell.js)
- Bilingual (en/zh) labels for all items

**4b — Desktop dropdown nav** (`components/shell.js`, `styles/nav.css`):
- Hover dropdown panels for items with `children` (Product, Research, Team, Contact & Join)
- Chevron icon rotates on hover; invisible bridge prevents hover-out gap
- Active state highlights current page and its parent
- Footer now data-driven from `content.ui.footerGroups`

**4c — Mobile hamburger menu** (`components/shell.js`, `styles/nav.css`):
- Hamburger button (3-line → X animation) visible at ≤900px
- Slide-in drawer from right with overlay backdrop
- Accordion-style expand/collapse for nested groups
- Click-to-navigate closes drawer; language switch in drawer

**New placeholder pages** (3 routes × 2 langs = 6 pages):
- `/white-papers` + `/zh/white-papers` — White Papers archive
- `/events` + `/zh/events` — Events / Community
- `/members` + `/zh/members` — Lab Members

**Files created:**
- `content/pages/white-papers.js`, `content/pages/events.js`, `content/pages/members.js`
- `components/pages/white-papers.js`, `components/pages/events.js`, `components/pages/members.js`
- `app/white-papers/page.js`, `app/events/page.js`, `app/members/page.js`
- `app/zh/white-papers/page.js`, `app/zh/events/page.js`, `app/zh/members/page.js`

**Files modified:**
- `content/nav.js` — full rewrite (flat → nested + footerGroups)
- `components/shell.js` — dropdown nav, hamburger, drawer, data-driven footer
- `styles/nav.css` — dropdown, hamburger, overlay, drawer, accordion styles

**Verified:** `next build` succeeds, all 24 pages (12 en + 12 zh) exported as static HTML.

**Note:** `/workflow` and `/runs` pages retained but removed from nav — pending user decision during content rewrite.

### Step 3: Split content/site.js (2345 lines → 13 files)

**Created files:**
- `content/helpers.js` — normalizePath, localizeHref, stripLangPrefix, getLanguageSwitchHref
- `content/team-members.js` — hydroAgentTeamMembers array (15 members)
- `content/nav.js` — navContent { en: { ui }, zh: { ui } } (nav items, footer, CTA, switchLabel)
- `content/pages/home.js` — homeContent { en, zh } (hero, productPreview, highlights, thinking, human, client, proof, adoption, deliverables, positioning)
- `content/pages/platform.js` — platformContent { en, zh }
- `content/pages/capabilities.js` — capabilitiesContent { en, zh }
- `content/pages/workflow.js` — workflowContent { en, zh }
- `content/pages/research.js` — researchContent { en, zh }
- `content/pages/runs.js` — runsContent { en, zh }
- `content/pages/team.js` — teamContent { en, zh } (imports hydroAgentTeamMembers)
- `content/pages/careers.js` — careersContent { en, zh }
- `content/pages/contact.js` — contactContent { en, zh }

**Rewritten files:**
- `content/site.js` — now a thin re-export assembler (~45 lines). Imports all sub-modules, assembles siteContent, re-exports getSiteContent + all helpers. **No component imports changed.**

**Verified:** `next build` succeeds, all 18 pages (9 en + 9 zh) exported as static HTML.

## 2026-06-16

### Step 2: Split components (site-pages-v2.js → components/pages/)

**Created files:**
- `components/pages/home.js` — HomePageContent + BrandManifesto, AgentThinking, HumanCenteredAgent, ArchitectureWorld, BusinessMap, ProofStatement
- `components/pages/platform.js` — PlatformPageContent + PlatformArchitectureDiagram
- `components/pages/capabilities.js` — CapabilitiesPageContent
- `components/pages/workflow.js` — WorkflowPageContent
- `components/pages/research.js` — ResearchPageContent
- `components/pages/runs.js` — RunsPageContent
- `components/pages/team.js` — TeamPageContent
- `components/pages/careers.js` — CareersPageContent
- `components/pages/contact.js` — ContactPageContent
- `components/hero.js` — renamed from hero-v2.js
- `components/shell.js` — renamed from site-shell-v2.js

**Modified files (import path update):**
- All 18 `app/**/page.js` files: `@/components/site-pages-v2` → `@/components/pages/<page>`

**Deleted files:**
- `components/site-pages-v2.js` (968 lines, monolithic)
- `components/hero-v2.js` (replaced by hero.js)
- `components/site-shell-v2.js` (replaced by shell.js)

**Verified:** All 18 pages return HTTP 200.

### Step 1: Split CSS (globals-v2.css → styles/)

- Split `app/globals-v2.css` (2829 lines) into 17 modular files under `styles/` and `styles/pages/`
- Entry point: `app/globals.css` with @imports
- Deleted `app/globals-v2.css`

### Remaining restructuring steps
- **Step 3:** ~~Split `content/site.js`~~ — DONE (2026-06-17)
- **Step 4:** ~~Build new multi-level navigation system~~ — DONE (2026-06-17)

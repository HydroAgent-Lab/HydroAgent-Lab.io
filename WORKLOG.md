# Work Log

## 2026-07-25

### 首页 Hero 三按钮重排（Hallmark · component-scope）

新增 "Try the demo" 后，hero 出现三个按钮，其中两个是完全相同的描边胶囊，视觉上没有层级、三个箭头互相稀释、且在 34% 宽的文案栏里会换行成参差的 2+1 块（中英文断点还不一致）。

**过程记录**：第一版尝试了"三种权重"（实心 / 描边 / 无边框文字链，只留一个箭头）。用户否决 —— 外观差异反而显得乱，且文字链丢失了可操作感。**结论：乱的根源是宽度参差，不是样式差异。** 第二版按用户选择重做。

第二版做成了等宽 2+1 网格（`repeat(2, minmax(0, 1fr))` + `max-width: 460px`），但用户实测截图后指出**按钮被拉伸得太长** —— `1fr` 让轨道填满容器，宽度远超文字实际需要。第三版改为按内容收缩。

第三版改为单列 `max-content` 收缩，解决了「太长」但丢掉了 2+1 排版。用户要求改回 2+1，**同时保留收缩效果** —— 这两个诉求此前是冲突的（`1fr` 会拉伸；`repeat(2, max-content)` 会让两列各按自身内容算，第一列装短标签、第二列装长标签，两列不等宽）。

**最终方案 — 2+1 等宽网格 + 收缩到最长标签**：

1. **同时满足等宽与不拉伸** — `grid-template-columns: repeat(2, minmax(0, 1fr))` 配合容器 `width: max-content`。关键在 CSS Grid 规范的 intrinsic sizing 行为：容器宽度为 intrinsic 时，**所有 fr 轨道会统一解析到最大轨道的 max-content 贡献**，因此两列都等于最长按钮（"Explore HydroAgent-FF"）的宽度，而非各列按自身内容算。第三个按钮 auto-place 到第二行第一列，三个共用同一宽度。
2. **无硬编码 px** — 宽度由浏览器实测内容得出，中文页标签更短会自动量出更窄的按钮组。
3. **箭头全部保留并对齐** — 三个都带 `→`，`justify-content: space-between` 把标签推左、箭头推右，叠成竖直对齐线。
4. **按钮内 `gap: 24px`** — 最长按钮的轨道正好等于其内在宽度，剩余空间为 0，所以这个 gap 是它唯一的呼吸空间，同时决定整组宽度（调宽窄的单一控制点）。
5. **形状尺寸完全统一，只有主按钮填色** — 保留最低限度的主次。
6. **CTA 排序调整** — 零门槛的 "Try the demo" 升为 primary（用户确认）。
7. **响应式** — 901–1400px 降单列：文案栏是 stage 的 34%，两列合计约 450px，viewport 低于约 1324px 就放不下，降级为单列优于让 `max-width` 压缩轨道触发省略号。
8. **≤560px 单列但不全宽**（用户实测反馈：窄屏下三条通栏按钮几乎铺满屏幕，要求缩短 1/3）— 改为 `width: max-content` + `min-width: 66%` + `max-width: 100%`：常态取 66%（约缩短 34%），`max-content` 作为下限兜底，避免 320px 屏上 66%（≈185px）装不下 "Explore HydroAgent-FF"（≈230px）而触发省略号。原先的 `width: 100%` 全宽方案作废。
6. **路径本地化统一** — 原先 `primaryPath` 走 `localizeHref` 而 secondary/tertiary 用硬编码 `/zh/...`；现三者统一存无前缀路径并统一由 `localizeHref` 处理。

所有样式**限定在 `.hero-actions` 作用域内**，因为 `.primary-action` / `.secondary-action` 与 `components/cta-band.js` 共用 —— 已在构建产物中验证 CTA band 未受影响。顺带补了 `.action-arrow` 的 `prefers-reduced-motion` 守卫（此前全站缺失）。

已 `next build` 验证，26 页静态导出通过；已核对 en/zh 六个 href 均正确，无 `/zh/zh/` 双前缀。

**Files modified:**
- `content/pages/home.js` — en + zh hero CTA 重排（primary=demo, secondary=platform, tertiary=contact），zh 路径去掉 `/zh` 硬前缀
- `components/hero.js` — 三个按钮结构统一为 `.action-label` + `.action-arrow`，三个 slot 统一走 `localizeHref`
- `styles/hero.css` — `.hero-actions` 改为 `repeat(2, minmax(0, 1fr))` + `width: max-content` + `justify-content: start` + `gap: 10px`；按钮 `space-between` / `gap: 24px` / `nowrap` / `padding: 10px 18px`；`.action-label` 省略号兜底、`.action-arrow` 不压缩；移除 `--hero-action-min` 硬编码；901–1400px 单列断点；新增 `prefers-reduced-motion` 守卫
- `styles/responsive.css` — ≤560px 块改为 `.hero-actions` 单列 + `width: max-content` / `min-width: 66%` / `max-width: 100%`（原 flex 规则已失效，一并替换）
- `README.md` — Design Language 改写 hero CTA 段落为「2+1 等宽 + 收缩到最长标签」说明

### Demo 页视觉审计 + 修复（Hallmark audit）

**约束**：用户限定「只改设计，不改互动、文字、文字顺序」。因此全部改动限于 CSS，未触碰 `components/demo-chat.js` 的交互逻辑与 `content/pages/demo.js` 的文案。

审计结果 **2 critical · 6 major · 5 minor**，已修 12 条，2 条因超出授权范围未动。

**Critical**
1. **非品牌蓝**（`demo.css` 结果卡）— 原 `rgba(59,130,246,.06)` 是 Tailwind blue-500 (#3B82F6)，与品牌蓝 `--accent` oklch(51% 0.15 258) ≈ #2570c0 **不同色相**，同屏出现直接破坏色彩一致性。改用新 token `--accent-wash`。
2. **卡中卡三层嵌套** — `.demo-chat-window` > `.demo-msg-assistant` > `.demo-block-result` 每层都有 border+radius+背景。移除中间层（助手气泡）的 border，仅靠底色与白色窗体区分。

**Major**
3. **Accent 泛滥 → 三级配给制** — 品牌蓝原本出现在 11 处（脉冲点/激活边框/激活数字/用户头像/用户气泡/checkbox/结果卡边框+标题/结束CTA/发送按钮/各hover），强调色因此失效。重排为：**L1 实心**仅发送按钮与结束 CTA（二者不同屏）；**L2 描边/淡底**激活场景卡与结果卡；**L3 中性灰**用户气泡、头像、checkbox、脉冲点。同屏最多 2 处实心蓝。
   - **用户气泡由 `--accent` 改为 `--dark-1` (#3E3F40)**：它是页面最大色块，填品牌蓝会让蓝色同时承担「品牌」与「可操作」两种语义。白字对比度反而由 ~5.3:1 提升至 ~10:1。
4. **脉冲点动画与文案矛盾** — `demo-pulse` 无限脉冲暗示「实时」，但它所在徽章文案明确写着 "not live inference"。删除动画，改静态中性点。
5. **`--border` 与 `--border-strong` 同值** (#CBCCCC) — 代码里刻意区分使用但屏幕上毫无差别。**未改全局值**（影响全站），仅在 tokens.css 加注释说明，留待后续决定。
6. **表格缺 tabular-nums** — 预报表格与结果卡展示流量/水位数值，比例数字导致小数点不对齐。已加 `font-variant-numeric: tabular-nums`。
7. **场景卡强制等分列高** — `flex: 1 1 0` 让 5 张卡瓜分聊天窗高度，说明文字被 `line-clamp` 挤压。改 `flex: 0 0 auto` 按内容自然高度，`.demo-chat` 改 `align-items: start`。
8. **动画未用 easing token** — 三处动画用浏览器默认 `ease-out`/`ease-in-out`，改为 `var(--ease-out)`/`var(--ease-in-out)`。
9. **打字动画缺 `prefers-reduced-motion` 守卫** — 原文件只有 `demo-reveal` 有守卫，而打字动画每轮都跑，影响更大。已补。

**Minor**
10. 激活态 `box-shadow: 0 0 0 1px var(--accent)` 与全局 focus ring 撞成两层蓝环 → 改用 `--accent-wash` 底色，环形留给 focus。
11. `.demo-msg` 的 `max-width: 78%` 被 `.demo-msg-assistant` 覆盖，实际只对用户气泡生效 → 移到各自选择器。
12. 硬编码 `#fff` ×5、`rgba` 阴影、mono 字体栈 → 全部 token 化。

**新增 token（纯新增，不改任何现有值，其他页面零影响）**：`--accent-wash`、`--text-on-dark`、`--font-mono`、`--shadow-card`。

**未修（超出「只改设计」授权）**：
- PageLead 的 eyebrow `"Product Experience"` — 删除属于改文案（首页已于 commit `8fe073b` 移除，demo 页遗留）
- `.demo-input-suggestion` 的 `title` 属性（触屏不可达）— 属 JSX 交互层
- `content: "☐ "` 跨设备渲染不一致 — CSS `content` 属文案，仅改了颜色未换字符

已 `next build` 验证，26 页静态导出通过。**视觉需肉眼确认**：`color-mix()` 需 Chrome 111+/Safari 16.2+，以及深灰用户气泡的整体观感。

**Files modified:** `styles/tokens.css`（新增 4 个 token + 1 条注释）· `styles/pages/demo.css`（16 处）

### `--border-strong` 修复（全站）

审计发现 `--border` 与 `--border-strong` 同为 `#CBCCCC`。排查其 15 处用法后确认这不是代码洁癖问题而是**真实交互 bug**：其中 **9 处是卡片 hover 态**（`.info-card` / `.surface-card` / `.scroll-card` / `.agent-thinking-step` / `.business-line` / `.collab-card` / `.signals-card` / `.team-about-join-card` / `.wp-cadence-item`），默认边框用 `--border`、hover 用 `--border-strong`，两者同值 ⇒ **鼠标悬停时边框颜色毫无变化**，而这些卡片没有其他 hover 样式（无阴影/位移/背景变化），边框是唯一反馈手段。另 6 处静态用法（次级按钮边框、虚线建议框、`.hero-chip`、首页滚动条 thumb、图表第三条线）也因过淡而失去区分度 —— 滚动条 `#CBCCCC` 在 `#E5E5E5` 背景上几乎不可见。

`--border-strong` 改为 `#AEB0B2`（白底约 2.3:1，比 `--border` 明显深一档，又远浅于 `--text-muted`）。**影响全站 8 个页面 15 处，视觉待用户确认。**

### Demo 页头（PageLead）布局重构

同样受「只改设计」约束，文案一字未动。

**问题**：共用的 `PageLead` 在此页失衡 —— 左栏仅 eyebrow + 一行短标题，右栏塞 250+ 字描述 **加** 三个 facts，视觉重量约 1:4。此前的 `0.78fr / 1.22fr` 栏宽调整是在给右栏加宽，治标未治本。

**方案 —— 三区网格**：标题左 / 描述右 / facts 横跨底部成为基座条。

- **`display: contents` 解构 `.page-lead-side`** —— 该容器不再生成盒子，其两个子元素直接成为网格项，从而可独立定位。**DOM 顺序与屏幕阅读器顺序完全不变**，无需改动共用组件的一行 JSX。已在构建产物中核验 DOM 结构未变。
- facts 由「右栏附属品」升级为全宽基座条，`flex: 1 1 0` 等分 + 竖向发丝线分隔，读作证据而非剩余物。
- h1 由 `clamp(1.6rem, 2.4vw, 1.85rem)`（上限 ~29.6px，低于首页 hero 的 41.6px）提至 `clamp(1.9rem, 3.2vw, 2.6rem)`，使其独立支撑左栏。
- 全部规则 scope 在 `.demo-page` 下，另外 7 个使用 `PageLead` 的页面（capabilities / events / members / research / team / white-papers / workflow）零影响 —— 已 grep 核验。
- 响应式：≤900px 释放显式 `grid-column` / `grid-row` 定位（否则段落会请求不存在的第 2 列），回落至源顺序；≤560px 基座条转竖排、分隔线转横向。
- `.page-lead` 背景 `#F9FAFB` 硬编码 → 新增 token `--surface-subtle`（同值替换，全站视觉零变化）。

**Files modified:** `styles/tokens.css`（`--border-strong` 改值 + 新增 `--surface-subtle`）· `styles/sections.css`（背景 token 化）· `styles/pages/demo.css`（页头三区布局 + 两个响应式断点）

**待确认（视觉）**：`--border-strong` 全站观感 · demo 页头新布局 · `color-mix()` 与深灰用户气泡

### Hero CTA 埋点 + 标签互换

**标签互换**：用户要求把第一行的 "Try the demo" 与 "Explore HydroAgent-FF" 对调，且**颜色槽位不动**（左上仍是填色 primary）。因此实际效果是主 CTA 从 `/demo` 换回 `/platform`。讨论中确认：先前推荐 demo 当主 CTA 是套用通用 SaaS 惯例（低门槛 + 高意图信号），但本站受众是机构 / 预报团队 / 科研合作方，高风险业务场景下"先读懂能力边界再试用"可能更贴合，故此次调整未必是回退。

**埋点**：为用数据而非直觉决定 CTA 排序，给 hero 三个按钮加了 GA4 事件。

- 新建 `components/track-link.js` — `TrackLink` 是唯一的 `"use client"` 边界，`hero.js` 保持 Server Component，首页 bundle 仅 +约 180 B（First Load JS 135 kB 不变）。
- 事件 `cta_click`，参数 `cta_location` / `cta_id` / `cta_rank` / `cta_label` / `site_language`。
- **参数名用 `site_language` 而非 `language`**：后者是 GA4 内置参数（访客浏览器语言），同名会冲突；语义也不同 —— 浏览器为英文的访客同样可能在看 zh 路由。
- **`cta_id` 由未本地化路径推导**（`/platform` → `platform`），使 en/zh 点击聚合到同一行，而非按语言拆成两份。
- **`cta_rank` 记录视觉槽位而非标签**，因此标签再次互换时，"哪个槽位被点"与"哪个目标页被点"仍可独立分析。
- `hero.js` 三个 Link 改为数组 `actions` + `map`，消除三处重复的埋点参数。
- `TrackLink` 对 `window.gtag` 做存在性检查：gtag 为 `afterInteractive` 加载，极快点击可能赶在其之前，此时静默丢弃事件而不抛错 —— 导航不依赖埋点。

**⚠️ 待办（需在 GA4 后台手动操作一次）**：「管理 → 媒体资源设置 → 媒体资源 → **自定义分析数据** → 创建自定义维度」，将 `cta_id`、`cta_rank`、`site_language` 注册为**事件范围**（Event scope）自定义维度。未注册则参数只在 DebugView / 实时报告可见，标准报表中不可用；且注册后仅从注册时刻起累积，不追溯历史数据。

**环境问题（同日）**：`cross-env` 列在 `devDependencies` 但 `node_modules` 未实际安装，导致 `npm run dev` / `npm run build` 均报 `'cross-env' is not recognized`。`npm install` 补齐 8 个包即可，`package-lock.json` 无变化（lock 本就记录了该依赖，是本地 node_modules 未同步）。`npm audit` 报 3 个漏洞（2 high / 1 critical），未处理 —— `--force` 可能升级 Next 主版本。

**Next steps:** 中文页需肉眼确认 —— zh 标签更短，`max-content` 会量出更窄的按钮组，需确认在文案栏里不会显得过小。

## 2026-07-19

### 首页 Hallmark 审计 + 修复（对比度 + 翻转卡）

对英文首页做了一次反 AI-slop 审计（3 critical · 5 major · 4 minor），并落地修复其中两项：

1. **文字对比度（audit #1）**：`--text-muted` 从 `#9ca3af`（≈2.6:1，不达 WCAG AA）调深为 `#5f6773`（≈5.7:1）。单点 token 改动，全站正文一次达标。
2. **"Why Trust It" 翻转卡（audit #2 + #4）**：原本 5 张 hover-翻转卡把关键证据锁在背面，触屏/键盘不可达，且正面盖着无关 Unsplash 风景图。改为**常显证据卡**（`.evidence-*`）：标签 + 证据全文常显、响应式 `auto-fit/minmax(280px)` 网格、卡高随文自适应（文字一字未删），左侧 3px accent 竖条，移除全部外链风景图。清理了 `home.css` 与 `responsive.css` 中的死代码 flip 规则。

已 `npm run build` 验证，24 页静态导出全部通过。

**Files modified:**
- `styles/tokens.css` — `--text-muted` #9ca3af → #5f6773（WCAG AA 正文对比）
- `components/pages/home.js` — trust 区块由 `.flip-*` 结构改为 `.evidence-card`（标签 h3 + 证据 p）
- `styles/pages/home.css` — 移除 `.flip-*` / `.flip-bg-*`（含 5 张 Unsplash 图）与响应式 flip 规则，新增 `.evidence-grid` / `.evidence-card` / `.evidence-label` / `.evidence-text`
- `styles/responsive.css` — 删除作用于已移除元素的 `.flip-grid` / `.flip-card` 死代码
- `README.md` — Design Language 增补对比度 token 与 evidence 卡说明

**Next steps（审计剩余项，未处理）:**
- major #3 全站缺 `:focus-visible` 聚焦环
- major #5 直接用 Tailwind 默认蓝调色板（非 OKLCH）
- major #6 纯 system 字体无显示/正文配对
- major #7 每段重复大写 eyebrow；#8 `transition: all` + 默认 `ease`

### 手机端两侧留白增大（≤560px）

用户反馈手机端横向几乎占满。根因：responsive.css 的 `@media (max-width:560px)` 里内容区水平 padding 偏小（content-section 28px、几个 home section 20px）。统一提到 32px（`.content-section`/`.cta-band` 及 product-preview/agent-thinking/human-agent/architecture-world/business-map/proof-statement）。仅改这几个 padding 数值，未动断点结构/布局逻辑（该断点为之前响应式审计补的 SMALL PHONE TIER）。已 `npm run build` 验证。

补充：为覆盖所有页面（不止首页），≤560px 加 `:root { --gutter: 32px }`，一次性覆盖所有二级页 hero（.page-lead）、nav、footer、及所有 `var(--gutter)` section。用户确认后，两个特例 hero（`.careers-frame` = Careers hero 横幅、`.platform-hero-copy` + `.platform-facts-bar` = Platform hero 标题块/数据条）也在 ≤560px 覆盖水平 padding 到 32px（仅水平间距，不动不对称对齐结构）。全站手机端两侧留白统一 32px。

**Files modified:**
- `styles/responsive.css` — ≤560px 内容区水平 padding → 32px；--gutter → 32px

### Hero 流光线改银白 + 金属质感

首页 hero 截图边缘的流光光束由浅蓝 `rgba(147,197,253,0.9)` 改银白，再加金属层次：渐变改为 冷银灰 `rgba(190,200,214,0.55)` → 纯白高光 `rgba(255,255,255,0.98)` → 冷银灰，模拟金属反光（`.hero-monitor::before` 两条光束）。仅改 hero.css。已 `npm run build` 验证（首次间歇性报错，重试通过）。

**Files modified:**
- `styles/hero.css` — .hero-monitor::before 流光色 → 银白

### 其他页面 eyebrow 精简（每页只留 hero）

延续首页策略，删除全部二级页的 section eyebrow（共 15 个 × en/zh = 30 处清空），每页只保留顶部 1 个 hero eyebrow 作品牌蓝点睛：
- platform（删4）、capabilities（删2）、careers（删2）、contact（删2）、team（删2）、research（删1）、white-papers（删1）、members（删1）；events 本就 1 个
- 保留 hero：Product/产品、Capabilities/服务、Research/研究、About HydroAgent-Lab、White Papers/白皮书 等

已 `npm run build` 验证。

**Files modified:**
- `content/pages/{platform,capabilities,careers,contact,team,research,white-papers,members}.js` — section eyebrow 清空

### 移动端 drawer hover/active 统一淡蓝圆角

把桌面下拉的"淡品牌蓝圆角高亮"统一到移动端抽屉菜单：`.drawer-item`、`.drawer-parent` 加左右 padding + 圆角 + `background var(--transition)`，hover/active 背景 `color-mix(in oklch, var(--accent) 12%, #fff)`（回退 --surface）。原本 drawer 是"分隔线+变色"、无灰方块问题；此改为统一交互反馈并高亮当前页。其余全局改动（品牌蓝/字体/灰阶/卡片/focus）手机端本就自动生效。已 `npm run build` 验证。

另清掉最后一处旧 Tailwind 蓝硬编码：careers 页 principles 圆点外圈光晕 `rgba(59,130,246,0.15)` → `color-mix(in oklch, var(--accent) 18%, transparent)`。全站已无 rgba(59,130,246)。

**Files modified:**
- `styles/nav.css` — drawer-item / drawer-parent / drawer-children item 统一淡蓝圆角高亮
- `styles/pages/careers.css` — principles 圆点光晕改新品牌蓝

### 导航下拉项 hover 高亮改柔和圆角

下拉菜单项 hover 原为 `background: var(--border)`（中灰 #CBCCCC）满宽直角大方块，生硬难看。改为：下拉容器加左右内边距、菜单项加圆角 `--radius-sm`、hover 背景改 `color-mix(in oklch, var(--accent) 12%, #fff)` 淡品牌蓝（老浏览器回退 `--surface` 浅灰）。成为四周留空的圆角小高亮条。仅改 nav.css。已 `npm run build` 验证。

**Files modified:**
- `styles/nav.css` — .nav-dropdown padding、.nav-dropdown-item 圆角、:hover 淡蓝底

### page-lead h1 放松（又大又挤）

二级页 hero 标题（`.page-lead h1`，全站共用）因 Inter Tight 紧凑 + line-height 1.1 + 负字间距显得又大又挤。字号 2rem → `clamp(1.6rem,2.4vw,1.85rem)`、行距 1.1→1.22、字间距 -0.005em。仅改 sections.css。已 `npm run build` 验证。

**Files modified:**
- `styles/sections.css` — .page-lead h1 字号/行距/字间距放松

### 全站卡片去 AI 化（中性极简）

用户反馈卡片"蓝描边 + 蓝光晕 hover"太 AI，全站通病。统一改为中性极简：hover 从 `border-color: accent-light` + 蓝阴影 `rgba(59,130,246,0.08)` 改为 `border-color: --border-strong` + 中性轻阴影 `rgba(0,0,0,0.05)`；scroll-card 去掉顶部 3px accent 蓝条与上浮 translateY，缓动改具名。共 10 处卡片，6 个文件：
- sections.css：info-card、surface-card
- home.css：scroll-card（含默认态去蓝条/去阴影）、agent-thinking-step、business-line
- capabilities.css：collab-card
- platform.css：signals-card
- white-papers.css：wp-cadence-item
- team.css：team-about-join-card

已 `npm run build` 验证（24 页）。

**Files modified:**
- `styles/sections.css`、`styles/pages/home.css`、`styles/pages/capabilities.css`、`styles/pages/platform.css`、`styles/pages/white-papers.css`、`styles/pages/team.css`

### 首页审计修复 步骤4（#7 精简 eyebrow）

首页只保留 hero 的 "HydroAgent-Lab" eyebrow，删掉 Flagship Product / Why Trust It / Who It Serves（en+zh）。CTA 的 "Next Step / 下一步" eyebrow 在共享 nav.js，一并删（全站 CTA band 生效），并给 `cta-band.js` 加空值判断避免空标签。已 `npm run build` 验证。

**Files modified:**
- `content/pages/home.js` — 三个 section eyebrow 清空（en+zh 共 6 处）
- `content/nav.js` — CTA eyebrow 清空（en+zh）
- `components/cta-band.js` — eyebrow 空则不渲染

### 首页审计修复 步骤3（#6 字体配对 Inter Tight + Inter）

用 next/font 引入 Inter Tight（标题）+ Inter（正文），替换纯 system-ui：
- `app/layout.js` 用 `next/font/google` 加载，注入 `--font-body-face` / `--font-display-face` 到 `<html>` className
- `tokens.css` `--font` 前置 Inter、新增 `--font-display` 前置 Inter Tight，均带中文回退（PingFang SC / Microsoft YaHei）
- `typography.css` h1/h2/h3 用 `var(--font-display)`

字体在 build 时下载打包（需联网），已验证 24 页构建通过。

**Files modified:**
- `app/layout.js` — next/font 加载 Inter Tight + Inter
- `styles/tokens.css` — --font / --font-display 变量
- `styles/typography.css` — 标题用 display 字
- `README.md` — 字体说明

### 首页审计修复 步骤2（#5 品牌蓝迁 OKLCH）

读取品牌 logo `hydroagent-mark.svg` 取色（多层蓝螺旋 #def2fb…#2570c0）。用 logo 蓝替换 Tailwind 默认 accent 并迁 OKLCH：
- `--accent` oklch(51% 0.15 258) ≈ logo 深蓝 #2570c0
- `--accent-hover` oklch(44% 0.135 258)（更深，hover/焦点环）
- `--accent-light` oklch(74% 0.09 235) ≈ logo 浅蓝 #65baea

整站蓝调更深、更贴品牌、脱离 AI 默认蓝。已 `npm run build` 验证。

**Files modified:**
- `styles/tokens.css` — accent 三档改 OKLCH logo 蓝
- `README.md` — 更新品牌蓝说明

### 首页审计修复 步骤1（交互/动效打磨）

一批无需决策的修复：
- **#3 焦点环**：base.css 加全局 `:focus-visible { outline: 2px solid var(--accent-hover); offset 2px }`，键盘焦点即时可见、非动画、对比达标。
- **#8 缓动**：tokens 加 `--ease-out/--ease-in/--ease-in-out`，`--transition` 改用 `--ease-out`；hero.css 按钮 `transition: all` 改为具体属性（color/background/border），不再动 layout。
- **#9 卡片上浮**：scroll-card hover 从 translateY(-4px)+重阴影 弱化为 -2px+轻阴影。
- **#10 未定义 token**：hero.css `.primary-action:hover` 的 `var(--accent-dark,#1a5276)` 改为 `var(--accent-hover)`。
- **#12 eyebrow 对比**：typography.css `.eyebrow` 颜色 `--accent` → `--accent-hover`（深蓝，小字过 AA）。

已 `npm run build` 验证。剩余 #5(OKLCH/品牌蓝)、#6(字体)、#7(eyebrow精简)、#11(结构) 需用户决策，待后续步骤。

**Files modified:**
- `styles/tokens.css` — 具名缓动 token
- `styles/base.css` — 全局 :focus-visible
- `styles/hero.css` — transition 具体属性 + accent-hover
- `styles/pages/home.css` — scroll-card hover 弱化
- `styles/typography.css` — eyebrow 深蓝

### 新增深色点缀 token #3E3F40 / #1F2021 / #060606

在 `styles/tokens.css` 新增 `--dark-1`(#3E3F40) / `--dark-2`(#1F2021) / `--dark-3`(#060606)，作为深色按钮等点缀色，接续白→灰三档形成完整灰阶。仅新增变量、未引用到任何元素（避免误改现有按钮）。已 `npm run build` 验证。

**Files modified:**
- `styles/tokens.css` — 新增 --dark-1/2/3
- `README.md` — 灰阶说明补深色档

### 全站灰阶重定为三档 #FFFFFF / #E5E5E5 / #CBCCCC

按用户给的白→灰三色号调整 `styles/tokens.css`：
- 白 #FFFFFF → `--surface-elevated`
- 浅灰 #E5E5E5 → `--bg`、`--surface`
- 中灰 #CBCCCC → `--bg-alt`、`--border`、`--border-strong`

注意：15 个 CSS 文件里仍有 37 处硬编码的 `#fff` / `#F9FAFB`（多为内容 section 白底），不走这些变量、暂未改。待用户确认是否一并纳入三档。已 `npm run build` 验证。

**Files modified:**
- `styles/tokens.css` — bg/bg-alt/surface/border/border-strong 改为三档灰
- `README.md` — 更新灰阶说明

### Why Trust It 卡5 换成"几人看屏"图

卡5（Human authority）最终改用自制人物群组 SVG `public/assets/human-authority.svg`：深蓝底 + 前排一个亮蓝人物 + 后排两个暗蓝人物（user-icon 造型剪影），呼应"人一起把关审核/发布权"，与卡2 hydrograph SVG 成套。仅改 `.evidence-bg-4`。已 `npm run build` 验证。（中间试过两人照片/裁头、几人照片，最终按用户给的 user 图标做成群组矢量图。）

**Files created / modified:**
- `public/assets/human-authority.svg` — 新建自制人物群组图
- `styles/pages/home.css` — `.evidence-bg-4` 指向该 SVG

**Files modified:**
- `styles/pages/home.css` — `.evidence-bg-4` 换为几人看屏图

### Why Trust It 卡2 换成自制 observed vs projected hydrograph SVG

卡2（Validated results）改用自制矢量图 `public/assets/hydrograph-validation.svg`：深蓝底 + 淡网格 + 一条实测洪峰（填充面积 + accent-light 描边）+ 一条预测虚线紧贴叠合 + Observed/Projected 图例。蓝色系配合卡片深蓝底，零版权、离线稳定，精准呼应"还原实测洪峰洪量"。仅改 `.evidence-bg-1` 指向该 SVG。已 `npm run build` 验证。

**Files created / modified:**
- `public/assets/hydrograph-validation.svg` — 新建自制 hydrograph 对比图
- `styles/pages/home.css` — `.evidence-bg-1` 由 Unsplash 图改为本地 SVG

### Why Trust It 卡4 换成本地 EGU 2026 真实照片

卡4（Published research）改用本地图 `public/assets/egu2026.jpg`（HydroAgent Lab 在 EGU 2026 的真实口头报告照片，大屏幻灯 + 讲者）。`background-size: auto 100%`（填满卡高、不额外放大）、`background-position: left center` 聚焦左侧幻灯；底部深蓝渐变遮罩未动，仅替换图片。已 `npm run build` 验证。

**Files modified:**
- `styles/pages/home.css` — `.evidence-bg-3` 改为本地 egu2026.jpg + 放大/左对齐/no-repeat

### Why Trust It 图 2–5 改为语义对应图（放弃统一色系）

用户改要求：优先语义对应，不必都是自然图。图 1 保留流域图，2–5 按文字换：
- 卡2 Validated results → 数据/分析屏（photo-1526628953301）
- 卡3 Multi-LLM ready → AI 电路+脑（photo-1677442135703）
- 卡4 Published research → 会议演讲台（photo-1587825140708，对应 EGU 口头报告）
- 卡5 Human authority → 签署文件（photo-1562564055，对应人保留审核/发布权）

偏深调选图以配白字；卡片底部深蓝渐变遮罩提供统一底调。WebFetch 按主题抓候选 + `curl` 验证 4 个直链均 200。已 `npm run build` 验证。

**Files modified:**
- `styles/pages/home.css` — `.evidence-bg-1..4` 换 4 张语义对应图

### Why Trust It 图 2–5 换语义对应 + 冷蓝统一色系图

图 1 保留（山云流域，冷蓝青调）。图 2–5 换成与各自文字对应、且统一冷蓝色系的河流/水景图（Unsplash，免费商用）：
- 卡2 Validated results → 激流白沫（photo-1747585003133）
- 卡3 Multi-LLM ready → 辫状河多支流（photo-1759322639533，多支流≈多模型）
- 卡4 Published research → 雾中山水（photo-1558515093，研究沉静感）
- 卡5 Human authority → 人临水望桥（photo-1693845610623）

改前用 WebFetch 按主题抓 Unsplash 候选、并 `curl` 验证 5 个直链均 200，全部冷蓝调以贴合图 1。已 `npm run build` 验证。

**Files modified:**
- `styles/pages/home.css` — `.evidence-bg-1..4` 换 4 张冷蓝语义对应图

### Why Trust It 卡片文字改居中

标题与证据正文均 `text-align: center` 居中（先前试过两端对齐，因窄屏字间距过大改为普通居中）。仅改 `styles/pages/home.css`。已 `npm run build` 验证。

**Files modified:**
- `styles/pages/home.css` — `.evidence-label` 与 `.evidence-text` 均 `text-align:center`

### Why Trust It 换河流主题免费图 + 标题基线对齐

按需求回到照片方案（弃用上一版自制 SVG）：第 1 张保留原 flip-card 背景图（山云流域 photo-1470071459604），第 2–5 张换成 4 张河流/水景图，与第一张成套。图片来源 Unsplash（Unsplash License，免费商用、无需署名），改前用 `curl` 逐一验证 5 个直链均返回 200，避免坏链。

**标题对齐修复**：原来文字块 `justify-content: flex-end` 底端对齐，导致 5 张卡标题因文字长短不同而上下错位。改为 `.evidence-overlay` 绝对定位 + 固定 `top`（桌面 190px / ≤600px 150px），所有卡标题从同一水平基线开始、向下延伸——标题对齐。移除内联 SVG（`evidence-art`/`wave`/`line`）与 `hydroLines`。

已 `npm run build` 验证通过。

**Files modified:**
- `components/pages/home.js` — 移除 `hydroLines` 与内联 `<svg>`，evidence-card 回到纯 `.evidence-overlay` 结构
- `styles/pages/home.css` — `.evidence-bg-*` 由深蓝渐变改为 5 张 Unsplash 河流照片；删除 SVG art 样式；`.evidence-overlay` 改绝对定位固定 top（标题基线对齐）；加深底部遮罩；≤600 响应式同步
- `README.md` — 更新 evidence 卡说明为照片 + 基线对齐版

### Why Trust It 卡片改用自制水文 SVG 背景（弃用外链图）

把 5 张卡的 Unsplash 外链风景图全部替换为**自制抽象水文图形**：每张卡 = 深蓝渐变底 + 内联 SVG（两层半透明水波 + 一条白色"水文过程线"）。5 条过程线形状各异，呼应各自证据——基流平缓 / 单洪峰 / 多峰 / 阶梯放水 / 缓升。零外链、离线稳定、零版权、与 accent 蓝成套。层级 z-index：SVG(0) < 底部深蓝渐变(1) < 文字(2)，保证白字可读。

已 `npm run build` 验证通过。

**Files modified:**
- `components/pages/home.js` — 新增 `hydroLines`（5 条过程线 path）；每张 evidence-card 内联 `<svg class="evidence-art">`（两层 `.evidence-wave` + `.evidence-line`）
- `styles/pages/home.css` — `.evidence-bg-*` 由 Unsplash url 改为深蓝渐变；新增 `.evidence-art`/`.evidence-wave`/`.evidence-line` 及 z-index 分层
- `README.md` — 更新 evidence 卡说明为自制 SVG 版

### Why Trust It 卡片重排为图片背景卡（不翻转）

按需求把 trust 区块从上一版"纯文字常显卡"改为**图片背景卡**：5 张竖版图片卡横排一行，标签 + 证据全文压在图片底部（深黑渐变保证白字可读），**不翻转**——文字常显、触屏/键盘可达。用 flex 底对齐 + `min-height`（非固定 `aspect-ratio`），同行 grid 自动等高、长证据文字不被裁。网格 `max-width:1000px` 居中，两侧留白。响应式：≤900 → 3 列，≤600 → 2 列。恢复使用最初的 5 张 Unsplash 图（`.evidence-bg-0..4`）。

已 `npm run build` 验证，24 页静态导出通过。

**Files modified:**
- `components/pages/home.js` — evidence-card 加 `evidence-bg-${i}` 背景类 + `.evidence-overlay` 包裹标签与证据
- `styles/pages/home.css` — `.evidence-*` 重写为图片背景卡（flex 底对齐、min-height、底部渐变 `::before`、5 张 `evidence-bg-*` 图）；新增 ≤900/≤600 响应式列数
- `README.md` — 更新 evidence 卡说明

### 接入 Google Analytics 4

全站接入 GA4（衡量 ID `G-6G0RNE8L4Z`）。因线上站点由 Next.js 静态导出部署（`out/`），根目录遗留 HTML 不生效，故代码加在根布局 `app/layout.js`，用 `next/script`（`strategy="afterInteractive"`）加载，一次覆盖全部 en/zh 路由。旧属性 `G-38YWP282HR` 为重建前遗留，未接入。已 `npm run build` 验证，GA ID 出现在 42 个导出页面中。

**Files modified:**
- `app/layout.js` — 导入 `next/script`，在 `<body>` 末尾加入 gtag.js 加载与 `gtag('config', 'G-6G0RNE8L4Z')`
- `README.md` — 新增 Analytics 说明

## 2026-06-30

### Hero 流光改浅蓝

流光色 → 浅蓝 `rgba(147,197,253,0.9)`(#93C5FD)。仅改 `styles/hero.css`。

**Files modified:**
- `styles/hero.css` — `.hero-monitor::before` 流光色 → 浅蓝 `rgba(147,197,253,0.9)`

### Hero 流光改蓝紫色

流光色 → 蓝紫 `rgba(124,92,255,0.9)`。仅改 `styles/hero.css`。

**Files modified:**
- `styles/hero.css` — `.hero-monitor::before` 流光色 → 蓝紫 `rgba(124,92,255,0.9)`

### Hero 流光改柠檬黄

流光色 `rgba(224,229,234,0.9)` → 柠檬黄 `rgba(255,237,74,0.9)`。仅改 `styles/hero.css`。

**Files modified:**
- `styles/hero.css` — `.hero-monitor::before` 流光色 → 柠檬黄 `rgba(255,237,74,0.9)`

### Hero 流光加一点灰

流光色 `rgba(255,255,255,0.9)` → 淡灰白 `rgba(224,229,234,0.9)`。仅改 `styles/hero.css`。

**Files modified:**
- `styles/hero.css` — `.hero-monitor::before` 流光色 → `rgba(224,229,234,0.9)`

### Hero 流光换回普通白色

撤销金属多段渐变，改回普通 `linear-gradient(90deg, transparent, rgba(255,255,255,0.9), transparent)`。粗细 2.5px 不变。仅改 `styles/hero.css`。

**Files modified:**
- `styles/hero.css` — `.hero-monitor::before` 改回普通白色流光

### Hero 流光白核拉长

纯白由单点改为 `47%–53%` 平台(白核更长)，两侧 `43/57` 近白过渡、`36/64` 银灰肩，保持柔和。仅改 `styles/hero.css`。

**Files modified:**
- `styles/hero.css` — `.hero-monitor::before` 白核改 47–53% 平台

### Hero 流光白核窄但更柔

肩部 `44/56`→`40/60`，并在 `47%/53%` 加近白过渡色，使亮度平滑升白→白核窄但不尖锐。仅改 `styles/hero.css`。

**Files modified:**
- `styles/hero.css` — `.hero-monitor::before` 渐变加过渡色(白核窄而柔)

### Hero 流光白核收窄

银灰肩部由 `34%/66%` 移近到 `44%/56%`，白色 50% 尖峰过渡更短→白核更窄更锐。仅改 `styles/hero.css`。

**Files modified:**
- `styles/hero.css` — `.hero-monitor::before` 渐变肩部移近(白核变窄)

### Hero 流光调细

`background-size` 高度 `4px → 2.5px`。仅改 `styles/hero.css`。

**Files modified:**
- `styles/hero.css` — `.hero-monitor::before` background-size 高 4px→2.5px

### Hero 流光改金属反光多段渐变

流光由单色改为金属反光带：`透明→银(205,214,224,.55)→亮白#fff高光核→银→透明` 多段 `linear-gradient`，模拟光滑过金属面。仅改 `styles/hero.css`。

**Files modified:**
- `styles/hero.css` — `.hero-monitor::before` 流光改多段金属反光渐变

### Hero 流光改亮银色

流光色由银灰 `rgba(216,222,229,1)` 提亮为亮银 `rgba(238,242,246,1)`(减灰)。仅改 `styles/hero.css`。

**Files modified:**
- `styles/hero.css` — `.hero-monitor::before` 色 → 亮银 `rgba(238,242,246,1)`

### Hero 流光调亮加粗改银灰

流光色 `rgba(232,237,242,0.95)`→银灰 `rgba(216,222,229,1)`(满透明度更亮)，粗细 `2px`→`4px`。仅改 `styles/hero.css`。

**Files modified:**
- `styles/hero.css` — `.hero-monitor::before` 色→银灰满透明、`background-size` 高 2px→4px

### Hero 流光改为银白色

上下边流光由 `var(--accent)`(主题蓝)改为银白 `rgba(232,237,242,0.95)`。仅改 `styles/hero.css`。

**Files modified:**
- `styles/hero.css` — `.hero-monitor::before` 流光色 → 银白 `rgba(232,237,242,0.95)`

### Hero 手机端修复副作用：top/left 归零恢复居中

上次 `static→relative` 后，基础规则的 `top:1%/left:66%` 在 relative 下生效导致主图右下偏移。补 `top:auto;left:auto;`，主图回到居中(同 static 视觉)，同时保留 relative 以修复背景光定位上下文。仅改 `styles/hero.css`。

**Files modified:**
- `styles/hero.css` — `@media max-width:900px` 内 `.hero-monitor-wrap` 加 `top:auto;left:auto`

### Hero 修复手机端背景光铺满整个 hero

手机端 `.hero-monitor-wrap` 原为 `position:static`，导致内部 `position:absolute` 的 `.hero-glow`(inset -6px)失去定位上下文、相对 `.hero` 定位而铺满整个 hero。改为 `position:relative`(仍在流内、margin auto 居中)恢复定位上下文。仅改 `styles/hero.css`。

**Files modified:**
- `styles/hero.css` — `@media max-width:900px` 内 `.hero-monitor-wrap` `static`→`relative`

### Hero 流光改为主题蓝

上下边流光由白色 `rgba(255,255,255,0.85)` 改为 `var(--accent)`(主题蓝 #3b82f6，暗色模式自动 #60a5fa)。仅改 `styles/hero.css`。

**Files modified:**
- `styles/hero.css` — `.hero-monitor::before` 流光色 → `var(--accent)`

### Hero 羽化背景光移到左上/右下

两层 `.hero-glow` radial 由 top-right/bottom-left 移到 top-left/bottom-right(即移到缺角处)。仅改 `styles/hero.css`。

**Files modified:**
- `styles/hero.css` — `.hero-glow-1/2` radial 移到 top-left/bottom-right

### Hero 去掉缺角包边

删除 `.hero-monitor-wrap::before` 整条规则(缺角斜边包边)。缺角处保留 `::after` 蓝色柔罩；直角处保留羽化柔光。仅改 `styles/hero.css`。

**Files modified:**
- `styles/hero.css` — 删除 `.hero-monitor-wrap::before`

### Hero 缺角色带改为只贴斜边的包边

色带由「实心填充+截图遮挡」改为精确渐变带：去掉 clip-path/inset，`inset:0`，`--d:calc(var(--cut)*0.707)`(方角→斜边垂距)，`linear-gradient(135deg/315deg)` 仅在 `[--d-5px, --d+4px]` 上色，其余透明 → 只包 45° 斜边、不沿直边、不进内部。仅改 `styles/hero.css`。

**Files modified:**
- `styles/hero.css` — `.hero-monitor-wrap::before` 改为基于 `--cut` 垂距的斜边渐变包边

### Hero 修复窄屏缺角色带露出实心三角

窄屏时 `12%` 实心填充比 `--cut`(16px) 还小→整块实心三角露出。改为固定 `50px` 实心(始终>缺角)，多余部分被截图盖住，只留 inset 决定的窄带。仅改 `styles/hero.css`。

**Files modified:**
- `styles/hero.css` — `.hero-monitor-wrap::before` 实心填充 `12%`→`50px`

### Hero 缺角色带宽度减小 40%

`wrapper::before` inset `-7px → -4.2px`，缺角蓝色色带宽度减小约 40%。仅改 `styles/hero.css`。

**Files modified:**
- `styles/hero.css` — `.hero-monitor-wrap::before` inset -4.2px

### Hero 缺角柔罩统一为同款蓝

`::after` 柔罩由浅蓝 `#cfe7f7` 改为同缺角色带的蓝 `#7aa0ff`(rgba 122,160,255)，保持线性透明度渐变。仅改 `styles/hero.css`。

**Files modified:**
- `styles/hero.css` — `::after` 柔罩色 → `rgba(122,160,255,…)`

### Hero 统一两组背景光颜色

缺角(TL/BR)锐利色带统一蓝 `#7aa0ff`(左上由 `#cfe7f7` 改蓝)；直角(TR/BL)羽化柔光两层统一浅蓝 `#cfe7f7`(左下由 `#7aa0ff`/`#cfdeff` 改浅蓝)。仅改 `styles/hero.css`。

**Files modified:**
- `styles/hero.css` — `wrapper::before` 缺角色带统一 `#7aa0ff`；`.hero-glow-1/2` 羽化统一 `#cfe7f7`

### Hero 缺角锐利角光改为缺角色带(clip-path 略大)

`wrapper::before` 加缺角 clip-path 并 inset -7px(比截图略大)，使其斜边在截图斜边外侧，沿缺边露出等宽实心色带、方角尖端留空；linear 角渐变把色限制在两缺角。inset 控制色带宽度。仅改 `styles/hero.css`。

**Files modified:**
- `styles/hero.css` — `.hero-monitor-wrap::before` 加缺角 clip-path + inset -7 形成等宽缺角色带

### Hero 缺角锐利角光改为沿斜边楔形包裹(非填满) — 已回退

试了楔形(透明角→实色沿斜边)，用户不满意，回退到沿斜边实心硬边三角(`linear-gradient(135deg/315deg, 色 0→9% 硬截断→transparent)`)。

**Files modified:**
- `styles/hero.css` — `.hero-monitor-wrap::before` 回退为实心硬边三角

### Hero 缺角锐利角光改为沿斜边硬边包裹(非填满)

`wrapper::before` 由 radial 圆形渐隐改为与 45° 切角斜边平行的硬边三角(`linear-gradient(135deg/315deg, 色 0→9% 硬截断→transparent)`)，实心包裹整个缺角斜边。仅改 `styles/hero.css`。

**Files modified:**
- `styles/hero.css` — `.hero-monitor-wrap::before` 改硬边三角(平行 chamfer)

### Hero 颜色规则反转：缺角=锐利角光+柔罩，直角=羽化柔光

形状不变(缺角仍 TL/BR)，对调颜色处理：羽化柔光 `.hero-glow` 移到直角 TR/BL；锐利角光 `wrapper::before` 移到缺角 TL/BR；彩罩 `::after` 方向 `45deg→135deg`(色落缺角 TL/BR)。仅改 `styles/hero.css`。

**Files modified:**
- `styles/hero.css` — glow 羽化移 TR/BL；锐利角光移 TL/BR；`::after` 135deg

### Hero 缺角对调回左上/右下(颜色随形状协调对调)

用户笔误(右下角出现两次)，按缺角=左上+右下、不缺角=右上+左下处理。clip-path 三处 replace_all 改回切 TL/BR；羽化柔光 `.hero-glow` radial 移回 TL/BR；锐利角光 `wrapper::before` 移到 TR/BL；彩罩 `::after` 方向 `135deg→45deg`(色落 TR/BL)。仅改 `styles/hero.css`。

**Files modified:**
- `styles/hero.css` — clip-path 改回 TL/BR；glow 羽化移 TL/BR；锐利角光移 TR/BL；`::after` 45deg

### Hero 左上/右下：锐利角光 + 同色透明度渐变彩罩

TL/BR(直角处)拆两层：新增 `.hero-monitor-wrap::before` 锐利角光(无 blur，radial `26% 38%` 小半径，只包裹边角细边；左上 `#cfe7f7`、右下 `#7aa0ff`)；`::after` 彩罩改回同色(浅蓝 `#cfe7f7`)、纯透明度渐变(`.22→0→0→.22`)的柔罩(撤销硬边三角)。仅改 `styles/hero.css`。

**Files modified:**
- `styles/hero.css` — 新增 `.hero-monitor-wrap::before` TL/BR 锐利角光；`::after` 改回同色透明度渐变

### Hero 缺角与背景色对调到另一对角

缺角由 TL/BR 改为 TR/BL（`clip-path` 多边形改写，截图/彩罩/流光三处同步 replace_all）。羽化背景光 `.hero-glow` radial 移到 top-right/bottom-left（保留 blur，透过缺角显柔光）。`::after` 改为左上/右下两个**硬边**三角色块（`linear-gradient` hard-stop 15%，无模糊）：左上浅蓝 `rgba(207,231,247,.55)`、右下蓝 `rgba(122,160,255,.45)`。仅改 `styles/hero.css`。

**Files modified:**
- `styles/hero.css` — clip-path 缺角改 TR/BL；glow radial 移 TR/BL(羽化)；`::after` 改 TL/BR 硬边三角(不羽化)

### Hero 彩罩左上改为同背景浅蓝

`::after` 彩罩左上端由 `rgba(122,160,255)` 改为同背景的浅蓝 `rgba(207,231,247)`(=`#cfe7f7`)，右下端不变。仅改 `styles/hero.css`。

**Files modified:**
- `styles/hero.css` — `::after` 左上渐变色 → `rgba(207,231,247,…)`

### Hero 左上黄改为 symbol 最浅蓝

两层背景光左上由黄改为 symbol 里最浅的淡蓝 `#cfe7f7`(层1/层2 统一)，右下蓝不变。仅改 `styles/hero.css`。

**Files modified:**
- `styles/hero.css` — `.hero-glow-1/2` 左上 → `#cfe7f7`

### Hero 羽化背景光边缘

去掉 `.hero-glow` 的 `clip-path`(裁剪在 blur 之后会把边重新切硬)，改用更大 blur 羽化所有边：层1 blur 8→16，层2 6→11。彩光仍填满截图缺角，但边缘全软。仅改 `styles/hero.css`。

**Files modified:**
- `styles/hero.css` — `.hero-glow` 移除 clip-path；`.hero-glow-1/2` blur 加大羽化

### Hero 背景光加回(黄/蓝)并做缺角

把两层背景光加回(层1 `#f8d36f`/`#7aa0ff`、层2 `#fcefc4`/`#cfdeff`，左上黄右下蓝)，并给 `.hero-glow` 加与截图同款 `clip-path` 缺角，使切角缺口透出黄/蓝而非白底。`--cut` 提到 `.hero-monitor-wrap` 供 glow/截图/彩罩/流光共享。`hero.js` 加回两个 `.hero-glow` span。白色流光保留。

**Files modified:**
- `styles/hero.css` — 加回 `.hero-glow-1/2` 并加缺角 clip-path；`--cut` 移至 `.hero-monitor-wrap`
- `components/hero.js` — 加回两个 `.hero-glow` span

### Hero 上下边加白色流光动画

新增 `.hero-monitor::before`（z:3，裁同款缺角）放两条白色光带：上边 `background-position -45%→145%`(左→右)、下边 `145%→-45%`(右→左)，`background-size 45% 2px`，`animation hero-edge-beam 3.6s linear infinite`，模仿光线沿上/下边流动。加 `prefers-reduced-motion` 关闭动画。仅改 `styles/hero.css`。

**Files modified:**
- `styles/hero.css` — 新增 `.hero-monitor::before` 上下边白色流光 + `@keyframes hero-edge-beam` + reduced-motion 守卫

### Hero 彩罩左上角也加同款蓝

`::after` 改为左上+右下双端淡蓝(同 alpha 0.22)、中间(45%~55%)透明的对称 `linear-gradient(135deg, …)`。仅改 `styles/hero.css`。

**Files modified:**
- `styles/hero.css` — `::after` 渐变改左上/右下对称双蓝

### Hero 去掉全部背景光，仅留图上一点蓝彩罩

彻底移除两层背景光：删 `.hero-glow/.hero-glow-1/.hero-glow-2` CSS 及 `hero.js` 两个 `<span>`（wrapper 保留承载定位）。图上彩罩 `::after` 去掉黄色端，只留右下淡蓝 `linear-gradient(135deg, 透明 55% → rgba(122,160,255,.22) 100%)`。

**Files modified:**
- `styles/hero.css` — 删除 `.hero-glow*` 规则；`::after` 仅保留右下淡蓝
- `components/hero.js` — 移除两个 `.hero-glow` span

### Hero 去掉左上角背景光

两层背景光去掉左上黄色 radial，只保留右下蓝(层1 `#7aa0ff`、层2 `#cfdeff`)。图上彩罩 `::after` 未动(仍含淡左上黄)。仅改 `styles/hero.css`。

**Files modified:**
- `styles/hero.css` — `.hero-glow-1/2` 移除 top-left 黄色 radial

### Hero 配色调浅 + 背景光缩小 + 图上叠淡彩罩

颜色再调浅：层1 `#f8d36f`/`#7aa0ff`，层2 `#fcefc4`/`#cfdeff`。背景光缩小：radial 尺寸 78%/120%→55%/85%、66%/100%→46%/70%，inset/blur/opacity 微降。新增图片上方彩罩：`--cut` 提到 `.hero-monitor` 复用；新增 `.hero-monitor::after`（与切角同形 clip-path）叠 `linear-gradient(135deg, 黄.22→透明38%→透明62%→蓝.22)`，大范围透明、线性渐隐，保持截图清晰。仅改 `styles/hero.css`。

**Files modified:**
- `styles/hero.css` — 两层光调浅缩小；`--cut` 移至 `.hero-monitor`；新增 `.hero-monitor::after` 图上淡彩罩

### Hero 左上改黄 + 右下还原原始蓝

按新参考图：左上由粉改暖金黄（层1 `#f3c44a`、层2 `#fbe7a8`），右下蓝从柔天蓝还原为原始蓝（层1 `#2d6cff`、层2 `#b6ccff`）。仅改 `styles/hero.css`。

**Files modified:**
- `styles/hero.css` — 左上 → `#f3c44a`/`#fbe7a8`(黄)；右下 → `#2d6cff`/`#b6ccff`(还原蓝)

### Hero 右下蓝改为参考图的柔天蓝

承上，把右下蓝由纯蓝改柔天蓝（偏青更淡）：层1 `#2d6cff`→`#8fcfe6`，层2 `#b6ccff`→`#c7e6f2`。整组配色统一为参考图的粉蓝大理石调。仅改 `styles/hero.css`。

**Files modified:**
- `styles/hero.css` — 两层右下蓝 → `#8fcfe6` / `#c7e6f2`

### Hero 左上粉色改为参考图的柔玫瑰粉

按用户提供的粉蓝大理石参考图，把左上粉色由霓虹洋红改柔和玫瑰粉：层1 `#ff27d9`→`#f07cb8`，层2 `#ffc6f5`→`#f9cce3`（右下蓝不变）。色值为按图近似。仅改 `styles/hero.css`。

**Files modified:**
- `styles/hero.css` — 两层左上粉色 → `#f07cb8` / `#f9cce3`

### Hero 彩光沿边延长 + 图片改缺角矩形

保持外溢宽度(inset/blur 不变)，把两层光的角部渐变由 `linear`(小三角)改为从角点出发的 `radial` 椭圆渐变(`78% 120% at top left`/`bottom right` 等)，使彩光沿相邻两条边铺展并 100%→0% 渐隐。图片 `.hero-video-bg` 用 `clip-path: polygon(...)` 切掉左上、右下两角(45° 缺角矩形，`--cut: clamp(16px,2vw,32px)`)，切角处露出背后彩光；圆角/`box-shadow` 移除，投影改到 `.hero-monitor` 的 `filter: drop-shadow` 以贴合切角轮廓。仅改 `styles/hero.css`。

**Files modified:**
- `styles/hero.css` — 两层光改 radial 沿边延长；`.hero-video-bg` clip-path 缺角矩形；`.hero-monitor` 加 filter drop-shadow

### Hero 光晕缩小 + 右下改蓝 + 去掉蓝图边框

按用户要求：两层光整体缩小 ~80%（`.hero-glow-1` inset -42→-8px、blur 46→9px；`.hero-glow-2` inset -22→-4px、blur 30→6px；三角形渐变收尾 50%→10%）；右下角颜色改蓝（层1 `#4d36ff`→`#2d6cff`，层2 `#beb6ff`→`#b6ccff`；左上洋红/粉彩不变）；删除蓝图边框（移除 `.hero-monitor` 的网格底/蓝线框/留白带/box-shadow 及 `::before` 内框、`::after` 四角标记，`.hero-monitor` 变无框透明容器）；截图改 `border-radius:6px` + 淡投影。清理一处遗留旧注释。仅改 `styles/hero.css`。

**Files modified:**
- `styles/hero.css` — 两层光缩小+右下改蓝；删除蓝图边框(`.hero-monitor` 及其 `::before/::after`)；`.hero-video-bg` 圆角 6px+淡投影

### Hero 边框背后加两层炫彩羽化光

在蓝图框背后加两层羽化彩光：新增 `.hero-monitor-wrap` 承接原 `.hero-monitor` 的画布百分比定位，`.hero-monitor` 改 `position:relative;width:100%;z-index:1`；两层光层 `.hero-glow-1/2` 作为兄弟置于 monitor 之后（在其背后 z:0）。每层用两段 `linear-gradient` 在左上/右下画直角三角形并 100%→0% 透明渐隐 + `filter:blur` 羽化。层1（饱和）`#ff27d9`(左上)/`#4d36ff`(右下)，inset -42px、blur 46px；层2（粉彩）`#ffc6f5`/`#beb6ff`，inset -22px、blur 30px。`.hero` 的 `overflow:hidden` 兜住光的外溢。`hero.js` 包一层 wrapper + 两个 `<span>` 光层。响应式选择器 `.hero-monitor`→`.hero-monitor-wrap`。

**Files modified:**
- `components/hero.js` — monitor 外包 `.hero-monitor-wrap` + 两个 `.hero-glow` span
- `styles/hero.css` — 新增 `.hero-monitor-wrap` 定位、`.hero-glow-1/2` 两层羽化彩光；`.hero-monitor` 改相对定位；响应式选择器改 wrapper

### Hero 显示屏边框改为「蓝图线框风」(替换玻璃屏)

按用户选择把 `.hero-monitor` 从玻璃屏改成技术制图/蓝图风：浅蓝网格"图纸"底（双向 `linear-gradient` 12px 网格 + `#f3f8fd` 纸色）+ 细蓝外框 `1px solid var(--bp-line,#2b6cb0)` 方角(4px)+ 留白带 `padding:clamp(8px,1vw,16px)`；`::before` 内框双线（蓝半透明）贴住截图；`::after` 用 8 段 linear-gradient 画四角 L 形定位标记(crop marks)。截图保持原彩色，圆角改 2px。移除玻璃眩光/渐变 bezel/顶部高光。`--bp-line` 可统一调色。

**Files modified:**
- `styles/hero.css` — `.hero-monitor` 重做为蓝图网格框；`::before` 内框线、`::after` 四角定位标记；`.hero-video-bg` 圆角 2px

### Hero 显示屏边框升级为「高级玻璃屏」

在变细+右下柔影基础上加玻璃质感细节层：bezel 改竖向微渐变 `linear-gradient(180deg,#232c3c,#141b26)`（上浅下深）；外阴影叠 `inset 0 1px 0 rgba(255,255,255,.14)` 顶部高光描边；新增 `.hero-monitor::after` 覆盖屏幕做对角眩光 `linear-gradient(135deg, rgba(255,255,255,.22)→透明 42%)` + 内阴影 `inset 0 -12px 22px rgba(15,23,42,.12)`（截图嵌进玻璃下），`pointer-events:none`。桌面手机通用。

**Files modified:**
- `styles/hero.css` — `.hero-monitor` bezel 渐变+顶部高光；新增 `.hero-monitor::after` 眩光+内阴影玻璃层

### Hero 显示器边框微调（变细 / 阴影减少并改右下）

针对 `cf3eeef` 引入的 `.hero-monitor` 显示器外框：边框 bezel 减薄（padding `clamp(1px,0.12vw,2px)…` → `clamp(0.5px,0.06vw,1px)…`，`border` 保持 1px）；阴影由两层「全包/向下居中」改为单层右下方向 `box-shadow: 6px 8px 16px rgba(15,23,42,0.1)`（更淡、不再全包）；WebUI 图与外框纵向上移 15 个百分点：`--hero-img-top` 16% → 1%。

**Files modified:**
- `styles/hero.css` — `.hero-monitor` padding 减薄、box-shadow 改单层右下；`--hero-img-top` 16%→1%

## 2026-06-29

### 首页 Hero 手机端改回流式堆叠（图上居中、文下）

手机端从「方案 A 竖向画布 + 绝对定位」改回**流式堆叠**：`.hero-stage` 改 `display:flex; flex-direction:column; align-items:center; aspect-ratio:auto; max-width:none`；`.hero-video-bg` 改 `position:static; width:86%; margin:8px auto 0`（居中）；`.hero-copy` 改 `position:static; width:100%; padding:24px 20px 0`（在图下方，样式不变）；隐藏 `.hero-stage::before` 梯度模糊；h1 clamp 微调。桌面端固定画布不受影响。

**Files modified:**
- `styles/hero.css` — 重写 `@media max-width:900px`：手机端流式堆叠（图上居中/文下），隐藏梯度模糊层

## 2026-06-28

### 首页 Hero 图片下移 10%

桌面 `--hero-img-top` 由 6% 调到 16%（占画布高，下移 10 个百分点）。手机端 `--hero-img-top:3%` 未动。

**Files modified:**
- `styles/hero.css` — 桌面 `--hero-img-top` 6%→16%

### 首页 Hero 去掉白底毛玻璃，改回左→右梯度模糊

撤销 `.hero-copy` 的白色毛玻璃卡片（背景/模糊/边框/投影/padding 全移除，恢复纯文字）。改加 `.hero-stage::before` 梯度模糊层：`backdrop-filter: blur(5px)` + 左→右 mask（0–28% 实、58% 淡出），左侧（文字处）模糊、右侧（图片）清晰。z-index:1 处于图片(0)与文字(2)之间 → 文字仍清晰。

**Files modified:**
- `styles/hero.css` — `.hero-copy` 移除毛玻璃；新增 `.hero-stage::before` 左→右梯度模糊

### 首页 Hero 文字区加白色毛玻璃背景

`.hero-copy` 加毛玻璃卡片：`background: rgba(255,255,255, var(--hero-copy-bg-alpha,0.2))`（高透明 ~80%）+ `backdrop-filter: blur(14px) saturate(120%)`，配淡边 `border rgba(255,255,255,.55)` 与轻投影，使其在白底上也可见。加 `box-sizing:border-box`、`padding clamp(16-26px)`、`border-radius:16px`。alpha 由 `--hero-copy-bg-alpha` 可调。桌面手机共用。

**Files modified:**
- `styles/hero.css` — `.hero-copy` 增加毛玻璃背景/模糊/边框/投影/内边距

### 首页 Hero 文字上移（桌面+手机）

截图显示文字掉到折叠线以下。原因：画布 aspect 1.9 在宽屏算出来过高、超过可视区，文字又锚在底部 12%。调整：桌面 `--hero-aspect 1.9→2.35`（画布压扁落回一屏）+ `--hero-copy-bottom 12%→18%`（文字抬高）；手机 `--hero-aspect 0.82→0.92` + `--hero-copy-bottom 9%→20%`。

**Files modified:**
- `styles/hero.css` — 桌面/手机的 `--hero-aspect`、`--hero-copy-bottom` 上调

### 首页 Hero 改为「固定宽高比画布 + 百分比布局」（方案 A，位置锁定/尺寸自适应）

用户诉求：改变窗口宽/高时，图文相对位置不变、尺寸自适应。根因：旧方案图片按视口宽(%)、hero 高按 100vh，横竖两把尺子 → 宽高比变化就漂移。选方案 A 实现：
- `.hero` 改为画布容器（`padding-top:header` 避导航、`display:flex; justify-content:center` 居中画布），去掉 `min-height:100vh`。
- `.hero-stage` 改为**固定宽高比画布**：`aspect-ratio: var(--hero-aspect)`、`width:100%`、`max-width: var(--hero-canvas-maxw,1600px)`。形状恒定 → 内部一切百分比恒定。
- `.hero-video-bg`、`.hero-copy` 全部用画布百分比定位（top/left/bottom/width 均 %）。新增变量：`--hero-aspect/-canvas-maxw/-img-top/-cx/-width/-copy-left/-bottom/-width`（全 %）。
- 字体改 `clamp()`（h1/subtitle/text）随画布缩放；移除 640/1200px 的 h1 断点覆盖。
- 手机端：同一画布换**竖向比例** `--hero-aspect:0.82`、`--hero-canvas-maxw:none`，重设 % 旋钮；h1 用 clamp。
- `.brand-hero-scrim` 改 display:none（文字已在白底上，不再压图）。

**Files modified:**
- `styles/hero.css` — 重写 `.hero`/`.brand-hero`/`.hero-stage`/`.hero-video-bg`/`.hero-copy`；字体 clamp；scrim 隐藏；手机端画布竖向比例；删 640/1200 h1 覆盖

### 首页 Hero 手机端图片放大

手机端 `--hero-img-width` 由 50% 提到 62%，`--hero-img-cx` 由 70% 微调到 68%（放大后避免右缘溢出）。

**Files modified:**
- `styles/hero.css` — `@media max-width:900px`：`--hero-img-width` 50%→62%、`--hero-img-cx` 70%→68%

### 首页 Hero 手机端图片上移

手机端 `--hero-img-top` 由 `header+12px` 改为 `var(--header-height)`（贴齐导航底边，上移 12px）。这是图不被固定导航遮挡的最高位置。

**Files modified:**
- `styles/hero.css` — `@media max-width:900px` 的 `--hero-img-top` 上移到 header 高度

### 首页 Hero 桌面全宽段统一图片上移（2/3 宽不再与文字平行）

问题：base 桌面 `--hero-img-top=2×header`（图偏低），仅 ≥1440px 才升到 1.1×header；故 ~2/3 宽（<1440）时图下落与文字平行。改为全桌面统一用"最宽屏"处理：base `--hero-img-top` 直接设 `1.1×header`，`.hero-video-bg` 加 `max-width: var(--hero-img-maxw,820px)` 封顶（防止宽屏图变高掉到文字层）；删除 1440px 特例。任意桌面宽度图片都稳定在文字右上方。手机端不受影响（仍覆盖 --hero-img-top，图小于 820 cap 无效）。

**Files modified:**
- `styles/hero.css` — base `--hero-img-top` 2×→1.1×header；`.hero-video-bg` 加 max-width 封顶；删 `@media min-width:1440px`

### 首页 Hero 手机端改为与电脑端一致（图右上、文左下）

手机端原为竖向流式堆叠（图上文下、负 margin 重叠）。现因图文已用「固定锚点」模型不漂移，手机端直接沿用桌面布局：取消流式覆盖，`.hero-stage` 保持 `display:contents`、图文恢复绝对定位。手机端仅重设旋钮：`--hero-img-top=header+12px`、`--hero-img-cx:70%`（中心偏右）、`--hero-img-width:50%`、`--hero-copy-left:6%`、`--hero-copy-bottom:8%`；`.hero-copy max-width:58%`（窄屏文字加宽）、h1 1.5rem。`.hero` 恢复 base 的 `min-height:100vh`（不再 auto），底部文字有参照。移除负 margin 重叠、白底 blur、流式 padding。

**Files modified:**
- `styles/hero.css` — 重写 `@media max-width:900px`：手机端沿用桌面绝对锚定，仅调旋钮；删除流式堆叠/重叠/白底

### 首页 Hero 去掉背景模糊

删除 `.brand-hero::after`（左→右渐变 backdrop-filter blur 层），hero 背景改为清晰；并移除手机端 display:none 组里对它的引用。保留文字左侧白色渐变 scrim（仅做可读性，不模糊）。注：手机端文字白底的轻微 blur 与按钮玻璃 blur 未动，如需一并去掉请告知。

**Files modified:**
- `styles/hero.css` — 删除 `.brand-hero::after` 模糊层及手机端引用

### 首页 Hero 宽屏图片上移（脱离底部）

宽屏（`@media min-width:1440px`）图片按宽变高、底部逼近 hero 底。新增覆盖：`--hero-img-top` 降为 `1.1×header`（整体上移）+ `.hero-video-bg max-width:820px`（封顶尺寸，不再变高）→ 底部抬离地面。其它屏宽不受影响。

**Files modified:**
- `styles/hero.css` — 新增 `@media min-width:1440px`：图上移 + max-width 封顶

### 首页 Hero 图片改 TOP 锚定（导航下一格）、文字独立锚左下，宽度变化不漂移

问题：group 底对齐时，缩窄屏幕→图片（按宽缩放）变矮→其顶部下移逼近文字，间距变了。改为图文各自独立锚定到 hero 固定点：
- 图片：`position:absolute; top: var(--hero-img-top,=2×header)`（顶部位于导航栏下方一个导航高度），`left: var(--hero-img-cx,66%) + translateX(-50%)`（水平中心落在中心偏右）→ 顶点与中心 x 固定，任意宽度位置不变，仅尺寸随宽缩放。
- 文字：`position:absolute; left/bottom`（左下），固定偏移不漂移。
`.hero-stage` 桌面端改 `display:contents`（溶解盒子，让图文成为 .hero 直接子级以各自绝对定位）；手机端补 `display:flex` 恢复竖向流式。移除 1600px 断点特例（它正是"最大屏≠窄屏"的根源）及 `--hero-img-shift/-rise/-stage-*` 变量，新增 `--hero-img-top/-cx`、`--hero-copy-bottom`。

**Files modified:**
- `styles/hero.css` — 图片 TOP+中心 x 绝对锚定；文字左下绝对锚定；`.hero-stage` 桌面 display:contents/手机 display:flex；删 1600px 特例；变量改版

### 首页 Hero 替换主图为 Webui.png

`components/hero.js` 的 `.hero-video-bg` src 由 `/assets/webui_light.jpeg` 改为 `/assets/Webui.png`。

**Files modified:**
- `components/hero.js` — 主图 src 改为 `/assets/Webui.png`

### 首页 Hero 最宽屏图片放大+左移

最宽屏（`@media min-width:1600px`）图片放大 10%（`--hero-img-width:50%→55%`）并左移（`--hero-img-shift:-15%`，translateX 按图自身宽）。`.hero-video-bg` 新增 `transform: translateX(var(--hero-img-shift,0%))`——用 transform 而非 margin，避免 55% 宽时无剩余空间导致 margin 失效/溢出，且不挤压文字。仅覆盖变量，文字↔图片锁定关系不变；其它屏宽不受影响。

**Files modified:**
- `styles/hero.css` — `.hero-video-bg` 加 translateX(`--hero-img-shift`)；新增 `@media min-width:1600px` 覆盖 `--hero-img-width/-shift`

### 首页 Hero 桌面端文字+图片合并为一个 group（彻底锁定相对位置，自适应屏幕）

问题：百分比锚定仍把文字锚到 hero 底、图片锚到 hero 中上，二者分属不同基准 → 大屏上 hero 变高、间距随之拉大，图片"飘到顶部"。根因：只要文字与图片各自锚到 hero 的不同边，二者「相互距离」就不可能恒定。
方案：把图片与文字放进同一个 `.hero-stage`（flex 行，`align-items:flex-end` 底对齐），group 以「底部距 hero 底 8%」整体锚定，图片在右、上抬 `--hero-img-rise`，文字在左。二者相对位置由布局决定 → 恒定；group 作为整体随屏幕平移，图片不再飘顶。新增 DOM 包裹层 `.hero-stage`（`components/hero.js`）。手机端 `.hero-stage` 改 `flex-direction:column` 静态流式（图上文下，重置 order），沿用既有重叠/白底。新增变量 `--hero-stage-bottom/-gap`、`--hero-copy-width`、`--hero-img-rise`，移除 `--hero-img-left/-top`、1200px 的 `.hero-copy max-width` 覆盖。

**Files modified:**
- `components/hero.js` — 用 `.hero-stage` 包裹 `.hero-video-bg` + `.hero-copy`；scrim 移到 stage 外作背景层；删除空的 `.hero-cards-crop`
- `styles/hero.css` — 新增 `.hero-stage` flex group；`.hero-video-bg`/`.hero-copy` 改为 group 内列项；手机端 stage 改 column 静态；移除 1200px max-width 覆盖；变量改版

### 首页 Hero 桌面端文字/图片改为「百分比锚定」（锁定相对位置不漂移）

问题：桌面文字与图片位置随屏幕变化漂移（图用 scale+translateX(vw/%)、文字用 vh 内边距，标尺不一致）。改为全部以 **hero 盒子的百分比** 定位：文字 `left:15% / bottom:10%`；主图锚在中心偏右——`left:48%` 为图左缘、`width:52%` 为图宽（均按 hero 宽）、`top:40%` 标记图的垂直中心（hero 正中再上移 10% → 偏上 10%），`translateY(-50%)` 把图自身中线对到该点。所有值相对 hero → 任意屏幕尺寸下文字↔图片比例关系恒定。新增可调变量 `--hero-copy-left/-bottom`、`--hero-img-left/-top/-width`，移除旧的 `--hero-img-scale/-tx`。

**Files modified:**
- `styles/hero.css` — `.hero` 变量改为百分比锚点；`.hero-video-bg`、`.hero-copy` 改用 hero 百分比定位

### 首页 Hero 移除输入栏叠加图（桌面+手机）

主图重裁后已含搜索框，输入栏叠加图全局多余。从 `components/hero.js` 删除 `<img class="hero-bottom-bar">`（省一次图片请求），并清理 `styles/hero.css` 中失效的 `.hero-bottom-bar` 基础规则及手机端 display:none 引用。

**Files modified:**
- `components/hero.js` — 删除 hero-bottom-bar 图片元素
- `styles/hero.css` — 移除 `.hero-bottom-bar` 基础规则、手机端 display:none 中的该选择器

### 首页 Hero 手机端去掉输入栏图（主图已含搜索框）

用户重裁主图，已包含四卡片+底部搜索框。手机端将 `.hero-bottom-bar` 加入 `display:none` 组，仅保留全宽主图 + 文字流式堆叠。电脑端未改（仍叠加底栏）——注意：主图既含搜索框、桌面又叠输入栏，桌面可能出现重复，待用户确认。

**Files modified:**
- `styles/hero.css` — `@media (max-width:900px)`：`.hero-bottom-bar` 改 display:none，主图单独 static 全宽

### 首页 Hero 手机端改为流式堆叠（彻底锁定图↔图↔文字关系）

此前两图用 vw 定位、文字用 vh(bottom) 定位，宽高比不同的手机上文字与图仍会错位。用户选「流式堆叠」。手机端媒体查询整体重写：取消所有绝对定位/transform/scrim/blur，`.hero-video-bg`、`.hero-bottom-bar` 改 `position:static; width:100%; height:auto`，按 DOM 顺序（主图→输入栏→文字）自上而下流式排列；两图同宽(1907)全宽拼回完整界面。`.hero` min-height:auto、`padding-top: header+8px` 避开固定导航。间距由文档流决定，任意手机不再漂移。移除手机端不再用的 `--hero-img-*`/`--hero-bar-top` 等变量。

**Files modified:**
- `styles/hero.css` — `@media (max-width:900px)` 重写为流式堆叠（static 全宽图 + 文字流排，隐藏 scrim/blur/tag）

### 首页 Hero 手机端两图竖向偏移改 vw（锁定相对位置）

问题：两图 `width:100%×scale`，高度随屏宽变；而竖向偏移 `--hero-img-top/--hero-bar-top` 是固定 px，一个随宽变一个不变 → 换屏幕两图相对位置漂移。改为 vw 单位（`16vw` / `21.5vw`，按 ~560px 测试宽换算自原 88px/120px），偏移与图高同用「按屏宽」标尺，任意屏宽下两图相对关系锁定不漂移。横移 `--hero-img-tx:0%`（百分比本就按宽）、scale 无单位，均已按宽自适应。

**Files modified:**
- `styles/hero.css` — `@media (max-width:900px)`：`--hero-img-top` 88px→16vw、`--hero-bar-top` 120px→21.5vw

### 首页 Hero 手机端底栏上移（贴顶跟在主图下方）

底栏被压在底部且在文字图层(z-index2)之下而看不见。手机端把底栏从「贴底 bottom:56px + translateY(-125%)」改为「贴顶 top:var(--hero-bar-top,210px) + bottom:auto」，origin 改 left top，去掉竖向 translateY，使其位于主图正下方、避开下方文字。新增变量 `--hero-bar-top` 便于上下微调。

**Files modified:**
- `styles/hero.css` — `@media (max-width:900px)`：底栏改 top 锚定 + `--hero-bar-top:210px`

### 首页 Hero 手机端关掉左侧遮罩/模糊（修复图看不见）

图靠左后正好落在「左→右白色 scrim + 左侧 blur」最浓处被糊掉，用户以为没图。手机端禁用 `.brand-hero::after`（blur）、`.brand-hero-scrim` 背景设 none。文字在下方白底为深色，无需遮罩仍清晰。

**Files modified:**
- `styles/hero.css` — `@media (max-width:900px)`：`.brand-hero::after{display:none}`、`.brand-hero-scrim{background:none}`

### 首页 Hero 手机端两图改左对齐（图靠左、文字让位）

按用户选择，手机端两图由「沿用电脑端右偏」改为左对齐：`--hero-img-tx: 0%`（去右移）、两图 `transform-origin` 改 `left top/left bottom`（从左边缘缩放，贴左不右溢）；`--hero-img-scale: 0.6`（0.65 偏大下调）。文字仍在左下、与上方图错开垂直区，不被遮挡。

**Files modified:**
- `styles/hero.css` — `@media (max-width:900px)`：`--hero-img-tx:0%`、两图 origin 改 left、scale 0.65→0.6

### 首页 Hero 手机端改双图等比模型并缩小

手机端原为单张 cover 满屏图（隐藏底栏）。改为与电脑端一致的双图 width 等比模型：取消底栏 `display:none`、删除主图 cover 覆盖（继承电脑端 width 等比），在 `.hero` 上覆盖共享 `--hero-img-scale: 0.5`（电脑端 0.75）使两图同步缩小且对齐；`--hero-img-top: 96px` 手机端主图下移量。底栏竖向/横向暂沿用电脑端值，待手机端实测再调。

**Files modified:**
- `styles/hero.css` — `@media (max-width:900px)`：双图等比、`--hero-img-scale:0.5`、`--hero-img-top:96px`，显示底栏

### 首页 Hero 手机端高度与电脑端一致

确认手机端无单独高度规则，本就继承电脑端 `.brand-hero { min-height:100vh }`。但手机浏览器 `100vh` 按「地址栏隐藏」的最大视口算，会比可见屏幕高，hero 显得更长。手机端媒体查询显式设 `.hero, .brand-hero { min-height: 100dvh }`，按手机实际可见高度算，使其与电脑端一样恰好一屏。电脑端 `100vh` 不变。

**Files modified:**
- `styles/hero.css` — `@media (max-width:900px)` 新增 `.hero, .brand-hero { min-height: 100dvh }`

### 首页 Hero 容器铺满整屏（文字真正落到屏幕左下）

文字已 `absolute bottom:0` 钉 hero 底部，但 hero 因 `margin-top:-header` + `min-height:calc(100vh - header)`，可见底边落在 `100vh - 2×header`，比屏幕底短两个导航高度，文字看似浮在中部。`.brand-hero` min-height 由 `100vh - header` 改为 `100vh + header`，hero 铺满整屏，文字落到屏幕左下角。

**Files modified:**
- `styles/hero.css` — `.brand-hero` min-height `calc(100vh - header)` → `calc(100vh + header)`

### 首页 Hero 文字恢复左下（绝对定位）

主图改 `height:auto` 后 hero 无在流内容撑高，`.hero-copy` 的 `flex:1 + justify-content:flex-end` 失去多余空间，文字停在内容自身位置（看似居中）。改为 `position:absolute; left:0; bottom:0` 钉死左下，不再依赖 flex 撑高。

**Files modified:**
- `styles/hero.css` — `.hero-copy` 由 `relative/flex:1` 改 `absolute/left:0/bottom:0`

### 首页 Hero 两图统一 width 模型 → 精确左右对齐

根因：主图 `object-fit: cover` 按视口高度放大、横向倍数随窗口高宽比变化，与底栏的 `width:100%` 等比模型不一致，故对不齐且换屏幕会偏。两图均为同一截图的 1907px 宽裁切，只要都按宽度等比即可对齐。

- 主图 `.hero-video-bg`：`object-fit:cover` + `height:100%` → 改为 `width:100% / height:auto`（横向铺满整宽、纵向自然），`top: var(--hero-img-top)` 控竖向，origin 改 `30% top`。
- 底栏 `.hero-bottom-bar`：移除之前的 `+10%/+20%` 偏移，`translateX` 回到与主图共享的 `var(--hero-img-tx)` → 两图同宽同移，任意视口精确对齐。
- `.hero` 新增 `--hero-img-top` 变量。
- 手机端 `@media (max-width:900px)`：补回 `inset:0 / height:100% / object-fit:cover`，保持满屏。

**Files modified:**
- `styles/hero.css` — 主图改 width 等比模型、底栏移除横向偏移、新增 `--hero-img-top`、手机端补回 cover

## 2026-06-27

### 首页 Hero 底栏单独右移 20%（同日修订）

主图保持 `object-fit: cover` 铺满不变；底栏 `.hero-bottom-bar` 因与主图 fit 模型不同，需额外横向偏移对齐卡片。`translateX` 由 `var(--hero-img-tx)` 改为 `calc(var(--hero-img-tx) + 20%)`（即主图横移 +20% 向右），scale 仍与主图共享。

**Files modified:**
- `styles/hero.css` — `.hero-bottom-bar` translateX 增加 `+20%` 偏移

### 首页 Hero 电脑端两图左右对齐 + 缩放统一（同日修订）

电脑端主图 `.hero-video-bg` 与底部输入栏 `.hero-bottom-bar` 的横向缩放/横移参数不一致（0.75/10% vs 0.95/12.2%）导致两图未对齐。改用共享 CSS 变量 `--hero-img-scale` / `--hero-img-tx`（定义在 `.hero` 上），两图同引用，横向缩放与位置完全一致、左右对齐；底栏仅保留 `translateY(-25%)` 控制竖向。以后只改 `.hero` 上两个变量即可同步两图。

**Files modified:**
- `styles/hero.css` — `.hero` 新增 `--hero-img-scale: 0.75` / `--hero-img-tx: 10%`；`.hero-video-bg` 与 `.hero-bottom-bar` 横向 transform 改引用变量

### 首页 Hero 手机端背景缩放回调（同日修订）

手机端 `scale(1.5)` 放得太大，图内容向上溢出顶到固定导航栏。改为 `scale(1.05) translateX(8%)`，仅略放大、留在 hero 区域内不顶导航。同时移除手机端 `.hero-copy` 的 padding/max-width 覆盖，文字定位完全沿用电脑端（bottom-left，同一 padding 模型），只保留标题字号 1.75rem 的小屏缩小。

**Files modified:**
- `styles/hero.css` — `@media (max-width: 900px)`：`.hero-video-bg` scale 1.5 → 1.05；移除 `.hero-copy` 覆盖，文字与桌面一致

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

### 首页 Hero 手机端文字上移 + 图片下移到按钮下方（同日修订）

`.hero-copy` 改 `justify-content: flex-start` + `padding-top: header+24px`（文字/按钮置顶）；主图 `translateY 5%→25%`、提问栏 `translateY -25%→-5%`（图片下移到按钮下方）。

**Files modified:**
- `styles/hero.css` — 移动端 hero-copy 顶部对齐；两图 translateY 下移

### 首页 Hero 手机端改为"卡片裁剪横幅在上、文字左下"（同日修订）

弃用难控的叠加变换。手机端新增 `.hero-cards-crop`（`components/hero.js` 加 div），用 `background-image` + `background-size:330%` + `background-position:57% 54%` 裁出四个功能卡片做居中横幅（`order:-1` 置顶、aspect 3/1、圆角边框）；隐藏 `.hero-video-bg`/`.hero-bottom-bar`/scrim/模糊/tag；文字 `.hero-copy` 仍 `flex-end` 左下。桌面端不变（`.hero-cards-crop` 默认 display:none）。

**Files created/modified:**
- `components/hero.js` — 新增 `.hero-cards-crop` div
- `styles/hero.css` — 新增 `.hero-cards-crop`（base 隐藏 + 移动端卡片裁剪横幅）；移动端隐藏原叠加元素

### 首页 Hero 手机端改为整图放大置于文字上方（同日修订）

按澄清：不裁四卡片，整张图 scale 放大放文字上方。`.hero-cards-crop` 参数由紧裁卡片改为整图轻度放大：`aspect-ratio 3/1→16/9`、`background-size 330%→150%`、`background-position 57% 54%→center`。缩放用 background-size 控制（=scale）。

**Files modified:**
- `styles/hero.css` — `.hero-cards-crop` 改为整图放大（16/9、150%、center）

### 首页 Hero 手机端回到叠加版（满屏底图+左下文字+左右梯度模糊）（同日修订）

按需求手机端弃用裁剪横幅，回到最初叠加版：`.hero-video-bg` 满屏底图放大 `scale(1.5) translateX(8%)`；文字 `.hero-copy` `flex-end` 左下；scrim 与 `.brand-hero::after`（左→右梯度模糊）继承 base 生效；隐藏 `.hero-bottom-bar`/`.hero-video-tag`；`.hero-cards-crop` 不再用（base 默认隐藏）。

**Files modified:**
- `styles/hero.css` — 移动端回到叠加式：底图放大 + 左下文字 + 继承左右梯度模糊

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

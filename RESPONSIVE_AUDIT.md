# 多设备显示适配审计 (Responsive Audit)

> 分支: `fix/responsive-multidevice`
> 范围: Next.js 静态导出站点 (`app/` + `components/` + `styles/`)，部署到 GitHub Pages。
> 根目录的 `index.html` / `product.html` 等为遗留文件，**非**线上内容，本次不处理。

## 根因 (Root Cause)

整站响应式几乎只依赖**单一断点 `@media (max-width: 900px)`**：

| 断点 | 出现次数 |
|---|---|
| `max-width: 900px` | 20 |
| `min-width: 901px` (含 `…and max-width:1100px`) | 4 |
| `max-width: 600px` | 1 |
| `prefers-reduced-motion` | 1 |

后果：页面从**完整桌面布局**直接跳到**单列手机布局**，缺少系统化的中间层（平板 600–900px）和两端层（小屏手机 ≤480px、大屏 ≥1440px）。排版尺寸大多是**固定 px/rem**，只有 hero 用了 `clamp()`，因此在不同尺寸间不会平滑缩放。

---

## 问题清单 (按严重度)

### 🔴 P0 — 会导致明显破版 / 横向滚动

1. **时间轴硬宽度溢出**（真实 bug）
   `styles/pages/home.css` — `.tl-left p` / `.tl-right p` 设了 `width: 380px`（固定）。在 ≤900px 时 `.timeline-item` 变成 `width:100%`，但内部 `<p>` 仍是 380px。屏宽 < ~412px 的手机（iPhone SE/12 mini、多数安卓）上，文本块比容器宽 → **整页横向滚动**。

2. **缺少全局横向溢出兜底**
   `html/body` 没有 `overflow-x` 防护。Hero 的绝对定位元素、`50vw` 计算、`min-width: 44vw`（contact）、上面的 380px 等任一处溢出，都会让**整页在手机上左右晃动**——这是移动端「不丝滑」最常见的元凶，目前没有安全网。

3. **搜索框固定 `min-width: 240px`**
   `styles/pages/capabilities.css:219` — 在 320px 窄屏 + 容器内边距下，输入框可能顶破其 flex 容器。

### 🟠 P1 — 不破版但体验割裂

4. **断点断层：桌面 → 单列之间无平板层**
   多列栅格（`repeat(2/3, 1fr)`，见 home / platform / team / careers / white-papers）大多在 900px 直接塌成单列。600–900px 的竖屏平板要么过早单列、要么挤着多列，缺 2 列过渡。

5. **排版不流式**
   标题几乎全是固定值：`page-lead h1` = 2rem、各 `h2` = 1.75rem、`split-row dt` = 18px 等。小屏手机上偏大易换行别扭；4K 大屏上偏小、留白过多。全站只有 hero 用了 `clamp()`。

6. **Hero 平板横屏 (901–1100px) 拥挤**
   Hero 桌面用固定比例画布 (`--hero-aspect: 2.35`)，文字列锁死在 34% 宽。在 ~1000px 宽时文字列仅约 340px 且画布偏矮，文案显拥挤；900–全桌面之间无过渡处理。

7. **固定头部高度 / 段落留白在手机上过大**
   `--header-height: 124px` 全断点固定，`.main-content` 顶部留白 124px；移动端导航更矮，非 hero 页顶部出现大块空白。各 section 的 `80px` / `64px` 垂直内边距在小屏上偏重。

### 🟡 P2 — 打磨项

8. **翻转卡片 / 预览卡在小屏偏挤**
   `.flip-card` 固定 `height: 45vh` 且移动端 2 列；`.preview-module-grid` 在 ≤900 仍是 2 列。360px 宽手机上偏窄。

9. **大屏 (≥1440px) 无放大**
   内容上限 1080px，超宽屏留白多、字偏小，无流式放大。可接受，但影响「跨尺寸一致丝滑」观感。

10. **触摸目标**
    抽屉内若干链接/语言切换的可点区域可能 < 44px，触控友好度有提升空间。

---

## 修复策略

**增量层 `styles/responsive.css`（globals.css 最后 `@import`）+ 少量外科手术式修补**，不重写已调好的桌面 CSS。覆盖项：

- **全局兜底**：`html, body { overflow-x: clip }`、媒体元素 `max-width:100%`、iOS 文本自动放大关闭。
- **修 P0-1**：时间轴 `width:380px` → `max-width:380px`。
- **流式排版**：核心标题改 `clamp()`，小屏不挤、大屏不空。
- **小屏手机层 (≤560px)**：收紧 section 内边距、紧凑两列栅格单列化、预览/翻转卡单列、proof pills 换行。
- **移动端节奏**：`--header-height` 与 section 内边距在 ≤900 下调。
- **搜索框溢出兜底**：`min-width: min(240px, 100%)`。

> 取舍：先 ship 这层补齐「能在所有设备正常、顺滑显示」，hero 平板横屏的精细重排 (P1-6) 与大屏放大 (P2-9) 作为后续 iterate 项，不阻塞本次发布。

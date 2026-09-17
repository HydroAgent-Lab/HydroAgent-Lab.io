# public/assets — 静态资源目录说明

Next.js 把 `public/` 下的内容**原样**导出到 `out/`，所以那里的每一个文件都会被部署到线上。
引用方式是绝对路径 `/assets/<子目录>/<文件名>`（不要写 `public/`）。

> **本文件刻意放在项目根目录，不放在 `public/assets/` 里。**
> Next.js 没有提供排除 `public/` 内单个文件的机制 —— 放进去就等于发布，线上可通过
> `/assets/README.md` 直接访问。本文档是内部约定，只在仓库里可见即可。
> 因此 **`public/assets/` 下只放资源文件，不要放任何 `.md` / 说明文件。**

> 项目根目录另有一个 `assets/`，那是给**遗留静态页**（`index.html` / `product.html` / `proof.html` /
> `team.html` / `egu-2026.html` / `manuscript-brief.html`）用的，与 `public/assets/` 无关，两者不要混用。

## 目录约定

| 目录 | 用途 | 主要消费方 |
|---|---|---|
| `brand/` | Logo、favicon、站点标识 | `app/layout.js`（icon/shortcut/apple）、`components/shell.js`、`components/demo-chat.js` |
| `home/` | 首页用图：hero 图、架构图（中英两版）、evidence 卡装饰背景 | `components/pages/home.js`、`styles/pages/home.css` |
| `platform/` | Platform 页配图与背景视频（`flood-scene.mp4`） | `components/pages/platform.js` |
| `careers/` | Careers 页背景视频（`sky.mp4`） | `components/pages/careers.js` |
| `contact/` | Contact 页 inquiry 卡图标 | `content/pages/contact.js`（中英两份共用同一图） |
| `team/` | 团队整体形象图 | `styles/pages/designv2.css` |
| `lab-members/` | 成员头像，文件名 = 姓名拼音 | `content/team-members.js` |
| `hydroagent_webui/` | WebUI 界面截图（中英两版） | `components/hero.js` |
| `demo/` | Demo 流程步骤图 | Demo 页 |
| `events/` | 活动现场照片（命名 `<姓名>_<地点或年份>_<序号>`）+ 合作方标识（`hydroturing-logo.png`，取自 flood-lab.github.io/HydroTuring，第三方版权） | `content/pages/events.js` |
| `EGU26/` | EGU 2026 专题：讲稿 PDF、现场照、合影 | `content/pages/events.js`、`styles/pages/home.css` |
| `papers/` | 论文正文附件与图（PDF / Figure） | `content/pages/research.js` |

> 视频按**使用页面**归目录（`careers/sky.mp4`、`platform/flood-scene.mp4`），不单设 `video/` —— 见下方规则 3。

## 新增文件时的规则

1. **必须放进子目录**，不要再往 `public/assets/` 根目录扔散文件。
2. **文件名用 kebab-case、全小写、纯 ASCII，不含空格与中文**。空格和中文在 URL 里都必须百分号编码
   （`洪水场景.mp4` 实际请求是 `%E6%B4%AA%E6%B0%B4%E5%9C%BA%E6%99%AF.mp4`），换服务器或 CDN 时是典型故障点。
   例外：`lab-members/` 用姓名拼音，`EGU26/` 沿用既有命名。
3. **按"用途"分目录，不按"文件类型"分**：找图时人是从页面反推的，不是从格式反推的。
4. **中英双版共用一张图**时放同一个文件；确需区分才加 `-en` / `-zh` 后缀（见 `hydroagent_webui/`）。
5. **不再被引用的图不要留在这里** —— 它仍会被打包部署。移到项目根的 `archive/figures/`。

## 检查引用是否失效

```bash
# 列出源码中引用、但磁盘上不存在的资源
grep -rhoI --exclude-dir=node_modules -E '/assets/[A-Za-z0-9_./-]+\.(png|jpg|JPG|jpeg|svg|webp|mp4|pdf)' \
  app components content styles | sort -u \
  | while read p; do [ -f "public$p" ] || echo "MISSING: $p"; done
```

已知例外：`styles/hero.backup_darkcolor.css` 引用的 `/assets/webui_black.jpg` 不存在，
但该文件是**未被 `globals.css` 引入的存档备份**，不影响构建。

反向检查（磁盘上有、但没人引用）把上面循环里的判断反过来即可。截至 2026-09-17，
以下 5 个文件**有意保留**，不是遗漏：

| 文件 | 保留原因 |
|---|---|
| `EGU26/EGU_26_pre_1.jpg`、`EGU26/EGU26_pre_2.jpg`、`EGU26/EGU26hydroagent-team.png` | EGU 2026 真实现场照，待接入 Events 页 |
| `events/qiusiqian_huilongguan_2.jpg` | 回龙观活动第二张照片，待接入 |
| `lab-members/zhouguoping.jpg` | `content/team-members.js` 中查无此人，归属待确认 |

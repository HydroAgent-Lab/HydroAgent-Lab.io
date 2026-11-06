# HydroAgent Paper Digest V2 — 设计变化总结与确认事项

> **文档用途：** 记录 V2 HTML 原型相对当前线上 Paper Digest 的变化、已形成的产品设计、待团队确认的问题，以及向现有网站代码迁移时的技术说明。
> **版本状态：** 交互设计原型 / Implementation reference，尚非生产代码。
> **整理日期：** 2026-11-06
> **对应原型：** 本包内 `prototype.html`

---

## 1. 项目背景与本轮目标

当前线上 Paper Digest 已经具备每日论文更新、按周分组、Published / Preprint 筛选、关键词搜索、论文摘要与证据局限展开阅读，以及邮件订阅等核心功能。

V2 的目标不是推翻原有网站，而是在保留 HydroAgent-Lab 品牌视觉和科研阅读定位的基础上，进一步完善论文发现、检索、AI 解读、收藏和分享体验。

本轮设计重点：

- 让 Highlights 成为更清晰的论文发现入口。
- 让 Latest papers 从简单列表升级为可组合筛选的论文浏览界面。
- 将 AI Summary & Evidence Limits 区域设计进行优化，方便阅读
- 增加无需登录的本地收藏及备份能力。
- 让桌面端和手机端均能自然阅读和操作。

## 2. 相对当前线上网站的主要变化

### 2.1 页面整体结构

| 区域 | 当前线上页面 | V2 原型方向 |
| --- | --- | --- |
| Header / Navigation | 沿用网站全局导航 | 保留网站导航，并在 Paper Digest 页面增加 Saved Papers 入口和数量 |
| Hero | 产品标题、介绍、订阅入口和更新信息 | 保留产品定位，强化 Latest Edition 信息卡和统计层次 |
| Highlights | 当前线上页面未形成独立的精选论文卡片区 | 新增独立 Highlights 区域，展示精选论文及推荐理由 |
| Latest papers | 按周分组、Published / Preprint 筛选、搜索 | 增加 Daily / Weekly / Monthly、Edition、Saved only、Domain / Method / Application 多维筛选 |
| AI Summary & Evidence Limits | 位于论文条目下方，可展开 | 延续内联展开方式，明确 Summary 与 Limits of the Evidence 两部分 |
| Saved Papers | 当前线上页面无完整个人收藏库 | 新增本地收藏、独立收藏视图、JSON 导入导出 |
| Share | 当前线上页面以原始论文外链为主 | 增加复制 HydroAgent-Lab 单篇 AI 解读锚点链接的能力 |
| Subscription | 接入现有订阅服务 | 原型仅保留视觉示意；生产版必须继续使用现有订阅组件和服务 |

### 2.2 Highlights

V2 增加独立的 Highlights 区域，当前原型中每篇精选论文展示：

- `Highlight` 标签。
- Domain 标签。
- 原始论文标题，点击后在新标签页打开原始论文链接。
- Why It Matters（一段推荐理由）。
- 出版来源和日期。
- Bookmark 和 Share 操作。

### 2.3 Latest papers 工具栏与筛选

V2 原型把工具栏组织为三个入口：

1. Search 搜索框。
2. Time / Edition 时间范围面板。
3. Filters 高级筛选面板。

时间范围面板包含：

- Daily / Weekly / Monthly 时间粒度切换。
- All editions / 具体期次选择。
- Paper Type 快捷筛选。
- Saved only 开关。
- 当前结果数量。

高级 Filters 面板包含：

- Paper Domain。
- AI / Method。
- Application。
- Reset all。

筛选逻辑采用 AND 关系：搜索词、具体期次、论文类型、Saved only、Domain、Method、Application 同时生效。列表分组和数量随筛选状态更新，并提供无结果状态与重置操作。

### 2.4 论文条目与 AI 分析

Latest papers 中每篇论文保留：

- Published / Preprint 状态。
- Added 日期和来源信息。
- 论文标题及原始论文链接。
- 一句简短内容预览。
- 作者、发表日期和分类标签。
- Bookmark、Share。
- 可展开的 `AI Summary & Evidence Limits`。

AI 分析保持两个部分：

1. Summary
2. Limits of the Evidence

正文采用连贯段落，而不是把每句话拆成独立项目符号。重要技术术语和数值可以适当加粗。Limits of the Evidence 使用独立的浅色背景和强调边线，方便用户辨认证据边界。

### 2.5 Saved Papers 收藏机制

V2 原型增加：

- Header 中的 Saved Papers 入口和收藏数量。
- 无需登录的本地收藏。
- 使用浏览器 `localStorage` 保存收藏 ID、收藏时间及必要的元数据快照。
- 独立 Saved Papers 收藏视图。
- 按最近收藏时间倒序展示。
- JSON Export / Import。
- 导入时按稳定 Paper ID 去重，并与现有收藏合并。
- Latest papers 的 Saved only 与同一份收藏数据联动。

产品边界：第一版不包含账号、云同步、跨设备自动同步、文件夹或团队协作。

### 2.6 Share 与深链接

V2 的 Share 目标不是原始论文 URL，而是 HydroAgent-Lab 对应论文的 AI 解读位置。

当前原型使用 `#brief-<slug>` 作为锚点（线上形式为 `https://hydroagentlab.com/paper-digest/#brief-<slug>`）：

- Share：复制当前论文的 AI Summary & Evidence Limits 深链接。
- 打开深链接：定位到对应论文条目，自动展开 AI Summary & Evidence Limits，并短暂高亮目标条目。
- Highlights 中无站内跳转入口：标题直达原始论文，卡内 Share 复制同一深链接。

各操作职责：

| 操作 | 行为 |
| --- | --- |
| Paper Title | 新标签页打开原始论文 |
| Bookmark | 保存到本地 Saved Papers |
| Share | 复制 HydroAgent-Lab 对应论文 AI 解读的深链接 |
| Highlights 卡片 | 标题直达原文；卡内含来源/日期与 Bookmark / Share |

---

## 3. 当前原型已经实现的内容

以下内容基于当前 HTML 文件本身，而不是未来计划：

- 单文件 HTML，内嵌 CSS 和原生 JavaScript。
- 桌面端与移动端响应式 CSS 断点。
- Search、Daily / Weekly / Monthly、Edition、Paper Type、Saved only 和三维高级筛选。
- AND 组合筛选、分组、结果数量、重置和空状态。
- 论文标题外链。
- AI Summary & Evidence Limits 两段式展开组件。
- Highlights 卡片（标题直达原文、Why It Matters、来源/日期、Bookmark / Share）。
- localStorage 收藏、Saved Papers 视图、JSON 导出和导入。
- Share 复制 `#brief-<slug>` 深链接。
- 键盘 Escape 关闭面板、`/` 聚焦搜索框等基础交互。
- 自动暗色模式 CSS 变量。

**代码检查说明：** 当前 HTML 中的内嵌 JavaScript 已通过 `node --check` 语法检查。该检查只代表脚本语法可解析，不等于已经完成跨浏览器、真机、无障碍或生产环境回归测试。

## 4. 当前原型的已知限制与尚未完全对齐的事项

在把 V2 作为开发依据之前，建议先处理或确认以下差异：

1. **Highlights 的文案旧表述——已解决。** 当前原型已将 `Papers the HydroAgent-Lab editors flagged as especially relevant` 替换为栏目级披露 `AI-surfaced · AI-generated · Not human-reviewed` 及说明句；筛选机制的真实口径仍待团队确认（见 §5.1）。
2. **Highlights 卡片内容——已确认。** 当前原型卡片只保留 Why It Matters，不含 Paper Overview，即为最终规范。
3. **Latest papers 仍有单条内容前的&#32;`AI`&#32;小标识。** 如果最终决定不在单篇条目重复显示 AI 来源标签，需要明确是否移除。
4. **移动端两个筛选面板的交互——已统一。** 当前原型中 Time 面板与 Advanced Filters 在手机端均为 Bottom Sheet，共用遮罩与关闭逻辑。
5. **Saved Papers 空状态——已解决。** 当前原型在收藏数量为零时隐藏 Export backup、保留 Import，并将说明改为短句 + “How saving works” 折叠展开。
6. **订阅表单不是生产实现。** 当前 HTML 提交后只显示 `Prototype only: nothing was submitted.`，生产环境必须保留现有 Brevo 订阅流程。
7. **原型数据是静态样本。** 当前 HTML 内嵌 8 条论文记录，并显示 `sample of 217`；论文数量、日期和部分统计为演示数据，不能作为生产数据源。另注意：`217` 本身与真实总量不符（仓库样本数据为 23 条），属占位数字，迁移时必须由真实数据动态生成。
8. **当前 HTML 主要是英文原型。** 生产网站已有 en / zh 双语结构，需要补充中文文案、标签翻译、字体与窄屏排版检查。

---

## 5. 建议由团队共同确认的产品问题

以下问题影响产品口径、数据结构或最终交互，建议在开始生产开发前集中确认。

### 5.1 Highlights 的筛选机制与透明度文案

需要确认：

- 论文是由 AI 主动选择，还是由规则 / 排序机制自动浮出？
- 如果是 AI 主动筛选，使用 `AI-selected`；如果是自动机制 surfaced，使用 `AI-surfaced`。
- 是否统一展示 `AI-generated · Not human-reviewed` 的栏目级说明？（注：当前原型已采用 `AI-surfaced · AI-generated · Not human-reviewed`；因无法证实存在显式的 AI 选择过程，不使用 `AI-selected`。）
- 是否保留 `A Highlight is a discovery label, not a quality grade.` 这样的解释？

**建议：** 对外文案必须与真实筛选机制一致，不要保留暗示人工编辑审核的措辞。

### 5.2 Highlights 卡片最终内容

需要确认最终卡片是否只保留：

- Highlight。
- Paper Domain。
- Paper Title。
- Why It Matters（一段推荐理由）。
- Publication Source / Date。
- Bookmark / Share。

**建议：** 如果 Highlights 的定位是“发现入口”，卡片只保留 Why It Matters，完整 AI Summary 留在 Latest papers 对应论文条目下。

### 5.3 Taxonomy 分类体系

需要确认三类标签的正式定义、可选值和数据来源：

- Domain：研究领域。
- Methods：采用的方法或技术。
- Application：应用场景。

已讨论的颜色映射：

- Domain：蓝色。
- Methods：青绿色。
- Application：淡紫色。
- Highlight：暖金色。

需要确定：分类是否允许多选、分类字段是否已进入正式 `papers.json` 数据结构、英文和中文如何对应，以及缺失分类时如何展示。

### 5.4 Paper Type 的正式分类

当前线上和当前原型主要采用 `Published / Preprint`。早期需求曾讨论 Journal、Conference、Preprint、Review 等更细分类。

**建议团队确认：** 第一版是否继续沿用 Published / Preprint，以保持与现有数据模型一致；如果要增加 Journal / Conference / Review，需要先确认上游数据是否能可靠提供这些字段。

### 5.5 AI Summary 与证据边界

建议保持两个且仅两个部分：

1. Summary
2. Limits of the Evidence

需要确认：

- 内容依据仅限 title / abstract，还是可使用全文？
- 缺失摘要、只有标题或只有元数据时如何展示？
- 是否始终显示 AI-generated 标签？
- Summary 和 Limits 是否都使用连续段落，而不是项目符号？

**建议：** 明确标注内容依据，不将推断写成论文已验证的结果。

### 5.6 Bookmark 的存储边界

当前设计为浏览器 localStorage，无需登录，也不跨设备同步，并提供 JSON 备份。

需要确认团队是否接受：

- 清除网站浏览器数据可能丢失收藏。
- 更换设备或浏览器不会自动同步。
- 用户需要自行导出 / 导入备份。

**建议：** 对第一版而言，这是成本较低且边界清楚的实现；暂不增加账号和云同步。

### 5.7 Share 深链接规则

需要确认正式论文数据是否有稳定且跨语言一致的 Paper ID。

建议将分享 URL 设计为稳定的论文锚点，并确保：

- 接收者无需登录即可打开。
- 页面能定位到对应论文。
- AI Summary & Evidence Limits 自动展开。
- 即使当前列表筛选条件隐藏该论文，也能恢复或定位到目标记录。
- en / zh 页面都能正确处理对应链接。

### 5.8 订阅与数据源

生产版必须继续使用现有 Brevo 订阅组件和当前论文数据流水线，不使用原型中的 mock 提交和静态样本数据。

需要确认：

- 217 等数量是否全部由真实数据动态生成。
- Highlights 是否由现有论文数据字段驱动。
- Why It Matters、AI Summary 和 Evidence Limits 的生成及存储字段由谁负责。
- 数据更新后，静态站点的构建和部署如何触发。

---

## 6. 原型能否直接用于开发？

### 结论

**可以作为高保真视觉与交互参考，并可复用其中的业务逻辑；但不建议把当前 HTML 文件直接作为生产页面部署，也不应把它视为已经完成的 Next.js 生产代码。**

### 原型与生产项目的技术差异

| 维度 | 当前 V2 HTML 原型 | HydroAgent-Lab 现有网站 |
| --- | --- | --- |
| 技术形式 | 单文件 HTML + 内嵌 CSS + 原生 JavaScript | Next.js 15 App Router，React 组件，静态导出 |
| 组件结构 | 页面模板函数和 DOM 事件委托 | 页面组件、Client Component、共享 Shell |
| 数据 | HTML 内静态数组，8 条演示记录 | 由 `papers.json` 加载，CI 接入独立数据仓库 |
| 样式 | 文件内 CSS 变量和媒体查询 | `styles/tokens.css`、`styles/pages/paper-digest.css` 等模块化样式 |
| 双语 | 当前原型以英文为主 | 现有网站 en / zh 双语 |
| 收藏 | localStorage 原型逻辑 | 需要移植到合适的 Client Component 状态管理中 |
| 订阅 | Prototype only 提示 | 现有 Brevo 订阅组件 |
| 部署 | 可本地打开的 HTML 文件 | Next.js 构建后静态输出到 `out/` |

### 建议的生产代码映射

结合当前 GitHub 仓库结构，建议按以下方式迁移，而不是复制整份 HTML：

| V2 原型模块 | 建议迁移位置 |
| --- | --- |
| 页面整体结构、Hero、Highlights、订阅区 | `components/pages/paper-digest.js` 及必要的新组件 |
| Latest papers、搜索、筛选、分组、展开 AI 分析 | `components/paper-digest-feed.js`（按职责拆分或扩展） |
| Highlights 卡片 | 可新增独立 `components/paper-digest-highlights.js` |
| AI Summary & Evidence Limits | 可拆成可复用的独立组件 |
| Paper Digest 页面样式 | `styles/pages/paper-digest.css` |
| 颜色、字体、间距 | 复用 `styles/tokens.css` 与现有全局设计变量 |
| 中英文文案 | `content/pages/paper-digest.js` |
| 过滤、日期分组、标签格式化 | `lib/paper-digest.mjs` |
| 真实论文记录 | 继续使用 `loadPaperDigest()` 加载的 `papers.json` |
| 收藏和 Share 交互 | Client Component 中实现；收藏数据保留在浏览器 localStorage |

### 开发时不可直接照搬的部分

- 不要把静态 `R` 数组作为生产数据源。
- 不要把 217、当前期次日期、更新时间写死。
- 不要用原型的 Subscribe 表单替换 Brevo。
- 不要把原型 CSS 全局覆盖到全站；应复用现有设计 Token，并把新样式限制在 Paper Digest 作用域内。
- 不要将样例 ID 当作生产 Paper ID；需使用上游数据中的稳定 ID。
- 不要只完成英文页；需同步 en / zh 文案和窄屏布局。
- 不要仅凭 `node --check` 通过就认为交互已经通过验收。

### 当前开发成熟度判断

- **视觉方向：** 可作为开发基准。
- **页面结构：** 可作为组件拆分依据。
- **交互逻辑：** 有可复用的实现参考，但需接入真实数据并做浏览器测试。
- **数据层：** 尚未接入生产数据，不可直接上线。
- **国际化：** 尚需补齐中文实现。
- **订阅：** 必须接回生产 Brevo 组件。
- **生产发布：** 需要在现有 Next.js / 静态导出 / CI 流程中重新实现并测试。

---

## 7. GitHub 提交建议

建议将原型和总结文档作为设计资料提交，不要放进会被直接部署为页面的目录。

可考虑新建目录：

```text
 design/
   paper-digest-v2/
     prototype.html
     DESIGN_SUMMARY.md
```

建议本次提交内容：

1. `prototype.html`：当前 V2 HTML 交互原型。
2. `DESIGN_SUMMARY.md`：本文件，记录设计变化、团队决策和技术迁移说明。

建议 Commit message：

```text
 docs: add Paper Digest V2 prototype and design notes
```

**提交前提醒：** 先完成第 5 节中的关键产品决策，或至少在文档中明确哪些事项仍为待确认状态；不要让团队误以为当前 HTML 已经是最终生产规范。

---

## 8. 参考资料

- 当前线上页面：[HydroAgent Paper Digest](https://hydroagentlab.com/paper-digest/)
- 网站代码仓库：[HydroAgent-Lab.io](https://github.com/HydroAgent-Lab/HydroAgent-Lab.io)
- 现有页面入口：`components/pages/paper-digest.js`
- 现有论文列表组件：`components/paper-digest-feed.js`
- 现有页面样式：`styles/pages/paper-digest.css`
- 全站设计变量：`styles/tokens.css`
- 论文数据处理：`lib/paper-digest.mjs`、`lib/load-paper-digest.js`
- 论文内容文案：`content/pages/paper-digest.js`

> 说明：本文件记录的是当前 V2 HTML 原型和当前公开仓库结构的对照结果。生产实现前，仍应以团队确认后的设计规范、最新 `main` 分支代码和真实 `papers.json` 字段为准。
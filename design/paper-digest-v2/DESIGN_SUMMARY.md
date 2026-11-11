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
| Hero | 产品标题、介绍、订阅入口和更新信息 | 保留产品定位，定位文案统一为 `LLM × Hydrology`（含 og:title），强化 Latest Edition 信息卡和统计层次；标题字号与官网其他页面一致（桌面 40px、移动 28px、字重 600）；**Hero**区的按钮中，实心蓝只用于 Subscribe to Digest，另一个使用描边样式。 |
| Highlights | 当前线上页面未形成独立的精选论文卡片区 | 新增独立 Highlights 区域，展示精选论文及推荐理由 |
| Latest papers | 按周分组、Published / Preprint 筛选、搜索 | 增加 Daily / Weekly / Monthly、Edition、Saved only、Domain / Method 多维筛选 |
| AI Summary & Evidence Limits | 位于论文条目下方，可展开 | 延续内联展开方式，明确 Summary 与 Limits of the Evidence 两部分 |
| Saved Papers | 当前线上页面无完整个人收藏库 | 新增本地收藏、独立收藏视图、JSON 导入导出 |
| Share | 当前线上页面以原始论文外链为主 | 增加复制 HydroAgent-Lab 单篇 AI 解读锚点链接的能力 |
| Subscription | 接入现有订阅服务 | 原型仅保留视觉示意；生产版必须继续使用现有订阅组件和服务。订阅区使用深蓝底（#0E2A47），不套白色卡片，表单直接置于深蓝底上，输入框为白色。 |

### 2.2 Highlights

V2 增加独立的 Highlights 区域，每篇精选论文展示：

- `Highlight` 标签（中性灰徽章）。
- Published / Preprint 类型标记；预印本卡片使用虚线描边。
- Domain 标签。
- 原始论文标题，点击后在新标签页打开原始论文链接。
- Why It Matters（一段推荐理由）。
- 来源行：期刊 · 第一作者 et al. · 日期。
- 「查看 AI 解读」链接（英文界面为 View AI Summary）：点击后跳到 Latest papers 中该论文的位置，并自动展开其 Summary 与 Limits of the Evidence；复用 Share 的锚点机制。
- Bookmark 和 Share 操作。

卡片不包含 Paper Overview；完整的 AI 解读位于 Latest papers 的对应论文条目中。

**其中**：`et al.` 仅在作者不止一人时使用；来源、作者或日期缺失时，省略该段，不输出空占位。

**筛选机制**

Highlights 由 AI 根据明确的筛选规则主动选择，而不仅仅是将 AI 发现或收集到的论文展示为精选。

论文筛选主要考虑以下三个方面，按优先顺序排列：

1. **期刊水平（Publication Quality）**：优先考虑发表在高水平期刊上的论文，具体依据团队提供的高水平期刊名单进行判断。名单已定稿（49 本期刊，另含 arXiv），全文见本节附录；名单的增删在确认后更新，服务器端同步进 WP #5 的 `enrichment.journal_whitelist` 配置。
2. **水文学相关性（Hydrological Relevance）**：优先考虑与水文学密切相关的论文。
3. **LLM Reasoning 质量（LLM Reasoning Quality）**：优先考虑 LLM reasoning 方面表现较好的研究工作。

**筛选轮次与执行机制（Selection Rounds）**

每轮 Highlights 筛选定义为一次按周触发的完整筛选任务，包括首次执行、必要的重试，以及最终成功保存筛选结果的过程。

**1. 每轮候选范围**

每轮筛选的候选论文包括：

- 新增论文：自上一轮成功截止时间之后新纳入 Paper Digest，且不晚于本轮数据快照截止时间的所有论文。
- 现有精选：上一轮仍然有效的 Highlights。

不按照自然周划分新增论文的范围，而是以上一轮成功截止时间作为下一轮的起点。

**2. 本轮时间窗口**

每轮任务启动时，记录本轮的数据快照截止时间，并确定候选论文的时间范围：

（上一轮成功截止时间，本轮数据快照截止时间]

本轮执行期间新入库的论文，不加入已经确定的本轮候选快照，而进入下一轮筛选。

**3. 成功与截止时间更新**

只有当本轮筛选结果成功保存后，才将成功截止时间推进至本轮记录的数据快照截止时间。

如果本轮没有新的合格论文，但筛选任务已成功完成评估并保存结果，则保留仍然有效的现有 Highlights，并正常推进截止时间。

**4. 失败与重试**

如果筛选失败或结果未能成功保存：

- 保留上一轮的 Highlights。
- 不更新成功截止时间。
- 不将本轮标记为成功完成。
- 后续重试继续使用本轮已经确定的时间窗口和候选数据快照。

同一轮中的重试不视为新一轮筛选。

**5. 新一轮启动**

上一轮成功完成后，下一次按周触发的筛选任务启动新的轮次，并以上一轮成功截止时间作为新增论文候选范围的起点。

通过上述机制，确保新纳入的论文能够获得一次筛选机会，并避免因筛选失败、任务重试或论文入库时间差异而遗漏候选论文。

每轮筛选仍遵循既定的精选规则，最多展示 3 篇 Highlights；仅当新旧合计无任何入选时，Highlights 区域整体隐藏。

**入选门槛**

没有有效摘要的论文不参与 Highlights 挑选。

**Why It Matters**

由 AI 为入选论文撰写简短的 Why It Matters，说明该研究的重要性及其对水文学领域的意义。

**数据来源**

精选结果与 Why It Matters 由服务器端（WP #5）生成、随论文数据下发，网站只负责展示；数据未就位时整个区域隐藏。

**透明度文案**

Highlights 仅保留一个标识：

`AI-selected`

删除原有的以下标签和说明：

- `AI-surfaced`
- `AI-generated`
- `Not human-reviewed`
- `A Highlight is a discovery label, not a quality grade.`

不再使用多重标签或额外的免责声明描述 AI 筛选过程。

- 中文页面的 `AI-selected`译作「AI 精选」。

**附：Highlights 期刊白名单**（比对时忽略期刊名的大小写、标点与 `&` / `and` 差别。）

- **水文与水资源**：Water Research、Water Research X、Journal of Hydrology、Journal of Hydrology: Regional Studies、Journal of Hydrology X、Hydrology and Earth System Sciences、Water Resources Research、Water Resources Management、Advances in Water Resources、Hydrological Processes、npj Clean Water
- **地学、环境与灾害**：Earth's Future、AGU Advances、Geophysical Research Letters、Communications Earth & Environment、Earth System Science Data、Geoscientific Model Development、Environmental Science & Technology、Environmental Science and Ecotechnology、Environmental Research Letters、Environmental Modelling & Software、Journal of Environmental Management、Ecological Indicators、Natural Hazards and Earth System Sciences、International Journal of Disaster Risk Reduction、International Journal of Geographical Information Science
- **Nature 系列与综合**：Nature、Nature Communications、Nature Climate Change、Nature Geoscience、Nature Sustainability、Nature Machine Intelligence、Nature Human Behaviour
- **工程与 AI 交叉**：Engineering Applications of Artificial Intelligence、Advanced Engineering Informatics、Reliability Engineering & System Safety、Sustainable Cities and Society、Computers and Electronics in Agriculture、Applied Energy、Engineering Structures、Transportation Research Part D: Transport and Environment、Journal of Transport Geography、Advanced Materials
- **新刊（中科院 2025 尚未收录）**：Nature Water、npj Natural Hazards、Journal of Geophysical Research: Machine Learning and Computation、npj Artificial Intelligence、Communications AI & Computing、npj Climate Action
- **预印名单**：arXiv（预印本服务器，非期刊；其预印本同样获得优先依据地位，但仍须满足水文相关性与 LLM reasoning 两项条件）

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

Paper Type 第一版只设 Published 与 Preprint 两类，与现有数据保持一致，不改动数据结构。（后续如需细分，优先增加 Conference，前提是采集端能稳定保留类型信息。）

高级 Filters 面板包含：

- Paper Domain。
- AI / Method。
- Reset all。

筛选逻辑采用 AND 关系：搜索词、具体期次、论文类型、Saved only、Domain、Method 同时生效。列表分组和数量随筛选状态更新，并提供无结果状态与重置操作。

**分类体系（Taxonomy）**

分类只设 Domain 与 Method 两个维度。两维度均可多选，每篇论文每个维度最多 2 个标签。

Domain（固定 6 个值）：

| English | 中文标签 | 数据 ID |
| --- | --- | --- |
| Catchment Hydrology | 流域水文 | `catchment_hydrology` |
| Floods | 洪涝 | `floods` |
| Water Resources & Reservoirs | 水资源与水库 | `water_resources_reservoirs` |
| Urban Water | 城市水务 | `urban_water` |
| Water Quality & Ecology | 水质与水生态 | `water_quality_ecology` |
| Groundwater | 地下水 | `groundwater` |

Method（固定 7 个值，平级，不分层级）：

| English | 中文标签 | 数据 ID |
| --- | --- | --- |
| Prompting | 提示工程 | `prompting` |
| RAG & Knowledge Graphs | 检索增强与知识图谱 | `rag_knowledge_graphs` |
| Fine-tuning & Domain Models | 微调与领域模型 | `fine_tuning_domain_models` |
| Agents & Tool Use | 智能体与工具调用 | `agents_tool_use` |
| Multi-agent | 多智能体 | `multi_agent` |
| Multimodal | 多模态 | `multimodal` |
| Benchmarks | 评测与基准 | `benchmarks` |

Method 标签按论文的核心技术贡献选取，不按层级取舍。

数据约定：分类由服务器端根据标题与摘要标注，已收录论文一次性补标；数据字段只存上表的英文 ID，不存显示文字，中英文显示名由网站按 ID 统一对应。缺少某维度分类的论文不显示该维度标签，也不写「未分类」；按该维度筛选时，该论文不出现在结果中。

标签样式：Domain 与 Method 标签统一使用中性灰徽章，颜色与字号取自 `styles/tokens.css` 的变量与现有层级；实心蓝只用于 Subscribe 按钮。

### 2.4 论文条目与 AI 分析

Latest papers 中每篇论文保留：

- Published / Preprint 状态（预印本使用虚线描边）。
- Added 日期和来源信息。
- 论文标题及原始论文链接。
- 一句简短内容预览。
- 作者、发表日期和分类标签。
- Bookmark、Share。
- 可展开的 `AI Summary & Evidence Limits`。

AI 分析保持两个部分：

1. Summary
2. Limits of the Evidence

正文采用连贯段落，而不是把每句话拆成独立项目符号。重要技术术语和数值可以适当加粗。Limits of the Evidence 使用独立的浅色背景和强调边线，方便用户辨认证据边界；其强调色（暖金）仅用于证据局限这一含义，不用于其他元素。

内容依据仅限论文标题与摘要，不使用全文。列表上方统一说明一次「AI 解读只根据标题和摘要生成」，单篇条目内不重复标注。

没有有效摘要时（有效性的判定由服务器端执行），summary、details、limitations 三个字段均为 null，条目只显示「暂无摘要，未生成 AI 解读」，且该论文不参与 Highlights 挑选（见 §2.2）。

有摘要但摘要未写明局限时，只显示 Summary，隐藏 Limits of the Evidence，不写「无局限」。Limits of the Evidence 只呈现可由摘要核实的内容，无法核实的内容不公开展示。

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

当前原型使用 `#brief-<slug>` 作为锚点（线上形式为 `https://hydroagentlab.com/paper-digest/#brief-<slug>`），正式数据以稳定 Paper ID 作为锚点标识：

- Share：复制当前语言页面中该论文的深链接。
- Paper ID 在论文首次收录时分配并保留，不随预印本合并或版本更新而改变；对已经发生变更的旧 ID，数据集提供 aliases 映射，打开链接时解析到当前记录，旧链接继续有效。
- 打开深链接：仅清除与目标论文冲突的筛选与搜索条件，加载目标论文所在周，滚动定位到对应条目，自动展开 AI Summary & Evidence Limits，并短暂高亮目标条目。
- 目标论文已不在公开列表时：在页面顶部提示该论文已不在公开列表中；用户开始新的搜索或修改筛选时，提示自动清除。
- 无需登录即可打开；中英文页面使用同一 Paper ID。
- 已知限制：链接分享到微信等平台时，预览卡片显示的是 Paper Digest 页面标题，不是该论文的标题，第一版接受。

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

1. **Highlights 的文案与筛选机制——已确认。** 筛选机制与透明度文案已确认（见 §2.2）；栏目级披露统一为 `AI-selected`，删除 `AI-surfaced · AI-generated · Not human-reviewed` 及原说明句。当前原型仍显示旧披露文案，待原型同步时一并更新。
2. **Highlights 卡片内容——已确认。** 最终规范见 §2.2：卡片保留既有六项，并增加 Published / Preprint 类型标记、来源行第一作者与「查看 AI 解读」链接，不含 Paper Overview。当前原型尚未包含新增三项，待原型同步时一并更新。
3. **单篇条目的 AI 小标识——已确认移除。** AI 来源说明统一在列表上方说明一次（见 §2.4），单篇条目不再重复显示小标识；当前原型仍有该标识，待原型同步时移除。
4. **移动端两个筛选面板的交互——已统一。** 当前原型中 Time 面板与 Advanced Filters 在手机端均为 Bottom Sheet，共用遮罩与关闭逻辑。
5. **Saved Papers 空状态——已解决。** 当前原型在收藏数量为零时隐藏 Export backup、保留 Import，并将说明改为短句 + “How saving works” 折叠展开。
6. **订阅表单不是生产实现。** 当前 HTML 提交后只显示 `Prototype only: nothing was submitted.`，生产环境必须保留现有 Brevo 订阅流程。
7. **原型数据是静态样本。** 当前 HTML 内嵌 8 条论文记录，并显示 `sample of 217`；论文数量、日期和部分统计为演示数据，不能作为生产数据源。仓库内的本地开发样本为 23 条；原型中出现的任何总数（包括与真实值接近的数字）均为占位，生产环境必须全部由真实数据动态生成。
8. **当前 HTML 主要是英文原型。** 生产网站已有 en / zh 双语结构，需要补充中文文案、标签翻译、字体与窄屏排版检查。
9. **原型的分类仍是旧方案。** 当前原型保留 Application 筛选维度与旧标签色板，样本论文的标签也尚未按 §2.3 的固定值标注；待原型同步时删除 Application 维度、统一为中性灰徽章，并按固定英文 ID 重新标注样本数据。
10. **字号尚未与官网层级对齐。** 区块标题由 34px / 600 调整为最大约 30px / 500；底部订阅区标题由 40px 调整为最大约 26px；收藏页标题由 42px 调整为 40px；眉标由 12px 品牌蓝调整为 13.5px `--accent-hover`；首屏说明由 18px 调整为 15px `--text-muted`。待原型同步时一并调整。
11. **版式与组件细节尚未对齐。** 去掉三处左侧色条（AI 解读卡、证据局限、Why It Matters），改以卡片边框与小标题区分；按钮与输入框描边统一为 `--border-strong`；原型 CSS 变量名与网站 tokens 对齐（`--tx2` → `--text-secondary`、`--mu` → `--text-muted`、`--ln` → `--border`）；移动端英雄区按钮整行堆叠；正文行长控制在约 75 字符内；去掉收藏成功的 toast 提示，以书签变色与收藏计数增加作为反馈。待原型同步时一并处理。
12. **深色模式的按钮对比度待修。** 深色模式先保留，是否全站统一另行决定；深色模式下主按钮当前为白字浅蓝底（对比度约 2.5:1），需改为深色文字。


## 5. 建议由团队共同确认的产品问题

以下问题影响产品口径、数据结构或最终交互，建议在开始生产开发前集中确认。

### 5.1 Highlights 的筛选机制与透明度文案

已确认：Highlights 由 AI 按明确规则主动挑选，并为每篇入选论文撰写 Why It Matters；栏目级披露统一为 `AI-selected`，不再使用多重标签或解释句。筛选规则、轮次与执行机制、期刊白名单见 §2.2。

### 5.2 Highlights 卡片最终内容

已确认：卡片保留 Highlight、Domain、标题、Why It Matters、来源行与 Bookmark / Share，并增加 Published / Preprint 类型标记（预印本虚线描边）、来源行第一作者与「查看 AI 解读」链接；卡片不含 Paper Overview。最终规范见 §2.2。

### 5.3 Taxonomy 分类体系

已确认：分类只设 Domain（6 个值）与 Method（7 个值，平级）两个维度，不设 Application；每篇论文每个维度最多 2 个标签，数据只存英文 ID。原讨论中的颜色映射（Domain 蓝、Methods 青绿、Application 淡紫、Highlight 暖金）不再使用，标签统一为中性灰徽章。完整规范见 §2.3。

### 5.4 Paper Type 的正式分类

已确认：Paper Type 第一版只设 Published / Preprint 两类，不设 Journal / Conference / Review。规则与理由见 §2.3。

### 5.5 AI Summary 与证据边界

已确认：AI 解读只依据标题与摘要，来源说明在列表上方统一出现一次；Summary 与 Limits of the Evidence 两个部分保持不变，均使用连续段落；无有效摘要时三个内容字段均为 null 并显示固定提示；Limits 只呈现可由摘要核实的内容。完整规范见 §2.4。

### 5.6 Bookmark 的存储边界

当前设计为浏览器 localStorage，无需登录，也不跨设备同步，并提供 JSON 备份。

需要确认团队是否接受：

- 清除网站浏览器数据可能丢失收藏。
- 更换设备或浏览器不会自动同步。
- 用户需要自行导出 / 导入备份。

**建议：** 对第一版而言，这是成本较低且边界清楚的实现；暂不增加账号和云同步。

### 5.7 Share 深链接规则

已确认：Share 使用以稳定 Paper ID 为锚点的站内深链接；ID 首次分配并保留，已变更的旧 ID 经 aliases 映射解析；打开链接时仅清除冲突的筛选与搜索条件，定位并展开目标条目。规范见 §2.6。短暂高亮尚未在线上实现，列为后续补齐项。

### 5.8 订阅与数据源

已确认：订阅继续使用现有 Brevo 订阅组件，生产环境不使用原型中的 mock 提交。页面上的全部数量均由真实数据动态生成——已收录总数、数据更新时间、每周篇数与期次日期都来自 papers.json，不写死任何数字。Highlights、Why It Matters 与分类字段不是现有数据字段，由服务器端数据流水线新增（见 §2.2、§2.3），网站在字段就绪后读取展示；数据更新后的构建与部署沿用现有流水线。「数据更新于」不得直接使用 papers.json 的 generated_at——那是文件导出时间，每次导出都会变化；内容更新时间以单篇论文的 updated_at 为准。

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

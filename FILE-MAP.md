# File Map

## `styles/` — 样式层

| 文件 | 用途 | 状态 |
|------|------|------|
| `tokens.css` | 色卡本 — 所有颜色、字体、圆角、间距变量。改一个变量全站跟着变。light/dark 主题开关 | ✅ |
| `base.css` | 毛坯房刷白 — 清除浏览器默认样式，body 背景、默认字体、链接颜色 | ✅ |
| `typography.css` | 字体规范手册 — 标题/副标题/正文/小标签的统一字号与行高 | ✅ |
| `layout.css` | 房间布局图 — 手机/平板/桌面的响应式断点与通用栅格 | ⬜ 计划中 |
| `nav.css` | 导航栏装修 — pill 导航条、dropdown 下拉、hamburger 汉堡菜单、drawer 抽屉动画 | ✅ |
| `hero.css` | 门面招牌 — 首页顶部视频区：视频铺满、文字定位、按钮样式 | ✅ |
| `sections.css` | 通用房间模板 — CTA 横幅、区块标题、页面导语、卡片网格等共用区块 | ✅ |
| `footer.css` | 底部门脸 — 页脚 logo、链接列表、版权信息 | ✅ |
| `pages/*.css` | 每间房的个性装饰 — 某一页独有的样式（如 Platform 架构图、Team 成员卡片） | ✅ 12 个 |

## `components/` — 组件层

| 文件 | 用途 | 状态 |
|------|------|------|
| `shell.js` | 房子外壳 — 每页公共框架：顶部导航（dropdown + hamburger）+ 底部页脚 + 回到顶部按钮 | ✅ |
| `hero.js` | 大屏视频区 — 首页顶部视频背景 + 标题 + 按钮 | ✅ |
| `breadcrumb.js` | 路径导航条 — 显示「首页 > Product > Capabilities」的层级路径 | ⬜ 计划中 |
| `cta-band.js` | CTA 行动召唤横幅 — 页底 "联系团队" 等引导区块 | ✅ |
| `page-lead.js` | 页面导语 — 页面顶部的 eyebrow + 标题 + 描述 + 事实条 | ✅ |
| `section-header.js` | 区块标题 — 各 section 的 eyebrow + title + summary | ✅ |
| `subscribe-form.js` | 邮箱订阅表单 — Paper Digest 页的 client 组件；后端接口存根 `sendSubscription` | ✅ 待接后端 |
| `pages/home.js` | 首页内容组装 — Hero + 各 section + CTA 拼成完整首页 | ✅ |
| `pages/platform.js` | Product-FF 页组装 — PageLead + 架构图 + 功能列表 | ✅ |
| `pages/capabilities.js` | Capabilities 页组装 | ✅ |
| `pages/research.js` | Research Papers 页组装 | ✅ |
| `pages/team.js` | About Us 页组装 | ✅ |
| `pages/careers.js` | Join Us 页组装 | ✅ |
| `pages/contact.js` | Contact 页组装 | ✅ |
| `pages/white-papers.js` | 白皮书页组装 | ✅ 占位 |
| `pages/events.js` | 活动与社区页组装 | ✅ 占位 |
| `pages/members.js` | 实验室成员页组装 | ✅ 占位 |
| `pages/paper-digest.js` | Paper Digest 页组装 — PageLead + 订阅表单 | ✅ |

## `content/` — 内容层

| 文件 | 用途 | 状态 |
|------|------|------|
| `nav.js` | 导航目录 — 嵌套 2 级导航结构 + footerGroups + CTA + 语言切换标签（en/zh） | ✅ |
| `site.js` | 公共文案汇总 — 从子模块 re-export，对外统一入口 `getSiteContent(lang)` | ✅ |
| `helpers.js` | 工具函数 — normalizePath、localizeHref、stripLangPrefix、getLanguageSwitchHref | ✅ |
| `team-members.js` | 团队成员数据 — 15 人的 name/initials/affiliation/email/focus | ✅ |
| `pages/home.js` | 首页文案（en/zh）— hero、productPreview、highlights 等 | ✅ |
| `pages/platform.js` | Product-FF 文案（en/zh） | ✅ |
| `pages/capabilities.js` | Capabilities 文案（en/zh） | ✅ |
| `pages/research.js` | Research Papers 文案（en/zh） | ✅ |
| `pages/team.js` | About Us 文案（en/zh） | ✅ |
| `pages/careers.js` | Join Us 文案（en/zh） | ✅ |
| `pages/contact.js` | Contact 文案（en/zh） | ✅ |
| `pages/white-papers.js` | 白皮书文案 | ✅ 占位 |
| `pages/events.js` | 活动与社区文案 | ✅ 占位 |
| `pages/members.js` | 实验室成员文案 | ✅ 占位 |
| `pages/paper-digest.js` | Paper Digest 文案（en/zh）— 导语、事实条、表单提示语 | ✅ |

## `app/` — 路由层

| 路由 | 对应导航 | 语言 |
|------|----------|------|
| `/` | A — Home 首页 | en + zh |
| `/platform` | B1 — HydroAgent-FF 洪水预报智能体 | en + zh |
| `/capabilities` | B2 — Capabilities 能力 | en + zh |
| `/paper-digest` | B4 — Paper Digest 论文订阅 | en + zh |
| `/research` | C1 — Research Papers 研究论文 | en + zh |
| `/white-papers` | C2 — White Papers 白皮书 | en + zh |
| `/events` | C3 — Events / Community 活动与社区 | en + zh |
| `/team` | D1 — About Us 关于我们 | en + zh |
| `/members` | D2 — Lab Members 实验室成员 | en + zh |
| `/contact` | E1 — Contact 联系 | en + zh |
| `/careers` | E2 — Join Us 加入我们 | en + zh |

## 图例

| 标记 | 含义 |
|------|------|
| ✅ | 已完成 |
| ✅ 占位 | 文件已建，内容待填充 |
| ⬜ 计划中 | 尚未创建 |

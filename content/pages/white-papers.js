// Citation data (title, citation string, DOI) is quoted from the Zenodo record
// and never translated — translating a title breaks the citation (same rule as
// research.js).
const zenodoDoi = "10.5281/zenodo.23230110";

const whitePaperV1 = {
  featured: true,
  version: "v1.0.0",
  doi: zenodoDoi,
  // The h1, split where a line may break: on a narrow screen the title wraps as
  // 水利行业智能体 / 白皮书 instead of stranding 书 on a line of its own.
  titleLines: ["水利行业智能体", "白皮书"],
  subtitle: "现状、洞察与未来方向",
  // Verbatim from the Zenodo record (its title uses a half-width colon).
  citation:
    "HydroAgent-Lab, Zhou, S., & Lei, N. (2026). 水利行业智能体白皮书:现状、洞察与未来方向 (Version v1.0.0). Zenodo.",
  links: [
    // The DOI, not a direct file URL: the Zenodo file was renamed two days
    // after release, which silently broke the old file link. A DOI never moves.
    { id: "full", href: `https://doi.org/${zenodoDoi}` },
    // The brief is not on Zenodo — served from our own /public.
    { id: "brief", href: "/assets/white-papers/hydroagent-wp-v1.0.0-brief-zh.pdf" },
    // Placeholder until the English edition exists; swap for an href then.
    { id: "en", comingSoon: true }
  ],
  coverSrc: "/assets/white-papers/hydroagent-wp-v1.0.0-cover.webp",
  coverWidth: 480,
  coverHeight: 678
};

// Two layouts share this page. A language with a featured release (zh today)
// renders the publication layout from that entry's fields; a language without
// one (en today) renders lead → status → cadenceSection. `lead`, `status` and
// `releasesSection` are therefore fallback copy on zh — keep them true without
// a release (no version numbers or dates in them).
export const whitePapersContent = {
  // No English edition exists yet, and an unofficial English rendering of the
  // report's title or findings is not to be published — so the en page shows
  // only a coming-soon state. Hero text and cadence items are the page's
  // pre-existing copy. When the English edition is out, add its entry to
  // `papers` and it renders in the publication layout, as on the zh page.
  en: {
    lead: {
      eyebrow: "White Papers",
      title: "The English edition is coming soon.",
      text:
        "HydroAgent white papers are industry briefings on AI for hydrology and water operations: a curated digest of new academic papers, news, products, policies, and other developments worth following.",
      facts: [
        { label: "Scope", value: "AI for hydrology and water operations" },
        { label: "Format", value: "Quarterly white papers and an annual review" },
        { label: "Status", value: "English edition coming soon" }
      ]
    },
    releasesSection: {
      eyebrow: "",
      title: "White paper archive"
    },
    papers: [],
    cadenceSection: {
      eyebrow: "",
      title: "Planned publication cadence.",
      items: [
        { label: "Quarterly", text: "A white paper with a structured review of the field." },
        { label: "Annually", text: "A year-in-review of the field." }
      ]
    },
    status: {
      title: "The archive opens with the English release.",
      text: "Follow us and you will hear the moment it is out."
    }
  },
  zh: {
    lead: {
      eyebrow: "白皮书",
      title: "用公开证据看清水利智能体",
      text:
        "HydroAgent 白皮书系统整理水利行业中大语言模型与智能体的公开证据，涵盖学术研究、行业案例与政策资料，并评估这些证据能在多大程度上证明相关结果。",
      facts: [
        { label: "范围", value: "水文与水利领域的 AI 应用" },
        { label: "形式", value: "每季度白皮书与年度综述" }
      ]
    },
    releasesSection: {
      eyebrow: "",
      title: "白皮书归档"
    },
    papers: [
      {
        ...whitePaperV1,
        byline: "周顺安、雷诺 · HydroAgent-Lab",
        summary:
          "梳理各水利子领域中的 LLM 与智能体应用，按功能角色分析智能体在工作流中承担的职责，并结合证据强度与运行状态，评估其能力边界、应用条件，以及公开资料能在多大程度上证明相关结果。",
        released: "2026 年 10 月 7 日发布",
        evidenceTo: "证据截至 2026 年 7 月 22 日",
        linkLabels: {
          full: "阅读完整版",
          brief: "下载速读版 PDF",
          en: "英文版"
        },
        comingSoonLabel: "即将推出",
        findingsTitle: "三项核心结论",
        findingsNote: "摘自完整版执行摘要，有删节。",
        // 摘自完整版执行摘要，仅做删节，不增加原文没有的判断。
        sections: [
          {
            label: "当前水平",
            text:
              "较有公开证据支持的水利智能体应用，主要集中在水文数据处理、专业模型调用、工作流编排、结果校核和决策支持。现有公开资料能够说明部分任务层面的能力与成效，但尚不足以同时、持续地记录系统运行过程、人工干预及业务结果，对长期业务运行效果的验证仍然有限。"
          },
          {
            label: "发展规律",
            text:
              "较可靠的路线是由专业模型和确定性程序承担数值计算、物理约束和硬规则，由 Agent 处理任务理解、工具协同、路径选择和结果解释。功能角色越自主并不代表越成熟；源头数据或前置情境判断出现偏差且未被独立检查点拦截时，误差会继续传递到下游结果。"
          },
          {
            label: "行业行动",
            text:
              "水利机构应先建立人工流程、传统算法或确定性程序基线，再选择需要语义理解、动态选择或异常处置的 Agent 节点。优先建设稳定工具接口、专业 Skills、业务规则、物理校核、任务基准和权限约束；只有这些仍不能解决模型本身的领域理解问题时，再评估领域后训练或独立平台。"
          }
        ],
        colophonTitle: "关于这份白皮书",
        colophon: [
          { label: "读者", value: "负责科研组织、数字化建设和业务运行的水利行业技术决策者" },
          { label: "篇幅", value: "完整版 39 页 · 速读版 15 页" },
          { label: "许可", value: "CC BY 4.0" }
        ],
        // The plan row is built from `cadenceSection.items`, so the cadence is
        // stated in one place for both layouts.
        planLabel: "更新计划",
        citeLabel: "引用",
        coverAlt: "白皮书封面：HydroAgent 漩涡标识下方为中文标题与副标题，并列出证据更新日期、修订日期、DOI 与作者信息。"
      }
    ],
    cadenceSection: {
      eyebrow: "",
      title: "计划更新频率 ",
      items: [
        { label: "每季度", text: "一篇白皮书，系统梳理领域进展 " },
        { label: "每年", text: "一份年度综述 " }
      ]
    },
    status: {
      title: "归档页会随第一篇一起开放 ",
      text: "关注我们，首期发布时我们会第一时间通知你。"
    }
  }
};

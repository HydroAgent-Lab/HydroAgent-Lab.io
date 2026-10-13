// News cards, newest first. Each card restates a release that has its own page
// on this site and links there; the external links (arXiv, DOI) live on those
// pages. Titles are quoted, never translated: the preprint title stays in
// English on zh (citation rule, see research.js), and the white paper has no
// English edition yet, so the en card describes the release instead of
// rendering its title in English. Summaries are abridged from the detail pages'
// own text — no claim here that those pages do not make.
// Both thumbnails are 480 × 678: the white paper's cover, and page 1 of the
// preprint rendered from arXiv:2607.23983v1.
const newsThumbs = {
  whitePaper: { src: "/assets/white-papers/hydroagent-wp-v1.0.0-cover.webp", width: 480, height: 678 },
  preprint: { src: "/assets/papers/hydroagent-preprint-p1.webp", width: 480, height: 678 }
};

export const homeContent = {
  en: {
    hero: {
      eyebrow: "HydroAgent-Lab",
      title: "HydroAgent",
      subtitle: "An agentic platform for water operational workflows.",
      text:
        "Organize data, models, expert judgment, and release into one reviewable operational workflow.",
      primary: "Explore HydroAgent-FF",
      primaryPath: "/platform",
      secondary: "Try the demo",
      secondaryPath: "/demo",
      tertiary: "Discuss a pilot",
      tertiaryPath: "/contact",
      videoTag: "HydroAgent-FF workflow demo"
    },
    newsSection: {
      title: "News",
      readMore: "Read more",
      // Screen-reader wording for the carousel; components/news-carousel.js
      // fills in {n}, {total} and {kind}.
      a11y: {
        carousel: "carousel",
        slide: "slide",
        slideLabel: "{n} of {total}",
        dots: "Choose a news item",
        dot: "{n} of {total}, {kind}"
      },
      items: [
        {
          id: "white-paper-v1.0.0",
          kind: "White paper",
          date: "2026-10-07",
          dateLabel: "7 Oct 2026",
          title: "HydroAgent white paper v1.0.0 (Chinese edition)",
          text: "Our first white paper is now available in Chinese; the English edition is coming soon.",
          path: "/white-papers",
          thumb: newsThumbs.whitePaper
        },
        {
          id: "preprint-2607.23983",
          kind: "Preprint",
          date: "2026-07-27",
          dateLabel: "27 Jul 2026",
          title:
            "HydroAgent: Formalizing Forecaster Expertise into Skill-Orchestrated Flood Forecasting Workflows",
          text:
            "Encoding forecaster judgment as explicit, rule-bounded skills lifted KGE by 0.023–0.154 over a 0.890 scheme-library baseline — and all five tested LLMs completed the same workflow.",
          path: "/research",
          thumb: newsThumbs.preprint
        }
      ]
    },
    whatSection: {
      eyebrow: "",
      title: "Architecture"
    },
    flagshipSection: {
      eyebrow: "",
      title: "HydroAgent for Flood Forecasting",
      text:
        "HydroAgent-FF is HydroAgent's most concrete product line today, built for flood forecasting operations. It supports the flood forecasting process from end to end, while keeping forecasters in control of the key decisions.",
      cta: "Explore HydroAgent-FF",
      ctaPath: "/platform"
    },
    trustSection: {
      eyebrow: "",
      title: "Specific signals, not slogans.",
      items: [
        "Demonstrated end to end on a real river basin (South Yamhill River, Oregon, USA) using historical flood events.",
        "Reproduces observed flood peaks and volumes well on independent validation events.",
        "Works consistently across several leading large language models.",
        "Methods paper under submission; presented as an oral talk at EGU 2026.",
        "Models provide the evidence, and people keep review and release authority."
      ]
    },
    whoSection: {
      eyebrow: "",
      title: "Built for teams responsible for real forecasts.",
      items: [
        {
          title: "Forecasting agencies",
          text: "Hydrological forecasting agencies and operational teams."
        },
        {
          title: "Water authorities",
          text: "Water authorities evaluating a pilot."
        },
        {
          title: "Research & partners",
          text: "Research groups, technical partners, and basin application teams."
        }
      ]
    }
  },
  zh: {
    hero: {
      eyebrow: "HydroAgent-Lab",
      title: "HydroAgent",
      subtitle: "面向水文水利业务工作流的智能体平台 ",
      text: "把数据、模型、专家判断和发布流程组织成一条可复核的业务工作流 ",
      primary: "了解 HydroAgent-FF",
      primaryPath: "/platform",
      secondary: "体验产品",
      secondaryPath: "/demo",
      tertiary: "讨论试点合作",
      tertiaryPath: "/contact",
      videoTag: "洪水预报工作流演示"
    },
    newsSection: {
      title: "最新动态",
      readMore: "阅读详情",
      a11y: {
        carousel: "轮播",
        slide: "幻灯片",
        slideLabel: "第 {n} 条，共 {total} 条",
        dots: "选择要查看的动态",
        dot: "第 {n} 条，共 {total} 条：{kind}"
      },
      items: [
        {
          id: "white-paper-v1.0.0",
          kind: "白皮书",
          date: "2026-10-07",
          dateLabel: "2026 年 10 月 7 日",
          title: "水利行业智能体白皮书：现状、洞察与未来方向",
          // 删节自白皮书页的简介，不增加原文没有的判断。
          text: "梳理各水利子领域中的 LLM 与智能体应用，评估其能力边界、应用条件，以及公开资料能在多大程度上证明相关结果。",
          path: "/white-papers",
          thumb: newsThumbs.whitePaper
        },
        {
          id: "preprint-2607.23983",
          kind: "预印本",
          date: "2026-07-27",
          dateLabel: "2026 年 7 月 27 日",
          title:
            "HydroAgent: Formalizing Forecaster Expertise into Skill-Orchestrated Flood Forecasting Workflows",
          titleLang: "en",
          // 与 Research 页 zh 的核心发现同文。
          text: "把预报员研判经验编码成有明确规则边界的 skill，使 KGE 在 0.890 的方案库基线上再提升 0.023–0.154；五个被测大模型都能跑通同一套工作流。",
          path: "/research",
          thumb: newsThumbs.preprint
        }
      ]
    },
    whatSection: {
      eyebrow: "",
      title: "架构"
    },
    flagshipSection: {
      eyebrow: "",
      title: "洪水预报智能体",
      text:
        "HydroAgent-FF 是 HydroAgent 当前最具体的产品线，面向洪水预报业务。它端到端支撑洪水预报过程，并让预报员始终掌握关键决策。 ",
      cta: "了解 HydroAgent-FF",
      ctaPath: "/platform"
    },
    trustSection: {
      eyebrow: "",
      title: "用具体信号，而不是口号 ",
      items: [
        "在真实流域（美国俄勒冈 South Yamhill River）基于历史洪水事件完成端到端演示 ",
        "在独立验证事件上，对实测洪峰和洪量的还原效果良好 ",
        "在多个主流大语言模型上表现稳定一致 ",
        "方法论文在投，EGU 2026 已作口头报告 ",
        "模型提供证据，人保留审核与发布责任 "
      ]
    },
    whoSection: {
      eyebrow: "",
      title: "为真正负责预报的团队而建 ",
      items: [
        {
          title: "预报机构",
          text: "水文预报机构和业务团队 "
        },
        {
          title: "水务单位",
          text: "需要试点评估的水务和水利单位 "
        },
        {
          title: "研究与合作方",
          text: "研究团队、技术合作伙伴和流域应用团队 "
        }
      ]
    }
  }
};

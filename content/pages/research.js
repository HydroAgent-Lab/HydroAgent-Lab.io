export const researchContent = {
  en: {
    lead: {
      eyebrow: "Research",
      title: "From research to operational forecasting practice.",
      text:
        "We study whether large language model agents can support frontline flood forecasting without weakening scientific accountability.",
      facts: [
        { label: "Focus", value: "Workflow intelligence for flood forecasting" },
        { label: "Status", value: "Preprints coming soon" },
        { label: "Evidence", value: "EGU 2026 talk; paper under submission" }
      ]
    },
    motivationSection: {
      eyebrow: "",
      title: "Why an agent for flood forecasting?",
      paragraphs: [
        "Climate change is driving more extreme floods, and forecasting is one of the first defenses. Operational forecasting starts with a hydrological model, but the final bulletin rarely comes straight from the model. Experienced forecasters stay in the loop, combining rainfall and water-regime information with local experience to revise the output. That judgment is often a major part of forecast quality.",
        "This layer is tacit: hard to express, hard to audit, and slow to train. Machine learning scales, but often stays difficult to inspect. LLMs bring language, planning, and tool use, but most current uses stop at chat interfaces and miss the full operational process that real forecasting requires.",
        "HydroAgent is built around that gap: the forecaster's work needs to be captured, reviewed, and run in the tools people actually use."
      ]
    },
    themes: [
      { label: "LLM Agent × Hydrology", text: "Exploring how large language model agents can interface with hydrological models and operational data." },
      { label: "Forecaster-in-the-loop", text: "Keeping human expertise central while automating routine steps in the forecast workflow." },
      { label: "Workflow automation", text: "End-to-end orchestration from data ingestion to bulletin generation and review." }
    ],
    papers: [],
    status: {
      title: "Our first papers will be listed here soon.",
      text:
        "This page will list each paper with its core question, method, key figures, and a preprint link. Follow us and we'll let you know the moment the first one is out."
    }
  },
  zh: {
    lead: {
      eyebrow: "研究",
      title: "从研究走向实际预报业务",
      text:
        "我们研究大语言模型智能体能否进入一线洪水预报，同时不削弱科学责任。",
      facts: [
        { label: "方向", value: "面向洪水预报的工作流智能" },
        { label: "状态", value: "首批预印本将于近期发布" },
        { label: "证据", value: "EGU 2026 报告；论文在投" }
      ]
    },
    motivationSection: {
      eyebrow: "",
      title: "为什么要做面向洪水预报的智能体工作流？",
      paragraphs: [
        "气候变化带来越来越极端的洪水，而预报是我们抵御洪水的第一道防线。今天的业务化预报从水文模型起步，但最终的预报单从来不是模型直接输出来的。有经验的预报员始终在环路里，把雨水情信息和本地经验结合起来，对模型结果做修正。这份专家判断，往往是预报质量中很关键的一层。",
        "可是这一层是隐性的：难以表达、难以复盘，而且要花数年才能培养出来。机器学习能规模化，但过程往往难以检查；大语言模型带来了语言、规划和工具调用能力，但很多应用仍停在聊天界面，缺少真实预报所需要的完整业务流程。",
        "HydroAgent 要补上的正是这道缺口：把预报员的工作记录下来，让它可以被复核，并进入真实工具环境。"
      ]
    },
    themes: [
      { label: "大语言模型智能体 × 水文", text: "探索大语言模型智能体如何与水文模型和业务数据对接。" },
      { label: "预报员在环", text: "在自动化常规流程的同时，让人类专业判断始终处于核心位置。" },
      { label: "工作流自动化", text: "从数据接入到简报生成与审核的端到端编排。" }
    ],
    papers: [],
    status: {
      title: "首批预印本即将发布",
      text:
        "这里之后会列出每篇论文的核心问题、方法、关键图示和预印本链接。关注我们，第一篇上线时第一时间告诉你。"
    }
  }
};

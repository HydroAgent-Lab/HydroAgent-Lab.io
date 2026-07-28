// Citation data (title, authors, venue, links) stays in English on the zh page
// too — translating a paper title breaks the citation.
const hydroAgentPaper = {
  featured: true,
  status: "preprint",
  title:
    "HydroAgent: Formalizing Forecaster Expertise into Skill-Orchestrated Flood Forecasting Workflows",
  authors:
    "Qingyi Yang, Siqian Qiu, Bing Li, Xu Shan, Jia Feng, Shunan Zhou, Xudong Zhou, Tiantian Xing, Jiale Guo, Xiaoyi Dong, Gaoyu Liu, Xiaohuan Liu, Haiqing Pu, Qingwen Deng, Xun Zhang, Zhongrun Xiang, Haiyang Qian, Ying Yan, Yongkang Xu, Nuo Lei, Tianlong Jia, Baoying Shan†, Carlo De Michele",
  venue: "arXiv",
  identifier: "arXiv:2607.23983v1",
  date: "27 Jul 2026",
  links: [
    { id: "abs", href: "https://arxiv.org/abs/2607.23983" },
    { id: "pdf", href: "https://arxiv.org/pdf/2607.23983v1" }
  ],
  figureSrc: "/assets/papers/hydroagent-fig1.svg",
  figureWidth: 1280,
  figureHeight: 720
};

export const researchContent = {
  en: {
    lead: {
      eyebrow: "Research",
      title: "From research to operational forecasting practice.",
      text:
        "We study whether large language model agents can support frontline flood forecasting without weakening scientific accountability.",
      facts: [
        { label: "Focus", value: "Workflow intelligence for flood forecasting" },
        { label: "Status", value: "First preprint out — arXiv, July 2026" },
        { label: "Evidence", value: "EGU 2026 talk; manuscript under review" }
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
    papers: [
      {
        ...hydroAgentPaper,
        statusLabel: "Preprint",
        reviewNote: "Not peer reviewed",
        correspondingNote: "† Corresponding author",
        finding:
          "Encoding forecaster judgment as explicit, rule-bounded skills lifted KGE by 0.023–0.154 over a 0.890 scheme-library baseline — and all five tested LLMs completed the same workflow.",
        sections: [
          {
            label: "Question",
            text:
              "Can tacit forecaster expertise be formalized so that it is auditable and transferable, without letting a language model improvise the hydrology?"
          },
          {
            label: "Approach",
            text:
              "A skill-orchestrated agent framework in which each skill encodes explicit rules that bound LLM reasoning inside a model-driven forecasting workflow, with three forecaster-in-the-loop review checkpoints."
          },
          {
            label: "Result",
            text:
              "Prior judgment captured observed peak flow and flood volume within a 5% tolerance in 10 and 11 of 14 events (5-fold cross-validation over 129 events: Pearson r = 0.62 and 0.84). Building on a scheme library already at mean KGE 0.890, guided scheme selection improved KGE by a further 0.023–0.154, placing simulated peak flow and volume inside the prior judgment ranges for all 14 and for 13 of 14 events. Judgment accuracy across the five LLMs ranged from 40% to 80%."
          }
        ],
        facts: [
          { label: "Basin", value: "South Yamhill River basin" },
          { label: "Period", value: "1995–2024 (validation 2020–2024)" },
          { label: "Events", value: "14 validation events · 129 in 5-fold cross-validation" },
          { label: "LLMs tested", value: "DeepSeek-v3.2 · Qwen-3.6-plus · GPT-5.4 · Gemini-3.1-pro-preview · Claude-opus-4.6" },
          { label: "Baseline", value: "Scheme library, mean KGE 0.890" }
        ],
        figureCaption: "Figure 1 — Schematic overview of the HydroAgent framework.",
        figureLinkLabel: "Open full size ↗",
        // alt describes what the figure *shows*; figureCaption carries the paper's
        // own label. Repeating the caption here would make a screen reader read the
        // same sentence twice and convey nothing about the figure's content.
        figureAlt:
          "Schematic of the HydroAgent framework in two parts: above, a layered stack of LLM reasoning core, five-skill registry and tool executor; below, the five-step flood forecasting workflow from scheme preparation to warning bulletin, with the skill invoked at each step.",
        linkLabels: { abs: "arXiv abstract", pdf: "PDF" }
      }
    ],
    moreNote: "More papers will be listed here as they appear.",
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
        { label: "状态", value: "首篇预印本已发布 —— arXiv，2026 年 7 月" },
        { label: "证据", value: "EGU 2026 报告；论文在审" }
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
    papers: [
      {
        ...hydroAgentPaper,
        statusLabel: "预印本",
        reviewNote: "未经同行评审",
        correspondingNote: "† 通讯作者",
        // 术语：paper 的 "prior judgment" 统一译作「预报员研判」（团队用语），
        // 不用「先验判断」—— 后者在中文里会被读成贝叶斯先验。
        finding:
          "把预报员研判经验编码成有明确规则边界的 skill，使 KGE 在 0.890 的方案库基线上再提升 0.023–0.154；五个被测大模型都能跑通同一套工作流。",
        sections: [
          {
            label: "问题",
            text:
              "能否把预报员的隐性经验形式化，使其可复核、可传递，同时不让大语言模型自行发挥水文计算？"
          },
          {
            label: "方法",
            text:
              "一套 skill 编排的智能体框架：每个 skill 用显式规则约束大模型推理，嵌入模型驱动的预报工作流，并保留三个预报员在环的复核节点。"
          },
          {
            label: "结果",
            text:
              "先验研判以 5% 容差命中实测洪峰流量与洪量，在 14 场洪水中分别命中 10 场与 11 场；129 场事件的五折交叉验证中，Pearson 相关系数分别为 0.62 与 0.84。在平均 KGE 0.890 的高基线方案库之上，引导式方案选择进一步将 KGE 提升 0.023–0.154，模拟洪峰与洪量分别在全部 14 场和其中 13 场事件中落入研判区间。五个大模型的研判准确率在 40%–80% 之间。"
          }
        ],
        facts: [
          { label: "流域", value: "South Yamhill River basin" },
          { label: "时段", value: "1995–2024（验证期 2020–2024）" },
          { label: "事件", value: "14 场验证洪水 · 129 场用于五折交叉验证" },
          { label: "被测大模型", value: "DeepSeek-v3.2 · Qwen-3.6-plus · GPT-5.4 · Gemini-3.1-pro-preview · Claude-opus-4.6" },
          { label: "对照基线", value: "方案库，平均 KGE 0.890" }
        ],
        figureCaption: "图 1 —— HydroAgent 框架总览示意。",
        figureLinkLabel: "查看大图 ↗",
        figureAlt:
          "HydroAgent 框架示意图，分两部分：上半为分层结构，包含大模型推理核心、五个 skill 的注册表与工具执行器；下半为五步洪水预报工作流，从方案准备到预警简报，每步标注所调用的 skill。",
        linkLabels: { abs: "arXiv 摘要页", pdf: "PDF 全文" }
      }
    ],
    moreNote: "更多论文将在此陆续列出。",
    status: {
      title: "首批预印本即将发布",
      text:
        "这里之后会列出每篇论文的核心问题、方法、关键图示和预印本链接。关注我们，第一篇上线时第一时间告诉你。"
    }
  }
};

export const platformContent = {
  en: {
    lead: {
      eyebrow: "Product",
      title: "HydroAgent-FF",
      text:
        "An agentic workflow product for flood forecasting operations. Climate change is driving more extreme floods, and forecasting is the first line of defense. Operational forecasting today starts from a hydrological model, but the final bulletin is never the model's raw output. Experienced forecasters stay in the loop, combining rainfall and water-regime information with local experience before deciding how to revise and release.",
      facts: [
        { label: "Built for", value: "Flood forecasting operations" },
        { label: "Approach", value: "Works with your existing hydrological model" },
        { label: "Control", value: "Forecasters keep review and release authority" }
      ]
    },
    valueSection: {
      eyebrow: "What It Gives You",
      title: "Organized, reviewable, reproducible — with experts in control.",
      paragraphs: [
        "HydroAgent-FF is not about letting an LLM replace the hydrological model, nor about automating the forecaster away. It organizes real flood forecasting work into a structured, reviewable, and reproducible process, while keeping forecasters in control.",
        "It works alongside your existing hydrological models and forecasters to make the whole forecasting effort more organized, easier to review, and easier to reproduce. Expert review stays built in, so the people responsible confirm the key results and keep full control of what gets released."
      ]
    },
    workflowSection: {
      eyebrow: "What HydroAgent Does",
      title: "A workflow layer that keeps people in charge.",
      items: [
        "Brings scattered forecasting information into one organized, reviewable view.",
        "Keeps expert judgment visible and reusable, instead of locked in individual experience.",
        "Helps teams revise, compare, and explain forecasts as conditions change.",
        "Prepares clear, review-ready materials for the final decision and release.",
        "Preserves a traceable record for review, training, and institutional learning."
      ]
    },
    signalsSection: {
      eyebrow: "Current Validation Signals",
      title: "Specific enough to discuss, early enough to test with partners.",
      items: [
        "Demonstrated end to end on a real river basin (South Yamhill River, Oregon, USA) using historical flood events, including a March 2022 event.",
        "On independent validation events, the system reproduces observed flood peaks and volumes well.",
        "It performs consistently across several leading large language models.",
        "Methods paper under submission; presented as an oral talk at EGU 2026.",
        "Evaluation looks beyond accuracy: whether the process is clearer, the judgment is reviewable, and the result is reproducible."
      ]
    },
    pilotSection: {
      eyebrow: "Pilot Scenarios",
      title: "Worth discussing if any of these sound familiar.",
      items: [
        {
          title: "Experience that is hard to record",
          text: "You already run a hydrological model, but the forecast-revision process relies on experience and is hard to record."
        },
        {
          title: "Updates that are hard to track",
          text: "Across repeated forecast updates, version changes and the reasons behind them are hard to track."
        },
        {
          title: "Release needs clearer handoff",
          text: "You need clearer review materials and handoff notes before a bulletin is released."
        },
        {
          title: "Turning history into learning",
          text: "You want to turn historical forecasting into training and review material."
        }
      ]
    },
    positioning: {
      title:
        "HydroAgent-FF turns flood forecasting from “model output + verbal experience + manual release” into one organized, reviewable, and reproducible process.",
      text: "Experts stay in control throughout."
    }
  },
  zh: {
    lead: {
      eyebrow: "产品",
      title: "HydroAgent-FF",
      text:
        "面向洪水预报业务的智能体工作流产品。气候变化带来越来越极端的洪水，而预报是防御洪水的第一道防线。今天的业务化预报从水文模型起步，但最终预报单从来不是模型直接输出的结果。有经验的预报员始终在环路里，把雨水情信息和本地经验结合起来，再决定如何修正和发布。",
      facts: [
        { label: "面向", value: "洪水预报业务" },
        { label: "方式", value: "与你现有的水文模型协同" },
        { label: "掌控", value: "预报员保留复核与发布权" }
      ]
    },
    valueSection: {
      eyebrow: "它带来什么",
      title: "智能且可信的洪水预报，全程由专家掌控 ",
      paragraphs: [
        "HydroAgent-FF 要解决的不是“让 LLM 替代水文模型”，也不是“自动替代预报员”。它把真实洪水预报工作组织成一个结构化、可复核、可复现的过程，并让预报员始终掌握关键决策。",
        "它与你现有的水文模型和预报员协同，让整个预报工作更有条理、更易复核、更易复现。人工复核始终内置其中，关键结果由负责人确认，发布什么始终由人掌控。"
      ]
    },
    workflowSection: {
      eyebrow: "HydroAgent 做什么",
      title: "一层让人始终掌控的工作流 ",
      items: [
        "把分散的预报信息组织成一个有条理、可复核的整体视图 ",
        "让专家判断可见、可复用，而不是锁在个人经验里 ",
        "随着情况变化，帮助团队修正、对比并解释预报 ",
        "为最终决策和发布准备清晰、可复核的材料 ",
        "保留可追溯的记录，用于复核、培训和机构沉淀 "
      ]
    },
    signalsSection: {
      eyebrow: "可以信任的",
      title: "已在典型流域完成验证 ",
      items: [
        "已在真实流域（美国俄勒冈 South Yamhill River）基于历史洪水事件完成端到端演示，包括一次 2022 年 3 月的洪水事件 ",
        "在独立验证事件上，对实测洪峰和洪量的还原效果良好 ",
        "在多个主流大语言模型上表现稳定一致 ",
        "研究方法论文在投，EGU 2026 已作口头报告 ",
        "评估不只看精度，也看流程是否更清晰、判断是否可复核、结果是否可复现 "
      ]
    },
    pilotSection: {
      eyebrow: "试点场景",
      title: "如果你遇到以下情况，欢迎一起讨论 ",
      items: [
        {
          title: "经验难以记录",
          text: "已有水文模型，但预报修正过程依赖经验、难以记录。"
        },
        {
          title: "更新难以追踪",
          text: "多轮预报更新中，版本变化和修改原因难以追踪。"
        },
        {
          title: "发布需要更清晰的交接",
          text: "预报单发布前需要更清楚的审核材料和交接说明。"
        },
        {
          title: "把历史沉淀为学习材料",
          text: "希望把历史预报过程沉淀为培训和复盘材料。"
        }
      ]
    },
    positioning: {
      title:
        "HydroAgent-FF 把洪水预报从“模型结果 + 口头经验 + 手工发布”，整理为一个有条理、可复核、可复现的过程 ",
      text: "全程由专家掌控 "
    }
  }
};

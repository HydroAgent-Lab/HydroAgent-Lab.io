export const capabilitiesContent = {
  en: {
    lead: {
      eyebrow: "Capabilities",
      title: "Capabilities & collaboration.",
      text:
        "HydroAgent is more than a flood forecasting product (that is HydroAgent-FF). This page tells you what you can get from us along two dimensions: how we work with you, and what HydroAgent can do by task.",
      facts: [
        { label: "Two views", value: "Ways to work together · What HydroAgent does" },
        { label: "Flagship", value: "HydroAgent-FF for flood forecasting" },
        { label: "Engagement", value: "Localization, integration, pilots, research" }
      ]
    },
    collaborationSection: {
      eyebrow: "Ways to Work Together",
      title: "Ways to get started.",
      items: [
        {
          title: "A localized HydroAgent",
          text: "Adapt HydroAgent to your basin and institution — working with your local data, the hydrological model you already use, and your local operational practice, rather than a generic demo."
        },
        {
          title: "Coupling with your existing digital twin / system",
          text: "Run HydroAgent as an AI workflow and review layer on top of your existing digital twin or operational forecasting system. Your system keeps the data foundation and model computation; HydroAgent adds organized reasoning, visible expert judgment, and human-in-the-loop review — augmenting, not replacing."
        },
        {
          title: "Pilots, research & briefings",
          text: "Start from a focused pilot or briefing and grow into deeper collaboration.",
          cta: { label: "See Contact", path: "/contact" }
        }
      ]
    },
    tasksSection: {
      eyebrow: "What HydroAgent Does",
      title: "What HydroAgent-Lab can do for you.",
      text: { before: "For the flagship flood product, see ", link: "HydroAgent-FF", path: "/platform", after: "." },
      items: [
        {
          title: "Real-time flood forecast judgment",
          text: "Combine historical floods, live rain and water conditions, and forecast rainfall to assess the coming flood and auto-match better parameter sets — every step pauses for human review and confirmation, and stays traceable and auditable."
        },
        {
          title: "Rapid scenario simulation",
          text: "Answer ad-hoc \"what if rainfall increases another 20 mm?\" questions in natural language, automatically producing the resulting flow process and assessment."
        },
        {
          title: "Pre-flood drills & contingency rehearsal",
          text: "Quickly run multiple what-if scenarios — e.g. \"another 50 mm upstream in 12 hours, will it exceed the warning level?\" — to prepare plans, rehearse, and assess risk ahead of time."
        },
        {
          title: "Automated operational materials & reports",
          text: "From a few report templates plus meeting or process notes, draft briefing minutes, reporting materials, and review reports — a multi-thousand-word first draft in minutes."
        },
        {
          title: "Alerts & risk-change phone notifications",
          text: "Configure rainfall, water-regime, and risk-change rules to your practice; critical changes can trigger a phone call, easing the burden of round-the-clock screen watching."
        },
        {
          title: "Capturing veteran forecaster experience",
          text: "Gradually distill historical floods, parameter choices, review conclusions, and local patterns into a local knowledge base that supports capability handover."
        },
        {
          title: "Shift handover & process trail",
          text: "Automatically compile current conditions, judgments made, why parameters were chosen, and what the next shift should watch — fewer handover gaps, easier review."
        },
        {
          title: "Anomaly alerts & data QC",
          text: "Help spot missing, jumping, delayed, or neighbor-inconsistent data, and flag when current inputs are unsuitable for direct simulation."
        },
        {
          title: "Extensible to your real operations",
          text: "If frontline work has other repetitive, process-based, or automation needs, we can keep building. HydroAgent is not just a single-point tool but a gradually extensible assistant shaped around grassroots hydrological operations."
        }
      ]
    }
  },
  zh: {
    lead: {
      eyebrow: "服务",
      title: "能力与服务 ",
      text:
        "HydroAgent 不止是一个洪水预报产品（那是 HydroAgent-FF）。这一页从两个维度说明你能从我们这儿获得什么：合作方式，以及能力清单 ",
      facts: [
        { label: "两个维度", value: "合作方式 ·    能力清单" },
        { label: "旗舰产品", value: "HydroAgent-FF 面向洪水预报" },
        { label: "合作形态", value: "本地化、系统耦合、试点、研究" }
      ]
    },
    collaborationSection: {
      eyebrow: "合作方式",
      title: "可以这样开始合作 ",
      items: [
        {
          title: "本地化适配的 HydroAgent",
          text: "把 HydroAgent 适配到你的流域与机构：结合当地数据、你现有的水文模型、本地业务实践和本地大模型，而不是一个通用 demo。 "
        },
        {
          title: "与已有数字孪生 / 业务系统耦合",
          text: "把 HydroAgent 作为 AI 工作流与复核层，接入已有数字孪生平台或业务预报系统。已有系统继续承担数据底座和模型计算，HydroAgent 负责有条理的推理组织、专家判断显性化和人机复核。不替换，只增强。 "
        },
        {
          title: "试点、研究与机构介绍",
          text: "从一次聚焦的试点或简报开始，逐步进入更深的合作。 ",
          cta: { label: "详见联系页", path: "/contact" }
        }
      ]
    },
    tasksSection: {
      eyebrow: "能力清单",
      title: "HydroAgent-Lab 能为你做什么 ",
      text: { before: "想了解旗舰洪水产品，见 ", link: "HydroAgent-FF", path: "/platform", after: "" },
      items: [
        {
          title: "实时洪水预报研判",
          text: "结合历史洪水、实时雨水情和预报降雨研判洪水过程，自动匹配更合适的参数组；每一步暂停由人工审核、调整和确认，整个过程可追溯、可复核、可审计。 "
        },
        {
          title: "快速情景模拟",
          text: "用自然语言回答「如果降雨再增加 20mm，流量过程会怎么变」这类临时问题，自动生成未来流量过程和研判结果。 "
        },
        {
          title: "汛前推演和预案演练",
          text: "快速推演多个情景，比如「上游未来 12 小时再下 50mm 会不会超警戒水位」，帮助机构在汛前提前做预案、做演练、做风险研判。 "
        },
        {
          title: "自动生成业务材料和报告",
          text: "基于几份报告模板，再输入会议记录或过程材料，几分钟内生成会商纪要、汇报材料、复盘报告等初稿，大幅减少重复性文字工作。 "
        },
        {
          title: "消息提醒和风险变化电话通知",
          text: "按业务习惯配置雨情、水情和风险变化提醒规则，关键变化还可触发电话提醒，让值班人员不必长时间盯屏，减轻汛期值班压力。 "
        },
        {
          title: "老专家经验沉淀",
          text: "把历史洪水、参数选择经验、复盘结论和地方规律逐步沉淀成「本地知识库」，支撑单位能力传承。 "
        },
        {
          title: "值班交接和过程留痕",
          text: "自动整理当前雨水情、已做判断、参数为何这样选、专家在哪一步调整过、下一班要关注什么，减少交接遗漏、方便复盘。 "
        },
        {
          title: "异常提醒和数据质控",
          text: "帮助发现缺测、跳变、延迟或与邻近站不一致的数据，并提示当前输入是否适合直接模拟。 "
        },
        {
          title: "可根据实际业务继续扩展",
          text: "针对一线工作中其他重复性、流程性、自动化需求，我们可以为您开发实现。HydroAgent 的价值不只是一个单点工具，而是逐步围绕基层水文业务形成一个可扩展的智能助手。 "
        }
      ]
    }
  }
};

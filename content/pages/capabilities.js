export const capabilitiesContent = {
  en: {
    lead: {
      eyebrow: "Capabilities",
      title: "Capabilities & collaboration.",
      text:
        "HydroAgent is more than a flood forecasting product (that is HydroAgent-FF). This page shows how we work with partners and what HydroAgent can support in practice.",
      facts: [
        { label: "Two views", value: "Ways to work together · What HydroAgent does" },
        { label: "Flagship", value: "HydroAgent-FF for flood forecasting" },
        { label: "Engagement", value: "Lightweight modules, integration, pilots, service" }
      ]
    },
    collaborationSection: {
      eyebrow: "",
      title: "Ways to get started.",
      items: [
        {
          title: "A localized HydroAgent",
          text: "Adapt HydroAgent to your basin, data sources, hydrological model, and operational workflow, working with what you already use rather than asking teams to rebuild from scratch."
        },
        {
          title: "Integrate with your existing forecasting platform or digital twin",
          text: "Run HydroAgent as an AI workflow and review layer on top of your existing digital twin or operational forecasting system. Your system keeps the data foundation and model computation; HydroAgent adds organized reasoning, visible expert judgment, and human-in-the-loop review, augmenting rather than replacing."
        },
        {
          title: "Pilots, research & briefings",
          text: "Start from a focused pilot or briefing and grow into deeper collaboration.",
          cta: { label: "See Contact", path: "/contact" }
        }
      ]
    },
    tasksSection: {
      eyebrow: "",
      title: "What HydroAgent-Lab can do for you.",
      text: { before: "For the flagship flood product, see ", link: "HydroAgent-FF", path: "/platform", after: "." },
      items: [
        {
          title: "Localized small-basin adaptation",
          text: "Start from the basin, stations, models, templates, and operating habits already in use, then configure only the functions the local team actually needs."
        },
        {
          title: "Existing platform and digital twin coupling",
          text: "Connect HydroAgent to an existing forecasting system, digital twin, database, or monitoring platform as a workflow and review layer, avoiding duplicate construction."
        },
        {
          title: "Local knowledge base and experience capture",
          text: "Distill historical floods, parameter choices, review conclusions, and local rules into a reusable knowledge base that helps preserve institutional experience."
        },
        {
          title: "Lightweight model and modular deployment",
          text: "Use focused modules and cost-controlled model configurations for practical local scenarios, instead of forcing a large all-in-one platform into every project."
        },
        {
          title: "Reusable operational workflows",
          text: "Turn repeated tasks such as model review, risk judgment, bulletin preparation, and handover into workflows that can be reused, audited, and improved."
        },
        {
          title: "Forecast judgment with human review",
          text: "Combine historical floods, live rain and water conditions, and forecast rainfall to support flood judgment, while keeping human review and release authority in the loop."
        },
        {
          title: "Scenario simulation and pre-flood rehearsal",
          text: "Answer what-if questions in natural language and quickly run scenarios such as added upstream rainfall, warning-level exceedance, and contingency rehearsal."
        },
        {
          title: "Monitoring data analysis and risk detection",
          text: "Analyze incoming observation or safety-monitoring data, flag missing or abnormal values, and identify possible risk signals that should not rely on manual inspection alone."
        },
        {
          title: "High-frequency small tools and local service",
          text: "Add practical functions such as alerts, phone notifications, report drafts, shift handover notes, and data checks as the local workflow evolves, with fast service response."
        }
      ]
    }
  },
  zh: {
    lead: {
      eyebrow: "服务",
      title: "能力与服务 ",
      text:
        "HydroAgent 不止是一个洪水预报产品（那是 HydroAgent-FF）。这一页介绍我们如何与合作方协作，以及 HydroAgent 在实际工作中能支持什么。 ",
      facts: [
        { label: "两个维度", value: "合作方式 · 能力清单" },
        { label: "旗舰产品", value: "HydroAgent-FF 面向洪水预报" },
        { label: "合作形态", value: "轻量模块、系统耦合、试点、服务" }
      ]
    },
    collaborationSection: {
      eyebrow: "",
      title: "可以这样开始合作 ",
      items: [
        {
          title: "本地化适配的 HydroAgent",
          text: "根据你的流域、数据来源、水文模型和业务流程，对 HydroAgent 进行本地化适配，尽量沿用现有系统和数据资产，而不是重新建设一套通用 demo。 "
        },
        {
          title: "接入现有预报平台或数字孪生系统",
          text: "把 HydroAgent 作为 AI 工作流与复核层，接入已有数字孪生平台或业务预报系统。已有系统继续承担数据底座和模型计算，HydroAgent 负责有条理地组织推理、让专家判断可见可追踪，并保留人机复核。不替换，只增强。 "
        },
        {
          title: "试点、研究与机构交流",
          text: "从一次聚焦的试点或简报开始，逐步进入更深的合作。 ",
          cta: { label: "详见联系页", path: "/contact" }
        }
      ]
    },
    tasksSection: {
      eyebrow: "",
      title: "HydroAgent-Lab 能为你做什么 ",
      text: { before: "想了解旗舰洪水产品，见 ", link: "HydroAgent-FF", path: "/platform", after: "" },
      items: [
        {
          title: "小流域本地化适配",
          text: "围绕地方水文局、小流域和基层单位的真实流程，接入已有站点、模型、模板和工作习惯，只配置当前真正需要的功能。 "
        },
        {
          title: "接入现有平台和数字孪生",
          text: "把 HydroAgent 作为智能工作流与复核层，接到已有预报平台、数字孪生、数据库或监测系统上，尽量避免重复建设。 "
        },
        {
          title: "本地知识库和经验沉淀",
          text: "把历史洪水、参数选择经验、复盘结论和地方规律逐步沉淀成可复用的本地知识库，支撑单位能力传承。 "
        },
        {
          title: "轻量模型和模块化部署",
          text: "用聚焦场景的能力模块和成本可控的模型配置解决具体问题，不把每个项目都做成大而全的平台。 "
        },
        {
          title: "可复用业务 workflow",
          text: "把模型复核、风险研判、材料生成、值班交接等重复工作整理成可运行、可复盘、可持续迭代的 workflow。 "
        },
        {
          title: "洪水预报研判与人机复核",
          text: "结合历史洪水、实时雨水情和预报降雨辅助研判洪水过程，关键判断保留人工审核、调整和确认，过程可追溯、可审计。 "
        },
        {
          title: "快速情景模拟和汛前演练",
          text: "用自然语言快速回答「上游未来 12 小时再下 50mm 会不会超警戒水位」等问题，支撑预案推演和风险研判。 "
        },
        {
          title: "观测数据分析和风险识别",
          text: "对雨水情、工情或安全监测数据做缺测、跳变、延迟和异常变化识别，提示可能需要关注的风险信号。 "
        },
        {
          title: "高频小功能和本地服务响应",
          text: "围绕一线单位的小而高频需求，持续补充提醒通知、电话叫醒、报告初稿、值班交接、数据质控等实用功能，并快速响应现场反馈。 "
        }
      ]
    }
  }
};

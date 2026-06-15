export function normalizePath(path) {
  if (!path || path === "/") return "/";
  return path.endsWith("/") ? path.slice(0, -1) : path;
}

export function localizeHref(lang, path) {
  const normalized = normalizePath(path);
  if (lang === "zh") return normalized === "/" ? "/zh" : `/zh${normalized}`;
  return normalized;
}

export function stripLangPrefix(path) {
  const normalized = normalizePath(path);
  if (normalized === "/zh") return "/";
  if (normalized.startsWith("/zh/")) return normalized.slice(3);
  return normalized;
}

export function getLanguageSwitchHref(pathname, lang) {
  const basePath = stripLangPrefix(pathname || "/");
  return lang === "zh" ? localizeHref("en", basePath) : localizeHref("zh", basePath);
}

export const siteContent = {
  en: {
    ui: {
      localeLabel: "EN",
      switchLabel: "中文",
      brandTagline: "Water intelligence, agentic by design",
      footerTitle:
        "HydroAgent-Lab supports forecasting teams with hydrologic AI products, workflow systems, and expert collaboration.",
      footerMetaOne:
        "For forecasting teams, water agencies, and research partners evaluating AI-native water intelligence systems.",
      footerMetaTwo:
        "Use the contact page to discuss products, pilots, technical briefings, or research collaboration.",
      nav: [
        { path: "/platform", label: "Approach" },
        { path: "/capabilities", label: "Capabilities" },
        { path: "/workflow", label: "Workflow" },
        { path: "/research", label: "Research" },
        { path: "/team", label: "Team" },
        { path: "/contact", label: "Contact" }
      ],
      headerCta: "Request a briefing",
      cta: {
        eyebrow: "Next Step",
        title: "Start a focused discussion about product fit, workflow design, or research collaboration.",
        text:
          "HydroAgent-Lab works with institutions, forecasting teams, and research partners that need operationally credible hydrologic systems.",
        primary: "Contact the team",
        primaryPath: "/contact",
        secondary: "Read the workflow",
        secondaryPath: "/workflow"
      }
    },
    home: {
      hero: {
        eyebrow: "HydroAgent-Lab",
        chip: "Products and services",
        title: "HydroAgent",
        text:
          "We teach AI to work alongside flood forecasters: reading context, preserving expert judgment, and turning hydrologic uncertainty into reviewable decisions.",
        primary: "Read the approach",
        primaryPath: "/platform",
        secondary: "See it in action",
        secondaryPath: "/workflow",
        supporting:
          "HydroAgent-FF is the flagship flood product. The wider HydroAgent portfolio is built for many water-intelligence workflows.",
        signals: [
          "One AI-native brand for multiple water-operation products",
          "From pilots to deployable systems, not just research prototypes",
          "Keeps models, expert review, and operational action connected"
        ],
        stats: [
          { label: "Portfolio structure", value: "Products, workflow systems, and services" },
          { label: "Flagship line", value: "HydroAgent-FF for flood forecasting operations" },
          { label: "Engagement model", value: "Software, pilot work, and research collaboration" }
        ],
        panelEyebrow: "What the portfolio covers",
        pillars: [
          {
            title: "Products",
            text: "Operational systems such as HydroAgent-FF and future domain-specific modules."
          },
          {
            title: "Services",
            text: "Workflow design, pilot support, and technical collaboration with domain teams."
          },
          {
            title: "Research",
            text: "Judgment formalization, operational intelligence, and replayable hydrologic workflows."
          }
        ]
      },
      productPreview: {
        eyebrow: "Product View",
        title: "HydroAgent-FF is one product surface inside a broader HydroAgent offering.",
        text:
          "HydroAgent-FF demonstrates one concrete operating surface within a broader offering that also includes workflow systems, deployment support, and research collaboration.",
        topbar: {
          title: "HydroAgent-FF / South Yamhill event",
          status: "Rolling forecast active"
        },
        kpis: [
          { label: "Rainfall", value: "74 mm", note: "6 hr cumulative" },
          { label: "Lead time", value: "6.5 h", note: "Before bulletin window" },
          { label: "Review gate", value: "Pending", note: "Senior analyst approval" }
        ],
        modules: [
          {
            label: "Forecast context",
            title: "Rainfall and basin state",
            text: "Radar trend, soil saturation, upstream inflow, and analog events."
          },
          {
            label: "Analyst package",
            title: "Prior judgment and watchpoints",
            text: "Release thresholds, confidence notes, and process-correction cues."
          },
          {
            label: "Release package",
            title: "Bulletin and handoff",
            text: "Draft language, rationale, revision notes, and approver summary."
          }
        ],
        logs: [
          "Prior judgment updated after basin saturation check",
          "Forecast v4 released to review after process correction",
          "Bulletin package assembled for final approval"
        ],
        panels: [
          { label: "Scenario Brief", value: "Observed event context and known risks" },
          { label: "Correction Record", value: "Mismatch drivers, evidence, and revisions" },
          { label: "Release Summary", value: "Approved framing and downstream actions" }
        ]
      },
      highlightsSection: {
        eyebrow: "Product Map",
        title: "A portfolio of AI products for the next generation of water operations.",
        text:
          "HydroAgent-Lab is not a single tool. It is a product system covering flood intelligence, workflow automation, review surfaces, and expert service delivery.",
        items: [
          {
            title: "HydroAgent-FF",
            text: "A flood forecasting workflow product that supports scenario setup, rolling updates, and release review."
          },
          {
            title: "Workflow systems",
            text: "Reusable operating structures for hydrologic teams that need traceability, handoff, and auditability."
          },
          {
            title: "Expert services",
            text: "Pilot design, institutional briefings, and research collaboration around operational intelligence."
          }
        ]
      },
      clientSection: {
        eyebrow: "Who It Serves",
        title: "Built for teams that need a modern AI operating layer, not another static dashboard.",
        items: [
          {
            title: "Forecasting agencies",
            text: "Teams responsible for repeated forecast updates, release review, and operational handoff."
          },
          {
            title: "Research groups",
            text: "Programs studying workflow intelligence, judgment capture, and reviewable hydrologic operations."
          },
          {
            title: "Technical partners",
            text: "Organizations evaluating pilots, local workflow integration, or broader institutional adoption."
          }
        ]
      },
      proofSection: {
        eyebrow: "What Clients Evaluate",
        title: "Teams usually evaluate HydroAgent-Lab on four practical questions.",
        items: [
          {
            title: "Can it fit existing release workflows?",
            text: "The platform is designed to work with analyst review, release checkpoints, and local operational constraints."
          },
          {
            title: "Can it preserve expert judgment?",
            text: "Prior assumptions, watchpoints, and revision logic remain visible instead of disappearing into informal practice."
          },
          {
            title: "Can it support repeated updates?",
            text: "Rolling forecast cycles, version deltas, and release context are kept structured across operational updates."
          },
          {
            title: "Can it support pilot adoption?",
            text: "The offering is organized for product evaluation, workflow integration, and scoped institutional collaboration."
          }
        ]
      },
      adoptionSection: {
        eyebrow: "Adoption Path",
        title: "A typical engagement moves from focused evaluation into scoped operational use.",
        items: [
          {
            step: "01",
            title: "Briefing",
            text: "Align on team structure, operational scope, and the product or service path that fits the use case."
          },
          {
            step: "02",
            title: "Scoping",
            text: "Define workflow boundaries, review gates, deployment constraints, and pilot objectives."
          },
          {
            step: "03",
            title: "Pilot",
            text: "Run HydroAgent-FF or a workflow system in a scoped operational setting with explicit outputs and checkpoints."
          },
          {
            step: "04",
            title: "Extension",
            text: "Extend into broader workflow integration, research collaboration, or additional product modules."
          }
        ]
      },
      deliverablesSection: {
        eyebrow: "Engagement Model",
        title: "Engagement options are structured around how teams adopt, deploy, and extend the work.",
        text:
          "Clients and collaborators can engage through pilots, workflow design, research programs, and technical briefings.",
        items: [
          {
            title: "Operational pilots",
            text: "Work with forecasting teams to scope a deployment, define review gates, and fit the product into local workflows."
          },
          {
            title: "Workflow design",
            text: "Structure scenario preparation, judgment capture, revision discipline, and release packaging across teams."
          },
          {
            title: "Research collaboration",
            text: "Frame papers, evaluation plans, and institutional studies around hydrologic workflow intelligence."
          },
          {
            title: "Technical briefings",
            text: "Support stakeholder alignment with product walkthroughs, system framing, and operational examples."
          }
        ]
      },
      positioningSection: {
        eyebrow: "Positioning",
        title:
          "HydroAgent-Lab operates as an umbrella hydrologic AI brand, with HydroAgent-FF as one flagship product line.",
        text:
          "This structure supports software products, expert services, and longer-term research programs under one coherent platform identity.",
        comparisonRows: [
          {
            dimension: "Brand scope",
            lab: "Multiple products, services, and research programs",
            other: "One narrow tool or demo"
          },
          {
            dimension: "Flagship product",
            lab: "HydroAgent-FF for flood forecasting operations",
            other: "No clear flagship or no surrounding platform story"
          },
          {
            dimension: "Engagement model",
            lab: "Software plus pilots, workflow support, and research work",
            other: "Static product page with little strategic depth"
          }
        ]
      }
    },
    platform: {
      lead: {
        eyebrow: "Platform",
        title: "One platform foundation behind products, workflow systems, and expert collaboration.",
        text:
          "The platform provides the shared foundation behind HydroAgent-FF and future domain-specific offerings.",
        facts: [
          { label: "Primary use", value: "Operational hydrologic workflow support" },
          { label: "Core model", value: "Human review remains inside the release chain" },
          { label: "Adoption path", value: "Products, pilots, and workflow integration" }
        ]
      },
      offeringsSection: {
        eyebrow: "Offerings",
        title: "The platform supports multiple outward-facing offerings.",
        items: [
          {
            title: "HydroAgent-FF",
            text: "A flood forecasting workflow product for teams that need structured updates, review gates, and release readiness."
          },
          {
            title: "Workflow systems",
            text: "Reusable operating structures for scenario preparation, judgment capture, revision tracking, and replay."
          },
          {
            title: "Expert support",
            text: "Pilot design, workflow integration, and technical collaboration with domain teams."
          }
        ]
      },
      architectureSection: {
        eyebrow: "Architecture",
        title: "The platform keeps each layer clear and accountable.",
        text:
          "Models generate evidence. Analysts define context and judgment. HydroAgent-Lab coordinates the workflow and preserves the record.",
        layers: [
          {
            title: "Data and model layer",
            text: "Radar, basin state, forcings, simulation outputs, and diagnostics remain the evidence base."
          },
          {
            title: "Reasoning and review layer",
            text: "Analyst priors, watchpoints, correction notes, and confidence framing stay explicit."
          },
          {
            title: "Operational delivery layer",
            text: "Rolling forecast versions, release packaging, and replay-ready artifacts move through review."
          }
        ]
      },
      principlesSection: {
        eyebrow: "Product Principles",
        title: "Three constraints keep the platform credible.",
        items: [
          {
            title: "Models stay central",
            text: "The system supports process-based hydrology instead of pretending the LLM replaces it."
          },
          {
            title: "Humans stay accountable",
            text: "Forecast authority and release approval remain with the operational team."
          },
          {
            title: "The record stays inspectable",
            text: "Assumptions, revisions, and evidence are preserved in a form the team can revisit."
          }
        ]
      },
      surfacesSection: {
        eyebrow: "Work Surfaces",
        title: "The interface is organized around the tasks people actually perform.",
        items: [
          {
            title: "Scenario workspace",
            text: "Build event context from rainfall, basin state, upstream conditions, and analog history."
          },
          {
            title: "Judgment workspace",
            text: "Capture priors, watchpoints, confidence notes, and correction hypotheses in structured form."
          },
          {
            title: "Release workspace",
            text: "Assemble bulletin drafts, revision notes, and approval packages for final issuance."
          }
        ]
      },
      capabilitiesSection: {
        eyebrow: "Delivery Model",
        title: "Capabilities are packaged around operational work, not AI feature marketing.",
        text:
          "The platform earns trust by helping teams complete forecast work with more structure and less fragmentation.",
        items: [
          "Scenario preparation and context assembly",
          "Prior judgment capture with reusable templates",
          "Model run review and correction traceability",
          "Rolling forecast comparison across update cycles",
          "Bulletin drafting with review-ready context",
          "Post-event replay for training and analysis"
        ]
      }
    },
    capabilities: {
      lead: {
        eyebrow: "Capabilities",
        title: "Find what HydroAgent-Lab can do today.",
        text:
          "A searchable directory of current product capabilities, workflow services, and collaboration modes. As the portfolio grows, this becomes the place to check what is already available.",
        facts: [
          { label: "Scope", value: "Products, workflow systems, services, and research collaboration" },
          { label: "Use", value: "Search by task, stage, product, or adoption need" },
          { label: "Status", value: "Current capabilities, with room for future modules" }
        ]
      },
      directoryEyebrow: "Capability Directory",
      directoryTitle: "Search by the work you need to support.",
      searchLabel: "Search capabilities",
      searchPlaceholder: "Try forecast review, release package, pilot, replay...",
      filterLabel: "Capability categories",
      allLabel: "All",
      emptyText: "No matching capability yet. Try another keyword or contact the team.",
      categories: [
        { id: "forecasting", label: "Forecasting" },
        { id: "workflow", label: "Workflow" },
        { id: "review", label: "Review" },
        { id: "adoption", label: "Adoption" },
        { id: "research", label: "Research" }
      ],
      items: [
        {
          category: "forecasting",
          categoryLabel: "Forecasting",
          stage: "Before forecast",
          status: "Available",
          title: "Scenario preparation",
          summary:
            "Assemble rainfall, basin state, upstream context, analog events, and known operational constraints before interpretation starts.",
          tags: ["HydroAgent-FF", "rainfall", "basin state", "scenario"]
        },
        {
          category: "workflow",
          categoryLabel: "Workflow",
          stage: "Before forecast",
          status: "Available",
          title: "Prior judgment capture",
          summary:
            "Turn forecaster expectations, thresholds, watchpoints, and assumptions into reusable structured artifacts.",
          tags: ["expert judgment", "templates", "watchpoints", "assumptions"]
        },
        {
          category: "review",
          categoryLabel: "Review",
          stage: "During update",
          status: "Available",
          title: "Model run review",
          summary:
            "Review model mismatch, surface uncertainty drivers, record correction hypotheses, and keep the evidence chain visible.",
          tags: ["model review", "uncertainty", "correction", "diagnostics"]
        },
        {
          category: "forecasting",
          categoryLabel: "Forecasting",
          stage: "During update",
          status: "Available",
          title: "Rolling forecast comparison",
          summary:
            "Compare forecast versions across update cycles so teams can see what changed, why it changed, and what still needs attention.",
          tags: ["rolling forecast", "versions", "deltas", "updates"]
        },
        {
          category: "review",
          categoryLabel: "Review",
          stage: "Release gate",
          status: "Available",
          title: "Release package assembly",
          summary:
            "Prepare bulletin language, confidence notes, unresolved watchpoints, and approval context for final human release authority.",
          tags: ["bulletin", "approval", "handoff", "release"]
        },
        {
          category: "workflow",
          categoryLabel: "Workflow",
          stage: "After event",
          status: "Available",
          title: "Post-event replay",
          summary:
            "Preserve scenario context, decisions, revisions, and release artifacts for training, review, and institutional learning.",
          tags: ["replay", "training", "audit", "post-event"]
        },
        {
          category: "adoption",
          categoryLabel: "Adoption",
          stage: "Pilot",
          status: "Available",
          title: "Operational pilot design",
          summary:
            "Scope a pilot around a real workflow, define review gates, decide success criteria, and map integration constraints.",
          tags: ["pilot", "deployment", "integration", "evaluation"]
        },
        {
          category: "adoption",
          categoryLabel: "Adoption",
          stage: "Briefing",
          status: "Available",
          title: "Technical briefing",
          summary:
            "Support stakeholder alignment with product walkthroughs, system framing, use-case mapping, and adoption discussion.",
          tags: ["briefing", "stakeholders", "product walkthrough", "fit"]
        },
        {
          category: "research",
          categoryLabel: "Research",
          stage: "Collaboration",
          status: "Available",
          title: "Research collaboration",
          summary:
            "Frame studies around hydrologic workflow intelligence, judgment formalization, replayability, and operational evaluation.",
          tags: ["research", "evaluation", "judgment", "workflow intelligence"]
        }
      ]
    },
    workflow: {
      lead: {
        eyebrow: "Workflow",
        title: "Five steps, one chain of responsibility, and a clear handoff to human release authority.",
        text:
          "The workflow makes reasoning explicit under operational pressure while preserving the analyst's role in review and release.",
        facts: [
          { label: "Coverage", value: "Scenario framing through release gate" },
          { label: "Operating mode", value: "Rolling forecast with traceable updates" },
          { label: "Final authority", value: "Human release decision" }
        ]
      },
      stepsSection: {
        eyebrow: "Operating Chain",
        title: "Each stage has a distinct purpose, owner, and output.",
        text:
          "Each stage supports repeatable forecast operations, from scenario framing through final release.",
        items: [
          {
            id: "01",
            name: "Scenario preparation",
            summary:
              "Assemble rainfall, basin state, analogs, and quality checks before interpretation starts.",
            owner: "Analyst + system",
            output: "Scenario brief"
          },
          {
            id: "02",
            name: "Prior judgment",
            summary: "Turn tacit forecaster expectations into explicit assumptions and watchpoints.",
            owner: "Analyst",
            output: "Judgment package"
          },
          {
            id: "03",
            name: "Process correction",
            summary: "Review model mismatch, document hypotheses, and preserve evidence behind revisions.",
            owner: "Analyst + model review",
            output: "Correction record"
          },
          {
            id: "04",
            name: "Rolling forecast",
            summary: "Update the forecast over time while keeping version deltas and rationale legible.",
            owner: "System + analyst",
            output: "Versioned forecast set"
          },
          {
            id: "05",
            name: "Release gate",
            summary: "Package risk framing, bulletin text, and approval context for final issuance.",
            owner: "Lead forecaster",
            output: "Release bulletin"
          }
        ]
      },
      artifactsSection: {
        eyebrow: "Artifacts",
        title: "The workflow is useful because every stage leaves behind something reusable.",
        items: [
          {
            title: "Before forecast updates",
            text: "Scenario briefs, input validation, basin context, and analog references."
          },
          {
            title: "During revision cycles",
            text: "Correction logs, forecast deltas, watchpoints, and evidence notes."
          },
          {
            title: "At release time",
            text: "Bulletin language, approval context, and post-event replay records."
          }
        ]
      },
      handoffSection: {
        eyebrow: "Critical Handoff",
        title: "The release gate remains explicit because final responsibility remains explicit.",
        text:
          "HydroAgent-Lab helps the team prepare a release decision. It does not erase the final human checkpoint.",
        points: [
          "Release framing stays visible next to the underlying forecast context.",
          "Approvers see revision history, confidence notes, and unresolved watchpoints in one place.",
          "Issued outputs remain connected to the reasoning and evidence behind them."
        ]
      }
    },
    research: {
      lead: {
        eyebrow: "Research",
        title: "The research program is broader than one product surface.",
        text:
          "HydroAgent-Lab brings products, operational workflows, and hydrologic research into one shared program of work.",
        facts: [
          { label: "Research focus", value: "Workflow intelligence in hydrologic operations" },
          { label: "Contribution", value: "Judgment formalization and replayability" },
          { label: "Evaluation", value: "Operational clarity, usability, and review value" }
        ]
      },
      thesisSection: {
        eyebrow: "Core Thesis",
        title: "HydroAgent-Lab treats flood forecasting as an institutional workflow, not only a modeling problem.",
        claims: [
          "Tacit forecasting expertise can be externalized into structured artifacts.",
          "Replayability and reviewability belong in the system design, not in a post hoc notebook.",
          "Human release authority can remain central while the workflow becomes more legible and scalable."
        ]
      },
      themesSection: {
        eyebrow: "Research Areas",
        title: "Three research angles give the work a coherent frame.",
        text: "These research areas define the contribution, the method, and the evaluation path.",
        items: [
          {
            title: "Judgment formalization",
            text: "How prior assumptions, watchpoints, and revision logic become reusable reasoning records."
          },
          {
            title: "Operational coordination",
            text: "How models, analysts, and institutional review can be composed into one executable chain."
          },
          {
            title: "Replay and learning",
            text: "How issued forecasts can be inspected later for training, analysis, and organizational memory."
          }
        ]
      },
      evaluationSection: {
        eyebrow: "Evaluation",
        title: "Evaluation extends beyond forecast accuracy alone.",
        items: [
          {
            title: "Process clarity",
            text: "Did the system make assumptions, revisions, and release rationale more explicit?"
          },
          {
            title: "Operational usability",
            text: "Did the workflow reduce fragmentation during repeated forecast updates?"
          },
          {
            title: "Replay value",
            text: "Can the team reconstruct what changed, why it changed, and what was issued?"
          }
        ]
      },
      narrativeSection: {
        eyebrow: "Narrative",
        title: "The work is undersold when it is described as only a calibration agent.",
        text:
          "Its center of gravity is the explicit organization of a forecasting workflow: scenario framing, expert priors, correction logic, rolling updates, and release readiness."
      }
    },
    team: {
      lead: {
        eyebrow: "Team",
        title: "A focused team building AI-native systems for water operations.",
        text:
          "HydroAgent-Lab brings together hydrologic modeling, operational workflow design, AI product engineering, and research translation.",
        facts: [
          { label: "Operating mode", value: "Product, research, and pilot delivery" },
          { label: "Core discipline", value: "Hydrology, AI systems, and operational workflows" },
          { label: "Collaboration model", value: "Lean team with domain partners" }
        ]
      },
      operatingSection: {
        eyebrow: "How We Work",
        title: "The team is organized around decisions, not around isolated technical functions.",
        text:
          "Each workstream connects a domain question to a product surface, a review workflow, and a deployment path.",
        items: [
          {
            title: "Hydrologic intelligence",
            text: "Model behavior, basin context, forecast uncertainty, and operational interpretation."
          },
          {
            title: "AI product systems",
            text: "Agentic interfaces, workflow automation, review surfaces, and decision support."
          },
          {
            title: "Operational translation",
            text: "Pilot design, stakeholder alignment, release discipline, and institutional adoption."
          }
        ]
      },
      principlesSection: {
        eyebrow: "Team Principles",
        title: "Small team, clear responsibility, serious operational standards.",
        items: [
          {
            title: "Product before demo",
            text: "We prioritize systems that can be evaluated, operated, and improved in real workflows."
          },
          {
            title: "Domain judgment stays visible",
            text: "Hydrologic expertise is treated as part of the system, not as a note outside the interface."
          },
          {
            title: "Partnership matters",
            text: "The strongest work happens with teams that bring local basins, processes, and operational constraints."
          }
        ]
      }
    },
    contact: {
      lead: {
        eyebrow: "Contact",
        title: "A clear entry point for product inquiries, service discussions, and research collaboration.",
        text:
          "Use this page to start commercial, operational, or research conversations with the HydroAgent team.",
        facts: [
          { label: "Best for", value: "Pilots, collaboration, and institutional briefings" },
          { label: "Response window", value: "Typically within 3 business days" },
          { label: "Contact route", value: "Email-first with scoped follow-up" }
        ]
      },
      primarySection: {
        eyebrow: "Primary Contact",
        title: "Use one clear route for serious conversations.",
        summary:
          "Start with a short note about your team, your use case, and whether the discussion is about research, deployment, or institutional collaboration.",
        emailLabel: "Email",
        email: "contact@hydroagent-lab.org",
        responseLabel: "Response window",
        response: "Typically within 3 business days",
        formatLabel: "Best for",
        format: "Pilot inquiries, collaboration discussions, and research briefings"
      },
      inquirySection: {
        eyebrow: "Inquiry Types",
        title: "Three common reasons to reach out.",
        items: [
          {
            title: "Research collaboration",
            text: "Discuss workflow intelligence, judgment formalization, evaluation design, or joint papers."
          },
          {
            title: "Operational pilot",
            text: "Explore how the platform could support repeated forecast updates, review gates, and release packaging."
          },
          {
            title: "Institutional briefing",
            text: "Introduce the framing, the workflow, and the product direction to a broader stakeholder group."
          }
        ]
      },
      stepsSection: {
        eyebrow: "Engagement Path",
        title: "A straightforward three-step path moves the conversation forward quickly.",
        items: [
          {
            id: "01",
            title: "Send context",
            text: "Describe your team, basin, current workflow, and what kind of conversation you need."
          },
          {
            id: "02",
            title: "Review fit",
            text: "We review whether the conversation is best handled as a briefing, pilot discussion, or research exchange."
          },
          {
            id: "03",
            title: "Schedule next step",
            text: "Move into a focused call, a scoped follow-up, or a document exchange."
          }
        ]
      },
      callout: {
        title: "For the fastest path, include your operational context in the first message.",
        text:
          "A short note with region, workflow maturity, and desired collaboration type is usually enough to start."
      }
    }
  },
  zh: {
    ui: {
      localeLabel: "中文",
      switchLabel: "EN",
      brandTagline: "面向水务运行的智能体平台",
      footerTitle: "HydroAgent-Lab 面向预报团队提供水文 AI 产品、业务工作流系统与专家协作支持。",
      footerMetaOne: "面向预报团队、水务机构与研究伙伴，提供 AI 原生水务智能系统。",
      footerMetaTwo: "如需了解产品、试点、技术简报或研究合作，请通过联系页面预约沟通。",
      nav: [
        { path: "/platform", label: "方法" },
        { path: "/capabilities", label: "能力" },
        { path: "/workflow", label: "工作流" },
        { path: "/research", label: "研究" },
        { path: "/team", label: "团队" },
        { path: "/contact", label: "联系" }
      ],
      headerCta: "预约沟通",
      cta: {
        eyebrow: "下一步",
        title: "从产品匹配、工作流设计或研究合作开始一次聚焦沟通。",
        text:
          "HydroAgent-Lab 服务于需要业务可信度、可部署能力与领域协作支持的机构、团队与研究伙伴。",
        primary: "联系团队",
        primaryPath: "/contact",
        secondary: "查看工作流",
        secondaryPath: "/workflow"
      }
    },
    home: {
      hero: {
        eyebrow: "HydroAgent-Lab",
        chip: "产品与服务",
        title: "让水务决策更清晰。",
        text:
          "HydroAgent-Lab 让 AI 沿着预报员的工作流思考：理解情境、保留专家判断，并把水文不确定性转化为可审核的业务决策。",
        primary: "查看方法",
        primaryPath: "/platform",
        secondary: "查看流程",
        secondaryPath: "/workflow",
        supporting:
          "HydroAgent-FF 是旗舰洪水产品，但 HydroAgent 的产品版图远不止一个预测工具。",
        signals: [
          "一个品牌承载多类水务智能产品",
          "从试点到可部署系统，而不是停留在研究原型",
          "连接模型、专家审核与业务行动"
        ],
        stats: [
          { label: "业务结构", value: "产品、工作流系统与服务并行" },
          { label: "旗舰产品", value: "HydroAgent-FF 洪水预报产品线" },
          { label: "合作方式", value: "软件、试点支持与研究协作" }
        ],
        panelEyebrow: "整个组合覆盖什么",
        pillars: [
          {
            title: "产品",
            text: "包括 HydroAgent-FF 在内的业务级水文工作流产品。"
          },
          {
            title: "服务",
            text: "包括流程设计、试点支持与领域协作。"
          },
          {
            title: "研究",
            text: "包括判断形式化、业务智能与可回放工作流研究。"
          }
        ]
      },
      productPreview: {
        eyebrow: "产品界面",
        title: "HydroAgent-FF 只是更大 HydroAgent 体系中的一个产品界面。",
        text:
          "HydroAgent-FF 展示了一个具体的业务界面，同时也代表更广的工作流系统、部署支持与研究协作能力。",
        topbar: {
          title: "HydroAgent-FF / South Yamhill 事件",
          status: "滚动预报进行中"
        },
        kpis: [
          { label: "降雨量", value: "74 mm", note: "6 小时累计" },
          { label: "提前量", value: "6.5 h", note: "距公告窗口" },
          { label: "审核状态", value: "待确认", note: "高级分析师审批" }
        ],
        modules: [
          {
            label: "预报上下文",
            title: "降雨与流域状态",
            text: "包括雷达趋势、土壤饱和度、上游来水与历史类比。"
          },
          {
            label: "判断包",
            title: "先验判断与关注点",
            text: "记录发布阈值、置信说明与过程修正线索。"
          },
          {
            label: "发布包",
            title: "公告与交接",
            text: "沉淀草稿文本、理由说明、修订记录与审批摘要。"
          }
        ],
        logs: [
          "完成流域饱和度检查后更新先验判断",
          "过程修正后生成第 4 版滚动预报并提交审核",
          "已整理公告发布包，等待最终确认"
        ],
        panels: [
          { label: "情景简报", value: "事件背景、已知风险与观测概览" },
          { label: "修正记录", value: "偏差原因、证据链与版本修订" },
          { label: "发布摘要", value: "审批结论与下游行动建议" }
        ]
      },
      highlightsSection: {
        eyebrow: "产品版图",
        title: "面向水务运行的 AI 产品组合。",
        text:
          "HydroAgent-Lab 不是单一工具，而是一套覆盖洪水智能、流程自动化、审核界面与专家服务交付的产品系统。",
        items: [
          {
            title: "HydroAgent-FF",
            text: "面向洪水预报业务的工作流产品，支持情景准备、滚动更新与发布审核。"
          },
          {
            title: "工作流系统",
            text: "帮助水文团队沉淀可追溯、可交接、可复盘的业务结构。"
          },
          {
            title: "专家服务",
            text: "围绕试点、机构沟通与研究合作提供配套支持。"
          }
        ]
      },
      clientSection: {
        eyebrow: "服务对象",
        title: "面向需要现代 AI 操作层，而不是又一个静态看板的团队。",
        items: [
          {
            title: "预报机构",
            text: "负责多轮滚动更新、发布审核与业务交接的预报团队。"
          },
          {
            title: "研究团队",
            text: "关注工作流智能、判断沉淀与可审核水文业务流程的研究项目。"
          },
          {
            title: "技术合作方",
            text: "正在评估试点、本地流程集成或机构级采用路径的合作伙伴。"
          }
        ]
      },
      proofSection: {
        eyebrow: "客户通常会看什么",
        title: "团队通常会从四个实际问题来评估 HydroAgent-Lab。",
        items: [
          {
            title: "能否接入现有发布流程？",
            text: "平台围绕分析师审核、发布关口与本地业务约束来设计，而不是要求团队重来一套。"
          },
          {
            title: "能否保留专家判断？",
            text: "先验假设、关注点与修订逻辑会被显式保留，而不是继续停留在口头经验里。"
          },
          {
            title: "能否支撑多轮滚动更新？",
            text: "滚动预报、版本差异与发布背景能够在连续业务更新中保持结构化。"
          },
          {
            title: "能否支持试点采用？",
            text: "整体方案围绕产品评估、流程集成与机构级合作来组织，而不是单次演示。"
          }
        ]
      },
      adoptionSection: {
        eyebrow: "采用路径",
        title: "典型合作通常从聚焦评估开始，再进入范围清晰的业务试用。",
        items: [
          {
            step: "01",
            title: "简报沟通",
            text: "先对齐团队结构、业务范围，以及更适合采用产品还是服务合作路径。"
          },
          {
            step: "02",
            title: "范围界定",
            text: "明确流程边界、审核关口、部署约束与试点目标。"
          },
          {
            step: "03",
            title: "业务试点",
            text: "在清晰范围内运行 HydroAgent-FF 或工作流系统，并定义产出与检查点。"
          },
          {
            step: "04",
            title: "扩展合作",
            text: "继续延伸到更广的流程集成、研究协作或新增产品模块。"
          }
        ]
      },
      deliverablesSection: {
        eyebrow: "合作方式",
        title: "合作方式围绕采用、部署与能力延展而设计。",
        text:
          "客户与合作方可以通过试点、流程设计、研究计划与技术简报展开合作。",
        items: [
          {
            title: "业务试点",
            text: "和预报团队一起确定部署边界、审核节点与本地流程适配。"
          },
          {
            title: "流程设计",
            text: "帮助团队设计情景准备、判断沉淀、修订纪律与发布打包。"
          },
          {
            title: "研究合作",
            text: "围绕水文工作流智能、评价设计与论文叙事展开协作。"
          },
          {
            title: "技术简报",
            text: "支持机构对齐、产品讲解与业务示例沟通。"
          }
        ]
      },
      positioningSection: {
        eyebrow: "产品定位",
        title: "HydroAgent-Lab 作为上层水文 AI 品牌运行，HydroAgent-FF 是其中一个旗舰产品线。",
        text:
          "这样的品牌结构能够同时支撑软件产品、专业服务与长期研究计划。",
        comparisonRows: [
          {
            dimension: "品牌范围",
            lab: "多产品、多服务与研究项目",
            other: "单一工具或演示页面"
          },
          {
            dimension: "旗舰产品",
            lab: "HydroAgent-FF 面向洪水预报业务",
            other: "没有明确主产品或缺少平台叙事"
          },
          {
            dimension: "合作模式",
            lab: "软件、试点支持、流程服务与研究协作",
            other: "静态产品页，缺少战略深度"
          }
        ]
      }
    },
    platform: {
      lead: {
        eyebrow: "平台",
        title: "一个共享的平台基础，支撑产品、工作流系统与专家协作。",
        text:
          "这个平台为 HydroAgent-FF 以及后续领域化产品提供共享的基础能力。",
        facts: [
          { label: "主要用途", value: "支持业务级水文工作流" },
          { label: "核心模式", value: "人工审核保留在发布链路中" },
          { label: "采用路径", value: "产品、试点与流程集成" }
        ]
      },
      offeringsSection: {
        eyebrow: "对外能力",
        title: "这个平台能够支撑多种对外产品与合作形态。",
        items: [
          {
            title: "HydroAgent-FF",
            text: "面向洪水预报业务的工作流产品，强调结构化更新、审核关口与发布准备。"
          },
          {
            title: "工作流系统",
            text: "为情景准备、判断沉淀、修订追踪与回放复盘提供可复用的业务结构。"
          },
          {
            title: "专家支持",
            text: "面向领域团队提供试点设计、流程集成与技术协作。"
          }
        ]
      },
      architectureSection: {
        eyebrow: "平台结构",
        title: "平台结构清楚，责任链路清楚。",
        text:
          "模型负责提供证据，分析师负责给出上下文与判断，HydroAgent-Lab 负责把整个流程组织起来并留下记录。",
        layers: [
          {
            title: "数据与模型层",
            text: "承载雷达、流域状态、驱动数据、模型输出与诊断信息。"
          },
          {
            title: "判断与审核层",
            text: "显式记录先验、关注点、修正说明与置信表达。"
          },
          {
            title: "业务交付层",
            text: "管理滚动预报版本、发布打包与复盘工件。"
          }
        ]
      },
      principlesSection: {
        eyebrow: "产品原则",
        title: "三个约束让平台保持可信。",
        items: [
          {
            title: "模型仍是核心",
            text: "系统服务于过程机理模型，而不是假装 LLM 可以替代它。"
          },
          {
            title: "人仍然负责",
            text: "预报责任与发布审批始终留在业务团队手中。"
          },
          {
            title: "记录必须可查",
            text: "假设、修订与证据都要以可回看的形式留下来。"
          }
        ]
      },
      surfacesSection: {
        eyebrow: "工作界面",
        title: "界面围绕真实任务组织，而不是围绕 AI 功能名组织。",
        items: [
          {
            title: "情景工作区",
            text: "构建事件背景，整合降雨、流域状态、上游条件与类比历史。"
          },
          {
            title: "判断工作区",
            text: "记录先验、关注点、置信说明与修正假设。"
          },
          {
            title: "发布工作区",
            text: "形成公告草稿、修订说明与可审批的发布包。"
          }
        ]
      },
      capabilitiesSection: {
        eyebrow: "交付方式",
        title: "所有能力都围绕真实业务动作打包，而不是围绕 AI 标签堆砌。",
        text:
          "平台通过减少流程碎片化、增强记录能力来建立团队信任。",
        items: [
          "情景准备与上下文整理",
          "先验判断模板化沉淀",
          "模型复核与修正可追溯",
          "滚动预报多版本比较",
          "公告撰写与审核打包",
          "事后复盘与训练回放"
        ]
      }
    },
    capabilities: {
      lead: {
        eyebrow: "能力目录",
        title: "查看 HydroAgent-Lab 目前能支持什么。",
        text:
          "这里整理当前可用的产品能力、工作流服务与合作方式。未来功能变多后，客户可以直接在这里按任务、阶段或需求查找。",
        facts: [
          { label: "范围", value: "产品、工作流系统、服务与研究合作" },
          { label: "用途", value: "按任务、阶段、产品或采用需求检索" },
          { label: "状态", value: "当前能力目录，可持续扩展" }
        ]
      },
      directoryEyebrow: "能力检索",
      directoryTitle: "按你需要支持的工作来查找。",
      searchLabel: "搜索能力",
      searchPlaceholder: "试试：预报审核、发布包、试点、复盘...",
      filterLabel: "能力分类",
      allLabel: "全部",
      emptyText: "暂时没有匹配能力。可以换一个关键词，或直接联系团队。",
      categories: [
        { id: "forecasting", label: "预报" },
        { id: "workflow", label: "工作流" },
        { id: "review", label: "审核" },
        { id: "adoption", label: "采用" },
        { id: "research", label: "研究" }
      ],
      items: [
        {
          category: "forecasting",
          categoryLabel: "预报",
          stage: "预报前",
          status: "可用",
          title: "情景准备",
          summary:
            "在解释开始前整理降雨、流域状态、上游背景、历史类比事件与本地业务约束。",
          tags: ["HydroAgent-FF", "降雨", "流域状态", "情景"]
        },
        {
          category: "workflow",
          categoryLabel: "工作流",
          stage: "预报前",
          status: "可用",
          title: "先验判断沉淀",
          summary:
            "把预报员的预期、阈值、关注点与假设转化为可复用的结构化材料。",
          tags: ["专家判断", "模板", "关注点", "假设"]
        },
        {
          category: "review",
          categoryLabel: "审核",
          stage: "更新中",
          status: "可用",
          title: "模型结果复核",
          summary:
            "复核模型偏差，显式呈现不确定性来源，记录修正假设，并保留证据链。",
          tags: ["模型审核", "不确定性", "修正", "诊断"]
        },
        {
          category: "forecasting",
          categoryLabel: "预报",
          stage: "更新中",
          status: "可用",
          title: "滚动预报版本比较",
          summary:
            "比较多轮更新之间的版本差异，让团队看到哪里变了、为什么变、还需要关注什么。",
          tags: ["滚动预报", "版本", "差异", "更新"]
        },
        {
          category: "review",
          categoryLabel: "审核",
          stage: "发布关口",
          status: "可用",
          title: "发布包整理",
          summary:
            "整理公告文本、置信说明、未解决关注点与审批上下文，交给最终人工发布。",
          tags: ["公告", "审批", "交接", "发布"]
        },
        {
          category: "workflow",
          categoryLabel: "工作流",
          stage: "事件后",
          status: "可用",
          title: "事后回放复盘",
          summary:
            "保留情景背景、决策、修订与发布材料，用于训练、复核与机构知识沉淀。",
          tags: ["回放", "训练", "审计", "复盘"]
        },
        {
          category: "adoption",
          categoryLabel: "采用",
          stage: "试点",
          status: "可用",
          title: "业务试点设计",
          summary:
            "围绕真实业务流程定义试点范围、审核关口、成功标准与集成约束。",
          tags: ["试点", "部署", "集成", "评估"]
        },
        {
          category: "adoption",
          categoryLabel: "采用",
          stage: "简报",
          status: "可用",
          title: "技术简报",
          summary:
            "通过产品走查、系统框架、场景匹配与采用讨论，支持机构内部对齐。",
          tags: ["简报", "利益相关方", "产品走查", "匹配"]
        },
        {
          category: "research",
          categoryLabel: "研究",
          stage: "合作",
          status: "可用",
          title: "研究合作",
          summary:
            "围绕水文工作流智能、判断形式化、可回放性与业务评价设计研究合作。",
          tags: ["研究", "评价", "判断", "工作流智能"]
        }
      ]
    },
    workflow: {
      lead: {
        eyebrow: "工作流",
        title: "五个步骤，一条责任链，最终清楚交给人工发布。",
        text:
          "这个流程在业务压力下把判断变得更显性、更稳，同时保留分析师在审核与发布中的角色。",
        facts: [
          { label: "覆盖范围", value: "从情景构建到发布关口" },
          { label: "运行方式", value: "滚动预报与可追溯更新" },
          { label: "最终责任", value: "人工发布决策" }
        ]
      },
      stepsSection: {
        eyebrow: "操作链路",
        title: "每一步都有清楚的目的、责任方与输出物。",
        text:
          "从情景构建到最终发布，每个阶段都服务于可重复执行的预报业务流程。",
        items: [
          {
            id: "01",
            name: "情景准备",
            summary: "在解释模型之前，先整合降雨、流域状态、类比事件与数据质量检查。",
            owner: "分析师 + 系统",
            output: "情景简报"
          },
          {
            id: "02",
            name: "先验判断",
            summary: "把预报员隐性的经验变成显性的假设、关注点与初始判断。",
            owner: "分析师",
            output: "判断包"
          },
          {
            id: "03",
            name: "过程修正",
            summary: "审视模型偏差，记录修正假设，并保留背后的证据链。",
            owner: "分析师 + 模型复核",
            output: "修正记录"
          },
          {
            id: "04",
            name: "滚动预报",
            summary: "在连续更新中保留版本差异、原因解释与业务影响。",
            owner: "系统 + 分析师",
            output: "版本化预报集"
          },
          {
            id: "05",
            name: "发布关口",
            summary: "把风险表达、公告文本与审批背景打包，交给最终发布人确认。",
            owner: "主值班预报员",
            output: "正式发布公告"
          }
        ]
      },
      artifactsSection: {
        eyebrow: "阶段产物",
        title: "这个流程之所以有价值，是因为每一步都会留下可复用的业务工件。",
        items: [
          {
            title: "更新前",
            text: "情景简报、输入检查、流域背景与类比参考。"
          },
          {
            title: "修订中",
            text: "修正日志、版本差异、关注点与证据说明。"
          },
          {
            title: "发布时",
            text: "公告文本、审批背景与事后复盘记录。"
          }
        ]
      },
      handoffSection: {
        eyebrow: "关键交接",
        title: "发布关口必须显式存在，因为最终责任必须显式存在。",
        text:
          "HydroAgent-Lab 帮助团队准备发布决策，但不会抹掉最后的人类审核节点。",
        points: [
          "发布表达与其预报背景始终并排可见。",
          "审批人可以同时看到修订历史、置信说明与未解决关注点。",
          "最终发布内容始终连接到它背后的判断与证据。"
        ]
      }
    },
    research: {
      lead: {
        eyebrow: "研究",
        title: "研究计划本身也不应只围绕一个产品界面展开。",
        text:
          "HydroAgent-Lab 把产品、业务工作流与水文研究组织成一个相互强化的共同计划。",
        facts: [
          { label: "研究重点", value: "水文业务流程中的工作流智能" },
          { label: "核心贡献", value: "判断形式化与可回放能力" },
          { label: "验证方向", value: "流程清晰度、可用性与审核价值" }
        ]
      },
      thesisSection: {
        eyebrow: "核心命题",
        title: "HydroAgent-Lab 把洪水预报视为一个机构化工作流，而不只是一个建模问题。",
        claims: [
          "隐性的预报经验可以被外化为结构化工件。",
          "可复盘与可审核应当是系统设计的一部分，而不是事后补充。",
          "在保留人工发布权的前提下，工作流依然可以更清晰、更可扩展。"
        ]
      },
      themesSection: {
        eyebrow: "研究方向",
        title: "三个研究角度足以把整项工作讲清楚。",
        text:
          "这些研究方向共同定义了贡献点、方法路径与验证方式。",
        items: [
          {
            title: "判断形式化",
            text: "研究如何把先验、关注点与修正逻辑变成可复用的推理记录。"
          },
          {
            title: "业务协同",
            text: "研究如何把模型、分析师与机构审核组织进同一条可执行链路。"
          },
          {
            title: "回放与学习",
            text: "研究如何让已发布的预报可被事后检查、训练与沉淀。"
          }
        ]
      },
      evaluationSection: {
        eyebrow: "验证思路",
        title: "验证不应只看精度，也要看流程是否更清晰、更可用。",
        items: [
          {
            title: "流程清晰度",
            text: "系统是否让假设、修订与发布理由更显性。"
          },
          {
            title: "业务可用性",
            text: "在多轮滚动更新中，系统是否减少了流程碎片化。"
          },
          {
            title: "复盘价值",
            text: "团队是否能够重建当时发生了什么、为什么改、最终发了什么。"
          }
        ]
      },
      narrativeSection: {
        eyebrow: "叙事方式",
        title: "如果只把它讲成校准 Agent，这项工作会被明显低估。",
        text:
          "它真正的重心在于把情景构建、专家先验、修正逻辑、滚动更新与发布准备组织成一条清晰的预报工作流。"
      }
    },
    team: {
      lead: {
        eyebrow: "团队",
        title: "一个专注于水务智能产品的精干团队。",
        text:
          "HydroAgent-Lab 将水文建模、业务工作流设计、AI 产品工程与研究转化组织在同一个方向上。",
        facts: [
          { label: "工作方式", value: "产品、研究与试点交付并行" },
          { label: "核心能力", value: "水文、AI 系统与业务流程" },
          { label: "协作模式", value: "精干团队与领域伙伴共同推进" }
        ]
      },
      operatingSection: {
        eyebrow: "工作方式",
        title: "团队围绕决策组织，而不是围绕孤立技术职能组织。",
        text:
          "每条工作线都把领域问题连接到产品界面、审核流程与可落地的试点路径。",
        items: [
          {
            title: "水文智能",
            text: "关注模型行为、流域背景、预报不确定性与业务解释。"
          },
          {
            title: "AI 产品系统",
            text: "构建智能体界面、流程自动化、审核界面与决策支持能力。"
          },
          {
            title: "业务转化",
            text: "支持试点设计、相关方沟通、发布纪律与机构采用。"
          }
        ]
      },
      principlesSection: {
        eyebrow: "团队原则",
        title: "团队可以精干，但责任、标准和交付必须清楚。",
        items: [
          {
            title: "产品先于演示",
            text: "优先建设能被评估、被运行、被持续改进的真实系统。"
          },
          {
            title: "领域判断保持可见",
            text: "水文专家判断是系统的一部分，而不是界面之外的补充说明。"
          },
          {
            title: "重视合作场景",
            text: "最有价值的工作来自真实流域、真实流程与真实业务约束。"
          }
        ]
      }
    },
    contact: {
      lead: {
        eyebrow: "联系",
        title: "面向产品咨询、服务合作与研究协作的清楚入口。",
        text:
          "你可以通过这个页面发起商业、业务或研究相关的正式沟通。",
        facts: [
          { label: "适合场景", value: "试点、合作与机构简报" },
          { label: "响应周期", value: "通常 3 个工作日内" },
          { label: "联系方式", value: "先邮件沟通，再进入定向跟进" }
        ]
      },
      primarySection: {
        eyebrow: "主要联系渠道",
        title: "用一个清楚的入口承接严肃对话。",
        summary:
          "建议在首封邮件里简单说明团队背景、使用场景，以及希望讨论的是研究、部署还是机构合作。",
        emailLabel: "邮箱",
        email: "contact@hydroagent-lab.org",
        responseLabel: "响应周期",
        response: "通常 3 个工作日内",
        formatLabel: "适合场景",
        format: "试点咨询、研究合作、机构简报"
      },
      inquirySection: {
        eyebrow: "联系原因",
        title: "最常见的三类对话场景。",
        items: [
          {
            title: "研究合作",
            text: "围绕工作流智能、判断形式化、验证设计或联合论文展开沟通。"
          },
          {
            title: "业务试点",
            text: "讨论平台如何支持滚动预报、审核节点与发布打包。"
          },
          {
            title: "机构简报",
            text: "向更广泛的相关方介绍定位、流程与产品方向。"
          }
        ]
      },
      stepsSection: {
        eyebrow: "沟通路径",
        title: "三步即可把对话快速推进到下一阶段。",
        items: [
          {
            id: "01",
            title: "发送背景",
            text: "说明你的团队、流域、当前流程，以及希望展开的对话类型。"
          },
          {
            id: "02",
            title: "确认匹配度",
            text: "我们会判断更适合做简报、试点讨论还是研究交流。"
          },
          {
            id: "03",
            title: "安排下一步",
            text: "进入一次聚焦沟通、定向跟进，或文档交换。"
          }
        ]
      },
      callout: {
        title: "最快的方式，是在第一封消息里写清业务背景。",
        text:
          "只要补充区域、流程成熟度与希望合作的类型，通常就足够开始。"
      }
    }
  }
};

export function getSiteContent(lang = "en") {
  return siteContent[lang] || siteContent.en;
}

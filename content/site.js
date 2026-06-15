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

const hydroAgentTeamMembers = [
  {
    name: "Baoying Shan",
    initials: "BS",
    affiliation: "Department of Civil and Environmental Engineering (D.I.C.A.), Politecnico di Milano, Milan, Italy",
    email: "baoying.shan@polimi.it",
    focus: "Flood forecasting agents, hydrologic workflow intelligence, and applied LLM evaluation"
  },
  {
    name: "Qingyi Yang",
    initials: "QY",
    affiliation: "Department of Civil and Environmental Engineering (D.I.C.A.), Politecnico di Milano, Milan, Italy",
    email: "qingyi.yang@polimi.it",
    focus: "Hydrologic AI, forecasting workflows, and research translation"
  },
  {
    name: "Xu Shan",
    initials: "XS",
    affiliation: "Max Planck Institute for Biogeochemistry, Jena, Germany",
    email: "xshan@bgc-jena.mpg.de",
    focus: "Hydro-climate intelligence, environmental systems, and model evaluation"
  },
  {
    name: "Xiaoyi Dong",
    initials: "XD",
    affiliation: "China IPPR International Engineering Co., Ltd., SINOMACH, Beijing, China",
    email: "dxiaoyi18@gmail.com",
    focus: "Engineering applications, water infrastructure context, and operational product translation"
  },
  {
    name: "Shunan Zhou",
    initials: "SZ",
    affiliation:
      "School of Hydraulic Engineering, Dalian University of Technology, Dalian, China; Institute of Photogrammetry and Remote Sensing, TU Dresden University of Technology, Dresden, Germany",
    email: "j.david.anan@gmail.com",
    focus: "Hydraulic engineering, remote sensing, and flood forecasting workflows"
  },
  {
    name: "Xun Zhang",
    initials: "XZ",
    affiliation: "College of Civil Engineering, Tongji University, Shanghai, China",
    email: "2232324@tongji.edu.cn",
    focus: "Civil engineering, flood forecasting workflows, and applied hydrologic systems"
  },
  {
    name: "Siqian Qiu",
    initials: "SQ",
    affiliation: "College of Hydraulic and Environmental Engineering, China Three Gorges University, Yichang, China",
    email: "siqian@ctgu.edu.cn",
    focus: "Hydraulic and environmental engineering, operational hydrology, and workflow evaluation"
  },
  {
    name: "Nuo Lei",
    initials: "NL",
    affiliation: "College of Civil Engineering, Tongji University, Shanghai, China",
    email: "leinuo@tongji.edu.cn",
    focus: "Civil engineering, hydrologic applications, and AI-assisted workflow design"
  },
  {
    name: "Yongkang Xu",
    initials: "YX",
    affiliation: "College of Water Sciences, Beijing Normal University, Beijing, China",
    email: "hydrokang@mail.bnu.edu.cn",
    focus: "Water sciences, flood forecasting, and hydrologic AI evaluation"
  },
  {
    name: "Haiyang Qian",
    initials: "HQ",
    affiliation:
      "Zhejiang Institute of Hydraulics and Estuary, Hangzhou, China; Hydro-Climate Extremes Lab (H-CEL), Ghent University, Ghent, Belgium",
    email: "Haiyang.Qian@ugent.be",
    focus: "Hydro-climate extremes, estuary and hydraulics research, and forecasting intelligence"
  },
  {
    name: "Xudong Zhou",
    initials: "XZ",
    affiliation: "School of Civil & Environmental Engineering and Geography Science, Ningbo University, Ningbo, China",
    email: "zhouxudong@nbu.edu.cn",
    focus: "Civil and environmental engineering, geography science, and hydrologic systems"
  },
  {
    name: "Jia Feng",
    initials: "JF",
    affiliation: "Qinhuangdao Hydrological Survey and Research Center of Hebei Province, Qinhuangdao, China",
    email: "736251778@qq.com",
    focus: "Frontline hydrologic practice, forecasting operations, and local workflow translation"
  },
  {
    name: "Haiqing Pu",
    initials: "HP",
    affiliation: "Qinhuangdao Hydrological Survey and Research Center of Hebei Province, Qinhuangdao, China",
    email: "409872917@qq.com",
    focus: "Frontline hydrologic practice, operational review, and forecasting workflow needs"
  },
  {
    name: "Carlo De Michele",
    initials: "CDM",
    affiliation: "Department of Civil and Environmental Engineering (D.I.C.A.), Politecnico di Milano, Milan, Italy",
    email: "carlo.demichele@polimi.it",
    focus: "Civil and environmental engineering, hydrologic science, and research mentorship"
  },
  {
    name: "Joseph Lee",
    initials: "JL",
    affiliation: "HydroAgent-Lab",
    email: "",
    linkedin: "https://www.linkedin.com/in/joseph-lee-645575408/",
    focus: "HydroAgent-Lab coordination, AI product direction, and hydrologic workflow systems"
  }
];

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
        { path: "/careers", label: "Join Us" },
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
      thinkingSection: {
        eyebrow: "How HydroAgent Thinks",
        title: ["Workflow first. Models trusted.", "Prompts subordinate. Explanations visible."],
        text:
          "HydroAgent is organized around how flood forecasting work actually happens. The agent does not replace hydrologic models or expert authority. It coordinates context, tools, prompts, and explanations around a structured operating workflow.",
        items: [
          {
            title: "Workflow before model",
            text: "Forecasting starts from operational context: event state, basin behavior, update cycle, and release responsibility."
          },
          {
            title: "Model as evidence",
            text: "Hydrologic models remain the scientific evidence base. The agent helps review, compare, and explain their outputs."
          },
          {
            title: "Skill before prompt",
            text: "Validated tools and repeatable workflow skills are called directly. Prompts guide coordination, not scientific computation."
          },
          {
            title: "Explainability before accuracy claims",
            text: "Every recommendation should carry the reasoning, assumptions, uncertainty, and unresolved watchpoints behind it."
          }
        ]
      },
      humanSection: {
        eyebrow: "Human-Centered AI",
        title: "Built to reason alongside hydrologists, not replace the models they trust.",
        text:
          "HydroAgent-Lab treats the agent as an operating layer for human judgment. It reads context, organizes evidence, keeps revision history visible, and prepares review-ready decisions for the people who remain accountable."
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
        title: "From research prototype to flood forecasting frontline.",
        text:
          "HydroAgent-Lab studies whether LLM-based agents can support real hydrologic forecasting workflows, using flood forecasting as the first operational test case.",
        facts: [
          { label: "EGU 2026", value: "Session HS3.5 oral presentation" },
          { label: "Case", value: "South Yamhill River, March 2022" },
          { label: "Status", value: "Presentation deck available; manuscript under submission" }
        ]
      },
      presentationSection: {
        eyebrow: "EGU General Assembly 2026",
        title: "Is it ready to apply Large Language Models to frontline hydro practice?",
        text:
          "Taking the flood forecasting agent as an example, this presentation frames HydroAgent as a skill-driven, human-in-the-loop workflow rather than a chatbot or single-step tool caller.",
        details: [
          { label: "Presenter", value: "Baoying Shan · Politecnico di Milano, on behalf of HydroAgent Lab" },
          { label: "Session", value: "HS3.5 · Oral · Tue 05 May · 11:00-11:10 CEST · Room C" },
          { label: "Deck", value: "EGU26_pre_v1.pdf" }
        ],
        cta: "Download presentation deck",
        href: "/assets/EGU26_pre_v1.pdf"
      },
      resultsSection: {
        eyebrow: "Evidence From the Deck",
        title: "The current evidence is specific enough to discuss, and still early enough to test with partners.",
        items: [
          {
            label: "01",
            title: "End-to-end flood case",
            text: "The demonstration uses the March 2022 South Yamhill River event with XAJ, DDS optimization, and a staged HydroAgent workflow from scenario judgment to bulletin."
          },
          {
            label: "02",
            title: "14 validation events",
            text: "Step 1 narrows similar-case spread; hit rates within 5% tolerance reach 10/14 for peak flow and 11/14 for flood volume."
          },
          {
            label: "03",
            title: "Scheme selection",
            text: "After selecting parameter sets from the Step 0 library, simulated peak falls inside the Step 1 range for 14/14 events and volume for 13/14."
          },
          {
            label: "04",
            title: "5-fold × 5 LLM comparison",
            text: "No single SOTA LLM dominates. Hit rates stay in a 60-85% band, while cost varies substantially across models."
          }
        ]
      },
      takeawaysSection: {
        eyebrow: "Take-home",
        title: "Three things worth remembering.",
        items: [
          "LLMs are not here to replace hydrological models; they scale expert judgment around those models.",
          "The key is not only prompting. Structured skills make agents reliable, auditable, and reproducible.",
          "It is not fully ready yet, but it is ready enough to be worth building together."
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
        eyebrow: "About HydroAgent-Lab",
        title: "The people behind HydroAgent-Lab.",
        text:
          "Before diving into the product, it matters to know who is building it. HydroAgent-Lab brings together young developers, master's and PhD students, frontline hydrologists, junior AI researchers, and senior research mentors across Italy, Germany, the United States, and China.",
        facts: [
          { label: "Team size", value: "Around 20 to 30 contributors" },
          { label: "Geography", value: "Italy, Germany, the US, and China" },
          { label: "Support", value: "Interest-driven effort with no funding support" }
        ]
      },
      missionSection: {
        eyebrow: "About Us",
        title: "An interest-driven lab for frontline hydro practice.",
        text:
          "HydroAgent-Lab is not a conventional funded project. It is a collaborative effort by people who care about whether AI can actually help hydrologists in real forecasting work. Some members are joining from universities, some from engineering and hydrological practice, and some from AI product development.",
        navItems: [
          { label: "Members", href: "#members" },
          { label: "Workstreams", href: "#workstreams" },
          { label: "Signals", href: "#signals" }
        ]
      },
      peopleSection: {
        eyebrow: "Team Members",
        title: "HydroAgent Lab",
        text:
          "The list below includes named contributors currently associated with the HydroAgent-Lab effort. Member order is not hierarchical.",
        disciplineLine: "Frontline hydrologists · AI specialists · Early-career researchers · Scientific software developers",
        countryLine: "Italy · Germany · United States · China",
        supportBadge: "Community-driven · Volunteer-led · Seeking funding support",
        emailLabel: "Email",
        focusLabel: "Focus",
        affiliationLabel: "Affiliation",
        linksLabel: "Public links",
        pendingLinksLabel: "Scholar / LinkedIn pending",
        members: hydroAgentTeamMembers
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
      workstreamsSection: {
        eyebrow: "Team Structure",
        title: "Instead of a large hierarchy, we organize around the work that must be accountable.",
        text:
          "For an early technical company, credibility comes from clear ownership: who understands the domain, who builds the system, who protects the workflow, and who turns collaboration into adoption.",
        items: [
          {
            label: "Domain",
            title: "Hydrologic science and forecasting judgment",
            text:
              "Frames basin behavior, model evidence, event context, uncertainty, and the expert reasoning that should remain visible in every workflow."
          },
          {
            label: "Product",
            title: "AI product and agentic workflow engineering",
            text:
              "Builds the operating surfaces, agent orchestration, review interfaces, and capability directory that make HydroAgent usable beyond a demo."
          },
          {
            label: "Delivery",
            title: "Pilots, institutional fit, and operational translation",
            text:
              "Shapes pilots, briefings, stakeholder alignment, release discipline, and the path from research prototype to deployable system."
          },
          {
            label: "Research",
            title: "Evaluation, replayability, and research collaboration",
            text:
              "Turns real workflows into reviewable evidence, evaluation questions, reusable artifacts, and publishable research directions."
          }
        ]
      },
      signalsSection: {
        eyebrow: "Signals and Figures",
        title: "What partners should understand about the team today.",
        text:
          "We avoid inflated company metrics. The useful signals at this stage are focus, accountability, and whether the team can connect scientific credibility with operational product work.",
        items: [
          {
            label: "01",
            value: "Product plus research",
            text: "HydroAgent-Lab is designed to support both deployable product work and research-grade evaluation."
          },
          {
            label: "02",
            value: "Human release authority",
            text: "The system is built around reviewable decisions, not automated replacement of forecasters."
          },
          {
            label: "03",
            value: "Workflow-first design",
            text: "Capabilities are organized by operational tasks: scenario preparation, model review, release packaging, and replay."
          },
          {
            label: "04",
            value: "Partner-led adoption",
            text: "The strongest deployments will come from teams that bring local basins, release practices, and evaluation needs."
          }
        ]
      },
      prioritiesSection: {
        eyebrow: "Current Priorities",
        title: "What we are building toward next.",
        items: [
          {
            phase: "Now",
            title: "HydroAgent-FF and flood forecasting workflows",
            text:
              "Continue shaping the flagship flood product around scenario setup, rolling updates, model review, and release readiness."
          },
          {
            phase: "Next",
            title: "Capability directory and product modules",
            text:
              "Expand the public capability map so partners can quickly understand what is available and what is emerging."
          },
          {
            phase: "With partners",
            title: "Pilots, validation, and research translation",
            text:
              "Work with domain teams to evaluate fit, preserve expert judgment, and produce evidence that supports adoption."
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
    careers: {
      hero: {
        eyebrow: "Join HydroAgent-Lab",
        title: "Build water intelligence with people who know the front line.",
        text:
          "HydroAgent-Lab is an interest-driven team for people who want AI to help real hydrologic practice. We welcome contributors who can connect science, software, product judgment, and operational responsibility.",
        cta: "Start a conversation",
        ctaPath: "/contact"
      },
      missionSection: {
        title: "We are not hiring for headcount. We are looking for builders who can carry real work.",
        text:
          "This is currently a community-driven, volunteer-led effort with no funding support. The right fit is someone who wants to build useful hydrologic AI systems, produce credible evidence, and learn through serious collaboration rather than only collect a title."
      },
      statementSection: {
        title: "The work is close to the problem.",
        paragraphs: [
          {
            title: "Not generic AI demos",
            text: "We work on forecasting workflows, model review, scenario preparation, release packaging, and replayable evidence."
          },
          {
            title: "Not isolated academic slogans",
            text: "Research only matters when it clarifies what a forecaster, agency, or partner can trust in an operational setting."
          },
          {
            title: "Not a replacement story",
            text: "HydroAgent is designed around human authority, visible reasoning, and expert accountability."
          }
        ]
      },
      valuesSection: {
        title: "People who tend to thrive here.",
        left: [
          "You are comfortable with ambiguity and can turn a rough domain problem into a concrete artifact.",
          "You care about evidence, not just presentation.",
          "You can explain your work clearly to people outside your own specialty."
        ],
        right: [
          "You respect hydrologic expertise and real operational constraints.",
          "You are willing to build, test, revise, and document.",
          "You prefer direct collaboration over inflated titles."
        ]
      },
      tracksSection: {
        eyebrow: "Open Collaboration Tracks",
        title: "Several kinds of contributors can make the lab stronger.",
        items: [
          {
            title: "Hydrology and forecasting practice",
            text: "Bring basin knowledge, model review experience, warning-release workflows, or frontline operational questions."
          },
          {
            title: "AI agents and software engineering",
            text: "Build interfaces, orchestration, evaluation tooling, capability modules, and reliable deployment paths."
          },
          {
            title: "Research and evaluation",
            text: "Help turn workflows into research questions, validation protocols, datasets, figures, and publishable evidence."
          },
          {
            title: "Product and design translation",
            text: "Shape demos, documentation, product narratives, user research, and partner-facing workflow materials."
          }
        ]
      },
      processSection: {
        eyebrow: "How to Join",
        title: "Start with a focused note, not a formal application.",
        steps: [
          {
            label: "01",
            title: "Introduce your background",
            text: "Tell us where you work or study, what you know, and what you want to contribute."
          },
          {
            label: "02",
            title: "Choose a concrete thread",
            text: "Point to a product module, research question, workflow problem, or demo artifact you want to help with."
          },
          {
            label: "03",
            title: "Work in a small loop",
            text: "We start with a scoped task or conversation, then decide whether deeper collaboration makes sense."
          }
        ]
      },
      ctaSection: {
        title: "Interested in building with us?",
        text:
          "Send a short email with your background, preferred contribution track, and one concrete idea you would like to explore.",
        button: "Contact the team",
        href: "/contact"
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
        { path: "/careers", label: "加入我们" },
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
      thinkingSection: {
        eyebrow: "HydroAgent 如何思考",
        title: ["工作流优先，模型可信，", "提示词从属，解释可见。"],
        text:
          "HydroAgent 围绕洪水预报真实业务来组织。它不替代水文模型，也不替代专家责任，而是把情境、工具、提示词与解释放进结构化工作流中协同运行。",
        items: [
          {
            title: "工作流先于模型",
            text: "预报从业务情境开始：事件状态、流域行为、更新节奏与发布责任。"
          },
          {
            title: "模型作为证据",
            text: "水文模型仍然是科学证据基础。智能体帮助复核、比较并解释模型输出。"
          },
          {
            title: "技能先于提示词",
            text: "经过验证的工具和可复用流程能力应被直接调用。提示词负责协调，而不是替代科学计算。"
          },
          {
            title: "解释先于准确率口号",
            text: "每个建议都应该带着推理过程、假设、不确定性与未解决关注点。"
          }
        ]
      },
      humanSection: {
        eyebrow: "以人为中心的 AI",
        title: "与水文学家一起推理，而不是替代他们信任的模型。",
        text:
          "HydroAgent-Lab 把智能体视为人类判断的操作层。它读取情境、组织证据、保留修订历史，并为最终负责的人准备可审核的业务决策。"
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
        title: "从研究原型走向洪水预报一线。",
        text:
          "HydroAgent-Lab 研究基于大语言模型的智能体是否能够支持真实水文预报流程，并以洪水预报作为第一个业务测试场景。",
        facts: [
          { label: "EGU 2026", value: "HS3.5 口头报告" },
          { label: "案例", value: "South Yamhill River，2022 年 3 月" },
          { label: "状态", value: "汇报 PDF 已提供；manuscript under submission" }
        ]
      },
      presentationSection: {
        eyebrow: "EGU General Assembly 2026",
        title: "Is it ready to apply Large Language Models to frontline hydro practice?",
        text:
          "以洪水预报智能体为例，这个报告把 HydroAgent 定位为 skill-driven、human-in-the-loop 的工作流系统，而不是聊天机器人或单步工具调用。",
        details: [
          { label: "汇报人", value: "Baoying Shan · Politecnico di Milano，代表 HydroAgent Lab" },
          { label: "场次", value: "HS3.5 · Oral · Tue 05 May · 11:00-11:10 CEST · Room C" },
          { label: "文件", value: "EGU26_pre_v1.pdf" }
        ],
        cta: "下载汇报 PDF",
        href: "/assets/EGU26_pre_v1.pdf"
      },
      resultsSection: {
        eyebrow: "汇报中的具体证据",
        title: "当前结果已经具体到可以讨论，也仍然早到需要真实伙伴共同测试。",
        items: [
          {
            label: "01",
            title: "端到端洪水案例",
            text: "演示使用 2022 年 3 月 South Yamhill River 事件，结合 XAJ、水文模型、DDS 优化与从情景判断到公告发布的分阶段 HydroAgent 工作流。"
          },
          {
            label: "02",
            title: "14 个验证事件",
            text: "Step 1 缩窄相似洪水样本的范围；在 5% 容差内，峰值流量命中 10/14，洪量命中 11/14。"
          },
          {
            label: "03",
            title: "方案选择",
            text: "从 Step 0 方案库选择参数集后，模拟峰值落入 Step 1 范围的事件为 14/14，洪量为 13/14。"
          },
          {
            label: "04",
            title: "5 折 × 5 个 LLM 对比",
            text: "没有单一 SOTA LLM 明显胜出。命中率大致处于 60-85% 区间，但不同模型的成本差异很大。"
          }
        ]
      },
      takeawaysSection: {
        eyebrow: "Take-home",
        title: "三个最值得记住的结论。",
        items: [
          "LLM 不是用来替代水文模型，而是围绕模型扩展专家判断。",
          "关键不只是提示词。结构化 skills 才能让 agent 更可靠、可审核、可复现。",
          "它还没有完全 ready，但已经足够值得和真实业务伙伴一起继续建设。"
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
        eyebrow: "关于 HydroAgent-Lab",
        title: "先认识 HydroAgent-Lab 背后的团队。",
        text:
          "在介绍产品之前，更重要的是让访问者知道是谁在做这件事。HydroAgent-Lab 由来自意大利、德国、美国和中国的青年开发者、硕博学生、一线水文工作者、青年 AI 研究者与研究导师共同组成。",
        facts: [
          { label: "团队规模", value: "约 20 到 30 位贡献者" },
          { label: "地域分布", value: "意大利、德国、美国与中国" },
          { label: "支持方式", value: "兴趣驱动，目前无经费支持" }
        ]
      },
      missionSection: {
        eyebrow: "关于我们",
        title: "一个面向一线水文实践的兴趣驱动实验室。",
        text:
          "HydroAgent-Lab 不是一个传统经费项目，而是一群真正关心 AI 是否能进入一线水文业务的人共同推动的协作。成员来自高校、工程与水文业务一线，也包括 AI 产品和智能体系统方向的年轻开发者。",
        navItems: [
          { label: "团队成员", href: "#members" },
          { label: "工作线", href: "#workstreams" },
          { label: "可信信号", href: "#signals" }
        ]
      },
      peopleSection: {
        eyebrow: "团队成员",
        title: "HydroAgent Lab",
        text:
          "以下为当前参与 HydroAgent-Lab 工作的已列名成员。排名不分先后。",
        disciplineLine: "一线水文工作者 · AI 专家 · 青年研究者 · 科学软件开发者",
        countryLine: "意大利 · 德国 · 美国 · 中国",
        supportBadge: "社区驱动 · 志愿协作 · 正在寻求经费支持",
        emailLabel: "邮箱",
        focusLabel: "方向",
        affiliationLabel: "机构",
        linksLabel: "公开链接",
        pendingLinksLabel: "Scholar / LinkedIn 待补充",
        members: hydroAgentTeamMembers
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
      workstreamsSection: {
        eyebrow: "团队结构",
        title: "相比复杂层级，我们更关注哪些工作必须有人负责。",
        text:
          "对于早期技术公司，可信度来自清楚的责任：谁理解领域，谁建设系统，谁保护业务流程，谁把合作转化为采用。",
        items: [
          {
            label: "领域",
            title: "水文科学与预报判断",
            text:
              "负责流域行为、模型证据、事件情境、不确定性，以及每个工作流中应当保持可见的专家推理。"
          },
          {
            label: "产品",
            title: "AI 产品与智能体工作流工程",
            text:
              "建设操作界面、智能体编排、审核界面与能力目录，让 HydroAgent 不停留在演示层面。"
          },
          {
            label: "交付",
            title: "试点、机构匹配与业务转化",
            text:
              "设计试点、技术简报、相关方对齐、发布纪律，以及从研究原型走向可部署系统的路径。"
          },
          {
            label: "研究",
            title: "评价、回放能力与研究合作",
            text:
              "把真实工作流转化为可审核证据、评价问题、可复用材料与可发表的研究方向。"
          }
        ]
      },
      signalsSection: {
        eyebrow: "可信信号",
        title: "合作伙伴现在应该理解团队的哪些特点。",
        text:
          "我们不堆砌夸大的公司数字。当前阶段真正有用的信号，是专注度、责任边界，以及能否把科学可信度和业务产品连接起来。",
        items: [
          {
            label: "01",
            value: "产品与研究并行",
            text: "HydroAgent-Lab 同时面向可部署产品与研究级评价。"
          },
          {
            label: "02",
            value: "人工发布责任保留",
            text: "系统围绕可审核决策构建，而不是自动替代预报员。"
          },
          {
            label: "03",
            value: "工作流优先",
            text: "能力围绕真实任务组织：情景准备、模型复核、发布打包与事后回放。"
          },
          {
            label: "04",
            value: "伙伴驱动采用",
            text: "最有价值的部署来自带来本地流域、发布流程与评价需求的合作团队。"
          }
        ]
      },
      prioritiesSection: {
        eyebrow: "当前重点",
        title: "我们下一步重点建设什么。",
        items: [
          {
            phase: "现在",
            title: "HydroAgent-FF 与洪水预报工作流",
            text:
              "继续围绕情景设置、滚动更新、模型复核与发布准备打磨旗舰洪水产品。"
          },
          {
            phase: "下一步",
            title: "能力目录与产品模块",
            text:
              "扩展公开能力图谱，让合作方快速了解目前可用能力和正在形成的模块。"
          },
          {
            phase: "与伙伴共建",
            title: "试点、验证与研究转化",
            text:
              "与领域团队一起评价适配度、保留专家判断，并形成支持采用的证据。"
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
    careers: {
      hero: {
        eyebrow: "加入 HydroAgent-Lab",
        title: "和真正理解一线问题的人一起建设水务智能。",
        text:
          "HydroAgent-Lab 是一个兴趣驱动的协作团队，面向希望让 AI 真正进入水文业务的人。我们欢迎能够连接科学、软件、产品判断与业务责任的贡献者。",
        cta: "开始沟通",
        ctaPath: "/contact"
      },
      missionSection: {
        title: "我们不是为了扩充人数而招人，而是在寻找能承担真实工作的建设者。",
        text:
          "当前 HydroAgent-Lab 仍是社区驱动、志愿协作、暂无经费支持的项目。更适合加入的人，是希望做出有用的水文 AI 系统、形成可信证据，并在严肃协作中持续学习的人。"
      },
      statementSection: {
        title: "这里的工作贴近真实问题。",
        paragraphs: [
          {
            title: "不是通用 AI 演示",
            text: "我们关注预报工作流、模型复核、情景准备、发布打包与可回放证据。"
          },
          {
            title: "不是空泛学术口号",
            text: "研究必须帮助预报员、机构或合作伙伴理解什么可以被信任，以及为什么可以被信任。"
          },
          {
            title: "不是替代专家的叙事",
            text: "HydroAgent 围绕人的发布权、可见推理和专家责任来设计。"
          }
        ]
      },
      valuesSection: {
        title: "适合这里的人通常有这些特质。",
        left: [
          "能在不确定问题里推进，把粗糙的领域问题变成具体产物。",
          "重视证据，而不仅仅是展示效果。",
          "能把自己的工作讲清楚，让不同背景的人理解。"
        ],
        right: [
          "尊重水文专业知识和真实业务约束。",
          "愿意构建、测试、修订和记录。",
          "更看重直接协作，而不是头衔包装。"
        ]
      },
      tracksSection: {
        eyebrow: "开放协作方向",
        title: "不同类型的贡献者都可以让这个团队更强。",
        items: [
          {
            title: "水文与预报业务",
            text: "带来流域知识、模型复核经验、预警发布流程或一线业务问题。"
          },
          {
            title: "AI 智能体与软件工程",
            text: "建设界面、编排、评估工具、能力模块和可靠部署路径。"
          },
          {
            title: "研究与评估",
            text: "把工作流转化为研究问题、验证协议、数据集、图件和可发表证据。"
          },
          {
            title: "产品与设计转译",
            text: "打磨演示、文档、产品叙事、用户研究和面向合作伙伴的工作流材料。"
          }
        ]
      },
      processSection: {
        eyebrow: "如何加入",
        title: "先发一封聚焦的邮件，而不是提交正式申请。",
        steps: [
          {
            label: "01",
            title: "介绍你的背景",
            text: "告诉我们你在哪里学习或工作、你了解什么、你希望贡献什么。"
          },
          {
            label: "02",
            title: "选择一个具体方向",
            text: "可以是一项产品模块、一个研究问题、一个工作流痛点或一个演示材料。"
          },
          {
            label: "03",
            title: "从小闭环开始",
            text: "我们会先从一个小任务或一次讨论开始，再判断是否进入更深入的协作。"
          }
        ]
      },
      ctaSection: {
        title: "想和我们一起建设吗？",
        text:
          "请发一封简短邮件，说明你的背景、希望参与的方向，以及一个你想探索的具体想法。",
        button: "联系团队",
        href: "/contact"
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

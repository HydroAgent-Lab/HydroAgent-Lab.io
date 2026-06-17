import { CtaBand } from "@/components/cta-band";
import { Hero } from "@/components/hero";
import { SiteShell } from "@/components/shell";
import { getSiteContent } from "@/content/site";

function ArchitectureWorld({ content }) {
  const platform = content.platform;
  const layers = platform.architectureSection.layers;

  return (
    <section className="architecture-world" id="architecture">
      <div className="architecture-sticky-header">
        <p className="architecture-label">HydroAgent Intelligence Architecture</p>
        <p className="architecture-world-line">{platform.architectureSection.title}</p>
      </div>

      <div className="architecture-scene">
        <div className="architecture-core" aria-hidden="true">
          <span className="core-ring ring-one" />
          <span className="core-ring ring-two" />
          <span className="core-ring ring-three" />
          <span className="core-center">H</span>
        </div>
        <div className="architecture-layer-list">
          {layers.map((layer, index) => (
            <article className="architecture-world-card" key={layer.title}>
              <span>{`0${index + 1}`}</span>
              <h3>{layer.title}</h3>
              <p>{layer.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FlipCard({ title, text }) {
  return (
    <article className="manifesto-card">
      <div className="manifesto-card-inner">
        <div className="manifesto-card-front">
          <h3>{title}</h3>
        </div>
        <div className="manifesto-card-back">
          <p>{text}</p>
        </div>
      </div>
    </article>
  );
}

function BrandManifesto({ lang }) {
  const copy =
    lang === "zh"
      ? {
          eyebrow: "核心能力",
          title: ["不是又一个水文工具，", "而是一套决策操作层。"],
          steps: [
            { title: "情景准备", text: "整合降雨、流域状态、历史相似场次和业务约束。" },
            { title: "专家判断显性化", text: "把预报员的先验判断、关注点和修正逻辑记录成可复用材料。" },
            { title: "模型复核与修正记录", text: "对模型输出进行复核，保留偏差原因、修正假设和证据链。" },
            { title: "滚动预报与版本比较", text: "在多轮更新中追踪变化、原因和影响。" },
            { title: "发布打包", text: "生成面向审核和发布的说明、公告草稿和交接材料。" },
            { title: "事后复盘", text: "保留流程记录，用于培训、评估和机构学习。" }
          ]
        }
      : {
          eyebrow: "What HydroAgent Does",
          title: ["Not another hydrology tool.", "An intelligence layer for water decisions."],
          steps: [
            { title: "Scenario preparation", text: "Bring together rainfall, basin state, historical analogs, and operational constraints." },
            { title: "Expert judgment capture", text: "Record forecasters' prior judgment, watchpoints, and correction logic as reusable material." },
            { title: "Model review", text: "Review model outputs and keep the drivers of mismatch, correction hypotheses, and evidence chain." },
            { title: "Rolling forecast and version comparison", text: "Track what changed, why, and what it affects across update cycles." },
            { title: "Release packaging", text: "Assemble review notes, bulletin drafts, and handoff materials for issuance." },
            { title: "Post-event replay", text: "Preserve the process record for training, evaluation, and institutional learning." }
          ]
        };

  return (
    <section className="brand-manifesto">
      <p className="eyebrow">{copy.eyebrow}</p>
      <h2 className="manifesto-title">
        {copy.title.map((line, i) => <span key={i} style={{ display: "block" }}>{line}</span>)}
      </h2>

      <div className="manifesto-row">
        {copy.steps.map((step) => (
          <FlipCard key={step.title} title={step.title} text={step.text} />
        ))}
      </div>
    </section>
  );
}

function AgentThinking({ content }) {
  const section = content.home.thinkingSection;
  const lines = Array.isArray(section.title) ? section.title : [section.title];

  return (
    <section className="agent-thinking">
      <div className="agent-thinking-head">
        <p className="eyebrow">{section.eyebrow}</p>
        <h2>{lines.map((line, i) => <span key={i} style={{ display: "block" }}>{line}</span>)}</h2>
        <p>{section.text}</p>
      </div>
      <div className="agent-thinking-steps">
        {section.items.map((item, index) => (
          <article className="agent-thinking-step" key={item.title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function HumanCenteredAgent({ content }) {
  const section = content.home.humanSection;

  return (
    <section className="human-agent">
      <div className="human-agent-copy">
        <p className="eyebrow">{section.eyebrow}</p>
        <h2>{section.title}</h2>
        <p>{section.text}</p>
      </div>
      <div className="hydrograph-panel" aria-hidden="true">
        <img src="/assets/hydroagent-mark.svg" alt="" />
        <svg viewBox="0 0 1200 300" preserveAspectRatio="none">
          <path d="M0,235 C150,230 230,225 320,215 C400,206 440,120 520,80 C580,52 640,55 700,120 C760,184 820,210 920,224 C1020,238 1120,239 1200,235" />
        </svg>
      </div>
    </section>
  );
}

function BusinessMap({ content, lang }) {
  const { highlightsSection } = content.home;
  const items = highlightsSection.items;
  const label = lang === "zh" ? "\u4ea7\u54c1\u7ebf" : "Product Lines";

  return (
    <section className="business-map" id="business">
      <div className="business-heading-line">
        <p className="eyebrow">{label}</p>
        <h2>{highlightsSection.title}</h2>
      </div>
      <div className="business-line-list">
        {items.map((item, index) => (
          <article className="business-line" key={`${item.title}-${index}`}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function splitFirstSentence(str) {
  const match = str.match(/^(.+?[。．.，])\s*(.*)/s);
  if (!match) return [str];
  return match[2] ? [match[1], match[2]] : [match[1]];
}

function ProofStatement({ lang }) {
  const copy =
    lang === "zh"
      ? {
          eyebrow: "\u539f\u5219",
          title: "\u7cfb\u7edf\u5904\u7406\u590d\u6742\u6027\uff0c\u7528\u6237\u638c\u63e1\u5224\u65ad\u94fe\u8def\u3002",
          points: ["\u6e05\u6670\u7684\u6001\u52bf", "\u53ef\u89e3\u91ca\u7684\u5224\u65ad", "\u53ef\u6267\u884c\u7684\u4e0b\u4e00\u6b65"]
        }
      : {
          eyebrow: "Principle",
          title: "Complexity stays inside the system. The decision chain stays clear to the user.",
          points: ["Clear situation awareness", "Explainable judgment", "Actionable next step"]
        };

  const lines = splitFirstSentence(copy.title);

  return (
    <section className="proof-statement">
      <p className="eyebrow">{copy.eyebrow}</p>
      <h2>{lines.map((line, i) => <span key={i} style={{ display: "block" }}>{line}</span>)}</h2>
      <div className="proof-line">
        {copy.points.map((point) => (
          <span key={point}>{point}</span>
        ))}
      </div>
    </section>
  );
}

export function HomePageContent({ lang = "en" }) {
  const content = getSiteContent(lang);

  return (
    <SiteShell lang={lang}>
      <main className="main-content">
        <Hero lang={lang} content={content} />
        <BrandManifesto lang={lang} />
        <AgentThinking content={content} />
        <HumanCenteredAgent content={content} />
        <ArchitectureWorld content={content} />
        <BusinessMap content={content} lang={lang} />
        <ProofStatement lang={lang} />
        <CtaBand lang={lang} content={content} />
      </main>
    </SiteShell>
  );
}

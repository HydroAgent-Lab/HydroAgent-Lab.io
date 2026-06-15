import { CtaBand } from "@/components/cta-band";
import { CapabilityDirectory } from "@/components/capability-directory";
import { Hero } from "@/components/hero";
import { PageLead } from "@/components/page-lead";
import { SectionHeader } from "@/components/section-header";
import { SiteShell } from "@/components/site-shell";
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

function BrandManifesto({ lang }) {
  const copy =
    lang === "zh"
      ? {
          eyebrow: "定位",
          title: ["不是又一个水文工具，", "而是一套决策操作层。"],
          text: ["HydroAgent-Lab 把模型、数据、专家判断与行动流程组织进同一个界面。", "用户看到的不是技术堆栈，而是一条更清晰的决策链。"]
        }
      : {
          eyebrow: "Positioning",
          title: ["Not another hydrology tool.", "An intelligence layer for water decisions."],
          text: ["HydroAgent-Lab brings models, data, expert judgment, and operational action into one interface.", "The user does not see a technology stack. They see a clearer decision chain."]
        };

  return (
    <section className="brand-manifesto">
      <p className="eyebrow">{copy.eyebrow}</p>
      <div className="manifesto-grid">
        <h2>{copy.title.map((line, i) => <span key={i} style={{ display: "block" }}>{line}</span>)}</h2>
        <p>{copy.text.map((line, i) => <span key={i} style={{ display: "block" }}>{line}</span>)}</p>
      </div>
    </section>
  );
}

function BusinessMap({ content, lang }) {
  const { highlightsSection } = content.home;
  const items = highlightsSection.items;
  const label = lang === "zh" ? "产品线" : "Product Lines";

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

function ProofStatement({ lang }) {
  const copy =
    lang === "zh"
      ? {
          eyebrow: "原则",
          title: "系统处理复杂性，用户掌握判断链路。",
          points: ["清晰的态势", "可解释的判断", "可执行的下一步"]
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

export function PlatformPageContent({ lang = "en" }) {
  const content = getSiteContent(lang);
  const page = content.platform;

  return (
    <SiteShell lang={lang}>
      <main className="main-content">
        <PageLead
          eyebrow={page.lead.eyebrow}
          title={page.lead.title}
          text={page.lead.text}
          facts={page.lead.facts}
        />

        <section className="content-section">
          <SectionHeader
            eyebrow={page.offeringsSection.eyebrow}
            title={page.offeringsSection.title}
          />
          <div className="three-up-grid">
            {page.offeringsSection.items.map((item) => (
              <article className="info-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section platform-architecture">
          <SectionHeader
            eyebrow={page.architectureSection.eyebrow}
            title={page.architectureSection.title}
            text={page.architectureSection.text}
          />
          <div className="architecture-stack">
            {page.architectureSection.layers.map((layer, index) => (
              <article key={layer.title} className="architecture-layer">
                <span>{`0${index + 1}`}</span>
                <div>
                  <h3>{layer.title}</h3>
                  <p>{layer.text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section">
          <SectionHeader
            eyebrow={page.principlesSection.eyebrow}
            title={page.principlesSection.title}
          />
          <div className="three-up-grid">
            {page.principlesSection.items.map((item) => (
              <article className="info-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section platform-surfaces">
          <SectionHeader
            eyebrow={page.surfacesSection.eyebrow}
            title={page.surfacesSection.title}
          />
          <div className="surface-grid">
            {page.surfacesSection.items.map((item) => (
              <article className="surface-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section">
          <SectionHeader
            eyebrow={page.capabilitiesSection.eyebrow}
            title={page.capabilitiesSection.title}
            text={page.capabilitiesSection.text}
          />
          <div className="capability-grid">
            {page.capabilitiesSection.items.map((item) => (
              <article className="capability-card" key={item}>
                <span className="capability-dot" />
                <p>{item}</p>
              </article>
            ))}
          </div>
        </section>

        <CtaBand lang={lang} content={content} />
      </main>
    </SiteShell>
  );
}

export function CapabilitiesPageContent({ lang = "en" }) {
  const content = getSiteContent(lang);
  const page = content.capabilities;

  return (
    <SiteShell lang={lang}>
      <main className="main-content">
        <PageLead
          eyebrow={page.lead.eyebrow}
          title={page.lead.title}
          text={page.lead.text}
          facts={page.lead.facts}
        />
        <CapabilityDirectory content={content} />
        <CtaBand lang={lang} content={content} />
      </main>
    </SiteShell>
  );
}

export function WorkflowPageContent({ lang = "en" }) {
  const content = getSiteContent(lang);
  const page = content.workflow;

  return (
    <SiteShell lang={lang}>
      <main className="main-content">
        <PageLead
          eyebrow={page.lead.eyebrow}
          title={page.lead.title}
          text={page.lead.text}
          facts={page.lead.facts}
        />

        <section className="content-section workflow-section">
          <SectionHeader
            eyebrow={page.stepsSection.eyebrow}
            title={page.stepsSection.title}
            text={page.stepsSection.text}
          />
          <div className="workflow-rail">
            {page.stepsSection.items.map((step) => (
              <article className="workflow-step" key={step.id}>
                <div className="workflow-step-index">{step.id}</div>
                <div className="workflow-step-body">
                  <h3>{step.name}</h3>
                  <p>{step.summary}</p>
                  <div className="workflow-meta">
                    <span>{step.owner}</span>
                    <strong>{step.output}</strong>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section">
          <SectionHeader
            eyebrow={page.artifactsSection.eyebrow}
            title={page.artifactsSection.title}
          />
          <div className="three-up-grid">
            {page.artifactsSection.items.map((item) => (
              <article className="info-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section handoff-section">
          <div className="handoff-copy">
            <p className="eyebrow">{page.handoffSection.eyebrow}</p>
            <h2>{page.handoffSection.title}</h2>
            <p className="section-text">{page.handoffSection.text}</p>
          </div>
          <div className="handoff-points">
            {page.handoffSection.points.map((point) => (
              <article className="argument-row" key={point}>
                <span className="argument-bullet" />
                <p>{point}</p>
              </article>
            ))}
          </div>
        </section>

        <CtaBand lang={lang} content={content} />
      </main>
    </SiteShell>
  );
}

export function ResearchPageContent({ lang = "en" }) {
  const content = getSiteContent(lang);
  const page = content.research;

  return (
    <SiteShell lang={lang}>
      <main className="main-content">
        <PageLead
          eyebrow={page.lead.eyebrow}
          title={page.lead.title}
          text={page.lead.text}
          facts={page.lead.facts}
        />

        <section className="content-section research-presentation-section">
          <SectionHeader
            eyebrow={page.presentationSection.eyebrow}
            title={page.presentationSection.title}
            text={page.presentationSection.text}
          />
          <div className="research-presentation-panel">
            {page.presentationSection.details.map((item) => (
              <article className="research-detail-row" key={item.label}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </article>
            ))}
          </div>
          <a className="primary-action research-download" href={page.presentationSection.href}>
            {page.presentationSection.cta}
          </a>
        </section>

        <section className="content-section research-results-section">
          <SectionHeader
            eyebrow={page.resultsSection.eyebrow}
            title={page.resultsSection.title}
          />
          <div className="research-result-grid">
            {page.resultsSection.items.map((item) => (
              <article className="research-result-card" key={item.title}>
                <span>{item.label}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section research-takeaways-section">
          <div className="about-milestone-head">
            <p className="eyebrow">{page.takeawaysSection.eyebrow}</p>
            <h2>{page.takeawaysSection.title}</h2>
          </div>
          <div className="about-milestone-list">
            {page.takeawaysSection.items.map((item, index) => (
              <article className="about-milestone-row" key={item}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <p>{item}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section thesis-section">
          <div className="thesis-card">
            <p className="eyebrow">{page.thesisSection.eyebrow}</p>
            <h2>{page.thesisSection.title}</h2>
          </div>
          <div className="thesis-claims">
            {page.thesisSection.claims.map((claim) => (
              <article className="argument-row" key={claim}>
                <span className="argument-bullet" />
                <p>{claim}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section">
          <SectionHeader
            eyebrow={page.themesSection.eyebrow}
            title={page.themesSection.title}
            text={page.themesSection.text}
          />
          <div className="three-up-grid">
            {page.themesSection.items.map((theme) => (
              <article className="info-card" key={theme.title}>
                <h3>{theme.title}</h3>
                <p>{theme.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section">
          <SectionHeader
            eyebrow={page.evaluationSection.eyebrow}
            title={page.evaluationSection.title}
          />
          <div className="surface-grid">
            {page.evaluationSection.items.map((item) => (
              <article className="surface-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section narrative-panel">
          <SectionHeader
            eyebrow={page.narrativeSection.eyebrow}
            title={page.narrativeSection.title}
          />
          <p className="longform-text">{page.narrativeSection.text}</p>
        </section>

        <CtaBand lang={lang} content={content} />
      </main>
    </SiteShell>
  );
}

export function TeamPageContent({ lang = "en" }) {
  const content = getSiteContent(lang);
  const page = content.team;
  const memberCards = page.peopleSection.members;
  const metricItems = page.lead.facts;
  const missionItems = [
    ...page.operatingSection.items,
    ...page.principlesSection.items
  ].slice(0, 4);
  const timelineItems = page.prioritiesSection.items;

  return (
    <SiteShell lang={lang}>
      <main className="main-content team-about-page">
        <section className="team-about-hero">
          <div className="team-about-frame team-about-hero-grid">
            <div className="team-about-hero-copy">
              <p className="eyebrow">{page.lead.eyebrow}</p>
              <h1>{page.lead.title}</h1>
              <p>{page.lead.text}</p>
            </div>
            <div className="team-about-hero-panel" aria-label={page.peopleSection.title}>
              <strong>{page.peopleSection.title}</strong>
              <span>{page.peopleSection.disciplineLine}</span>
              <span>{page.peopleSection.countryLine}</span>
              <a href="#members">{page.missionSection.navItems[0].label}</a>
            </div>
          </div>
        </section>

        <section className="team-about-mission">
          <div className="team-about-frame">
            <p className="eyebrow">{page.missionSection.eyebrow}</p>
            <h2>{page.missionSection.title}</h2>
            <div className="team-about-manifest-grid">
              <p>{page.missionSection.text}</p>
              {missionItems.map((item) => (
                <p key={item.title}>
                  <strong>{item.title}</strong>
                  {item.text}
                </p>
              ))}
            </div>
          </div>
        </section>

        <section className="team-about-values" id="workstreams">
          <div className="team-about-frame team-about-values-layout">
            <aside className="team-about-values-quote">
              <p className="eyebrow">{page.workstreamsSection.eyebrow}</p>
              <h2>{page.workstreamsSection.title}</h2>
              <blockquote>{page.workstreamsSection.text}</blockquote>
            </aside>
            <div className="team-about-values-main">
              <p>{page.operatingSection.text}</p>
              <div className="team-about-values-grid">
                {page.workstreamsSection.items.map((item) => (
                  <article key={item.title}>
                    <span>{item.label}</span>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="team-about-members" id="members">
          <div className="team-about-frame">
            <p className="eyebrow">{page.peopleSection.eyebrow}</p>
            <h2>{page.peopleSection.title}</h2>
            <p className="team-about-section-copy">{page.peopleSection.text}</p>
            <div className="team-about-member-row" aria-label={page.peopleSection.title}>
              {memberCards.map((member) => (
                <article className="team-about-member-card" key={`${member.name}-${member.email || member.affiliation}`}>
                  <div className="team-about-member-avatar" aria-hidden="true">
                    {member.initials}
                  </div>
                  <h3>
                    {member.linkedin ? (
                      <a href={member.linkedin} target="_blank" rel="noreferrer">
                        {member.name}
                      </a>
                    ) : (
                      member.name
                    )}
                    <span>{member.focus}</span>
                  </h3>
                  <p>{member.affiliation}</p>
                  {(member.email || member.linkedin) ? (
                    <div className="team-about-member-links">
                      {member.email ? (
                        <a href={`mailto:${member.email}`}>{page.peopleSection.emailLabel}</a>
                      ) : null}
                      {member.linkedin ? (
                        <a href={member.linkedin} target="_blank" rel="noreferrer">
                          LinkedIn
                        </a>
                      ) : null}
                    </div>
                  ) : null}
                </article>
              ))}
            </div>
            <div className="team-roster-summary">
              <p>{page.peopleSection.disciplineLine}</p>
              <p>{page.peopleSection.countryLine}</p>
              <span>{page.peopleSection.supportBadge}</span>
            </div>
          </div>
        </section>

        <section className="team-about-timeline" id="priorities">
          <div className="team-about-frame">
            <p className="eyebrow">{page.prioritiesSection.eyebrow}</p>
            <h2>{page.prioritiesSection.title}</h2>
            <div className="team-about-timeline-list">
              {timelineItems.map((item) => (
                <article key={item.title}>
                  <span>{item.phase}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="team-about-metrics" id="signals">
          <div className="team-about-frame">
            <p className="eyebrow">{page.signalsSection.eyebrow}</p>
            <div className="team-about-metrics-grid">
              {metricItems.map((item) => (
                <article key={item.label}>
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </article>
              ))}
              <article>
                <strong>{page.peopleSection.members.length}</strong>
                <span>{page.peopleSection.title}</span>
              </article>
            </div>
            <div className="team-about-signal-list">
              {page.signalsSection.items.map((item) => (
                <p key={item.label}>
                  <strong>{item.value}</strong>
                  {item.text}
                </p>
              ))}
            </div>
          </div>
        </section>

        <CtaBand lang={lang} content={content} />
      </main>
    </SiteShell>
  );
}

export function CareersPageContent({ lang = "en" }) {
  const content = getSiteContent(lang);
  const page = content.careers;

  return (
    <SiteShell lang={lang}>
      <main className="main-content careers-page">
        <section className="careers-hero">
          <div className="careers-hero-backdrop" aria-hidden="true" />
          <div className="careers-frame careers-hero-inner">
            <p className="eyebrow">{page.hero.eyebrow}</p>
            <h1>{page.hero.title}</h1>
            <p>{page.hero.text}</p>
            <a className="button button-primary" href={page.hero.ctaPath}>
              {page.hero.cta}
            </a>
          </div>
        </section>

        <section className="careers-band careers-mission">
          <div className="careers-frame careers-statement-block">
            <h2>{page.missionSection.title}</h2>
            <p>{page.missionSection.text}</p>
          </div>
        </section>

        <section className="careers-band careers-statement">
          <div className="careers-frame">
            <h2>{page.statementSection.title}</h2>
            <div className="careers-statement-grid">
              {page.statementSection.paragraphs.map((item) => (
                <article key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="careers-band careers-principles">
          <div className="careers-frame careers-principles-grid">
            <div>
              <h2>{page.valuesSection.title}</h2>
              <ul>
                {page.valuesSection.left.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <ul>
                {page.valuesSection.right.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="careers-band careers-tracks">
          <div className="careers-frame">
            <p className="eyebrow">{page.tracksSection.eyebrow}</p>
            <h2>{page.tracksSection.title}</h2>
            <div className="careers-track-grid">
              {page.tracksSection.items.map((item) => (
                <article key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="careers-band careers-process">
          <div className="careers-frame careers-process-layout">
            <div>
              <p className="eyebrow">{page.processSection.eyebrow}</p>
              <h2>{page.processSection.title}</h2>
            </div>
            <div className="careers-process-list">
              {page.processSection.steps.map((step) => (
                <article key={step.label}>
                  <span>{step.label}</span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="careers-band careers-final-cta">
          <div className="careers-frame careers-final-card">
            <h2>{page.ctaSection.title}</h2>
            <p>{page.ctaSection.text}</p>
            <a className="button button-primary" href={page.ctaSection.href}>
              {page.ctaSection.button}
            </a>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}

export function ContactPageContent({ lang = "en" }) {
  const content = getSiteContent(lang);
  const page = content.contact;

  return (
    <SiteShell lang={lang}>
      <main className="main-content">
        <PageLead
          eyebrow={page.lead.eyebrow}
          title={page.lead.title}
          text={page.lead.text}
          facts={page.lead.facts}
        />

        <section className="content-section contact-primary-section">
          <div className="contact-primary-card">
            <p className="eyebrow">{page.primarySection.eyebrow}</p>
            <h2>{page.primarySection.title}</h2>
            <p className="section-text">{page.primarySection.summary}</p>
          </div>
          <div className="contact-details-grid">
            <article className="contact-detail-card">
              <span>{page.primarySection.emailLabel}</span>
              <strong>{page.primarySection.email}</strong>
            </article>
            <article className="contact-detail-card">
              <span>{page.primarySection.responseLabel}</span>
              <strong>{page.primarySection.response}</strong>
            </article>
            <article className="contact-detail-card">
              <span>{page.primarySection.formatLabel}</span>
              <strong>{page.primarySection.format}</strong>
            </article>
          </div>
        </section>

        <section className="content-section">
          <SectionHeader
            eyebrow={page.inquirySection.eyebrow}
            title={page.inquirySection.title}
          />
          <div className="three-up-grid">
            {page.inquirySection.items.map((item) => (
              <article className="info-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section">
          <SectionHeader
            eyebrow={page.stepsSection.eyebrow}
            title={page.stepsSection.title}
          />
          <div className="contact-steps">
            {page.stepsSection.items.map((step) => (
              <article className="step-card" key={step.id}>
                <span>{step.id}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
          <div className="contact-callout">
            <strong>{page.callout.title}</strong>
            <p>{page.callout.text}</p>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}

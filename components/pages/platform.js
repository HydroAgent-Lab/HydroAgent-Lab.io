import { CtaBand } from "@/components/cta-band";
import { SectionHeader } from "@/components/section-header";
import { SiteShell } from "@/components/shell";
import { getSiteContent } from "@/content/site";

export function PlatformPageContent({ lang = "en" }) {
  const content = getSiteContent(lang);
  const page = content.platform;

  return (
    <SiteShell lang={lang}>
      <main className="main-content platform-page">
        <section className="platform-hero">
          <video
            className="platform-hero-video"
            src="/assets/platform/flood-scene.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
          />
          <div className="platform-hero-scrim" aria-hidden="true" />

          <div className="platform-hero-copy">
            <div className="platform-hero-copy-inner">
              <p className="eyebrow">{page.lead.eyebrow}</p>
              <h1>{page.lead.title}</h1>
              <p className="platform-hero-tagline">{page.lead.tagline}</p>
            </div>
          </div>

          <div className="platform-facts-bar">
            {page.lead.facts.map((fact) => (
              <article key={fact.label} className="platform-hero-fact">
                <span>{fact.label}</span>
                <strong>{fact.value}</strong>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section platform-value-section">
          <SectionHeader
            eyebrow={page.valueSection.eyebrow}
            title={page.valueSection.title}
          />
          <p className="section-text platform-lead-text">{page.lead.text}</p>
          {page.valueSection.paragraphs.map((p) => (
            <p className="section-text" key={p.slice(0, 24)}>
              {p}
            </p>
          ))}
        </section>

        <section className="content-section">
          <SectionHeader
            eyebrow={page.workflowSection.eyebrow}
            title={page.workflowSection.title}
          />
          <ol className="timeline">
            {page.workflowSection.items.map((item, i) => (
              <li
                key={item.slice(0, 24)}
                className={`timeline-item ${i % 2 === 0 ? "tl-left" : "tl-right"}`}
              >
                <span className="timeline-dot" aria-hidden="true" />
                <p>{item}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="content-section">
          <SectionHeader
            eyebrow={page.signalsSection.eyebrow}
            title={page.signalsSection.title}
          />
          <div className="signals-bento">
            {page.signalsSection.items.map((item, i) => (
              <article className={`signals-card signals-card-${i}`} key={item.title}>
                {i === 0 && (
                  <img
                    className="signals-card-bg"
                    src="/assets/platform/real-basin.png"
                    alt=""
                    aria-hidden="true"
                  />
                )}
                <span className="signals-index">{`0${i + 1}`}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section">
          <SectionHeader
            eyebrow={page.pilotSection.eyebrow}
            title={page.pilotSection.title}
          />
          <div className="pilot-grid">
            {page.pilotSection.items.map((item, i) => (
              <article className="signals-card" key={item.title}>
                <span className="signals-index">{`0${i + 1}`}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
          <p className="platform-positioning-text">
            {page.positioning.title} {page.positioning.text}
          </p>
        </section>

        <CtaBand lang={lang} content={content} />
      </main>
    </SiteShell>
  );
}

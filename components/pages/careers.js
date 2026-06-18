import { SiteShell } from "@/components/shell";
import { getSiteContent } from "@/content/site";

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
            {Array.isArray(page.missionSection.text) ? (
              page.missionSection.text.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))
            ) : (
              <p>{page.missionSection.text}</p>
            )}
          </div>
        </section>

        <section className="careers-band careers-principles">
          <div className="careers-frame">
            <h2>{page.valuesSection.title}</h2>
            <div className="careers-principles-grid">
              <ul>
                {page.valuesSection.left.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <ul>
                {page.valuesSection.right.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="careers-band careers-split careers-contribution">
          <div className="careers-frame careers-split-row careers-contribution-row">
            <div className="careers-split-media" aria-hidden="true">
              <video
                className="careers-contribution-video"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                src="/assets/assets/sky.mp4"
              />
            </div>
            <div className="careers-split-copy careers-contribution-copy">
              <p className="eyebrow">{page.tracksSection.eyebrow}</p>
              <h2>{page.tracksSection.title}</h2>
              <div className="careers-contribution-list">
                {page.tracksSection.items.map((item, index) => (
                  <div className="careers-split-block" key={item.title}>
                    <span>{(index + 1).toString().padStart(2, "0")}</span>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                ))}
              </div>
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

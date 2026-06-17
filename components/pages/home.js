import { CtaBand } from "@/components/cta-band";
import { Hero } from "@/components/hero";
import { SectionHeader } from "@/components/section-header";
import { SiteShell } from "@/components/shell";
import { getSiteContent, localizeHref } from "@/content/site";

export function HomePageContent({ lang = "en" }) {
  const content = getSiteContent(lang);
  const page = content.home;

  return (
    <SiteShell lang={lang}>
      <main className="main-content">
        <Hero lang={lang} content={content} />

        <section className="content-section">
          <SectionHeader
            eyebrow={page.whatSection.eyebrow}
            title={page.whatSection.title}
          />
          <ol className="timeline">
            {page.whatSection.items.map((item) => (
              <li className="timeline-item" key={item.slice(0, 24)}>
                <span className="timeline-dot" aria-hidden="true" />
                <p>{item}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="content-section">
          <SectionHeader
            eyebrow={page.flagshipSection.eyebrow}
            title={page.flagshipSection.title}
          />
          <p className="section-text">{page.flagshipSection.text}</p>
          <a className="primary-action" href={localizeHref(lang, page.flagshipSection.ctaPath)}>
            {page.flagshipSection.cta} <span className="action-arrow">→</span>
          </a>
        </section>

        <section className="content-section">
          <SectionHeader
            eyebrow={page.trustSection.eyebrow}
            title={page.trustSection.title}
          />
          <ol className="editorial-list">
            {page.trustSection.items.map((item, i) => (
              <li className="editorial-row" key={item.slice(0, 24)}>
                <span className="editorial-index">{`0${i + 1}`}</span>
                <p>{item}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="content-section">
          <SectionHeader
            eyebrow={page.whoSection.eyebrow}
            title={page.whoSection.title}
          />
          <dl className="split-list">
            {page.whoSection.items.map((item) => (
              <div className="split-row" key={item.title}>
                <dt>{item.title}</dt>
                <dd>{item.text}</dd>
              </div>
            ))}
          </dl>
        </section>

        <CtaBand lang={lang} content={content} />
      </main>
    </SiteShell>
  );
}

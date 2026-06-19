import { CtaBand } from "@/components/cta-band";
import { PageLead } from "@/components/page-lead";
import { SectionHeader } from "@/components/section-header";
import { SiteShell } from "@/components/shell";
import { getSiteContent, localizeHref } from "@/content/site";

export function CapabilitiesPageContent({ lang = "en" }) {
  const content = getSiteContent(lang);
  const page = content.capabilities;

  return (
    <SiteShell lang={lang}>
      <main className="main-content capabilities-page">
        <PageLead
          eyebrow={page.lead.eyebrow}
          title={page.lead.title}
          text={page.lead.text}
          facts={page.lead.facts}
        />

        <section className="content-section">
          <SectionHeader
            eyebrow={page.collaborationSection.eyebrow}
            title={page.collaborationSection.title}
          />
          <div className="three-up-grid">
            {page.collaborationSection.items.map((item, index) => (
              <article className="info-card" key={item.title}>
                <span className="offering-type">{`0${index + 1}`}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                {item.cta ? (
                  <a className="card-cta" href={localizeHref(lang, item.cta.path)}>
                    {item.cta.label} <span className="action-arrow">→</span>
                  </a>
                ) : null}
              </article>
            ))}
          </div>
        </section>

        <section className="content-section">
          <SectionHeader
            eyebrow={page.tasksSection.eyebrow}
            title={page.tasksSection.title}
          />
          <p className="section-text tasks-intro">
            {page.tasksSection.text.before}
            <a href={localizeHref(lang, page.tasksSection.text.path)}>
              {page.tasksSection.text.link}
            </a>
            {page.tasksSection.text.after}
          </p>
          <div className="three-up-grid">
            {page.tasksSection.items.map((item, i) => (
              <article className="info-card" key={item.title}>
                <span className="offering-type">{`0${i + 1}`}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <CtaBand lang={lang} content={content} />
      </main>
    </SiteShell>
  );
}

import { CtaBand } from "@/components/cta-band";
import { PageLead } from "@/components/page-lead";
import { SectionHeader } from "@/components/section-header";
import { SiteShell } from "@/components/shell";
import { getSiteContent } from "@/content/site";
import { eventsContent } from "@/content/pages/events";

export function EventsPageContent({ lang = "en" }) {
  const content = getSiteContent(lang);
  const c = eventsContent[lang] || eventsContent.en;

  return (
    <SiteShell lang={lang}>
      <main className="main-content events-page">
        {/* A — Hero */}
        <PageLead
          eyebrow={c.lead.eyebrow}
          title={c.lead.title}
          text={c.lead.text}
          facts={c.lead.facts}
        />

        {/* B — Ongoing collaborations / open initiatives */}
        {c.collabSection && (
          <section className="content-section">
            <SectionHeader
              eyebrow={c.collabSection.eyebrow}
              title={c.collabSection.title}
            />
            {/* Same row geometry as the timeline below — a bordered card here
                would read as a second visual language on one page. */}
            <div className="event-zigzag">
              {c.collabSection.items.map((item) => (
                <article className="event-row collab-row" key={item.title}>
                  {item.logo && (
                    <div className="collab-row-media">
                      <img src={item.logo.src} alt={item.logo.alt} width="1000" height="395" />
                    </div>
                  )}
                  <div className="event-row-body">
                    <p className="event-row-meta">{item.meta}</p>
                    <h3>{item.title}</h3>
                    {item.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                    <p className="collab-status">
                      <strong>{item.statusLabel}</strong> {item.status}
                    </p>
                    {item.updates && item.updates.length > 0 && (
                      <ul className="collab-updates">
                        {item.updates.map((update) => (
                          <li key={update.text}>
                            <span>{update.date}</span>
                            {update.text}
                          </li>
                        ))}
                      </ul>
                    )}
                    <p className="collab-asks">{item.asks.join(" · ")}</p>
                    <div className="event-row-links">
                      {item.links.map((link) => (
                        <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
                          {link.label} <span className="action-arrow">→</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* C — Event list (zigzag) */}
        <section className="content-section">
          <SectionHeader
            eyebrow={lang === "zh" ? "活动记录" : "Events"}
            title={lang === "zh" ? "我们去过哪里" : "Where we have been"}
          />
          <div className="event-zigzag">
            {c.items.map((item, i) => (
              <article className={`event-row${i % 2 === 1 ? " event-row-reverse" : ""}`} key={item.title}>
                <div className="event-row-media">
                  {item.photos ? (
                    <img src={item.photos[0].src} alt={item.photos[0].alt} />
                  ) : (
                    <div className="event-row-placeholder">
                      <span>{item.photo}</span>
                    </div>
                  )}
                </div>
                <div className="event-row-body">
                  <p className="event-row-meta">{item.meta}</p>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                  {item.links && item.links.length > 0 && (
                    <div className="event-row-links">
                      {item.links.map((link) => (
                        <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
                          {link.label} <span className="action-arrow">→</span>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* D — CTA */}
        <CtaBand lang={lang} content={content} />
      </main>
    </SiteShell>
  );
}

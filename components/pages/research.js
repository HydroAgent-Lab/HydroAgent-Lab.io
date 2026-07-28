import { CtaBand } from "@/components/cta-band";
import { PageLead } from "@/components/page-lead";
import { SectionHeader } from "@/components/section-header";
import { SiteShell } from "@/components/shell";
import { getSiteContent } from "@/content/site";

function getResearchFollowSocial(content, lang) {
  const socials = content.ui.social || [];
  if (lang === "zh") {
    return socials.find((s) => s.label.includes("微信")) || socials[0];
  }
  return socials.find((s) => s.label === "LinkedIn") || socials[0];
}

function renderStatusText(text, followLabel, followSocial) {
  if (!followSocial || !text.includes(followLabel)) {
    return text;
  }

  const [before, after] = text.split(followLabel);
  return (
    <>
      {before}
      <a className="research-status-social-link" href={followSocial.href} target="_blank" rel="noreferrer">
        {followLabel}
      </a>
      {after}
    </>
  );
}

const statusLabels = {
  en: { preprint: "Preprint", "under-review": "Under review", published: "Published" },
  zh: { preprint: "预印本", "under-review": "在审", published: "已发表" }
};

// A one-paper bibliography row reads as "this lab has published almost nothing" —
// the `01` index is a liability at N=1. The first paper gets a headline block
// instead; `research-paper-list` below takes over from the second paper on.
function FeaturedPaper({ paper }) {
  return (
    <article className="research-featured">
      <div className="research-featured-status">
        <span className="research-featured-badge">{paper.statusLabel}</span>
        <span className="research-featured-review">{paper.reviewNote}</span>
        <span className="research-featured-source">
          {paper.identifier} · {paper.date}
        </span>
      </div>

      <div className="research-featured-head">
        <div className="research-featured-headline">
          <h3>{paper.title}</h3>
          <p className="research-featured-authors">{paper.authors}</p>
          <p className="research-featured-corresponding">{paper.correspondingNote}</p>
          <p className="research-featured-finding">{paper.finding}</p>
        </div>
        <div className="research-featured-facts">
          {paper.facts.map((fact) => (
            <div className="research-featured-fact" key={fact.label}>
              <span>{fact.label}</span>
              <strong>{fact.value}</strong>
            </div>
          ))}
        </div>
      </div>

      {/* Figure 1 is ~1.8:1 and label-dense; at 375px it renders under 200px
          wide, where its step labels are unreadable. The whole figure is a link
          to the source file so a phone reader can still open it full size. */}
      <figure className="research-featured-figure">
        <a href={paper.figureSrc} target="_blank" rel="noreferrer">
          {/* 814 KB of outlined vector, and it sits below the fold — the
              width/height pair reserves the aspect ratio so lazy-loading it
              costs no layout shift. */}
          <img
            src={paper.figureSrc}
            alt={paper.figureAlt}
            width={paper.figureWidth}
            height={paper.figureHeight}
            loading="lazy"
            decoding="async"
          />
        </a>
        <figcaption>
          {paper.figureCaption}{" "}
          <a href={paper.figureSrc} target="_blank" rel="noreferrer">
            {paper.figureLinkLabel}
          </a>
        </figcaption>
      </figure>

      <div className="research-featured-detail">
        {paper.sections.map((section) => (
          <div className="research-featured-section" key={section.label}>
            <h4>{section.label}</h4>
            <p>{section.text}</p>
          </div>
        ))}
      </div>

      <div className="research-featured-links">
        {paper.links.map((link) => (
          <a key={link.id} href={link.href} target="_blank" rel="noreferrer">
            {paper.linkLabels[link.id]} <span className="action-arrow">→</span>
          </a>
        ))}
      </div>
    </article>
  );
}

export function ResearchPageContent({ lang = "en" }) {
  const content = getSiteContent(lang);
  const page = content.research;
  const followLabel = lang === "zh" ? "关注我们" : "Follow us";
  const followSocial = getResearchFollowSocial(content, lang);
  const featuredPaper = page.papers.find((paper) => paper.featured);
  const listedPapers = page.papers.filter((paper) => paper !== featuredPaper);

  return (
    <SiteShell lang={lang}>
      <main className="main-content research-page">
        {/* A — Hero */}
        <PageLead
          eyebrow={page.lead.eyebrow}
          title={page.lead.title}
          text={page.lead.text}
          facts={page.lead.facts}
        />

        {/* B — Motivation + Themes */}
        <section className="content-section">
          <div className="research-motivation-layout">
            <div className="research-motivation-copy">
              <SectionHeader
                eyebrow={page.motivationSection.eyebrow}
                title={page.motivationSection.title}
              />
              {page.motivationSection.paragraphs.map((p) => (
                <p className="section-text" key={p.slice(0, 24)}>
                  {p}
                </p>
              ))}
            </div>
            <div className="research-themes">
              {page.themes.map((theme) => (
                <article className="research-theme-card" key={theme.label}>
                  <h3>{theme.label}</h3>
                  <p>{theme.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* C — Paper List */}
        <section className="content-section research-papers-section">
          <SectionHeader
            eyebrow={lang === "zh" ? "论文" : "Papers"}
            title={lang === "zh" ? "研究论文" : "Research papers"}
          />
          {featuredPaper && <FeaturedPaper paper={featuredPaper} />}

          {listedPapers.length > 0 ? (
            <div className="research-paper-list">
              {listedPapers.map((paper, i) => (
                <article className="research-paper-row" key={paper.title}>
                  <span className="research-paper-index">{String(i + 1).padStart(2, "0")}</span>
                  <div className="research-paper-body">
                    <div className="research-paper-meta">
                      {paper.year && <span>{paper.year}</span>}
                      <span className={`research-paper-status is-${paper.status}`}>
                        {(statusLabels[lang] || statusLabels.en)[paper.status] || paper.status}
                      </span>
                    </div>
                    <h3>{paper.title}</h3>
                    {paper.question && <p className="research-paper-question">{paper.question}</p>}
                    {paper.method && <p className="research-paper-method">{paper.method}</p>}
                    {paper.tags && paper.tags.length > 0 && (
                      <div className="research-paper-tags">
                        {paper.tags.map((tag) => <span key={tag}>{tag}</span>)}
                      </div>
                    )}
                    {paper.links && (
                      <div className="research-paper-links">
                        {paper.links.preprint && (
                          <a href={paper.links.preprint} target="_blank" rel="noreferrer">
                            {lang === "zh" ? "预印本" : "Preprint"} <span className="action-arrow">→</span>
                          </a>
                        )}
                        {paper.links.doi && (
                          <a href={paper.links.doi} target="_blank" rel="noreferrer">
                            DOI <span className="action-arrow">→</span>
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          ) : featuredPaper ? (
            /* A dashed "nothing here yet" box next to a published paper contradicts
               itself — once one paper is out this collapses to a quiet footnote. */
            <p className="research-more-note">{page.moreNote}</p>
          ) : (
            <div className="research-empty">
              <strong>{page.status.title}</strong>
              <p>{renderStatusText(page.status.text, followLabel, followSocial)}</p>
            </div>
          )}
        </section>

        {/* E — CTA */}
        <CtaBand lang={lang} content={content} />
      </main>
    </SiteShell>
  );
}

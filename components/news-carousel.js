import Link from "next/link";

// The home News block. The file keeps its old name, but this is a list now, not
// a carousel (2026-11-11): three items do not need hiding behind dots. The
// first item is the lead (large thumbnail, left); the rest stack beside it.
// No client script — the layout is all CSS (styles/pages/home.css).
// Hrefs arrive already localized.
export function NewsCarousel({ title, items, readMore }) {
  return (
    <div className="news-block">
      <div className="section-header news-head">
        <h2>{title}</h2>
      </div>

      <ul className="news-list">
        {items.map((item, i) => (
          <li className={`news-item${i === 0 ? " is-lead" : ""}`} key={item.id}>
            <article className="news-card">
              {/* Decorative: the title link names the card. `screen` marks a
                  page screenshot, styled as a screen rather than a sheet. */}
              <img
                className={`news-thumb${item.thumb.screen ? " is-screen" : ""}`}
                src={item.thumb.src}
                width={item.thumb.width}
                height={item.thumb.height}
                alt=""
                decoding="async"
                fetchPriority="low"
              />
              <p className="news-meta">
                <span className="news-kind">{item.kind}</span>
                <time dateTime={item.date}>{item.dateLabel}</time>
              </p>
              <h3 className="news-title" lang={item.titleLang}>
                <Link href={item.href}>{item.title}</Link>
              </h3>
              <p className="news-text">{item.text}</p>
              {/* The title's link already covers the card, so this is the
                  visual cue only — not a second tab stop with the same target.
                  An item may name its own action (`cta`). */}
              <span className="news-more" aria-hidden="true">
                {item.cta || readMore} <span className="action-arrow">→</span>
              </span>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}

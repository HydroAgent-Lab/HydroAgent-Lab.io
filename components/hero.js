import { localizeHref } from "@/content/site";
import { TrackLink } from "@/components/track-link";

/* Stable, language-independent id for analytics: "/platform" -> "platform".
   Derived from the UNLOCALIZED path so en and zh clicks aggregate into one row
   in GA4 instead of splitting by locale. */
function ctaId(path) {
  return (path || "").replace(/^\//, "").split("/")[0] || "home";
}

export function Hero({ lang = "en", content }) {
  const hero = content.home.hero;

  /* rank = the visual slot, not the label. If the labels get swapped again, the
     analytics still answer "which slot gets clicked" and "which destination gets
     clicked" independently. */
  const actions = [
    { label: hero.primary, path: hero.primaryPath, rank: "primary", className: "primary-action" },
    { label: hero.secondary, path: hero.secondaryPath, rank: "secondary", className: "secondary-action" },
    ...(hero.tertiary
      ? [{ label: hero.tertiary, path: hero.tertiaryPath, rank: "tertiary", className: "secondary-action" }]
      : [])
  ];

  return (
    <section className="hero brand-hero">
      {/* Left-side gradient scrim for text readability */}
      <div className="brand-hero-scrim" aria-hidden="true" />

      {/* Stage = the image + text GROUP. Anchoring them together (not each to a
          different hero edge) keeps their relative position constant on any
          screen: image upper-right, text lower-left, fixed gap. */}
      <div className="hero-stage">
        {/* Notched-rectangle screenshot sitting on two notched colour-glow
            layers (yellow upper-left, blue lower-right). */}
        <div className="hero-monitor-wrap">
          <span className="hero-glow hero-glow-1" aria-hidden="true" />
          <span className="hero-glow hero-glow-2" aria-hidden="true" />
          <div className="hero-monitor">
            <img
              className="hero-video-bg"
              src={lang === "en" ? "/assets/Webui_EN.png" : "/assets/Webui.png"}
              alt=""
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Text overlay — part of the same group as the image */}
        <div className="hero-copy">
          <p className="eyebrow">{hero.eyebrow}</p>
          <h1>
            Hydro<span>Agent</span>
          </h1>
          <p className="hero-subtitle">{hero.subtitle}</p>
          <p className="hero-text">{hero.text}</p>
          {/* Equal-width 2+1 grid. Identical shape/size on all three; only the
              primary is filled. Labels left, arrows right — because the tracks are
              equal width the arrows line up into a vertical column, which is what
              makes the cluster read as ordered rather than ragged. */}
          <div className="hero-actions">
            {actions.map((action) => (
              <TrackLink
                key={action.rank}
                className={action.className}
                href={localizeHref(lang, action.path)}
                params={{
                  cta_location: "hero",
                  cta_id: ctaId(action.path),
                  cta_rank: action.rank,
                  cta_label: action.label,
                  /* NOT `language` — that's a GA4 built-in parameter (the visitor's
                     browser language). This is the locale of the page they're on,
                     which is a different thing: a visitor with an English browser
                     can be reading the zh route. */
                  site_language: lang
                }}
              >
                <span className="action-label">{action.label}</span>
                <span className="action-arrow">→</span>
              </TrackLink>
            ))}
          </div>
        </div>
      </div>

      {/* Video tag — bottom-right, below the video area */}
      {hero.videoTag && (
        <p className="hero-video-tag">{hero.videoTag}</p>
      )}
    </section>
  );
}

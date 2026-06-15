import Link from "next/link";
import { localizeHref } from "@/content/site";

export function Hero({ lang = "en", content }) {
  const hero = content.home.hero;

  return (
    <section className="hero brand-hero">
      <img
        className="brand-hero-image"
        src="/assets/hero-hydroagent-lab-fast.webp"
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        loading="eager"
        decoding="sync"
      />
      <div className="brand-hero-scrim" aria-hidden="true" />
      <div className="brand-hero-media" aria-hidden="true">
        <img className="brand-swirl-image" src="/assets/hydroagent-mark.svg" alt="" />
        <span className="brand-arc arc-one" />
        <span className="brand-arc arc-two" />
        <span className="brand-arc arc-three" />
        <span className="brand-axis axis-one" />
        <span className="brand-axis axis-two" />
      </div>
      <div className="hero-copy">
        <p className="eyebrow">{hero.eyebrow}</p>
        <h1>
          {hero.title === "HydroAgent" ? (
            <>
              Hydro<span>Agent</span>
            </>
          ) : (
            hero.title
          )}
        </h1>
        <p className="hero-text">{hero.text}</p>
        <div className="hero-actions">
          <Link className="primary-action" href={localizeHref(lang, hero.primaryPath)}>
            {hero.primary}
          </Link>
          <Link className="secondary-action" href={localizeHref(lang, hero.secondaryPath)}>
            {hero.secondary}
          </Link>
        </div>
      </div>
      <div className="hero-scroll-cue" aria-hidden="true">
        <span />
      </div>
    </section>
  );
}

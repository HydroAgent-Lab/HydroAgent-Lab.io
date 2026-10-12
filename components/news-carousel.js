"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

// "{n} of {total}" → "1 of 2". Unknown keys are left as written.
function fill(template, values) {
  return template.replace(/\{(\w+)\}/g, (match, key) => (key in values ? values[key] : match));
}

// The sliding itself is native: a scroll-snap track swipes on touch screens and
// trackpads with no drag code, and still swipes if this script never runs. The
// script only keeps the dots in step with the scroll position and lets a dot
// bring its card into view. Hrefs arrive already localized — importing
// content/site here would ship the whole site's copy to the browser.
export function NewsCarousel({ title, items, readMore, a11y }) {
  const trackRef = useRef(null);
  const headingId = useId();
  const [current, setCurrent] = useState(0);
  const total = items.length;

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;
    let frame = 0;
    // Current = the slide whose left edge is nearest the scroll position,
    // measured from the slides themselves so the gap needs no bookkeeping.
    const sync = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const slides = track.children;
        const origin = slides[0].offsetLeft;
        const distance = (i) => Math.abs(slides[i].offsetLeft - origin - track.scrollLeft);
        let nearest = 0;
        for (let i = 1; i < slides.length; i += 1) {
          if (distance(i) < distance(nearest)) nearest = i;
        }
        setCurrent(nearest);
      });
    };
    track.addEventListener("scroll", sync, { passive: true });
    return () => {
      track.removeEventListener("scroll", sync);
      cancelAnimationFrame(frame);
    };
  }, []);

  function show(index) {
    const track = trackRef.current;
    const slides = track.children;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollTo({
      left: slides[index].offsetLeft - slides[0].offsetLeft,
      behavior: reduceMotion ? "auto" : "smooth"
    });
  }

  return (
    <div className="news-carousel" role="region" aria-roledescription={a11y.carousel} aria-labelledby={headingId}>
      {/* The dots sit at the end of the title row: they are this block's
          controls, and up here they leave the cards one clean left edge. DOM
          order is reading order — title, dots, cards. */}
      <div className="section-header news-head">
        <h2 id={headingId}>{title}</h2>
        {total > 1 ? (
          <div className="news-dots" role="group" aria-label={a11y.dots}>
            {items.map((item, i) => (
              <button
                type="button"
                className="news-dot"
                key={item.id}
                aria-label={fill(a11y.dot, { n: i + 1, total, kind: item.kind })}
                aria-current={i === current ? "true" : undefined}
                onClick={() => show(i)}
              />
            ))}
          </div>
        ) : null}
      </div>

      <div className="news-track" ref={trackRef}>
        {items.map((item, i) => (
          <div
            className="news-slide"
            key={item.id}
            role="group"
            aria-roledescription={a11y.slide}
            aria-label={fill(a11y.slideLabel, { n: i + 1, total })}
          >
            <article className="news-card">
              {/* Decorative: the title link names the card. Not lazy — a lazy
                  image clipped by the track only starts loading once swiped
                  into view, and pops in; the two files are 46 KB together. */}
              <img
                className="news-thumb"
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
                  visual cue only — not a second tab stop with the same target. */}
              <span className="news-more" aria-hidden="true">
                {readMore} <span className="action-arrow">→</span>
              </span>
            </article>
          </div>
        ))}
      </div>
    </div>
  );
}

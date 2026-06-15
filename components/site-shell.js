"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  getLanguageSwitchHref,
  getSiteContent,
  localizeHref,
  normalizePath
} from "@/content/site";

export function SiteShell({ children, lang = "en" }) {
  const pathname = usePathname();
  const content = getSiteContent(lang);
  const switchHref = getLanguageSwitchHref(pathname || "/", lang);
  const normalizedPathname = normalizePath(pathname || "/");

  return (
    <div className={`page-shell lang-${lang}`} id="top">
      <header className="site-header">
        <Link className="brand" href={localizeHref(lang, "/")}>
          <span className="brand-mark">
            <img src="/assets/hydroagent-mark.svg" alt="" aria-hidden="true" />
          </span>
          <span className="brand-copy">
            <strong>
              Hydro <span>Agent</span>
            </strong>
            <span>{content.ui.brandTagline}</span>
          </span>
        </Link>
        <nav className="site-nav" aria-label="Primary">
          {content.ui.nav.map((item) => {
            const href = localizeHref(lang, item.path);
            const isActive = normalizedPathname === normalizePath(href);
            return (
              <Link key={item.path} href={href} className={isActive ? "active" : ""}>
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="header-actions">
          <Link className="header-lang" href={switchHref}>
            {content.ui.switchLabel}
          </Link>
          <Link className="header-cta" href={localizeHref(lang, "/contact")}>
            {content.ui.headerCta}
          </Link>
        </div>
      </header>
      {children}
      <footer className="site-footer">
        <div className="footer-brand">
          <strong>HydroAgent-Lab</strong>
          <p>{content.ui.footerTitle}</p>
        </div>
        <nav className="footer-nav" aria-label="Footer">
          {content.ui.nav.map((item) => (
            <Link key={item.path} href={localizeHref(lang, item.path)}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="footer-meta">
          <p>{content.ui.footerMetaOne}</p>
          <p>{content.ui.footerMetaTwo}</p>
        </div>
      </footer>
      <a className="back-to-top" href="#top" aria-label={lang === "zh" ? "回到顶部" : "Back to top"}>
        ↑
      </a>
    </div>
  );
}

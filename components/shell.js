"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useCallback, useEffect } from "react";
import {
  getLanguageSwitchHref,
  getSiteContent,
  localizeHref,
  normalizePath
} from "@/content/site";
import { Breadcrumb } from "./breadcrumb";

export function SiteShell({ children, lang = "en" }) {
  const pathname = usePathname();
  const content = getSiteContent(lang);
  const switchHref = getLanguageSwitchHref(pathname || "/", lang);
  const normalizedPathname = normalizePath(pathname || "/");
  const topNav = content.ui.nav;
  const footerGroups = content.ui.footerGroups;

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [expandedId, setExpandedId] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleDrawer = useCallback(() => {
    setDrawerOpen((prev) => !prev);
    setExpandedId(null);
  }, []);

  const toggleAccordion = useCallback((id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  }, []);

  const closeDrawer = useCallback(() => {
    setDrawerOpen(false);
    setExpandedId(null);
  }, []);


  return (
    <div className={`page-shell lang-${lang}`} id="top">
      <header className={`site-header${scrolled ? " scrolled" : ""}`}>
        <nav className="site-nav" aria-label="Primary">
          <Link className="nav-logo-pill" href={localizeHref(lang, "/")}>
            <img src="/assets/brand/hydroagent-mark.svg" alt="" aria-hidden="true" />
          </Link>
          <div className="nav-links-pill">
            {topNav.map((item) => {
              if (item.children) {
                const childPaths = item.children.filter((c) => c.path).map((c) => normalizePath(localizeHref(lang, c.path)));
                const isActive = childPaths.includes(normalizedPathname);
                const isOpen = openMenuId === item.id;
                let di = 0;
                return (
                  <div
                    key={item.id}
                    className={`nav-dropdown-wrap${isOpen ? " open" : ""}`}
                    onMouseLeave={() => setOpenMenuId(null)}
                  >
                    <button
                      type="button"
                      className={`nav-item-parent${isActive ? " active" : ""}`}
                      aria-haspopup="true"
                      aria-expanded={isOpen}
                      onClick={() => setOpenMenuId((prev) => (prev === item.id ? null : item.id))}
                    >
                      {item.label}
                      <svg className="nav-chevron" width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true">
                        <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    <div className="nav-dropdown">
                      {item.children.map((child) => {
                        const childHref = child.path ? localizeHref(lang, child.path) : null;
                        const childActive = childHref ? normalizedPathname === normalizePath(childHref) : false;
                        const childLink = childHref ? (
                          <Link
                            key={child.id}
                            href={childHref}
                            className={`nav-dropdown-item${childActive ? " active" : ""}`}
                            style={{ "--i": di++ }}
                          >
                            {child.label}
                          </Link>
                        ) : (
                          <span
                            key={child.id}
                            className="nav-dropdown-item nav-dropdown-grouplabel"
                            style={{ "--i": di++ }}
                          >
                            {child.label}
                          </span>
                        );
                        if (child.showSocial && content.ui.social) {
                          return (
                            <div key={child.id} className="nav-dropdown-branch">
                              {childLink}
                              <div className="nav-dropdown-sub">
                                {content.ui.social.map((s) =>
                                  s.href ? (
                                    <a
                                      key={s.label}
                                      href={s.href}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="nav-dropdown-item nav-dropdown-subitem"
                                      style={{ "--i": di++ }}
                                    >
                                      {s.label}
                                    </a>
                                  ) : (
                                    <span
                                      key={s.label}
                                      className="nav-dropdown-item nav-dropdown-subitem disabled"
                                      style={{ "--i": di++ }}
                                    >
                                      {s.label}
                                    </span>
                                  )
                                )}
                              </div>
                            </div>
                          );
                        }
                        return childLink;
                      })}
                    </div>
                  </div>
                );
              }
              const href = localizeHref(lang, item.path);
              const isActive = normalizedPathname === normalizePath(href);
              return (
                <Link key={item.id} href={href} className={isActive ? "active" : ""}>
                  {item.label}
                </Link>
              );
            })}
            <Link className="header-lang" href={switchHref}>
              {content.ui.switchLabel}
            </Link>
          </div>
        </nav>
        <button
          className={`nav-hamburger${drawerOpen ? " open" : ""}`}
          onClick={toggleDrawer}
          aria-label={drawerOpen ? "Close menu" : "Open menu"}
          aria-expanded={drawerOpen}
        >
          <span />
          <span />
          <span />
        </button>
        <Breadcrumb lang={lang} />
      </header>

      {/* Mobile drawer */}
      {drawerOpen && <div className="nav-overlay" onClick={closeDrawer} />}
      <aside className={`nav-drawer${drawerOpen ? " open" : ""}`}>
        {topNav.map((item) => {
          if (item.children) {
            const isExpanded = expandedId === item.id;
            return (
              <div key={item.id} className="drawer-group">
                <button
                  className={`drawer-parent${isExpanded ? " expanded" : ""}`}
                  onClick={() => toggleAccordion(item.id)}
                >
                  {item.label}
                  <svg className="drawer-chevron" width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true">
                    <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                {isExpanded && (
                  <div className="drawer-children">
                    {item.children.map((child) => {
                      const childHref = child.path ? localizeHref(lang, child.path) : null;
                      const childActive = childHref ? normalizedPathname === normalizePath(childHref) : false;
                      const childLink = childHref ? (
                        <Link key={child.id} href={childHref} className={`drawer-item${childActive ? " active" : ""}`} onClick={closeDrawer}>
                          {child.label}
                        </Link>
                      ) : (
                        <span key={child.id} className="drawer-item drawer-grouplabel">
                          {child.label}
                        </span>
                      );
                      if (child.showSocial && content.ui.social) {
                        return (
                          <div key={child.id} className="drawer-social-group">
                            {childLink}
                            {content.ui.social.map((s) =>
                              s.href ? (
                                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="drawer-item drawer-subitem" onClick={closeDrawer}>
                                  {s.label}
                                </a>
                              ) : (
                                <span key={s.label} className="drawer-item drawer-subitem disabled">
                                  {s.label}
                                </span>
                              )
                            )}
                          </div>
                        );
                      }
                      return childLink;
                    })}
                  </div>
                )}
              </div>
            );
          }
          const href = localizeHref(lang, item.path);
          const isActive = normalizedPathname === normalizePath(href);
          return (
            <Link key={item.id} href={href} className={`drawer-item top-level${isActive ? " active" : ""}`} onClick={closeDrawer}>
              {item.label}
            </Link>
          );
        })}
        <Link className="drawer-item drawer-lang" href={switchHref} onClick={closeDrawer}>
          {content.ui.switchLabel}
        </Link>
      </aside>
      {children}
      <footer className="site-footer">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-brand-head">
              <span className="footer-brand-mark">
                <img src="/assets/brand/hydroagent-mark.svg" alt="" aria-hidden="true" />
              </span>
              <strong>HydroAgent-Lab</strong>
            </div>
            <p>{content.ui.footerTitle}</p>
          </div>
          <nav className="footer-nav footer-nav-grouped" aria-label="Footer">
            {footerGroups.map((group) => (
              <div className="footer-nav-column" key={group.title}>
                <strong>{group.title}</strong>
                {group.items.map((item) => (
                  <Link key={item.path} href={localizeHref(lang, item.path)}>
                    {item.label}
                  </Link>
                ))}
              </div>
            ))}
            {content.ui.social ? (
              <div className="footer-nav-column">
                <strong>{lang === "zh" ? "关注我们" : "Follow Us"}</strong>
                {content.ui.social.map((s) =>
                  s.href ? (
                    <a key={s.label} href={s.href} target="_blank" rel="noreferrer">
                      {s.label}
                    </a>
                  ) : (
                    <span key={s.label}>{s.label}</span>
                  )
                )}
              </div>
            ) : null}
          </nav>
        </div>
        <div className="footer-bottom">
          <p className="footer-credit">{content.ui.footerCredit}</p>
        </div>
      </footer>
      <a className="back-to-top" href="#top" aria-label={lang === "zh" ? "\u56de\u5230\u9876\u90e8" : "Back to top"}>
        ↑
      </a>
    </div>
  );
}

"use client";

import { useEffect, useId, useState } from "react";

// What sendSubscription returns while no Brevo form exists for a language.
const NOT_CONNECTED = Symbol("not connected");
const LANGS = ["zh", "en"];

// Posts to the Brevo hosted form for the chosen digest language. Brevo then
// sends a double opt-in email; nobody is on the list until they click it.
// Field names follow Brevo's "Simple HTML" embed (EMAIL, the empty honeypot
// email_address_check, locale) — check them against the real embed code.
async function sendSubscription(email, digestLang, endpoint) {
  if (!endpoint) return NOT_CONNECTED;
  const body = new FormData();
  body.append("EMAIL", email);
  body.append("email_address_check", "");
  body.append("locale", digestLang);
  return fetch(endpoint, { method: "POST", body });
}

// Success needs explicit evidence: true, or an ok Response whose JSON (when
// Brevo sends one) does not say success: false. Anything else is an error,
// so a visitor is never told the request went through when it did not.
async function outcomeOf(result) {
  if (result === NOT_CONNECTED) return "soon";
  if (result === true) return "done";
  if (!(result instanceof Response) || !result.ok) return "error";
  const data = await result.json().catch(() => null);
  return data && data.success === false ? "error" : "done";
}

function track(params) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", "digest_subscribe", params);
  }
}

// Strings and endpoints arrive as props — importing content/site here would
// ship the whole site's copy to the browser. Validation is ours (noValidate)
// so its message follows the page language instead of the browser's.
export function SubscribeForm({ lang = "en", copy, endpoints = {} }) {
  const inputId = useId();
  const noteId = useId();
  const messageId = useId();
  // idle | submitting | invalid | soon | done | error
  const [status, setStatus] = useState("idle");
  const [digestLang, setDigestLang] = useState(lang === "zh" ? "zh" : "en");
  // The server HTML has no submit handler yet. A submit before hydration would
  // be the browser's own GET, putting the address in the URL (history, server
  // logs, analytics). The button stays disabled until then, and a disabled
  // default button also keeps Enter from submitting.
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  const busy = status === "submitting";
  const message = copy[status] && !busy ? copy[status] : "";
  // The page's own language first.
  const order = lang === "zh" ? LANGS : [...LANGS].reverse();

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const input = form.elements.email;
    if (!input.checkValidity()) {
      setStatus("invalid");
      input.focus();
      return;
    }
    setStatus("submitting");
    try {
      const outcome = await outcomeOf(await sendSubscription(input.value.trim(), digestLang, endpoints[digestLang]));
      setStatus(outcome);
      if (outcome === "done") {
        // Only the address: form.reset() would also reset the controlled radios.
        input.value = "";
        // The language only — never the address.
        track({ site_language: lang, digest_language: digestLang });
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <form className="subscribe-form" onSubmit={handleSubmit} noValidate>
      <fieldset className="subscribe-lang">
        <legend>{copy.languageLabel}</legend>
        {order.map((value) => (
          <label key={value} lang={value === "zh" ? "zh-CN" : "en"}>
            <input
              type="radio"
              name="digest-language"
              value={value}
              checked={digestLang === value}
              onChange={() => setDigestLang(value)}
            />
            {copy.languages[value]}
          </label>
        ))}
      </fieldset>
      <label className="subscribe-label" htmlFor={inputId}>
        {copy.label}
      </label>
      <div className="subscribe-row">
        <input
          id={inputId}
          name="email"
          type="email"
          required
          autoComplete="email"
          spellCheck={false}
          placeholder={copy.placeholder}
          aria-invalid={status === "invalid" || undefined}
          aria-describedby={`${messageId} ${noteId}`}
          onInput={() => status === "invalid" && setStatus("idle")}
        />
        <button
          className={`primary-action subscribe-submit${busy ? " is-busy" : ""}`}
          type="submit"
          disabled={!hydrated || busy}
        >
          {/* Both labels share one grid cell, so the button keeps the width of
              the longer one and the field beside it does not jump. */}
          <span className="subscribe-submit-labels">
            <span aria-hidden={busy || undefined}>{copy.submit}</span>
            <span aria-hidden={!busy || undefined}>{copy.submitting}</span>
          </span>
        </button>
      </div>
      <p id={noteId} className="subscribe-note">
        {copy.note}
      </p>
      <p id={messageId} className={`subscribe-message is-${status}`} role="status">
        {message}
      </p>
    </form>
  );
}

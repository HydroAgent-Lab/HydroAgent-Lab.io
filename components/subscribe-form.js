"use client";

import { useEffect, useId, useState } from "react";

// What the stub below returns until the backend is wired up.
const NOT_CONNECTED = Symbol("not connected");

// TODO(backend): replace this stub with the call to the subscription service.
// Return true, or the fetch Response, once the request has gone through; throw
// if it fails. Until then it returns NOT_CONNECTED and the form says
// subscriptions open soon — a visitor is never told they subscribed when
// nothing was saved.
async function sendSubscription(email, lang) {
  return NOT_CONNECTED;
}

// Success needs explicit evidence: true, or a Response with ok. A failed
// Response, false or undefined is an error, so `return fetch(...)` and
// `return res.ok` both report a 4xx/5xx as a failure, never as "subscribed".
function outcomeOf(result) {
  if (result === NOT_CONNECTED) return "soon";
  if (result === true || (result instanceof Response && result.ok)) return "done";
  return "error";
}

// Strings arrive as props — importing content/site here would ship the whole
// site's copy to the browser. Validation is ours (noValidate) so its message
// follows the page language instead of the browser's.
export function SubscribeForm({ lang = "en", copy }) {
  const inputId = useId();
  const noteId = useId();
  const messageId = useId();
  // idle | submitting | invalid | soon | done | error
  const [status, setStatus] = useState("idle");
  // The server HTML has no submit handler yet. A submit before hydration would
  // be the browser's own GET, putting the address in the URL (history, server
  // logs, analytics). The button stays disabled until then, and a disabled
  // default button also keeps Enter from submitting.
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  const busy = status === "submitting";
  const message = copy[status] && !busy ? copy[status] : "";

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
      const outcome = outcomeOf(await sendSubscription(input.value.trim(), lang));
      setStatus(outcome);
      if (outcome === "done") form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form className="subscribe-form" onSubmit={handleSubmit} noValidate>
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

import { useEffect, useState } from "react";
import { getHistory, subscribe, clearHistory } from "../lib/debugBus";
import { alloyStatus } from "../lib/analytics";
import type { DebugEvent } from "../types";
import { usePageTracking } from "../hooks/usePageTracking";

export default function DebugPage() {
  const [events, setEvents] = useState<DebugEvent[]>(getHistory());
  const [filter, setFilter] = useState<"all" | "dataLayer" | "alloy">("all");
  usePageTracking("Event Inspector", "debug");

  useEffect(() => subscribe((e) => setEvents((prev) => [e, ...prev].slice(0, 200))), []);

  const status = alloyStatus();
  const visible = filter === "all" ? events : events.filter((e) => e.channel === filter);

  return (
    <div className="page">
      <h1>Event inspector</h1>
      <p className="muted">
        Every data layer push and Web SDK call made during this session appears here, newest first.
      </p>

      <div className="status-row">
        <span className={status.enabled ? "pill ok" : "pill"}>VITE_ALLOY_ENABLED: {String(status.enabled)}</span>
        <span className={status.detected ? "pill ok" : "pill warn"}>window.{status.instance}: {status.detected ? "found" : "not found"}</span>
        <span className={status.personalization ? "pill ok" : "pill"}>Personalization: {status.personalization ? "on" : "off"}</span>
      </div>

      <div className="row-gap">
        <label className="sort-control">
          Channel
          <select value={filter} onChange={(e) => setFilter(e.target.value as typeof filter)}>
            <option value="all">All</option>
            <option value="dataLayer">Data layer</option>
            <option value="alloy">Web SDK</option>
          </select>
        </label>
        <button className="btn-outline" onClick={() => { clearHistory(); setEvents([]); }}>Clear</button>
      </div>

      {visible.length === 0 && <p className="muted">No events captured yet.</p>}

      <div className="event-list">
        {visible.map((e) => (
          <details key={e.id} open={false}>
            <summary>
              <span className={`chan ${e.channel}`}>{e.channel}</span>
              <strong>{e.name}</strong>
              <span className="muted"> {new Date(e.time).toLocaleTimeString()}</span>
            </summary>
            <pre>{JSON.stringify(e.payload, null, 2)}</pre>
          </details>
        ))}
      </div>
    </div>
  );
}

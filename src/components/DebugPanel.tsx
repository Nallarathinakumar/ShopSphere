import { useEffect, useState } from "react";
import { getHistory, subscribe, clearHistory } from "../lib/debugBus";
import { alloyStatus } from "../lib/analytics";
import type { DebugEvent } from "../types";

const ENABLED = String(import.meta.env.VITE_DEBUG_PANEL ?? "true") === "true";

export default function DebugPanel() {
  const [open, setOpen] = useState(false);
  const [events, setEvents] = useState<DebugEvent[]>(getHistory());

  useEffect(() => subscribe((e) => setEvents((prev) => [e, ...prev].slice(0, 120))), []);

  if (!ENABLED) return null;
  const status = alloyStatus();

  return (
    <div className={`debug-dock ${open ? "open" : ""}`}>
      <button className="debug-toggle" onClick={() => setOpen((o) => !o)}>
        {open ? "Close" : "Events"} ({events.length})
      </button>
      {open && (
        <div className="debug-body">
          <div className="debug-status">
            <span className={status.detected ? "pill ok" : "pill warn"}>
              alloy {status.detected ? "detected" : "not detected"}
            </span>
            <span className={status.enabled ? "pill ok" : "pill"}>
              web sdk {status.enabled ? "enabled" : "off"}
            </span>
            <span className={status.personalization ? "pill ok" : "pill"}>
              target {status.personalization ? "on" : "off"}
            </span>
            <button onClick={() => { clearHistory(); setEvents([]); }}>Clear</button>
          </div>
          <div className="debug-list">
            {events.length === 0 && <p className="muted">Interact with the store to generate events.</p>}
            {events.map((e) => (
              <details key={e.id}>
                <summary>
                  <span className={`chan ${e.channel}`}>{e.channel}</span> {e.name}
                  <span className="muted"> {new Date(e.time).toLocaleTimeString()}</span>
                </summary>
                <pre>{JSON.stringify(e.payload, null, 2)}</pre>
              </details>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

import type { DebugEvent } from "../types";

const listeners = new Set<(event: DebugEvent) => void>();
const history: DebugEvent[] = [];
const MAX = 120;

export function publish(name: string, channel: DebugEvent["channel"], payload: unknown): void {
  const event: DebugEvent = {
    id: `${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
    time: new Date().toISOString(),
    name,
    channel,
    payload
  };
  history.unshift(event);
  if (history.length > MAX) history.pop();
  listeners.forEach((fn) => fn(event));
}

export function subscribe(fn: (event: DebugEvent) => void): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function getHistory(): DebugEvent[] {
  return [...history];
}

export function clearHistory(): void {
  history.length = 0;
}

import { publish } from "./debugBus";

declare global {
  interface Window {
    adobeDataLayer?: unknown[];
    alloy?: (command: string, options?: unknown) => Promise<any>;
    [key: string]: any;
  }
}

const ALLOY_ENABLED = String(import.meta.env.VITE_ALLOY_ENABLED ?? "false") === "true";
const ALLOY_INSTANCE = String(import.meta.env.VITE_ALLOY_INSTANCE || "alloy");
const PERSONALIZATION_ENABLED = String(import.meta.env.VITE_PERSONALIZATION_ENABLED ?? "false") === "true";
export const STORE_NAME = String(import.meta.env.VITE_STORE_NAME || "ShopSphere");

function alloyInstance(): ((command: string, options?: unknown) => Promise<any>) | null {
  if (!ALLOY_ENABLED) return null;
  const fn = window[ALLOY_INSTANCE];
  return typeof fn === "function" ? fn : null;
}

export function alloyStatus(): { enabled: boolean; detected: boolean; instance: string; personalization: boolean } {
  return {
    enabled: ALLOY_ENABLED,
    detected: typeof window[ALLOY_INSTANCE] === "function",
    instance: ALLOY_INSTANCE,
    personalization: PERSONALIZATION_ENABLED
  };
}

/**
 * Pushes to window.adobeDataLayer (consumed by Adobe Tags rules / data elements)
 * and mirrors the event into the on-page debugger.
 */
export function pushDataLayer(eventName: string, payload: Record<string, unknown>): void {
  const entry = { event: eventName, timestamp: new Date().toISOString(), ...payload };
  window.adobeDataLayer = window.adobeDataLayer || [];
  window.adobeDataLayer.push(entry);
  publish(eventName, "dataLayer", entry);
}

/**
 * Sends an event to the Adobe Experience Platform Edge Network through Web SDK.
 * Safe no-op when alloy is not present, so the app never breaks locally.
 */
export async function sendEvent(options: {
  xdm: Record<string, unknown>;
  data?: Record<string, unknown>;
  renderDecisions?: boolean;
  decisionScopes?: string[];
  personalization?: Record<string, unknown>;
}): Promise<any | null> {
  const alloy = alloyInstance();
  if (!alloy) {
    publish("alloy:skipped", "alloy", { reason: "alloy not enabled or not loaded", xdm: options.xdm });
    return null;
  }
  try {
    const result = await alloy("sendEvent", options);
    publish(String(options.xdm.eventType || "sendEvent"), "alloy", { request: options, response: result });
    return result;
  } catch (error) {
    publish("alloy:error", "alloy", { error: String(error), request: options });
    return null;
  }
}

export function baseWebXdm(pageName: string, viewName: string) {
  return {
    web: {
      webPageDetails: {
        name: `${STORE_NAME}:${pageName}`,
        siteSection: viewName,
        viewName,
        URL: window.location.href,
        pageViews: { value: 1 }
      },
      webReferrer: { URL: document.referrer }
    },
    implementationDetails: {
      name: `${STORE_NAME} SPA`,
      version: "1.0.0",
      environment: "browser"
    }
  };
}

export function isPersonalizationEnabled(): boolean {
  return PERSONALIZATION_ENABLED && !!alloyInstance();
}

import { useEffect } from "react";
import { trackPageView } from "../lib/commerceEvents";

/**
 * Fires a view-level page event on every SPA route/view change.
 * In a SPA there is no document reload, so this hook is the equivalent of the
 * traditional page-load beacon and is also the natural hook point for
 * Adobe Target view-based personalization.
 */
export function usePageTracking(pageName: string, viewName: string, extra: Record<string, unknown> = {}) {
  const serializedExtra = JSON.stringify(extra);
  useEffect(() => {
    document.title = `${pageName} | ShopSphere`;
    void trackPageView(pageName, viewName, JSON.parse(serializedExtra));
  }, [pageName, viewName, serializedExtra]);
}

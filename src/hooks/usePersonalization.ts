import { useEffect, useState } from "react";
import { isPersonalizationEnabled, sendEvent, baseWebXdm } from "../lib/analytics";
import { publish } from "../lib/debugBus";

export interface OfferContent {
  title: string;
  body: string;
  ctaLabel: string;
  accent?: string;
}

/**
 * Requests a decision scope from Adobe Target through Web SDK.
 * Returns the Target content when a proposition is available, otherwise the
 * default content, so the UI always renders something.
 *
 * Note for form-based activities with custom scopes: Web SDK returns the
 * proposition but does not know where to place it, so the component renders it
 * explicitly and sends a display notification afterwards.
 */
export function usePersonalization(scope: string, fallback: OfferContent) {
  const [content, setContent] = useState<OfferContent>(fallback);
  const [source, setSource] = useState<"default" | "target">("default");

  useEffect(() => {
    let cancelled = false;

    async function run() {
      if (!isPersonalizationEnabled()) return;

      const response = await sendEvent({
        renderDecisions: false,
        decisionScopes: [scope],
        xdm: {
          eventType: "decisioning.propositionFetch",
          ...baseWebXdm(scope, scope)
        }
      });

      const proposition = response?.propositions?.find((p: any) => p.scope === scope);
      const raw = proposition?.items?.[0]?.data?.content;
      if (cancelled || !raw) return;

      let parsed: Partial<OfferContent> = {};
      try {
        parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
      } catch {
        publish("target:unparsed-content", "alloy", { scope, raw });
        return;
      }

      setContent({ ...fallback, ...parsed });
      setSource("target");

      // Display notification so Target reports an impression for the activity.
      await sendEvent({
        xdm: {
          eventType: "decisioning.propositionDisplay",
          _experience: {
            decisioning: {
              propositions: [
                { id: proposition.id, scope: proposition.scope, scopeDetails: proposition.scopeDetails }
              ]
            }
          }
        }
      });
    }

    void run();
    return () => {
      cancelled = true;
    };
    // fallback is intentionally not a dependency; scope drives the request
  }, [scope]);

  return { content, source };
}

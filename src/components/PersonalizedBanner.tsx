import { usePersonalization } from "../hooks/usePersonalization";
import type { OfferContent } from "../hooks/usePersonalization";

/**
 * Renders a Target-decision-driven banner.
 * Until an Adobe Target activity is live for the scope, the default content is
 * shown, so the page never depends on a decision being returned.
 */
export default function PersonalizedBanner({
  scope,
  fallback
}: {
  scope: string;
  fallback: OfferContent;
}) {
  const { content, source } = usePersonalization(scope, fallback);

  return (
    <section className="hero-banner" data-scope={scope} data-content-source={source}>
      <div>
        <span className="eyebrow">
          {source === "target" ? "Personalized experience" : "Featured"}
        </span>
        <h2>{content.title}</h2>
        <p>{content.body}</p>
        <button className="btn-light">{content.ctaLabel}</button>
      </div>
      <div className="hero-art" aria-hidden="true">
        {"\u{1F6CD}"}
      </div>
    </section>
  );
}

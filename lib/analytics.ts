/**
 * Optional, consent-free first-party pageview beacon.
 * No external analytics service is contacted unless explicitly configured.
 * Point NEXT_PUBLIC_ANALYTICS_URL at your own endpoint if you want pageview data.
 */
export function pageview(): void {
  if (typeof window === 'undefined') return;
  const endpoint = process.env.NEXT_PUBLIC_ANALYTICS_URL;
  if (!endpoint) return;

  try {
    navigator.sendBeacon(
      endpoint,
      JSON.stringify({ path: window.location.pathname, ts: Date.now() }),
    );
  } catch {
    // Analytics must never break the page.
  }
}

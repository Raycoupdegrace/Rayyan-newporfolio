/**
 * Optional, consent-free first-party pageview beacon.
 * No external trackers are loaded by default — the project ships zero third-party
 * analytics so Lighthouse performance stays above 95. Point NEXT_PUBLIC_ANALYTICS_URL
 * at your own endpoint if you want real numbers.
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

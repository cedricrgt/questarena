/**
 * Cookie Consent Management Utilities
 */

export type ConsentStatus = "accepted" | "declined" | null;

export interface CookieConsent {
  status: ConsentStatus;
  date: string | null;
}

/**
 * Get the current cookie consent status
 */
export function getCookieConsent(): CookieConsent {
  if (typeof window === "undefined") {
    return { status: null, date: null };
  }

  const status = localStorage.getItem("cookieConsent") as ConsentStatus;
  const date = localStorage.getItem("cookieConsentDate");

  return {
    status,
    date,
  };
}

/**
 * Check if user has accepted cookies
 */
export function hasAcceptedCookies(): boolean {
  const { status } = getCookieConsent();
  return status === "accepted";
}

/**
 * Check if user has declined cookies
 */
export function hasDeclinedCookies(): boolean {
  const { status } = getCookieConsent();
  return status === "declined";
}

/**
 * Check if user has made a choice about cookies
 */
export function hasConsentChoice(): boolean {
  const { status } = getCookieConsent();
  return status !== null;
}

/**
 * Clear cookie consent (for testing or reset)
 */
export function clearCookieConsent(): void {
  if (typeof window === "undefined") return;
  
  localStorage.removeItem("cookieConsent");
  localStorage.removeItem("cookieConsentDate");
}

/**
 * Set cookie consent
 */
export function setCookieConsent(accepted: boolean): void {
  if (typeof window === "undefined") return;

  const status = accepted ? "accepted" : "declined";
  localStorage.setItem("cookieConsent", status);
  localStorage.setItem("cookieConsentDate", new Date().toISOString());
}

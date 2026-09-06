import { browser } from '$app/environment';

export const settings = $state({
  // Default to true during SSR and initial hydration to match server output
  transitionsEnabled: true
});

// Sync from localStorage ONCE the browser has loaded
export function initSettings() {
  if (!browser) return;
  const stored = localStorage.getItem("animations");
  if (stored !== null) {
    settings.transitionsEnabled = stored === "true";
  }
}

export function toggleTransitions(enabled?: boolean) {
  const nextState = enabled ?? !settings.transitionsEnabled;
  settings.transitionsEnabled = nextState;

  if (browser) {
    localStorage.setItem("animations", String(nextState));
  }
}
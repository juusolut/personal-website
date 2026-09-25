import { browser } from '$app/environment';

export const settings = $state({
  // Default to true during SSR and initial hydration to match server output
  transitionsEnabled: true,
  soundsEnabled: true
});

// Sync from localStorage ONCE the browser has loaded
export function initSettings() {
  if (!browser) return;

    // Transitions
  const storedAnimations = localStorage.getItem("animations");
  if (storedAnimations !== null) {
    settings.transitionsEnabled = storedAnimations === "true";
  }

  // Sounds
  const storedSounds = localStorage.getItem("animations");
  if (storedSounds !== null) {
    settings.soundsEnabled = storedSounds === "true";
  }
}

export function toggleTransitions(enabled?: boolean) {
  const nextState = enabled ?? !settings.transitionsEnabled;
  settings.transitionsEnabled = nextState;

  if (browser) {
    localStorage.setItem("animations", String(nextState));
  }
}

export function toggleSounds(enabled?: boolean) {
  const nextState = enabled ?? !settings.soundsEnabled;
  settings.soundsEnabled = nextState;

  if (browser) {
    localStorage.setItem("sounds", String(nextState));
  }
}
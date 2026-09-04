<script lang="ts">
  import Icon from "./Icon.svelte";
  import { asset } from "$app/paths";

  // Helper function to resolve the initial theme on the client
  function getInitialTheme(): string {
    if (typeof window === "undefined") return "dark";

    // 1. Check LocalStorage
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      return storedTheme;
    }

    // 2. Check System Preference (prefers-color-scheme)
    if (window.matchMedia("(prefers-color-scheme: light)").matches) {
      return "light";
    }
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }

    // 3. Fallback to Dark
    return "dark";
  }

  // Initialize state; defaults to 'dark' or reads existing HTML attribute
  let theme = $state(getInitialTheme());

  function toggleTheme() {
    theme = theme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", theme);
    if (switchSound) {
      switchSound.currentTime = 0; // Rewind so rapid clicks play immediately
      switchSound.play().catch(() => {
        // Handle autoplay restrictions safely if needed
      });
    }
  }

  let isMounted = $state(false);
  // Sync state changes directly to the <html> element
  $effect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    isMounted = true;
  });

  // Derive dynamic label to announce target action clearly
  let nextTheme = $derived(theme === "dark" ? "light" : "dark");

  const switchSound = typeof Audio !== "undefined"
    ? new Audio(asset("/sounds/click.wav"))
    : null;

  if (switchSound) {
    switchSound.preload = "auto";
    switchSound.volume = 0.5
  }
</script>

<button
  id="theme-button"
  onclick={toggleTheme}
  aria-label={`Switch to ${nextTheme} theme`}
  class:light={theme === "light"}
  class:ready={isMounted}
>
  <Icon name="MoonStars" size="1.25rem" aria-hidden="true" />
  <Icon name="Sun" size="1.25rem" aria-hidden="true" />
</button>

<style>
  #theme-button {
    /*     padding: 0.25rem 0; */
    width: 3.5rem;
    aspect-ratio: 2 / 1;
    display: flex;
    justify-content: space-around;
    align-items: center;
    cursor: pointer;
    border-radius: var(--border-radiuses-sm);
    background: color-mix(
      in oklab,
      var(--colors-secondary) 30%,
      var(--colors-elevation-0)
    );
    color: var(--colors-text);
    position: relative;
    z-index: 0;
    overflow: hidden;

    > :global(svg) {
      z-index: 1;
      transition: color 200ms ease-in-out;
    }

    > :global(svg):last-child {
      color: color-mix(in oklab, var(--colors-text), transparent 60%);
    }

    &::before {
      content: "";
      position: absolute;
      height: 100%;
      width: 50%;
      left: 0;
      border-radius: var(--border-radiuses-sm);
      border: 2px solid
        color-mix(
          in oklab,
          var(--colors-secondary),
          var(--border-mix-shading) var(--border-strength-3)
        );
      background: color-mix(
        in oklab,
        var(--colors-secondary) 80%,
        var(--colors-elevation-0)
      );
    }

    &.ready::before {
      transition: transform 200ms ease-in-out;
    }

    &.light::before {
      transform: translateX(100%);
    }

    &.light > :global(svg):last-child {
      color: var(--colors-text);
    }

    &.light > :global(svg):first-child {
      color: color-mix(in oklab, var(--colors-text), transparent 60%);
    }
  }
</style>

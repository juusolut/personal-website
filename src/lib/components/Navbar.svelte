<script lang="ts">
  import { page } from "$app/state";
  import { resolve } from "$app/paths";
  import { asset } from "$app/paths";
  import Icon from "./Icon.svelte";

  // Svelte 5 rune for mobile menu state
  let isOpen = $state(false);

  function toggleMenu() {
    isOpen = !isOpen;
  }

  function closeMenu() {
    isOpen = false;
  }

  // Helper to check if a route is currently active
  function isActive(path: string): boolean {
    return page.url.pathname === resolve(path as `/`);
  }

  // Initialize state; defaults to 'dark' or reads existing HTML attribute
  let theme = $state(
    typeof document !== "undefined"
      ? document.documentElement.getAttribute("data-theme") || "dark"
      : "dark",
  );

  // Sync state changes directly to the <html> element
  $effect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  });

  function toggleTheme() {
    theme = theme === "dark" ? "light" : "dark";
  }
</script>

<nav class="navbar">
  <div class="nav-container">
    <!-- Brand / Logo -->
    <a href={resolve("/")} class="brand" onclick={closeMenu}>
      <img
        src={asset("/images/head.png")}
        alt="Logo"
        class="logo-image"
        style="height: 2.5rem; width: auto;"
      />
      <span class="logo-text">Juuso <br /> Luttinen</span>
    </a>

    <div class="buttons">
      <button
        class="theme-button"
        onclick={toggleTheme}
        aria-label="Toggle theme"
      >
        {#if theme === "dark"}
          <Icon name="MoonStars" />
        {:else}
          <Icon name="Sun" />
        {/if}
      </button>
    </div>

    <!-- Mobile Hamburger Button -->
    <button
      class="hamburger"
      onclick={toggleMenu}
      aria-label="Toggle navigation menu"
      aria-expanded={isOpen}
    >
      <span class="bar" class:open={isOpen}></span>
      <span class="bar" class:open={isOpen}></span>
      <span class="bar" class:open={isOpen}></span>
    </button>

    <!-- Navigation Links -->
    <ul class="nav-links" class:open={isOpen}>
      <li>
        <a href={resolve("/")} class:active={isActive("/")} onclick={closeMenu}
          >Etusivu</a
        >
      </li>
      <li>
        <a
          href={resolve("/about")}
          class:active={isActive("/about")}
          onclick={closeMenu}>Minä</a
        >
      </li>
      <li>
        <a
          href={resolve("/projects")}
          class:active={isActive("/projects")}
          onclick={closeMenu}>Projektit</a
        >
      </li>
      <li>
        <a
          href={resolve("/contact")}
          class:active={isActive("/contact")}
          onclick={closeMenu}>Yhteystiedot</a
        >
      </li>
    </ul>
  </div>
</nav>

<style>
  .navbar {
    top: 0;
    z-index: 100;
    color: var(--colors-text);
    height: var(--navbar-height);
    display: flex;
    align-items: center;
    position: relative;
    width: 100%;
    margin-bottom: 3rem;
    position: sticky;
    background-color: color-mix(in oklch, var(--colors-elevation-0), transparent 10%);
    backdrop-filter: blur(10px);
    view-transition-name: navbar;
    view-transition-class: project-morph navbar;
  }

  .nav-container {
    max-width: var(--site-width);
    width: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
  }

  .brand {
    font-size: var(--font-sizes-sm);
    font-weight: var(--font-weights-bold);
    text-decoration: none;
    color: inherit;
    text-transform: uppercase;
    display: inline-flex;
    align-items: center;
    gap: 1rem;
  }

  .nav-links {
    display: flex;
    gap: 1.5rem;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .nav-links a {
    color: inherit;
    text-decoration: none;
    font-weight: var(--font-weights-bold);
    transition: color 0.2s ease;
  }

  .nav-links a:hover,
  .nav-links a.active {
    color: var(--colors-primary); /* Highlight color */
  }

  .nav-links a.active {
    text-decoration: underline;
    text-underline-offset: 5px;
    text-decoration-thickness: 3px;
  }

  /* Mobile Toggle Button */
  .hamburger {
    display: none;
    flex-direction: column;
    justify-content: space-around;
    width: 1.75rem;
    height: 1.25rem;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
  }

  .bar {
    width: 100%;
    height: 2px;
    background-color: var(--colors-text);
    transition: all 0.3s ease;
  }

  /* Responsive Mobile Menu */
  @media (max-width: 768px) {

    .navbar {
      margin-bottom: 0rem;
      z-index: 10000;
    }
    .hamburger {
      display: flex;
    }

    .nav-links {
      display: none;
      position: absolute;
      top: 100%;
      height: calc(100vh - 5rem);
      left: 0;
      right: 0;
      flex-direction: column;
      background-color: var(--colors-elevation-2);
      padding: 1.5rem;
      gap: 1rem;
      border-top: 1px solid color-mix(in oklch, var(--colors-elevation-2), var(--border-mix-shading) var(--border-strength-2));
    }

    .nav-links.open {
      display: flex;
    }

    .buttons {
      justify-content: flex-end !important;
    }
  }

  .buttons {
    display: flex;
    flex: 1;
    justify-content: flex-start;
    padding: 0 1rem;
  }
  .theme-button {
    padding: .5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border-radius: var(--border-radiuses-sm);
    border: 1px solid
      color-mix(in oklab, var(--colors-secondary), var(--border-mix-shading));
    background: color-mix(
      in oklab,
      var(--colors-secondary) 30%,
      var(--colors-elevation-0)
    );
    color: var(--colors-text);
  }
</style>

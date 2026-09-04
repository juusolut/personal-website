<script lang="ts">
  import { page } from "$app/state";
  import { resolve } from "$app/paths";
  import { asset } from "$app/paths";
  import ThemeSwitcher from "./ThemeSwitcher.svelte";

  // Svelte 5 rune for mobile menu state
  let isOpen = $state(false);
  let scrollY = $state(0);
  let isScrolled = $derived(scrollY > 0);

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
</script>

<svelte:window bind:scrollY />

<nav class="navbar" class:show-border={isScrolled}>
  <div class="nav-container">
    <!-- Brand / Logo -->
    <a href={resolve("/")} class="brand" onclick={closeMenu}>
      <img
        src={asset("/images/head.png")}
        alt="Logo"
        class="logo-image"
        style="height: 2.5rem; width: auto;"
      />
      <span class="logo-text">Juuso<br />Luttinen</span>
    </a>

    <!-- Navigation Links -->
    <div id="links-and-buttons">
      <!-- Mobile Hamburger Button -->
      <button
        class="hamburger"
        onclick={toggleMenu}
        aria-label={isOpen ? "Sulje navigointivalikko" : "Avaa navigointivalikko"}
        aria-expanded={isOpen}
      >
        <span class="bar" class:open={isOpen}></span>
        <span class="bar" class:open={isOpen}></span>
        <span class="bar" class:open={isOpen}></span>
      </button>
      <ul class="nav-links" class:open={isOpen}>
        <li>
          <a
            href={resolve("/")}
            class:active={isActive("/")}
            onclick={closeMenu}>Etusivu</a
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
      <div id="buttons">
<ThemeSwitcher/>
      </div>
    </div>
  </div>
</nav>

<style>
  nav {
    top: 0;
    color: var(--colors-text);
    height: var(--navbar-height);
    display: flex;
    align-items: center;
    width: 100%;
    margin-bottom: 0rem;
    flex-shrink: 0;
    z-index: 9999;
    position: sticky;
    background-color: color-mix(
      in oklch,
      var(--colors-elevation-0),
      transparent 0%
    );
    /*     backdrop-filter: blur(10px); */
    view-transition-name: navbar;
    view-transition-class: project-morph2 navbar;
    border-bottom: 1px solid transparent;
    transition: border-bottom-color 200ms linear;
    &.show-border {
      border-bottom-color: color-mix(
        in oklab,
        var(--colors-elevation-0),
        var(--border-mix-shading) var(--border-strength-2)
      );
    }
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

    img {
      height: 2rem !important;
    }
  }

  .nav-links {
    list-style: none;
    display: none;
    position: absolute;
    top: var(--navbar-height);
    bottom: 0;
    height: calc(100vh - var(--navbar-height));
    width: 100vw;
    margin: 0;
    left: 0;
    right: 0;
    flex-direction: column;
    background-color: var(--colors-elevation-2);
    padding: 1.5rem;
    gap: 0rem;
    border-top: 1px solid
      color-mix(
        in oklch,
        var(--colors-elevation-2),
        var(--border-mix-shading) var(--border-strength-2)
      );
  }

  .nav-links.open {
    display: flex;
  }

  /* Disable background scroll when menu is open */
  :global(html:has(.nav-links.open)) {
    overflow: hidden;
  }

  .nav-links a {
    color: inherit;
    text-decoration: none;
    font-weight: var(--font-weights-bold);
    transition: color 0.2s ease;
    display: inline-block;
    padding: 1rem 0rem;
    min-width: 10rem;
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

  #links-and-buttons {
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
    gap: 1rem;
  }

  /* Mobile Toggle Button */
  .hamburger {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 1.75rem;
    height: 1.5rem;
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

  #buttons {
    display: flex;
    justify-content: flex-start;
    /*     padding: 0 1rem; */
  }

  /* Responsive Mobile Menu */
  @media (width > 768px) {

    .brand {
      img {
      height: 2.5rem !important;
    }
    }
    #links-and-buttons {
      gap: 2rem;
      flex-direction: row;
    }
    nav {
      margin-bottom: 3rem;
    }

    .hamburger {
      display: none;
    }

    .nav-links {
      display: flex;
      gap: 1.5rem;
      margin: 0;
      padding: 0;
      position: unset;
      height: auto;
      width: auto;
      flex-direction: row;
      background-color: transparent;
      border: none;
      gap: .5rem;

      a {
        display: inline-block;
        padding: .5rem .5rem;
        min-width: 0rem;
      }
    }
  }
</style>

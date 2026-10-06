<script lang="ts">
  import { page } from "$app/state";
  import { resolve } from "$app/paths";
  import { asset } from "$app/paths";
  import ThemeSwitcher from "./ThemeSwitcher.svelte";
  import DropdownButton from "./DropdownButton.svelte";
  import MenuOptions from "./MenuOptions.svelte";
  import Icon from "./Icon.svelte";
  import { fade, slide, fly } from "svelte/transition";
  import { outclick } from "$lib/actions/outclick.svelte";

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
        src={asset("/images/favicons/favicon-96x96.png")}
        alt="Logo"
        class="logo-image"
        style="height: 2.5rem; width: auto;"
      />
      <div class="logo-text"><span>Juuso</span><span>Luttinen</span></div>
    </a>

    <!-- Navigation Links -->
    <div id="links-and-buttons">
      <!-- Navbar and menu button -->
      <div use:outclick={() => (isOpen = false)}>
        <!-- Mobile Menu Button -->
        <button
          class="hamburger"
          class:isOpen
          onclick={toggleMenu}
          aria-label={isOpen
            ? "Sulje navigointivalikko"
            : "Avaa navigointivalikko"}
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
      </div>
      <div class="buttons">
        <ThemeSwitcher />
        <DropdownButton>
          <MenuOptions />
        </DropdownButton>
      </div>
    </div>
  </div>
</nav>

<style>
  :global(.navbar) {
    z-index: 9998;
  }
  nav {
    top: 0;
    color: var(--colors-text);
    height: var(--navbar-height);
    display: flex;
    align-items: center;
    width: 100%;
    margin-bottom: 0rem;
    flex-shrink: 0;
    z-index: 9998;
    position: sticky;
    background-color: var(--colors-elevation-0);
    /*     backdrop-filter: blur(10px); */
    view-transition-name: navbar;
    view-transition-class: navbar;
    border-bottom: 1px solid transparent;
    transition:
      border-bottom-color var(--anim-speed-medium) ease,
      background-color var(--anim-speed-medium) ease;
    &.show-border {
      /*       background-color: var(--colors-elevation-0); */
      border-bottom-color: color-mix(
        in oklab,
        var(--colors-elevation-0),
        var(--border-mix-shading) var(--border-strength-1)
      );
    }
  }

  :global(::view-transition-group(.navbar)) {
    animation-duration: 250ms !important;
    animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1) !important;
    z-index: 9999;
  }

  :global(::view-transition-old(.navbar)),
  :global(::view-transition-new(.navbar)) {
    /*   mix-blend-mode: normal; */
    z-index: 9999;
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
    gap: 0.5rem;

    img {
      height: 2rem !important;
    }
  }

  .logo-text {
    color: var(--colors-text);
    line-height: 1;
    font-weight: var(--font-weights-bolder);
    font-size: var(--font-sizes-xs);
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
  }

  .nav-links {
    list-style: none;
    margin: 0;
    display: flex;
    position: absolute;
    top: calc(var(--navbar-height) + 0.5rem);
    bottom: 0;
    height: min-content;
    width: calc(100vw - 1rem);
    left: 0.5rem;
    flex-direction: column;
    background-color: var(--colors-elevation-1);
    padding: 1.5rem;
    border-radius: var(--border-radiuses-md);
    gap: 0rem;
    /*     border: 1px solid
      color-mix(
        in oklch,
        var(--colors-elevation-2),
        var(--border-mix-shading) var(--border-strength-2)
      ); */
    box-shadow: var(--shadows-sm);
    z-index: 0;
    opacity: 0;
    pointer-events: none;
    visibility: hidden;
    transform: translateY(-20px) scale(0.95);
    transition:
      opacity var(--anim-speed-fast) ease,
      transform var(--anim-speed-fast) ease,
      visibility var(--anim-speed-fast) ease;

    &::before {
      --color: oklch(from var(--colors-elevation-4) l c h / 1);

      content: "";
      background: linear-gradient(to right, var(--color) 50%, transparent);
      position: absolute;
      z-index: -1;
      position-anchor: --link;
      top: calc(anchor(top) + 0.5rem);
      bottom: calc(anchor(bottom) + 0.5rem);
      left: calc(anchor(left) - 0rem);
      width: 50%;
      transition: inset var(--anim-speed-medium);
      pointer-events: none;
      border-left: 3px solid var(--colors-primary);
    }
  }

  .nav-links.open {
    opacity: 1;
    transform: translateY(0) scale(1);
    pointer-events: auto;
    visibility: visible;
  }

  /* Disable background scroll when menu is open */
  :global(html:has(.nav-links.open)) {
    overflow: hidden;
  }

  .nav-links a {
    color: inherit;
    text-decoration: none;
    font-weight: var(--font-weights-bold);
    transition: color var(--anim-speed-fast) ease;
    display: inline-flex;
    gap: 0.5rem;
    align-items: center;
    padding: 1rem 1rem;
    /* min-width: 10rem; */
    width: 100%;
    z-index: 1;
  }

  .nav-links li:first-child {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .nav-links a:hover {
    color: color-mix(
      in oklch,
      var(--colors-text),
      var(--colors-primary) 75%
    ); /* Highlight color */
  }

  .nav-links a.active {
    color: var(--colors-primary); /* Highlight color */
    /*     font-weight: var(--font-weights-bolder); */
  }

  .nav-links a.active {
    /*     text-decoration: underline;
    text-underline-offset: 5px;
    text-decoration-thickness: 3px; */
    anchor-name: --link;
  }

  #links-and-buttons {
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
    gap: 1.5rem;
  }

  /* Mobile Toggle Button */
  .hamburger {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 2.25rem;
    aspect-ratio: 1 / 1;
    background: transparent;
    /*     background-color: red; */
    border: none;
    cursor: pointer;
    padding: 0;
    position: relative;
    border-radius: var(--border-radiuses-full);
    background: var(--colors-elevation-2);
    border: 2px solid
      color-mix(
        in oklab,
        var(--colors-elevation-2),
        var(--border-mix-shading) var(--border-strength-1)
      );
  }

  .hamburger.isOpen {
    /*     border: 2px solid
      color-mix(
        in oklab,
        var(--colors-elevation-2),
        var(--border-mix-shading) var(--border-strength-5)
      ); */
    border: 2px solid var(--colors-text);
  }

  .hamburger.isOpen .bar:nth-child(1) {
    transform: translateY(0) translateX(-50%) rotate(45deg);
  }

  .hamburger.isOpen .bar:nth-child(2) {
    opacity: 0;
  }

  .hamburger.isOpen .bar:nth-child(3) {
    transform: translateY(0) translateX(-50%) rotate(-45deg);
  }

  .hamburger.isOpen .bar {
    width: 60%;
  }

  .bar {
    --offset: 6px;

    width: 60%;
    height: 3px;
    background-color: var(--colors-text);
    transition: all var(--anim-speed-medium) var(--anim-easing-circ);
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }

  .bar:first-of-type {
    transform: translateY(calc(-1 * var(--offset))) translateX(-50%);
  }

  .bar:last-of-type {
    transform: translateY(var(--offset)) translateX(-50%);
  }

  .buttons {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  /* Responsive Mobile Menu */
  @media (width > 45rem) {
    .logo-text {
      font-size: var(--font-sizes-sm);
    }
    .brand {
      gap: 1rem;
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

    :global(html:has(.nav-links.open)) {
      overflow: auto !important;
    }

    .nav-links {
      display: flex;
      gap: 1.5rem;
      margin: 0;
      /*       padding: 0 1rem; */
      padding: 0;
      position: relative;
      height: auto;
      width: auto;
      flex-direction: row;
      /*       background-color: var(--colors-elevation-2); */
      background-color: transparent;
      box-shadow: none;
      border: none;
      gap: 0.5rem;
      inset: 0;

      opacity: 1 !important;
      transform: none !important;
      pointer-events: auto !important;
      visibility: visible !important;

      a {
        display: inline-block;
        padding: 0.5rem 0.5rem;
        min-width: 0rem;
      }

      &::before {
        height: 3px;
        background: var(--colors-primary);
        position: absolute;
        z-index: 0;
        position-anchor: --link;
        top: unset;
        left: calc(anchor(left) + 0.3rem);
        right: calc(anchor(right) + 0.3rem);
        bottom: calc(anchor(bottom) + 0.4em);
        width: unset;
        border-radius: var(--border-radiuses-md);
        transition: inset var(--anim-speed-medium);
        pointer-events: none;
      }
    }
  }
</style>

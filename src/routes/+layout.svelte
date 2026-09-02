<script lang="ts">
  import "../normalize.css";
  import "../themes.css";
  import "../app.css";
  import "../view-transitions.css";
  import favicon from "$lib/assets/favicon.svg";
  import Navbar from "$lib/components/Navbar.svelte";
  import { onNavigate } from "$app/navigation";

  // Trigger native View Transitions on page navigation
  onNavigate((navigation) => {
    // Fallback for browsers that don't support View Transitions
    if (!document.startViewTransition) return;

    return new Promise((resolve) => {
      document.startViewTransition(async () => {
        resolve();
        await navigation.complete;
      });
    });
  });

  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<div class="app-shell">
  <Navbar />

  <main class="page-content">
    {@render children()}
  </main>

  <footer class="h-padding">
    <span
      >Rakennettu <a
        href="https://svelte.dev/"
        class="offsite-link"
        target="_blank"
        rel="noopener noreferrer">Sveltellä</a
      ></span
    >
  </footer>
</div>

<style>
  footer {
    background-color: var(--colors-elevation-0);
    display: flex;
    justify-content: center;
    color: var(--colors-text);
    padding-top: 2rem;
    padding-bottom: 2rem;
    flex: 1;
    align-items: flex-end;
    > span > a {
      color: var(--colors-primary);
      text-decoration: underline;
      text-underline-offset: 5px;
      text-decoration-thickness: 3px;
    }
  }
</style>

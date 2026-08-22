<script lang="ts">
  import "../normalize.css";
  import "../themes.css";
  import "../app.css";
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
</div>

<style></style>

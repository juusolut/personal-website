<script lang="ts">
  import "../app.css";
  import "../normalize.css";
  import "../themes.css";
  import favicon from "$lib/assets/favicon.svg";
  import Navbar from "$lib/components/Navbar.svelte";

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

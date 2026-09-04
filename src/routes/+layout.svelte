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
  <title>Juuso Luttinen | Portfolio | julu.fi</title>
  <meta
    name="description"
    content="Tervetuloa Juuson henkilökohtaiseen portfolioon. Tutustu projekteihini, osaamiseeni ja ota yhteyttä."
  />
  <link
    rel="icon"
    type="image/png"
    href="/images/favicons/favicon-96x96.png"
    sizes="96x96"
  />
  <link rel="icon" type="image/svg+xml" href="/images/favicons/favicon.svg" />
  <link rel="shortcut icon" href="/images/favicons/favicon.ico" />
  <link
    rel="apple-touch-icon"
    sizes="180x180"
    href="/images/favicons/apple-touch-icon.png"
  />
  <meta name="apple-mobile-web-app-title" content="julu.fi" />
  <link rel="manifest" href="/images/favicons/site.webmanifest" />
</svelte:head>

<div class="app-shell">
  <Navbar />

  <main class="page-content">
    {@render children()}
  </main>

  <footer class="h-padding">
    <span
      >Portfolio rakennettu <a
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
    /*     background-color: var(--colors-elevation-0); */
    display: flex;
    justify-content: center;
    color: var(--colors-text);
    padding-top: 8rem;
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

<script lang="ts">
  import ProjectItem from "$lib/components/ProjectItem.svelte";
  import Icon from "$lib/components/Icon.svelte";
  import { getTagInfo, type TagConfig } from "$lib/config/tags";

  let { data } = $props();
  let selectedId = $state(null);

  const handleSelect = (id) => {
    selectedId = id;
  };

  import { onMount } from "svelte";

  let scrollY = $state(0);

  // Restore scroll position when mounting the page
  onMount(() => {
    const savedPosition = sessionStorage.getItem("projects_scroll_pos");
    if (savedPosition !== null) {
      window.scrollTo(0, parseInt(savedPosition, 10));
      // Optionally clear it so fresh visits start at top
      sessionStorage.removeItem("projects_scroll_pos");
    }
  });

  function saveScrollPosition() {
    sessionStorage.setItem("projects_scroll_pos", scrollY.toString());
  }
</script>

<svelte:window bind:scrollY />

<div class="projects-container h-padding">
  <section class="projects">
    <h2 class="view-title">Projektit</h2>
    <p>Tässä softaprojekteja, joita olen työstänyt vuosien varrella.</p>
    <div class="projects__grid">
      {#each data.projects as item (item.slug)}
        <ProjectItem
          id={item.slug}
          title={item.title}
          description={item.description}
          tags={item.tags}
          imageSrc={item.thumbnail}
          href="/projects/{item.slug}"
          isSelected={selectedId === item.slug}
          onselect={handleSelect}
        />
      {/each}
    </div>
  </section>
</div>

<style>
  .projects {
    max-width: var(--site-width);
    margin: 0 auto;
    position: relative;
    z-index: 0;
    margin-bottom: 2rem;

    p {
      margin-left: 0.5rem;
      padding: 0.5rem 1rem;
      background-color: var(--colors-elevation-2);
      width: fit-content;
      box-shadow: var(--shadows-xs);
      &::before {
        content: "";
      }
    }
  }
  .projects__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
    gap: 1rem;
  }
</style>

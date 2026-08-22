<script>
  import ProjectItem from "$lib/components/ProjectItem.svelte";

  let {data} = $props();
</script>

<section class="projects">
  <h2>Projektit</h2>
  <p>Tässä on projekteja, joita olen vuosien varrella työstänyt.</p>
  <div class="projects__grid">
    {#each data.projects as item (item.slug)}
      <ProjectItem
        id={item.slug}
        title={item.title}
        description={item.description}
        imageSrc={item.thumbnail}
        href="/projects/{item.slug}"
      />
    {/each}
  </div>
</section>

<style>
  .projects {
    max-width: var(--site-width);
    margin: 0 auto;
    padding: 2rem;
/*     background-color: var(--colors-elevation-2);
    border: 1px solid var(--colors-primary); */
    border-radius: clamp(0px, (100cqi - 100%) * 1e5, var(--border-radiuses-lg));
    position: relative;
    overflow: hidden;
    z-index: 0;

    & h2 {
      color: var(--colors-text);
      position: relative;
      margin-left: 1rem;

      &::before {
        content: "";
        position: absolute;
        bottom: 0;
        left: -.5rem;
        width: 4px;
        height: 100%;
        background-color: var(--colors-primary);
      }
    }
  }
  .projects__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
    gap: 1rem;
  }
</style>

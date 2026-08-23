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
/*     background-color: var(--colors-elevation-2);
    border: 1px solid var(--colors-primary); */
    border-radius: clamp(0px, (100cqi - 100%) * 1e5, var(--border-radiuses-lg));
    position: relative;
    overflow: hidden;
    z-index: 0;
    padding: 0 0rem;

    h2 {
      color: var(--colors-text);
      position: relative;
      padding: .5rem 0;
      margin-left: .5rem;
      padding-left: 1rem;
      padding-right: 1rem;
      background-color: var(--colors-elevation-2);
      width: min-content;

      &::before {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 5px;
        height: 100%;
        background-color: var(--colors-primary);
      }
    }

    p {
      margin-left: .5rem;
    }
  }
  .projects__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
    gap: 1rem;
  }
</style>

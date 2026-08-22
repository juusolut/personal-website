<script>
  import ProjectItem from "$lib/components/ProjectItem.svelte";
  import screenshot from "$lib/assets/screenshot.png";

  const items = [
    {
      id: 1,
      title: "Henkilökohtainen nettisivu",
      description:
        "Responsiivinen nettisivu, joka on rakennettu SvelteKitillä",
      imageSrc: screenshot,
      href: "/projects/personal-site",
    },
    {
      id: 2,
      title: "Kuluku",
      description: "Alusta, jolla käyttäjät voivat myydä kulkuneuvojaan. Rakennettu Reactilla.",
      imageSrc: screenshot,
      href: "/projects/kuluku",
    },
    {
      id: 3,
      title: "Factory",
      description: "P2P verkkoräiskintäpeli. Rakennettu Godotilla.",
      imageSrc: screenshot,
      href: "/projects/factory",
    },
  ];
</script>

<section class="projects">
  <h2>Projektit</h2>
  <p>Alta löydät minun projektejani</p>
  <div class="projects__grid">
    {#each items as item (item.id)}
      <ProjectItem
        id={item.id}
        title={item.title}
        description={item.description}
        imageSrc={item.imageSrc}
        href={item.href}
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
      color: var(--colors-primary);
    }
  }
  .projects__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
    gap: 1rem;
  }
</style>

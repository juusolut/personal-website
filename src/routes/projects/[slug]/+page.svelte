<script>
  let { data } = $props();
    let Content = $derived(data.content);
</script>

<section class="project" style="view-transition-name: project-bg-{data.meta.slug};">
  <div class="project__inner">
    <div
      class="grid-item__image-wrapper"
      style="view-transition-name: project-img-{data.meta.slug};"
    >
      <img src={data.meta.thumbnail} loading="lazy" />
    </div>

    <h3 style="view-transition-name: project-title-{data.meta.slug};">
      {data.meta.title}
    </h3>
    <p class="undertext" style="view-transition-name: project-desc-{data.meta.slug};">
      {data.meta.description}
    </p>

    <Content/>
  </div>
</section>

<style>
  .project {
    max-width: var(--site-width);
    margin: 0 auto;
    padding: 2rem;
/*     min-height: 50rem; */
    background-color: var(--colors-elevation-2);
    border-radius: var(--border-radiuses-lg);
    font-weight: var(--font-weights-bold);
    position: relative;
    overflow: hidden;
    box-shadow: var(--shadows-sm);
    z-index: 0;

    h3 {
      display: inline-block;
      width: fit-content;
    }

    .undertext {
      color: var(--colors-text-light);
    }

    img {
      width: 100%;
      height: 100%;
      object-position: top;
      object-fit: cover;
      transition: transform 0.3s ease;
      aspect-ratio: 16 / 9;
    }
  }

  .project__inner {
    display: flex;
    flex-direction: column;
    /*     background-color: red; */
  }

  .grid-item__image-wrapper {
    width: 50%;
    aspect-ratio: 16 / 9;
    overflow: hidden;
    background-color: #f3f4f6;
    border-radius: var(--border-radiuses-lg);
    overflow: hidden;
  }
</style>

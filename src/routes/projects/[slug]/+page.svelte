<script>
  let { data } = $props();
  let Content = $derived(data.content);
</script>

<article
  class="project"
  style="view-transition-name: project-bg-{data.meta
    .slug}; view-transition-class: project-morph project-bg"
>
  <a href="/projects" class="back-link"> Takaisin projekteihin </a>
  <div class="project__inner">
    <div
      class="grid-item__image-wrapper"
      style="view-transition-name: project-img-{data.meta
        .slug}; view-transition-class: project-morph project-img"
    >
      <img src={data.meta.thumbnail} loading="lazy" />
    </div>

    <h3
      style="view-transition-name: project-title-{data.meta
        .slug}; view-transition-class: project-morph project-title"
    >
      {data.meta.title}
    </h3>
    <p
      class="undertext"
      style="view-transition-name: project-desc-{data.meta
        .slug}; view-transition-class: project-morph project-desc"
    >
      {data.meta.description}
    </p>

    <Content />
  </div>
</article>

<style>
  .project {
    max-width: var(--site-width);
    margin: 0 auto;
    padding: 1rem 2rem;
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
  .back-link {
    color: var(--colors-text);
    font-weight: var(--font-weights-medium);
    padding: 1rem 0rem;
    display: inline-block;
    text-decoration: none;
    &::before {
      content: "← ";
      margin-right: 0.5rem;
    }
  }
</style>

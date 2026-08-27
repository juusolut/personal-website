<script>
  import { asset } from "$app/paths";
  import { resolve } from "$app/paths";
  import Icon from "$lib/components/Icon.svelte";
  let { data } = $props();
  let Content = $derived(data.content);

  const handleClick = (e) => {
    e.preventDefault();
    history.back();
  };
</script>

<div class="project-container h-padding">
  <article
    class="project"
    style="view-transition-name: project-bg-{data.meta
      .slug}; view-transition-class: project-morph project-bg"
/*     style:z-index={true ? 9999 : "auto"} */
  >
    <div class="back-link-container">
      <a href={resolve("/projects")} onclick={handleClick} class="back-link">
        <Icon name="ArrowNarrowLeft" /> Takaisin projekteihin
      </a>
    </div>
    <div class="project__inner">
      <div
        class="grid-item__image-wrapper"
        style="view-transition-name: project-img-{data.meta
          .slug}; view-transition-class: project-morph project-img"
      >
        <img
          src={asset(data.meta.thumbnail)}
          loading="lazy"
          alt={data.meta.title}
        />
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
    </div>
    <Content />
  </article>
</div>

<style>
  .project-container {
    width: 100%;
    color: var(--colors-text);
  }
  .project {
    max-width: var(--site-width);
    width: 100%;
    margin: 0 auto;
    padding: 1rem 1rem;
    margin-bottom: 5rem;
    /*     min-height: 50rem; */
    background-color: var(--colors-elevation-2);
    border-radius: var(--border-radiuses-lg);
    font-weight: var(--font-weights-bold);
    position: relative;
    box-shadow: var(--shadows-sm);
    z-index: 0;
    border: 1px solid color-mix(in oklch, var(--colors-elevation-2), var(--border-mix-shading) var(--border-strength-2));

    h3 {
      width: fit-content;
      height: fit-content;
      grid-area: title;
    }

    .undertext {
      color: var(--colors-text-light);
      grid-area: desc;
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
    display: grid;
    width: 100%;
    background-color: color-mix(
      in oklab,
      var(--colors-elevation-2),
      var(--colors-primary) 15%
    );
    padding: 1rem;
    border-radius: var(--border-radiuses-lg);

    grid-template-columns: 1fr;
    grid-template-rows: auto max-content;
    grid-template-areas:
      "image"
      "title"
      "desc";
  }

  .grid-item__image-wrapper {
    width: 100%;
    aspect-ratio: 16 / 9;
    overflow: hidden;
    background-color: #f3f4f6;
    border-radius: var(--border-radiuses-lg);
    overflow: hidden;
    grid-area: image;
  }

  .back-link-container {
    position: sticky;
    top: 0;
    z-index: 9999;
    background-color: var(--colors-elevation-2);
    border-bottom: 1px solid color-mix(in oklch, var(--colors-elevation-2), var(--border-mix-shading) var(--border-strength-4));
    margin-bottom: 1rem;
    &::after {
      content: "";
      display: block;
      position: absolute;
      height: 1px;
      width: 100%;
      box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.2);
      box-shadow: 0px 2px 2px
        color-mix(in oklab, var(--border-mix-shading) 15%, transparent);
      bottom: 0;
    }
  }

  .back-link {
    color: var(--colors-text);
    font-weight: var(--font-weights-medium);
    padding: 1rem 0rem;
    padding-right: 1rem;
    display: inline-flex;
    text-decoration: none;
    align-items: center;
    gap: 0.5rem;
    top: 1rem;
    margin: 0.5rem 0;
  }

  .separator {
    position: relative;
    padding: 1rem 0;
    &::after {
      content: "";
      display: block;
      position: absolute;
      height: 1px;
      width: 100%;
      border-bottom: 1px solid var(--colors-text);
      box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.2);
      bottom: 0;
    }
  }

  @container (width > 50rem) {
    .project__inner {
      grid-template-columns: 1.2fr 1fr;
      grid-template-rows: auto max-content;
      grid-template-areas:
        "title image"
        "desc image";
    }

    .project {
      padding: 1rem 2rem;
    }
  }
</style>

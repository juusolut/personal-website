<script>
  import screenshot from "$lib/assets/screenshot.png";
</script>

<section class="project">
  <div class="project__inner">
    <div
      class="grid-item__image-wrapper"
      style="view-transition-name: project-img-1;"
    >
      <img src={screenshot} loading="lazy" />
    </div>

    <h4 style="view-transition-name: project-title-1;">
      Henkilökohtainen nettisivu
    </h4>
    <p class="undertext" style="view-transition-name: project-desc-1;">
      Responsiivinen nettisivu, joka on rakennettu SvelteKitillä
    </p>

    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores
      provident quidem similique, culpa quibusdam molestiae tenetur suscipit
      quasi veniam ab, impedit deserunt possimus fugiat porro reprehenderit
      sint! Delectus, iusto assumenda.
    </p>
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
    view-transition-name: project-bg-1;

    h4 {
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

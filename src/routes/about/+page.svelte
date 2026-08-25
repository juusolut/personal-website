<script lang="ts">
  import { asset } from "$app/paths";
</script>

<div class="info-container h-padding">
  <div class="info">
    <h2 class="view-title">Minä</h2>
    <article class="info-box">
      <!--       <img
        class="sitting"
        src={asset("/images/sitting.png")}
        alt="Juuso Luttinen"
      /> -->
      <div class="profile-image-container waves-pattern">
        <img
          class="me-sticking-out"
          src={asset("/images/me.png")}
          alt="Juuso Luttinen"
        />
        <div class="image-crop-container">
          <img
            class="profile-image"
            src={asset("/images/me.png")}
            alt="Juuso Luttinen"
          />
        </div>
      </div>
      <p class="text">
        Tänne tietoa minusta ja CV. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Incidunt doloribus voluptatibus doloremque aspernatur
        vero fuga aperiam placeat cum, magni accusamus, maxime nam vitae aliquid
        excepturi culpa minus ex! Eaque, incidunt. Lorem ipsum dolor sit, amet
        consectetur adipisicing elit. Accusantium doloremque necessitatibus ex,
        numquam maiores debitis asperiores impedit, officia voluptatibus, quia
        illo sed soluta doloribus magnam id. Quia itaque quos deserunt.
      </p>
    </article>
  </div>
</div>

<style>
  .info-container {
    width: 100%;
    padding: 0rem 0;
    margin-bottom: 5rem;
  }

  .info {
    width: 100%;
    max-width: var(--site-width);
    margin: 0 auto;
    container-type: inline-size;
  }

  .info-box {
    width: 100%;
    position: relative;
    z-index: 0;
    padding: 4rem 2rem;
    margin-top: 0rem;
    display: grid;
    gap: 1rem;
    grid-template-columns: 1fr;
    gap: 1rem;

    &::before {
      --offset: clamp(4px, 5vw - 1rem, 1rem);
      content: "";
      position: absolute;
      height: 100%;
      width: 100%;
      background-color: var(--colors-secondary);
      border-radius: var(--border-radiuses-lg);
      top: var(--offset);
      left: var(--offset);
      z-index: -1;
    }

    &::after {
      content: "";
      position: absolute;
      height: 100%;
      width: 100%;
      background-color: var(--colors-elevation-2);
      border-radius: var(--border-radiuses-lg);
      border: 1px solid var(--colors-text);
      top: 0;
      left: 0;
      z-index: -1;
    }
  }

  .text {
    order: 2;
  }
  .sitting {
    display: none;
    position: absolute;
    width: 15%;
    top: 0;
    right: 2rem;
    transform: translateY(-55%) rotate(-4deg);
  }

  .profile-image-container {
    aspect-ratio: 1 / 1;
    background-color: var(--colors-secondary);
    border-radius: 100%;
    position: relative;
    width: 50%;
    max-width: 15rem;
    order: 1;
    justify-self: center;
  }

  .me-sticking-out {
    position: absolute;
    border-radius: 100%;
    width: 150%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    clip-path: inset(0 0 50% 0);
  }

  .image-crop-container {
    border-radius: 100%;
    overflow: hidden;
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
  }

  .profile-image {
    position: absolute;
    border-radius: 100%;
    width: 150%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  @container (width > 50rem) {
    .info-box {
      grid-template-columns: 3fr 1fr;
    }

    .text {
      order: 1;
      align-self: center;
    }

    .profile-image-container {
      order: 2;
      width: 100%;
      max-width: unset;
    }
  }
</style>

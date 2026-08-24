<script lang="ts">
  import { asset } from "$app/paths";
</script>

<div class="info-container h-padding">
  <article class="info">
    <img
      src={asset("/images/sitting.png")}
      alt="Juuso Luttinen"
      class="nutshell__image"
    />
    <h1>Minä</h1>
    <p>Tänne tietoa minusta ja CV.</p>
  </article>
</div>

<style>
  .info-container {
    width: 100%;
    padding: 10rem 0;
  }

  .info {
    width: 100%;
    max-width: var(--site-width);
    margin: 0 auto;
    background-color: var(--colors-elevation-2);
    border-radius: var(--border-radiuses-lg);
    border: 1px solid var(--colors-text);
    border-top-width: 1rem;
    border-right-width: 1rem;
    border-right-color: var(--colors-primary);
    height: 30rem;
    position: relative;
    z-index: 0;
    padding: 2rem;
    > img {
      position: absolute;
      width: 15%;
      top: 0;
      right: 2rem;
      transform: translateY(-58%) rotate(-4deg);
    }
  }
</style>

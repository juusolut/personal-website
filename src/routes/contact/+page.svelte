<script lang="ts">
  import { asset } from "$app/paths";
</script>

<div class="space-on-mobile"></div>

<div class="info-container h-padding">
  <div class="info">
    <h2 class="view-title">Yhteystiedot</h2>
    <article class="info-box">

    </article>
  </div>
</div>

<style>
  .info-container {
    width: 100%;
  }

  .info {
    width: 100%;
    max-width: var(--site-width);
    margin: 0 auto;
  }

  .info-box {
    width: 100%;
    height: 30rem;
    position: relative;
    z-index: 0;
    padding: 2rem;
    margin-top: 0rem;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;

    &::before {
      content: "";
      position: absolute;
      height: 100%;
      width: 100%;
      background-color: var(--colors-secondary);
      border-radius: var(--border-radiuses-lg);
      top: 1rem;
      left: 1rem;
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

</style>

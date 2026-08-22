<script>
  import me from "$lib/assets/me.png";
  import head from "$lib/assets/head.png";
  import FloatingHead from "$lib/components/FloatingHead.svelte";
</script>

<section class="nutshell">
  <div class="nutshell__info">
    <h2>Moikka! Olen Juuso.</h2>
    <p>Täältä löydät tietoa minusta ja projekteistani.</p>
    <img src={me} alt="Juuso Luttinen" class="nutshell__image" />
  </div>
</section>
<!-- <section class="details">Details</section> -->
<section class="projects"><div class="projects__grid"></div></section>
<FloatingHead />

<style>
  .nutshell {
    height: 100vh;
    padding-top: 5rem;
    /* max-width: var(--site-width); */
  }

  .nutshell__info {
    max-width: var(--site-width);
    margin: 0 auto;
    padding: 5rem 2rem;
    background-color: rgb(255, 255, 255);
    border: 1px solid var(--colors-primary);
    border-radius: clamp(0px, (100cqi - 100%) * 1e5, var(--border-radiuses-lg));
    font-size: var(--font-sizes-xxl);
    font-weight: var(--font-weights-bold);
    color: var(--colors-primary);
    position: relative;
    overflow: hidden;
  }

  .nutshell__image {
    width: 100%;
    max-width: 30rem;
    position: absolute;
    bottom: -1.5rem;
    right: 2rem;
  }

  .details {
    height: calc(20rem);
    /* max-width: var(--site-width); */
    background-color: mediumslateblue;
  }

  .projects {
    height: 40rem;
    padding: 2rem;
    /* max-width: var(--site-width); */
    background-color: lightslategrey;
    &__grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
      gap: 2rem;
    }
  }
</style>

<script>
  import me from "$lib/assets/me.png";
  import head from "$lib/assets/head.png";
</script>

<section class="nutshell">
  <div class="nutshell__info">
    <h2>Moikka! Olen Juuso.</h2>
    <p>Täältä löydät tietoa minusta ja projekteistani.</p>
    <img src={me} alt="Juuso Luttinen" class="nutshell__image"/>
  </div>
</section>
<section class="details">Details</section>

<button class="floating__head"><img src={head} alt="Juuso Luttinen"/><div class="speechbubble">Psst! Täältä löydät yhteystietoni.</div></button>

<style>
  .nutshell {
    height: 100vh;
    padding-top: 5rem;
    /* max-width: var(--site-width); */
    background-color: #dfdbe5;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath opacity='.5' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/%3E%3Cpath d='M6 5V0H5v5H0v1h5v94h1V6h94V5H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
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
    background-color: lightslategray;
  }

  .floating__head {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 5rem;
    height: 5rem;
    border: none;
    box-shadow: var(--shadows-md);
    cursor: pointer;
    background: none;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .speechbubble {
    position: absolute;
    bottom: 100%;
    right: 0;
    margin-bottom: 1rem;
    padding: 0.5rem 1rem;
    background-color: var(--colors-white);
    color: var(--colors-background);
    border-radius: var(--border-radiuses-md);
    font-size: var(--font-sizes-sm);
    font-weight: var(--font-weights-medium);
    white-space: nowrap;
    opacity: 1;
    transform: translateY(10px);
    transition: opacity 0.3s ease, transform 0.3s ease;
  }
</style>

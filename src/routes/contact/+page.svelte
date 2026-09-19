<script lang="ts">
  import { asset } from "$app/paths";
  import ContactButtons from "$lib/components/ContactButtons.svelte";
  import ProfileCircle from "$lib/components/ProfileCircle.svelte";
</script>

<!-- <div class="space-on-mobile"></div> -->

<div class="info-container h-padding">
  <div class="info">
    <div style="width: 100%;"><h2 class="view-title">Yhteystiedot</h2></div>
    <ProfileCircle imageSrc={"/images/me (Small).png"} outlined />
    <div class="title-buttons-container">
      <span class="find-me-text ibm-plex-mono">Löydät minut täältä:</span>
      <div class="contact-buttons">
        <ContactButtons />
      </div>
    </div>

    <!--     <article class="info-box"></article> -->
  </div>
</div>

<style>
  .info-container {
    width: 100%;
    height: calc(100svh - var(--navbar-height));
    display: flex;
    align-items: center;
/*
    transform: translateY(-3rem); */
    /*     border: 1px solid red; */
  }

  .info {
    max-width: 40rem;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    /*     background-color: red; */
    height: min-content;
    width: 100%;
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
  }

  .contact-buttons {
    container-type: inline-size;
    width: 100%;
  }

  .find-me-text {
    width: 100%;
    padding: 0 1rem;
  }
  .title-buttons-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background-color: var(--colors-elevation-2);
    padding: 1rem 0.5rem;
    border-radius: var(--border-radiuses-md);
    box-shadow: var(--shadows-xs);
  }
</style>

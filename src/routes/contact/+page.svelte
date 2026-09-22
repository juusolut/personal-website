<script lang="ts">
  import { asset } from "$app/paths";
  import ContactButtons from "$lib/components/ContactButtons.svelte";
  import ProfileCircle from "$lib/components/ProfileCircle.svelte";
</script>

<!-- <div class="space-on-mobile"></div> -->

<div class="info-container h-padding">
  <div class="info">
    <div style="width: 100%; margin-left: 1rem;">
      <h2 class="view-title no-bg">Yhteystiedot</h2>
    </div>
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
    /*     height: calc(100svh - var(--navbar-height)); */
    display: flex;
    align-items: center;
    /*
    transform: translateY(-3rem); */
    /*     border: 1px solid red; */
    margin-top: 3rem;
  }

  .info {
    max-width: 40rem;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    height: min-content;
    width: 100%;
    background-color: var(--colors-elevation-2);
    padding: 1rem 0.5rem;
    border-radius: var(--border-radiuses-md);
    box-shadow: var(--shadows-xs);
  }

  .contact-buttons {
    container-type: inline-size;
    container-name: contact-buttons;
    width: 100%;
  }

  .find-me-text {
    width: 100%;
    padding: 0 1rem;
  }
  .title-buttons-container {
    display: flex;
    flex-direction: column;
    gap: .5rem;
    width: 100%;
    > span {
/*       background-color: green; */
      width: 100%;
    }
  }
</style>

<script lang="ts">
  import { asset } from "$app/paths";
  import Tags from "$lib/components/Tags.svelte";

  let { data } = $props();
</script>

<div class="info-container h-padding">
  <div class="info">
    <h2 class="view-title">Kuka olen?</h2>
    <article class="info-box">
      <!--       <img
        class="sitting"
        src={asset("/images/sitting.png")}
        alt="Juuso Luttinen"
      /> -->
      <div class="profile-image-container waves-pattern">
        <div class="both-images">
          <img
            class="image-top"
            src={asset("/images/me.png")}
            alt="Juuso Luttinen"
          />
          <div class="image-bottom">
            <img
              class="profile-image"
              src={asset("/images/me.png")}
              alt="Juuso Luttinen"
            />
          </div>
        </div>
      </div>
      <div class="content">
        <!--         <h3>Kuka olen?</h3> -->
        <p>
          Hei! Olen Juuso, 27-v. Asun <b>Oulussa</b> ja olen valmistunut
          luonnontieteiden kandidaatiksi <b>tietojenkäsittelytieteistä</b>. Olen
          opiskellut <b>Oulun yliopistolla</b>. Työskentelen tällä hetkellä
          <b>Postilla</b> ja vapaa-aikani kuluu kuntosalin, frisbeegolfin ja erilaisten
          luovien projektien parissa; ohjelmoin mm. verkkosivuja ja pelejä, sävellän
          konemusiikkia, teen digitaalista taidetta ja päädyn joskus käsitöidenkin
          pariin. Tunnollisuus ja ahkeruus ovat minulle tosi tärkeitä arvoja, joita
          tasapainottaa rennon maanläheinen asenne elämään. Olen erittäin oma-aloitteinen
          ja helposti lähestyttävä tyyppi niin töissä kuin vapaa-ajalla.
        </p>
      </div>
    </article>
  </div>
</div>

<div class="skills-container h-padding">
  <div class="skills section-content">
    <h2 class="view-title no-bg">Mitä osaan?</h2>
    <p>
      Taitoni on painottunut frontend-suunnitteluun ja toteutukseen, mutta
      backend-kehitys kiinnostaa myös. Tässä teknologioita, joita olen käyttänyt
      projekteissani:
    </p>
    <div class="tags"><Tags tags={data.tags} /></div>
    <br />
    <p>Tässä ohjelmointikieliä, joista minulla on kokemusta:</p>
    <ul class="programming-langugage-list">
      <li>Javascript/Typescript</li>
      <li>Python</li>
      <li>C</li>
      <li>Java</li>
      <li>Dart</li>
      <li>GDScript</li>
    </ul>
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
      background: linear-gradient(
        135deg,
        color-mix(in srgb, var(--colors-primary) 80%, #ffffff) 0%,
        var(--colors-secondary) 55%,
        color-mix(in srgb, var(--colors-secondary) 75%, #a855f7) 100%
      );
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
      background: radial-gradient(
        circle at 75% 50%,
        color-mix(
            in oklab,
            var(--colors-primary),
            var(--colors-elevation-2) 94%
          )
          5%,
        var(--colors-elevation-2) 60%
      );
      border-radius: var(--border-radiuses-lg);
      border: 2px solid
        color-mix(
          in oklch,
          var(--colors-secondary),
          var(--mix-shading) var(--border-strength-2)
        );
      top: 0;
      left: 0;
      z-index: -1;
    }
  }

  .content {
    order: 2;
    > p {
    }
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
    background-color: var(--colors-secondary);
    border-radius: 100%;
    position: relative;
    width: 50%;
    max-width: 15rem;
    aspect-ratio: 1 / 1;
    order: 1;
    justify-self: center;
  }

  .both-images {
    aspect-ratio: 1 / 1;
    border-radius: 100%;
    position: relative;
    width: 100%;
    order: 1;
    justify-self: center;
  }

  .image-top {
    position: absolute;
    border-radius: 100%;
    width: 150%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    clip-path: inset(0 0 50% 0);
  }

  .image-bottom {
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

  .skills-container {
    background-color: var(--colors-elevation-2);
    padding: 4rem 0;
  }

  .skills {
    height: 40rem;
    padding: 0 0.5rem;
  }

  .tags {
    background-color: var(--colors-elevation-3);
    padding: 1rem;
    border-radius: var(--border-radiuses-sm);
    border: 1px solid
      color-mix(
        in oklch,
        var(--colors-elevation-3),
        var(--border-mix-shading) var(--border-strength-1)
      );
    width: 100%;
    max-width: 40rem;
  }

  .programming-langugage-list {
    color: var(--colors-text);
  }

  @container (width > 50rem) {
    .info-box {
      grid-template-columns: 2fr 1fr;
    }

    .content {
      order: 1;
      align-self: center;
    }

    .profile-image-container {
      order: 2;
      width: 100%;
      align-self: center;
    }
  }
</style>

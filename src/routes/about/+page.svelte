<script lang="ts">
  import { asset } from "$app/paths";
  import Tags from "$lib/components/Tags.svelte";

  let { data } = $props();

  const workplaces = [
    {
      place: "Posti Group Oyj",
      jobTitle: "Postityöntekijä Oulussa",
      tasks: ["Kirjepostin lajittelu", "Pakettien lajittelu", "Kuljetusyksiköiden ja lavojen siirto (pitkäpiikkisellä) lavansiirtovaunulla", "Perehdytystehtävät"],
      timePeriod: ["7.12. – 18.12.2020", "X.5.2021 –"],
    },
    {
      place: "Kiinteistöhuolto ja siivouspalvelu Ilkka Hyytinen",
      jobTitle: "Kausiapulainen Kärsämäellä",
      tasks: ["Yksityisten viheralueiden hoito", "Liikennemerkkien vaihto", "Asfalttiteiden paikkaus", "P-pysäkkien puhtaus", "Muut satunnaiset työtehtävät"],
      timePeriod: "",
    },
    {
      place: "Ruotsalainen Virpi / 4H",
      jobTitle: "Kausiapulainen Kärsämäellä",
      tasks: ["Kotitalouden viheralueiden hoito", "Erilaiset maatilan tehtävät"],
      timePeriod: "",
    },
    {
      place: "Kärsämäen kunta / 4H",
      jobTitle: "Nurmikonleikkaaja Kärsämäellä",
      tasks: ["Kunnan viheralueiden hoito"],
      timePeriod: "1. – 12.6.2015",
    },
    {
      place: "Kärsämäen kunta / 4H",
      jobTitle: "Keittiöapulainen Kärsämäellä",
      tasks: ["Siivoaminen ja ruokahuolto"],
      timePeriod: "30.6. – 11.7.2014",
    },
    {
      place: "Työelämään tutustuminen / 5 päivää per työpaikka",
      jobTitle: "Tettiläinen Kärsämäellä",
      tasks: ["Veikon Kone", "Laaksojen Rauta Oy", "Venetpalon alakoulu"],
      timePeriod: "",
    },
  ];
</script>

<div class="space-on-mobile"></div>

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
        <p>
          Hei! Olen Juuso, 27-vuotias <b>luonnontieteiden kandidaatti</b>
          Oulusta. Olen opiskellut
          <b>Oulun yliopistossa tietojenkäsittelytieteitä</b>
          ja työskentelen tällä hetkellä
          <b>Postilla</b>. Vapaa-ajallani käytän luovuuttani monipuolisesti:
          koodaan <b>verkkosivuja</b> ja <b>pelejä</b>, sävellän musiikkia sekä
          teen digitaalista taidetta. Vastapainona ruudun ääressä työskentelylle
          käyn kuntosalilla ja frisbeegolfaamassa, ja joskus päädyn myös
          käsitöiden tai paritanssin pariin.
          <br /><br />Tunnollisuus ja ahkeruus ovat minulle tärkeitä arvoja,
          joita kuitenkin tasapainottaa rento ja maanläheinen asenne elämään.
          Pyrin siihen että hommat hoituvat tehokaasti ja huolellisesti. Olen
          oma-aloitteinen, joustava ja mutkaton tyyppi: kanssani on helppo
          toimia, ja olen helposti lähestyttävä niin töissä kuin vapaa-ajalla.
        </p>
      </div>
    </article>
  </div>
</div>

<div class="skills-container h-padding">
  <div class="skills section-content">
    <h2 class="view-title no-bg">Osaamiseni</h2>
    <p>
      Osaamiseni on painottunut frontend-kehitykseen ja UI-suunnitteluun, mutta
      minulta löytyy myös vahva kiinnostus backend-kehitystä kohtaan. Olen
      utelias oppija ja pyrin jatkuvasti laajentamaan teknistä osaamistani.
      Tässä teknologioita, joita olen käyttänyt projekteissani:
    </p>
    <div class="tags"><Tags tags={data.tags} /></div>
    <br />
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
    <br />
    <p>Hallitsen työskentelyn sekä Windows- että Linux-ympäristöissä.</p>
  </div>
</div>

<div class="work-history__container h-padding">
  <div class="work-history__inner section-content">
    <h2 class="view-title">Työhistoria</h2>
    <ul class="workplaces">
      <li class="workplace highlighted" style="--offset-left: 3rem;">
        <span class="current-job">Tämänhetkinen työtehtävä</span>
        <ul class="workplace-details">
          <strong>Posti</strong> / 20XX –
          <li>Paketti- ja kirjelajittelutehtävät</li>
        </ul>
      </li>
      <li class="workplace" style="--offset-left: 6rem;">
        <strong>Kiinteistöhuolto ja Siivouspalvelu Ilkka Hyytinen</strong> / 20XX
        –
      </li>
      <li class="workplace" style="--offset-left: 8rem;">
        <strong>Luonnon syli</strong>/ 20XX –
      </li>
    </ul>
  </div>
</div>

<style>
  .info-container {
    width: 100%;
    padding: 0rem 0;
    padding-bottom: 5rem;
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
    padding: 4rem 0rem;
    border-bottom: 1px solid
      color-mix(
        in oklch,
        var(--colors-elevation-2),
        var(--border-mix-shading) var(--border-strength-1)
      );
    border-top: 1px solid
      color-mix(
        in oklch,
        var(--colors-elevation-2),
        var(--border-mix-shading) var(--border-strength-1)
      );
  }

  .skills {
    padding: 0 0.5rem;
    height: auto;
    > h2 {
      margin-bottom: 1rem;
    }
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

  .work-history__inner {
    padding: 4rem 0.5rem;
  }

  .programming-langugage-list {
    color: var(--colors-text);
    background-color: var(--colors-elevation-3);
    padding: 1rem;
    padding-left: 2rem;
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

  .workplaces {
    --offset-left: 6rem;

    list-style-type: none;
    margin: 0;
    padding: 0;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 4rem;
    margin: 2rem 0;
    padding-top: 4rem;
    padding-bottom: 4rem;
    margin-left: 1rem;

    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 2px;
      height: 100%;
      background: linear-gradient(
        to bottom,
        transparent 0%,
        var(--colors-secondary) 10%,
        var(--colors-secondary) 90%,
        transparent 100%
      );
    }
  }

  .workplace {
    padding: 2rem 2rem;
    margin-left: var(--offset-left);
    position: relative;
    font-size: var(--font-sizes-sm);
    width: fit-content;
    background-color: var(--colors-elevation-2);
    box-shadow: var(--shadows-xs);
    border-radius: var(--border-radiuses-sm);
    border: 1px solid
      color-mix(
        in oklch,
        var(--colors-elevation-2),
        var(--border-mix-shading) var(--border-strength-1)
      );

    &.highlighted {
      border-color: var(--colors-secondary);
      border-width: 2px;
      border-top-left-radius: 0;
      border-top-right-radius: 0;
    }

    &::before {
      content: "";
      position: absolute;
      top: 50%;
      transform: translateY(-50%) translateX(0px);
      width: var(--offset-left);
      height: 2px;
      background-color: var(--colors-secondary);
      right: 100%;
    }

    &::after {
      content: "";
      position: absolute;
      top: 50%;
      transform: translateY(-50%) translateX(0px);
      width: 1rem;
      height: 1rem;
      background-color: var(--colors-secondary);
      right: calc(100% - 0.5rem);
      border-radius: 100%;
    }
  }

  .workplace-details {
    margin: 0;
    padding: 0;
    > li {
      margin-left: 1rem;
    }
  }

  .current-job {
    position: absolute;
    bottom: 100%;
    left: -2px;
    width: calc(100% + 4px);
    background-color: var(--colors-secondary);
    padding: 0.5rem;
    border: 2px solid var(--colors-secondary);
    border-top-left-radius: var(--border-radiuses-sm);
    border-top-right-radius: var(--border-radiuses-sm);
    /*     text-transform: uppercase; */
    font-weight: var(--font-weights-bold);
    font-size: var(--font-sizes-sm);
    text-align: center;
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

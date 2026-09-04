<script lang="ts">
  import { asset } from "$app/paths";
  import Tags from "$lib/components/Tags.svelte";
  import Icon from "$lib/components/Icon.svelte";
  import Workplace from "$lib/components/Workplace.svelte";
  import WorkHistory from "$lib/components/WorkHistory.svelte";

  let { data } = $props();

  const newData: string[] = [...data.tags, "MongoDB"];

  const workplaces: {
    workplace: string;
    jobTitle: string;
    tasks: string[];
    timePeriod: string[];
    currentJob?: boolean;
  }[] = [
    {
      workplace: "Posti Group Oyj",
      jobTitle: "Postityöntekijä Oulussa",
      tasks: [
        "Kirjeiden ja pakettien lajittelu",
        "Kuljetusyksiköiden käsittely ja siirto lavansiirtovaunulla",
        "Uusien työntekijöiden perehdyttäminen",
      ],
      timePeriod: ["7.12. – 18.12.2020", "X.5.2021 –"],
      currentJob: true,
    },
    {
      workplace: "Kiinteistöhuolto ja siivouspalvelu Ilkka Hyytinen",
      jobTitle: "Kausiapulainen Kärsämäellä",
      tasks: [
        "Viheralueiden hoito ja kunnossapito",
        "Liikennemerkkien vaihto",
        "Asfalttiteiden paikkaus",
        " P-alueiden puhtaanapito",
        "Muut satunnaiset kiinteistöhuoltotyöt",
      ],
      timePeriod: [],
    },
    {
      workplace: "Ruotsalainen Virpi / 4H",
      jobTitle: "Kausiapulainen Kärsämäellä",
      tasks: [
        "Kotitalouden viheralueiden hoito",
        "Taimien istutus",
        "Traktorin käyttö",
        "Muut maatilan tehtävät",
      ],
      timePeriod: [],
    },
    {
      workplace: "Kärsämäen kunta / 4H",
      jobTitle: "Nurmikonleikkaaja Kärsämäellä",
      tasks: ["Kunnan viheralueiden hoito"],
      timePeriod: [],
    },
    {
      workplace: "Kärsämäen kunta / 4H",
      jobTitle: "Keittiöapulainen Kärsämäellä",
      tasks: ["Siivoaminen ja avustavat keittiötyöt"],
      timePeriod: [],
    },
    {
      workplace: "Työelämään tutustuminen / 5 päivää per työpaikka",
      jobTitle: "Tettiläinen Kärsämäellä",
      tasks: [
        "Veikon Kone (2015)",
        "Laaksojen Rauta Oy (2014)",
        "Venetpalon alakoulu (2014)",
      ],
      timePeriod: [],
    },
  ];

  let showMore = $state(false);

  function handleShowMoreClick(e) {
    showMore = !showMore;
  }
</script>

<div class="space-on-mobile"></div>

<div class="info-container h-padding">
  <div class="info">
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
        <h2 class="view-title no-bg">Pähkinänkuoressa</h2>
        <p>
          Hei! Olen Juuso, 27-vuotias <b>luonnontieteiden kandidaatti</b>
          Oulusta. Olen opiskellut
          <b>tietojenkäsittelytieteitä Oulun yliopistossa </b>
          ja työskentelen tällä hetkellä
          <b>Postilla</b>. Vapaa-ajalla käytän luovuuttani monipuolisesti:
          koodaan <b>verkkosivuja</b> ja <b>pelejä</b>, sävellän musiikkia sekä
          teen digitaalista taidetta. Vastapainona ruudun ääressä työskentelylle
          harrastan kuntosalia ja frisbeegolfia, ja joskus päädyn myös
          käsitöiden tai paritanssin pariin.
          <br /><br />Tunnollisuus ja ahkeruus ovat minulle tärkeitä arvoja,
          joita kuitenkin tasapainottaa rento ja maanläheinen asenne elämään.
          Pyrin siihen että hommat hoituvat tehokkaasti ja huolellisesti. Olen
          oma-aloitteinen, joustava ja mutkaton tyyppi: kanssani on helppo
          toimia, ja olen helposti lähestyttävä niin töissä kuin töiden
          ulkopuolella. Ura IT-alalla kiinnostaa ja odotankin jo innolla mitä
          tulevaisuus tuo tullessaan!
        </p>
        <a
          href={asset("/resume.pdf")}
          target="_blank"
          rel="noopener noreferrer"
          class="to-light-cv offsite-link"
        >
          Avaa CV
        </a>
        <a
          href={asset("/resume-dark.pdf")}
          target="_blank"
          rel="noopener noreferrer"
          class="to-dark-cv offsite-link"
        >
          Avaa CV
        </a>
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
    <div class="tags"><Tags tags={newData} /></div>
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
    <p>
      Hallitsen työskentelyn sekä <b>Windows-</b> että
      <b>Linux-ympäristöissä</b>. Linux-ympäristöistä tutuimpia ovat Ubuntu ja
      Linux Mint.
    </p>
  </div>
</div>

<div id="work-history__container" class="h-padding" class:expanded={showMore}>
  <WorkHistory />
  <div id="gradient-box">
    <button id="show-more-button" onclick={handleShowMoreClick}>
      {showMore ? "Näytä vähemmän" : "Näytä lisää"}
      <div class:flipped={showMore}><Icon name="CaretDown" size="1rem" /></div>
    </button>
  </div>
</div>

<div id="studies" class="h-padding" class:expanded={showMore}>
  <div id="studies__inner" class="section-content">
    <h2 class="view-title">Koulutukset</h2>
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
    > h2 {
      margin-bottom: 1rem;
    }
    > a {
      color: var(--colors-primary);
    }
  }

  .to-dark-cv,
  .to-light-cv {
    margin-top: 2rem;
    display: inline-block;
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

  #work-history__container {
    position: relative;
    max-height: 50rem;
    overflow: hidden;

    &.expanded {
      max-height: unset;
      padding-bottom: 8rem;
      #gradient-box {
        height: auto;
      }
    }
  }

  #gradient-box {
    width: 100%;
    background: linear-gradient(
      to bottom,
      transparent 0%,
      var(--colors-elevation-1) 50%
    );
    display: flex;
    justify-content: center;
    align-items: flex-end;
    padding-bottom: 1rem;
    height: 10rem;
    position: absolute;
    left: 0;
    bottom: 0;
  }

  #show-more-button {
    height: min-content;
    padding: 0.5rem 2rem;
    border-radius: var(--border-radiuses-md);
    color: var(--colors-text);
    background-color: var(--colors-secondary);
    border: 1px solid
      color-mix(
        in oklab,
        var(--colors-secondary),
        var(--border-mix-shading) var(--border-strength-1)
      );
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }

  .flipped {
    transform: rotate(180deg);
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

  #studies__inner {
    padding: 4rem 0;
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

<script lang="ts">
  import Workplace from "./Workplace.svelte";

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
</script>

<div class="work-history__inner section-content">
  <h2 class="view-title">Työhistoria</h2>
  <ul class="workplaces">
    {#each workplaces as workplace, index}
      <Workplace
        workplace={workplace.workplace}
        jobTitle={workplace.jobTitle}
        tasks={workplace.tasks}
        timePeriod={workplace.timePeriod}
        currentJob={workplace.currentJob}
        offsetLeft={`${2 + index * 1}rem`}
      />
    {/each}
  </ul>
</div>

<style>
  .work-history__inner {
    margin-top: 4rem;
    position: relative;
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
    padding-top: 4rem;
    margin-left: 0rem;

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
</style>

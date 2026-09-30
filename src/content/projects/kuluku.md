---
title: "Kuluku"
slug: "kuluku"
description: "Alusta, jolla yksityishenkilöt voivat myydä ja ostaa kulkuneuvoja kaksipyöräisistä työkoneisiin."
thumbnail: "/images/processed/kuluku-thumb.webp"
tags: ["React", "Dotnet", "Mailhog", "Docker", "MicrosoftSQLServer", "GSAP"]
isShowcased: true
date: "2026-1-1"
---

<script lang="ts">
    import Summary from "$lib/components/Summary.svelte";
    import VideoPlayer from '$lib/components/VideoPlayer.svelte';
    import Gallery from '$lib/components/Gallery.svelte';

    const summaryData = [
        {
            title: "Tausta ja idea",
            content: "Kahden kehittäjän yhteisprojekti. Tavoitteena oppia uutta ja tehdä erilaisten kulkupelien (autot, pyörät, moottoripyörät, työkoneet) kauppapaikka."
        },
        {
            title: "Teknologiat",
            content: "Frontend: React. Backend: .NET. Tietokanta: Microsoft SQL Server. Muuta: Docker ja Mailhog."
        },
        {
            title: "Ominaisuudet ja UI",
            content: "Käyttäjätilit, sähköpostitodennus, ilmoitusten selaus ja luonti, suosikit ja viestintä. Monikielisyys (FI/SV/EN), teemat (tumma/vaalea), mobiililähtöinen responsiivinen muotoilu ja GSAP-animaatiot."
        },
        {
            title: "Nykytila ja jatko",
            content: "Käyttäjätilien perustoiminnot ja suosikit toimivat. Seuraavaksi vuorossa ilmoitusten luonti, suodatuksen toteutus, viestintä ja käyttäjätietojen muokkaus. Kohti MVP:tä pikkuhiljaa."
        }
    ];

    const path = "/images/kuluku"
    const rawImages = [
        {
        imageSrc: "kuluku-landing.webp",
        thumbSrc: "",
        description: "Sivuston landing-näkymä."
        },
        {
        imageSrc: "kuluku-login.webp",
        thumbSrc: "",
        description: "Kirjautumiselementti."
        },
        {
        imageSrc: "kuluku-register.webp",
        thumbSrc: "",
        description: "Rekisteröitymiselementti. Syötekenttien verifiointia."
        },
        {
        imageSrc: "kuluku-create-listing.webp",
        thumbSrc: "",
        description: "Ilmoituksen luonti -elementti."
        },
        {
        imageSrc: "kuluku-edit-email.webp",
        thumbSrc: "",
        description: "Sähköpostin vaihto -elementti."
        },
        {
        imageSrc: "kuluku-listing.webp",
        thumbSrc: "",
        description: "Ilmoituselementti."
        },
    ];

  const galleryData = rawImages.map((img) => ({
  imageSrc: `${path}/${img.imageSrc}`,
  thumbSrc: `${path}/${img.thumbSrc}`,
  description: img.description
}));

</script>

<Summary data={summaryData} />

## Mistä projekti sai alkunsa?

Olimme miettineet ystäväni kanssa jo pitkään, että yhdistäisimme voimamme ja alkaisimme työstämään jotain pykäkää laajempaa projektia. Aiemmat omat projektini olivat olleet pienempiä, joten mahdollisuus syventyä monimutkaisempaan kokonaisuuteen yhdessä toisen kehittäjän kanssa tuntui innostavalta. Yhteistyö tuntui myös loistavalta tilaisuudelta haastaa itseä ja ottaa haltuun uusia teknologioita. Ystävälläni oli tässä vaiheessa jo useamman vuoden kokemus alalta, mistä olisi merkittävä hyöty projektin ja oman oppimisen kannalta.

### Idea: Ajoneuvojen markkinapaikka (Kuluku)

Pohtiessamme nettisivun ideaa huomasimme että Suomessa ei ole montaa palvelua, jotka mahdollistaisivat autojen myynnin yksityishenkilöltä toiselle. Lähdimme rakentamaan nettisivua siis siltä pohjalta, että siellä voisi myydä ja ostaa käytettyjä autoja. Myöhemmin laajensimme ideaa niin että muidenkin kulkupelien – kuten pyörien ja työkoneiden – myyminen olisi mahdollista. Tämä toisi mukavasti haastetta frontendin, backendin ja tietokannan suunnitteluun. Haastetta toisi myös käyttäjätilien ja niihin liittyvien perusominaisuuksien luonteva ja tietoturvallinen toteutus.

<VideoPlayer videoSrc="/videos/kuluku/kuluku.webm" posterSrc="/images/kuluku/kuluku-thumb.webp" description="Kulukun frontendin esittelyä."  />

## Teknologiavalinnat

Valintamme frontiksi oli tuttu ja turvallinen: <b>React</b>. Backend-ratkaisuksi ja tietokannaksi valikoituivat <b>.NET</b> ja <b>Microsoft SQL Server</b>, joista projektikumppanillani oli ennestään kokemusta. Sähköpostiviestinnän testaamiseen valitsimme <b>Mailhog</b>-ohjelman ja <b>Dockeria</b> hyödynsimme siihen, että voisimme ajaa Mailhogia kätevästi. Teimme backendille myös Docker-kontin, jotta sitä olisi mahdollista käyttää frontin kehityksessä Linux-koneellani. Dockeria olisi tarkoitus käyttää myöhemmin myös tuotannossa, jos sovelluksemme sinne asti pääsee.

## Toiminnallisuus

Jotta sivu olisi toimiva, siihen täytyy toteuttaa...

### 1. Perusominaisuuksia:

- Uuden tilin luonti ja sähköpostiosoitteen vahvistus
  - Uusi tili sähköpostilla tai Gmaililla tms.
- Sisäänkirjautuminen
- Unohtuneen salasanan vaihto
- Omien tietojen muokkaaminen (perustiedot, salasana, sähköpostiosoite jne.)
- Ilmoitusten selaaminen

### 2. Kirjautuneille saatavilla olevia ominaisuuksia:

- Ilmoitusten luonti ja hallinnointi
- Suosikit
- Viestittely myyjien ja kiinnostuneiden ostajien kanssa

### 3. QoL-ominaisuuksia:

- Kielen vaihto suomen, ruotsin ja englannin kielen välillä <br> (sekä käyttäjän osoitepolun säilyttäminen kielenvaihdon yhteydessä!)
- Tumma ja vaalea teema, joka määräytyy käyttäjän mieltymysten mukaan
- Helppokäyttöisyys (sivuston selkeys, näppäimistönavigaatio)

## Käyttöliittymästä

Sovellusta on kehitetty mobiililähtöisesti, jotta ilmoitusten selaaminen ja luominen olisi mahdollisimman vaivatonta puhelimella. Käyttöliittymä on siis suunniteltu ensin kapeille näytöille, ja sen elementit laajenevat responsiivisesti näytön koon mukaan. <b>GSAP</b>-animaatiokirjastolla on tarkoitus tuoda ripaus moderniutta ja selkeyttä käyttöliittymän toimintoihin. Tässä joitain kuvia nykyisestä UI:sta:

<Gallery data={galleryData}/>

Alla responsiivisuutta esiteltynä. Kapeammassa koossa ylänavigointipalkki muuttuu alanavigointipalkiksi, jolloin navigointi sormilla on helpompaa. Kapealla näytöllä keskeneräinen toiminto peittää koko näkymän, jotta keskittyminen oleelliseen asiaan olisi helpompaa.

<VideoPlayer videoSrc="/videos/kuluku/kuluku-responsiveness.webm" posterSrc="/images/kuluku/kuluku-thumb.webp" description="Ilmoituksen luomisnäkymän responsiivisuus."  />

## Mitä seuraavaksi?

Tileihin liittyvät perusominaisuudet ovat ihan hyvällä mallilla. Tilin voi luoda, vahvistaa ja sille voi kirjautua. Unohtuneen salasanan voi vaihtaa. Omien tietojen muokkaamiseen liittyvät API-endpointit täytyy vielä toteuttaa ja tietenkin myös niihin liittyvät frontin lomakkeet. Ilmoitusten filtteröinti puuttuu myös kokonaan, mutta meillä on sen toteutukseen jo hyvät ideat.

Kirjautuneiden käyttäjien ominaisuudet ovat vielä vaiheessa; suosikkeja pystyy lisäämään ja poistamaan, mutta viestittely ja ilmoitusten luominen puuttuu.

MVP-tuotteeseen on siis vielä matkaa. Tiedostimme jo alussa että kaikki ei tapahdu salamannopeasti, ja se on ok. Projekti alkoi harrastusmielessä, joten ei haittaa, vaikka kehityksessä kestääkin.

Jos tuotantovaihe joskus koittaa, tuo se mukanaan tietty omat ongelmansa: skaalautuvuus, SEO, median hostaaminen, tietoturva ja lainsäädäntöön liittyvät asiat (evästeet, GDPR jne.). Näitä mietitään tarkemmin sitten, mutta ne on tietenkin hyvä sisäistää jossain määrin jo nyt.

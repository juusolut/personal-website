---
title: "Factory"
slug: "factory"
description: "P2P-verkkoräiskintäpeli, johon haettu inspiraatiota Source-peleistä."
thumbnail: "/images/factory/factory-thumb.webp"
tags: ["Godot", "Blender", "FL Studio"]
isShowcased: true
date: "2025-1-1"
---

<script lang="ts">
    import VideoPlayer from '$lib/components/VideoPlayer.svelte';
    import Summary from "$lib/components/Summary.svelte";

    const summaryData = [
  {
    title: "Mikä kyseessä",
    content: "Godot-pelimoottorilla kehitteillä oleva FPS-moninpelipohja, joka ammentaa pelituntumaa ja mekaniikkoja Source-moottorin peleistä."
  },
  {
    title: "Tavoite",
    content: "Luoda uudelleenkäytettävä runko tuleville projekteille: sulava liikkumis- ja animaatiojärjestelmä, ase- ja esinepohjat, UI-arkkitehtuuri"
  },
  {
    title: "Verkkokoodi",
    content: "Server-authoritative -rakenne, jossa hyödynnetään client-side predictionia, reconciliationia, lag compensationia ja entity interpolationia sulavan pelikokemuksen luontiin."
  },
  {
    title: "Seuraavat askeleet",
    content: "Verkkokoodin optimointi korkealle viiveelle, logiikan siirtäminen GDScriptistä C#- kielelle suorituskyvyn parantamiseksi sekä Steam-integraatio."
  }
];
</script>

<Summary data={summaryData} />

## Factory: the Game

Factory on työn alla oleva FPS-peliprojektini, johon olen hakenut inspiraatiota Source-pelimoottoria käyttävistä peleistä (kuten Counter Strike ja Half-Life), sillä olen aina pitänyt niiden pelituntumasta. Otin haasteekseni toteuttaa pelin moninpelinä ja halusin implementoida siihen Source-peleistä tuttuja ratkaisuja ja verkkomekaniikoita. Valitsin pelimoottoriksi <a href="https://godotengine.org/">Godotin</a> sen keveyden ja avoimen lähdekoodin takia.

<VideoPlayer videoSrc="/videos/factory/factory.webm" posterSrc="/images/factory/factory-thumb.webp" description="Testipelailua."  />

### Tavoite

Tavoitteenani on rakentaa toimiva pelipohja, jota voin hyödyntää tulevissa projekteissani. Pohjaa varten toteutan seuraavat ominaisuudet:

- Pelihahmon miellyttävän ja sulavan tuntuinen liikkuminen
    - Perusliikkuminen
    - Hyppääminen
    - Liikkuminen kyykyssä
    - Hyppääminen kyykyssä
    - Animaatiojärjestelmä liikkumiselle
- Ase- ja esinejärjestelmät
    - Aseiden "spray patternit"
    - Uudelleenkäytettävä asepohja
    - Uudelleenkäytettävä esinepohja<span class="cross">✖</span>
- Verkkokoodi ja pelitapahtumien replikointi
    - Authoritative Server
    - Client-side Prediction
    - Reconciliation
    - Lag Compensation<span class="cross">✖</span>
    - Entity Interpolation
- Käyttöliittymän perusrakenteet ja logiikka
    - UI State Machine
    - Uudelleenkäytettävät UI-elementit
    - Ympäristö- ja hahmoäänet

Nämä ominaisuudet on jo jossain määrin saatettu alulle, mutta viilausta tarvitaan vielä paljon. <span class="cross">✖</span>-merkillä merkittyjä asioita ei ole vielä toteutettu ollenkaan.

## Verkkokoodista...

Koska pelisessio pyörii serverillä ja siihen yhdistetyillä clienteillä, siitä on olemassa ikään kuin useampi versio: serverin headless-versio ja peliclienttien omat toisistaan jonkin verran eroavat näkemykset pelitapahtumista (viiveen takia). Tämän takia tarvitaan tekniikoita, jotka tasapainottavat peliä ja tekevät pelaamisesta miellyttävämmän tuntoista.

### 1. Serverin päätösvalta

Lähdin toteuttamaan peliin <b>server authoritative</b> -rakennetta. Tämä tarkoittaa sitä että serverillä on ehdoton päätösvalta pelin tapahtumiin ja se ei luota clienttiin juurikaan. Serveriin yhdistänyt clientti ei siis lähetä omia sijaintitietojaan serverille vaan se lähettää sille näppäimistö- ja hiirisyötteensä, joiden perusteella serveri laskee sitten lopputuloksen ja palauttaa sen clientille.

### 2. Client Side Prediction

Clientit eivät kuitenkaan odota vastauksia, koska niiden odottelu johtaisi todella katkonaiseen ja siten epämiellyttävään pelikokemukseen viiveen takia. <b>Client side predictionin</b> mukaisesti pelaajan liikkumiseen liittyvä koodi – joka on sama kuin serverillä – ajetaan lokaalisti peliclientissä ja pelaaja liikkuu näytöllä sen laskelmien mukaan.

Jos pelaajan sijainti sitten ylittää tietyn thresholdin eli sijainti poikkeaa serverin laskemasta sijainnista riittävän paljon, sijainti korjataan mahdollisimman huomaamattomasti. Korjaus tapahtuu <b>Server Reconciliation</b> -menetelmällä: yhden ruudunpäivityksen aikana pelaaja teleportataan korjattuun sijaintiin, jonka jälkeen pelaajan aikaisemmat syötteet ajetaan nykyhetkeen asti. Tämä minimoi korjauksesta aiheutuvaa visuaalista häiriötä pelaajalle.

### 3. Lag Compensation

Kun pelaaja ampuu liikkuvaa vastustajaa, todellisuudessa hän saattaa ampua hänestä ohi, sillä viiveen takia pelaaja näkee toisen pelaajan vanhassa sijainnissa. Vastustaja voi siis oikeasti olla liikkunut ruudulla jo 50 pikseliä aseen lauetessa. Kun pelaaja ei sitten osu vastustajaan – joka oli varmasti nalkissa – hän turhautuu. Tämän takia tarvitaan <b>Lag Compensaatiota</b>.

Lag Compensaatio toimii niin että serveri pitää kirjaa clienttien viiveistä ja puskuroi pelaajien sijainnit. Kun jokin pelaaja tekee operaation, jolla voi olla vaikutusta toiseen pelaajaan (esimerkiksi ampuu), serveri menee historiassa taaksepäin ampuneen pelaajan viiveen verran ja suorittaa ampumisen. Näin pelaaja osuu kohteeseensa viiveestä huolimatta.

### 4. Entity Interpolation

Serverin päivitysnopeudesta johtuen pelaaja näkee ruudullaan liikkuvat viholliset katkonaisesti. Jos pelaajan ruutu päivittyy esim. 144 kertaa sekunnissa ja serveri lähettää tietoa esim. 32 kertaa sekunnissa, pelaajat liikkuvat ikään kuin teleportaten pieniä matkoja. Tämän takia toisten pelaajien sijainnit ja rotaatio täytyy interpoloida eli vanha sijainti saattaa uuteen sijaintiin vähitellen. Interpolointi lisää viivettä entisestään, mutta sen hyödyntäminen on väistämäntöntä pelikokemuksen kannalta.

## Mitä seuraavaksi?

Olen nauttinut peliprojektin monipuolisuudesta; kun on täytynyt miettiä ja toteuttaa grafiikkaa, ääntä ja koodia, on saanut hyödyntää kaikkia vuosien aikana opittuja taitoja.

Jatkoa ajatellen vielä on paljon, paljon tehtävää:
- Verkkokoodia täytyy debugata, koska korkeammalla viivellä pelaavien pelaajien sijaintien korjaus tapahtuu liian häiritsevästi (esimerkiksi pudotessa ja hyppiessä).
- Verkkokoodi on tällä hetkellä koodattu Godotin omalla GDScriptillä. Sen muuttaminen C#-koodiksi voisi tuoda suorituskykyparannuksia.
- Steam-integraatio olisi järkevä toteuttaa, jolloin pelaajien ei tarvitsisi jakaa IP-osoitteita toisilleen voidakseen pelata. Tähän on ilmeisesti olemassa Godot Steam -laajennus.

<style>
    .cross {
        padding: 0 0.25em;
        border-radius: var(--border-radiuses-sm);
        background-color: var(--colors-error);
        margin: 0 0.25rem;
    }

</style>

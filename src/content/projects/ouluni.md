---
title: "OulUni"
slug: "ouluni"
description: "HTML/CSS/JS-projekti, jossa hyödynnetty Google Maps API:a. Toteutettu ryhmätyönä Projektitoiminnan perusteet -yliopistokurssilla."
thumbnail: "/images/ouluni/thumb.png"
tags: ["HTML/CSS/JS", "Google Maps API"]
date: "2021-1-1"
---

<script>
  import { asset } from '$app/paths';
  import VideoPlayer from '$lib/components/VideoPlayer.svelte';
  import Summary from "$lib/components/Summary.svelte";

  const summaryData = [
    {
      title: "Projektin tausta ja tavoite",
      content: "Ryhmätyönä toteutettu karttasovellus uusia opiskelijoita varten. Hyödynnettiin Google Maps -rajapintaa sekä HTML-, CSS- ja JavaScript-koodia."
    },
    {
      title: "Minun roolini",
      content: "Päävastuu visuaalisesta ilmeestä, käyttöliittymäsuunnittelusta ja Maps-rajapinnan toteutuksesta; lopputuloksena pehmeä, leikkisä ja raikas ilme."
    },
    {
      title: "Places-näkymä",
      content: "Sijaintien haku ja suodatus kategorioilla tai hakukentällä. Popover-ikkuna lisätietoja ja kartalle siirtymistä varten."
    },
    {
      title: "Karttanäkymä",
      content: "Interaktiivinen kartta suodatuksella. Paikkojen klikkaaminen avaa lisätietoikkunan, josta voi navigoida kohteeseen."
    },
    {
      title: "Lopputulos",
      content: "Toiminnallinen ja visuaalisesti miellyttävä prototyyppi, joka täytti kaikki asetetut vaatimukset."
    },
  ]
</script>

<Summary data={summaryData} />

## Projektin aloitus

Kurssimme tavoitteena oli toteuttaa ryhmätyönä pieni sovellus, joka auttaisi uusia opiskelijoita löytämään relevantteja paikkoja Oulusta. Projektin keskeisenä vaatimuksena oli Google Maps -rajapinnan hyödyntäminen. Kurssiaikataulun ja suoraviivaisten vaatimuksien vuoksi päädyimme toteuttamaan sivuston ilman raskaita frameworkeja, käyttäen modernia HTML-, CSS- ja JavaScript-koodia.

## Oma rooli

Minulla oli päävastuu sivuston visuaalisesta ilmeestä, käyttöliittymäsuunnittelusta ja Maps-rajapinnan käyttöönotosta. Visuaalisessa suunnittelussa tavoittelin pehmeää, leikkisää ja helposti lähestyttävää ilmettä. Lopputuloksena syntyi selkeä, esteettinen ja raikas kokonaisuus.

<VideoPlayer videoSrc="/videos/ouluni/ouluni-frontpage.webm" posterSrc="/images/ouluni/thumb.png" description="Etusivu-näkymä. Leikkisyys näkyy esim. elävästi muotoillussa tervetulotekstissä ja värimaailmassa."  />

## Keskeiset toiminnallisuudet

### 1. Places-näkymä

Käyttäjät voivat hakea ja suodattaa sijainteja hakukentällä tai kategoriapainikkeilla (esim. <i>Attractions, Restaurants, Campuses</i>). Sijainnit näkyvät listana näkymässä. <i>View</i>-painike avaa <i>popover</i>-ikkunan, joka tarjoaa lisätietoa kohteesta ja mahdollistaa siirtymisen suoraan karttanäkymään.

<VideoPlayer videoSrc="/videos/ouluni/ouluni-places.webm" posterSrc="/images/ouluni/thumb.png" description="Places-näkymä."  />

### 2. Karttanäkymä

Kartta kokoaa yhteen opiskelijalle olennaiset sijainnit. Oikean alakulman <i>My location</i> -painikkeella voi paikantaa oman sijainnin. Samasta kulmasta löytyvällä <i>Show filters</i> -painikkeella karttaa voi suodattaa tarpeen mukaan, ja karttamerkkejä klikkaamalla avautuvat kohteen tarkemmat tiedot näytön vasempaan reunaan. Avautuneen sivunäkymän <i>Navigate to</i> -painikkeella käyttäjä voi myös siirtyä varsinaiselle Google Maps -sivustolle ja aloittaa navigoinnin kohteeseen välittömästi.

<VideoPlayer videoSrc="/videos/ouluni/ouluni-map.webm" posterSrc="/images/ouluni/thumb.png" description="Karttanäkymä."  />

## Mietteet

Sivustosta tuli toiminnallinen, selkeä ja visuaalisesti miellyttävä kokonaisuus. Kaikki projektille asetetut vaatimukset täyttyivät, ja sovellus toimii erinomaisena prototyyppinä sekä vahvana pohjana mahdolliselle jatkokehitykselle.

<style>

</style>

---
title: "OulUni"
slug: "ouluni"
description: "HTML/CSS/JS projekti, jossa hyödynnetty Google Maps -apia. Toteutettu ryhmätyönä Projektitoiminnan perusteet -yliopistokurssilla."
thumbnail: "/images/ouluni/thumb.png"
tags: ["HTML/CSS/JS"]
---

<script>
  import { asset } from '$app/paths';
  import VideoPlayer from '$lib/components/VideoPlayer.svelte';
</script>

# Projekti
Kurssimme tavoitteena oli toteuttaa ryhmätyönä pieni sovellus, joka auttaisi uusia opiskelijoita löytämään mielenkiintoisia ja olennaisia paikkoja Oulusta. Projektin keskeisenä vaatimuksena oli Google Maps -apin hyödyntäminen. Tiukan aikataulun ja yksinkertaisten vaatimuksien vuoksi päädyimme toteuttamaan sivuston ilman raskaita frameworkeja, käyttäen modernia HTML-, CSS- ja JavaScript-koodia.

## Oma rooli
Minulla oli päävastuu sivuston visuaalisesta ilmeestä, käyttöliittymäsuunnittelusta ja Maps-rajapinnan käyttöönotosta. Visuaalisessa suunnittelussa tavoittelin pehmeää, leikkisää ja helposti lähestyttävää ilmettä. Lopputuloksena syntyi selkeä, esteettinen ja raikas kokonaisuus.

<VideoPlayer videoSrc="/videos/ouluni-frontpage.webm" posterSrc="/images/ouluni/thumb.png" description="Etusivu-näkymä. Leikkisyys näkyy esim. elävästi muotoillussa tervetulotekstissä ja värimaailmassa."  />

## Keskeiset toiminnallisuudet

### Places-näkymä
Käyttäjät voivat hakea ja suodattaa sijainteja hakukentällä tai kategoriapainikkeilla (esim. <i>Attractions, Restaurants, Campuses</i>). Sijainnin näkyvät näkymässä listana. <i>View</i>-painike avaa <i>popover</i>-ikkunan, joka tarjoaa lisätietoa kohteesta ja mahdollistaa siirtymisen suoraan karttanäkymään.

<VideoPlayer videoSrc="/videos/ouluni-places.webm" posterSrc="/images/ouluni/thumb.png" description="Places-näkymä."  />

### Karttanäkymä
Kartta kokoaa yhteen opiskelijalle olennaiset sijainnit. Oikean alakulman <i>My location</i> -painikkeella voi paikantaa oman sijainnin. Samasta kulmasta löytyvällä <i>Show filters</i> -painikkeella karttaa voi suodattaa tarpeen mukaan, ja karttamerkkejä klikkaamalla avautuvat kohteen tarkemmat tiedot näytön vasempaan reunaan. Avautuneen sivunäkymän  <i>Navigate to</i> -painikkeella käyttäjä voi myös siirtyä varsinaiselle Google Maps -sivustolle ja aloittaa navigoinnin kohteeseen välittömästi.

<VideoPlayer videoSrc="/videos/ouluni-map.webm" posterSrc="/images/ouluni/thumb.png" description="Karttanäkymä."  />

## Mietteet
Sivustosta tuli toiminnallinen, selkeä ja visuaalisesti miellyttävä kokonaisuus. Kaikki projektille asetetut vaatimukset täyttyivät, ja sovellus toimii erinomaisena prototyyppinä sekä vahvana pohjana mahdolliselle jatkokehitykselle.

<style>

</style>
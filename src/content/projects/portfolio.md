---
title: "Portfolio"
slug: "portfolio"
description: "Responsiivinen portfolio, joka on rakennettu Sveltellä."
thumbnail: "/images/portfolio/portfolio-thumb.webp"
tags: ["Svelte"]
date: "2026-1-1"
---

<script lang="ts">
  import hljs from 'highlight.js';
  import 'highlight.js/styles/github-dark.css';
  import { onMount } from 'svelte';
  import rawCode from './snippets/portfolio-code-example.svelte?raw';
  import Summary from "$lib/components/Summary.svelte";

  let codeElement: HTMLElement;

  onMount(() => {
    if (codeElement) {
      hljs.highlightElement(codeElement);
    }
  });

const summaryData = [
  {
    title: "Tausta",
    content: "Peruskouluaikoina syntynyt haave omasta julkisesta kotisivusta toteutui vihdoin."
  },
  {
    title: "Teknologia",
    content: "Kehykseksi valikoitui Svelte (SSG) sen keveyden, suorituskyvyn, komponenttikohtaisten tyylien (scoped CSS) ja selkeän tiedostopohjaisen reitityksen ansiosta."
  },
  {
    title: "Hostaus",
    content: "Toteutettu GitHub Pagesin kautta julkisesta repositoriosta automaattisella GitHub Actions -CI/CD-putkella."
  },
  {
    title: "Domain & Sähköposti",
    content: "Oma verkkotunnus (julu.fi) ja siihen kytketty sähköposti Zoho Mailin avulla."
  },
  {
    title: "Lopputulos",
    content: "Valmis, jatkuvasti kehittyvä henkilökohtainen verkkosivu ja saavutettu pitkän ajan tavoite."
  }
];

</script>

<Summary data={summaryData} />

## Oma portfolio

Kiinnostus nettisivujen tekemiseen alkoi minulla jo peruskouluikäisenä. Vapaa-ajalla ja atk-tunneilla oli kiehtovaa nähdä miten erikoiselta näyttävä HTML-merkintäkieli kääntyi nettisivuksi, ja niin jossain vaiheessa syntyi haave omasta julkisesta kotisivusta. Ajatus oli jostain syystä sivussa tovin, mutta nyt vihdoin oli toteutuksen aika.

## Kehyksenä Svelte

Halusin toteuttaa portfolioni jollain kevyellä, sujuvan kehityskokemuksen tarjoavalla ohjelmistokehyksellä, joka tukisi sivuston staattista generointia (SSG) ja mahdollistaisi siten helpon hostaamisen. Valitsin tehtävään Svelten. Olin kuullut siitä paljon hyvää ja lukenut sen keveydestä, suorituskyvystä ja kehittäjäystävällisyydestä.<br><br> Lyhyen kokeilun perusteella Svelte osoittautui juuri oikeaksi valinnaksi. Kehittäminen tuntui luonnolliselta, koska Svelte-komponenttien rakenne muistuttaa hyvin pitkälti perinteistä HTML/JS/CSS-koodausta:

<pre><code bind:this={codeElement} class="language-xml">
{rawCode}
</code></pre>

Sveltessä CSS-luokat ovat komponenttikohtaisia (scoped); komponenteissa määritetyt samannimiset luokat eivät siis sekoitu keskenään, koska buildaamisen yhteydessä niille annetaan uniikit tunnisteet. Eri reittien – esim. /projects ja /contact – toteutus on myös suoraviivaista. Ei turhia abstraktioita, providereita ja importteja vaan polut syntyvät suoraan kansiorankenteen perusteella. Lähestymistavat moniin asioihin tuntuivat virkistävältä Reactin kanssa työskentelyn jälkeen!

## Hostaaminen

Hyödynsin Github Pagesia portfolion hostaamiseen. Tätä varten sen repositotoriosta täytyi tehä julkinen Githubissa. Määritin repoon Github-actionin, joka buildaa sivuston uudelleen jokaisen pushin yhteydessä, mikä on muutosten tekemisen kannalta erittäin kätevää.

## Domain ja sähköposti

Portfolion tekeminen oli oiva tilaisuus perehtyä domainien maailmaan. Valittuani domaintarjoajan ja vapaana olevan domainin, pienten mutkien ja konfiguroinnon kautta sivusto avautui lopulta julu.fi osoitteen takaa. Se oli hieno fiilis! Oma domain mahdollisti tietysti myös oman @julu.fi sähköpostipäätteen käytön. Tätä varten otin käyttöön Zoho Mailin, ja pian sähköpostit lähtivät maailmalle omalle uniikilla osoittellani ja saapuivat ongelmitta myös omaan postilaatikkoon.

## Loppumietteet

Tässä se nyt on. Oma piskuinen nettisivu, jota kehittäisin pikkuhiljaa, ja jonka olisi tarkoitus pyöriä internetissä hamaan tulevaisuuten asti. Peruskouluajoilta alkanut haave oli nyt täytetty. Nyt ei muuta kuin seuraavien haaveiden ja tavoitteiden kimppuun!

<style>
  .language-xml {
    border-radius: var(--border-radiuses-md);
    max-width: var(--text-max-width);
    background-color: oklch(from var(--colors-primary) 0.18 0.015 h) !important;
  }
</style>

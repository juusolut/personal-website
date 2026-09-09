---
title: "friba-performance-tracker"
slug: "friba-performance-tracker"
description: "Frisbeegolf-tulosapplikaatio, jossa voit myös seurata kehittymistäsi."
thumbnail: "/images/processed/friba-thumb.webp"
tags: ["Flutter"]
date: "2021"
---

<script>
  import { asset } from '$app/paths';
  import Gallery from '$lib/components/Gallery.svelte';

  const path = "/images/friba"
  const rawImages = [
    {
      imageSrc: "friba-stats.webp",
      thumbSrc: "",
      description: "Stats-näkymä."
    },
    {
      imageSrc: "friba-rounds.webp",
      thumbSrc: "",
      description: "Rounds-näkymä."
    },
    {
      imageSrc: "friba-courses.webp",
      thumbSrc: "",
      description: "Courses-näkymä."
    },
    {
      imageSrc: "friba-pre-throw.webp",
      thumbSrc: "",
      description: "Pre-throw-näkymä."
    },
    {
      imageSrc: "friba-throw-evaluation.webp",
      thumbSrc: "",
      description: "Throw-evaluation-näkymä."
    },
    {
      imageSrc: "friba-putting.webp",
      thumbSrc: "",
      description: "Putting-näkymä."
    },
    {
      imageSrc: "friba-feedback.webp",
      thumbSrc: "",
      description: "Feedback-näkymä."
    },
    {
      imageSrc: "friba-settings.webp",
      thumbSrc: "",
      description: "Settings-näkymä."
    },
    {
      imageSrc: "friba-clear-data.webp",
      thumbSrc: "",
      description: "Clear-data-näkymä."
    },

  ];

  const galleryData = rawImages.map((img) => ({
  imageSrc: `${path}/${img.imageSrc}`,
  thumbSrc: `${path}/${img.thumbSrc}`,
  description: img.description
}));
</script>

## Projektin aloitus

Yliopiston harjoitustyö antoi vapaat kädet ohjelmiston toteutukseen, joten päätimme opiskelijakaverini kanssa rakentaa mobiilisovelluksen frisbeegolfin ympärille. Halusimme tehdä sellaisen applikaation, johon voisi merkata tarkat tiedot frisbeegolf-kierrokselta, ja joka sitten koostaisi kaikkien kierrosten tiedot ja antaisi kehitysvinkkejä käyttäjälle. Käyttäjä voisi siis tulla paremmaksi frisbeegolfaajaksi applikaation kautta.

## Ohjelmistokehitys

Aloitimme profiloimalla mahdollisia käyttäjiä. Yritimme asettua heidän asemaansa, ja ideoida sovellusta ja käyttöliittymää sitä kautta. Halusimme sovelluksesta mahdollisimman yksinkertaisen, jotta se olisi aidosti kierroksella kenelle tahansa frisbeegolfaajalle. Valitsimme työkaluksi Googlen Flutterin, joka houkutteli kehitysympäristön keveydellä ja kehitystä nopeuttavalla Hot Reload -ominaisuudella. Kun meillä oli jonkinlainen tuotos valmiina, otimme sen mukaan frisbeegolf-kierrokselle, testaisimme sitä ja teimme parannuksia sovellukseen havaintojemme perusteella.

## Lopputulos

Lopputuloksesta tuli aivan toimiva ja selkä, mutta ei tietenkään täydellinen. Huomasimme, että sovellus ei välttämättä toimi niin hyvin jos on pelailemassa ryhmässä, koska yksityiskohtainen merkkailu on melko työlästä. Jos pelaajaa on heittelemässä itsekseen, silloin hän jaksaa silloin merkitä sovellukseen tarkat heittokohtaiset tiedot.<br><br>
Kyseessä oli molempien ensikosketus mobiilisovelluskehitykseen, ja kurssin aikarajojen puitteissa olimme tyytyväisiä tuotokseen. Erityisesti puttausnäkymä oli toimiva ja jopa sellainen ominaisuus, jota vastaavaa on myöhemmin nähty suosituissa frisbeegolf-sovelluksissa. Projektissa parasta oli päästä testaamaan omaa oppimiskykyä: kuinka nopeasti Flutter ja sen uusi kieli (Dart) ja sen syntaksi taipuivat toimivaksi sovellukseksi.  <br><br>
Tässä vielä kuvia lopputuotteesta:

<Gallery data={galleryData}/>

---
title: "Dashboard"
slug: "dashboard"
description: "Ruudukkopohjainen, responsiivinen ja mukautettava dashboard, joka toteutettiin kandiprojektina radio-ohjelmistoa tekevälle yritykselle."
thumbnail: "/images/dashboard/dashboard-thumb.webp"
tags: ["React", "RubyOnRails"]
isShowcased: true
date: "2022"
---

<script>
  import { asset } from '$app/paths';
  import VideoPlayer from '$lib/components/VideoPlayer.svelte';
  import Gallery from '$lib/components/Gallery.svelte';

  const thumbSrc = "/images/dashboard/dashboard-thumb.webp"
  const path = "/images/dashboard/gallery"
  const rawImages = [
  {
    imageSrc: "dashboard-figma.webp",
    thumbSrc: "dashboard-figma.webp",
    description: "Koko dashboard-prototyypin rakenne Figmassa."
  },
  {
    imageSrc: "dashboard_all_compact.webp",
    thumbSrc: "dashboard_all_compact.webp",
    description: "Dashboard-näkymä. Kaikki widgetin minimaalisessa tilassa."
  },
  {
    imageSrc: "dashboard_arrivals_playing_recorders_large.webp",
    thumbSrc: "dashboard_arrivals_playing_recorders_large.webp",
    description: "Latest Arrivals, Now Playing ja Recorded Status laajennetussa tilassa."
  },
  {
    imageSrc: "dashboard_failed_conversions.webp",
    thumbSrc: "dashboard_failed_conversions.webp",
    description: "Failed Conversions -ikkuna"
  },
  {
    imageSrc: "dashboard_load_layout_as.webp",
    thumbSrc: "dashboard_load_layout_as.webp",
    description: "Load layout -ikkuna."
  },
  {
    imageSrc: "dashboard_save_layout_as.webp",
    thumbSrc: "dashboard_save_layout_as.webp",
    description: "Save layout -ikkuna."
  },
  {
    imageSrc: "dashboard_services_and_converters_large.webp",
    thumbSrc: "dashboard_services_and_converters_large.webp",
    description: "Status of Services ja Status of Converters laajennetussa tilassa."
  },
  {
    imageSrc: "dashboard_widget_management.webp",
    thumbSrc: "dashboard_widget_management.webp",
    description: "Widgettien hallitsemisen pudotusvalikko vasemmassa yläkulmassa."
  },
  {
    imageSrc: "dashboard_widget_menu.webp",
    thumbSrc: "dashboard_widget_menu.webp",
    description: "Widgetin oma pudotusvalikko."
  },
  {
    imageSrc: "status_of_services1.webp",
    thumbSrc: "status_of_services1.webp",
    description: "Status of Services widgetti. Luonnos 1."
  },
  {
    imageSrc: "status_of_services2.webp",
    thumbSrc: "status_of_services2.webp",
    description: "Status of Services widgetti. Luonnos 2."
  }
];

  const galleryData = rawImages.map((img) => ({
  imageSrc: `${path}/${img.imageSrc}`,
  thumbSrc: `${path}/${img.thumbSrc}`,
  description: img.description
}));

</script>

# Johdanto

Osana laajempaa opintokokonaisuutta toteutimme projektityönä ohjelmiston oululaiselle softafirmalle. Yritys kehittää web-pohjaista radio-ohjelmistoa, ja meidän tavoitteenamme oli rakentaa heidän ohjelmistoonsa keskitetty näkymä (dashboard). Uusi kojelauta kokoasi yhteen paikkaan aiemmin eri näkymiin hajautetun datan, kuten radiolähetysten, soittolistojen ja sisäisten palveluiden tilan. Dashboardin tuli olla konfiguroitavissa käyttäjän – järjestelmänvalvojan, tuottajan tai radiojuontajan – tarpeiden mukaan.

## Suunnittelu

Käynnistimme projektin huolellisella vaatimusmäärittelyllä ja kilpailija-analyysilla. Suoria vastineita ei markkinoilta löytynyt, joten otimme parhaat ideat eri sovelluksista suunnittelun pohjaksi. Tiimin sisäisen ideoinnin jälkeen jokainen suunnitteli oman konseptinsa Figmalla. Jatkoon valikoitui suunnittelemani interaktiivinen Figma-proto, jolle saimme myös asiakkaan hyväksynnän.

<Gallery data={galleryData}/>

<VideoPlayer videoSrc="/videos/dashboard/dashboard-prototype.webm" posterSrc={thumbSrc} description="Dashboard-prototyyppi, jonka tein Figmalla. Widgettien responsiivisuus esiteltynä."  />

## Ohjelmistokehitys

Pohjaksi valitsimme avoimen lähdekoodin <a href="https://github.com/react-grid-layout/react-grid-layout">react-grid-layout</a> -kirjaston (MIT), mikä säästi kehitysaikaa ja takasi luotettavan pohjan toteutukselle. Kehitystyön sujuvoittamiseksi loimme myös dummy-server-skriptin, joka simuloi radio-ohjelmiston backendia. Tämä helpotti merkittävästi ruudukossa sijaitsevien dynaamisten widgetien suunnittelua, toteutusta ja testausta ennen integrointimista oikeaan järjestelmään.

<VideoPlayer videoSrc="/videos/dashboard/dashboard-dummy-server.webm" posterSrc={thumbSrc} description="Dummy-serverin hyödyntäminen kehityksessä."  />

### Widgetit

Dashboardista haluttiin dynaaminen ja mukautettava, joten widgettien piti reagoida joustavasti omien mittojensa muutoksiin. Tätä varten täytyi olla tapa seurata widgettien kokoa. Vastasin dashboardissa geneerisen "dummy widgetin" toteuttamisesta. Se toimisi jokaisen erilaisen widgetin pohjana. Puntaroin toteutuksessa <a href="https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver">ResizeObserverin</a> ja <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment/Container_queries">Container Queryn</a> välillä. Päädyin ensimmäiseen vaihtoehtoon, koska Container Queryllä ei ollut tuohon aikaan vielä tarpeeksi kattavaa selaintukea.<br><br>Vaikka ResizeObserver vaati hieman monimutkaisemman toteutuksen, se mahdollisti elementtien koon muutosten täsmällisen seurannan ja siten käyttöliittymän dynaamisen mukauttamisen. Käytännössä ”dummy widget” toimi niin että se seurasi DOM-elementin kokoa ja lisäsi siihen CSS-luokkia määriteltyjen breakpointtien mukaan. Näiden luokkien avulla tyylimuutokset voitiin toteuttaa yksilöllisesti jokaiseen custom-widgettiin.

<VideoPlayer videoSrc="/videos/dashboard/dashboard-nowplaying3.webm" posterSrc={thumbSrc} description="Now Playing -widgetin responsiivisuus esiteltynä. Jokaisen widgetin sijainnin voi lukita widgetin omasta valikosta. Widgetin voi myös piilottaa sieltä."  />

<VideoPlayer videoSrc="/videos/dashboard/dashboard-all-widgets.webm" posterSrc={thumbSrc} description="Kaikkien widgettien esittely."  />

### Muu mukautettavuus

Dashboardia hallittiin yläpalkin kautta. Sieltä käsin widgettejä saattoi piilottaa ja palauttaa näkyviin. Dashboardin asettelun – eli widgettien määrän, sijainnin ja koon – pystyi tallentamaan sekä lataamaan uudelleen, ja sivu säilytti viimeisimmän näkymän myös uudelleenlatauksen (refresh) yhteydessä. Lisäksi kojelaudan sai halutessaan kokoruututilaan.

<VideoPlayer videoSrc="/videos/dashboard/dashboard-layouts.webm" posterSrc={thumbSrc} description="Dashboardin yläpalkin ja layout-mukautettavuuden esittely."  />

## Integrointi asiakkaan ohjelmistoon

Yrityksen laajan koodikannan haltuunotto otti aluksi oman aikansa, mikä on uudessa ympäristössä täysin luonnollista. Ohjelmiston rakenteen hahmotuttua integrointi sujui vaivattomasti ja uusi dashboard-komponentti saatiin osaksi kokonaisuutta täysin suunnitellusti.

## Mitä jäi käteen?

Toteuttamamme kojelauta toimi ympäristössään hyvin ja täytti vaatimukset erinomaisesti, ja näin ollen asiakas oli lopputulokseen tyytyväinen. Kaiken kaikkiaan projekti oli yliopistoaikani opettavaisin ja kiinnostavin kokonaisuus, sillä se tarjosi ensituntuman alalla työskentelyyn. Oppimiskokemuksena se oli todella merkittävä: projekti vahvisti teknistä osaamistani koodarina ja kehitti projektityöskentelytaitojani.

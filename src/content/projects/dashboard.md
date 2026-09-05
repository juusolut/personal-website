---
title: "Dashboard"
slug: "dashboard"
description: "Ruudukkopohjainen, responsiivinen ja mukautettava dashboard, joka toteutettiin kandiprojektina radio-ohjelmistoa tekevälle yritykselle."
thumbnail: "/images/processed/dashboard-prototype-thumb.webp"
tags: ["React", "RubyOnRails"]
isShowcased: true
---

<script>
  import { asset } from '$app/paths';
  import VideoPlayer from '$lib/components/VideoPlayer.svelte';
</script>

# Johdanto

Osana laajempaa opintokokonaisuutta toteutimme projektityönä ohjelmiston oululaiselle softafirmalle. Yritys kehittää web-pohjaista radio-ohjelmistoa, ja meidän tavoitteenamme oli rakentaa heidän ohjelmistoonsa keskitetty näkymä (dashboard). Uusi kojelauta kokoasi yhteen paikkaan aiemmin eri näkymiin hajautetun datan, kuten radiolähetysten, soittolistojen ja sisäisten palveluiden tilan. Dashboardin tuli olla konfiguroitavissa käyttäjän – järjestelmänvalvojan, tuottajan ja radiojuontajan – tarpeiden mukaan.

## Suunnittelu

Käynnistimme projektin huolellisella vaatimusmäärittelyllä ja kilpailija-analyysilla. Suoria vastineita ei markkinoilta löytynyt, joten otimme parhaat ideat eri sovelluksista suunnittelun pohjaksi. Tiimin sisäisen ideoinnin jälkeen jokainen suunnitteli oman konseptinsa Figmalla. Jatkoon valikoitui suunnittelemani interaktiivinen Figma-proto, jolle saimme myös asiakkaan hyväksynnän.

<VideoPlayer videoSrc="/videos/dashboard/dashboard-prototype.webm" posterSrc="/images/processed/dashboard-prototype-thumb.webp" description="Dashboard-prototyyppi, jonka tein Figmalla. Widgettien responsiivisuus visalisoituna."  />

## Ohjelmistokehitys

Pohjaksi valitsimme avoimen lähdekoodin <a href="https://github.com/react-grid-layout/react-grid-layout">react-grid-layout</a> -kirjaston (MIT), mikä säästi kehitysaikaa ja takasi luotettavan pohjan toteutukselle. Kehitystyön sujuvoittamiseksi loimme myös dummy-server-skriptin, joka simuloi radio-ohjelmiston backendia. Tämä helpotti merkittävästi ruudukossa sijaitsevien dynaamisten widgetien suunnittelua, toteutusta ja testausta ennen integrointimista oikeaan järjestelmään.

<VideoPlayer videoSrc="/videos/dashboard/dashboard-dummy-server.webm" posterSrc="/images/processed/dashboard-prototype-thumb.webp" description="Dummy-serverin hyödyntäminen kehityksessä."  />

### Widgetit

Dashboardista haluttiin dynaaminen ja mukautettava, joten widgettien piti reagoida joustavasti omien mittojensa muutoksiin. Tätä varten täytyi olla tapa seurata widgettin kokoa. Vastasin dashboardissa geneerisen "dummy widgetin" totetuttamisesta. Se toimisi jokaisen erilaisen widgetin pohjana. Puntaroin toteutuksessa <a href="https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver">ResizeObserverin</a> ja <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment/Container_queries">Container Queryn</a> välillä. Päädyin ensimmäiseen vaihtoehtoon, koska Container Queryllä ei ollut tuohon aikaan vielä tarpeeksi kattavaa selaintukea.<br><br>Vaikka ResizeObserver vaati hieman monimutkaisemman toteutuksen, se mahdollisti elementtien koon muutosten täsmällisen seurannan ja käyttöliittymän dynaamisen mukauttamisen. Käytännössä ”dummy widget” toimi niin että se seurasi DOM-elementin kokoa ja lisäsi siihen CSS-luokkia määriteltyjen breakpointtien mukaan. Näiden luokkien avulla tyylimuutokset voitiin toteuttaa yksilöllisesti jokaiseen custom-widgettiin.

<VideoPlayer videoSrc="/videos/dashboard/dashboard-nowplaying3.webm" posterSrc="/images/processed/dashboard-prototype-thumb.webp" description="Now Playing -widgetin responsiivisuus esiteltynä. Jokaisen widgetin sijainnin voi lukita widgetin omasta valikosta. Widgetin voi myös piilottaa sieltä."  />

<VideoPlayer videoSrc="/videos/dashboard/dashboard-all-widgets.webm" posterSrc="/images/processed/dashboard-prototype-thumb.webp" description="Kaikkien widgettien esittely."  />

### Muu mukautettavuus

Dashboardia hallittiin yläpalkin kautta. Sieltä käsin widgettejä saattoi piilottaa ja palauttaa näkyviin. Dashboardin asettelun – eli widgettien määrän, sijainnin ja koon – pystyi tallentamaan sekä lataamaan uudelleen, ja sivu säilytti viimeisimmän näkymän myös uudelleenlatauksen (refresh) yhteydessä. Lisäksi kojelaudan sai halutessaan kokoruututilaan.

<VideoPlayer videoSrc="/videos/dashboard/dashboard-layouts.webm" posterSrc="/images/processed/dashboard-prototype-thumb.webp" description="Dashboardin yläpalkin ja layout-mukautettavuuden esittely."  />

## Integrointi asiakkaan ohjelmistoon

Yrityksen laajan koodikannan haltuunotto otti aluksi oman aikansa, mikä on uudessa ympäristössä täysin luonnollista. Ohjelmiston rakenteen hahmotuttua integrointi sujui vaivattomasti ja uusi dashboard-komponentti saatiin osaksi kokonaisuutta täysin suunnitellusti.

## Mitä jäi käteen?

Toteuttamamme kojelauta toimi ympäristössään hyvin ja täytti vaatimukset erinomaisesti, ja näin ollen asiakas oli lopputulokseen tyytyväinen. Kaiken kaikkiaan projekti oli yliopistoaikani opettavaisin ja kiinnostavin kokonaisuus, sillä se tarjosi ensituntuman alalla työskentelyyn. Oppimiskokemuksena se oli todella merkittävä: projekti vahvisti teknistä osaamistani koodarina ja kehitti projektityöskentelytaitojani.

---
title: "Dashboard"
slug: "dashboard"
description: "Ruudukkopohjainen, responsiivinen ja mukautettava dashboard, joka toteutettiin kandiprojektina radio-ohjelmistoa tekevän yrityksen kanssa."
thumbnail: "/images/processed/dashboard-prototype-thumb.webp"
tags: ["React", "RubyOnRails"]
isShowcased: true
---

<script>
  import { asset } from '$app/paths';
  import VideoPlayer from '$lib/components/VideoPlayer.svelte';
</script>

# Johdanto

Osana laajempaa opintokokonaisuutta toteutimme projektityönä ohjelmiston oululaiselle softafirmalle, joka kehittää web-pohjaista radio-ohjelmistoa. Tavoitteena oli rakentaa järjestelmään keskitetty näkymä (dashboard) järjestelmänvalvojille ja tuottajille. Uusi kojelauta kokoaa yhteen paikkaan aiemmin eri näkymiin hajautetun datan, kuten radiolähetysten, soittolistojen ja sisäisten palveluiden tilan seurannan.

# Suunnittelu

Käynnistimme projektin huolellisella vaatimusmäärittelyllä ja kilpailija-analyysilla. Koska suoria vastineita ei markkinoilta löytynyt, keräsimme parhaat käytännöt eri sovelluksista suunnittelun pohjaksi. Tiimin sisäisen ideoinnin jälkeen jokainen suunnitteli oman konseptinsa Figmalla. Jatkoon valikoitui suunnittelemani interaktiivinen Figma-proto, jolle saimme myös asiakkaan hyväksynnän.

<VideoPlayer videoSrc="/videos/dashboard-prototype.webm" posterSrc="/images/processed/dashboard-prototype-thumb.webp" description="Dashboard-prototyyppi"  />

# Ohjelmistokehitys

Tekniseksi pohjaksi valitsimme avoimen lähdekoodin <a href="https://github.com/react-grid-layout/react-grid-layout">react-grid-layout</a> -kirjaston (MIT), mikä säästi kehitysaikaa ja takasi luotettavan pohjan toteutukselle. Kehitystyön sujuvoittamiseksi loimme mock-data-skriptin, joka simuloi radio-ohjelmiston backendia. Tämä helpotti merkittävästi ruudukossa sijaitsevien dynaamisten widgetien suunnittelua, toteutusta ja testausta ennen oikean taustajärjestelmän integrointia.

## Widgetit

Dashboardista haluttiin dynaaminen ja mukautettava, joten widgetien piti reagoida joustavasti omien mittojensa muutoksiin. Tekniseksi ratkaisuksi valikoitui <a href="https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver">ResizeObserver</a>. <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment/Container_queries">Container Query</a> olisi ollut yksinkertaisempi ratkaisu, mutta sillä ei vielä tuolloin ollut riittävän kattavaa selaintukea. Vaikka ResizeObserver vaati hieman monimutkaisempaa toteutusta, se mahdollisti elementtien koon muutosten täsmällisen seurannan ja käyttöliittymän dynaamisen mukauttamisen. Rakensin dynaamisen ja geneerisen widget-komponentin, joka vastasi koon muutosten kuuntelusta ja toimi runkona kaikille eri käyttötarkoituksiin tehdyille widgeteille.

## Muu mukautettavuus

Dashboardiin toteuttiin myös ominaisuus tallentaa ja palauttaa widgettien asetuksia. Widgettien määrää, sijaintia ja kokoa kun pystyi muuttamaan niin oli kätevää että dashboardin pystyi palauttamaan nopeasti takaisin sellaiseksi kuin sen hetkinen käyttäjä halusi.

# Integrointi asiakkaan ohjelmistoon

# Mitä jäi käteen?

Haastavaa oli tietysti ohjelmiston lähdekoodin ymmärtäminen aluksi, mutta hetken tutustumisen jälkeen helpotti. Asiakas oli lopputulokseen tyytyväinen. Se täytti vaatimukset. Kaiken kaikkiaan tämän hetkisen ylipistoajan opettavaisin ja kiinnostavin projekti, koska sai jo ensimakua alan työstä. Oppimiskokemuksena todella merkittävä.
---
title: "Factory"
slug: "factory"
description: "P2P verkkoräiskintäpeli, johon haettu inspiraatiota Source-peleistä."
thumbnail: "/images/factory/factory-thumb.webp"
tags: ["Godot"]
isShowcased: true
date: "2025"
---

<script lang="ts">
    import VideoPlayer from '$lib/components/VideoPlayer.svelte';
</script>

<VideoPlayer videoSrc="/videos/factory/factory.webm" posterSrc="/images/factory/factory-thumb.webp" description="Testipelailua."  />

## Factory: the Game

Factory on työn alla oleva FPS-peliprojektini. Hain inspiraatiota projektiin Source-peleistä (CS, Half-Life jne.), koska olen aina pitänyt niiden pelituntumasta. Otin haasteeksi tehdä pelistä moninpelin yrittäen kopioida hyviä ja vakiintuneita käytänteitä Source-pohjaisista peleistä.

Lähdin toteuttamaan peliin server authoratitive -rakennetta. Tämä tarkoittaa sitä että serverillä on ehdoton päätösvalta pelin tapahtumiin. Serveriin yhdistänyt clientti ei siis lähetä omia sijaintitietojaan serverille vaan se lähettää sille näppäimistö- ja hiirisyötteensä, ja serveri laskee sitten lopputuloksen ja palauttaa sen clientille. Clientit eivät kuitenkaan odota vastauksia, koska niiden odottelu johtaisi todella katkonaiseen ja siten epämiellyttävään pelikokemukseen viiveen takia. Client side predictionin mukaisesti pelaajan liikkumiseen liittyvä koodi – sama kuin serverillä – ajetaan lokaalisti peliclientissä ja pelaaja liikkuu näytöllä sen laskelmien mukaan. Jos sitten pelaajan sijainti ylittää tietyn thresholdin eli sijainti poikkeaa serverin laskemasta sijainnista, sijainti korjataan mahdollisimman huomaamattomasti (serveillä päätösvalta). Tietystä pelisessioista on siis olemassa useampi versio: serverin headless-versio (totuus) ja peliclienttien omat hieman eri ajoissa olevat näkemykset.

Tavoitteena että ohjattajan hahmon liikkuminen olisi mahdollisimman miellyttävän ja ohjattavan tuntuista.

- pohja, josta voisi myöhemmin laajentaa itse idean synnyttyä

Mitä sitten?

Network-koodin debugaaminen, siirto gdscript-->c#.

Netfox, mutta kiehtoo ajatus itse toteuteusta koodista (halu oppia). Steam-integraatio.
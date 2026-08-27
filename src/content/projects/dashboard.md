---
title: "Dashboard"
slug: "dashboard"
description: "Ruudukkopohjainen, responsiivinen ja mukautettava dashboard, joka toteutettiin kandiprojektina radio-ohjelmistoa tekevän yhteistyöyrityksen kanssa."
thumbnail: "/images/processed/dashboard-prototype-thumb.webp"
tags: ["React", "RubyOnRails"]
---

# Johdanto

Erään laajemman kurssikokonaisuuden tavoitteena oli tehdä yhteistyöyrityksen vaatimusten mukainen ohjelmisto projektityönä. Tiimimme pääsi mukaan oululaisen webbi-pohjaista radio-ohjelmistoa tekevät softafirman projektiin. He halusivat ohjelmistoonsa jonkinlaisen "kojelaudan", josta admin, tuottaja tai muu vastaava henkilö voisi seurata vaikkapa radiolähetysten, soittolistojen tai radio-ohjelmiston sisäisten palveluiden tilaa. He halusivat siis näkymän, joka koostaisi datan, joka oli sillä hetkellä hajautettuna moniin eri näkymiin.

# Suunnittelu

Kuuntelimme asiakkaan vaatimukset tarkkaan ja aloitimme suunnittelutyön. Alkuun kartoitimme kilpailevat softa-tuotteet ja yritimme etsiä niistä vastaavia dashboard-näkymiä. Emme löytäneet täysin vaatimusmäärittelyä vastaavaa tuotetta, mutta poimimme kuitenkin löydöksistämme hyviä elementtejä talteen. Pidimme suunnittelupalavereita, joissa ideoitiin ja visioitiin tulevaa työtä. Jokainen suunnitteli oman Figma-demonsa, ne esiteltiin muille ja demoista paras valittiin. Parhaaksi valikoitui tekemäni interaktiivinen Figma-demo, joka asiakkaan hyväksynnän jälkeen toimi pohjana ohjelmistokehitysvaiheessa. Tarkempaa teknistä toteutusta miettiessämme tulimme asiakkaan kanssa siihen lopputulokseen, että emme lähde keksimään pyörää uudelleen, sillä suosittu ja käyttötarkoitukseen erinomaisesti sopiva kirjasto oli jo olemassa: <a href="https://github.com/react-grid-layout/react-grid-layout">react-grid-layout</a> (MIT-lisenssi). Pohjatyö oli nyt tehty ja oli aika siirtyä koodaamiseen.

# Ohjelmistokehitys

Valmiin kirjaston käyttö dashboardin pohjana auttoi paljon, mutta työtä riitti silti rutkasti. Työn avuksi tehtiin mock-up-data-skripti, joka antoi feikkidataa oikean radio-ohjelmiston backendin tapaisesti. Se helpotti dashboardin ruudukossa elävien widgettien suunnittelua, ohjelmointia ja testaamista.

## Widgetit

Dashboardista haluttiin mukautettava. Mukautettavuus tarkoitti sitä, että widgetit eivät olisi vain staattisen kokoisia vaan niiden täytyi mukautua widgetin koon muutoksiin. Tällainen responsiivisuus oli saavutettavissa <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment/Container_queries">Container Queryllä</a> tai <a href="https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver">ResizeObserverillä</a>. Päädyimme käyttämään jälkimmäistä, koska Container Query oli tuohon aikaan vielä liian tuore selainominaisuus eivätkä kaikki selaimet välttämättä tukeneet sitä. ResizeObserver API:n käyttö ei ollut niin suoraviivaista kuin Container Queryn, mutta se toimi hyvin. API:lta saatiin tietoja elementin koon muutoksista, joilla voitiin sitten säätää widgetin visuaalista ilmettä sopivaksi. Toteutin dashboardiin geneerisen widget-komponentin, josta tuli sitten jokaisen eriävän widgetin pohja.

## Muu mukautettavuus

Dashboardiin toteuttiin myös ominaisuus tallentaa ja palauttaa widgettien asetuksia. Widgettien määrää, sijaintia ja kokoa kun pystyi muuttamaan niin oli kätevää että dashboardin pystyi palauttamaan nopeasti takaisin sellaiseksi kuin sen hetkinen käyttäjä halusi.

# Integrointi asiakkaan ohjelmistoon



# Mitä jäi käteen?

Integrointi yhteistyöyrityksen koodii. Haastavaa oli tietysti ohjelmiston lähdekoodin ymmärtäminen aluksi, mutta hetken tutustumisen jälkeen helpotti. Asiakas oli lopputulokseen tyytyväinen. Se täytti vaatimukset. Kaiken kaikkiaan tämän hetkisen ylipistoajan opettavaisin ja kiinnostavin projekti, koska sai jo ensimakua alan työstä. Oppimiskokemuksena todella merkittävä.
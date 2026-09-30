---
title: "Kuluku"
slug: "kuluku"
description: "Alusta, jolla yksityishenkilöt voivat myydä ja ostaa kulkuneuvoja kaksipyöräisistä työkoneisiin."
thumbnail: "/images/processed/kuluku-thumb.webp"
tags: ["React", "Dotnet", "Mailhog", "Docker", "MicrosoftSQLServer"]
isShowcased: true
date: "2026-1-1"
---

## Mistä projekti sai alkunsa?

Olimme miettineet ystäväni kanssa jo pitkään, että yhdistäisimme voimamme ja alkaisimme työstämään jotain pykäkää laajempaa projektia. Aiemmat projektini olivat olleet kokoluokaltaan pienempiä, joten mahdollisuus syventyä isompaan ja monimutkaisempaan kokonaisuuteen yhdessä toisen kehittäjän kanssa tuntui innostavalta. Ystävälläni oli tässä vaiheessa jo useamman vuoden kokemus alalta, mistä olisi merkittävä hyöty projektin ja oman oppimisen kannalta. Yhteistyö olisi loistava tilaisuus haastaa itseä ja ottaa haltuun uusia teknologioita.

### Idea: Ajoneuvojen markkinapaikka (Kuluku)

Pohtiessamme nettisivun ideaa huomasimme että Suomessa ei ole montaa palvelua, jotka mahdollistaisivat autojen myynnin yksityishenkilöltä toiselle. Lähdimme rakentamaan nettisivua siis siltä pohjalta, että siellä voisi myydä ja ostaa käytettyjä autoja. Myöhemmin laajensimme ideaa niin että muidenkin kulkupelien – kuten pyörien ja työkoneiden – myyminen olisi mahdollista sivulla. Tämä toisi mukavasti haastetta frontendin, backendin ja tietokannan suunnitteluun. Haastetta antaisi myös käyttäjätilien ja niihin liittyvien perusominaisuuksien luonteva ja tietoturvallinen toteutus.

## Teknologiavalinnat

Valitsimme frontendiksi molemmille entuudestaan tutun <b>Reactin</b>. Backend-ratkaisuksi ja tietokannaksi valikoituivat <b>.NET</b> sekä <b>Microsoft SQL Server</b>, joista projektikumppanillani oli ennestään kokemusta. Sähköpostiviestinnän testaamiseen valitsimme <b>Mailhog</b>-ohjelman ja <b>Dockeria</b> hyödynsimme siihen, että voisimme ajaa Mailhogia helposti. Teimme Dockerilla myös kontin backendille, jotta voin ajaa backendiä myös Linux-koneellani.

## Toiminnallisuus

Jotta sivu olisi toimiva, täytyi toteuttaa perusominaisuuksia:

- Uuden tilin luonti ja sähköpostiosoitteen vahvistus
- Sisäänkirjautuminen
- Unohtuneen salasanan vaihto
- Omien tietojen muokkaaminen (perustiedot, salasana, sähköpostiosoite jne.)

Kirjautuneille saatavilla olevia ominaisuuksia:

- Ilmoitusten luonti ja hallinnointi
- Suosikit
- Viestittely myyjien ja kiinnostuneiden ostajien kanssa


QoL-ominaisuuksia:

- Kielen vaihto suomen, ruotsin ja englannin välillä <br> (sekä käyttäjän osoitepolun säilyttäminen kielenvaihdon yhteydessä!)
- Tumma ja vaalea teema, joka määräytyy käyttäjän mieltymysten mukaan


Sovellusta on lähdetty kehittämään mobiililähtöisesti, jotta ilmoitusten selaaminen ja luominen olisi mahdollisimman helppoa mobiililaitteilla. Käyttöliittymä on siis suunniteltu ensin kapealle näytölle, ja näyttökoon kasvaessa elementit mukautuvat saumattomasti uusiin rajoihin.


## Docker

## Mitä seuraavaksi?

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

Olimme jo pitkään miettineet ystäväni kanssa, että voisimme yhdistää voimamme ja alkaa työstämään pykäkää laajempaa projektia. Aiemmat projektini olivat olleet kokoluokaltaan pienempiä, joten mahdollisuus syventyä kookkaampaan kokonaisuuteen yhdessä toisen kehittäjän kanssa tuntui innostavalta. Yhteistyö tarjosi loistavan tilaisuuden haastaa itseä ja oppia uusia teknologioita. Ystävälläni oli tässä vaiheessa jo useamman vuoden kokemus alalta, mistä olisi merkittävä hyöty projektin ja oman oppimisen kannalta.

### Ajoneuvojen markkinapaikka (Kuluku)

Pohtiessamme nettisivun ideaa huomasimme että Suomessa ei ole montaa palvelua, jotka mahdollistaisivat autojen myynnin yksityishenkilöltä toiselle. Lähdimme rakentamaan nettisivua siis siltä pohjalta, että siellä voisi myydä ja ostaa käytettyjä autoja. Myöhemmin laajensimme ideaa niin että muidenkin kulkupelien – kuten pyörien ja työkoneiden – myyminen olisi mahdollista sivulla. Tämä toisi mukavasti haastetta frontendin, backendin ja tietokannan suunnitteluun. Haastetta antaisi myös käyttäjätilien ja niihin liittyvien perusominaisuuksien luonteva ja tietoturvallinen toteutus.

## Toiminnallisuus

Jotta sivu olisi toimiva, täytyi toteuttaa perusominaisuuksia:
<ul>
    <li>Uuden tilin luonti ja sähköpostiosoiteen vahvistus</li>
    <li>Sisäänkirjautuminen</li>
    <li>Unohtuneen salasanan vaihto</li>
    <li>Omien tietojen muokkaaminen (perustiedot, salasana, sähköpostiosoite jne.)</li>
</ul>

Luonnollisesti toiminnallisuuksia täytyi myös rajoittaa ainoastaan kirjautuneille käyttäjille. Näitä ominaisuuksia ovat:
<ul>
    <li>Ilmoitusten luonti ja hallinnointi</li>
    <li>Suosikit</li>
    <li>Viestittely myyjien ja kiinnostuneiden ostajien kanssa</li>
</ul>

Sivulla on myös jotain QoL-ominaisuuksia:
<ul>
    <li>Kielen vaihto suomen, ruotsin ja englannin välillä <br> (käyttäjän osoitepolku säilyy kielenvaihdon yhteydessä).</li>
    <li>Tumma ja vaalea teema, joka määräytyy käyttäjän mieltymysten mukaan</li>
</ul>


Sovellus on kehitetty mobiililähtöisesti, jotta ilmoitusten selaaminen ja luominen olisi mahdollisimman helppoa ja suoraviivaista puhelimella. Käyttöliittymä on siis suunniteltu ensin mobiilinäytöille, ja se mukautuu saumattomasti laajemmille työpöytänäkymille ruudun koon kasvaessa.

## Teknologiavalinnat

Valitsimme frontendiksi molemmille entuudestaan tutun Reactin. Backend-ratkaisuksi ja tietokannaksi valikoituivat .NET sekä Microsoft SQL Server. Projektikumppanillani oli näistä ennestään kokemusta, ja ne tarjosivat projektille tuotantovalmiin pohjan. Sähköpostiviestinnän testaamiseen valitsimme Mailhog-ohjelman.

## Docker

## Mitä seuraavaksi?

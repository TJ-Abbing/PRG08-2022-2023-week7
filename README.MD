# Telefoonprijs Voorspeller

Dit project gebruikt machine learning om de prijs van een mobiele telefoon te voorspellen op basis van de specificaties. Het bestaat uit twee delen: training en voorspelling.
## Training

In het trainingsgedeelte worden gegevens over mobiele telefoons geladen vanuit een CSV-bestand. Deze gegevens worden gebruikt om een neuraal netwerk te trainen met behulp van de ml5 library. Het neurale netwerk leert om de prijs van een telefoon te voorspellen op basis van dingen zoals het aantal cores, de cpu, het geheugen en de opslagcapaciteit. Zodra het neurale netwerk is getraind, kan het worden opgeslagen in een bestand voor later gebruik.
## Voorspelling

In het voorspellingsgedeelte wordt het vooraf getrainde neurale netwerkmodel geladen. Hiermee kunnen voorspellingen worden gedaan op basis van wat de gebruiker invoert. De gebruiker kan waarden invoeren zoals het aantal cores, de cpu, het geheugen en de opslag van een telefoon. Vervolgens kan de gebruiker op de groene knop klikken om de voorspelde prijs te zien.
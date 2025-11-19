# Projektdokumentation – [Projekttitel]

## Inhaltsverzeichnis

1. [Einordnung & Zielsetzung](#1-einordnung--zielsetzung)
2. [Zielgruppe & Stakeholder](#2-zielgruppe--stakeholder)
3. [Anforderungen & Umfang](#3-anforderungen--umfang)
4. [Vorgehen & Artefakte](#4-vorgehen--artefakte)
    - [Understand & Define](#41-understand--define)
    - [Sketch](#42-sketch)
    - [Decide](#43-decide)
    - [Prototype](#44-prototype)
    - [Validate](#45-validate)
5. [Erweiterungen [Optional]](#5-erweiterungen-optional)
6. [Projektorganisation [Optional]](#6-projektorganisation-optional)
7. [KI‑Deklaration](#7-ki‑deklaration)
8. [Anhang [Optional]](#8-anhang-optional)

> **Hinweis:** Massgeblich sind die im **Unterricht** und auf **Moodle** kommunizierten Anforderungen.

<!-- WICHTIG: DIE KAPITELSTRUKTUR DARF NICHT VERÄNDERT WERDEN! -->

<!-- Diese Vorlage ist für eine README.md im Repository gedacht. Abschnitte mit [Optional] können weggelassen werden, wenn in den Übungen nichts anderes verlangt wird. -->

## 1. Einordnung & Zielsetzung
Kurz beschreiben, welches Problem adressiert wird und welches Ergebnis angestrebt ist.
- **Kontext & Problem:** _[1–3 Sätze]_  
- **Ziele:** _[stichwortartig oder 2–4 Sätze]_  
- **Abgrenzung [Optional]:** _Was gehört explizit nicht zum Umfang?_

Kontext & Problem:
Viele Klavierlernende – besonders Anfänger und Enthusiasten – möchten neue Stücke entdecken und üben, finden aber selten übersichtliche Plattformen, die Songinfos und passende Lernvideos vereinen.

Ziele:

Eine einfache Web-App bereitstellen, die Klavierstücke übersichtlich anzeigt

Zu jedem Lied strukturierte Informationen + ein Klavier-YouTube-Video anbieten

Eine persönliche Watchlist ermöglichen, um Lieblingsstücke schnell wiederzufinden

Abgrenzung [Optional]:
Kein Fokus auf vollständige Musikbibliotheken, kein komplexes Benutzerkonto-System, keine professionellen Notenblätter.

## 2. Zielgruppe & Stakeholder
Wem nützt die Lösung, wer ist beteiligt oder betroffen?
- **Primäre Zielgruppe:** _[kurz beschreiben]_  
- **Weitere Stakeholder [Optional]:** _[z. B. Verwaltung, Geschäftsleitung]_  
- **Annahmen [Optional]:** _[welche Hypothesen werden geprüft?]_

Primäre Zielgruppe:
Klavieranfänger und Klavier-/Piano-Enthusiasten, die Stücke entdecken und unkompliziert üben möchten.

Weitere Stakeholder [Optional]:
Musiklehrpersonen oder Lernende, die einfache Referenzlisten brauchen.

Annahmen [Optional]:
Nutzende möchten schnell zu einem Lied gelangen und sofort mit dem Video üben können.

## 3. Anforderungen & Umfang
Beschreibt den verbindlichen Umfang gemäss Übungen und allfällige Erweiterungen.
- **Kernfunktionalität (Mindestumfang):** _gemäss Übungen ab Semesterwoche 8; Workflows kurz nennen und optional illustrieren_  
- **Akzeptanzkriterien:** _[z. B. „Nutzende können Workflow X von Start bis Abschluss ohne Fehlermeldung durchführen.“]_  
- **Erweiterungen [Optional]:** _[Liste zusätzlicher Funktionen/Qualitätssprünge, falls umgesetzt]_  

Kernfunktionalität (Mindestumfang):
Songliste in Svelte mit Daten aus MongoDB + Navigation zur Detailseite

Detailseite mit Songinformationen und eingebettetem YouTube-Klaviervideo

Watchlist, in die Nutzer Songs speichern und wieder abrufen können

Akzeptanzkriterien:

Nutzende können von der Startseite ein Lied auswählen und ohne Fehler zur Detailansicht wechseln.

Das YouTube-Video lädt zuverlässig auf der Detailseite.

Songs lassen sich zur Watchlist hinzufügen und wieder entfernen.

Erweiterungen [Optional]:

Randomizer-Funktion („Zufälliges Lied anzeigen“)

Suche/Filter für Songs

Schwierigkeitsgrad als Attribut

## 4. Vorgehen & Artefakte
Die Durchführung erfolgt phasenbasiert; dokumentieren Sie die wichtigsten Ergebnisse je Phase.

### 4.1 Understand & Define
- **Ausgangslage & Ziele:** _[kurz]_
- **Zielgruppenverständnis:** _[Problemraumanalyse, Recherche]_
- **Wesentliche Erkenntnisse:** _[Stichpunkte]_

Ausgangslage & Ziele:
Viele Apps bieten Musik an, aber kaum etwas für Klavierlernende, das Songinfos und Übungsmaterial kombiniert. Pianly soll diesen Einstieg vereinfachen.

Zielgruppenverständnis:
Nutzende wollen einfache Navigation, klare Liedauswahl und direkt spielbare Lernvideos.

Wesentliche Erkenntnisse:
Klare Struktur, wenige Klicks, saubere visuelle Darstellung; schnelle Erreichbarkeit der Übungen wichtig.

### 4.2 Sketch
- **Variantenüberblick:** _[kurz]_
- **Skizzen:** _Mehrere Varianten; Unterschiede kurz dokumentieren._

Variantenüberblick:
Mehrere Layoutskizzen für Startseite, Songliste, Detailseite und Watchlist wurden erstellt.

Skizzen:
Hier Skizzen einfügen (z. B. Foto/Scan).
Varianten unterschieden sich z. B. in:

Position der Songliste

Gestaltung der Detailansicht

Platzierung des YouTube-Videos

Darstellung der Watchlist

### 4.3 Decide
- **Gewählte Variante & Begründung:** _[Entscheidkriterien nennen]_  
- **End‑to‑End‑Ablauf:** _[kurz beschreiben]_  
- **Referenz‑Mockup:** _[URL, Screenshots mit kurzen Beschreibungen]_  

Gewählte Variante & Begründung:
Ausgewählt wurde ein Layout mit klarer vertikaler Struktur: Songliste → Detailseite → großes Video unten. Dies bietet die beste Klarheit für Anfänger.

End-to-End-Ablauf:
Startseite öffnen → Lied auswählen → Detailinfos betrachten → YouTube-Video abspielen → optional zur Watchlist hinzufügen.

Referenz-Mockup:
Hier später die Figma-URL einfügen.
(Platzhalter: „Mockup folgt nach Fertigstellung in Figma“)

### 4.4 Prototype
- **Kernfunktionalität:** _[Kurzbeschreibung der Workflows/Funktionen]_  
- **Deployment:** _[URL]_ 

Kernfunktionalität:
Umgesetzt wurde die Songliste, Detailseite mit Video und die Watchlist-Funktion.

Deployment:
Hier die URL einfügen, sobald deployed (z. B. Vercel/Netlify).

#### 4.4.1. Entwurf (Design)
Beschreibt die Gestaltung und Interaktion.
> **Hinweis:** Hier wird der **Prototyp** beschrieben, nicht das **Mockup**.
- **Informationsarchitektur:** _[z. B. Seiten/Navigation: Konzept, nicht die technische Umsetzung]_
- **Oberflächenentwürfe:** _[wichtige Screens: Screenshots mit kurzer Erläuterung]_  
- **Designentscheidungen:** _[zentrale Entscheidungen und Begründungen]_

Informationsarchitektur:
Startseite → Songs
Detailseite → Songdetails + Video
Watchlist → vom User gespeicherte Songs

Oberflächenentwürfe:
Screenshots des Prototyps später einfügen.

Designentscheidungen:
Minimalistisches Layout zur Fokussierung aufs Lernen; große Buttons; klare Typografie; YouTube-Video zentral im Fokus.

#### 4.4.2. Umsetzung (Technik)
Fasst die technische Realisierung zusammen.
- **Technologie‑Stack:** _[SvelteKit, Bibliotheken falls genutzt]_
- **Tooling:** _[IDE/Erweiterungen, lokale/Cloud‑Tools; den Einsatz von KI beschreiben Sie im Kapitel **KI-Deklaration**]_  
- **Struktur & Komponenten:** _[Seiten, Routen, State/Stores, wichtige Komponenten]_
- **Daten & Schnittstellen [Optional]:** _[Datenquellen, API‑Entwürfe, Modelle]_
- **Besondere Entscheidungen:** _[z. B. Trade‑offs, Vereinfachungen]_  

Technologie-Stack:
SvelteKit, MongoDB, JavaScript, Tailwind CSS (optional)

Tooling:
VS Code, Git, GitHub, Browser DevTools

Struktur & Komponenten:

/ – Startseite mit Songliste

/song/[id] – Detailseite

/watchlist – Favoritenansicht

Stores für Watchlist-State

Daten & Schnittstellen [Optional]:
MongoDB-Collection mit Songs (Titel, Jahr, Komponist, Video-URL etc.)

Besondere Entscheidungen:
Client-seitige Watchlist via localStorage für einfache Realisierung.

### 4.5 Validate
- **URL der getesteten Version** (separat deployt)
- **Ziele der Prüfung:** _[welche Fragen sollen beantwortet werden?]_  
- **Vorgehen:** _[moderiert/unmoderiert; remote/on‑site]_  
- **Stichprobe:** _[Mit wem wurde getestet? Profil; Anzahl]_  
- **Aufgaben/Szenarien:** _[Ausformulierte Testaufgaben]_  
- **Kennzahlen & Beobachtungen:** _[z. B. Erfolgsquote, Zeitbedarf, qualitative Findings]_  
- **Zusammenfassung der Resultate:** _[Wichtigste Erkenntnisse; 2–4 Sätze]_  
- **Abgeleitete Verbesserungen:** _[priorisiert, kurz begründet]_  
- **Umgesetzte Anpassungen [Optional]:** _[Im Prototyp umgesetzte Verbesserungen aufgrund der Erkenntnisse in der Evaluation]_ Idealerweise: Zwischenstände separat deployen, Änderungen dokumentieren.

URL der getesteten Version:
Wird nach Deployment ergänzt.

Ziele der Prüfung:
Verstehen Nutzende die Liedauswahl? Ist der Ablauf logisch? Funktioniert die Watchlist intuitiv?

Vorgehen:
Unmoderierte Kurztests mit realen Nutzenden.

Stichprobe:
2–3 Klavieranfänger/Enthusiasten.

Aufgaben/Szenarien:

Ein Lied auswählen und das Video starten

Ein Lied zur Watchlist hinzufügen

Watchlist öffnen und ein Lied daraus abspielen

Kennzahlen & Beobachtungen:
(Platzhalter einfügen nach Test)

Zusammenfassung der Resultate:
(2–4 Sätze nach Test)

Abgeleitete Verbesserungen:
z. B. deutlichere Icons, größere Buttons, bessere Songfilterung.

Umgesetzte Anpassungen [Optional]:
Nach den Tests ergänzt.

## 5. Erweiterungen [Optional]
Dokumentiert Erweiterungen über den Mindestumfang hinaus.
- **Beschreibung & Nutzen:** _[Was wurde erweitert? Warum?]_  
- **Umsetzung in Kürze:** _[Wie wurde es gemacht?]_  
- **Abgrenzung zum Mindestumfang:** _[klar darstellen]_  

Beschreibung & Nutzen:
Randomizer zum spontanen Finden neuer Stücke.

Umsetzung in Kürze:
Zufällige Auswahl eines Song-Dokuments aus MongoDB oder Client-seitige Liste.

Abgrenzung zum Mindestumfang:
Zusatzfunktion, nicht notwendig für Kernworkflow.

## 6. Projektorganisation [Optional]
Beispiele:
- **Repository & Struktur:** _[Link; kurze Strukturübersicht]_  
- **Issue‑Management:** _[Vorgehen kurz beschreiben]_  
- **Commit‑Praxis:** _[z. B. sprechende Commits]_

Repository & Struktur:
Link später einfügen.

Issue-Management:
Einfache Todos für Features und Bugs.

Commit-Praxis:
Kurze, sprechende Commits („add watchlist store“, „implement song detail page“ …).

## 7. KI‑Deklaration
Die folgende Deklaration ist verpflichtend und beschreibt den Einsatz von KI im Projekt.

Eingesetzte KI-Werkzeuge

ChatGPT (Unterstützung bei Struktur, Formulierungen und technischen Erklärungen).

Zweck & Umfang

Unterstützung bei Textentwürfen, Review von Dokumentationsteilen und Vorschlägen für Architektur/Komponenten.

Art der Beiträge

Teile der README und einige Erklärungen zur Struktur/Architektur basieren teilweise auf KI-Input.

Eigene Leistung (Abgrenzung)

Konzeption, Entscheidungen, Umsetzung in Svelte, Datenbankmodellierung, Tests und Design eigenständig durchgeführt.

Reflexion

KI erleichtert Strukturierung und Formulierungen, ersetzt aber nicht das technische Verständnis und die Entscheidungsarbeit.

### Eingesetzte KI‑Werkzeuge
_[z. B. Copilot, ChatGPT, Claude, lokale Modelle; Version/Variante wenn bekannt]_

### Zweck & Umfang
_[**wie, wofür und in welchem Ausmass** wurde KI eingesetzt (z. B. Textentwürfe, Codevorschläge, Tests, Refactoring) sowie **Überlegungen** zu Qualität, Urheberrecht/Quellen und Prompt‑Vorgehen]_

### Art der Beiträge
_[konkret: welche Teile stammen (ganz/teilweise) aus KI‑Unterstützung?]_

### Eigene Leistung (Abgrenzung)
_[was ist eigenständig erarbeitet/überarbeitet worden?]_

### Reflexion
_[Nutzen, Grenzen, Risiken/Qualitätssicherung]_

### Prompt‑Vorgehen [Optional]
_[wichtige Prompts/Workflows in Kürze]_

### Quellen & Rechte [Optional]
_[verwendete Vorlagen/Assets/Modelle; Lizenz/Urheberrecht; Zitierweise]_

## 8. Anhang [Optional]
Beispiele:
- **Testskript & Materialien:** _[Link/Datei]_  
- **Rohdaten/Auswertung:** _[Link/Datei]_  

---

<!-- Prüfliste (nicht abgeben, nur intern nutzen) -->
<!--
[ ] Kernfunktionalität gemäss Übungen umgesetzt (Workflows durchgängig)
[ ] Akzeptanzkriterien formuliert und erfüllt
[ ] Skizzen erstellt (mehrere Varianten, Unterschiede dokumentiert)
[ ] Referenz‑Mockup in Decide verlinkt (URL/Screenshots)
[ ] Deployment erreichbar
[ ] Umsetzung (Technik) vollständig (Technologie‑Stack; Tooling & KI‑Einsatz inkl. Überlegungen; Struktur/Komponenten; Daten/Schnittstellen falls genutzt)
[ ] Evaluation durchgeführt; Ergebnisse dokumentiert; Verbesserungen abgeleitet
[ ] Dokumentation vollständig, klar strukturiert und konsistent
[ ] KI‑Deklaration ausgefüllt (Werkzeuge; Zweck & Umfang; Art der Beiträge; Abgrenzung; Quellen & Rechte; optional: Prompt‑Vorgehen, Reflexion)
[ ] Erweiterungen (falls vorhanden) begründet und abgegrenzt
[ ] Anhang gepflegt (Testskript/Materialien, Rohdaten/Auswertung) [optional]
-->
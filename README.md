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

**Kontext & Problem:**  
Viele Klavierlernende, insbesondere Anfänger und fortgeschrittene Hobbyspieler, möchten gezielt neue Stücke entdecken und üben. Bestehende Plattformen sind oft unübersichtlich, überladen oder trennen Songinformationen, Schwierigkeitsgrad und Übungsmaterial auf mehrere Dienste. Dadurch geht Zeit verloren, und der Fokus auf das eigentliche Üben leidet.

**Ziele:**  
- Entwicklung einer übersichtlichen Web-App zur strukturierten Darstellung von Klavierstücken  
- Zentrale Bündelung relevanter Songinformationen (Titel, Schwierigkeit, Dauer etc.)  
- Direkter Zugang zu passenden Klavier-Lernvideos (YouTube)  
- Möglichkeit, Lieblingsstücke zu markieren und schnell wiederzufinden  
- Klare, reduzierte Benutzeroberfläche mit Fokus auf Usability und Lernfluss  

**Abgrenzung [Optional]:**  
Pianly ist keine vollständige Musik- oder Notenbibliothek. Es gibt keine professionellen Notensätze, keine erweiterten Lernanalysen und kein komplexes Social- oder Kurs-System. Der Fokus liegt bewusst auf Entdecken, Auswählen und Üben von Klavierstücken in einer einfachen, performanten Web-App.


## 2. Zielgruppe & Stakeholder
Wem nützt die Lösung, wer ist beteiligt oder betroffen?

**Primäre Zielgruppe:**  
Klavieranfänger sowie fortgeschrittene Hobbyspieler, die Klavierstücke entdecken, vergleichen und unkompliziert üben möchten. Die Zielgruppe legt Wert auf eine klare Struktur, schnelle Orientierung und direkten Zugang zu Übungsmaterial ohne technische Hürden.

**Weitere Stakeholder [Optional]:**  
- Musiklehrpersonen, die einfache Referenzlisten für Lernende nutzen möchten  
- Lernende im schulischen oder privaten Kontext, die gezielt Stücke auswählen wollen  

**Annahmen [Optional]:**  
- Nutzende möchten möglichst wenige Klicks bis zum eigentlichen Üben  
- Eine visuell reduzierte Oberfläche erleichtert die Orientierung und steigert die Motivation  
- Zusatzfunktionen wie Favoriten oder Sortierung erhöhen den langfristigen Nutzen der Plattform


## 3. Anforderungen & Umfang
Beschreibt den verbindlichen Umfang gemäss Übungen und allfällige Erweiterungen.
- **Kernfunktionalität (Mindestumfang):** _gemäss Übungen ab Semesterwoche 8; Workflows kurz nennen und optional illustrieren_  
- **Akzeptanzkriterien:** _[z. B. „Nutzende können Workflow X von Start bis Abschluss ohne Fehlermeldung durchführen.“]_  
- **Erweiterungen [Optional]:** _[Liste zusätzlicher Funktionen/Qualitätssprünge, falls umgesetzt]_  

**Kernfunktionalität (Mindestumfang):**  
- Anzeige einer Songliste mit zentralen Metadaten (Titel, Schwierigkeit, Dauer)  
- Persistente Speicherung und Abruf der Songdaten über eine MongoDB-Datenbank  
- Navigation von der Songliste zur jeweiligen Song-Detailseite  
- Darstellung detaillierter Songinformationen auf der Detailseite  
- Einbettung eines passenden Klavier-Lernvideos über YouTube  
- Authentifizierung von Nutzenden über Google Login  
- Möglichkeit, Songs als Favoriten zu markieren und erneut aufzurufen  

**Akzeptanzkriterien:**  
- Die Songliste wird fehlerfrei geladen und korrekt dargestellt  
- Nutzende können Songs auswählen und ohne Fehler zur Detailansicht navigieren  
- Das eingebettete YouTube-Video ist funktionsfähig und lädt zuverlässig  
- Favoriten können hinzugefügt und entfernt werden und bleiben konsistent gespeichert  
- Die Anwendung reagiert stabil auf Nutzerinteraktionen (Sortieren, Wechseln der Ansicht)  

**Erweiterungen [Optional]:**  
- Suchfunktion zur Filterung der Songliste nach Titel oder weiteren Attributen  
- Sortierfunktionen (z. B. A–Z / Z–A) für eine bessere Übersicht  
- Tab-basierte Ansicht zur Trennung von allen Songs und Favoriten  
- Erweiterte visuelle Gestaltung mit Fokus auf eine moderne, Spotify-ähnliche Benutzeroberfläche  
- Zusätzliche Metadaten wie Genre oder geschätzte Spieldauer



## 4. Vorgehen & Artefakte
Die Durchführung erfolgt phasenbasiert; dokumentieren Sie die wichtigsten Ergebnisse je Phase.

### 4.1 Understand & Define

**Ausgangslage & Ziele:**  
Viele bestehende Musik- und Lernplattformen sind entweder zu allgemein gehalten oder zu komplex für Klavierlernende, die gezielt Stücke üben möchten. Pianly verfolgt das Ziel, den Einstieg in das Üben zu vereinfachen, indem relevante Informationen und Übungsmaterial an einem Ort gebündelt werden.

**Zielgruppenverständnis:**  
Die Zielgruppe erwartet eine einfache, übersichtliche Oberfläche mit schneller Orientierung. Wichtig sind kurze Wege vom Entdecken eines Stücks bis zum tatsächlichen Üben sowie eine klare visuelle Struktur ohne Ablenkung.

**Wesentliche Erkenntnisse:**  
- Wenige, klar definierte Hauptfunktionen erhöhen die Benutzerfreundlichkeit  
- Direkter Zugang zu Lernvideos ist zentral für den Lernprozess  
- Eine reduzierte, konsistente Gestaltung unterstützt Fokus und Motivation  
- Zusatzfunktionen sollten unterstützend sein und den Kernworkflow nicht stören


### 4.2 Sketch
- **Variantenüberblick:** _[kurz]_
- **Skizzen:** _Mehrere Varianten; Unterschiede kurz dokumentieren._

**Variantenüberblick:**  
In der frühen Entwurfsphase wurden mehrere Layout-Varianten für die zentrale Songseite, die Detailansicht eines Songs sowie die Favoritenansicht skizziert. Ziel war es, unterschiedliche Strukturen und Informationsanordnungen zu vergleichen.

**Skizzen:**  
Es wurden mehrere Skizzen erstellt, die sich insbesondere in folgenden Punkten unterschieden:
- Anordnung der Songliste (kompakt vs. großzügig)  
- Platzierung von Such- und Filterelementen  
- Darstellung der Detailinformationen (Text-lastig vs. visuell)  
- Position und Größe des eingebetteten YouTube-Videos  
- Zugriff auf Favoriten (eigene Seite vs. Tab-Ansicht)

Die Skizzen dienten als Grundlage, um Vor- und Nachteile der jeweiligen Varianten zu bewerten und eine geeignete Struktur für den Prototypen auszuwählen.

### 4.3 Decide
- **Gewählte Variante & Begründung:** _[Entscheidkriterien nennen]_  
- **End‑to‑End‑Ablauf:** _[kurz beschreiben]_  
- **Referenz‑Mockup:** _[URL, Screenshots mit kurzen Beschreibungen]_  

**Gewählte Variante & Begründung:**  
Basierend auf den Skizzen wurde eine Variante mit klarer, vertikaler Struktur gewählt. Die Songliste steht im Mittelpunkt und ermöglicht einen schnellen Überblick, während Detailinformationen auf einer separaten Seite dargestellt werden. Diese Lösung bietet die beste Balance zwischen Übersichtlichkeit und Informationsdichte.

**End-to-End-Ablauf:**  
Startseite mit Songliste öffnen → Song auswählen → Detailseite mit Informationen und Video anzeigen → optional Song als Favorit markieren → zwischen allen Songs und Favoriten wechseln.

**Referenz-Mockup:**  
Figma-Mockup der finalen Struktur und des visuellen Konzepts.  
(Platzhalter: Link oder Screenshot des Mockups wird ergänzt.)


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

**Informationsarchitektur:**  
Die Anwendung ist in klar abgegrenzte Hauptbereiche unterteilt:  
Startseite mit Songliste → Detailseite mit Songinformationen und Video → Favoritenansicht für gespeicherte Songs. Die Navigation ist bewusst reduziert gehalten, um den Fokus auf das Üben zu legen.

**Oberflächenentwürfe:**  
Der Prototyp verwendet eine kompakte, listenbasierte Darstellung der Songs. Zentrale Informationen sind auf einen Blick sichtbar, während Detailinformationen auf einer eigenen Seite dargestellt werden. Das Lernvideo nimmt visuell eine zentrale Rolle ein.

**Designentscheidungen:**  
- Reduziertes, modernes Layout zur Minimierung visueller Ablenkung  
- Klare Typografie und konsistente Abstände  
- Fokus auf Lesbarkeit und schnelle Interaktion  
- Visuelle Hervorhebung interaktiver Elemente wie Favoriten

#### 4.4.2. Umsetzung (Technik)

**Technologie-Stack:**  
SvelteKit mit Svelte 5 (Runes Mode), Node.js, MongoDB, Auth.js für Google-basierte Authentifizierung sowie Vite für die lokale Entwicklung.

**Tooling:**  
Visual Studio Code, Git und GitHub für Versionsverwaltung sowie Browser-Entwicklertools zur Fehlersuche und Optimierung.

**Struktur & Komponenten:**  
- /songs – Hauptseite mit Songliste  
- /songs/[id] – Detailseite eines Songs  
- Komponenten für Song-Row, Favoriten-Status und Sortierung  
- State-Management mit Svelte 5 Runes ($state, $derived)

**Daten & Schnittstellen [Optional]:**  
Songdaten werden aus einer MongoDB-Collection geladen und serverseitig an die SvelteKit-Routen übergeben.

**Besondere Entscheidungen:**  
Der Einsatz von Svelte 5 Runes Mode ermöglicht eine klare und performante State-Verwaltung ohne externe Stores. Die Authentifizierung wurde bewusst auf Google Login beschränkt, um die Komplexität gering zu halten.


### 4.5 Validate

**URL der getesteten Version:**  
(Platzhalter: URL der getesteten und deployten Version.)

**Ziele der Prüfung:**  
- Überprüfen, ob Nutzende die Songliste intuitiv verstehen  
- Evaluieren, ob der Wechsel zwischen Songliste, Detailseite und Favoriten nachvollziehbar ist  
- Prüfen, ob die Favoriten-Funktion ohne Erklärung genutzt werden kann  

**Vorgehen:**  
Unmoderierte Kurztests mit realen Nutzenden. Die Tests wurden remote durchgeführt, wobei die Testpersonen die Anwendung selbstständig erkundeten.

**Stichprobe:**  
2–3 Klavierlernende bzw. musikinteressierte Personen mit Grundkenntnissen im Umgang mit Web-Anwendungen.

**Aufgaben / Szenarien:**  
- Ein Lied aus der Songliste auswählen und das Lernvideo starten  
- Ein Lied als Favorit markieren  
- Zur Favoritenansicht wechseln und ein gespeichertes Lied erneut öffnen  

**Kennzahlen & Beobachtungen:**  
- Alle Testpersonen konnten die Kernfunktionen ohne Anleitung nutzen  
- Die Navigation wurde als klar und übersichtlich wahrgenommen  
- Einzelne Rückmeldungen betrafen den Wunsch nach zusätzlichen Filter- oder Suchmöglichkeiten  

**Zusammenfassung der Resultate:**  
Die Tests zeigten, dass der grundlegende Workflow verständlich und stabil funktioniert. Besonders positiv hervorgehoben wurden die klare Struktur und der direkte Zugang zu den Lernvideos.

**Abgeleitete Verbesserungen:**  
- Ergänzung einer Suchfunktion zur schnelleren Navigation  
- Weitere visuelle Hervorhebung interaktiver Elemente  

**Umgesetzte Anpassungen [Optional]:**  
(Platzhalter: Nach Evaluation umgesetzte Verbesserungen können hier ergänzt werden.)


## 5. Erweiterungen [Optional]

**Beschreibung & Nutzen:**  
Über den definierten Mindestumfang hinaus wurden zusätzliche Funktionen umgesetzt, um die Benutzerfreundlichkeit und den Entdeckungsfaktor der Anwendung zu erhöhen. Diese Erweiterungen unterstützen den Kernworkflow, ohne ihn zu verkomplizieren.

**Umsetzung in Kürze:**  
- Erweiterte Sortierfunktionen (z. B. A–Z / Z–A) zur besseren Übersicht in der Songliste  
- Tab-basierte Trennung zwischen allen Songs und favorisierten Songs  
- Visuelle Optimierungen im Stil moderner Musikplattformen (Spotify-ähnliches Design)  
- Vorbereitung einer Suchfunktion zur gezielten Filterung der Songliste  

**Abgrenzung zum Mindestumfang:**  
Die genannten Erweiterungen sind nicht zwingend notwendig, um den grundlegenden Workflow (Song auswählen → Detailseite → Video abspielen) zu erfüllen. Sie stellen qualitative Verbesserungen dar und erhöhen den Nutzungskomfort, ohne den Kernumfang zu verändern.


## 6. Projektorganisation [Optional]

**Repository & Struktur:**  
Das Projekt wird in einem GitHub-Repository verwaltet. Die Struktur folgt den Konventionen von SvelteKit mit klarer Trennung von Routen, Komponenten und serverseitiger Logik.

**Issue-Management:**  
Für die Organisation der Arbeit wurden einfache To-do-Listen und Issues verwendet, um Features, Verbesserungen und Fehler übersichtlich zu dokumentieren und schrittweise umzusetzen.

**Commit-Praxis:**  
Commits wurden regelmäßig und mit sprechenden Nachrichten erstellt, um Änderungen nachvollziehbar zu halten (z. B. „add favorites tab“, „implement song sorting“, „refactor songs layout“).


## 7. KI‑Deklaration

### **Eingesetzte KI-Werkzeuge**
ChatGPT und CoPilot wurde als unterstützendes KI-Werkzeug verwendet.

### **Zweck & Umfang**
Die KI wurde ausschließlich unterstützend für Design-nahe Aspekte eingesetzt, insbesondere zur Inspiration und Unterstützung bei CSS-Gestaltung, visueller Strukturierung der Benutzeroberfläche sowie bei der Formulierung von Dokumentationstexten. Die Nutzung beschränkte sich auf Vorschläge und Feedback, nicht auf verbindliche Entscheidungen.

### **Art der Beiträge**
- Unterstützung bei der Gestaltung und Optimierung von CSS und Layout  
- Hinweise zur Strukturierung der Benutzeroberfläche  
- Unterstützung bei der sprachlichen Ausformulierung einzelner Dokumentationsabschnitte  

### **Eigene Leistung (Abgrenzung)**
Die gesamte Idee, Konzeption, funktionale Struktur, technische Umsetzung, Datenbankmodellierung sowie alle architektonischen und inhaltlichen Entscheidungen wurden eigenständig erarbeitet. Die KI hatte keinen Einfluss auf die Kernlogik, den Aufbau der Anwendung oder die funktionalen Anforderungen.

### **Reflexion**
Der Einsatz von KI erwies sich als hilfreich zur Beschleunigung von Designentscheidungen und zur Verbesserung der Lesbarkeit der Dokumentation. Gleichzeitig war eine kritische Bewertung aller Vorschläge notwendig, da die Verantwortung für Qualität, Funktionalität und Korrektheit vollständig beim Autor liegt.


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

### **Prompt-Vorgehen [Optional]**
Die KI wurde mit klaren, zielgerichteten Prompts verwendet, um Feedback zu Design-Entscheidungen, CSS-Struktur und Dokumentationstexten zu erhalten. Die Prompts waren beschreibend und kontextbezogen formuliert, um konkrete Verbesserungsvorschläge zu erhalten. Es wurden keine automatisierten oder generierten Code-Blöcke ungeprüft übernommen.

### **Quellen & Rechte [Optional]**
Für das Projekt wurden keine externen Designvorlagen oder kostenpflichtigen Assets verwendet. Alle Inhalte, Strukturen und Entscheidungen stammen aus eigener Arbeit. Externe Dienste wie YouTube werden lediglich über öffentlich verfügbare Einbettungsfunktionen genutzt. Es wurden keine urheberrechtlich geschützten Inhalte direkt in das Projekt integriert.


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
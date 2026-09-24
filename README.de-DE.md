<!-- readme-languages:start -->
[English](README.md) · [العربية](README.ar.md) · [简体中文](README.zh-CN.md) · [Français](README.fr-FR.md) · **Deutsch** · [हिन्दी](README.hi-IN.md) · [日本語](README.ja-JP.md) · [한국어](README.ko-KR.md) · [Português (Brasil)](README.pt-BR.md) · [Română](README.ro.md) · [Español](README.es-ES.md) · [Українська](README.uk.md)
<!-- readme-languages:end -->

# Zandaulion

Eine spielerische Werkstatt für neugierige Ideen: Apps, Spiele und kleine Werkzeuge zum Entdecken.

**[Visit zandaulion.com](https://zandaulion.com/)** · [Rumänische Sammlung](https://zandaulion.com/ro/index.html)

Dieses Repository enthält die Zandaulion-Website: eine durchsuchbare Sammlung von 21 Projekten, einzelne Projektseiten und einen interaktiven Sankey-Diagrammeditor. Die Homepage und jede Projektseite sind in 12 Sprachen verfügbar. Die Site ist statisch HTML, CSS und Vanilla JavaScript und wird auf GitHub Pages gehostet.

## README-Übersetzungen

Diese README-Datei ist in denselben 12 Sprachen verfügbar wie die Website. Verwenden Sie die Sprachlinks oben, um die Version zu wechseln. Englisch lebt in `README.md`; übersetzte Versionen verwenden Dateinamen wie `README.ro.md` und `README.ar.md`.

Bearbeiten Sie die englische README-Datei und die entsprechenden Kataloge in `locales/readme/` und führen Sie dann `python scripts/build_readmes.py` aus, um die übersetzten Dateien neu zu generieren. Verwenden Sie `python scripts/build_readmes.py --check`, um veraltete Dateien oder fehlende Übersetzungen zu erkennen. Das optionale Flag `--fetch` bereitet fehlende Übersetzungsentwürfe über denselben Google-Übersetzungsdienst vor, der für Projekttext verwendet wird. Befehle, Pfade, Codebeispiele und Linkziele bleiben erhalten.

## Inhalt

- Eine Sammlung mit Kategoriefiltern, akzentunabhängiger Suche und Zufallserkennung.
- Projektbeschreibungen, Start- und Quelllinks, Screenshot-Galerien und verwandte Projekte.
- Über die Tastatur zugängliche Bildergalerien mit Bildunterschriften, vorherigen/nächsten Steuerelementen und Touch-Gesten.
- Ein Sankey-Editor mit Knoten-/Linkbearbeitung, Bildexport und JSON-Import/Export.
- Sprachauswahl, gespeicherte Einstellungen, Browser-Spracherkennung und arabisches Rechts-nach-Links-Layout.
- Vorhandene englische Datenschutzhinweise unter den bereits bei Google Play registrierten URLs.

### Projektsammlung

| Projekt | Website-Seite |
| --- | --- |
| Admitere Liceu Kit | [admitere.html](admitere.html) |
| Bank DWH Studio | [bankdwhstudio.html](bankdwhstudio.html) |
| BP Digitizer – Android und PWA | [bpdigitizer.html](bpdigitizer.html) |
| Faceslice | [faceslice.html](faceslice.html) |
| Gravity Garden | [gravitygarden.html](gravitygarden.html) |
| GravityTDG | [gravitytdg.html](gravitytdg.html) |
| Gravity Warp | [gravitywarp.html](gravitywarp.html) |
| Intârzieri Tren | [intarzieri.html](intarzieri.html) |
| Kerfloom | [kerfloom.html](kerfloom.html) |
| Magpie | [magpie.html](magpie.html) |
| Mișcare | [miscare.html](miscare.html) |
| OLX Deal Finder | [olxdeals.html](olxdeals.html) |
| Pocket Omaha | [omaha.html](omaha.html) |
| OrbitPuzzles | [orbitpuzzles.html](orbitpuzzles.html) |
| Pale Blue Dot | [palebluedot.html](palebluedot.html) |
| Bitey, früher Plate | [plate.html](plate.html) |
| PWA Invite Console | [pwainvite.html](pwainvite.html) |
| pwa-kit | [pwakit.html](pwakit.html) |
| Sankey Diagrammeditor | [sankey.html](sankey.html) |
| Spendosaurus | [spendosaurus.html](spendosaurus.html) |
| Thermostat Monitor | [thermostat.html](thermostat.html) |

Die App-Repositorys sind von dieser Website getrennt. Die umbenannten Repositorys sind [zandaulion.com](https://github.com/zandaulion/zandaulion.com), [bitey](https://github.com/zandaulion/bitey) und [kerfloom](https://github.com/zandaulion/kerfloom).

Die Bank DWH Studio-Quelle und die synthetische Lagervorrichtung leben in [semantic-layer-poc](https://github.com/zandaulion/semantic-layer-poc).

Bitey behält die etablierte Seite `plate.html` bei. BP Digitizer hat eine Seite für beide Plattformen; `wbpdigitizer.html` bleibt eine Kompatibilitätsweiterleitung zu `bpdigitizer.html#web-version`.

## Lokale Vorschau

Führen Sie diese Befehle im Repository-Stammverzeichnis aus. Python wird für den Generator und die Prüfungen benötigt; Die Python-Skripte verwenden nur die Standardbibliothek. Für die Sprachtests wird Node.js mit dem integrierten Test-Runner benötigt. Es gibt keinen npm-Installations- oder Frontend-Bundler-Schritt.

```sh
python scripts/build_locales.py
python -m http.server 8765 --bind 127.0.0.1
```

Öffnen Sie [die lokale Homepage](http://127.0.0.1:8765/index.html) oder verwenden Sie [explizites Englisch](http://127.0.0.1:8765/index.html?lang=en-US) oder [Rumänisch](http://127.0.0.1:8765/ro/index.html), um die automatische Sprachauswahl zu umgehen.

Der generierte HTML ist auch für das direkte Durchsuchen von Dateien konzipiert. Öffnen Sie `index.html`, keinen Sprachordner. Die Navigation verwendet explizite Dateinamen, um Verzeichnislisten zu vermeiden. Sprachskripte sind gewöhnliche Skripte und keine ES-Module. Die lokale HTTP-Vorschau ist die empfohlene Methode zur Überprüfung von Änderungen.

## Sprachen und Navigation

| Sprache | Gebietsschema | Homepage |
| --- | --- | --- |
| Englisch | `en-US` | `/index.html?lang=en-US` |
| Arabisch | `ar` | `/ar/index.html` |
| Chinesisch, vereinfacht | `zh-CN` | `/zh-cn/index.html` |
| Französisch | `fr-FR` | `/fr/index.html` |
| Deutsch | `de-DE` | `/de/index.html` |
| Hindi | `hi-IN` | `/hi/index.html` |
| Japanisch | `ja-JP` | `/ja/index.html` |
| Koreanisch | `ko-KR` | `/ko/index.html` |
| Portugiesisch, Brasilien | `pt-BR` | `/pt-br/index.html` |
| Rumänisch | `ro` | `/ro/index.html` |
| Spanisch | `es-ES` | `/es/index.html` |
| Ukrainisch | `uk` | `/uk/index.html` |

Übersetzte Projektseiten behalten denselben Dateinamen unter dem Sprachpräfix, z. B. `/fr/kerfloom.html` oder `/ja/plate.html`. Bei der Sprachumschaltung bleiben das aktuelle Projekt und der Abschnittsanker erhalten. Links zu Sammlungen und verwandten Projekten bleiben in der ausgewählten Sprache. Jede Homepage und Projektseite verfügt über eine Sprachdeklaration, eine kanonische URL und wechselseitige `hreflang`-Links.

Ein expliziter Sprachpfad, wie z. B. `/ro/`, hat immer Vorrang. Nur auf der Haupteintragsseite (`/` oder `/index.html`) folgt die Auswahl dieser Reihenfolge:

1. Eine unterstützte explizite `?lang=`-Auswahl.
2. Eine gespeicherte Spracheinstellung.
3. Die erste unterstützte Browsereinstellung von `navigator.languages`.
4. Englisch, wenn keine unterstützte Sprache übereinstimmt.

Regionale Varianten entsprechen ihrer Basissprache: `fr-CA` wählt beispielsweise Französisch aus. Englische Links enthalten `?lang=en-US`, sodass eine explizite Auswahl auch dann funktioniert, wenn der Browserspeicher nicht verfügbar ist. Einstiegsseitenumleitungen behalten Abschnittsanker und andere Abfrageparameter bei. Projekt- und Datenschutz-URLs werden niemals basierend auf der Browsersprache umgeleitet.

Homepage-Sprachlinks sind im HTML vorhanden und funktionieren auch ohne JavaScript. Projektkopfzeilen, ihre Sprachauswahl, Galeriesteuerelemente und der Sankey-Editor verwenden JavaScript. Projektlinks zu lokalen Dateien enthalten die ausgewählte Sprache in der URL, da Browser möglicherweise den Speicher für jede Datei isolieren.

## Seiten bearbeiten und erzeugen

| Was zu ändern ist | Quelle zum Bearbeiten |
| --- | --- |
| Homepage-Layout | `templates/home.html` |
| Homepagetext in jeder Sprache | `locales/<locale>.json` |
| Englischer Projektinhalt und Layout | Root-Projekt HTML-Dateien, z. B. `kerfloom.html` |
| Übersetzte Projektinhalte | `locales/projects/<locale>/<project>.json` |
| Galerie-Steuerelemente und Editor-Meldungen | `locales/projects/<locale>/common.json` |
| Wiederverwendbare Übersetzungskorrekturen | `locales/projects/overrides.json` |
| Unterstützte Gebietsschemata und URL-Präfixe | `scripts/site_locales.py` |
| Projektabdeckung und Übersetzungserstellung | `scripts/project_locales.py` |
| Gemeinsame Präsentation | `workshop.css` und `project.css` |
| Sammlung, Projekt und Sprachverhalten | `workshop.js`, `project.js` und `language.js` |
| Verhalten des Sankey-Editors | `sankey.js` |

Nachdem Sie Quellinhalte oder Kataloge bearbeitet haben, generieren Sie die Site neu:

```sh
python scripts/build_locales.py
```

Der Generator erzeugt 12 Homepages, 220 übersetzte Projektseiten und `language-data.js`. Auf den 20 englischsprachigen Projektseiten werden außerdem kanonische und alternativsprachige Links gepflegt. Übertragen Sie diese generierten Ausgaben mit ihren Quellen. GitHub Pages versorgt sie direkt, ohne den Python-Generator zu betreiben.

Bearbeiten Sie generierte Homepages, übersetzte HTML oder `language-data.js` nicht direkt: Durch die Neugenerierung werden diese Änderungen ersetzt. Homepage-Kataloge müssen übereinstimmende, nicht leere Schlüssel haben. Projektkataloge verwenden Quelltext als Schlüssel, daher erfordern Änderungen an der englischen Kopie entsprechende Übersetzungsaktualisierungen. Fehlende Übersetzungen schlagen beim Build fehl.

### Übersetzungen pflegen

Projektübersetzungsentwürfe wurden mit dem Übersetzungsdienst von Google erstellt, anschließend wurden gemeinsame Formulierungen, Galeriesteuerungen, Produktnamen und ausgewählte technische Ausdrücke verfeinert. Frühere rumänische Übersetzungen wurden beibehalten. Die Überprüfung durch einen Muttersprachler ist immer noch nützlich, insbesondere für die Fachterminologie. App-Namen, Screenshots und technische Kennungen behalten ihre ursprüngliche Form.

Das optionale Autorenskript kann fehlende Übersetzungen für ein Gebietsschema vorbereiten:

```sh
python scripts/translate_projects.py --fetch --language ro
```

Lassen Sie `--language ro` weg, um alle übersetzten Gebietsschemas zu verarbeiten. Das Flag `--fetch` ermöglicht das Senden fehlender öffentlicher Projekttexte an den Übersetzungsdienst von Google. Vorhandene Kataloge werden wiederverwendet, Produktnamen werden geschützt und `overrides.json`-Korrekturen werden angewendet. Ohne `--fetch` meldet das Skript fehlende Zeichenfolgen und aktualisiert Kataloge nur dort, wo alle erforderlichen Übersetzungen bereits verfügbar sind. Es handelt sich nicht um eine schreibgeschützte Prüfung.

Einige gemeinsame Ausdrücke kommen auch in projektbezogenen Katalogen vor. Fügen Sie konsistente Formulierungskorrekturen in `overrides.json` ein und führen Sie das Vorbereitungsskript aus, um sie projektübergreifend anzuwenden. Erstellen Sie dann HTML neu. Überprüfen Sie die erstellten Übersetzungen vor der Veröffentlichung. Der Ordner `.translation-cache/` wird von Git ignoriert. Normale Builds und die bereitgestellte Website rufen niemals einen Übersetzungsdienst auf.

## Prüfungen vor der Veröffentlichung

Führen Sie bei laufendem lokalen Vorschauserver diese Befehle in einem anderen Terminal aus:

```sh
python scripts/build_locales.py --check
python scripts/check_site.py --url http://127.0.0.1:8765
node --test scripts/test_language.cjs
```

- Die Build-Prüfung erkennt veraltete generierte Ausgaben und fehlende Übersetzungen.
- Der Site-Check umfasst alle 261 HTML-Seiten: 12 Homepages, 240 Projektseiten, acht Datenschutzhinweise und eine Kompatibilitätsweiterleitung. Es überprüft lokale Links, Assets, doppelte IDs außerhalb des beibehaltenen Datenschutz-Markups, Metadaten der Projektsprache, wechselseitige SEO-Links und die arabische Richtung. Mit `--url` werden auch HTTP-Antworten überprüft und zugestellte Datenschutzhinweise mit ihren Quelldateien verglichen.
- Die Sprachtests umfassen Präferenzpriorität, regionale Übereinstimmung, blockierten Speicher, Datei- und Unterverzeichnisstämme, Umleitungsverhalten und Abschnittserhaltung.

Führen Sie für Offline-Linkprüfungen `python scripts/check_site.py` ohne `--url` aus. Überprüfen Sie auch die betroffenen Seiten im Browser: mobiles Layout, arabische Ausrichtung, Sprachumschaltung, Tastatursteuerung in der Galerie und Interaktionen mit dem Editor.

## Veröffentlichung

Die Live-Site ist [zandaulion.com](https://zandaulion.com/), veröffentlicht von `main` bis GitHub Pages. `CNAME` behält die benutzerdefinierte Domänenkonfiguration bei.

Nachdem Sie die Site generiert und überprüft haben, übernehmen Sie die Quelle und die generierten Änderungen und pushen `main`. Warten Sie, bis der Workflow für die Erstellung und Bereitstellung von **pages build and deployment** abgeschlossen ist, und überprüfen Sie dann die geänderten URLs in der Live-Domäne. Behalten Sie die vorhandenen Projekt- und Datenschutzrouten beim Umbenennen von Apps oder deren Repositorys bei.

Die Site verwendet statische Assets und gewöhnliche Skripte. Schriftarten werden von Google Fonts geladen, und der Sankey-Editor lädt Apache ECharts von jsDelivr. Zur Laufzeit ist kein Übersetzungsdienst erforderlich.

## Stabile Datenschutz-URLs

Diese URLs sind bereits bei Google Play registriert. **Sie dürfen sie im Rahmen der Website-Lokalisierung nicht umbenennen, verschieben oder entfernen oder ihre Inhalte neu schreiben.**

- `/bitey-privacy.html`
- `/bpdigitizer-privacy.html`
- `/gravitygarden-privacy.html`
- `/gravitytdg-privacy.html`
- `/gravitywarp-privacy.html`
- `/orbitpuzzles-privacy.html`
- `/palebluedot-privacy.html`
- `/plate-privacy.html`

Die Mitteilungen bleiben in englischer Sprache und behalten ihre ursprüngliche Präsentation und die gemeinsamen `index.css`/`main.js`-Assets bei. Änderungen an gemeinsam genutzten Assets sollten diese Seiten berücksichtigen. `scripts/check_site.py` überwacht die Pfade und kann den bereitgestellten Inhalt überprüfen.

## Repository-Struktur

```text
/
├── index.html                  # Generierte englische Homepage
├── <project>.html              # Englische Projektquellen
├── *-privacy.html              # Datenschutzhinweise in englischer Sprache beibehalten
├── wbpdigitizer.html           # Kompatibilitätsweiterleitung
├── templates/home.html         # Geteilte Homepage-Vorlage
├── README.*.md                 # Übersetzte README-Dateien
├── locales/                    # Website- und README-Übersetzungskataloge
├── ar/, de/, ro/, ...           # Generierte Sprachhomepages und Projektseiten
├── scripts/                    # Erstellung, Übersetzungsvorbereitung, Kontrollen, Tests
├── language-data.js            # Generierte Navigations- und UI-Wörterbücher
├── language.js                 # Sprachauswahl und Navigation
├── workshop.css / workshop.js  # Werkstattpräsentation und Sammelverhalten
├── project.css / project.js    # Projektpräsentation, Kopf-/Fußzeile, Galerien
├── sankey.js                   # Interaktiver Diagrammeditor
├── sample_sankey.json          # Beispieldiagrammdaten
├── index.css / main.js         # Ursprüngliche freigegebene Assets, die für Datenschutzseiten aufbewahrt werden
├── assets/                     # Markenartwork, Projektgrafiken, Screenshots
├── CNAME                       # Benutzerdefinierte GitHub Pages-Domäne
└── LICENSE
```

## Lizenz und Markenmaterialien

Der Quellcode ist unter der Lizenz **GNU General Public License v3.0 (GPL-3.0)** lizenziert. Siehe [LICENSE](LICENSE).

**Ausnahme für Marken und Markenmaterialien:** Der Name „Zandaulion“, die Markenidentität und alle Logobilddateien unter `assets/brand/` fallen **nicht** unter die GPL-Lizenz. Alle Rechte an diesen Marken und visuellen Markenmaterialien bleiben vorbehalten. Ohne Genehmigung dürfen sie weder in abgeleiteten Werken noch zur Kennzeichnung eigener Projekte verwendet werden.

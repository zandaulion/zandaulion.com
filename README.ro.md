<!-- readme-languages:start -->
[English](README.md) · [العربية](README.ar.md) · [简体中文](README.zh-CN.md) · [Français](README.fr-FR.md) · [Deutsch](README.de-DE.md) · [हिन्दी](README.hi-IN.md) · [日本語](README.ja-JP.md) · [한국어](README.ko-KR.md) · [Português (Brasil)](README.pt-BR.md) · **Română** · [Español](README.es-ES.md) · [Українська](README.uk.md)
<!-- readme-languages:end -->

# Zandaulion

Un atelier jucăuș pentru idei curioase: aplicații, jocuri și mici unelte de explorat.

**[Vizitați zandaulion.com](https://zandaulion.com/)** · [Colecția românească](https://zandaulion.com/ro/index.html)

Acest repository conține site-ul Zandaulion: o colecție de 20 de proiecte în care poți căuta, pagini individuale pentru proiecte și un editor interactiv de diagrame Sankey. Pagina principală și toate paginile de proiect sunt disponibile în 12 limbi. Site-ul folosește HTML static, CSS și JavaScript simplu și este găzduit pe GitHub Pages.

## Traducerile README

Acest README este disponibil în aceleași 12 limbi ca site-ul. Folosește linkurile din partea de sus pentru a schimba limba. Versiunea în engleză se află în `README.md`, iar traducerile au nume precum `README.ro.md` și `README.ar.md`.

Editați fișierul README în limba engleză și cataloagele corespunzătoare în `locales/readme/`, apoi rulați `python scripts/build_readmes.py` pentru a regenera fișierele traduse. Utilizați `python scripts/build_readmes.py --check` pentru a detecta fișierele învechite sau traducerile lipsă. Indicatorul opțional `--fetch` pregătește schițele de traducere lipsă prin același serviciu de traducere Google utilizat pentru textul proiectului. Comenzile, căile, exemplele de cod și destinațiile linkurilor sunt păstrate.

## Ce găsești aici

- O colecție cu filtre pe categorii, căutare care ignoră diacriticele și descoperire aleatorie.
- Descrieri de proiecte, linkuri de lansare și sursă, galerii de capturi de ecran și proiecte conexe.
- Galerii de imagini accesibile de la tastatură cu subtitrări, comenzi anterioare/următoare și gesturi tactile.
- Un editor Sankey cu editare nod/link, export de imagini și import/export JSON.
- Selectarea limbii, preferințele salvate, detectarea limbii browserului și aspectul arabă de la dreapta la stânga.
- Notificări de confidențialitate în limba engleză existente la adresele URL deja înregistrate cu Google Play.

### Colecția de proiecte

| Proiect | Pagina de pe site |
| --- | --- |
| Admitere Liceu Kit | [admitere.html](admitere.html) |
| BP Digitizer — Android și PWA | [bpdigitizer.html](bpdigitizer.html) |
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
| Bitey, fostul Plate | [plate.html](plate.html) |
| PWA Invite Console | [pwainvite.html](pwainvite.html) |
| pwa-kit | [pwakit.html](pwakit.html) |
| Editor de diagrame Sankey | [sankey.html](sankey.html) |
| Spendosaurus | [spendosaurus.html](spendosaurus.html) |
| Thermostat Monitor | [thermostat.html](thermostat.html) |

Arhivele de aplicații sunt separate de acest site web. Arhivele redenumite sunt [zandaulion.com](https://github.com/zandaulion/zandaulion.com), [bitey](https://github.com/zandaulion/bitey) și [kerfloom](https://github.com/zandaulion/kerfloom).

Bitey păstrează pagina `plate.html` stabilită. BP Digitizer are o pagină pentru ambele platforme; `wbpdigitizer.html` rămâne o redirecționare de compatibilitate către `bpdigitizer.html#web-version`.

## Previzualizare locală

Rulați aceste comenzi din rădăcina depozitului. Python este necesar pentru generator și verificări; scripturile Python folosesc numai biblioteca standard. Node.js cu runner de testare încorporat este necesar pentru testele de limbă. Nu există nicio instalare npm sau pas de bundler frontend.

```sh
python scripts/build_locales.py
python -m http.server 8765 --bind 127.0.0.1
```

Deschideți [pagina de pornire locală](http://127.0.0.1:8765/index.html) sau utilizați [Engleză explicită](http://127.0.0.1:8765/index.html?lang=en-US) sau [Română](http://127.0.0.1:8765/ro/index.html) pentru a ocoli selecția automată a limbii.

HTML generat este, de asemenea, proiectat pentru navigarea directă a fișierelor. Deschideți `index.html`, nu un folder de limbă; Navigarea folosește nume de fișiere explicite pentru a evita listele de directoare. Scripturile de limbă sunt mai degrabă scripturi obișnuite decât module ES. Previzualizarea locală HTTP este modalitatea recomandată de examinare a modificărilor.

## Limbi și navigare

| Limba | Locale | Pagina principală |
| --- | --- | --- |
| Engleză | `en-US` | `/index.html?lang=en-US` |
| Arabă | `ar` | `/ar/index.html` |
| Chineză simplificată | `zh-CN` | `/zh-cn/index.html` |
| Franceză | `fr-FR` | `/fr/index.html` |
| Germană | `de-DE` | `/de/index.html` |
| Hindi | `hi-IN` | `/hi/index.html` |
| Japoneză | `ja-JP` | `/ja/index.html` |
| Coreeană | `ko-KR` | `/ko/index.html` |
| Portugheză, Brazilia | `pt-BR` | `/pt-br/index.html` |
| Română | `ro` | `/ro/index.html` |
| Spaniolă | `es-ES` | `/es/index.html` |
| Ucraineană | `uk` | `/uk/index.html` |

Paginile de proiect traduse păstrează același nume de fișier sub prefixul limbii, cum ar fi `/fr/kerfloom.html` sau `/ja/plate.html`. Schimbarea limbii menține proiectul curent și ancora secțiunii. Link-urile colecțiilor și proiectelor conexe rămân în limba selectată. Fiecare pagină de pornire și pagină de proiect are o declarație de limbă, un URL canonic și linkuri `hreflang` reciproce.

O cale de limbă explicită, cum ar fi `/ro/`, are întotdeauna prioritate. Numai pe pagina principală de intrare (`/` sau `/index.html`), selecția urmează această ordine:

1. O alegere `?lang=` explicită acceptată.
2. O preferință de limbă salvată.
3. Prima preferință de browser acceptată de la `navigator.languages`.
4. Engleză dacă nicio limbă acceptată nu se potrivește.

Variantele regionale se potrivesc cu limba lor de bază: de exemplu, `fr-CA` selectează limba franceză. Linkurile în limba engleză includ `?lang=en-US`, astfel încât o alegere explicită funcționează chiar și atunci când stocarea browserului nu este disponibilă. Redirecționările la pagina de intrare păstrează ancorele de secțiune și alți parametri de interogare. Adresele URL de proiect și de confidențialitate nu redirecționează niciodată în funcție de limba browserului.

Link-urile pentru limbile paginii de pornire sunt prezente în HTML și funcționează fără JavaScript. Antetele de proiect, selectorul de limbă, comenzile pentru galerie și editorul Sankey folosesc JavaScript. Link-urile de proiect ale fișierelor locale au limba selectată în adresa URL, deoarece browserele pot izola spațiul de stocare pentru fiecare fișier.

## Editarea și generarea paginilor

| Ce să schimbi | Sursa de editat |
| --- | --- |
| Aspectul paginii de pornire | `templates/home.html` |
| Textul paginii de pornire în fiecare limbă | `locales/<locale>.json` |
| Conținutul și aspectul proiectului în limba engleză | Fișierele de proiect HTML rădăcină, cum ar fi `kerfloom.html` |
| Conținutul proiectului tradus | `locales/projects/<locale>/<project>.json` |
| Controalele galeriei și mesajele editorului | `locales/projects/<locale>/common.json` |
| Corecții de traducere reutilizabile | `locales/projects/overrides.json` |
| Localizări și prefixe URL acceptate | `scripts/site_locales.py` |
| Acoperirea proiectului și redarea traducerii | `scripts/project_locales.py` |
| Prezentare comună | `workshop.css` și `project.css` |
| Colecție, proiect și comportament lingvistic | `workshop.js`, `project.js` și `language.js` |
| Comportamentul editorului Sankey | `sankey.js` |

După editarea conținutului sursă sau a cataloagelor, regenerează site-ul:

```sh
python scripts/build_locales.py
```

Generatorul produce 12 pagini de start, 220 de pagini de proiect traduse și `language-data.js`. De asemenea, menține linkuri canonice și în limbi alternative pe cele 20 de pagini ale proiectului în limba engleză. Angajați aceste rezultate generate cu sursele lor; GitHub Pages le servește direct, fără a rula generatorul Python.

Nu editați paginile de pornire generate, HTML traduse sau `language-data.js` direct: regenerarea înlocuiește acele editări. Cataloagele paginii de pornire trebuie să aibă chei care nu se potrivesc. Cataloagele de proiecte folosesc textul sursă ca chei, astfel încât modificările aduse copiei în limba engleză necesită actualizări corespunzătoare ale traducerii. Traducerile lipsă eșuează construcția.

### Întreținerea traducerilor

Schițele de traducere ale proiectelor au fost pregătite cu serviciul de traducere Google, apoi au fost perfecționate formularea partajată, controalele galeriei, numele produselor și frazele tehnice selectate. S-au păstrat traducerile anterioare în limba română. Revizuirea vorbitorilor nativi este încă utilă, în special pentru terminologia tehnică. Numele aplicațiilor, capturile de ecran și identificatorii tehnici își păstrează forma inițială.

Scriptul de creație opțional poate pregăti traducerile lipsă pentru o singură locație:

```sh
python scripts/translate_projects.py --fetch --language ro
```

Omiteți `--language ro` pentru a procesa toate localitățile traduse. Indicatorul `--fetch` permite trimiterea textului public lipsă de proiect către serviciul de traducere al Google. Cataloagele existente sunt reutilizate, numele produselor sunt protejate și corecțiile `overrides.json` sunt aplicate. Fără `--fetch`, scriptul raportează șirurile lipsă și reîmprospătează cataloagele numai acolo unde toate traducerile necesare sunt deja disponibile. Nu este o verificare numai în citire.

Unele expresii partajate apar și în cataloagele pentru fiecare proiect. Introduceți corecții coerente de redactare în `overrides.json` și rulați scriptul de pregătire pentru a le aplica pe proiecte, apoi reconstruiți HTML. Examinați traducerile generate înainte de publicare. Dosarul `.translation-cache/` este ignorat de Git. Compilările normale și site-ul web implementat nu apelează niciodată la un serviciu de traducere.

## Verificări înainte de publicare

Cu serverul de previzualizare local care rulează, rulați aceste comenzi într-un alt terminal:

```sh
python scripts/build_locales.py --check
python scripts/check_site.py --url http://127.0.0.1:8765
node --test scripts/test_language.cjs
```

- Verificarea build-ului detectează ieșirile generate obținute și traducerile lipsă.
- Verificarea site-ului acoperă toate cele 261 de pagini HTML: 12 pagini de start, 240 de pagini de proiect, opt notificări de confidențialitate și o redirecționare de compatibilitate. Verifică linkurile locale, materialele, ID-urile duplicate în afara markupului de confidențialitate păstrat, metadatele limbajului proiectului, linkurile SEO reciproce și direcția arabă. Cu `--url`, verifică, de asemenea, răspunsurile HTTP și compară notificările de confidențialitate difuzate cu fișierele lor sursă.
- Testele de limbă acoperă prioritatea preferințelor, potrivirea regională, stocarea blocată, rădăcinile fișierelor și subdirectoarelor, comportamentul de redirecționare și păstrarea secțiunilor.

Pentru verificări offline, rulați `python scripts/check_site.py` fără `--url`. Examinați paginile afectate și în browser: aspectul mobil, direcția arabă, schimbarea limbii, comenzile de la tastatură din galerie și interacțiunile editorului.

## Publicare

Site-ul live este [zandaulion.com](https://zandaulion.com/), publicat de la `main` la GitHub Pages. `CNAME` păstrează configurația personalizată a domeniului.

După generarea și verificarea site-ului, comiteți sursa și modificările generate și împingeți `main`. Așteptați finalizarea fluxului de lucru **pages build and deployment**, apoi verificați adresele URL modificate pe domeniul live. Păstrați proiectul și rutele de confidențialitate existente atunci când redenumiti aplicațiile sau depozitele acestora.

Site-ul folosește active statice și scripturi obișnuite. Fonturile sunt încărcate din Google Fonts, iar editorul Sankey încarcă Apache ECharts din jsDelivr. Nu este necesar niciun serviciu de traducere în timpul execuției.

## Adresele stabile ale politicilor de confidențialitate

Aceste adrese URL sunt deja înregistrate cu Google Play. **Nu le redenumiți, mutați sau eliminați și nu rescrieți conținutul lor ca parte a localizării site-ului web.**

- `/bitey-privacy.html`
- `/bpdigitizer-privacy.html`
- `/gravitygarden-privacy.html`
- `/gravitytdg-privacy.html`
- `/gravitywarp-privacy.html`
- `/orbitpuzzles-privacy.html`
- `/palebluedot-privacy.html`
- `/plate-privacy.html`

Notificările rămân în limba engleză și își păstrează prezentarea originală și activele `index.css` / `main.js` partajate. Modificările activelor partajate ar trebui să țină cont de aceste pagini. `scripts/check_site.py` păzește căile și poate verifica conținutul difuzat.

## Structura repository-ului

```text
/
├── index.html                  # Pagina de pornire în limba engleză generată
├── <project>.html              # Surse de proiecte în limba engleză
├── *-privacy.html              # Notificări de confidențialitate în limba engleză păstrate
├── wbpdigitizer.html           # Redirecționare de compatibilitate
├── templates/home.html         # Șablon de pagină de pornire partajată
├── README.*.md                 # Fișiere README traduse
├── locales/                    # Site-ul web și cataloage de traducere README
├── ar/, de/, ro/, ...           # Paginile de pornire ale limbii generate și paginile de proiect
├── scripts/                    # Generare, pregătire traducere, verificări, teste
├── language-data.js            # Navigare generată și dicționare UI
├── language.js                 # Selectarea limbii și navigare
├── workshop.css / workshop.js  # Prezentarea atelierului și comportamentul de colectare
├── project.css / project.js    # Prezentarea proiectului, antet/subsol, galerii
├── sankey.js                   # Editor de diagrame interactiv
├── sample_sankey.json          # Date diagramă eșantion
├── index.css / main.js         # Active partajate originale, păstrate pentru paginile de confidențialitate
├── assets/                     # Lucrări de artă de marcă, grafică de proiect, capturi de ecran
├── CNAME                       # GitHub Pages domeniu personalizat
└── LICENSE
```

## Licență și elemente de identitate vizuală

Codul sursă este licențiat sub **GNU General Public License v3.0 (GPL-3.0)**. Vezi [LICENSE](LICENSE).

**Excepție pentru mărci și identitatea vizuală:** Numele „Zandaulion”, identitatea mărcii și toate fișierele cu imagini de logo din `assets/brand/` **nu sunt** acoperite de licența GPL. Toate drepturile asupra acestor mărci și elemente vizuale sunt rezervate. Nu le poți folosi în lucrări derivate sau pentru a identifica propriile proiecte fără permisiune.

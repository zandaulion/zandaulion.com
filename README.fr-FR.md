<!-- readme-languages:start -->
[English](README.md) · [العربية](README.ar.md) · [简体中文](README.zh-CN.md) · **Français** · [Deutsch](README.de-DE.md) · [हिन्दी](README.hi-IN.md) · [日本語](README.ja-JP.md) · [한국어](README.ko-KR.md) · [Português (Brasil)](README.pt-BR.md) · [Română](README.ro.md) · [Español](README.es-ES.md) · [Українська](README.uk.md)
<!-- readme-languages:end -->

# Zandaulion

Un atelier ludique pour les idées curieuses : des applications, des jeux et de petits outils à explorer.

**[Visitez zandaulion.com](https://zandaulion.com/)** · [RCollection roumaine](https://zandaulion.com/ro/index.html)

Ce référentiel contient le site Web Zandaulion : une collection consultable de 20 projets, des pages de projets individuelles et un éditeur de diagrammes Sankey interactif. La page d'accueil et chaque page de projet sont disponibles en 12 langues. Le site est statique HTML, CSS et vanilla JavaScript, hébergé sur GitHub Pages.

## Traductions du README

Ce README est disponible dans les 12 mêmes langues que le site Web. Utilisez les liens linguistiques en haut pour changer de version. L'anglais vit à `README.md` ; les versions traduites utilisent des noms de fichiers tels que `README.ro.md` et `README.ar.md`.

Modifiez le README anglais et les catalogues correspondants dans `locales/readme/`, puis exécutez `python scripts/build_readmes.py` pour régénérer les fichiers traduits. Utilisez `python scripts/build_readmes.py --check` pour détecter les fichiers périmés ou les traductions manquantes. L'indicateur `--fetch` facultatif prépare les brouillons de traduction manquants via le même service de traduction Google utilisé pour le texte du projet. Les commandes, chemins, exemples de code et destinations de liens sont conservés.

## Contenu

- Une collection avec des filtres de catégorie, une recherche insensible aux accents et une découverte aléatoire.
- Descriptions de projets, liens de lancement et de source, galeries de captures d'écran et projets associés.
- Galeries d'images accessibles au clavier avec légendes, commandes précédentes/suivantes et gestes tactiles.
- Un éditeur Sankey avec édition de nœuds/liens, exportation d'images et importation/exportation JSON.
- Sélection de la langue, préférences enregistrées, détection de la langue du navigateur et disposition arabe de droite à gauche.
- Avis de confidentialité en anglais existants sur les URL déjà enregistrées avec Google Play.

### Collection de projets

| Projet | Page du site Web |
| --- | --- |
| Admitere Liceu Kit | [admitere.html](admitere.html) |
| BP Digitizer — Android et PWA | [bpdigitizer.html](bpdigitizer.html) |
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
| Bitey, anciennement Plate | [plate.html](plate.html) |
| PWA Invite Console | [pwainvite.html](pwainvite.html) |
| pwa-kit | [pwakit.html](pwakit.html) |
| Éditeur de diagramme Sankey | [sankey.html](sankey.html) |
| Spendosaurus | [spendosaurus.html](spendosaurus.html) |
| Thermostat Monitor | [thermostat.html](thermostat.html) |

Les référentiels d'applications sont distincts de ce site Web. Les référentiels renommés sont [zandaulion.com](https://github.com/zandaulion/zandaulion.com), [bitey](https://github.com/zandaulion/bitey) et [kerfloom](https://github.com/zandaulion/kerfloom).

Bitey conserve la page `plate.html` établie. BP Digitizer comporte une page pour les deux plates-formes ; `wbpdigitizer.html` reste une redirection de compatibilité vers `bpdigitizer.html#web-version`.

## Aperçu local

Exécutez ces commandes à partir de la racine du référentiel. Python est nécessaire pour le générateur et les contrôles ; les scripts Python utilisent uniquement la bibliothèque standard. Node.js avec le programme d'exécution de tests intégré est nécessaire pour les tests de langue. Il n’y a pas d’étape d’installation ou de bundle frontal npm.

```sh
python scripts/build_locales.py
python -m http.server 8765 --bind 127.0.0.1
```

Ouvrez [la page d'accueil locale](http://127.0.0.1:8765/index.html) ou utilisez [anglais explicite](http://127.0.0.1:8765/index.html?lang=en-US) ou [Roumain](http://127.0.0.1:8765/ro/index.html) pour contourner la sélection automatique de la langue.

Le HTML généré est également conçu pour la navigation directe dans les fichiers. Ouvrez `index.html`, pas un dossier de langue ; la navigation utilise des noms de fichiers explicites pour éviter les listes de répertoires. Les scripts de langage sont des scripts ordinaires plutôt que des modules ES. L'aperçu local HTTP est la méthode recommandée pour examiner les modifications.

## Langues et navigation

| Langue | Paramètres régionaux | Page d'accueil |
| --- | --- | --- |
| Anglais | `en-US` | `/index.html?lang=en-US` |
| arabe | `ar` | `/ar/index.html` |
| Chinois, simplifié | `zh-CN` | `/zh-cn/index.html` |
| Français | `fr-FR` | `/fr/index.html` |
| Allemand | `de-DE` | `/de/index.html` |
| hindi | `hi-IN` | `/hi/index.html` |
| Japonais | `ja-JP` | `/ja/index.html` |
| Coréen | `ko-KR` | `/ko/index.html` |
| Portugais, Brésil | `pt-BR` | `/pt-br/index.html` |
| Roumain | `ro` | `/ro/index.html` |
| Espagnol | `es-ES` | `/es/index.html` |
| Ukrainien | `uk` | `/uk/index.html` |

Les pages de projet traduites conservent le même nom de fichier sous le préfixe de langue, tel que `/fr/kerfloom.html` ou `/ja/plate.html`. Le changement de langue conserve l’ancrage du projet et de la section en cours. Les liens vers la collection et les projets associés restent dans la langue sélectionnée. Chaque page d'accueil et page de projet comporte une déclaration de langue, une URL canonique et des liens `hreflang` réciproques.

Un chemin de langage explicite, tel que `/ro/`, est toujours prioritaire. Sur la page d'entrée principale uniquement (`/` ou `/index.html`), la sélection suit cet ordre :

1. Un choix `?lang=` explicite pris en charge.
2. Une préférence de langue enregistrée.
3. La première préférence de navigateur prise en charge par `navigator.languages`.
4. Anglais si aucune langue prise en charge ne correspond.

Les variantes régionales correspondent à leur langue de base : par exemple, `fr-CA` sélectionne le français. Les liens en anglais incluent `?lang=en-US`, donc un choix explicite fonctionne même lorsque le stockage du navigateur n'est pas disponible. Les redirections de page d’entrée préservent les ancres de section et d’autres paramètres de requête. Les URL de projet et de confidentialité ne redirigent jamais en fonction de la langue du navigateur.

Les liens de langue de la page d'accueil sont présents dans le HTML et fonctionnent sans JavaScript. Les en-têtes de projet, leur sélecteur de langue, les contrôles de la galerie et l'éditeur Sankey utilisent JavaScript. Les liens de projet de fichier local portent la langue sélectionnée dans l'URL car les navigateurs peuvent isoler le stockage pour chaque fichier.

## Modifier et générer les pages

| Que changer | Source à modifier |
| --- | --- |
| Disposition de la page d'accueil | `templates/home.html` |
| Texte de la page d'accueil dans chaque langue | `locales/<locale>.json` |
| Contenu et mise en page du projet en anglais | Fichiers du projet racine HTML, tels que `kerfloom.html` |
| Contenu du projet traduit | `locales/projects/<locale>/<project>.json` |
| Contrôles de la galerie et messages de l'éditeur | `locales/projects/<locale>/common.json` |
| Corrections de traduction réutilisables | `locales/projects/overrides.json` |
| Paramètres régionaux et préfixes d'URL pris en charge | `scripts/site_locales.py` |
| Couverture du projet et rendu des traductions | `scripts/project_locales.py` |
| Présentation partagée | `workshop.css` et `project.css` |
| Comportement de la collection, du projet et du langage | `workshop.js`, `project.js` et `language.js` |
| Comportement de l'éditeur Sankey | `sankey.js` |

Après avoir modifié le contenu source ou les catalogues, régénérez le site :

```sh
python scripts/build_locales.py
```

Le générateur produit 12 pages d'accueil, 220 pages de projet traduites et `language-data.js`. Il maintient également des liens canoniques et dans des langues alternatives sur les 20 pages du projet en anglais. Validez ces résultats générés avec leurs sources ; GitHub Pages les dessert directement sans faire fonctionner le générateur Python.

Ne modifiez pas directement les pages d'accueil générées, HTML traduites ou `language-data.js` : la régénération remplace ces modifications. Les catalogues de la page d'accueil doivent avoir des clés non vides correspondantes. Les catalogues de projets utilisent le texte source comme clés, de sorte que les modifications apportées à la copie anglaise nécessitent des mises à jour de traduction correspondantes. Les traductions manquantes échouent à la construction.

### Maintenance des traductions

Les ébauches de traduction du projet ont été préparées avec le service de traduction de Google, puis les formulations partagées, les commandes de galerie, les noms de produits et les expressions techniques sélectionnées ont été affinées. Les traductions roumaines antérieures ont été conservées. La révision par un locuteur natif reste utile, en particulier pour la terminologie technique. Les noms d'applications, les captures d'écran et les identifiants techniques conservent leur forme d'origine.

Le script de création facultatif peut préparer les traductions manquantes pour une langue :

```sh
python scripts/translate_projects.py --fetch --language ro
```

Omettez `--language ro` pour traiter tous les paramètres régionaux traduits. L'indicateur `--fetch` permet d'envoyer le texte public manquant du projet au service de traduction de Google. Les catalogues existants sont réutilisés, les noms de produits sont protégés et les corrections `overrides.json` sont appliquées. Sans `--fetch`, le script signale les chaînes manquantes et actualise les catalogues uniquement lorsque toutes les traductions requises sont déjà disponibles. Il ne s'agit pas d'une vérification en lecture seule.

Certaines expressions partagées apparaissent également dans les catalogues par projet. Mettez des corrections de formulation cohérentes dans `overrides.json` et exécutez le script de préparation pour les appliquer à tous les projets, puis reconstruisez le HTML. Vérifiez les traductions générées avant de les publier. Le dossier `.translation-cache/` est ignoré par Git. Les versions normales et le site Web déployé ne font jamais appel à un service de traduction.

## Vérifications avant publication

Avec le serveur de prévisualisation local en cours d'exécution, exécutez ces commandes dans un autre terminal :

```sh
python scripts/build_locales.py --check
python scripts/check_site.py --url http://127.0.0.1:8765
node --test scripts/test_language.cjs
```

- La vérification de build détecte les sorties générées obsolètes et les traductions manquantes.
- La vérification du site couvre les 261 pages HTML : 12 pages d'accueil, 240 pages de projet, huit avis de confidentialité et une redirection de compatibilité. Il vérifie les liens locaux, les actifs, les identifiants en double en dehors du balisage de confidentialité préservé, les métadonnées de la langue du projet, les liens SEO réciproques et la direction arabe. Avec `--url`, il vérifie également les réponses HTTP et compare les avis de confidentialité envoyés avec leurs fichiers sources.
- Les tests linguistiques couvrent la priorité des préférences, la correspondance régionale, le stockage bloqué, les racines des fichiers et des sous-répertoires, le comportement de redirection et la préservation des sections.

Pour les vérifications de liens hors ligne, exécutez `python scripts/check_site.py` sans `--url`. Examinez également les pages concernées dans le navigateur : mise en page mobile, direction arabe, changement de langue, commandes du clavier de la galerie et interactions avec l'éditeur.

## Déploiement

Le site en direct est [zandaulion.com](https://zandaulion.com/), publié de `main` à GitHub Pages. `CNAME` conserve la configuration de domaine personnalisée.

Après avoir généré et vérifié le site, validez la source et les modifications générées et poussez `main`. Attendez la fin du workflow de création et de déploiement de **pages build and deployment**, puis vérifiez les URL modifiées sur le domaine actif. Conservez les routes de projet et de confidentialité existantes lorsque vous renommez des applications ou leurs référentiels.

Le site utilise des actifs statiques et des scripts ordinaires. Les polices sont chargées à partir de Google Fonts et l'éditeur Sankey charge Apache ECharts à partir de jsDelivr. Aucun service de traduction n’est requis au moment de l’exécution.

## Adresses stables des notices de confidentialité

Ces URL sont déjà enregistrées avec Google Play. **Ne les renommez pas, ne les déplacez pas, ne les supprimez pas et ne réécrivez pas leur contenu dans le cadre de la localisation du site Web.**

- `/bitey-privacy.html`
- `/bpdigitizer-privacy.html`
- `/gravitygarden-privacy.html`
- `/gravitytdg-privacy.html`
- `/gravitywarp-privacy.html`
- `/orbitpuzzles-privacy.html`
- `/palebluedot-privacy.html`
- `/plate-privacy.html`

Les notices restent en anglais et conservent leur présentation originale et les actifs partagés `index.css` / `main.js`. Les modifications des actifs partagés doivent tenir compte de ces pages. `scripts/check_site.py` garde les chemins et peut vérifier le contenu servi.

## Structure du dépôt

```text
/
├── index.html                  # Page d'accueil en anglais générée
├── <project>.html              # Sources du projet en anglais
├── *-privacy.html              # Avis de confidentialité en anglais conservés
├── wbpdigitizer.html           # Redirection de compatibilité
├── templates/home.html         # Modèle de page d'accueil partagée
├── README.*.md                 # Fichiers README traduits
├── locales/                    # Catalogues de traduction de sites Web et README
├── ar/, de/, ro/, ...           # Pages d'accueil linguistiques et pages de projet générées
├── scripts/                    # Génération, préparation de traduction, contrôles, tests
├── language-data.js            # Dictionnaires de navigation et d'interface utilisateur générés
├── language.js                 # Sélection de la langue et navigation
├── workshop.css / workshop.js  # Présentation de l'atelier et comportement de collecte
├── project.css / project.js    # Présentation du projet, en-tête/pied de page, galeries
├── sankey.js                   # Éditeur de diagramme interactif
├── sample_sankey.json          # Exemple de données de diagramme
├── index.css / main.js         # Actifs partagés d'origine, conservés pour les pages de confidentialité
├── assets/                     # Illustrations de marque, graphiques de projet, captures d'écran
├── CNAME                       # Domaine personnalisé GitHub Pages
└── LICENSE
```

## Licence et éléments de marque

Le code source est sous licence **GNU General Public License v3.0 (GPL-3.0)**. Voir [LICENSE](LICENSE).

**Exception relative aux marques et à l’identité visuelle :** Le nom « Zandaulion », l’identité de la marque et tous les fichiers d’images de logo situés dans `assets/brand/` **ne sont pas** couverts par la licence GPL. Tous les droits sur ces marques et éléments visuels sont réservés. Vous ne pouvez pas les utiliser dans des œuvres dérivées ni pour identifier vos propres projets sans autorisation.

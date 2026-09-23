<!-- readme-languages:start -->
[English](README.md) · [العربية](README.ar.md) · [简体中文](README.zh-CN.md) · [Français](README.fr-FR.md) · [Deutsch](README.de-DE.md) · [हिन्दी](README.hi-IN.md) · [日本語](README.ja-JP.md) · [한국어](README.ko-KR.md) · **Português (Brasil)** · [Română](README.ro.md) · [Español](README.es-ES.md) · [Українська](README.uk.md)
<!-- readme-languages:end -->

# Zandaulion

Uma oficina divertida para ideias curiosas: aplicativos, jogos e pequenas ferramentas para explorar.

**[Visite zandaulion.com](https://zandaulion.com/)** · [Coleção romena](https://zandaulion.com/ro/index.html)

Este repositório contém o site Zandaulion: uma coleção pesquisável de 20 projetos, páginas de projetos individuais e um editor de diagrama Sankey interativo. A página inicial e todas as páginas do projeto estão disponíveis em 12 idiomas. O site é estático HTML, CSS e vanilla JavaScript, hospedado em GitHub Pages.

## Traduções do README

Este README está disponível nos mesmos 12 idiomas do site. Use os links de idiomas na parte superior para mudar de versão. Inglês mora em `README.md`; versões traduzidas usam nomes de arquivos como `README.ro.md` e `README.ar.md`.

Edite o README em inglês e os catálogos correspondentes em `locales/readme/` e execute `python scripts/build_readmes.py` para regenerar os arquivos traduzidos. Use `python scripts/build_readmes.py --check` para detectar arquivos obsoletos ou traduções ausentes. O sinalizador `--fetch` opcional prepara rascunhos de tradução ausentes por meio do mesmo serviço de tradução Google usado para o texto do projeto. Comandos, caminhos, exemplos de código e destinos de link são preservados.

## O que você encontra aqui

- Uma coleção com filtros de categoria, pesquisa sem distinção de sotaque e descoberta aleatória.
- Descrições de projetos, links de lançamento e origem, galerias de capturas de tela e projetos relacionados.
- Galerias de imagens acessíveis pelo teclado com legendas, controles anteriores/próximos e gestos de toque.
- Um editor Sankey com edição de nó/link, exportação de imagem e importação/exportação JSON.
- Seleção de idioma, preferências salvas, detecção de idioma do navegador e layout árabe da direita para a esquerda.
- Avisos de privacidade em inglês existentes nas URLs já registradas em Google Play.

### Coleção de projetos

| Projeto | Página do site |
| --- | --- |
| Admitere Liceu Kit | [admitere.html](admitere.html) |
| BP Digitizer – Android e PWA | [bpdigitizer.html](bpdigitizer.html) |
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
| Bitey, anteriormente Plate | [plate.html](plate.html) |
| PWA Invite Console | [pwainvite.html](pwainvite.html) |
| pwa-kit | [pwakit.html](pwakit.html) |
| Editor de diagrama Sankey | [sankey.html](sankey.html) |
| Spendosaurus | [spendosaurus.html](spendosaurus.html) |
| Thermostat Monitor | [thermostat.html](thermostat.html) |

Os repositórios de aplicativos são separados deste site. Os repositórios renomeados são [zandaulion.com](https://github.com/zandaulion/zandaulion.com), [bitey](https://github.com/zandaulion/bitey) e [kerfloom](https://github.com/zandaulion/kerfloom).

Bitey mantém a página `plate.html` estabelecida. BP Digitizer possui uma página para ambas as plataformas; `wbpdigitizer.html` continua sendo um redirecionamento de compatibilidade para `bpdigitizer.html#web-version`.

## Prévia local

Execute esses comandos na raiz do repositório. Python é necessário para o gerador e verificações; os scripts Python usam apenas a biblioteca padrão. Node.js com o executor de testes integrado é necessário para os testes de linguagem. Não há instalação do npm ou etapa do empacotador de front-end.

```sh
python scripts/build_locales.py
python -m http.server 8765 --bind 127.0.0.1
```

Abra [a página inicial local](http://127.0.0.1:8765/index.html) ou use [inglês explícito](http://127.0.0.1:8765/index.html?lang=en-US) ou [Romaniano](http://127.0.0.1:8765/ro/index.html) para ignorar a seleção automática de idioma.

O HTML gerado também foi projetado para navegação direta de arquivos. Abra `index.html`, não uma pasta de idioma; a navegação usa nomes de arquivos explícitos para evitar listagens de diretórios. Os scripts de linguagem são scripts comuns em vez de módulos ES. A visualização local do HTTP é a maneira recomendada de revisar as alterações.

## Idiomas e navegação

| Idioma | Local | Página inicial |
| --- | --- | --- |
| Inglês | `en-US` | `/index.html?lang=en-US` |
| Árabe | `ar` | `/ar/index.html` |
| Chinês, simplificado | `zh-CN` | `/zh-cn/index.html` |
| Francês | `fr-FR` | `/fr/index.html` |
| Alemão | `de-DE` | `/de/index.html` |
| Hindi | `hi-IN` | `/hi/index.html` |
| Japonês | `ja-JP` | `/ja/index.html` |
| Coreano | `ko-KR` | `/ko/index.html` |
| Português, Brasil | `pt-BR` | `/pt-br/index.html` |
| Romeno | `ro` | `/ro/index.html` |
| Espanhol | `es-ES` | `/es/index.html` |
| Ucraniano | `uk` | `/uk/index.html` |

As páginas do projeto traduzidas mantêm o mesmo nome de arquivo sob o prefixo do idioma, como `/fr/kerfloom.html` ou `/ja/plate.html`. A troca de idioma mantém o projeto atual e a seção âncora. Os links de coleções e projetos relacionados permanecem no idioma selecionado. Cada página inicial e página do projeto possui uma declaração de idioma, URL canônico e links `hreflang` recíprocos.

Um caminho de linguagem explícito, como `/ro/`, sempre tem precedência. Somente na página de entrada principal (`/` ou `/index.html`), a seleção segue esta ordem:

1. Uma opção `?lang=` explícita suportada.
2. Uma preferência de idioma salva.
3. A primeira preferência de navegador compatível de `navigator.languages`.
4. Inglês se nenhum idioma suportado corresponder.

As variantes regionais correspondem ao idioma base: por exemplo, `fr-CA` seleciona francês. Os links em inglês incluem `?lang=en-US`, portanto, uma escolha explícita funciona mesmo quando o armazenamento do navegador não está disponível. Os redirecionamentos da página de entrada preservam as âncoras da seção e outros parâmetros de consulta. URLs de projeto e privacidade nunca redirecionam com base no idioma do navegador.

Os links de idiomas da página inicial estão presentes no HTML e funcionam sem o JavaScript. Os cabeçalhos do projeto, seu seletor de idioma, os controles da galeria e o editor Sankey usam JavaScript. Os links do projeto de arquivo local carregam o idioma selecionado na URL porque os navegadores podem isolar o armazenamento para cada arquivo.

## Edição e geração de páginas

| O que mudar | Fonte para editar |
| --- | --- |
| Layout da página inicial | `templates/home.html` |
| Texto da página inicial em cada idioma | `locales/<locale>.json` |
| Conteúdo e layout do projeto em inglês | Arquivos HTML do projeto raiz, como `kerfloom.html` |
| Conteúdo do projeto traduzido | `locales/projects/<locale>/<project>.json` |
| Controles da galeria e mensagens do editor | `locales/projects/<locale>/common.json` |
| Correções de tradução reutilizáveis | `locales/projects/overrides.json` |
| Localidades e prefixos de URL suportados | `scripts/site_locales.py` |
| Cobertura do projeto e renderização de tradução | `scripts/project_locales.py` |
| Apresentação compartilhada | `workshop.css` e `project.css` |
| Coleção, projeto e comportamento da linguagem | `workshop.js`, `project.js` e `language.js` |
| Comportamento do editor Sankey | `sankey.js` |

Depois de editar o conteúdo ou catálogos de origem, gere novamente o site:

```sh
python scripts/build_locales.py
```

O gerador produz 12 páginas iniciais, 220 páginas de projetos traduzidas e `language-data.js`. Ele também mantém links canônicos e de idiomas alternativos nas 20 páginas do projeto em inglês. Comprometa esses resultados gerados com suas fontes; GitHub Pages os atende diretamente sem executar o gerador Python.

Não edite páginas iniciais geradas, HTML traduzidas ou `language-data.js` diretamente: a regeneração substitui essas edições. Os catálogos da página inicial devem ter chaves não vazias correspondentes. Os catálogos de projetos usam o texto fonte como chaves, portanto, as alterações na cópia em inglês exigem atualizações de tradução correspondentes. Traduções ausentes falham na compilação.

### Manutenção das traduções

Os rascunhos de tradução do projeto foram preparados com o serviço de tradução do Google e, em seguida, o texto compartilhado, os controles da galeria, os nomes dos produtos e as frases técnicas selecionadas foram refinados. Traduções anteriores para o romeno foram mantidas. A revisão por falantes nativos ainda é útil, especialmente no que diz respeito à terminologia técnica. Nomes de aplicativos, capturas de tela e identificadores técnicos mantêm sua forma original.

O script de autoria opcional pode preparar traduções ausentes para um código de idioma:

```sh
python scripts/translate_projects.py --fetch --language ro
```

Omita `--language ro` para processar todos os códigos de idioma traduzidos. O sinalizador `--fetch` permite enviar texto ausente do projeto público para o serviço de tradução do Google. Os catálogos existentes são reutilizados, os nomes dos produtos são protegidos e as correções `overrides.json` são aplicadas. Sem `--fetch`, o script relata sequências ausentes e atualiza catálogos somente onde todas as traduções necessárias já estão disponíveis. Não é uma verificação somente leitura.

Algumas frases compartilhadas também ocorrem em catálogos por projeto. Coloque correções de texto consistentes em `overrides.json` e execute o script de preparação para aplicá-las em todos os projetos e, em seguida, reconstrua o HTML. Revise as traduções geradas antes de publicar. A pasta `.translation-cache/` é ignorada pelo Git. As compilações normais e o site implantado nunca chamam um serviço de tradução.

## Verificações antes de publicar

Com o servidor de visualização local em execução, execute estes comandos em outro terminal:

```sh
python scripts/build_locales.py --check
python scripts/check_site.py --url http://127.0.0.1:8765
node --test scripts/test_language.cjs
```

- A verificação de construção detecta saídas geradas obsoletas e traduções ausentes.
- A verificação do site cobre todas as 261 páginas HTML: 12 páginas iniciais, 240 páginas de projetos, oito avisos de privacidade e um redirecionamento de compatibilidade. Ele verifica links locais, ativos, IDs duplicados fora da marcação de privacidade preservada, metadados de idioma do projeto, links recíprocos SEO e direção árabe. Com `--url`, ele também verifica as respostas HTTP e compara os avisos de privacidade fornecidos com seus arquivos de origem.
- Os testes de idioma cobrem precedência de preferência, correspondência regional, armazenamento bloqueado, raízes de arquivos e subdiretórios, comportamento de redirecionamento e preservação de seção.

Para verificações de link offline, execute `python scripts/check_site.py` sem `--url`. Revise também as páginas afetadas no navegador: layout móvel, direção árabe, mudança de idioma, controles de teclado da galeria e interações do editor.

## Publicação

O site ativo é [zandaulion.com](https://zandaulion.com/), publicado de `main` a GitHub Pages. `CNAME` mantém a configuração do domínio personalizado.

Após gerar e verificar o site, confirme a origem e as alterações geradas e envie `main`. Aguarde a conclusão do fluxo de trabalho de criação e implantação de páginas **pages build and deployment** e, em seguida, verifique os URLs alterados no domínio ativo. Mantenha o projeto existente e as rotas de privacidade ao renomear aplicativos ou seus repositórios.

O site usa ativos estáticos e scripts comuns. As fontes são carregadas de Google Fonts e o editor Sankey carrega Apache ECharts de jsDelivr. Nenhum serviço de tradução é necessário em tempo de execução.

## URLs fixas dos avisos de privacidade

Esses URLs já estão registrados em Google Play. **Não renomeie, mova ou remova-os, nem reescreva seu conteúdo como parte da localização do site.**

- `/bitey-privacy.html`
- `/bpdigitizer-privacy.html`
- `/gravitygarden-privacy.html`
- `/gravitytdg-privacy.html`
- `/gravitywarp-privacy.html`
- `/orbitpuzzles-privacy.html`
- `/palebluedot-privacy.html`
- `/plate-privacy.html`

Os avisos permanecem em inglês e mantêm sua apresentação original e ativos compartilhados `index.css`/`main.js`. As alterações em ativos compartilhados devem levar em conta essas páginas. `scripts/check_site.py` protege os caminhos e pode verificar o conteúdo veiculado.

## Estrutura do repositório

```text
/
├── index.html                  # Página inicial em inglês gerada
├── <project>.html              # Fontes de projetos em inglês
├── *-privacy.html              # Avisos de privacidade em inglês preservados
├── wbpdigitizer.html           # Redirecionamento de compatibilidade
├── templates/home.html         # Modelo de página inicial compartilhada
├── README.*.md                 # Arquivos README traduzidos
├── locales/                    # Catálogos de tradução de sites e README
├── ar/, de/, ro/, ...           # Páginas iniciais de idiomas e páginas de projetos geradas
├── scripts/                    # Geração, preparação de tradução, verificações, testes
├── language-data.js            # Dicionários de navegação e UI gerados
├── language.js                 # Seleção de idioma e navegação
├── workshop.css / workshop.js  # Apresentação do workshop e comportamento da coleção
├── project.css / project.js    # Apresentação do projeto, cabeçalho/rodapé, galerias
├── sankey.js                   # Editor de diagrama interativo
├── sample_sankey.json          # Dados de diagrama de amostra
├── index.css / main.js         # Ativos compartilhados originais, retidos para páginas de privacidade
├── assets/                     # Arte da marca, gráficos do projeto, capturas de tela
├── CNAME                       # Domínio personalizado GitHub Pages
└── LICENSE
```

## Licença e elementos da marca

O código-fonte é licenciado sob **GNU General Public License v3.0 (GPL-3.0)**. Consulte [LICENSE](LICENSE).

**Exceção de marcas e identidade visual:** O nome “Zandaulion”, a identidade da marca e todos os arquivos de imagem de logotipo em `assets/brand/` **não** são abrangidos pela licença GPL. Todos os direitos sobre essas marcas e esses elementos visuais são reservados. Você não pode usá-los em obras derivadas nem para identificar seus próprios projetos sem autorização.

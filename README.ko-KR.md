<!-- readme-languages:start -->
[English](README.md) · [العربية](README.ar.md) · [简体中文](README.zh-CN.md) · [Français](README.fr-FR.md) · [Deutsch](README.de-DE.md) · [हिन्दी](README.hi-IN.md) · [日本語](README.ja-JP.md) · **한국어** · [Português (Brasil)](README.pt-BR.md) · [Română](README.ro.md) · [Español](README.es-ES.md) · [Українська](README.uk.md)
<!-- readme-languages:end -->

# Zandaulion

호기심 어린 아이디어를 위한 즐거운 작업실. 앱과 게임, 작은 도구들을 둘러보세요.

**[zandaulion.com 방문](https://zandaulion.com/)** · [루마니아 컬렉션](https://zandaulion.com/ro/index.html)

이 저장소에는 검색 가능한 20개 프로젝트 컬렉션, 개별 프로젝트 페이지 및 대화형 Sankey 다이어그램 편집기인 Zandaulion 웹 사이트가 포함되어 있습니다. 홈페이지와 모든 프로젝트 페이지는 12개 언어로 제공됩니다. 사이트는 GitHub Pages에서 호스팅되는 정적 HTML, CSS 및 바닐라 JavaScript입니다.

## README 번역

이 README는 웹사이트와 동일한 12개 언어로 제공됩니다. 버전을 전환하려면 상단의 언어 링크를 사용하세요. 영어는 `README.md`에 거주합니다. 번역된 버전은 `README.ro.md` 및 `README.ar.md`와 같은 파일 이름을 사용합니다.

영어 README와 `locales/readme/`의 해당 카탈로그를 편집한 다음 `python scripts/build_readmes.py`를 실행하여 번역된 파일을 재생성합니다. 오래된 파일이나 누락된 번역을 감지하려면 `python scripts/build_readmes.py --check`를 사용하세요. 선택적 `--fetch` 플래그는 프로젝트 텍스트에 사용되는 것과 동일한 Google 번역 서비스를 통해 누락된 번역 초안을 준비합니다. 명령, 경로, 코드 예제 및 링크 대상은 유지됩니다.

## 주요 내용

- 카테고리 필터, 악센트를 구분하지 않는 검색 및 무작위 검색 기능을 갖춘 컬렉션입니다.
- 프로젝트 설명, 실행 및 소스 링크, 스크린샷 갤러리, 관련 프로젝트.
- 캡션, 이전/다음 컨트롤, 터치 제스처가 포함된 키보드 접근 가능 이미지 갤러리입니다.
- 노드/링크 편집, 이미지 내보내기 및 JSON 가져오기/내보내기가 가능한 Sankey 편집기입니다.
- 언어 선택, 저장된 기본 설정, 브라우저 언어 감지 및 아랍어 오른쪽에서 왼쪽 레이아웃.
- Google Play에 이미 등록된 URL에 기존 영어 개인정보 보호정책이 있습니다.

### 프로젝트 모음

| 프로젝트 | 웹사이트 페이지 |
| --- | --- |
| Admitere Liceu Kit | [admitere.html](admitere.html) |
| BP Digitizer — 안드로이드 및 PWA | [bpdigitizer.html](bpdigitizer.html) |
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
| Bitey, 이전 이름 Plate | [plate.html](plate.html) |
| PWA Invite Console | [pwainvite.html](pwainvite.html) |
| pwa-kit | [pwakit.html](pwakit.html) |
| Sankey 다이어그램 편집기 | [sankey.html](sankey.html) |
| Spendosaurus | [spendosaurus.html](spendosaurus.html) |
| Thermostat Monitor | [thermostat.html](thermostat.html) |

앱 저장소는 이 웹사이트와 별개입니다. 이름이 변경된 리포지토리는 [zandaulion.com](https://github.com/zandaulion/zandaulion.com), [bitey](https://github.com/zandaulion/bitey) 및 [kerfloom](https://github.com/zandaulion/kerfloom)입니다.

Bitey는 설정된 `plate.html` 페이지를 유지합니다. BP Digitizer에는 두 플랫폼 모두에 대해 하나의 페이지가 있습니다. `wbpdigitizer.html`는 `bpdigitizer.html#web-version`에 대한 호환성 리디렉션으로 유지됩니다.

## 로컬 미리보기

저장소 루트에서 다음 명령을 실행하십시오. 발전기 및 점검에는 Python가 필요합니다. Python 스크립트는 표준 라이브러리만 사용합니다. 언어 테스트에는 테스트 러너가 내장된 Node.js가 필요합니다. npm 설치 또는 프런트엔드 번들러 단계가 없습니다.

```sh
python scripts/build_locales.py
python -m http.server 8765 --bind 127.0.0.1
```

[로컬 홈페이지](http://127.0.0.1:8765/index.html)를 열거나 [명시적 영어](http://127.0.0.1:8765/index.html?lang=en-US) 또는 [Romanian](http://127.0.0.1:8765/ro/index.html)를 사용하여 자동 언어 선택을 우회합니다.

생성된 HTML는 직접 파일 탐색을 위해 설계되었습니다. 언어 폴더가 아닌 `index.html`를 엽니다. 탐색은 디렉토리 목록을 피하기 위해 명시적인 파일 이름을 사용합니다. 언어 스크립트는 ES 모듈이 아닌 일반 스크립트입니다. 로컬 HTTP 미리보기는 변경 사항을 검토하는 데 권장되는 방법입니다.

## 언어와 탐색

| 언어 | 로케일 | 홈페이지 |
| --- | --- | --- |
| 영어 | `en-US` | `/index.html?lang=en-US` |
| 아랍어 | `ar` | `/ar/index.html` |
| 중국어, 간체 | `zh-CN` | `/zh-cn/index.html` |
| 프랑스어 | `fr-FR` | `/fr/index.html` |
| 독일어 | `de-DE` | `/de/index.html` |
| 힌디어 | `hi-IN` | `/hi/index.html` |
| 일본어 | `ja-JP` | `/ja/index.html` |
| 한국어 | `ko-KR` | `/ko/index.html` |
| 포르투갈어, 브라질 | `pt-BR` | `/pt-br/index.html` |
| 루마니아어 | `ro` | `/ro/index.html` |
| 스페인어 | `es-ES` | `/es/index.html` |
| 우크라이나어 | `uk` | `/uk/index.html` |

번역된 프로젝트 페이지는 `/fr/kerfloom.html` 또는 `/ja/plate.html`와 같이 언어 접두사 아래에 동일한 파일 이름을 유지합니다. 언어 전환은 현재 프로젝트와 섹션 앵커를 유지합니다. 컬렉션 및 관련 프로젝트 링크는 선택한 언어로 유지됩니다. 각 홈페이지와 프로젝트 페이지에는 언어 선언, 표준 URL 및 상호 `hreflang` 링크가 있습니다.

`/ro/`와 같은 명시적 언어 경로가 항상 우선합니다. 기본 항목 페이지(`/` 또는 `/index.html`)에서만 선택은 다음 순서를 따릅니다.

1. 지원되는 명시적 `?lang=` 선택입니다.
2. 저장된 언어 기본 설정입니다.
3. `navigator.languages`에서 처음으로 지원되는 브라우저 기본 설정입니다.
4. 지원되는 언어가 일치하지 않으면 영어입니다.

지역 변형은 기본 언어와 일치합니다. 예를 들어 `fr-CA`는 프랑스어를 선택합니다. 영어 링크에는 `?lang=en-US`가 포함되어 있으므로 브라우저 저장 공간을 사용할 수 없는 경우에도 명시적인 선택이 작동합니다. 항목 페이지 리디렉션은 섹션 앵커 및 기타 쿼리 매개변수를 유지합니다. 프로젝트 및 개인 정보 보호 URL은 브라우저 언어에 따라 리디렉션되지 않습니다.

홈페이지 언어 링크는 HTML에 있으며 JavaScript 없이 작동합니다. 프로젝트 헤더, 언어 선택기, 갤러리 컨트롤 및 Sankey 편집기는 JavaScript를 사용합니다. 브라우저는 각 파일에 대한 저장소를 격리할 수 있으므로 로컬 파일 프로젝트 링크는 URL에서 선택한 언어를 전달합니다.

## 페이지 편집 및 생성

| 무엇을 바꿔야 할까요? | 편집할 소스 |
| --- | --- |
| 홈페이지 레이아웃 | `templates/home.html` |
| 각 언어로 된 홈페이지 텍스트 | `locales/<locale>.json` |
| 영어 프로젝트 내용 및 레이아웃 | 루트 프로젝트 HTML 파일(예: `kerfloom.html`) |
| 번역된 프로젝트 콘텐츠 | `locales/projects/<locale>/<project>.json` |
| 갤러리 컨트롤 및 편집기 메시지 | `locales/projects/<locale>/common.json` |
| 재사용 가능한 번역 수정 | `locales/projects/overrides.json` |
| 지원되는 로케일 및 URL 접두어 | `scripts/site_locales.py` |
| 프로젝트 범위 및 번역 렌더링 | `scripts/project_locales.py` |
| 공유 프레젠테이션 | `workshop.css` 및 `project.css` |
| 컬렉션, 프로젝트 및 언어 동작 | `workshop.js`, `project.js` 및 `language.js` |
| Sankey 편집기 동작 | `sankey.js` |

소스 콘텐츠 또는 카탈로그를 편집한 후 사이트를 다시 생성합니다.

```sh
python scripts/build_locales.py
```

생성기는 12개의 홈페이지, 220개의 번역된 프로젝트 페이지 및 `language-data.js`를 생성합니다. 또한 20개의 영어 프로젝트 페이지에 대한 표준 및 대체 언어 링크를 유지 관리합니다. 이렇게 생성된 출력을 소스와 함께 커밋합니다. GitHub Pages는 Python 생성기를 실행하지 않고 직접 서비스를 제공합니다.

생성된 홈페이지, 번역된 HTML 또는 `language-data.js`를 직접 편집하지 마십시오. 재생성하면 해당 편집 내용이 대체됩니다. 홈페이지 카탈로그에는 일치하는 비어 있지 않은 키가 있어야 합니다. 프로젝트 카탈로그는 소스 텍스트를 키로 사용하므로 영어 사본을 변경하려면 해당 번역 업데이트가 필요합니다. 번역이 누락되면 빌드가 실패합니다.

### 번역 관리

Google의 번역 서비스를 사용하여 프로젝트 번역 초안을 작성한 후 공유 문구, 갤러리 컨트롤, 제품 이름 및 선택한 기술 문구를 다듬었습니다. 이전 루마니아어 번역이 유지되었습니다. 원어민 리뷰는 특히 기술 용어에 여전히 유용합니다. 앱 이름, 스크린샷, 기술 식별자는 원래 형식을 유지합니다.

선택적 작성 스크립트는 하나의 로케일에 대해 누락된 번역을 준비할 수 있습니다.

```sh
python scripts/translate_projects.py --fetch --language ro
```

번역된 모든 로케일을 처리하려면 `--language ro`를 생략하세요. `--fetch` 플래그는 누락된 공개 프로젝트 텍스트를 Google의 번역 서비스로 보내는 것을 허용합니다. 기존 카탈로그를 재사용하고 제품 이름을 보호하며 `overrides.json` 수정 사항이 적용됩니다. `--fetch`가 없으면 스크립트는 누락된 문자열을 보고하고 필요한 모든 번역이 이미 사용 가능한 경우에만 카탈로그를 새로 고칩니다. 읽기 전용 검사가 아닙니다.

일부 공유 문구는 프로젝트별 카탈로그에도 나타납니다. `overrides.json`에 일관된 문구 수정 사항을 적용하고 준비 스크립트를 실행하여 이를 프로젝트 전체에 적용한 다음 HTML를 다시 빌드합니다. 게시하기 전에 생성된 번역을 검토하세요. `.translation-cache/` 폴더는 Git에서 무시됩니다. 일반 빌드와 배포된 웹사이트는 번역 서비스를 호출하지 않습니다.

## 게시 전 확인

로컬 미리보기 서버가 실행 중인 상태에서 다른 터미널에서 다음 명령을 실행합니다.

```sh
python scripts/build_locales.py --check
python scripts/check_site.py --url http://127.0.0.1:8765
node --test scripts/test_language.cjs
```

- 빌드 검사는 오래되어 생성된 출력과 누락된 번역을 감지합니다.
- 사이트 확인에는 홈페이지 12개, 프로젝트 페이지 240개, 개인정보 보호정책 8개, 호환성 리디렉션 1개 등 총 261개의 ​​HTML 페이지가 포함됩니다. 로컬 링크, 자산, 보존된 개인 정보 보호 마크업 외부의 중복 ID, 프로젝트 언어 메타데이터, 상호 SEO 링크 및 아랍어 방향을 확인합니다. `--url`를 사용하면 HTTP 응답도 확인하고 제공된 개인정보 보호정책을 소스 파일과 비교합니다.
- 언어 테스트에는 기본 설정 우선 순위, 지역 일치, 차단된 저장소, 파일 및 하위 디렉터리 루트, 리디렉션 동작 및 섹션 보존이 포함됩니다.

오프라인 링크 확인을 위해서는 `--url` 없이 `python scripts/check_site.py`를 실행하세요. 모바일 레이아웃, 아랍어 방향, 언어 전환, 갤러리 키보드 컨트롤 및 편집기 상호 작용 등 영향을 받는 페이지도 브라우저에서 검토합니다.

## 배포

라이브 사이트는 [zandaulion.com](https://zandaulion.com/)이며 `main`에서 GitHub Pages까지 게시되었습니다. `CNAME`는 사용자 정의 도메인 구성을 유지합니다.

사이트를 생성하고 확인한 후 소스와 생성된 변경 사항을 커밋하고 `main`를 푸시합니다. **pages build and deployment** 워크플로가 완료될 때까지 기다린 다음 라이브 도메인에서 변경된 URL을 확인합니다. 앱이나 저장소의 이름을 바꿀 때 기존 프로젝트와 개인정보 보호 경로를 유지하세요.

이 사이트는 정적 자산과 일반 스크립트를 사용합니다. 글꼴은 Google Fonts에서 로드되고 Sankey 편집기는 jsDelivr에서 Apache ECharts를 로드합니다. 런타임에는 번역 서비스가 필요하지 않습니다.

## 고정 개인정보 처리방침 URL

이 URL은 이미 Google Play에 등록되어 있습니다. **이름을 바꾸거나 이동하거나 제거하지 말고 웹사이트 현지화의 일부로 내용을 다시 작성하지 마십시오.**

- `/bitey-privacy.html`
- `/bpdigitizer-privacy.html`
- `/gravitygarden-privacy.html`
- `/gravitytdg-privacy.html`
- `/gravitywarp-privacy.html`
- `/orbitpuzzles-privacy.html`
- `/palebluedot-privacy.html`
- `/plate-privacy.html`

통지는 영어로 유지되며 원본 프레젠테이션과 공유 `index.css` / `main.js` 자산을 유지합니다. 공유 자산 변경 사항은 이러한 페이지를 고려해야 합니다. `scripts/check_site.py`는 경로를 보호하고 제공되는 콘텐츠를 확인할 수 있습니다.

## 저장소 구조

```text
/
├── index.html                  # 영문 홈페이지 생성
├── <project>.html              # 영어 프로젝트 소스
├── *-privacy.html              # 보존된 영어 개인정보 보호정책
├── wbpdigitizer.html           # 호환성 리디렉션
├── templates/home.html         # 공유 홈페이지 템플릿
├── README.*.md                 # 번역된 README 파일
├── locales/                    # 웹사이트 및 README 번역 카탈로그
├── ar/, de/, ro/, ...           # 언어 홈페이지 및 프로젝트 페이지 생성
├── scripts/                    # 생성, 번역 준비, 확인, 테스트
├── language-data.js            # 생성된 탐색 및 UI 사전
├── language.js                 # 언어 선택 및 탐색
├── workshop.css / workshop.js  # 워크숍 발표 및 수집 행위
├── project.css / project.js    # 프로젝트 프리젠테이션, 머리글/바닥글, 갤러리
├── sankey.js                   # 대화형 다이어그램 편집기
├── sample_sankey.json          # 샘플 다이어그램 데이터
├── index.css / main.js         # 개인 정보 보호 페이지를 위해 보관된 원본 공유 자산
├── assets/                     # 브랜드 아트워크, 프로젝트 그래픽, 스크린샷
├── CNAME                       # GitHub Pages 사용자 정의 도메인
└── LICENSE
```

## 라이선스와 브랜드 자산

소스 코드는 **GNU General Public License v3.0(GPL-3.0)**에 따라 라이센스가 부여됩니다. [LICENSE](LICENSE)를 참조하세요.

**상표 및 브랜드 예외:** “Zandaulion” 이름, 브랜드 정체성 및 `assets/brand/`에 있는 모든 로고 이미지 파일은 GPL 라이선스에 **포함되지 않습니다**. 해당 상표와 시각적 브랜드 자산에 대한 모든 권리를 보유합니다. 허가 없이 파생 저작물에 사용하거나 자신의 프로젝트를 식별하는 데 사용할 수 없습니다.

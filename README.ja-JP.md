<!-- readme-languages:start -->
[English](README.md) · [العربية](README.ar.md) · [简体中文](README.zh-CN.md) · [Français](README.fr-FR.md) · [Deutsch](README.de-DE.md) · [हिन्दी](README.hi-IN.md) · **日本語** · [한국어](README.ko-KR.md) · [Português (Brasil)](README.pt-BR.md) · [Română](README.ro.md) · [Español](README.es-ES.md) · [Українська](README.uk.md)
<!-- readme-languages:end -->

# Zandaulion

好奇心あふれるアイデアのための遊び心ある工房。アプリやゲーム、小さなツールを探してみてください。

**[zandaulion.com にアクセスしてください](https://zandaulion.com/)** · [ルーマニアのコレクション](https://zandaulion.com/ro/index.html)

このリポジトリには、Zandaulion Web サイトが含まれています。これには、20 個のプロジェクトの検索可能なコレクション、個々のプロジェクト ページ、およびインタラクティブな Sankey 図エディターが含まれます。ホームページとすべてのプロジェクト ページは 12 か国語で利用できます。サイトは静的 HTML、CSS、およびバニラ JavaScript で、GitHub Pages でホストされています。

## READMEの翻訳

この README は、Web サイトと同じ 12 か国語で利用できます。バージョンを切り替えるには、上部の言語リンクを使用します。英語は `README.md` に住んでいます。翻訳されたバージョンでは、`README.ro.md` や `README.ar.md` などのファイル名が使用されます。

英語の README と `locales/readme/` 内の対応するカタログを編集し、`python scripts/build_readmes.py` を実行して翻訳されたファイルを再生成します。 `python scripts/build_readmes.py --check` を使用して、古いファイルまたは不足している翻訳を検出します。オプションの `--fetch` フラグは、プロジェクト テキストに使用されるのと同じ Google 翻訳サービスを通じて、不足している翻訳草稿を準備します。コマンド、パス、コード例、リンク先は保持されます。

## 内容

- カテゴリ フィルター、アクセントを区別しない検索、ランダム検出を備えたコレクション。
- プロジェクトの説明、起動およびソースのリンク、スクリーンショット ギャラリー、および関連プロジェクト。
- キャプション、前/次のコントロール、タッチ ジェスチャを備えたキーボードからアクセス可能な画像ギャラリー。
- ノード/リンク編集、画像エクスポート、および JSON インポート/エクスポートを備えた Sankey エディター。
- 言語の選択、保存された設定、ブラウザ言語の検出、およびアラビア語の右から左へのレイアウト。
- すでに Google Play に登録されている URL にある既存の英語のプライバシー通知。

### プロジェクト一覧

| プロジェクト | ウェブサイトのページ |
| --- | --- |
| Admitere Liceu Kit | [admitere.html](admitere.html) |
| BP Digitizer — Android および PWA | [bpdigitizer.html](bpdigitizer.html) |
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
| Bitey（旧称Plate） | [plate.html](plate.html) |
| PWA Invite Console | [pwainvite.html](pwainvite.html) |
| pwa-kit | [pwakit.html](pwakit.html) |
| Sankey ダイアグラムエディタ | [sankey.html](sankey.html) |
| Spendosaurus | [spendosaurus.html](spendosaurus.html) |
| Thermostat Monitor | [thermostat.html](thermostat.html) |

アプリのリポジトリはこの Web サイトとは別のものです。名前が変更されたリポジトリは、[zandaulion.com](https://github.com/zandaulion/zandaulion.com)、[bitey](https://github.com/zandaulion/bitey)、および [kerfloom](https://github.com/zandaulion/kerfloom) です。

Bitey は、確立された `plate.html` ページを保持します。 BP Digitizer には両方のプラットフォーム用の 1 ページがあります。 `wbpdigitizer.html` は、`bpdigitizer.html#web-version` への互換性リダイレクトのままです。

## ローカルプレビュー

これらのコマンドをリポジトリのルートから実行します。 Python はジェネレーターとチェックに必要です。 Python スクリプトは標準ライブラリのみを使用します。言語テストには、テスト ランナーが組み込まれた Node.js が必要です。 npm のインストールまたはフロントエンド バンドラーの手順はありません。

```sh
python scripts/build_locales.py
python -m http.server 8765 --bind 127.0.0.1
```

[ローカル ホームページ](http://127.0.0.1:8765/index.html)を開くか、[明示的な英語](http://127.0.0.1:8765/index.html?lang=en-US)または[ルーマニア語](http://127.0.0.1:8765/ro/index.html)を使用して自動言語選択をバイパスします。

生成された HTML は、ファイルを直接参照できるように設計されています。言語フォルダーではなく、`index.html` を開きます。ナビゲーションでは、ディレクトリのリストを避けるために明示的なファイル名を使用します。言語スクリプトは ES モジュールではなく通常のスクリプトです。変更を確認するには、ローカルの HTTP プレビューを使用することをお勧めします。

## 言語とナビゲーション

| 言語 | ロケール | ホームページ |
| --- | --- | --- |
| 英語 | `en-US` | `/index.html?lang=en-US` |
| アラビア語 | `ar` | `/ar/index.html` |
| 中国語、簡体字 | `zh-CN` | `/zh-cn/index.html` |
| フランス語 | `fr-FR` | `/fr/index.html` |
| ドイツ語 | `de-DE` | `/de/index.html` |
| ヒンディー語 | `hi-IN` | `/hi/index.html` |
| 日本語 | `ja-JP` | `/ja/index.html` |
| 韓国人 | `ko-KR` | `/ko/index.html` |
| ポルトガル語、ブラジル語 | `pt-BR` | `/pt-br/index.html` |
| ルーマニア語 | `ro` | `/ro/index.html` |
| スペイン語 | `es-ES` | `/es/index.html` |
| ウクライナ語 | `uk` | `/uk/index.html` |

翻訳されたプロジェクト ページは、`/fr/kerfloom.html` や `/ja/plate.html` など、言語プレフィックスの下に同じファイル名を保持します。言語を切り替えると、現在のプロジェクトとセクションのアンカーが維持されます。コレクションと関連プロジェクトのリンクは、選択した言語のままです。各ホームページとプロジェクト ページには、言語宣言、正規 URL、および `hreflang` 相互リンクがあります。

`/ro/` などの明示的な言語パスが常に優先されます。メイン エントリ ページ (`/` または `/index.html`) のみで、選択は次の順序に従います。

1. サポートされている明示的な `?lang=` の選択。
2. 保存された言語設定。
3. `navigator.languages` から最初にサポートされるブラウザー設定。
4. サポートされている言語が一致しない場合は英語。

地域のバリエーションは基本言語と一致します。たとえば、`fr-CA` ではフランス語が選択されます。英語のリンクには `?lang=en-US` が含まれているため、ブラウザのストレージが利用できない場合でも明示的な選択が機能します。エントリ ページのリダイレクトでは、セクション アンカーとその他のクエリ パラメーターが保持されます。プロジェクトとプライバシーの URL は、ブラウザーの言語に基づいてリダイレクトされることはありません。

ホームページの言語リンクは HTML に存在し、JavaScript がなくても機能します。プロジェクト ヘッダー、その言語ピッカー、ギャラリー コントロール、および Sankey エディターは JavaScript を使用します。ブラウザーはファイルごとにストレージを分離する場合があるため、ローカル ファイル プロジェクト リンクでは、選択した言語が URL に含まれます。

## ページの編集と生成

| 何を変えるのか | 編集するソース |
| --- | --- |
| ホームページのレイアウト | `templates/home.html` |
| 各言語のホームページのテキスト | `locales/<locale>.json` |
| 英語プロジェクトの内容とレイアウト | ルート プロジェクト HTML ファイル (`kerfloom.html` など) |
| 翻訳されたプロジェクトの内容 | `locales/projects/<locale>/<project>.json` |
| ギャラリー コントロールとエディター メッセージ | `locales/projects/<locale>/common.json` |
| 再利用可能な翻訳修正 | `locales/projects/overrides.json` |
| サポートされているロケールと URL プレフィックス | `scripts/site_locales.py` |
| プロジェクトのカバレッジと翻訳のレンダリング | `scripts/project_locales.py` |
| 共有プレゼンテーション | `workshop.css` および `project.css` |
| コレクション、プロジェクト、および言語の動作 | `workshop.js`、`project.js`、および `language.js` |
| Sankey エディターの動作 | `sankey.js` |

ソース コンテンツまたはカタログを編集した後、サイトを再生成します。

```sh
python scripts/build_locales.py
```

このジェネレーターは、12 のホームページ、220 の翻訳されたプロジェクト ページ、および `language-data.js` を生成します。また、20 の英語プロジェクト ページで正規リンクと代替言語リンクも維持されます。これらの生成された出力をソースとともにコミットします。 GitHub Pages は、Python ジェネレーターを実行せずに、それらを直接提供します。

生成されたホームページ、翻訳された HTML、または `language-data.js` を直接編集しないでください。再生成により、これらの編集が置き換えられます。ホームページ カタログには、一致する空でないキーが必要です。プロジェクト カタログはソース テキストをキーとして使用するため、英語のコピーに変更を加えると、対応する翻訳の更新が必要になります。翻訳が欠落しているとビルドに失敗します。

### 翻訳のメンテナンス

プロジェクトの翻訳草案は、Google の翻訳サービスを利用して作成され、共有された文言、ギャラリー コントロール、製品名、および選択された技術フレーズが洗練されました。以前のルーマニア語の翻訳は保持されました。ネイティブスピーカーによるレビューは、特に専門用語に関しては依然として役に立ちます。アプリ名、スクリーンショット、技術識別子は元の形式を保持します。

オプションのオーサリング スクリプトを使用すると、1 つのロケールに不足している翻訳を準備できます。

```sh
python scripts/translate_projects.py --fetch --language ro
```

翻訳されたすべてのロケールを処理するには、`--language ro` を省略します。 `--fetch` フラグは、不足しているパブリック プロジェクト テキストを Google の翻訳サービスに送信することを許可します。既存のカタログを再利用し、製品名を保護し、`overrides.json` の修正を適用します。 `--fetch` がない場合、スクリプトは欠落している文字列を報告し、必要な翻訳がすべてすでに利用可能な場合にのみカタログを更新します。読み取り専用のチェックではありません。

一部の共有フレーズはプロジェクトごとのカタログにも表示されます。 `overrides.json` に一貫した文言の修正を加え、準備スクリプトを実行してプロジェクト全体に適用してから、HTML を再構築します。生成された翻訳を公開する前に確認します。 `.translation-cache/` フォルダーは Git によって無視されます。通常のビルドとデプロイされた Web サイトは翻訳サービスを呼び出すことはありません。

## 公開前の確認

ローカル プレビュー サーバーが実行されている状態で、別のターミナルで次のコマンドを実行します。

```sh
python scripts/build_locales.py --check
python scripts/check_site.py --url http://127.0.0.1:8765
node --test scripts/test_language.cjs
```

- ビルド チェックでは、生成された出力が古くなり、翻訳が欠落していることが検出されます。
- サイト チェックは、HTML の 261 ページすべて (ホームページ 12 件、プロジェクト ページ 240 件、プライバシー通知 8 件、および互換性リダイレクト 1 件) を対象としています。ローカル リンク、アセット、保存されたプライバシー マークアップ外の重複 ID、プロジェクト言語メタデータ、SEO 相互リンク、およびアラビア語方向をチェックします。 `--url` では、HTTP の応答もチェックし、提供されたプライバシー通知とそのソース ファイルを比較します。
- 言語テストでは、設定の優先順位、地域の一致、ブロックされたストレージ、ファイルとサブディレクトリのルート、リダイレクト動作、セクションの保存が対象になります。

オフライン リンク チェックの場合は、`--url` を使用せずに `python scripts/check_site.py` を実行します。ブラウザ内の影響を受けるページも確認します: モバイル レイアウト、アラビア語の方向、言語の切り替え、ギャラリーのキーボード コントロール、エディターの操作。

## デプロイ

ライブ サイトは [zandaulion.com](https://zandaulion.com/) で、`main` から GitHub Pages まで公開されています。 `CNAME` はカスタム ドメイン構成を保持します。

サイトを生成して確認した後、ソースと生成された変更をコミットし、`main` をプッシュします。 **pages build and deployment** ワークフローが完了するまで待ってから、ライブ ドメインで変更された URL を確認します。アプリまたはそのリポジトリの名前を変更するときは、既存のプロジェクトとプライバシー ルートを維持します。

このサイトは静的アセットと通常のスクリプトを使用します。フォントは Google Fonts からロードされ、Sankey エディターは jsDelivr から Apache ECharts をロードします。実行時に翻訳サービスは必要ありません。

## 変更しないプライバシー通知のURL

これらの URL はすでに Google Play に登録されています。 **Web サイトのローカリゼーションの一環として、名前の変更、移動、削除、またはコンテンツの書き換えを行わないでください。**

- `/bitey-privacy.html`
- `/bpdigitizer-privacy.html`
- `/gravitygarden-privacy.html`
- `/gravitytdg-privacy.html`
- `/gravitywarp-privacy.html`
- `/orbitpuzzles-privacy.html`
- `/palebluedot-privacy.html`
- `/plate-privacy.html`

通知は英語のままで、元のプレゼンテーションと共有の `index.css` / `main.js` 資産が保持されます。共有アセットの変更は、これらのページを考慮する必要があります。 `scripts/check_site.py` はパスを保護し、提供されたコンテンツを検証できます。

## リポジトリ構成

```text
/
├── index.html                  # 英語ホームページを作成しました
├── <project>.html              # 英語のプロジェクトソース
├── *-privacy.html              # 保存された英語のプライバシー通知
├── wbpdigitizer.html           # 互換性リダイレクト
├── templates/home.html         # 共有ホームページテンプレート
├── README.*.md                 # 翻訳された README ファイル
├── locales/                    # Web サイトと README の翻訳カタログ
├── ar/, de/, ro/, ...           # 生成された言語ホームページとプロジェクト ページ
├── scripts/                    # 生成、翻訳準備、チェック、テスト
├── language-data.js            # 生成されたナビゲーションおよび UI 辞書
├── language.js                 # 言語の選択とナビゲーション
├── workshop.css / workshop.js  # ワークショップのプレゼンテーションと収集行為
├── project.css / project.js    # プロジェクトのプレゼンテーション、ヘッダー/フッター、ギャラリー
├── sankey.js                   # インタラクティブなダイアグラムエディタ
├── sample_sankey.json          # サンプル図データ
├── index.css / main.js         # 元の共有アセット、プライバシー ページ用に保持
├── assets/                     # ブランドのアートワーク、プロジェクトのグラフィック、スクリーンショット
├── CNAME                       # GitHub Pages カスタム ドメイン
└── LICENSE
```

## ライセンスとブランド素材

ソースコードは以下に基づいてライセンスされています。 **GNU General Public License v3.0 (GPL-3.0)**。見る [ライセンス](LICENSE).

**商標およびブランドに関する例外：**「Zandaulion」の名称、ブランドアイデンティティ、および `assets/brand/` 内のすべてのロゴ画像ファイルは、GPLライセンスの**対象外**です。これらの商標とブランドの視覚素材に関するすべての権利を留保します。許可なく派生作品に使用したり、自分のプロジェクトを識別するために使用したりすることはできません。

<!-- readme-languages:start -->
[English](README.md) · [العربية](README.ar.md) · **简体中文** · [Français](README.fr-FR.md) · [Deutsch](README.de-DE.md) · [हिन्दी](README.hi-IN.md) · [日本語](README.ja-JP.md) · [한국어](README.ko-KR.md) · [Português (Brasil)](README.pt-BR.md) · [Română](README.ro.md) · [Español](README.es-ES.md) · [Українська](README.uk.md)
<!-- readme-languages:end -->

# Zandaulion

一个充满趣味与好奇心的工作坊：探索应用、游戏和小工具。

**[访问 zandaulion.com](https://zandaulion.com/)** · [罗马尼亚系列](https://zandaulion.com/ro/index.html)

该存储库包含 Zandaulion 网站：21 个项目的可搜索集合、各个项目页面和交互式 Sankey 图表编辑器。主页和每个项目页面都有 12 种语言版本。该站点是静态 HTML、CSS 和普通 JavaScript，托管在 GitHub Pages 上。

## README 译本

本自述文件提供与网站相同的 12 种语言版本。使用顶部的语言链接切换版本。英语住在`README.md`；翻译版本使用 `README.ro.md` 和 `README.ar.md` 等文件名。

编辑`locales/readme/`中的英文README和相应目录，然后运行`python scripts/build_readmes.py`重新生成翻译后的文件。使用 `python scripts/build_readmes.py --check` 检测陈旧文件或丢失的翻译。可选的 `--fetch` 标志通过用于项目文本的相同 Google 翻译服务准备缺失的翻译草稿。命令、路径、代码示例和链接目标都会被保留。

## 内容概览

- 具有类别过滤器、不区分重音的搜索和随机发现的集合。
- 项目描述、启动和源链接、屏幕截图库以及相关项目。
- 可通过键盘访问的图像库，带有标题、上一个/下一个控件和触摸手势。
- Sankey 编辑器，具有节点/链接编辑、图像导出和 JSON 导入/导出功能。
- 语言选择、​​保存的首选项、浏览器语言检测和阿拉伯语从右到左布局。
- 已在 Google Play 注册的 URL 上现有英文隐私声明。

### 项目合集

| 项目 | 网站页面 |
| --- | --- |
| Admitere Liceu Kit | [admitere.html](admitere.html) |
| Bank DWH Studio | [bankdwhstudio.html](bankdwhstudio.html) |
| BP Digitizer — Android 和 PWA | [bpdigitizer.html](bpdigitizer.html) |
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
| Bitey，原名 Plate | [plate.html](plate.html) |
| PWA Invite Console | [pwainvite.html](pwainvite.html) |
| pwa-kit | [pwakit.html](pwakit.html) |
| Sankey 图表编辑器 | [sankey.html](sankey.html) |
| Spendosaurus | [spendosaurus.html](spendosaurus.html) |
| Thermostat Monitor | [thermostat.html](thermostat.html) |

应用程序存储库与本网站是分开的。重命名的存储库为 [zandaulion.com](https://github.com/zandaulion/zandaulion.com)、[bitey](https://github.com/zandaulion/bitey) 和 [kerfloom](https://github.com/zandaulion/kerfloom)。

Bank DWH Studio 源和合成仓库固定装置位于 [semantic-layer-poc](https://github.com/zandaulion/semantic-layer-poc) 中。

Bitey 保留已建立的`plate.html` 页面。 BP Digitizer 两个平台都有一个页面； `wbpdigitizer.html` 仍然是到 `bpdigitizer.html#web-version` 的兼容性重定向。

## 本地预览

从存储库根运行这些命令。发电机需要Python并进行检查； Python 脚本仅使用标准库。语言测试需要带有内置测试运行器的 Node.js。没有 npm 安装或前端捆绑器步骤。

```sh
python scripts/build_locales.py
python -m http.server 8765 --bind 127.0.0.1
```

打开[本地主页](http://127.0.0.1:8765/index.html)，或者使用[显式英语](http://127.0.0.1:8765/index.html?lang=en-US)或[罗马尼亚语](http://127.0.0.1:8765/ro/index.html)绕过自动语言选择。

生成的HTML也是为直接文件浏览而设计的。打开`index.html`，不是语言文件夹；导航使用显式文件名以避免目录列表。语言脚本是普通脚本而不是ES模块。建议使用本地 HTTP 预览来查看更改。

## 语言与导航

| 语言 | 语言环境 | 主页 |
| --- | --- | --- |
| 英语 | `en-US` | `/index.html?lang=en-US` |
| 阿拉伯语 | `ar` | `/ar/index.html` |
| 简体中文 | `zh-CN` | `/zh-cn/index.html` |
| 法语 | `fr-FR` | `/fr/index.html` |
| 德语 | `de-DE` | `/de/index.html` |
| 印地语 | `hi-IN` | `/hi/index.html` |
| 日语 | `ja-JP` | `/ja/index.html` |
| 韩语 | `ko-KR` | `/ko/index.html` |
| 葡萄牙语、巴西 | `pt-BR` | `/pt-br/index.html` |
| 罗马尼亚语 | `ro` | `/ro/index.html` |
| 西班牙语 | `es-ES` | `/es/index.html` |
| 乌克兰语 | `uk` | `/uk/index.html` |

翻译后的项目页面在语言前缀下保留相同的文件名，例如 `/fr/kerfloom.html` 或 `/ja/plate.html`。语言切换保持当前项目和部分锚定。集合和相关项目链接保留为所选语言。每个主页和项目页面都有语言声明、规范 URL 和相互的 `hreflang` 链接。

显式语言路径（例如 `/ro/`）始终优先。仅在主输入页面（`/` 或 `/index.html`）上，选择遵循以下顺序：

1. 支持的显式 `?lang=` 选择。
2. 已保存的语言首选项。
3. 第一个受支持的浏览器首选项来自 `navigator.languages`。
4. 如果没有支持的语言匹配，则为英语。

区域变体与其基本语言相匹配：例如，`fr-CA` 选择法语。英文链接包括 `?lang=en-US`，因此即使浏览器存储不可用，显式选择也可以工作。入口页面重定向保留部分锚点和其他查询参数。项目和隐私 URL 绝不会根据浏览器语言进行重定向。

主页语言链接存在于 HTML 中，无需 JavaScript 即可工作。项目标题、语言选择器、库控件和 Sankey 编辑器使用 JavaScript。本地文件项目链接在 URL 中携带所选语言，因为浏览器可能会隔离每个文件的存储。

## 编辑和生成页面

| 改变什么 | 要编辑的来源 |
| --- | --- |
| 主页布局 | `templates/home.html` |
| 每种语言的主页文本 | `locales/<locale>.json` |
| 英文项目内容及布局 | 根项目HTML文件，如`kerfloom.html` |
| 翻译的项目内容 | `locales/projects/<locale>/<project>.json` |
| 图库控件和编辑器消息 | `locales/projects/<locale>/common.json` |
| 可重复使用的翻译更正 | `locales/projects/overrides.json` |
| 支持的区域设置和 URL 前缀 | `scripts/site_locales.py` |
| 项目覆盖及翻译效果图 | `scripts/project_locales.py` |
| 共享演示 | `workshop.css` 和 `project.css` |
| 集合、项目和语言行为 | `workshop.js`、`project.js` 和 `language.js` |
| Sankey 编辑器行为 | `sankey.js` |

编辑源内容或目录后，重新生成站点：

```sh
python scripts/build_locales.py
```

该生成器生成 12 个主页、220 个翻译项目页面和 `language-data.js`。它还在 20 个英语项目页面上维护规范和替代语言链接。提交这些生成的输出及其来源； GitHub Pages 直接为他们服务，无需运行 Python 生成器。

不要直接编辑生成的主页、翻译的 HTML 或 `language-data.js`：重新生成将替换这些编辑。主页目录必须具有匹配的非空键。项目目录使用源文本作为键，因此对英文副本的更改需要相应的翻译更新。缺少翻译会导致构建失败。

### 翻译维护

使用 Google 的翻译服务准备项目翻译草稿，然后对共享措辞、图库控件、产品名称和选定的技术短语进行完善。早期的罗马尼亚语翻译被保留。母语人士审阅仍然有用，特别是对于技术术语。应用程序名称、屏幕截图和技术标识符保留其原始形式。

可选的创作脚本可以为一种语言环境准备缺失的翻译：

```sh
python scripts/translate_projects.py --fetch --language ro
```

省略 `--language ro` 以处理所有已翻译的语言环境。 `--fetch` 标志允许将缺失的公共项目文本发送到 Google 的翻译服务。重复使用现有目录，保护产品名称，并应用 `overrides.json` 更正。如果没有 `--fetch`，该脚本将报告丢失的字符串，并仅在所有必需的翻译均已可用的情况下刷新目录。它不是只读检查。

一些共享短语也出现在每个项目的目录中。将一致的措辞更正放入 `overrides.json` 中，并运行准备脚本以将其应用于跨项目，然后重建 HTML。在发布之前检查生成的翻译。 Git 会忽略 `.translation-cache/` 文件夹。正常构建和部署的网站永远不会调用翻译服务。

## 发布前检查

在本地预览服务器运行的情况下，在另一个终端中运行以下命令：

```sh
python scripts/build_locales.py --check
python scripts/check_site.py --url http://127.0.0.1:8765
node --test scripts/test_language.cjs
```

- 构建检查会检测过时的生成输出和丢失的翻译。
- 站点检查涵盖了所有 261 个 HTML 页面：12 个主页、240 个项目页面、8 个隐私声明和 1 个兼容性重定向。它检查本地链接、资产、保留的隐私标记之外的重复 ID、项目语言元数据、相互 SEO 链接和阿拉伯语方向。对于 `--url`，它还检查 HTTP 响应并将提供的隐私声明与其源文件进行比较。
- 语言测试涵盖首选项优先级、区域匹配、阻止存储、文件和子目录根、重定向行为和部分保存。

对于离线链接检查，请运行 `python scripts/check_site.py`，而不运行 `--url`。还要在浏览器中查看受影响的页面：移动布局、阿拉伯语方向、语言切换、图库键盘控件和编辑器交互。

## 部署

实时站点是 [zandaulion.com](https://zandaulion.com/)，从 `main` 到 GitHub Pages 发布。 `CNAME` 保留自定义域配置。

生成并检查站点后，提交源和生成的更改并推送 `main`。等待 **pages build and deployment** 工作流程完成，然后验证实时域上更改的 URL。重命名应用程序或其存储库时保留现有的项目和隐私路径。

该网站使用静态资产和普通脚本。字体从 Google Fonts 加载，Sankey 编辑器从 jsDelivr 加载 Apache ECharts。运行时不需要翻译服务。

## 固定隐私声明链接

这些 URL 已在 Google Play 中注册。 **请勿在网站本地化过程中重命名、移动或删除它们，或重写其内容。**

- `/bitey-privacy.html`
- `/bpdigitizer-privacy.html`
- `/gravitygarden-privacy.html`
- `/gravitytdg-privacy.html`
- `/gravitywarp-privacy.html`
- `/orbitpuzzles-privacy.html`
- `/palebluedot-privacy.html`
- `/plate-privacy.html`

通知仍为英文，并保留其原始演示文稿和共享 `index.css` / `main.js` 资产。共享资产更改应考虑到这些页面。 `scripts/check_site.py` 保护路径并可以验证所提供的内容。

## 仓库结构

```text
/
├── index.html                  # 生成英文主页
├── <project>.html              # 英文项目来源
├── *-privacy.html              # 保留英文隐私声明
├── wbpdigitizer.html           # 兼容性重定向
├── templates/home.html         # 共享主页模板
├── README.*.md                 # 翻译后的自述文件
├── locales/                    # 网站和自述文件翻译目录
├── ar/, de/, ro/, ...           # 生成的语言主页和项目页面
├── scripts/                    # 生成、翻译准备、检查、测试
├── language-data.js            # 生成的导航和 UI 字典
├── language.js                 # 语言选择和导航
├── workshop.css / workshop.js  # 工作坊展示及收藏行为
├── project.css / project.js    # 项目演示、页眉/页脚、画廊
├── sankey.js                   # 交互式图表编辑器
├── sample_sankey.json          # 示例图数据
├── index.css / main.js         # 原始共享资产，保留用于隐私页面
├── assets/                     # 品牌艺术品、项目图形、屏幕截图
├── CNAME                       # GitHub Pages 自定义域
└── LICENSE
```

## 许可证与品牌素材

源代码已获得 **GNU General Public License v3.0 (GPL-3.0)** 的许可。请参阅 [LICENSE](LICENSE)。

**商标与品牌例外条款：**“Zandaulion”名称、品牌标识及 `assets/brand/` 中的所有标志图片文件**不属于** GPL 许可证的授权范围。上述商标及品牌视觉素材的所有权利均予保留。未经许可，不得在衍生作品中使用这些内容，也不得用其标识你自己的项目。

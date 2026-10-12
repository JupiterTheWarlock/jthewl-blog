# 共享品牌背景

`quartz/static/junkyard-scene/` 由个人工作台 `tools/jthewl-brand/` 生成，不直接编辑。工作台运行 `node tools/jthewl-brand/sync.mjs` 更新三站，`--check` 核对文件一致性。发布资源中的 `brand-manifest.json` 标明版本。

Quartz Head 加载同源共享样式和 host 脚本。blog 模式使用与主页相同的垃圾场动画和鼠标响应、半透明阅读面板、普通正文字体和等宽导航；页面采用固定深色品牌主题，ReaderMode 保留。SPA 翻页保持单个背景实例，移动端目录开合不影响背景。

正常运行 `npx quartz build` 即包含全部静态资源，无需访问其他个人站点。

## 博客内容展示

首页、分类页和话题页使用文章卡片，直接展示标题、摘要、日期与原始配图。保留共享动态背景，文章页使用半透明阅读面板；文件树和关系图不再占据首页。

卡片优先使用 frontmatter 的 `cover` / `socialImage`，否则取正文第一张图片，完整容纳图片而不裁切。无图文章使用文字卡片。`summary` 可指定卡片摘要，否则从正文提取；`featured: 1`、`featured: 2` 等正数控制精选顺序。内容列表由现有 Markdown 自动生成，无需另维护一份文章数据。

博客自身布局在 `quartz/styles/blog.scss`；共享场景资源仍通过品牌源同步。浏览页保留静态文章链接，脚本只增强排序与分批展示，关闭脚本仍可浏览全部文章。

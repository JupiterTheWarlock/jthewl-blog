# 共享品牌背景

`quartz/static/junkyard-scene/` 由个人工作台 `tools/jthewl-brand/` 生成，不直接编辑。工作台运行 `node tools/jthewl-brand/sync.mjs` 更新三站，`--check` 核对文件一致性。发布资源中的 `brand-manifest.json` 标明版本。

Quartz Head 加载同源共享样式和 host 脚本。blog 模式使用与主页相同的垃圾场动画和鼠标响应、半透明阅读面板、普通正文字体和等宽导航；页面采用固定深色品牌主题，ReaderMode 保留。SPA 翻页保持单个背景实例，移动端目录开合不影响背景。

正常运行 `npx quartz build` 即包含全部静态资源，无需访问其他个人站点。

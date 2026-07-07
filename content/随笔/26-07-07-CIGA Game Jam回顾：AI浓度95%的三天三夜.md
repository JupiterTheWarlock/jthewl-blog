---
title: CIGA Game Jam回顾：AI浓度95%的三天三夜
date: 2026/07/07
tags:
  - AI
  - 游戏开发
  - 独立游戏
  - GameJam
---

周末在CIGA Game Jam做的小游戏，ai浓度95%，剩下5%是打开unity做试玩测试的工作量

这次jam现场几乎人手一个codex，游戏完成度比往届也肉眼可见的高，而我也直接全自动化，用了farlocus这个unity专用的开源Agent工具，连配置文件都不自己改了

除此之外，这次我还做了许多以前无法想象的新尝试

---

新尝试1：背景生成

我们这次游戏的背景是使用了[pixel-starfield-generator](https://pixel-starfield-generator.itch.io)这个itch上的像素星空生成工具进行生成的

在原项目基础上，我们fork下来用codex稍微修改了一下，做了四方连续图生成、去像素化、抗锯齿等处理，然后roll出几十张图放到黑色背景上去生成

做完这一切只花了我们半小时

![Pixel starfield background generation result](https://cfr2cdn.jthewl.cc/blog/essays/2026/07/07/ciga-jam-starfield-bg.jpg)

---

新尝试2：3D打印周边

这次我尝试了在48h gamejam中3d打印物料，模型是codex用脚本在blender中生成的，扔到拓竹进行切片打印

结果，打出的模型瑕疵不少，拉丝，船锚柄和锚身的连接会被摔断，柄上的橙色条会掉出来...

这是测试不够导致的，在48h jam想在做出游戏的同时做出高质量3d打印周边，难度不小

![3D printed anchor model with quality issues](https://cfr2cdn.jthewl.cc/blog/essays/2026/07/07/ciga-jam-3dprint-anchor.jpg)

![Close-up of 3D print layer lines and defects](https://cfr2cdn.jthewl.cc/blog/essays/2026/07/07/ciga-jam-3dprint-detail.jpg)

---

新尝试3：一句话做排行榜

在周日凌晨，突发奇想增加了分数机制，然后做出了一个排行榜，部署到cf上，开发、设计、部署和测试只用了一句话

这个排行榜也在周日的试玩环节中起到了一个锦上添花的作用

将近半年的捣鼓经验用在jam上，我的感觉还是相当奇妙的

![Leaderboard deployed on Cloudflare](https://cfr2cdn.jthewl.cc/blog/essays/2026/07/07/ciga-jam-leaderboard.jpg)

---

原文链接：[X](https://x.com/JupiterTheWL/status/2074324594744574294)

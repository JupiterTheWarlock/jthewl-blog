---
title: GLM敏感审查与Claude Code的破限
date: 2026/03/04
tags:
  - AI
  - 模型
  - 工具
---

模型是zai/glm-4.7，貌似当我提到"傻逼"两个字以试图攻击第三方的时候，openclaw稳定触发敏感审查返回Unhandled stop reason: sensitive？

智谱宝宝这么敏感的吗

![GLM敏感审查截图](https://cfr2cdn.jthewl.cc/blog/essays/2026/05/15/glm-sensitive-filter.png)

---

相同的模型和问题，Claude code能稳定回答。

也算是意料之中，cc的提示词导致的"破限"效果还是很强的，每次问它是啥模型，它都会说自己是claude

![Claude Code回答截图](https://cfr2cdn.jthewl.cc/blog/essays/2026/05/15/claude-code-bypass.jpg)

---

原文链接：[X](https://x.com/JupiterTheWL/status/2029059761795420340)

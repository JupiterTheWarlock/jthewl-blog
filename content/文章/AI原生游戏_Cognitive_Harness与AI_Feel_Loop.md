# AI 原生游戏中的 Cognitive Harness 与 AI Feel Loop

> 核心观点：AI 原生游戏的重点不是让 AI 主导游戏，而是在传统游戏运行时之上，构建一套能够进行上下文调度、工具暴露和反馈回填的 Cognitive Harness。  
> AI 不是世界主机，传统游戏运行时才是。AI 更像是被运行时调用的认知模块。

---

## 1. 问题背景：AI 原生游戏目前没有统一方法论

当前所谓“AI 原生游戏”还没有形成一套行业统一的方法论。

很多讨论会把 AI 原生游戏理解成：

- AI 生成剧情；
- AI 生成 NPC 对话；
- AI 生成任务；
- AI 生成世界；
- AI 直接主导游戏运行。

但这些说法都容易把问题说偏。

现阶段的 AI 能力还不足以真正接管完整的游戏运行时。模型存在延迟、成本、幻觉、上下文注意力不稳定、长期一致性差、数值规则遵守能力弱等问题。因此，比较现实的路线不是“AI 主导游戏”，而是：

> 传统游戏运行时主导世界状态，AI 在受控上下文和有限工具下参与认知、表达和反馈。

换句话说，AI 原生游戏的真正难点不是“接一个模型”，而是如何构建一套 Harness，让 AI 能够正确理解游戏运行时，并以可控方式影响游戏反馈。

---

## 2. 对“AI 主导论”的修正

一个常见误区是：把 AI 原生游戏想象成由 AI 生成一切、控制一切。

这种方向在纯文本角色扮演中确实存在，例如酒馆类 AI 玩法。但它的问题也很明显：游戏运行时极弱，主要依靠上下文窗口、角色卡、世界书和聊天历史维持体验。

这类系统更像：

> 文本续写器 + 角色扮演 Prompt 管理器。

而不是严格意义上的游戏运行时。

真正面向游戏工程的 AI 原生游戏，应该反过来：

```text
Game Runtime → Cognitive Harness → AI → Structured Feedback → Runtime Validation → Game Runtime
```

也就是说：

- 游戏运行时负责世界状态、规则、任务、战斗、交互、存档和验证；
- Cognitive Harness 负责上下文选择、认知树展开、工具暴露、Prompt 组装、输出协议和结果回填；
- AI 负责局部推理、自然语言表达、意图生成和认知补全。

AI 不是主机，也不是世界本体。AI 是运行时中的一个认知算子。

---

## 3. 为什么“模型层”不应被单独视为核心层

在讨论 AI 原生游戏的方法论时，不应把“模型层”作为核心分层。

理由很简单：模型类似 CPU、显卡、操作系统、引擎或云 API。它当然重要，但它不是游戏设计方法论本身。

就像我们不会把“电脑主机”算作游戏运行时的一部分，也不应该把 LLM 本身算作 AI 原生游戏架构中的核心方法论层。

更准确的说法是：

```text
模型不是方法论，Harness 才是方法论。
模型不是游戏认知结构，模型只是被 Harness 调用的认知算子。
```

因此，AI 原生游戏的核心不在于模型本身，而在于：

- 什么时候调用模型；
- 给模型看什么；
- 不给模型看什么；
- 允许模型使用什么工具；
- 模型输出如何被验证；
- 输出如何回填到游戏运行时；
- 如何让这一切形成稳定、可调试、可设计的体验。

---

## 4. Cognitive Harness：AI 原生游戏的核心中间层

可以把 AI 原生游戏拆成两个核心部分：

```text
第一层：Game Runtime
第二层：Cognitive Harness
```

其中 Game Runtime 是传统游戏运行时，负责真实世界状态和规则。

Cognitive Harness 是运行时之上的认知调度层，负责让 AI 以可控方式参与游戏循环。

### 4.1 Game Runtime 负责什么

Game Runtime 负责真实、权威、可验证的游戏状态，包括：

- 世界状态；
- 角色状态；
- 数值系统；
- 任务系统；
- 地图系统；
- 战斗系统；
- 交互系统；
- 存档系统；
- 事件系统；
- 权限边界；
- 最终状态验证。

它是游戏世界的主机。

### 4.2 Cognitive Harness 负责什么

Cognitive Harness 负责 AI 与游戏运行时之间的认知桥接，包括：

- 认知触发；
- 上下文选择；
- 认知树展开；
- 记忆检索；
- 状态裁剪；
- 工具暴露；
- Prompt 组装；
- 输出 Schema；
- 权限控制；
- 结果回填。

可以这样理解：

```text
Harness = 运行容器
Cognitive Tree = 上下文索引 / 认知索引 / 可注入状态树
Tools = AI 能触碰运行时的接口
Prompt = 某一轮实际注入的认知切片
```

---

## 5. 认知树：不是 AI 的脑子，而是运行时状态的可注入索引

“认知树”不应该被理解成 AI 自己脑子里的思维树，也不应该被理解成由 AI 生成的世界结构。

更合理的理解是：

> 认知树是游戏运行时中已经存在的潜在状态结构。AI 不是创造它，而是在游戏进行过程中，被 Harness 引导着逐步挖掘、读取和使用它。

传统游戏里，本来就存在大量运行时状态：

```text
Game Runtime
├── 当前世界状态
├── 玩家行为轨迹
├── NPC 状态
├── 任务状态
├── 关系状态
├── 地点状态
├── 物品状态
├── 已暴露信息
├── 未暴露信息
├── 可推理信息
├── 可行动作
└── 可调用工具
```

AI 原生游戏要做的，不是把这些状态全部塞给 AI，而是根据当前交互目标，选择性地、渐进式地、结构化地注入给 AI。

因此：

> 角色卡是静态 Prompt，认知树是动态上下文调度。

---

## 6. 酒馆类 AI 的问题：平铺角色卡，而非渐进式注入

酒馆类 AI 系统通常依赖以下结构：

```text
System Prompt
+ Character Card
+ World Info
+ Lorebook
+ Chat History
+ User Message
```

它的核心问题是：上下文是平铺的。

常见缺陷包括：

- 信息缺乏运行时层级；
- 角色卡是静态人格，不是动态认知；
- 世界书触发通常较粗糙；
- 聊天历史容易污染当前决策；
- 模型难以区分“角色知道的”和“系统知道的”；
- 隐藏信息、伏笔、状态变化难以严格管理；
- 工具与游戏状态缺乏强约束；
- 输出往往只是文本，缺少强类型状态回填。

因此，酒馆 AI 更像文本角色扮演系统，而不是完整的 AI 原生游戏 Harness。

可以这样概括：

> 酒馆 AI 管的是文本历史；AI 原生游戏 Harness 管的是运行时认知。

---

## 7. 上下文注入的艺术

AI 原生游戏的关键，不是让 AI 知道越多越好，而是让 AI 在正确的时机知道正确的信息。

一个成熟的 Cognitive Harness 需要回答这些问题：

```text
现在该给 AI 看什么？
不该给 AI 看什么？
哪些信息是显性的？
哪些信息是隐性的？
哪些信息可以被推理出来？
哪些信息需要等玩家触发后再注入？
哪些工具现在允许 AI 使用？
哪些动作现在可以被 AI 建议？
```

例如玩家问 NPC：

> “你为什么不相信我？”

系统此时才需要展开关系记忆：

```text
Relation Context
├── 玩家曾欺骗过 NPC
├── NPC 上次因为玩家损失了道具
├── NPC 当前信任值：低
└── NPC 性格：多疑
```

玩家进入地点时，才展开地点认知：

```text
Location Context
├── 此地曾发生过战斗
├── 墙上有烧焦痕迹
├── NPC 知道这里危险
└── 玩家尚未发现地下入口
```

这就是渐进式注入。

而不是每次都把角色卡、世界观、历史聊天记录全部塞给模型。

---

## 8. 工具暴露：AI 知道什么，与 AI 能做什么必须分离

上下文决定 AI 知道什么，工具决定 AI 能做什么。

这两者必须分开。

例如，AI 知道 NPC 受伤了：

```text
NPC_HP = 23/100
```

不等于 AI 可以治疗 NPC。

只有当 Harness 同时暴露可用工具：

```text
Available Tools
├── inspect_wound(target)
├── use_item(target, item)
└── ask_npc(condition)
```

AI 才能提出可执行意图：

```json
{
  "intent": "use_item",
  "target": "npc_anna",
  "item": "medicine"
}
```

否则，AI 只能在文本里说“我帮你包扎”，但运行时不会发生真实状态变化。

因此，AI 原生游戏的关键是：

```text
Context Injection + Tool Permission + Runtime Validation
```

---

## 9. 用 Game Feel 理论理解 AI 原生游戏

传统 Game Feel 关注：

```text
玩家输入 → 游戏响应 → 反馈呈现
```

例如：

```text
按下攻击键 → 角色挥刀 → 命中敌人 → 音效/震动/受击动画
```

AI 原生游戏也可以用类似结构理解：

```text
玩家/世界输入 → AI 认知处理 → 游戏/叙事反馈
```

也就是：

```text
输入 → 思考 → 输出
```

这可以被称为：

> AI Feel Loop

AI 原生游戏的体验，不仅取决于 AI 是否聪明，也取决于 AI 反馈是否快、准、有因果、有边界、有状态变化。

---

## 10. AI Feel Loop：输入、思考、输出

### 10.1 输入：Cognitive Trigger

AI 原生游戏里的输入不应该只是用户文本，而应该是运行时事件。

例如：

```text
PlayerTalkedToNPC
PlayerEnteredRoom
PlayerUsedItem
PlayerAttackedAlly
PlayerObservedFogNode
PlayerNamedUnknownObject
PlayerFailedQuest
TimePassed
NPCWitnessedEvent
```

这些事件可以被称为：

> Cognitive Trigger / 认知触发器

一个认知触发器应包含：

- 触发源：玩家 / NPC / 世界 / 时间 / 系统；
- 触发类型：对话 / 观察 / 行动 / 战斗 / 任务 / 关系变化；
- 触发对象：谁对谁做了什么；
- 当前上下文：地点、状态、关系、可见信息；
- 触发强度：是否值得调用 AI。

示例：

```json
{
  "trigger": "PlayerInsultedNPC",
  "actor": "player",
  "target": "npc_guard_01",
  "location": "city_gate",
  "visible_context": {
    "guard_mood": "irritated",
    "player_reputation": "low",
    "gate_status": "closed"
  }
}
```

---

### 10.2 思考：Agentic Runtime Processing

思考不等于 LLM 直接生成答案。

思考应该是游戏内部 Agent 的处理流程，包括：

```text
Read：读取状态
Query：检索记忆
Infer：推断意图
Plan：形成回应策略
Validate：检查是否合法
Update：写回认知状态
Respond：生成反馈
```

这里可以引入 CRUD 权限模型：

```text
Create：创建新记忆、新事件、新临时目标
Read：读取世界状态、角色状态、任务状态
Update：更新关系、情绪、任务进度、认知状态
Delete：删除临时假设、过期计划、无效记忆
```

但需要注意：

> AI 不应该直接 CRUD 游戏真实状态，而应该操作认知层状态，再由运行时验证后写回真实状态。

也就是：

```text
Cognitive State：AI 可操作
Runtime State：游戏主权状态
```

正确顺序应是：

```text
AI Agent 生成认知操作
→ Harness 校验
→ Runtime 应用
→ 结果回填给 Agent
```

---

### 10.3 输出：Cognitive Feedback

AI 的输出不应该只是自然语言，而应该是一个结构化反馈包。

例如：

```json
{
  "dialogue": "你最好注意自己的言辞，外乡人。",
  "emotion_change": {
    "anger": "+15",
    "trust": "-10"
  },
  "intent": "block_player",
  "runtime_actions": [
    {
      "type": "CloseGate",
      "target": "city_gate"
    }
  ],
  "memory_write": [
    {
      "type": "episodic_memory",
      "content": "Player insulted me at the city gate."
    }
  ],
  "next_hooks": [
    "If player apologizes, allow persuasion check.",
    "If player insults again, call backup."
  ]
}
```

真正的输出包括：

- 对话；
- 行为意图；
- 情绪变化；
- 关系变化；
- 任务推进；
- 记忆写入；
- 运行时动作；
- 后续钩子。

文本只是输出的一部分。

---

## 11. AI Feel 与传统 Game Feel 的对应关系

| 传统 Game Feel | AI 原生游戏中的对应物 |
|---|---|
| 玩家按键 | 玩家语言 / 行为 / 世界事件 |
| 输入缓冲 | 事件队列 / 认知触发器 |
| 动作判定 | 上下文检索 / 权限判断 |
| 动画响应 | 对话 / 行为 / 叙事反馈 |
| 命中反馈 | 状态变化 / 关系变化 / 世界响应 |
| 屏幕震动 / 音效 | 情绪表达 / UI 提示 / 环境反应 |
| 手感调参 | 上下文粒度 / 触发阈值 / 工具权限 / 输出节奏 |

AI 原生游戏也需要“手感调参”。

不是模型越聪明越好，而是反馈要让玩家觉得：

> 我的行为真的被世界理解了，并且世界给出了有因果的回应。

---

## 12. AI Feel 的节奏设计

传统游戏里，按键到反馈之间的延迟决定手感。

AI 原生游戏同样如此。

如果玩家说一句话，NPC 过很久才回应，认知手感就会断裂。

因此，Cognitive Harness 需要区分不同响应等级：

```text
即时反馈：0.2 - 1 秒
短思考：1 - 3 秒
深度思考：3 - 10 秒
后台结算：不阻塞玩家
```

不同交互可以走不同路径：

```text
轻交互：模板 / 缓存 / 小模型 / 规则系统
普通对话：一次 Agent 调用
重要剧情：多步 Agent + 校验
世界级事件：异步生成，下一场景呈现
```

AI Feel 的设计，不只是架构问题，也是体验问题。

---

## 13. 最终框架：两层结构 + 一个循环

这套方法论可以简化为：

```text
第一层：Game Runtime
负责真实世界状态、规则、事件、输入、反馈、验证。

第二层：Cognitive Harness
负责认知触发、上下文切片、Agent 路、工具暴露、CRUD、输出回填。
```

模型不算核心层，只是 Cognitive Harness 调用的认知算子。

整体循环是：

```text
Game Runtime
    ↓ 触发事件
Cognitive Harness
    ↓ 上下文切片 / 工具暴露 / Agentic Processing
Cognitive Feedback
    ↓ 运行时验证 / 状态回填
Game Runtime
```

可以进一步压缩为：

```text
AI Feel = Runtime Trigger + Context Injection + Agentic Operation + Feedback Commit
```

---

## 14. 概念定义汇总

### Game Runtime

游戏真实状态的主权系统，负责规则、状态、事件、验证和最终执行。

### Cognitive Harness

连接游戏运行时与 AI 的认知调度系统，负责上下文注入、工具暴露、Agent 路、输出协议和反馈回填。

### Cognitive Tree

游戏运行时状态的可注入索引树。它不是 AI 的脑内结构，而是运行时中可被 Harness 按需展开的上下文结构。

### Cognitive Trigger

由玩家、NPC、世界或系统事件产生的 AI 激活信号。

### Agentic Runtime Processing

AI 参与的内部认知处理流程，包括读取、检索、推理、计划、CRUD、验证和反馈构造。

### Cognitive Feedback

AI 对某次输入的结构化反馈，包括语言、行为意图、情绪变化、关系变化、记忆写入、任务推进和世界状态变化建议。

### AI Feel Loop

AI 原生游戏中的输入—思考—输出循环，用于描述 AI 如何对玩家或世界事件产生有因果、有边界、有反馈手感的回应。

---

## 15. 最终结论

AI 原生游戏的核心，不是 AI 生成一切，也不是 AI 主导游戏。

更现实、更可落地的理解是：

> 在传统游戏运行时中建立一套 Cognitive Harness。玩家或世界事件触发认知输入，Harness 从运行时认知树中切出上下文，并暴露有限工具；内部 Agent 通过读取、检索、推理和 CRUD 认知状态，形成结构化反馈；最后由游戏运行时验证并回填为对话、行为、关系、任务或世界状态变化。

更短地说：

> AI 原生游戏的手感，不来自模型的自由发挥，而来自运行时对上下文、工具和反馈节奏的精确调度。

或者：

> AI 原生游戏不是让 AI 成为世界，而是让世界学会何时、如何、以什么边界调用 AI。

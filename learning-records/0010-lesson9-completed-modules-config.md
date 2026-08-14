# 模块与工程配置课程完成（合并版）

用户完成第九课合并版（模块语法 + tsconfig 深入）。已掌握：模块 vs 脚本、三种导入方式、import type 与导入省略（默认 tsconfig 下产物相同）、CJS vs ESM 产物差异、target 决定产物语法版本、paths 别名的运行时坑、strict 家族、npm scripts。期间用户反馈"原第九课学得少"，经确认后按用户选择将原 0009 与 0010 合并为更厚重的"模块系统与工程配置"课。

**Evidence**: "ok, next"推进；用户主动提问 require 语法（CommonJS 导入），说明在细读产物代码。全部配置行为（target 转译、paths、scripts）经 agent 实测验证。

**TS 7 环境事实补充**：移除 ES3/ES5 目标（最低 ES2015）、移除 baseUrl（改用 paths 相对写法）、--ignoreConfig 行为变化。已记入 NOTES.md。

**Implications**: 用户达到"读懂并配置真实项目"能力。进入里程碑课程（0010 实战项目）：Todo API 服务，覆盖类型先行设计、模块组织、收窄、空值、异步——完成后达成使命第二里程碑"自己从零搭项目"。

# npm/npx 课程完成（生态·工具层）

用户完成第十二课（npm 与 npx）。已掌握：npm 三合一职责（仓库/安装器/命令运行器，NuGet 对照）、package.json 结构、dependencies vs devDependencies 判断法（产物 import 到的 vs 构建命令里的）、语义化版本（^/~ /精确，NuGet 版本区间对照）、npx 与 npm run 的区别（跑包命令 vs 跑自定 scripts）。生态地图参考文档（reference/ecosystem-map.html）已产出。

**Evidence**: "ok, next"推进；用户主动指出 Q3 测验选项错误（npx tsc --version 的直接行为是"显示 tsc 版本号"而非机制），已修正——记入教学设计原则：**测验选项测命令/代码的实际行为，机制放解析**。

**Implications**: 用户对命令/工具的"行为"敏感，会验证测验准确性——后续生态课（node/vite/react）的测验选项都要聚焦实际行为/输出。生态学习计划（grilling 共识）：四课制（npm/npx → node → vite → react）、概念+看懂深度、生态地图文档已产出。下一课 Node.js 运行时。

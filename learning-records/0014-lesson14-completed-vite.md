# Vite 构建工具课程完成（生态·构建层）

用户完成第十四课（Vite 构建工具）。已掌握：为什么浏览器读不了源码（TS 语法/包名 import/模块组织）、开发时按需转换 + HMR、发布时打包成静态产物（dist/ 不需要运行时）、tsc 与 vite 的分工（类型检查 vs 打包）、内容哈希文件名的缓存机制（文件名=内容指纹，immutable 缓存）。已验证：创建 demo-vite（vanilla-ts）、build 305ms、dev server 按需转换证据（curl main.ts 返回 JS）。

**Evidence**: "ok, next lession"推进；用户主动追问内容哈希缓存原理（已对话讲解）。

**Implications**: 最后一课 React 全景（0015，Todo API 前端）。注意跨域问题：React dev server (5173) fetch Todo API (3000) 会被 CORS 拦截——需要在 Todo API 加 CORS 头，作为真实工程知识点。全部课程完成后交付回调顺序小实验（用户要求）。

// vite.config.ts —— 关键：把共享包 @board/shared 直接指向源码（单一来源）
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // 改 shared/types.ts 立即生效，不用重新 build 共享包
      "@board/shared": fileURLToPath(new URL("../shared/types.ts", import.meta.url)),
    },
  },
  server: {
    port: 5174,
  },
});

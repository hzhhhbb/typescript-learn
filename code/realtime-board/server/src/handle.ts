// handle.ts —— 事件处理：可辨识联合收窄（第 3 课的核心武器）
import type { BoardEvent } from "@board/shared";

// 收窄：switch 按 kind 分流，每个 case 里 event 自动收窄为对应分支类型
export function processEvent(event: BoardEvent): void {
  switch (event.kind) {
    case "message":
      console.log(`💬 [${event.author}] ${event.text}`); // 只有 message 有 author
      return;
    case "file":
      console.log(`📄 ${event.filename} (${formatSize(event.sizeBytes)})`); // 只有 file 有 filename
      return;
    case "alert":
      console.log(`⚠️ [${event.level}] ${event.text}`); // 只有 alert 有 level
      return;
  }
}

// 转成看板显示文本（同样收窄；穷尽性检查保证加了新分支编译器会提醒你补 case）
export function toDisplayText(event: BoardEvent): string {
  switch (event.kind) {
    case "message":
      return `💬 ${event.author}: ${event.text}`;
    case "file":
      return `📄 ${event.filename} (${formatSize(event.sizeBytes)})`;
    case "alert":
      return `⚠️ [${event.level}] ${event.text}`;
  }
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  return `${(bytes / 1024).toFixed(1)} KB`;
}

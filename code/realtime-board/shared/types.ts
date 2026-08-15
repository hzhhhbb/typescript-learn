// types.ts —— 前后端共享类型（单一来源，Monorepo 共享包）
// server 和 web 都 import 这个文件——改一处，全链路同步（第 11 课的工具类型）

// ── 可辨识联合：三种活动事件（第 3 课） ──
// 每种分支都有独一无二的 kind 字面量，switch 收窄时编译器自动区分
export type BoardEvent =
  | {
      kind: "message";
      id: number;
      author: string;
      text: string;
      at: string; // ISO 时间戳
    }
  | {
      kind: "file";
      id: number;
      filename: string;
      sizeBytes: number;
      at: string;
    }
  | {
      kind: "alert";
      id: number;
      level: "info" | "warning" | "critical"; // 字面量联合（第 3 课）
      text: string;
      at: string;
    };

// ── 客户端提交的输入：没有 id 和 at（服务器生成） ──
// 注意：不能直接 Omit<BoardEvent, "id" | "at">！
// keyof (A | B) 是公共键交集，Omit 用于联合会破坏分支结构（TS2353）。
// 正确做法：分布式 Omit——条件类型对裸类型参数逐分支求值（第 11 课）
type DistributiveOmit<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never;

export type NewEventInput = DistributiveOmit<BoardEvent, "id" | "at">;

// ── 泛型：事件处理器（第 5 课） ──
export type EventHandler<E extends BoardEvent> = (event: E) => void;

// types.ts —— 类型先行：先定义数据形状，再写逻辑

// 领域模型：一条待办
export interface Todo {
  id: number;
  title: string;
  done: boolean;
}

// 创建待办的输入（没有 id 和 done——服务器负责生成）
export type CreateTodoInput = Omit<Todo, "id" | "done">;

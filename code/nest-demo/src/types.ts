// types.ts —— 共享类型（本 demo 内定义；真实项目放 shared 包）
export interface Todo {
  id: number;
  title: string;
  done: boolean;
}

// DTO：创建输入（class 而非 type——NestJS 管道需要运行时元数据）
export class CreateTodoDto {
  title!: string;
}

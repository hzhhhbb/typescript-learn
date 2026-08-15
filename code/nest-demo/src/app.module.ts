// app.module.ts —— 模块：组织控制器和服务（≈ C# 的模块化/程序集）
import { Module } from "@nestjs/common";
import { TodosController } from "./todos.controller";
import { TodosService } from "./todos.service";

@Module({
  controllers: [TodosController], // 路由注册
  providers: [TodosService], // DI 容器注册（≈ services.AddScoped<TodosService>()）
})
export class AppModule {}

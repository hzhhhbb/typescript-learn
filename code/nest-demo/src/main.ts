// main.ts —— 入口：NestFactory 启动（≈ Program.cs 的 WebApplication.CreateBuilder）
import "reflect-metadata"; // NestJS 装饰器依赖（运行时元数据）
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // CORS（第 15 课）
  await app.listen(3002);
  console.log("🪺 NestJS Todo API: http://localhost:3002/todos");
}

bootstrap();

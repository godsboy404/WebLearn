import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

/**
 * 应用程序启动函数
 * 创建并配置 NestJS 应用程序实例
 */
async function bootstrap() {
  // 创建 NestJS 应用实例
  const app = await NestFactory.create(AppModule);

  // 全局验证管道，用于 DTO 验证
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // 只保留 DTO 中定义的属性
    transform: true, // 自动转换类型
    forbidNonWhitelisted: true, // 如果传入未定义的属性则抛出错误
  }));

  // 启用 CORS 跨域请求
  app.enableCors({
    origin: '*', // 在生产环境中应该设置为特定域名
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  });

  // 配置 Swagger API 文档
  const config = new DocumentBuilder()
    .setTitle('NodeJS Serverless API')
    .setDescription('NodeJS及Serverless应用开发实验项目API文档')
    .setVersion('1.0')
    .addTag('users')
    .addTag('products')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // 启动应用程序，监听 3000 端口
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`应用程序正在运行，端口: ${port}`);
}

bootstrap();
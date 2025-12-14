import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

let cachedApp: any;

async function bootstrapApp() {
  if (!cachedApp) {
    cachedApp = await NestFactory.create(AppModule);
    
    // 启用 CORS
    cachedApp.enableCors({
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      allowedHeaders: 'Content-Type, Authorization',
    });
    
    await cachedApp.init();
  }
  
  return cachedApp;
}

export const handler = async (event: any, context: any) => {
  const app = await bootstrapApp();
  
  // 简单的处理逻辑，实际部署时可能需要更复杂的处理
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Serverless function is working',
      event: event,
    }),
  };
};
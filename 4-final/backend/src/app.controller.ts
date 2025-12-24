import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getRoot() {
    return {
      message: 'Welcome to NodeJS Serverless API',
      description: 'NodeJS及Serverless应用开发实验项目',
      version: '1.0.0',
      endpoints: {
        books: '/api/books',
        apiDocumentation: '/api-docs',
      },
      status: 'running',
    };
  }
}
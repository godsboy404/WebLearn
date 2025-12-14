import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { ProductModule } from './modules/product/product.module';
import { InitModule } from './modules/init/init.module';
import { AppController } from './app.controller';

/**
 * 应用程序根模块
 * 负责导入和配置所有子模块
 */
@Module({
  imports: [
    // 配置模块，用于加载环境变量
    ConfigModule.forRoot({
      isGlobal: true, // 全局可用
      envFilePath: '.env', // 环境变量文件路径
    }),
    
    // MongoDB 数据库连接配置
    MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://localhost:27017/nodejs-experiment'),
    
    // 业务模块
    UserModule,
    ProductModule,
    
    // 初始化模块
    InitModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
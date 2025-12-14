import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { Product, ProductSchema } from './schemas/product.schema';

/**
 * 产品模块
 * 负责组织产品相关的控制器、服务和数据库模型
 */
@Module({
  imports: [
    // 注册产品模型到 Mongoose 模块
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema }
    ])
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService], // 导出 ProductService 以便其他模块使用
})
export class ProductModule {}
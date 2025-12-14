import { Module, OnModuleInit } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../user/schemas/user.schema';
import { Product, ProductSchema } from '../product/schemas/product.schema';
import { DatabaseInitService } from '../../config/database-init.service';

/**
 * 初始化模块
 * 负责数据库初始化
 */
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Product.name, schema: ProductSchema }
    ])
  ],
  providers: [DatabaseInitService],
})
export class InitModule implements OnModuleInit {
  constructor(private readonly databaseInitService: DatabaseInitService) {}

  /**
   * 模块初始化后执行数据库初始化
   */
  async onModuleInit() {
    // 延迟执行数据库初始化，确保数据库连接已建立
    setTimeout(async () => {
      await this.databaseInitService.initDatabase();
    }, 2000);
  }
}
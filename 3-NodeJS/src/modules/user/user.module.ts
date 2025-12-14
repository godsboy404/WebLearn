import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User, UserSchema } from './schemas/user.schema';

/**
 * 用户模块
 * 负责组织用户相关的控制器、服务和数据库模型
 */
@Module({
  imports: [
    // 注册用户模型到 Mongoose 模块
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema }
    ])
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService], // 导出 UserService 以便其他模块使用
})
export class UserModule {}
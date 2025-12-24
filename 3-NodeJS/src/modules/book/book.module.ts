import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { Book, BookSchema } from './schemas/book.schema';

/**
 * 图书模块
 * 负责组织图书相关的控制器、服务和数据库模型
 */
@Module({
  imports: [
    // 注册图书模型到 Mongoose 模块
    MongooseModule.forFeature([
      { name: Book.name, schema: BookSchema }
    ])
  ],
  controllers: [BookController],
  providers: [BookService],
  exports: [BookService], // 导出 BookService 以便其他模块使用
})
export class BookModule {}
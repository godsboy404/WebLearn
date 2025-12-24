import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

/**
 * 图书文档类型
 */
export type BookDocument = Book & Document;

/**
 * 图书实体类
 * 定义图书数据模型和数据库字段
 */
@Schema({ timestamps: true }) // 自动添加 createdAt 和 updatedAt 字段
export class Book {
  /**
   * 图书标题
   */
  @Prop({ required: true, trim: true })
  title: string;

  /**
   * 图书作者
   */
  @Prop({ required: true, trim: true })
  author: string;

  /**
   * ISBN号码
   */
  @Prop({ trim: true })
  isbn?: string;

  /**
   * 出版社
   */
  @Prop({ trim: true })
  publisher?: string;

  /**
   * 出版日期
   */
  @Prop()
  publishDate?: Date;

  /**
   * 图书分类
   */
  @Prop({ enum: ['fiction', 'non-fiction', 'technical', 'biography'] })
  category?: string;

  /**
   * 图书标签
   */
  @Prop([String])
  tags?: string[];

  /**
   * 阅读状态：unread-未读，reading-在读，read-已读
   */
  @Prop({ enum: ['unread', 'reading', 'read'], default: 'unread' })
  status: string;

  /**
   * 个人评分（0-5分）
   */
  @Prop({ min: 0, max: 5, default: 0 })
  rating: number;

  /**
   * 个人笔记
   */
  @Prop({ trim: true })
  notes?: string;

  /**
   * 开始阅读日期
   */
  @Prop()
  startDate?: Date;

  /**
   * 完成阅读日期
   */
  @Prop()
  finishDate?: Date;

  /**
   * 封面图片URL
   */
  @Prop()
  coverImage?: string;
}

/**
 * 创建图书 Schema
 */
export const BookSchema = SchemaFactory.createForClass(Book);